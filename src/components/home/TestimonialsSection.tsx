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
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map(({ id, name, purchase, rating, quote }) => (
            <figure
              key={id}
              className="flex flex-col justify-between space-y-4 rounded-xl bg-pure-parchment p-6 shadow-md transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="space-y-3">
                <StarRating rating={rating} />
                <blockquote className="text-body-md italic text-on-surface">“{quote}”</blockquote>
              </div>
              <figcaption className="flex items-center justify-between border-t border-surface-container pt-4">
                <div>
                  <p className="text-title-sm font-bold text-on-surface">{name}</p>
                  <p className="text-label-sm text-on-surface-variant">Verified Buyer • {purchase}</p>
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
