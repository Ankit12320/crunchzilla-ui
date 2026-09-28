import Image from "next/image";
import Icon from "@/components/common/Icon";
import {
  GENESIS_CALLOUTS,
  GENESIS_CLOSING,
  GENESIS_PARAGRAPHS,
  GENESIS_QUOTE,
  ORIGIN_NOTES,
} from "@/constants/about";
import { IMAGES } from "@/constants/images";

function NoteCard({
  note,
  className,
  textClass,
}: {
  note: { icon: string; title: string; text: string };
  className: string;
  textClass: string;
}) {
  return (
    <div className={`rounded-2xl p-6 shadow-sm ${className}`}>
      <Icon name={note.icon} className="mb-2 text-[32px]" />
      <h3 className="mb-1 text-title-md font-bold">{note.title}</h3>
      <p className={`text-body-sm leading-snug ${textClass}`}>{note.text}</p>
    </div>
  );
}

function MosaicImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-square overflow-hidden rounded-2xl bg-surface-container shadow-md">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 25vw, 50vw"
        className="object-cover transition-transform duration-500 hover:scale-105"
      />
    </div>
  );
}

export default function OriginStory() {
  return (
    <section className="w-full bg-surface-container-lowest py-10 lg:py-24">
      <div className="container-page grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
        {/* Photo mosaic */}
        <div className="grid grid-cols-2 gap-4 lg:col-span-6">
          <div className="space-y-4">
            <MosaicImage
              src={IMAGES.about.tilkutCraft}
              alt="Toasted sesame seeds used for freshly beaten Gaya Tilkut"
            />
            <NoteCard
              note={ORIGIN_NOTES.tilkut}
              className="bg-cardamom-light text-botanical-forest"
              textClass="text-botanical-forest/90"
            />
          </div>
          <div className="space-y-4 pt-8">
            <NoteCard
              note={ORIGIN_NOTES.makhana}
              className="bg-golden-sand text-tertiary"
              textClass="text-tertiary/90"
            />
            <MosaicImage
              src={IMAGES.about.makhanaBowl}
              alt="Warm roasted Makhana piled in a brass bowl with steaming chai"
            />
          </div>
        </div>

        {/* Story copy */}
        <div className="flex flex-col space-y-6 lg:col-span-6 lg:pl-6">
          <div className="inline-flex items-center gap-2 self-start rounded-full bg-surface-container-high px-3 py-1 text-label-sm uppercase tracking-wider text-on-surface-variant">
            <span className="h-2 w-2 rounded-full bg-primary" />
            The Genesis
          </div>
          <h2 className="font-display text-headline-lg-mobile tracking-tight text-on-surface md:text-headline-lg">
            Born from Hometown Nostalgia &amp; The Longing for True Purity.
          </h2>
          <div className="space-y-4 text-body-md text-on-surface-variant">
            {GENESIS_PARAGRAPHS.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            <blockquote className="text-title-sm italic text-primary">“{GENESIS_QUOTE}”</blockquote>
            <p>{GENESIS_CLOSING}</p>
          </div>
          <ul className="flex flex-wrap gap-4 pt-2">
            {GENESIS_CALLOUTS.map((label) => (
              <li key={label} className="flex items-center gap-2 text-label-md text-on-surface">
                <Icon name="check_circle" className="text-[20px] text-secondary" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
