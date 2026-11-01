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
      className="fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-50 flex min-h-[48px] min-w-[48px] items-center justify-center gap-2 rounded-full bg-whatsapp-emerald px-4 py-3 sm:px-5 text-label-lg text-pure-parchment shadow-[0_8px_30px_rgba(0,0,0,0.18)] transition-all duration-200 active:scale-95"
    >
      <Icon name="chat" className="text-[24px]" />
      <span className="hidden sm:inline">Order via WhatsApp ({SITE.phoneDisplay})</span>
    </a>
  );
}
