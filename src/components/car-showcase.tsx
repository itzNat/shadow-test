"use client";

import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { MessageCircle, X, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { WA_LINK } from "@/lib/site";

export type Car = {
  id: number;
  name: string;
  year: number;
  category: "Nigerian Used" | "Foreign Used" | "USA Import";
  badge: string;
  condition: string;
  description: string;
  features: string[];
  images: string[];
};

export function CardSlideshow({ images, alt }: { images: string[]; alt: string }) {
  const preview = images.slice(0, 3);
  const [idx, setIdx] = useState(0);
  const go = (dir: number) => setIdx((p) => (p + dir + preview.length) % preview.length);
  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -50) go(1);
    else if (info.offset.x > 50) go(-1);
  };
  return (
    <div className="relative aspect-4/3 overflow-hidden bg-charcoal">
      <AnimatePresence initial={false} mode="wait">
        <motion.img
          key={idx}
          src={preview[idx]}
          alt={alt}
          loading="lazy"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={onDragEnd}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 w-full h-full object-cover select-none cursor-grab active:cursor-grabbing"
          draggable={false}
        />
      </AnimatePresence>
      {preview.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); go(-1); }}
            aria-label="Previous photo"
            className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); go(1); }}
            aria-label="Next photo"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur"
          >
            <ChevronRight size={18} />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {preview.map((_, i) => (
              <span key={i} className={`h-1.5 rounded-full transition-all ${i === idx ? "w-5 bg-white" : "w-1.5 bg-white/50"}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function CarCard({ car, onView }: { car: Car; onView: () => void }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className="group bg-white border border-border rounded-xl overflow-hidden hover:shadow-xl hover:border-red-600/40 transition-all h-full flex flex-col"
    >
      <div className="relative">
        <CardSlideshow images={car.images} alt={car.name} />
        <div className="absolute top-3 left-3 bg-red-600 text-white text-xs uppercase tracking-wider font-bold px-2.5 py-1 rounded">{car.badge}</div>
        <div className="absolute top-3 right-3 bg-black/70 text-white text-xs uppercase tracking-wider font-bold px-2.5 py-1 rounded backdrop-blur">{car.category}</div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="text-xs text-muted-foreground uppercase tracking-widest">{car.year}</div>
        <h3 className="font-display font-bold text-lg mt-1">{car.name}</h3>
        <p className="text-sm text-muted-foreground mt-2 flex-1 line-clamp-2">{car.description}</p>
        <div className="mt-4">
          <span className="text-red-600 font-bold text-sm">Contact for Price</span>
        </div>
        <div className="mt-3 flex gap-2">
          <button onClick={onView} className="flex-1 bg-red-600 text-white py-2.5 rounded-md text-sm font-semibold uppercase tracking-wider hover:bg-red-600/90 transition-colors">View Details</button>
          <a href={WA_LINK} target="_blank" rel="noreferrer" className="bg-green-500 text-white px-4 rounded-md flex items-center justify-center hover:bg-green-600 transition-colors" aria-label="WhatsApp"><MessageCircle size={18} /></a>
        </div>
      </div>
    </motion.div>
  );
}

export function CarModal({ car, onClose }: { car: Car; onClose: () => void }) {
  const [idx, setIdx] = useState(0);
  const go = (dir: number) => setIdx((p) => (p + dir + car.images.length) % car.images.length);
  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) go(1);
    else if (info.offset.x > 60) go(-1);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 240 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-3xl h-full overflow-y-auto relative"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/95 flex items-center justify-center hover:bg-white shadow-lg"
        >
          <X size={18} />
        </button>

        <div className="relative aspect-video bg-charcoal overflow-hidden">
          <AnimatePresence initial={false} mode="wait">
            <motion.img
              key={idx}
              src={car.images[idx]}
              alt={`${car.name} photo ${idx + 1}`}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={onDragEnd}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 w-full h-full object-cover select-none cursor-grab active:cursor-grabbing"
              draggable={false}
            />
          </AnimatePresence>
          <button onClick={() => go(-1)} aria-label="Previous" className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/55 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur">
            <ChevronLeft size={20} />
          </button>
          <button onClick={() => go(1)} aria-label="Next" className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/55 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur">
            <ChevronRight size={20} />
          </button>
          <div className="absolute top-4 left-4 bg-red-600 text-white text-xs uppercase tracking-wider font-bold px-3 py-1.5 rounded">{car.badge}</div>
          <div className="absolute bottom-3 right-4 bg-black/65 text-white text-xs font-semibold px-2.5 py-1 rounded backdrop-blur">
            {idx + 1} / {car.images.length}
          </div>
        </div>

        <div className="bg-neutral-100 px-4 py-3 overflow-x-auto">
          <div className="flex gap-2">
            {car.images.map((src, i) => (
              <button
                key={src}
                onClick={() => setIdx(i)}
                className={`relative shrink-0 w-20 h-16 rounded-md overflow-hidden border-2 transition-all ${i === idx ? "border-red-600 scale-105" : "border-transparent opacity-70 hover:opacity-100"}`}
              >
                <img src={src} alt="" loading="lazy" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-muted-foreground uppercase tracking-widest">{car.year}</span>
            <span className="text-xs bg-amber-500/10 text-charcoal font-bold uppercase tracking-wider px-2 py-0.5 rounded">{car.condition}</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl mt-1.5">{car.name}</h2>
          <p className="text-muted-foreground mt-3 leading-relaxed">{car.description}</p>

          <div className="mt-6">
            <div className="text-xs uppercase tracking-widest text-red-600 font-bold mb-3">Highlights</div>
            <ul className="grid sm:grid-cols-2 gap-2">
              {car.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0"><Check size={12} /></span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
            {[["Year", car.year], ["Category", car.category], ["Price", "On Request"], ["Status", "Available"]].map(([k, v]) => (
              <div key={k as string} className="bg-neutral-100 p-3 rounded">
                <div className="text-xs text-muted-foreground uppercase tracking-wider">{k}</div>
                <div className="font-bold mt-0.5">{v}</div>
              </div>
            ))}
          </div>

          <a
            href={WA_LINK}
            target="_blank"
            rel="noreferrer"
            className="mt-8 w-full inline-flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-4 rounded-md font-bold uppercase tracking-wider hover:bg-green-600 transition-colors shadow-lg"
          >
            <MessageCircle size={18} /> Interested? Chat with us on WhatsApp
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
