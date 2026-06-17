"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, MessageCircle, Clock, Check } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/ui-bits";
import { MAPS_LINK, SITE, WA_LINK, WA_LINK2 } from "@/lib/site";

const SERVICES = ["Buy a Car", "Sell My Car", "Swap My Car", "USA Import", "Savings Plan", "General Inquiry"];

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <section className="bg-neutral-950 text-white pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-40" />
        <div className="relative max-w-7xl mx-auto px-5 md:px-8">
          <span className="text-red-600 uppercase tracking-[0.3em] text-xs font-bold">Contact Us</span>
          <h1 className="mt-3 font-display font-extrabold text-5xl md:text-7xl">Let's Talk Cars.</h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-24 grid lg:grid-cols-[1fr_1.2fr] gap-12">
        {/* Left */}
        <Reveal>
          <h2 className="font-display font-extrabold text-3xl">Reach Us Directly</h2>
          <p className="text-muted-foreground mt-2">We respond within minutes on WhatsApp.</p>
          <div className="mt-8 space-y-5">
            <Info icon={MapPin} title="Showroom">
              {SITE.address}
              <a href={MAPS_LINK} target="_blank" rel="noreferrer" className="block mt-2 text-red-600 font-semibold text-sm">Open in Google Maps →</a>
            </Info>
            <Info icon={Phone} title="Call Us">
              <div className="space-y-1">
                <a href={`tel:${SITE.phone1}`} className="block hover:text-red-600">{SITE.phone1}</a>
                <a href={`tel:${SITE.phone2}`} className="block hover:text-red-600">{SITE.phone2}</a>
              </div>
            </Info>
            <Info icon={MessageCircle} title="WhatsApp">
              <div className="space-y-1">
                <a href={WA_LINK} target="_blank" rel="noreferrer" className="block text-green-600 hover:text-green-700 font-semibold">Chat with {SITE.phone1}</a>
                <a href={WA_LINK2} target="_blank" rel="noreferrer" className="block text-green-600 hover:text-green-700 font-semibold">Chat with {SITE.phone2}</a>
              </div>
            </Info>
            <Info icon={Clock} title="Business Hours">
              <div>Monday – Saturday: 9:00 AM – 7:00 PM</div>
              <div>Sunday: By appointment</div>
            </Info>
          </div>
        </Reveal>

        {/* Right form */}
        <Reveal delay={0.1}>
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 md:p-10 shadow-sm">
            {sent ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 220, damping: 16 }} className="mx-auto w-20 h-20 rounded-full bg-red-600 text-white flex items-center justify-center">
                  <Check size={36} strokeWidth={3} />
                </motion.div>
                <h3 className="mt-6 font-display font-extrabold text-3xl">Message Sent!</h3>
                <p className="mt-2 text-muted-foreground">We'll get back to you shortly. For instant response, chat us on WhatsApp.</p>
                <a href={WA_LINK} target="_blank" rel="noreferrer" className="shimmer-btn mt-6 inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-md font-bold"><MessageCircle size={18} /> Open WhatsApp</a>
              </motion.div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                className="space-y-5"
              >
                <h3 className="font-display font-extrabold text-2xl">Send us a message</h3>
                <Field label="Full Name" required><input required type="text" className={fieldCls} /></Field>
                <Field label="Phone Number" required><input required type="tel" className={fieldCls} /></Field>
                <Field label="Email (optional)"><input type="email" className={fieldCls} /></Field>
                <Field label="Service" required>
                  <select required className={fieldCls} defaultValue="">
                    <option value="" disabled>Select a service…</option>
                    {SERVICES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </Field>
                <Field label="Message" required>
                  <textarea required rows={4} className={fieldCls} placeholder="Tell us about the car you want…" />
                </Field>
                <button type="submit" className="shimmer-btn w-full bg-red-600 text-white py-3.5 rounded-md font-bold uppercase tracking-wider hover:bg-red-600/90">
                  Submit
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>

      {/* Map */}
      <section className="w-full h-[420px] bg-neutral-100">
        <iframe
          title="Barry Bee Auto map"
          src={`https://www.google.com/maps?q=${encodeURIComponent(SITE.mapsQuery)}&output=embed`}
          className="w-full h-full"
          loading="lazy"
        />
      </section>
    </>
  );
}

const fieldCls = "w-full bg-neutral-50 border border-neutral-200 focus:border-red-600 focus:ring-2 focus:ring-red-600/20 rounded-md px-4 py-3 text-sm outline-none transition-all";

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-bold uppercase tracking-wider text-neutral-800 mb-1.5">{label}{required && <span className="text-red-600">*</span>}</span>
      {children}
    </label>
  );
}

function Info({ icon: Icon, title, children }: { icon: React.ComponentType<{ size?: number }>; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="w-11 h-11 shrink-0 rounded-lg bg-red-600/10 text-red-600 flex items-center justify-center"><Icon size={20} /></div>
      <div>
        <div className="font-display font-bold text-lg">{title}</div>
        <div className="text-muted-foreground text-sm mt-1">{children}</div>
      </div>
    </div>
  );
}
