"use client";

import { motion } from "framer-motion";
import { Sprout, Truck, Users, TrendingUp } from "lucide-react";

const benefits = [
  {
    icon: Sprout,
    title: "Seleção Premium",
    description:
      "Cada planta é inspecionada e selecionada por especialistas. Garantimos saúde, vigor e adequação ao seu projeto.",
    accent: "from-forest-600 to-forest-800",
    size: "large",
  },
  {
    icon: Users,
    title: "Consultoria Dedicada",
    description:
      "Equipe técnica que entende de paisagismo e investimento. Do planejamento à execução, com acompanhamento total.",
    accent: "from-gold-500 to-gold-700",
    size: "small",
  },
  {
    icon: Truck,
    title: "Logística Completa",
    description:
      "Transporte especializado e instalação profissional. Entregamos em qualquer lugar do Brasil com segurança.",
    accent: "from-sage-500 to-sage-700",
    size: "small",
  },
  {
    icon: TrendingUp,
    title: "Retorno Comprovado",
    description:
      "Projetos de paisagismo com plantas de qualidade valorizam imóveis em até 20%. Um investimento que cresce.",
    accent: "from-forest-700 to-forest-900",
    size: "large",
  },
];

export default function Benefits() {
  return (
    <section id="servicos" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-gold-600"
          >
            Por que a Jobar
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl font-bold tracking-tight text-forest-800 sm:text-5xl"
          >
            Mais do que plantas,{" "}
            <span className="text-gold-600">soluções completas</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-5 text-lg text-forest-700/60"
          >
            Cada etapa do seu projeto é tratada com a excelência que ele merece.
          </motion.p>
        </div>

        {/* Asymmetric grid */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`group relative overflow-hidden rounded-3xl bg-white p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-lg hover:shadow-forest-800/5 ${
                  benefit.size === "large" ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                {/* Top accent line */}
                <div
                  className={`absolute left-0 top-0 h-1 w-full bg-gradient-to-r ${benefit.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                />

                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-forest-50 text-forest-600 transition-colors duration-300 group-hover:bg-forest-800 group-hover:text-cream">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </div>

                <h3 className="font-serif text-xl font-semibold text-forest-800">
                  {benefit.title}
                </h3>
                <p className="mt-3 leading-relaxed text-forest-700/55">
                  {benefit.description}
                </p>

                {/* Decorative corner */}
                <div className="absolute bottom-0 right-0 h-20 w-20 translate-x-6 translate-y-6 rounded-full bg-forest-50 transition-transform duration-500 group-hover:translate-x-4 group-hover:translate-y-4" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
