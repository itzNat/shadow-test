"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

export function Section({ children, className = "", dark = false }: { children: ReactNode; className?: string; dark?: boolean }) {
  return (
    <section className={`${dark ? "bg-[var(--charcoal)] text-white" : ""} ${className}`}>
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-28">{children}</div>
    </section>
  );
}

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionTitle({ kicker, title, subtitle, light = false, center = false }: { kicker?: string; title: string; subtitle?: string; light?: boolean; center?: boolean }) {
  return (
    <div className={center ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}>
      {kicker && (
        <div className="flex items-center gap-3 mb-3">
          {center && <span className="h-px w-8 bg-[var(--crimson)]" />}
          <span className="text-[var(--crimson)] uppercase tracking-[0.25em] text-xs font-bold">{kicker}</span>
          <span className="h-px w-8 bg-[var(--crimson)]" />
        </div>
      )}
      <h2 className={`font-display font-extrabold text-4xl md:text-5xl leading-[1.05] ${light ? "text-white" : "text-charcoal"}`}>
        {title}
      </h2>
      {subtitle && <p className={`mt-4 text-base md:text-lg ${light ? "text-white/70" : "text-muted-foreground"}`}>{subtitle}</p>}
    </div>
  );
}

export function CountUp({ to, suffix = "", duration = 2 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.floor(v).toLocaleString());

  useEffect(() => {
    if (inView) {
      const controls = animate(mv, to, { duration, ease: [0.22, 1, 0.36, 1] });
      return () => controls.stop();
    }
  }, [inView, to, duration, mv]);

  return (
    <span ref={ref} className="inline-flex items-baseline">
      <motion.span>{rounded}</motion.span>
      <span>{suffix}</span>
    </span>
  );
}

export function RedButton({ children, href, type = "button", onClick, className = "", target }: { children: ReactNode; href?: string; type?: "button" | "submit"; onClick?: () => void; className?: string; target?: string }) {
  const cls = `shimmer-btn inline-flex items-center justify-center gap-2 bg-[var(--crimson)] text-white px-6 py-3 rounded-md font-semibold uppercase tracking-wider text-sm hover:bg-[var(--crimson)]/90 transition-colors ${className}`;
  if (href) return <a href={href} target={target} rel={target ? "noreferrer" : undefined} className={cls}>{children}</a>;
  return <button type={type} onClick={onClick} className={cls}>{children}</button>;
}

export function OutlineButton({ children, href, className = "", target }: { children: ReactNode; href?: string; className?: string; target?: string }) {
  const cls = `inline-flex items-center justify-center gap-2 border-2 border-white text-[var(--crimson)] bg-white px-6 py-3 rounded-md font-semibold uppercase tracking-wider text-sm hover:bg-[var(--crimson)] hover:text-white transition-colors ${className}`;
  if (href) return <a href={href} target={target} rel={target ? "noreferrer" : undefined} className={cls}>{children}</a>;
  return <button className={cls}>{children}</button>;
}
