import { cn } from "../../lib/utils";

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}) {
  return (
    <div
      {...props}
      className={cn(
        "marquee",
        vertical && "vertical",
        className,
        pauseOnHover && "paused"
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn(
              "marquee-row",
              vertical && "vertical",
              reverse && "reverse"
            )}
          >
            {children}
          </div>
        ))}
    </div>
  );
}
