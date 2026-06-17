"use client";

import { Car, Repeat, Plane, PiggyBank, Check, MessageCircle } from "lucide-react";
import { useEffect } from "react";
import { Reveal, RedButton } from "@/components/ui-bits";
import { WA_LINK } from "@/lib/site";

const SERVICES = [
  {
    id: "buy",
    icon: Car,
    title: "Buy a Car",
    blurb: "Wide selection of Nigerian-used and foreign-used vehicles at our Ugbowo showroom. Every car is inspected and verified.",
    bullets: ["Curated showroom inventory", "Pre-purchase inspection report", "Clear documentation handover", "Flexible payment options"],
  },
  {
    id: "swap",
    icon: Repeat,
    title: "Sell or Swap Your Car",
    blurb: "Fair valuations and seamless swap deals. Bring your car in, drive away in something new.",
    bullets: ["Honest, market-based valuation", "Same-day swap deals", "Upgrade or downgrade", "Paperwork handled end-to-end"],
  },
  {
    id: "usa",
    icon: Plane,
    title: "Order from the USA",
    blurb: "Direct USA imports. Tell us make, model, year and colour — we handle everything from purchase to clearing to your driveway.",
    bullets: ["Sourced from trusted US auctions", "Shipping & clearing covered", "Real-time progress updates", "Delivered to Benin City"],
  },
  {
    id: "savings",
    icon: PiggyBank,
    title: "Car Savings Plan",
    blurb: "Save towards any car of your choice. We hold savings securely and help you reach your goal faster.",
    bullets: ["Choose any car as your goal", "Secure, dedicated saving", "Flexible top-up schedule", "Personal account manager"],
  },
];

export default function ServicesPage() {
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      const el = document.getElementById(hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
      }
    }
  }, []);
  return (
    <>
      <section className="relative bg-neutral-950 text-white pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-40" />
        <div className="relative max-w-7xl mx-auto px-5 md:px-8">
          <span className="text-red-600 uppercase tracking-[0.3em] text-xs font-bold">Our Services</span>
          <h1 className="mt-3 font-display font-extrabold text-5xl md:text-7xl leading-[1]">Everything Auto.<br /><span className="text-red-600">Under One Roof.</span></h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-28 space-y-24">
        {SERVICES.map((s, i) => (
          <Reveal key={s.title}>
            <div id={s.id} className={`scroll-mt-28 grid md:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}>
              <div>
                <div className="inline-flex items-center gap-3 text-red-600 uppercase tracking-[0.25em] text-xs font-bold">
                  <span className="font-display font-extrabold text-2xl">0{i + 1}</span> Service
                </div>
                <h2 className="mt-3 font-display font-extrabold text-4xl md:text-5xl">{s.title}</h2>
                <p className="mt-4 text-muted-foreground text-lg leading-relaxed">{s.blurb}</p>
                <ul className="mt-6 space-y-3">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0 mt-0.5"><Check size={14} /></span>
                      <span className="text-foreground">{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8"><RedButton href={WA_LINK} target="_blank"><MessageCircle size={18} /> Get Started</RedButton></div>
              </div>
              <div className="relative aspect-square bg-gradient-to-br from-neutral-900 to-neutral-950 rounded-3xl overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 hero-grid opacity-40" />
                <s.icon size={180} strokeWidth={1} className="text-red-600/80 relative" />
                <div className="absolute top-6 right-6 text-amber-500 font-display font-extrabold text-6xl opacity-30">0{i + 1}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </>
  );
}
