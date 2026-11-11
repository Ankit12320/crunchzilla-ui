"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Icon from "@/components/common/Icon";
import GoogleButton from "@/components/auth/GoogleButton";
import { useAuthStore } from "@/store/auth-store";
import { useToastStore } from "@/store/toast-store";

export default function LoginForm() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const showToast = useToastStore((s) => s.show);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmed = identifier.trim();
    if (!trimmed) {
      setError("Please enter your email address or mobile number");
      return;
    }

    if (!password || password.length < 4) {
      setError("Please enter a valid password (at least 4 characters)");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      login({
        name: trimmed.includes("@") ? trimmed.split("@")[0] : "Customer",
        email: trimmed.includes("@") ? trimmed : "crunchzilla02@gmail.com",
        phone: !trimmed.includes("@") ? trimmed : "7856019631",
      });
      showToast("Logged in successfully! Welcome back.");
      router.push("/shop");
    }, 500);
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

      {/* Identifier Field */}
      <div className="space-y-1.5">
        <label
          htmlFor="login-identifier"
          className="block text-label-xs font-bold uppercase tracking-wider text-on-surface-variant"
        >
          Email Address or Mobile Number
        </label>
        <div className="relative">
          <Icon
            name="person"
            className="pointer-events-none absolute top-3.5 left-3.5 text-[20px] text-on-surface-variant"
          />
          <input
            id="login-identifier"
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="e.g. crunchzilla02@gmail.com or 7856019631"
            className="w-full min-h-[46px] rounded-xl border border-surface-container-high bg-surface-container-lowest pr-4 pl-11 text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
          />
        </div>
      </div>

      {/* Password Field */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="login-password"
            className="block text-label-xs font-bold uppercase tracking-wider text-on-surface-variant"
          >
            Password
          </label>
          <Link
            href="/forgot-password"
            className="text-label-xs font-bold text-roasted-terracotta hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
        <div className="relative">
          <Icon
            name="lock"
            className="pointer-events-none absolute top-3.5 left-3.5 text-[20px] text-on-surface-variant"
          />
          <input
            id="login-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
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

      {/* Remember Me */}
      <div className="flex items-center gap-2 pt-1">
        <input
          id="remember-me"
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="h-4 w-4 rounded accent-primary cursor-pointer"
        />
        <label htmlFor="remember-me" className="text-label-sm text-on-surface cursor-pointer select-none">
          Remember me on this device
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="mt-2 flex h-12 w-full items-center justify-center rounded-xl bg-roasted-terracotta text-label-lg font-bold text-pure-parchment shadow-md transition-all hover:bg-primary active:scale-[0.99] disabled:opacity-60"
      >
        {loading ? "Logging in..." : "Login to Account"}
      </button>

      {/* Divider */}
      <div className="relative my-4 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-surface-container-high" />
        </div>
        <span className="relative bg-pure-parchment px-3 text-label-xs uppercase tracking-wider text-on-surface-variant">
          OR
        </span>
      </div>

      {/* Google Login */}
      <GoogleButton label="Continue with Google" />

      {/* Bottom Switch Link */}
      <div className="pt-3 text-center text-label-md text-on-surface-variant">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-bold text-roasted-terracotta hover:underline">
          Sign Up
        </Link>
      </div>
    </form>
  );
}
