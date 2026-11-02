import type { Metadata } from "next";
import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: "Login to Your Account | Crunchzilla",
  description: `Sign in to your ${SITE.name} account to manage orders, addresses, and discover authentic traditional foods from Bihar.`,
  robots: {
    index: false,
    follow: true,
  },
};

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Login to your account or continue shopping authentic staples"
    >
      <LoginForm />
    </AuthLayout>
  );
}

