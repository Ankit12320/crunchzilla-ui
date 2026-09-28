import { cn } from "@/lib/utils";

interface IconProps {
  name: string;
  filled?: boolean;
  className?: string;
}

/** Material Symbols Outlined icon (decorative). */
export default function Icon({ name, filled, className }: IconProps) {
  return (
    <span
      aria-hidden="true"
      className={cn("material-symbols-outlined", filled && "icon-filled", className)}
    >
      {name}
    </span>
  );
}
