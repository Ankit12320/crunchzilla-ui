"use client";

import { useId, useState } from "react";
import Icon from "@/components/common/Icon";
import { FAQS, type Faq } from "@/constants/contact";
import { cn } from "@/lib/utils";

function Answer({ answer, emphasis }: Faq) {
  if (!emphasis || !answer.includes(emphasis)) return <>{answer}</>;
  const [before, after] = answer.split(emphasis);
  return (
    <>
      {before}
      <strong>{emphasis}</strong>
      {after}
    </>
  );
}

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  return (
    <section className="w-full bg-surface-container-low py-10 lg:py-24">
      <div className="mx-auto w-full max-w-4xl space-y-6 px-5 lg:px-12">
        <div className="space-y-1 text-center">
          <span className="text-label-sm uppercase tracking-wider text-spiced-tangerine">
            Instant Answers
          </span>
          <h2 className="font-display text-headline-lg-mobile font-bold tracking-tight text-primary md:text-headline-lg">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto max-w-xl text-body-md text-on-surface-variant">
            Everything you need to know about our slow-roasting standards, deliveries, WhatsApp
            ordering, and purity promise.
          </p>
        </div>

        <div className="space-y-2 pt-4">
          {FAQS.map((faq, i) => {
            const open = openIndex === i;
            const panelId = `${baseId}-panel-${i}`;
            return (
              <div key={faq.question} className="overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm">
                <h3>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(open ? null : i)}
                    className="flex w-full items-center justify-between gap-4 p-4 text-left lg:p-6"
                  >
                    <span className="text-title-sm text-on-surface lg:text-title-md">{faq.question}</span>
                    <Icon
                      name="expand_more"
                      className={cn(
                        "text-[24px] text-outline transition-transform duration-300",
                        open && "rotate-180"
                      )}
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  hidden={!open}
                  className="px-4 pb-4 text-body-md text-on-surface-variant lg:px-6 lg:pb-6"
                >
                  <Answer {...faq} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
