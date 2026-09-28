"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Icon from "@/components/common/Icon";
import { INQUIRY_CATEGORIES } from "@/constants/contact";
import { SITE } from "@/constants/site";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  category: z.enum(INQUIRY_CATEGORIES),
  fullName: z.string().trim().min(1, "Please enter your name"),
  email: z.email("Please enter a valid email"),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[\d\s-]{10,15}$/, "Please enter a valid phone number"),
  city: z.string().trim().optional(),
  message: z.string().trim().min(10, "Message must be at least 10 characters"),
});

type ContactValues = z.infer<typeof contactSchema>;

const labelClass = "block text-label-sm uppercase tracking-wider text-on-surface-variant";
const inputClass =
  "w-full rounded-lg bg-surface-container-low py-2.5 pr-4 pl-10 text-body-md text-on-surface shadow-inner placeholder:text-outline/70 focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/30 focus:outline-none aria-invalid:ring-2 aria-invalid:ring-error/40";
const errorClass = "text-body-sm text-error";

function Field({
  id,
  label,
  icon,
  error,
  children,
}: {
  id: string;
  label: string;
  icon: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <div className="relative">
        <Icon name={icon} className="pointer-events-none absolute top-3 left-3.5 text-[18px] text-outline" />
        {children}
      </div>
      {error && <p className={errorClass}>{error}</p>}
    </div>
  );
}

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { category: INQUIRY_CATEGORIES[0] },
  });

  const category = watch("category");

  useEffect(() => {
    if (!submitted) return;
    const timer = setTimeout(() => setSubmitted(false), 7000);
    return () => clearTimeout(timer);
  }, [submitted]);

  const onSubmit = async (values: ContactValues) => {
    // TODO: POST to contact API when the backend is ready
    console.log(values);
    setSubmitted(true);
    reset();
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <fieldset className="space-y-2">
        <legend className="mb-2 text-label-lg text-on-surface">What can we help you with?</legend>
        <div className="flex flex-wrap gap-2" role="radiogroup">
          {INQUIRY_CATEGORIES.map((value) => {
            const selected = value === category;
            return (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setValue("category", value)}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-label-md transition-all duration-200",
                  selected
                    ? "bg-roasted-terracotta text-pure-parchment shadow-sm"
                    : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                )}
              >
                {value}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
        <Field id="fullName" label="Full Name *" icon="person" error={errors.fullName?.message}>
          <input
            id="fullName"
            type="text"
            placeholder="e.g. Aman Kumar"
            aria-invalid={!!errors.fullName}
            className={inputClass}
            {...register("fullName")}
          />
        </Field>
        <Field id="email" label="Email Address *" icon="alternate_email" error={errors.email?.message}>
          <input
            id="email"
            type="email"
            placeholder="e.g. aman@domain.com"
            aria-invalid={!!errors.email}
            className={inputClass}
            {...register("email")}
          />
        </Field>
        <Field id="phone" label="WhatsApp / Phone Number *" icon="call" error={errors.phone?.message}>
          <input
            id="phone"
            type="tel"
            placeholder="+91 98765 43210"
            aria-invalid={!!errors.phone}
            className={inputClass}
            {...register("phone")}
          />
        </Field>
        <Field id="city" label="City / State" icon="explore">
          <input
            id="city"
            type="text"
            placeholder="e.g. Bengaluru, Patna, Delhi"
            className={inputClass}
            {...register("city")}
          />
        </Field>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label htmlFor="message" className={labelClass}>
            Message / Specific Request *
          </label>
          <span className="text-label-sm text-outline">Min 10 characters</span>
        </div>
        <textarea
          id="message"
          rows={4}
          placeholder="Tell us about your requirement, bulk quantity needed, or product experience..."
          aria-invalid={!!errors.message}
          className={cn(inputClass, "resize-y p-3.5")}
          {...register("message")}
        />
        {errors.message && <p className={errorClass}>{errors.message.message}</p>}
      </div>

      <div className="flex flex-col items-center justify-between gap-4 pt-2 sm:flex-row">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-roasted-terracotta px-8 py-3 text-label-lg text-on-primary shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary hover:shadow-lg disabled:opacity-60 sm:w-auto"
        >
          <Icon name="send" className="text-[20px]" />
          Send Message
        </button>
        <div className="flex items-center gap-2 text-body-sm text-on-surface-variant">
          <Icon name="lock" className="text-[18px] text-roasted-terracotta" />
          Your contact info is safe &amp; never shared
        </div>
      </div>

      <div className="mt-4 flex flex-col items-center justify-between gap-2 rounded-lg bg-surface-container-low/70 p-3 text-center sm:flex-row sm:text-left">
        <span className="text-body-sm text-on-surface-variant">
          Prefer Google Forms for submitting verified feedback?
        </span>
        <a
          href={SITE.feedbackFormUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-label-md text-primary underline hover:text-roasted-terracotta"
        >
          Open Google Feedback Form
          <Icon name="open_in_new" className="text-[16px]" />
        </a>
      </div>

      {submitted && (
        <div role="status" className="mt-4 flex items-start gap-3 rounded-lg bg-cardamom-light p-4 text-botanical-forest">
          <Icon name="check_circle" className="shrink-0 text-2xl" />
          <div>
            <p className="text-title-sm font-bold">Thank you for reaching out!</p>
            <p className="text-body-sm">
              We have received your message and our team will get in touch shortly via WhatsApp or
              email.
            </p>
          </div>
        </div>
      )}
    </form>
  );
}
