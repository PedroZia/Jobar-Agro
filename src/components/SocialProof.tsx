"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const stats = [
  { number: "500+", label: "Projetos Entregues", sublabel: "em todo o Brasil" },
  { number: "120+", label: "Variedades de Plantas", sublabel: "frutíferas e ornamentais" },
  { number: "98%", label: "Satisfação", sublabel: "dos nossos clientes" },
  { number: "20%", label: "Valorização Média", sublabel: "em projetos de paisagismo" },
];

const testimonials = [
  {
    quote:
      "A Jobar transformou completamente o conceito do nosso condomínio. As plantas frutíferas deram um character único ao projeto.",
    author: "Carlos Mendes",
    role: "Sócio — Mendes Arquitetura",
    metric: "+18% no valor dos apartamentos",
  },
  {
    quote:
      "Profissionalismo do início ao fim. A consultoria técnica fez toda a diferença na escolha das espécies para nosso resort.",
    author: "Ana Paula Silva",
    role: "Diretora — hotel Fazenda Estrela",
    metric: "R$ 2.4M em paisagismo",
  },
  {
    quote:
      "Trabalhamos com a Jobar há 8 anos. A consistência na qualidade e no prazo é o que nos faz continuar referenciando.",
    author: "Roberto Almeida",
    role: "CEO — Almeida Engenharia",
    metric: "50+ projetos juntos",
  },
];

export default function SocialProof() {
  return (
    <section id="resultados" className="relative overflow-hidden bg-forest-900 py-24 lg:py-32">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,.3) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
          className="h-full w-full"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        {/* Stats row */}
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <span className="font-serif text-4xl font-bold text-gold-400 sm:text-5xl lg:text-6xl">
                {stat.number}
              </span>
              <p className="mt-2 text-sm font-medium text-cream/80">{stat.label}</p>
              <p className="text-xs text-cream/35">{stat.sublabel}</p>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-16 h-px bg-gradient-to-r from-transparent via-cream/10 to-transparent" />

        {/* Testimonials */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-gold-400/60"
          >
            Quem confia na Jobar
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl font-bold tracking-tight text-cream sm:text-5xl"
          >
            Resultados que{" "}
            <span className="text-gold-400">falam por si</span>
          </motion.h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="group relative rounded-3xl bg-cream/[0.04] p-8 backdrop-blur-sm transition-all duration-300 hover:bg-cream/[0.07]"
            >
              <Quote className="mb-4 h-6 w-6 text-gold-400/40" strokeWidth={1.5} />
              <p className="text-[15px] leading-relaxed text-cream/70">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 border-t border-cream/10 pt-5">
                <p className="text-sm font-semibold text-cream/90">{t.author}</p>
                <p className="text-xs text-cream/40">{t.role}</p>
              </div>
              <div className="mt-4 inline-flex rounded-full bg-gold-400/10 px-3 py-1.5">
                <span className="text-xs font-medium text-gold-400">{t.metric}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
