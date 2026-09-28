import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/common/Icon";
import { CRAFT_PROCESSES } from "@/constants/about";
import { IMAGES } from "@/constants/images";
import { cn } from "@/lib/utils";

export default function CraftProcess() {
  return (
    <section className="w-full bg-surface py-10 lg:py-24">
      <div className="container-page">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="text-label-sm uppercase tracking-widest text-primary">
            The Alchemy of Simplicity
          </span>
          <h2 className="mt-1 font-display text-headline-lg-mobile tracking-tight text-on-surface md:text-headline-lg">
            Honoring The Handcrafted Process
          </h2>
          <p className="mt-2 text-body-md text-on-surface-variant">
            Discover how simple local ingredients become extraordinary staples through patience,
            fire, and precision hand techniques.
          </p>
        </div>

        <div className="space-y-16">
          {CRAFT_PROCESSES.map((process) => (
            <article
              key={process.id}
              className="grid grid-cols-1 items-center gap-8 rounded-3xl bg-surface-container-lowest p-8 shadow-sm lg:grid-cols-12 lg:p-12"
            >
              <div className={cn("flex flex-col space-y-5 lg:col-span-6", process.imageFirst && "lg:order-2")}>
                <div className={`inline-flex items-center gap-2 text-label-md uppercase tracking-wider ${process.eyebrowClass}`}>
                  <Icon name={process.icon} className="text-[20px]" />
                  {process.eyebrow}
                </div>
                <h3 className="font-display text-headline-md font-bold tracking-tight text-on-surface">
                  {process.title}
                </h3>
                <p className="text-body-md text-on-surface-variant">{process.text}</p>

                <ol className="space-y-3 text-body-sm text-on-surface-variant">
                  {process.steps.map((step, i) => (
                    <li key={step.title} className="flex items-start gap-3">
                      <span
                        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${process.stepClass}`}
                      >
                        {i + 1}
                      </span>
                      <span>
                        <strong>{step.title}:</strong> {step.text}
                      </span>
                    </li>
                  ))}
                </ol>

                <div className="pt-2">
                  <Link
                    href="/shop"
                    className={`inline-flex items-center gap-2 text-label-lg transition-all hover:gap-3 ${process.ctaClass}`}
                  >
                    {process.cta}
                    <Icon name="east" className="text-[18px]" />
                  </Link>
                </div>
              </div>

              <div className={cn("lg:col-span-6", process.imageFirst && "lg:order-1")}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface-container shadow-md">
                  <Image
                    src={IMAGES.about[process.image]}
                    alt={process.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
