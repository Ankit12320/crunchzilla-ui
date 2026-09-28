import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  eyebrowClassName?: string;
}

/** Centered eyebrow + title + description used by home sections. */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  eyebrowClassName,
}: SectionHeadingProps) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <span
        className={cn(
          "mb-2 block text-label-md uppercase tracking-widest",
          eyebrowClassName ?? "text-secondary"
        )}
      >
        {eyebrow}
      </span>
      <h2 className="font-display text-headline-md font-bold text-on-surface">{title}</h2>
      {description && (
        <p className="mt-2 text-body-md text-on-surface-variant">{description}</p>
      )}
    </div>
  );
}
