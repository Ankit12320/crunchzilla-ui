import type { Metadata } from "next";
import AuthLayout from "@/components/auth/AuthLayout";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: "Forgot Your Password? | Crunchzilla",
  description: `Reset your ${SITE.name} account password securely using your email address or mobile number.`,
  robots: {
    index: false,
    follow: true,
  },
};

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Forgot Your Password?"
      subtitle="Recover your account quickly and securely"
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}

