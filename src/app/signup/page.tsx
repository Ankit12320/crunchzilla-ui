import type { Metadata } from "next";
import AuthLayout from "@/components/auth/AuthLayout";
import SignupForm from "@/components/auth/SignupForm";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: "Create an Account | Crunchzilla",
  description: `Sign up for ${SITE.name} to discover authentic and healthy slow-roasted staples from Bihar.`,
  robots: {
    index: false,
    follow: true,
  },
};

export default function SignupPage() {
  return (
    <AuthLayout
      title="Create Your Account"
      subtitle="Join hundreds of homes enjoying authentic Bihar delicacies"
    >
      <SignupForm />
    </AuthLayout>
  );
}
