import Icon from "@/components/common/Icon";
import { SITE } from "@/constants/site";

export default function WhatsAppDeskCard() {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-whatsapp-emerald to-botanical-forest p-6 text-on-primary shadow-lg">
      <div className="absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-white/10 blur-xl transition-transform duration-500 group-hover:scale-125" />
      <div className="relative z-10 flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-1 text-label-sm tracking-wide backdrop-blur-md">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
            ACTIVE NOW • {SITE.supportHours}
          </span>
          <Icon name="chat" className="text-3xl opacity-80" />
        </div>
        <div className="space-y-1">
          <h2 className="font-display text-headline-sm font-semibold tracking-tight">
            Direct WhatsApp Desk
          </h2>
          <p className="text-body-sm text-pure-parchment/90">
            Fastest response for quick orders, shipment updates, taste queries, and bespoke
            requests.
          </p>
        </div>
        <div className="pt-2 space-y-2.5">
          <a
            href={SITE.orderWhatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-pure-parchment px-4 py-3 text-label-md font-bold text-botanical-forest shadow-md transition-all duration-200 hover:scale-[1.02] hover:bg-golden-sand active:scale-[0.98]"
          >
            <Icon name="chat" className="text-[20px] text-whatsapp-emerald" />
            Order Now: {SITE.orderPhoneDisplay}
          </a>
          <a
            href={SITE.supportWhatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white/20 border border-white/30 px-4 py-3 text-label-md font-bold text-pure-parchment backdrop-blur-md shadow-md transition-all duration-200 hover:scale-[1.02] hover:bg-white/30 active:scale-[0.98]"
          >
            <Icon name="chat" className="text-[20px] text-emerald-300" />
            WhatsApp Support: {SITE.supportPhoneDisplay}
          </a>
        </div>
      </div>
    </div>
  );
}
