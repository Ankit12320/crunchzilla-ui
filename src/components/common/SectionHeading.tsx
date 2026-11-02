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
          "mb-3 inline-block rounded-full bg-golden-sand/80 border border-amber-900/10 px-4 py-1 text-label-xs font-bold uppercase tracking-widest text-primary shadow-xs",
          eyebrowClassName
        )}
      >
        {eyebrow}
      </span>
      <h2 className="font-display text-headline-md sm:text-headline-lg font-bold text-on-surface tracking-tight leading-tight">{title}</h2>
      {description && (
        <p className="mt-3 text-body-md sm:text-body-lg text-on-surface-variant leading-relaxed">{description}</p>
      )}
    </div>
  );
}
