"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const differentiators = [
  {
    number: "01",
    title: "Catálogo Próprio",
    description:
      "Mais de 300 variedades de plantas frutíferas e ornamentais, cultivadas em nossos viveiros com controle total de qualidade.",
    highlight: "300+ variedades",
    imageGradient: "from-forest-600 to-forest-800",
  },
  {
    number: "02",
    title: "Equipe Multidisciplinar",
    description:
      "Arquitetos paisagistas, engenheiros agrônomos e especialistas em cada etapa — do projeto à manutenção contínua.",
    highlight: "Especialistas dedicados",
    imageGradient: "from-gold-500 to-gold-700",
  },
  {
    number: "03",
    title: "Projetos sob Medida",
    description:
      "Não trabalhamos com soluções genéricas. Cada projeto é desenhado considerando clima, solo, estilo e objetivo do cliente.",
    highlight: "100% personalizado",
    imageGradient: "from-sage-500 to-sage-700",
  },
  {
    number: "04",
    title: "Garantia e Suporte",
    description:
      "Plantas com garantia de enraizamento e suporte técnico por 12 meses após a instalação. Seu investimento está protegido.",
    highlight: "12 meses de suporte",
    imageGradient: "from-forest-700 to-forest-900",
  },
];

export default function Differentiators() {
  return (
    <section id="diferenciais" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-gold-600"
          >
            Diferenciais
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl font-bold tracking-tight text-forest-800 sm:text-5xl"
          >
            O que nos torna{" "}
            <span className="text-gold-600">únicos</span>
          </motion.h2>
        </div>

        {/* Staggered list */}
        <div className="mt-16 space-y-6">
          {differentiators.map((d, i) => (
            <motion.div
              key={d.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative grid items-center gap-8 overflow-hidden rounded-3xl bg-white p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-lg hover:shadow-forest-800/5 sm:p-10 lg:grid-cols-[auto_1fr_auto] lg:gap-12"
            >
              {/* Number */}
              <span className="font-serif text-6xl font-bold text-forest-100 transition-colors duration-300 group-hover:text-gold-200 sm:text-7xl">
                {d.number}
              </span>

              {/* Content */}
              <div>
                <h3 className="font-serif text-2xl font-semibold text-forest-800">
                  {d.title}
                </h3>
                <p className="mt-3 max-w-xl leading-relaxed text-forest-700/55">
                  {d.description}
                </p>
              </div>

              {/* Badge */}
              <div className="hidden items-center gap-3 lg:flex">
                <div className="flex items-center gap-2 rounded-full bg-forest-50 px-5 py-2.5">
                  <Check className="h-4 w-4 text-forest-600" strokeWidth={2} />
                  <span className="text-sm font-medium text-forest-700">
                    {d.highlight}
                  </span>
                </div>
              </div>

              {/* Hover accent */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-gold-400 to-gold-600 transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
