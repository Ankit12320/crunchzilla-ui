import Icon from "@/components/common/Icon";
import SectionHeading from "@/components/common/SectionHeading";
import StarRating from "@/components/common/StarRating";
import type { Testimonial } from "@/types/testimonial";

export default function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="w-full bg-surface-container-low py-16 md:py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="Real love from homes across India"
          eyebrowClassName="text-primary"
          title="Here’s What Our Customers Say"
          description="Authentic reviews straight from customers who miss the taste of their hometown."
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map(({ id, name, purchase, rating, quote }) => (
            <figure
              key={id}
              className="group relative flex flex-col justify-between space-y-4 rounded-2xl bg-pure-parchment p-6 border border-amber-900/10 shadow-premium-sm transition-all duration-300 hover:shadow-premium-hover hover:-translate-y-1.5"
            >
              <div className="absolute top-4 right-4 text-warm-amber/15 font-display text-5xl leading-none select-none pointer-events-none">
                “
              </div>
              <div className="space-y-3 relative z-1">
                <StarRating rating={rating} />
                <blockquote className="text-body-md italic text-on-surface leading-relaxed">
                  “{quote}”
                </blockquote>
              </div>
              <figcaption className="flex items-center justify-between border-t border-surface-container pt-4 relative z-1">
                <div>
                  <p className="text-title-sm font-bold text-on-surface">{name}</p>
                  <p className="text-label-sm font-medium text-on-surface-variant">
                    Verified Buyer • {purchase}
                  </p>
                </div>
                <Icon name="verified" className="text-[20px] text-whatsapp-emerald" />
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
