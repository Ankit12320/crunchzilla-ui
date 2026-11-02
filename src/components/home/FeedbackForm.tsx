"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Icon from "@/components/common/Icon";
import { SITE } from "@/constants/site";

const feedbackSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name"),
  city: z.string().trim().optional(),
  message: z.string().trim().min(1, "Please share your feedback"),
});

type FeedbackValues = z.infer<typeof feedbackSchema>;

const fieldClass =
  "w-full rounded-xl bg-pure-parchment px-4 py-3 text-body-md text-on-surface border border-amber-900/10 shadow-xs placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all";
const labelClass = "mb-1 block text-label-sm font-semibold text-on-surface";
const errorClass = "mt-1 text-body-sm text-error";

export default function FeedbackForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FeedbackValues>({ resolver: zodResolver(feedbackSchema) });

  const onSubmit = async (values: FeedbackValues) => {
    // TODO: POST to feedback API when the backend is ready
    console.log(values);
    setSubmitted(true);
    reset();
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="feedback-name">
            Your Name
          </label>
          <input
            id="feedback-name"
            type="text"
            placeholder="e.g. Priyanshu"
            aria-invalid={!!errors.name}
            className={fieldClass}
            {...register("name")}
          />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="feedback-city">
            City / Location
          </label>
          <input
            id="feedback-city"
            type="text"
            placeholder="e.g. Patna / Bangalore"
            className={fieldClass}
            {...register("city")}
          />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="feedback-msg">
          Feedback &amp; Snack Request
        </label>
        <textarea
          id="feedback-msg"
          rows={3}
          placeholder="Share your experience or tell us what traditional staple you'd like us to roast next..."
          aria-invalid={!!errors.message}
          className={fieldClass}
          {...register("message")}
        />
        {errors.message && <p className={errorClass}>{errors.message.message}</p>}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex min-h-[44px] w-full sm:w-auto items-center justify-center rounded-full bg-roasted-terracotta px-8 py-3 text-title-sm font-semibold text-on-primary shadow-md transition-all hover:bg-primary active:scale-[0.98] disabled:opacity-60"
        >
          Submit Feedback
        </button>
        <a
          href={SITE.feedbackFormUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center justify-center gap-1 text-label-md text-primary hover:underline text-center"
        >
          Or open Google Feedback Form
          <Icon name="open_in_new" className="text-[16px]" />
        </a>
      </div>

      {submitted && (
        <p role="status" className="pt-2 text-label-md text-secondary">
          Thank you! Your feedback has been received with heartfelt gratitude.
        </p>
      )}
    </form>
  );
}
