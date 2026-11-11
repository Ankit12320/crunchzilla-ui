"use client";

import { useState } from "react";
import Link from "next/link";
import Icon from "@/components/common/Icon";
import { useToastStore } from "@/store/toast-store";

export default function ForgotPasswordForm() {
  const [identifier, setIdentifier] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const showToast = useToastStore((s) => s.show);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmed = identifier.trim();
    if (!trimmed) {
      setError("Please enter your registered email address or mobile number");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      showToast("Password recovery link / OTP has been sent!");
    }, 700);
  };

  if (submitted) {
    return (
      <div className="space-y-4 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cardamom-light text-botanical-forest">
          <Icon name="mark_email_read" className="text-[32px]" />
        </div>
        <h2 className="font-display text-title-lg font-bold text-on-surface">
          Check Your Messages
        </h2>
        <p className="text-body-md text-on-surface-variant">
          We have sent secure password recovery instructions and an OTP to{" "}
          <strong className="text-on-surface">{identifier}</strong>.
        </p>
        <div className="pt-4">
          <Link
            href="/login"
            className="flex h-12 w-full items-center justify-center rounded-xl bg-roasted-terracotta text-label-lg font-bold text-pure-parchment shadow-md transition-all hover:bg-primary active:scale-[0.99]"
          >
            Return to Login
          </Link>
        </div>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="text-label-sm text-on-surface-variant hover:text-primary hover:underline"
        >
          Didn&apos;t receive anything? Try again
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {error && (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-xl border border-error/40 bg-error-container/20 p-3 text-body-sm text-error"
        >
          <Icon name="error" className="text-[18px] shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <p className="text-body-sm text-on-surface-variant">
        Enter the email address or mobile phone number associated with your Crunchzilla account and
        we&apos;ll send you a link or OTP to securely reset your password.
      </p>

      <div className="space-y-1.5">
        <label
          htmlFor="reset-identifier"
          className="block text-label-xs font-bold uppercase tracking-wider text-on-surface-variant"
        >
          Email Address or Mobile Number
        </label>
        <div className="relative">
          <Icon
            name="contact_mail"
            className="pointer-events-none absolute top-3.5 left-3.5 text-[20px] text-on-surface-variant"
          />
          <input
            id="reset-identifier"
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="e.g. crunchzilla02@gmail.com or 9448874640"
            className="w-full min-h-[46px] rounded-xl border border-surface-container-high bg-surface-container-lowest pr-4 pl-11 text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="flex h-12 w-full items-center justify-center rounded-xl bg-roasted-terracotta text-label-lg font-bold text-pure-parchment shadow-md transition-all hover:bg-primary active:scale-[0.99] disabled:opacity-60"
      >
        {loading ? "Sending..." : "Send Reset Link / OTP"}
      </button>

      <div className="pt-2 text-center text-label-md text-on-surface-variant">
        <Link href="/login" className="inline-flex items-center gap-1.5 font-bold text-primary hover:underline">
          <Icon name="arrow_back" className="text-[16px]" />
          Back to Login
        </Link>
      </div>
    </form>
  );
}
