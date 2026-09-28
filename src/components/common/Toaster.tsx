"use client";

import { useEffect } from "react";
import Icon from "@/components/common/Icon";
import { useToastStore } from "@/store/toast-store";

export default function Toaster() {
  const message = useToastStore((s) => s.message);
  const hide = useToastStore((s) => s.hide);

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(hide, 2500);
    return () => clearTimeout(timer);
  }, [message, hide]);

  if (!message) return null;

  return (
    <div
      role="status"
      className="fixed bottom-20 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-charcoal-bark px-5 py-2.5 text-label-md text-pure-parchment shadow-2xl animate-in fade-in-0 slide-in-from-bottom-2"
    >
      <Icon name="check_circle" className="text-[18px] text-whatsapp-emerald" />
      {message}
    </div>
  );
}
