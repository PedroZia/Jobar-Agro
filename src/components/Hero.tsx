"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-forest-900">
      {/* Background layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-forest-950 via-forest-900 to-forest-800" />
        <div className="absolute right-0 top-0 h-[70%] w-[60%] bg-gradient-to-bl from-gold-500/10 to-transparent" />
        <div className="absolute bottom-0 left-0 h-[40%] w-[40%] bg-gradient-to-tr from-forest-700/30 to-transparent" />
        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Floating accent */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[15%] top-[20%] hidden h-32 w-32 rounded-full bg-gold-400/10 blur-3xl lg:block"
      />
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[25%] left-[10%] hidden h-40 w-40 rounded-full bg-forest-400/10 blur-3xl lg:block"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex min-h-screen flex-col justify-center py-32 lg:py-0">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-20">
            {/* Left: Text */}
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold-500/20 bg-gold-500/10 px-4 py-2"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                <span className="text-xs font-medium uppercase tracking-widest text-gold-300">
                  Paisagismo de Alto Impacto
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-serif text-5xl font-bold leading-[1.05] tracking-tight text-cream sm:text-6xl lg:text-7xl xl:text-[5.25rem]"
              >
                Paisagens que{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-gold-400">geram valor</span>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="absolute bottom-2 left-0 z-0 h-3 w-full origin-left bg-gold-500/15 sm:bottom-3 sm:h-4"
                  />
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="mt-7 max-w-lg text-lg leading-relaxed text-cream/60"
              >
                Plantas frutíferas, ornamentais e acessórios selecionados para
                projetos de paisagismo que valorizam imóveis e transformam
                espaços em investimentos reais.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
              >
                <a
                  href="#contato"
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-gold-500 px-8 py-4 text-base font-semibold text-forest-950 shadow-lg shadow-gold-500/25 transition-all duration-300 hover:bg-gold-400 hover:shadow-xl hover:shadow-gold-500/30 active:scale-[0.98]"
                >
                  Solicitar Orçamento
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <a
                  href="#servicos"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/15 px-8 py-4 text-base font-medium text-cream/70 transition-all duration-300 hover:border-cream/30 hover:text-cream"
                >
                  Ver Portfólio
                </a>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="mt-14 flex items-center gap-8 border-t border-cream/10 pt-8"
              >
                <div>
                  <span className="font-serif text-3xl font-bold text-gold-400">15+</span>
                  <p className="mt-1 text-xs text-cream/40">Anos de experiência</p>
                </div>
                <div className="h-10 w-px bg-cream/10" />
                <div>
                  <span className="font-serif text-3xl font-bold text-gold-400">500+</span>
                  <p className="mt-1 text-xs text-cream/40">Projetos entregues</p>
                </div>
                <div className="h-10 w-px bg-cream/10" />
                <div>
                  <span className="font-serif text-3xl font-bold text-gold-400">98%</span>
                  <p className="mt-1 text-xs text-cream/40">Clientes satisfeitos</p>
                </div>
              </motion.div>
            </div>

            {/* Right: Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-forest-700/30">
                {/* Abstract plant composition */}
                <div className="absolute inset-0 bg-gradient-to-br from-forest-600/40 via-forest-700/20 to-gold-500/10" />
                <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-forest-900/80 to-transparent" />

                {/* Decorative elements */}
                <div className="absolute left-8 top-8 h-24 w-24 rounded-full border border-gold-400/20" />
                <div className="absolute bottom-12 right-10 h-16 w-16 rounded-full bg-gold-400/10" />

                {/* Central content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-cream/10 bg-cream/5">
                    <svg
                      viewBox="0 0 48 48"
                      fill="none"
                      className="h-10 w-10"
                      aria-hidden="true"
                    >
                      <path
                        d="M24 44C24 44 8 32 8 18C8 10 14 4 22 6C24 6.6 26 8 24 12C22 16 20 20 24 24C28 28 32 24 36 20C40 16 44 18 44 24C44 32 24 44 24 44Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gold-400"
                      />
                    </svg>
                  </div>
                  <p className="font-serif text-2xl font-semibold text-cream/90">
                    Natureza viva
                  </p>
                  <p className="mt-2 text-sm text-cream/40">
                    com propósito e resultado
                  </p>
                </div>

                {/* Floating badges */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute right-6 top-16 rounded-2xl bg-cream/10 px-4 py-3 backdrop-blur-sm"
                >
                  <p className="text-xs font-medium text-gold-300">Frutíferas</p>
                  <p className="text-[10px] text-cream/40">+120 variedades</p>
                </motion.div>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-16 left-6 rounded-2xl bg-cream/10 px-4 py-3 backdrop-blur-sm"
                >
                  <p className="text-xs font-medium text-gold-300">Ornamentais</p>
                  <p className="text-[10px] text-cream/40">+200 espécies</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cream to-transparent" />
    </section>
  );
}
