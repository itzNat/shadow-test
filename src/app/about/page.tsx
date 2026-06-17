"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Plane, Repeat, PiggyBank, MapPin, Phone, MessageCircle, Heart, BadgeCheck, Eye, Users } from "lucide-react";
import { Reveal, Section, SectionTitle, RedButton } from "@/components/ui-bits";
import { LOGO_STACKED, MAPS_LINK, SITE, WA_LINK, WA_LINK2 } from "@/lib/site";

const WHY = [
  { icon: ShieldCheck, title: "Trusted Dealer", desc: "Years of reputation built on transparent, honest deals." },
  { icon: Plane, title: "USA Direct Imports", desc: "Source any car directly from the United States, hassle-free." },
  { icon: Repeat, title: "Flexible Swap Options", desc: "Trade your current car towards a newer one with ease." },
  { icon: PiggyBank, title: "Savings Plan Available", desc: "Save towards any car of your choice, securely." },
];
const VALUES = [
  { icon: Eye, title: "Transparency", desc: "Open pricing. No surprises." },
  { icon: BadgeCheck, title: "Trust", desc: "Verified vehicles, honest service." },
  { icon: Heart, title: "Affordability", desc: "Fair value at every price point." },
  { icon: Users, title: "Customer First", desc: "Your satisfaction is the standard." },
];

export default function AboutPage() {
  return (
    <>
      {/* Banner */}
      <section className="relative bg-neutral-950 text-white pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-40" />
        <div className="relative max-w-7xl mx-auto px-5 md:px-8">
          <span className="text-red-600 uppercase tracking-[0.3em] text-xs font-bold">Who We Are</span>
          <h1 className="mt-3 font-display font-extrabold text-5xl md:text-7xl leading-[1]">
            About Barry Bee Auto
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="origin-left mt-6 h-1.5 w-32 bg-red-600 rounded-full"
          />
          <p className="mt-6 max-w-2xl text-white/70 text-lg">{SITE.tagline}</p>
        </div>
      </section>

      {/* Company profile + logo */}
      <Section>
        <div className="grid md:grid-cols-[1fr_1.4fr] gap-12 items-center">
          <Reveal>
            <div className="bg-white border border-neutral-200 rounded-2xl p-8 flex items-center justify-center">
              <img src={LOGO_STACKED} alt="Barry Bee Auto official logo" style={{ height: 200, width: "auto" }} className="object-contain" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionTitle kicker="Our Story" title="Driven by Trust. Delivering Excellence." />
            <div className="mt-5 space-y-4 text-muted-foreground leading-relaxed">
              <p>Barry Bee Auto is a premium car dealership based in Benin City, Edo State, serving customers across Nigeria. We specialize in buying, selling and swapping cars — from clean Nigerian-used vehicles to certified foreign-used cars and direct imports from the United States.</p>
              <p>Whether you're driving in to browse our showroom, looking for a specific make and model from the USA, or saving up towards your dream ride, our team is ready to guide you every step of the way.</p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Why choose us */}
      <section className="bg-neutral-100">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-28">
          <Reveal><SectionTitle kicker="Why Choose Us" title="The Barry Bee Advantage" center /></Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.08}>
                <motion.div whileHover={{ y: -6 }} className="bg-white rounded-xl p-7 text-center border border-neutral-200 hover:border-red-600 hover:shadow-lg transition-all h-full">
                  <div className="mx-auto w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center">
                    <w.icon size={24} />
                  </div>
                  <h3 className="mt-5 font-display font-bold text-lg">{w.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{w.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values 2x2 */}
      <Section>
        <Reveal><SectionTitle kicker="Our Values" title="What We Stand For" /></Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <div className="group bg-neutral-900 text-white p-8 rounded-xl flex items-start gap-5 hover:bg-red-600 transition-colors">
                <div className="w-12 h-12 shrink-0 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20">
                  <v.icon size={22} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-2xl">{v.title}</h3>
                  <p className="text-white/70 mt-1 text-sm">{v.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Location */}
      <section className="bg-neutral-100">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 text-red-600 uppercase tracking-[0.25em] text-xs font-bold">
              <MapPin size={14} /> Visit Our Showroom
            </div>
            <h2 className="mt-3 font-display font-extrabold text-4xl md:text-5xl">Find Us in Benin City</h2>
            <p className="mt-4 text-muted-foreground">{SITE.address}</p>
            <div className="mt-6"><RedButton href={MAPS_LINK} target="_blank"><MapPin size={18} /> Get Directions</RedButton></div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="aspect-[5/4] rounded-2xl overflow-hidden border border-neutral-200 bg-white relative">
              <iframe
                title="Barry Bee Auto location"
                src={`https://www.google.com/maps?q=${encodeURIComponent(SITE.mapsQuery)}&output=embed`}
                className="w-full h-full"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact strip */}
      <section className="bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-10 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="font-display font-bold text-xl">Talk to us right now.</div>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href={`tel:${SITE.phone1}`} className="inline-flex items-center gap-2 bg-white text-red-600 px-4 py-2.5 rounded-md font-semibold"><Phone size={16} /> {SITE.phone1}</a>
            <a href={`tel:${SITE.phone2}`} className="inline-flex items-center gap-2 bg-white text-red-600 px-4 py-2.5 rounded-md font-semibold"><Phone size={16} /> {SITE.phone2}</a>
            <a href={WA_LINK} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-green-500 px-4 py-2.5 rounded-md font-semibold"><MessageCircle size={16} /> WA 1</a>
            <a href={WA_LINK2} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-green-500 px-4 py-2.5 rounded-md font-semibold"><MessageCircle size={16} /> WA 2</a>
          </div>
        </div>
      </section>
    </>
  );
}
