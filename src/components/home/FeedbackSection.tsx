import Icon from "@/components/common/Icon";
import FeedbackForm from "@/components/home/FeedbackForm";

export default function FeedbackSection() {
  return (
    <section className="w-full bg-surface py-14">
      <div className="mx-auto max-w-4xl px-5 lg:px-12">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-surface-container to-surface-container-high p-8 shadow-lg md:p-12">
          <div className="relative z-10 max-w-xl">
            <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-label-sm uppercase tracking-wider text-primary">
              Community Input
            </span>
            <h2 className="mb-2 font-display text-headline-md font-bold text-on-surface">
              Your feedback means a lot to us!
            </h2>
            <p className="mb-6 text-body-md text-on-surface-variant">
              We appreciate your input! Your thoughts help us improve and serve you better with
              recipes rooted in traditional excellence.
            </p>
            <FeedbackForm />
          </div>
          <div className="pointer-events-none absolute -right-8 -bottom-8 hidden opacity-10 md:block">
            <Icon name="volunteer_activism" className="text-[240px] text-primary" />
          </div>
        </div>
      </div>
    </section>
  );
}
