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
      className="fixed right-6 bottom-6 z-50 flex items-center gap-2 rounded-full bg-whatsapp-emerald px-5 py-3 text-label-lg text-pure-parchment shadow-[0_8px_30px_rgba(0,0,0,0.18)] transition-all duration-200 hover:scale-105 active:scale-95"
    >
      <Icon name="chat" className="text-[24px]" />
      <span className="hidden sm:inline">Order via WhatsApp ({SITE.phoneDisplay})</span>
    </a>
  );
}
