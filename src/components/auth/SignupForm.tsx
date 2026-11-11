"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Icon from "@/components/common/Icon";
import GoogleButton from "@/components/auth/GoogleButton";
import { useAuthStore } from "@/store/auth-store";
import { useToastStore } from "@/store/toast-store";

export default function SignupForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const showToast = useToastStore((s) => s.show);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim()) {
      setError("Please enter your full name");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    if (!phone.trim() || phone.replace(/\D/g, "").length < 10) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      login({
        name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
      });
      showToast("Account created successfully! Welcome to Crunchzilla.");
      router.push("/shop");
    }, 600);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {error && (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-xl border border-error/40 bg-error-container/20 p-3 text-body-sm text-error"
        >
          <Icon name="error" className="text-[18px] shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Full Name */}
      <div className="space-y-1">
        <label
          htmlFor="signup-name"
          className="block text-label-xs font-bold uppercase tracking-wider text-on-surface-variant"
        >
          Full Name
        </label>
        <div className="relative">
          <Icon
            name="badge"
            className="pointer-events-none absolute top-3.5 left-3.5 text-[20px] text-on-surface-variant"
          />
          <input
            id="signup-name"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="e.g. Rahul Sharma"
            className="w-full min-h-[46px] rounded-xl border border-surface-container-high bg-surface-container-lowest pr-4 pl-11 text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
          />
        </div>
      </div>

      {/* Email Address */}
      <div className="space-y-1">
        <label
          htmlFor="signup-email"
          className="block text-label-xs font-bold uppercase tracking-wider text-on-surface-variant"
        >
          Email Address
        </label>
        <div className="relative">
          <Icon
            name="mail"
            className="pointer-events-none absolute top-3.5 left-3.5 text-[20px] text-on-surface-variant"
          />
          <input
            id="signup-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. crunchzilla02@gmail.com"
            className="w-full min-h-[46px] rounded-xl border border-surface-container-high bg-surface-container-lowest pr-4 pl-11 text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
          />
        </div>
      </div>

      {/* Mobile Number */}
      <div className="space-y-1">
        <label
          htmlFor="signup-phone"
          className="block text-label-xs font-bold uppercase tracking-wider text-on-surface-variant"
        >
          Mobile Number
        </label>
        <div className="relative">
          <Icon
            name="call"
            className="pointer-events-none absolute top-3.5 left-3.5 text-[20px] text-on-surface-variant"
          />
          <input
            id="signup-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g. 9448874640"
            className="w-full min-h-[46px] rounded-xl border border-surface-container-high bg-surface-container-lowest pr-4 pl-11 text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
          />
        </div>
      </div>

      {/* Create Password */}
      <div className="space-y-1">
        <label
          htmlFor="signup-password"
          className="block text-label-xs font-bold uppercase tracking-wider text-on-surface-variant"
        >
          Create Password
        </label>
        <div className="relative">
          <Icon
            name="lock"
            className="pointer-events-none absolute top-3.5 left-3.5 text-[20px] text-on-surface-variant"
          />
          <input
            id="signup-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            className="w-full min-h-[46px] rounded-xl border border-surface-container-high bg-surface-container-lowest pr-11 pl-11 text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute top-3 right-3 text-on-surface-variant transition-colors hover:text-on-surface"
          >
            <Icon name={showPassword ? "visibility_off" : "visibility"} className="text-[20px]" />
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div className="space-y-1">
        <label
          htmlFor="signup-confirm-password"
          className="block text-label-xs font-bold uppercase tracking-wider text-on-surface-variant"
        >
          Confirm Password
        </label>
        <div className="relative">
          <Icon
            name="lock_clock"
            className="pointer-events-none absolute top-3.5 left-3.5 text-[20px] text-on-surface-variant"
          />
          <input
            id="signup-confirm-password"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            className="w-full min-h-[46px] rounded-xl border border-surface-container-high bg-surface-container-lowest pr-4 pl-11 text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="mt-2 flex h-12 w-full items-center justify-center rounded-xl bg-roasted-terracotta text-label-lg font-bold text-pure-parchment shadow-md transition-all hover:bg-primary active:scale-[0.99] disabled:opacity-60"
      >
        {loading ? "Creating Account..." : "Sign Up"}
      </button>

      {/* Divider */}
      <div className="relative my-3 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-surface-container-high" />
        </div>
        <span className="relative bg-pure-parchment px-3 text-label-xs uppercase tracking-wider text-on-surface-variant">
          OR
        </span>
      </div>

      {/* Google Signup */}
      <GoogleButton label="Sign up with Google" />

      {/* Bottom Switch Link */}
      <div className="pt-2 text-center text-label-md text-on-surface-variant">
        Already have an account?{" "}
        <Link href="/login" className="font-bold text-roasted-terracotta hover:underline">
          Login
        </Link>
      </div>
    </form>
  );
}
