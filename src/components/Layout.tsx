"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone, MessageCircle, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { LOGO_ICON, LOGO_STACKED, SITE, WA_LINK, WA_LINK2 } from "@/lib/site";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/cars", label: "Cars" },
  { to: "/contact", label: "Contact" },
] as const;

function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const solid = scrolled || !isHome;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        solid ? "bg-white border-b-2 border-red-600 shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-[72px]">
        <Link href="/" className="flex items-center gap-3">
          <img
            src={LOGO_ICON}
            alt="Barry Bee Auto"
            style={{ height: 45, width: "auto" }}
            className="object-contain"
          />
          <span className={`hidden sm:block font-display font-extrabold text-lg tracking-tight ${solid ? "text-neutral-900" : "text-white"}`}>
            BARRY BEE <span className="text-red-600">AUTO</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((n) => {
            const active = n.to === "/" ? pathname === "/" : pathname.startsWith(n.to);
            return (
              <Link
                key={n.to}
                href={n.to}
                className={`relative px-4 py-2 text-sm font-semibold uppercase tracking-wider transition-colors ${
                  solid ? "text-neutral-900 hover:text-red-600" : "text-white/90 hover:text-white"
                }`}
              >
                {n.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-3 right-3 -bottom-0.5 h-[3px] bg-red-600 rounded-full"
                  />
                )}
              </Link>
            );
          })}
          <a
            href={WA_LINK}
            target="_blank"
            rel="noreferrer"
            className="shimmer-btn ml-3 inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md text-sm font-semibold uppercase tracking-wider hover:bg-red-600/90"
          >
            <MessageCircle size={16} /> WhatsApp
          </a>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className={`md:hidden p-2 rounded ${solid ? "text-neutral-900" : "text-white"}`}
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="md:hidden id-drawer fixed top-[72px] right-0 bottom-0 w-[78%] bg-red-600 z-40 shadow-2xl"
          >
            <div className="flex flex-col p-6 gap-2">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  href={n.to}
                  className="text-white text-2xl font-display font-bold py-3 border-b border-white/15"
                >
                  {n.label}
                </Link>
              ))}
              <a
                href={WA_LINK}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-2 bg-white text-red-600 px-5 py-3 rounded-md font-bold"
              >
                <MessageCircle size={18} /> Chat on WhatsApp
              </a>
              <a href={`tel:${SITE.phone1}`} className="inline-flex items-center justify-center gap-2 mt-2 text-white border border-white/40 px-5 py-3 rounded-md font-semibold">
                <Phone size={18} /> {SITE.phone1}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-neutral-900 text-white/80 mt-24">
      <div className="border-t-2 border-red-600" />
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-14 grid gap-10 md:grid-cols-3">
        <div>
          <img
            src={LOGO_STACKED}
            alt="Barry Bee Auto"
            style={{ height: 80, width: "auto" }}
            className="object-contain bg-white rounded-lg p-3"
          />
          <p className="mt-4 text-sm text-white/70 max-w-xs">{SITE.shortTag}</p>
          <div className="flex gap-3 mt-5">
            {[Facebook, Instagram, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-colors">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-white font-display font-bold uppercase tracking-wider text-sm mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link href={n.to} className="hover:text-red-600">{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-display font-bold uppercase tracking-wider text-sm mb-4">Contact</h4>
          <p className="text-sm flex gap-2 items-start"><MapPin size={16} className="text-red-600 mt-1 shrink-0" />{SITE.address}</p>
          <div className="mt-3 space-y-1.5 text-sm">
            <a href={`tel:${SITE.phone1}`} className="flex items-center gap-2 hover:text-red-600"><Phone size={14} /> {SITE.phone1}</a>
            <a href={`tel:${SITE.phone2}`} className="flex items-center gap-2 hover:text-red-600"><Phone size={14} /> {SITE.phone2}</a>
            <a href={WA_LINK} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-green-400"><MessageCircle size={14} /> WhatsApp 1</a>
            <a href={WA_LINK2} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-green-400"><MessageCircle size={14} /> WhatsApp 2</a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-5 text-xs text-white/50 text-center">
          © 2026 Barry Bee Auto. All Rights Reserved. Benin City, Edo State, Nigeria.
        </div>
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="wa-pulse fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg hover:bg-green-600"
    >
      <MessageCircle size={26} />
    </a>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
