"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";

export default function CTA() {
  return (
    <section id="contato" className="relative overflow-hidden bg-forest-800 py-24 lg:py-32">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute right-0 top-0 h-[50%] w-[50%] bg-gradient-to-bl from-gold-500/10 to-transparent" />
        <div className="absolute bottom-0 left-0 h-[40%] w-[30%] bg-gradient-to-tr from-forest-600/20 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gold-500/15"
          >
            <Phone className="h-7 w-7 text-gold-400" strokeWidth={1.5} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl font-bold tracking-tight text-cream sm:text-5xl lg:text-6xl"
          >
            Pronto para{" "}
            <span className="text-gold-400">transformar</span>{" "}
            seu espaço?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-cream/55"
          >
            Solicite um orçamento personalizado e descubra como o paisagismo
            pode valorizar seu projeto. Sem compromisso, sem burocracia.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a
              href="https://wa.me/5500000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-gold-500 px-9 py-4.5 text-base font-semibold text-forest-950 shadow-lg shadow-gold-500/25 transition-all duration-300 hover:bg-gold-400 hover:shadow-xl hover:shadow-gold-500/30 active:scale-[0.98]"
            >
              Solicitar Orçamento Grátis
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="tel:+5500000000000"
              className="inline-flex items-center gap-2 rounded-full border border-cream/15 px-8 py-4 text-base font-medium text-cream/60 transition-all duration-300 hover:border-cream/30 hover:text-cream"
            >
              Ligar Agora
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-sm text-cream/30"
          >
            Resposta em até 2 horas no horário comercial
          </motion.p>
        </div>
      </div>
    </section>
  );
}
