import Icon from "@/components/common/Icon";
import { SITE } from "@/constants/site";
import { whatsappLink } from "@/lib/whatsapp";

/** Floating "Order via WhatsApp" button, shown on every page. */
export default function WhatsAppFab() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Order via WhatsApp (${SITE.phoneDisplay})`}
      className="fixed right-[max(1rem,env(safe-area-inset-right,0px))] bottom-[max(5rem,calc(4.5rem+env(safe-area-inset-bottom,0px)))] sm:right-6 sm:bottom-6 z-40 flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-whatsapp-emerald px-4 py-3 sm:px-5 text-label-lg font-bold text-pure-parchment shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-all duration-200 hover:scale-105 active:scale-95"
    >
      <Icon name="chat" className="text-[24px] shrink-0" />
      <span className="hidden sm:inline">Order via WhatsApp ({SITE.phoneDisplay})</span>
      <span className="sm:hidden text-label-sm font-bold">WhatsApp</span>
    </a>
  );
}
