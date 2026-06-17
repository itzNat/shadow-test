"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { Reveal, RedButton } from "@/components/ui-bits";
import { WA_LINK } from "@/lib/site";
import { CarCard, CarModal, type Car } from "@/components/car-showcase";

const CARS: Car[] = [
  {
    id: 1,
    name: "Mercedes-Benz GLB 250 4MATIC",
    year: 2021,
    category: "Foreign Used",
    badge: "New Arrival",
    condition: "Foreign Used — Duty Paid",
    description: "Full option, super clean leather interior, duty paid, everything working perfectly.",
    features: ["Full Option", "Leather Interior", "Duty Paid", "All Systems Working", "4MATIC AWD"],
    images: [
      "https://res.cloudinary.com/dvovbqijz/image/upload/v1781172895/IMG-20260610-WA0012_pfe0ej.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781172894/IMG-20260610-WA0020_rto9mz.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781172897/IMG-20260610-WA0009_cqevwh.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781172894/IMG-20260610-WA0017_lfkvgp.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781172890/IMG-20260610-WA0016_oh8vdo.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781172894/IMG-20260610-WA0010_kajt4u.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781172897/IMG-20260610-WA0002_gf8blh.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781172897/IMG-20260610-WA0003_sj5tn7.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781172890/IMG-20260610-WA0006_kv395k.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781172892/IMG-20260610-WA0005_kup383.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781172890/IMG-20260610-WA0008_xn0bld.jpg",
    ],
  },
  {
    id: 2,
    name: "Mercedes-Benz GLA 250",
    year: 2016,
    category: "Foreign Used",
    badge: "New Arrival",
    condition: "Tokunbo — Accident Free",
    description: "Toks, full option, panoramic roof, thumb start, reverse camera, super clean leather interior, accident free.",
    features: ["Full Option", "Panoramic Roof", "Thumb Start", "Reverse Camera", "Leather Interior", "Accident Free"],
    images: [
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781172954/IMG-20260610-WA0051_sv1jf4.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781172953/IMG-20260610-WA0023_zegktd.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781172960/IMG-20260610-WA0022_lvnowe.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781172954/IMG-20260610-WA0030_jxkn9m.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781172952/IMG-20260610-WA0015_cpq1vu.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781172953/IMG-20260610-WA0024_mqyq7g.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781172955/IMG-20260610-WA0019_h4qbhj.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781172955/IMG-20260610-WA0035_dhhult.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781172960/IMG-20260610-WA0004_vyfe0o.jpg",
    ],
  },
  {
    id: 3,
    name: "Mercedes-Benz GLK 350",
    year: 2012,
    category: "Foreign Used",
    badge: "New Arrival",
    condition: "Tokunbo — Accident Free",
    description: "Toks, full option, panoramic roof, thumb start, super clean leather interior, accident free.",
    features: ["Full Option", "Panoramic Roof", "Thumb Start", "Leather Interior", "Accident Free"],
    images: [
      "https://res.cloudinary.com/dvovbqijz/image/upload/v1781173037/IMG-20260610-WA0014_ds3juk.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/v1781173037/IMG-20260610-WA0013_kh5ke8.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/v1781173036/IMG-20260610-WA0021_g9bdbr.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/v1781173020/IMG-20260610-WA0038_buieho.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/v1781173008/IMG-20260610-WA0036_fguw5q.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/v1781173007/IMG-20260610-WA0034_rjz59m.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/v1781173005/IMG-20260610-WA0037_fbwumc.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/v1781173005/IMG-20260610-WA0083_epxnln.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/v1781173004/IMG-20260610-WA0064_hcih1d.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/v1781173002/IMG-20260610-WA0069_ijz1ku.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/v1781173001/IMG-20260610-WA0039_qy3dcj.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/v1781172999/IMG-20260610-WA0045_xvuw63.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/v1781172997/IMG-20260610-WA0058_jdojce.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/v1781172997/IMG-20260610-WA0073_jytm91.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/v1781172996/IMG-20260610-WA0089_tfod2l.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/v1781172995/IMG-20260610-WA0085_nwsesy.jpg",
    ],
  },
  {
    id: 4,
    name: "Toyota Tacoma",
    year: 2021,
    category: "Foreign Used",
    badge: "New Arrival",
    condition: "Foreign Used — Duty Paid",
    description: "Foreign used, new arrival, duty paid, everything working perfectly.",
    features: ["Duty Paid", "Foreign Used", "All Systems Working"],
    images: [
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173081/IMG-20260610-WA0027_ja2zkw.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173081/IMG-20260610-WA0041_dppop7.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173080/IMG-20260610-WA0028_w8wsqe.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173075/IMG-20260610-WA0031_iwm9jb.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173074/IMG-20260610-WA0032_isljkh.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173074/IMG-20260610-WA0025_n5fhnu.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173073/IMG-20260610-WA0082_valzoq.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173073/IMG-20260610-WA0111_s9ghg8.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173072/IMG-20260610-WA0090_v5ieow.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173070/IMG-20260610-WA0040_uu1pfq.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173070/IMG-20260610-WA0097_kg9at0.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173067/IMG-20260610-WA0075_gjrnkk.jpg",
    ],
  },
  {
    id: 5,
    name: "Toyota Corolla",
    year: 2010,
    category: "Nigerian Used",
    badge: "New Arrival",
    condition: "Tokunbo — Duty Paid",
    description: "Toks, super clean leather interior, new arrival, duty paid, everything working perfectly.",
    features: ["Leather Interior", "Duty Paid", "Tokunbo", "All Systems Working"],
    images: [
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173984/IMG-20260610-WA0109_fede9l.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173983/IMG-20260610-WA0113_uzbazb.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173983/IMG-20260610-WA0107_qvgmbm.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173983/IMG-20260610-WA0106_j2xiay.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173982/IMG-20260610-WA0114_ei7xed.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173982/IMG-20260610-WA0108_vwf2jh.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173980/IMG-20260610-WA0115_hw6ark.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173980/IMG-20260610-WA0112_i69n5r.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173977/IMG-20260610-WA0105_izta14.jpg",
    ],
  },
  {
    id: 6,
    name: "Toyota Venza V6",
    year: 2010,
    category: "Foreign Used",
    badge: "New Arrival",
    condition: "Tokunbo — Duty Paid",
    description: "Toks, V6 engine, super clean leather interior, new arrival, duty paid, everything working perfectly.",
    features: ["V6 Engine", "Leather Interior", "Duty Paid", "Tokunbo", "All Systems Working"],
    images: [
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173338/IMG-20260610-WA0059_azo5kf.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173335/IMG-20260610-WA0055_bcdeke.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173332/IMG-20260610-WA0042_ecyeej.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173330/IMG-20260610-WA0072_grj58h.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173328/IMG-20260610-WA0007_jofkqb.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173327/IMG-20260610-WA0063_oodkbo.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173326/IMG-20260610-WA0071_mvkndc.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173325/IMG-20260610-WA0062_yu4bu6.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173320/IMG-20260610-WA0044_ui3evd.jpg",
    ],
  },
  {
    id: 7,
    name: "Mercedes-Benz GLE 43",
    year: 2016,
    category: "Foreign Used",
    badge: "New Arrival",
    condition: "Tokunbo — Duty Paid",
    description: "Toks, super clean leather interior, new arrival, duty paid, everything working perfectly.",
    features: ["Leather Interior", "Duty Paid", "Tokunbo", "All Systems Working"],
    images: [
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173620/IMG-20260610-WA0081_qvnnbf.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173620/IMG-20260610-WA0053_bdijlf.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173620/IMG-20260610-WA0054_ovnzej.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173620/IMG-20260610-WA0026_stu0vp.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173619/IMG-20260610-WA0029_pbqq5d.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173619/IMG-20260610-WA0033_h9uqj0.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173618/IMG-20260610-WA0066_yf8jil.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173618/IMG-20260610-WA0084_qyb9yz.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173618/IMG-20260610-WA0074_to5fju.jpg",
    ],
  },
  {
    id: 8,
    name: "Mercedes-Benz GLE 450",
    year: 2024,
    category: "Foreign Used",
    badge: "New Arrival",
    condition: "Foreign Used — Duty Paid",
    description: "New arrival, full option, super clean leather interior, duty paid, everything working perfectly.",
    features: ["Full Option", "Leather Interior", "Duty Paid", "All Systems Working"],
    images: [
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173662/IMG-20260610-WA0043_z7ocph.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173656/IMG-20260610-WA0070_wqoeed.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173657/IMG-20260610-WA0060_txstta.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173656/IMG-20260610-WA0057_usspo8.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173656/IMG-20260610-WA0048_b98vri.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173654/IMG-20260610-WA0061_qkjkpd.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173654/IMG-20260610-WA0088_hjq4sb.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173654/IMG-20260610-WA0092_vamyls.jpg",
    ],
  },
  {
    id: 9,
    name: "Lexus RX 350 SUV",
    year: 2010,
    category: "Foreign Used",
    badge: "New Arrival",
    condition: "Tokunbo — Duty Paid",
    description: "Toks, super clean leather interior, new arrival, duty paid, everything working perfectly.",
    features: ["Leather Interior", "Duty Paid", "Tokunbo", "SUV", "All Systems Working"],
    images: [
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173693/IMG-20260610-WA0076_hyan7a.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173692/IMG-20260610-WA0080_weuj2s.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173692/IMG-20260610-WA0077_a7i87f.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173691/IMG-20260610-WA0046_i5ppag.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173690/IMG-20260610-WA0078_rb0mno.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173690/IMG-20260610-WA0056_wo8c1f.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173689/IMG-20260610-WA0065_dudfok.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173688/IMG-20260610-WA0068_simrtk.jpg",
    ],
  },
  {
    id: 10,
    name: "Toyota Highlander Platinum AWD",
    year: 2024,
    category: "Foreign Used",
    badge: "New Arrival",
    condition: "Foreign Used — Duty Paid",
    description: "New arrival, full option, super clean leather interior, duty paid, everything working perfectly.",
    features: ["Full Option", "Platinum Trim", "AWD", "Leather Interior", "Duty Paid", "All Systems Working"],
    images: [
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173733/IMG-20260610-WA0099_f5zw7r.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173739/IMG-20260610-WA0049_iknx1i.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173735/IMG-20260610-WA0100_glzp5y.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173739/IMG-20260610-WA0047_jjhqdz.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173735/IMG-20260610-WA0101_emsjvc.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173730/IMG-20260610-WA0103_lazzgu.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173729/IMG-20260610-WA0052_qg2c2r.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173728/IMG-20260610-WA0050_y9rbst.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173728/IMG-20260610-WA0079_ulgsqz.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781173726/IMG-20260610-WA0086_vjsyng.jpg",
    ],
  },
  {
    id: 15,
    name: "Lexus NX 200t",
    year: 2017,
    category: "Foreign Used",
    badge: "New Arrival",
    condition: "Foreign Used — Duty Paid",
    description: "Full option, super clean leather interior, duty paid, everything working perfectly.",
    features: ["Full Option", "Leather Interior", "Duty Paid", "All Systems Working", "Turbocharged Engine", "Reverse Camera"],
    images: [
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781540782/IMG-20260615-WA0019_epgxqa.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781540787/IMG-20260615-WA0032_lwo0or.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781540782/IMG-20260615-WA0036_kzjagt.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781540787/IMG-20260615-WA0025_zfvh9a.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781540786/IMG-20260615-WA0030_xorppf.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781540783/IMG-20260615-WA0037_qdat9y.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781540782/IMG-20260615-WA0033_iuojuj.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781540781/IMG-20260615-WA0035_fliksm.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781540781/IMG-20260615-WA0034_e2yurp.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781540780/IMG-20260615-WA0021_vvrtgh.jpg",
      "https://res.cloudinary.com/dvovbqijz/image/upload/q_auto/f_auto/v1781542676/IMG-20260615-WA0038_wejfhl.jpg",
    ],
  },
];

const FILTERS = ["All", "Nigerian Used", "Foreign Used", "USA Import"] as const;

export default function CarsPage() {
  const [active, setActive] = useState<(typeof FILTERS)[number]>("All");
  const [selected, setSelected] = useState<Car | null>(null);

  const filtered = useMemo(() => (active === "All" ? CARS : CARS.filter((c) => c.category === active)), [active]);

  return (
    <>
      <section className="bg-neutral-950 text-white pt-32 pb-14 relative overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-44" />
        <div className="relative max-w-7xl mx-auto px-5 md:px-8">
          <span className="text-red-600 uppercase tracking-[0.3em] text-xs font-bold">Showroom</span>
          <h1 className="mt-3 font-display font-extrabold text-5xl md:text-7xl">Car Listings</h1>
          <p className="mt-4 text-white/70 max-w-xl">Filter by category. New stock arrives weekly — contact us for the latest prices.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-5 md:px-8 py-12">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold uppercase tracking-wider transition-colors border-2 ${
                active === f ? "bg-red-600 text-white border-red-600" : "bg-white text-charcoal border-neutral-200 hover:border-red-600"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((c, i) => (
              <motion.div
                layout
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
              >
                <CarCard car={c} onView={() => setSelected(c)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <Reveal>
          <div className="mt-20 bg-neutral-900 text-white rounded-2xl overflow-hidden relative">
            <div className="absolute inset-0 hero-grid opacity-30" />
            <div className="relative p-10 md:p-14 flex flex-col md:flex-row gap-6 items-center justify-between">
              <div>
                <h3 className="font-display font-extrabold text-3xl md:text-4xl">Don't see what you want?</h3>
                <p className="mt-2 text-white/70">We'll order it from the USA for you.</p>
              </div>
              <RedButton href={WA_LINK} target="_blank"><MessageCircle size={18} /> Request a Car</RedButton>
            </div>
          </div>
        </Reveal>
      </div>

      <AnimatePresence>
        {selected && <CarModal car={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  );
}
