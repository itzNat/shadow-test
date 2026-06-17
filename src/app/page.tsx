"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Car, Repeat, ShoppingCart, Plane, PiggyBank, Star, ArrowRight, MessageCircle, Phone } from "lucide-react";
import { CountUp, Reveal, RedButton, OutlineButton, Section, SectionTitle } from "@/components/ui-bits";
import { CarCard, CarModal, type Car as CarType } from "@/components/car-showcase";
import { SITE, WA_LINK } from "@/lib/site";

const HERO_WORDS = ["Buy", "Sell", "Swap", "Import", "Save"];
const STATS = [
  { value: 500, suffix: "+", label: "Cars Sold" },
  { value: 1200, suffix: "+", label: "Happy Customers" },
  { value: 8, suffix: "+", label: "Years in Business" },
  { value: 250, suffix: "+", label: "USA Imports" },
];
const SERVICES = [
  { icon: Car, title: "Buy a Car", desc: "Browse our curated showroom of inspected Nigerian and foreign-used vehicles.", href: "/services#buy" },
  { icon: ShoppingCart, title: "Sell Your Car", desc: "Fair, transparent valuations. Walk in with your car, walk out paid.", href: "/services#swap" },
  { icon: Repeat, title: "Swap Your Car", desc: "Trade up or trade across. Seamless swap deals tailored to you.", href: "/services#swap" },
  { icon: Plane, title: "Order from USA", desc: "Tell us the make, model and year. We import directly from the USA.", href: "/services#usa" },
];
const STEPS = [
  { n: "01", title: "Browse or Tell Us What You Want", desc: "Walk into our showroom or chat us on WhatsApp with your dream car." },
  { n: "02", title: "We Source or Show You Options", desc: "From our stock or direct from the USA — we find the perfect match." },
  { n: "03", title: "Drive Away Happy", desc: "Inspection, paperwork and handover handled. You drive away with confidence." },
];
const REVIEWS = [
  { name: "Osayi I.", text: "Got my Camry imported from the USA in record time. Smooth, transparent, professional.", role: "Benin City" },
  { name: "Ngozi O.", text: "I swapped my old SUV for a newer Lexus. The valuation was fair and the process was effortless.", role: "Edo State" },
  { name: "Tunde A.", text: "Their savings plan helped me drive home in my dream car. Barry Bee Auto are the real deal.", role: "Lagos" },
];

const SHOWROOM_CARS: CarType[] = [
  {
    id: 11,
    name: "Mercedes-Benz ML350",
    year: 2015,
    category: "Foreign Used",
    badge: "New Arrival",
    condition: "Tokunbo — Accident Free",
    description: "Toks, super clean black leather interior, full option, thumb start, open roof, accident free.",
    features: ["Full Option", "Black Exterior", "Thumb Start", "Open Roof", "Super Clean Leather Interior", "Accident Free"],
    images: [
      "https://res.cloudinary.com/dvovbqijz/image/upload/v1781371953/IMG-20260613-WA0014_rxzcbg.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/v1781371978/IMG-20260613-WA0019_phcwys.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/v1781371981/IMG-20260613-WA0020_y4k0mn.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/v1781371952/IMG-20260613-WA0018_vpzb58.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/v1781371950/IMG-20260613-WA0016_zei7gj.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/v1781371949/IMG-20260613-WA0017_fjfzk4.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/v1781371948/IMG-20260613-WA0015_do8svj.jpg",
    ],
  },
  {
    id: 12,
    name: "Mercedes-Benz C300",
    year: 2009,
    category: "Foreign Used",
    badge: "New Arrival",
    condition: "Tokunbo — Accident Free",
    description: "Toks, super clean interior, beautiful, open roof, accident free.",
    features: ["Open Roof", "Super Clean Interior", "Accident Free"],
    images: [
      "https://res.cloudinary.com/dvovbqijz/image/upload/v1781372376/IMG-20260613-WA0030_medcew.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/v1781372378/IMG-20260613-WA0031_lwtmh2.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/v1781372376/IMG-20260613-WA0028_elagww.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/v1781372377/IMG-20260613-WA0032_xwdn9a.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/v1781372375/IMG-20260613-WA0029_oahdsi.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/v1781372373/IMG-20260613-WA0027_jsz1py.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/v1781372372/IMG-20260613-WA0026_lyhybm.jpg",
    ],
  },
  {
    id: 13,
    name: "Mercedes-Benz GLC300",
    year: 2018,
    category: "Foreign Used",
    badge: "New Arrival",
    condition: "Tokunbo — Accident Free",
    description: "Toks, super clean leather interior, beautiful, full option, thumb start, panoramic roof, accident free.",
    features: ["Full Option", "Thumb Start", "Panoramic Roof", "Super Clean Leather Interior", "Accident Free"],
    images: [
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781372537/IMG-20260613-WA0038_ate7zk.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781372537/IMG-20260613-WA0036_ju84hp.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781372536/IMG-20260613-WA0037_u9rce8.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781372536/IMG-20260613-WA0035_jblbzh.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781372535/IMG-20260613-WA0034_olia0g.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781372437/IMG-20260613-WA0033_zfnhqt.jpg",
    ],
  },
  {
    id: 14,
    name: "Toyota Venza",
    year: 2012,
    category: "Foreign Used",
    badge: "New Arrival",
    condition: "Tokunbo — Accident Free",
    description: "Toks, super clean leather interior, beautiful, full option, thumb start, panoramic roof, accident free.",
    features: ["Full Option", "Thumb Start", "Panoramic Roof", "Super Clean Leather Interior", "Accident Free"],
    images: [
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781372630/IMG-20260613-WA0045_kxelib.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781372629/IMG-20260613-WA0044_nhj4ae.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781372628/IMG-20260613-WA0043_hmlhph.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781372626/IMG-20260613-WA0042_ttgzgi.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781372627/IMG-20260613-WA0041_a3e8xp.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781372610/IMG-20260613-WA0039_p5tp2z.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781372625/IMG-20260613-WA0040_teoicg.jpg",
    ],
  },
];

export default function HomePage() {
  const [selected, setSelected] = useState<CarType | null>(null);
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center bg-neutral-950 text-white overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/95" />
        <motion.div
          aria-hidden
          initial={{ x: "-30%" }}
          animate={{ x: "30%" }}
          transition={{ repeat: Infinity, repeatType: "mirror", duration: 14, ease: "easeInOut" }}
          className="absolute -top-40 -right-40 w-[900px] h-[900px] rounded-full bg-red-600/10 blur-3xl"
        />
        <div className="relative max-w-7xl mx-auto px-5 md:px-8 pt-32 pb-24 w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 border border-white/20 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-white/80"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-600" /> Benin City · Edo State
          </motion.div>
          <motion.h1
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "Rajdhani, Syne, sans-serif", letterSpacing: "0.04em", textShadow: "0 0 40px rgba(204,0,0,0.35)" }}
            className="mt-6 font-extrabold text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] leading-[0.9] max-w-6xl"
          >
            <span className="text-white">BARRY BEE </span>
            <span className="text-red-600 relative inline-block">
              AUTO
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="absolute left-0 right-0 -bottom-2 h-1.5 bg-gradient-to-r from-red-600 via-amber-500 to-transparent origin-left"
              />
            </span>
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-6 text-lg sm:text-xl md:text-2xl text-white/75 font-light tracking-wide"
          >
            Your Trusted Car Dealer in Benin City
          </motion.p>

          <div className="mt-7 flex flex-wrap items-center gap-x-2 gap-y-2 text-lg md:text-xl text-white/80 font-medium">
            {HERO_WORDS.map((w, i) => (
              <span key={w} className="inline-flex items-center gap-2">
                <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + i * 0.18, duration: 0.5 }}>
                  {w}.
                </motion.span>
                {i < HERO_WORDS.length - 1 && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.05 + i * 0.18 }} className="w-1.5 h-1.5 rounded-full bg-red-600 inline-block" />
                )}
              </span>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8, duration: 0.6 }} className="mt-10 flex flex-wrap gap-4">
            <RedButton href="/cars"><Car size={18} /> Browse Cars</RedButton>
            <OutlineButton href={WA_LINK} target="_blank"><MessageCircle size={18} /> WhatsApp Us</OutlineButton>
          </motion.div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 inset-x-0 border-t border-white/10 bg-black/60 backdrop-blur">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 px-5 md:px-8">
            {STATS.map((s, i) => (
              <div key={s.label} className={`py-6 ${i > 0 ? "md:border-l border-white/10" : ""} ${i % 2 === 1 ? "border-l border-white/10 md:border-l" : ""}`}>
                <div className="font-display font-extrabold text-3xl md:text-4xl text-amber-500">
                  <CountUp to={s.value} suffix={s.suffix} />
                </div>
                <div className="text-xs md:text-sm uppercase tracking-widest text-white/60 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES OVERVIEW */}
      <Section>
        <Reveal>
          <SectionTitle kicker="What We Do" title="Premium Auto Services" subtitle="Everything you need to drive home in your next car — under one trusted roof." />
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <motion.a
                href={s.href}
                whileHover={{ y: -8, rotateX: 4, rotateY: -4 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                style={{ transformStyle: "preserve-3d" }}
                className="group h-full block bg-white border border-neutral-200 rounded-xl p-7 hover:border-red-600 hover:shadow-[0_20px_50px_-20px_rgba(204,0,0,0.4)] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-red-600/10 text-red-600 flex items-center justify-center mb-5 group-hover:bg-red-600 group-hover:text-white transition-colors">
                  <s.icon size={24} />
                </div>
                <h3 className="font-display font-bold text-xl">{s.title}</h3>
                <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{s.desc}</p>
                <div className="mt-5 text-red-600 text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn more <ArrowRight size={14} />
                </div>
              </motion.a>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* HOW IT WORKS */}
      <section className="bg-neutral-100">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-28">
          <Reveal>
            <SectionTitle kicker="How It Works" title="Three Steps to Your Next Ride" center />
          </Reveal>
          <div className="relative mt-14 grid gap-10 md:grid-cols-3">
            <motion.div
              aria-hidden
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="hidden md:block absolute top-9 left-[16%] right-[16%] h-0.5 bg-red-600/30 origin-left"
            />
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={0.3 + i * 0.2} className="relative text-center">
                <div className="mx-auto w-[72px] h-[72px] rounded-full bg-white border-2 border-red-600 flex items-center justify-center font-display font-extrabold text-2xl text-red-600 relative z-10">
                  {s.n}
                </div>
                <h3 className="mt-5 font-display font-bold text-xl">{s.title}</h3>
                <p className="mt-2 text-muted-foreground text-sm max-w-xs mx-auto">{s.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SHOWROOM — FEATURED VEHICLES */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <SectionTitle
              kicker="Showroom"
              title="Showroom — Featured Vehicles"
              subtitle="A closer look at some of our finest arrivals"
            />
          </Reveal>
          <Reveal>
            <a href="/cars" className="text-sm uppercase tracking-wider font-bold text-red-600 inline-flex items-center gap-2">
              View All <ArrowRight size={16} />
            </a>
          </Reveal>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {SHOWROOM_CARS.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.08}>
              <CarCard car={c} onView={() => setSelected(c)} />
            </Reveal>
          ))}
        </div>
      </Section>

      <AnimatePresence>
        {selected && <CarModal car={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>

      {/* SAVINGS TEASER */}
      <section className="relative bg-neutral-950 text-white overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-40" />
        <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-red-600/15 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 text-amber-500 text-xs uppercase tracking-[0.25em] font-bold">
              <PiggyBank size={14} /> Savings Plan
            </div>
            <h2 className="mt-3 font-display font-extrabold text-4xl md:text-6xl leading-tight">
              Save Towards Your <span className="text-red-600">Dream Car</span>
            </h2>
            <p className="mt-5 text-white/70 max-w-lg">Set a goal, save with us securely, and let our team help you reach it faster. No middlemen. No surprises.</p>
            <div className="mt-7"><RedButton href={WA_LINK} target="_blank"><MessageCircle size={18} /> Start Saving</RedButton></div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="bg-white/5 border border-white/10 backdrop-blur rounded-2xl p-8">
              <div className="flex items-center justify-between text-sm text-white/60">
                <span>Goal</span><span>₦ 12,500,000</span>
              </div>
              <div className="mt-3 h-3 bg-white/10 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} whileInView={{ width: "68%" }} viewport={{ once: true }} transition={{ duration: 1.4, ease: "easeOut" }} className="h-full bg-gradient-to-r from-red-600 to-amber-500" />
              </div>
              <div className="mt-2 text-xs text-white/60">68% saved</div>
              <div className="grid grid-cols-3 gap-4 mt-6">
                {[{ k: "Secure", v: "100%" }, { k: "Flexible", v: "Any Car" }, { k: "Track", v: "Live" }].map((x) => (
                  <div key={x.k} className="bg-black/40 rounded-lg p-4">
                    <div className="font-display font-extrabold text-2xl text-amber-500">{x.v}</div>
                    <div className="text-xs text-white/60 mt-0.5 uppercase tracking-wider">{x.k}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <Section>
        <Reveal><SectionTitle kicker="Reviews" title="What Our Customers Say" center /></Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.1}>
              <div className="bg-white border border-neutral-200 rounded-xl p-7 h-full hover:border-red-600 transition-colors">
                <div className="flex gap-0.5 text-amber-500">
                  {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                </div>
                <p className="mt-4 text-neutral-800 leading-relaxed">"{r.text}"</p>
                <div className="mt-5 pt-5 border-t border-neutral-200">
                  <div className="font-display font-bold">{r.name}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">{r.role}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* FOOTER CTA */}
      <section className="bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-14 flex flex-col md:flex-row gap-6 items-center justify-between">
          <div>
            <h3 className="font-display font-extrabold text-3xl md:text-4xl">Ready to get your car today?</h3>
            <p className="mt-2 text-white/80">Call us now or message us on WhatsApp — we respond within minutes.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={`tel:${SITE.phone1}`} className="inline-flex items-center gap-2 bg-white text-red-600 px-6 py-3 rounded-md font-bold"><Phone size={18} /> {SITE.phone1}</a>
            <a href={`tel:${SITE.phone2}`} className="inline-flex items-center gap-2 bg-black/20 border border-white/30 text-white px-6 py-3 rounded-md font-bold"><Phone size={18} /> {SITE.phone2}</a>
          </div>
        </div>
      </section>
    </>
  );
}
