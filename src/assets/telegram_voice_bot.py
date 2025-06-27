# telegram_voice_bot.py
"""
🤖 Telegram Voice Bot – Whisper + DeepSeek + Coqui XTTS-v2 en GPU
---------------------------------------------------------------

• Mantiene modelos Whisper y XTTS en memoria para respuesta rápida.
• Genera un reporte final con tiempos de procesamiento.

### Instalación (CUDA 11.8)
```bash
pip install python-telegram-bot==20.* requests openai-whisper TTS \
            torch==2.2.1+cu118 torchvision==0.17.1+cu118 torchaudio==2.2.1+cu118 \
            emoji -f https://download.pytorch.org/whl/torch_stable.html
```

### Variables de entorno
| VAR                | DEFECTO / EJEMPLO                          |
|--------------------|--------------------------------------------|
| TELEGRAM_BOT_TOKEN | 123456:ABC…                                |
| DEEPSEEK_URL       | http://127.0.0.1:1234/v1/chat/completions  |
| WHISPER_MODEL      | small                                      |
| TTS_SPEAKER_NAME   | Claribel Dervla                            |
| TTS_LANGUAGE_IDX   | es                                         |

```bash
python telegram_voice_bot.py
```
"""

import os, re, uuid, logging, asyncio, subprocess, torch, whisper, requests, emoji, time
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
from typing import Optional
from TTS.api import TTS as CoquiTTS
from telegram import Update, InputFile
from telegram.ext import Application, MessageHandler, filters, ContextTypes

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s", datefmt="%H:%M:%S")
log = logging.getLogger("voice-bot")

# ─── ENV ───
BOT_TOKEN      = os.getenv("TELEGRAM_BOT_TOKEN", "7741999103:AAHyufTm1Mdig_BvTvekJllfZaP8dreB7WM")
DEEP_URL       = os.getenv("DEEPSEEK_URL", "http://127.0.0.1:1234/v1/chat/completions")
WHISPER_MODEL  = os.getenv("WHISPER_MODEL", "small")
SPEAKER_NAME   = os.getenv("TTS_SPEAKER_NAME", "Eugenio Mataracı")
LANGUAGE_IDX   = os.getenv("TTS_LANGUAGE_IDX", "es")
if not BOT_TOKEN:
    raise RuntimeError("Define TELEGRAM_BOT_TOKEN")

Path("tmp").mkdir(exist_ok=True)
Path("static").mkdir(exist_ok=True)

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
log.info("Whisper y XTTS usarán: %s", DEVICE)

# ─── Modelos en memoria ───
whisper_model = whisper.load_model(WHISPER_MODEL, device=DEVICE)
coqui_tts = CoquiTTS(model_name="tts_models/es/css10/vits", gpu=DEVICE=="cuda")
log.info("Modelos cargados ✅")

executor = ThreadPoolExecutor(max_workers=4)

# ─── Utils ───
strip_think = lambda t: re.split(r"(?is)</think>", t, 1)[1].strip() if "<think" in t.lower() else t.strip()
remove_emojis = lambda s: emoji.replace_emoji(s, "")


def wav_to_mp3(wav: Path) -> Optional[Path]:
    mp3 = Path("static") / f"{uuid.uuid4().hex[:12]}.mp3"
    if subprocess.run(["ffmpeg", "-y", "-i", str(wav), "-codec:a", "libmp3lame", "-b:a", "64k", str(mp3)],
                      stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL).returncode == 0:
        wav.unlink(missing_ok=True); return mp3
    wav.unlink(missing_ok=True); return None


def synth_audio(text: str) -> Optional[Path]:
    wav = Path("tmp") / f"{uuid.uuid4().hex}.wav"
    try:
        coqui_tts.tts_to_file(text, file_path=str(wav))
    except Exception as e:
        log.error("TTS error: %s", e); return None
    return wav_to_mp3(wav)


async def ask_deepseek(prompt: str) -> str:
    payload = {"model": "deepseek-r1-distill-qwen-7b", "messages": [
        {"role": "system", "content": "Responde absolutamente todo únicamente en español, sin importar el idioma en que te hablen."},
        {"role": "user", "content": prompt}], "temperature": 0.3}
    loop = asyncio.get_event_loop()
    r = await loop.run_in_executor(executor, lambda: requests.post(DEEP_URL, json=payload, timeout=120))
    r.raise_for_status(); return strip_think(r.json()["choices"][0]["message"]["content"].strip())

# ─── Handler ───
async def handle_voice(update: Update, context: ContextTypes.DEFAULT_TYPE):
    m = update.effective_message
    if not m.voice: return
    
    await m.reply_text("Procesando… ⏳")

    f = await context.bot.get_file(m.voice.file_id)
    ogg = Path("tmp") / f"{uuid.uuid4()}.ogg"; await f.download_to_drive(str(ogg))

    loop = asyncio.get_event_loop()

    # Whisper timing
    t1 = time.time()
    transcript = await loop.run_in_executor(executor, lambda: whisper_model.transcribe(str(ogg), language="es")["text"].strip())
    t_whisper = time.time() - t1
    await m.reply_text(f"📝 {transcript}")

    # Deepseek timing
    t2 = time.time()
    reply = await ask_deepseek(transcript)
    t_deepseek = time.time() - t2
    await m.reply_text(f"🤖 {reply}")

    # TTS timing
    t3 = time.time()
    mp3 = await loop.run_in_executor(executor, lambda: synth_audio(remove_emojis(reply)))
    t_tts = time.time() - t3

    if mp3 and mp3.exists():
        with mp3.open("rb") as f: await context.bot.send_audio(chat_id=m.chat_id, audio=f)
        mp3.unlink(missing_ok=True)

    # Resumen tiempos
    resumen = (f"⏱️ Resumen de tiempos:\n"
               f"Whisper: {t_whisper:.2f}s\n"
               f"DeepSeek: {t_deepseek:.2f}s\n"
               f"TTS: {t_tts:.2f}s")

    await m.reply_text(resumen)

async def handle_text(update: Update): 
    m = update.effective_message
    await m.reply_text("Enviame una nota de voz, quiero escuchar tu dulce voz  ")
    return


# ─── Main ───
if __name__ == "__main__":
    app = Application.builder().token(BOT_TOKEN).build()
    app.add_handler(MessageHandler(filters.VOICE, handle_voice))
    log.info("🤖 Bot listo, modelos precargados. Esperando notas de voz…")
    app.run_polling()
