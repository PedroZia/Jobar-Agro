"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Leaf } from "lucide-react";

const navLinks = [
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Resultados", href: "#resultados" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "FAQ", href: "#faq" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-cream/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(26,58,42,0.08)]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 group"
            aria-label="Jobar Agro - Página inicial"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-forest-800 transition-transform duration-300 group-hover:scale-105">
              <Leaf className="h-5 w-5 text-gold-400" strokeWidth={1.5} />
            </div>
            <span className="font-serif text-xl font-semibold tracking-tight text-forest-800">
              Jobar Agro<span className="text-gold-500">.</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-sm font-medium text-forest-700/70 transition-colors duration-200 hover:text-forest-800 after:absolute after:bottom-[-4px] after:left-0 after:h-[1.5px] after:w-0 after:bg-gold-500 after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contato"
              className="rounded-full bg-forest-800 px-7 py-3 text-sm font-semibold text-cream transition-all duration-300 hover:bg-forest-700 hover:shadow-lg hover:shadow-forest-800/20 active:scale-[0.98]"
            >
              Fale Conosco
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-full text-forest-800 transition-colors hover:bg-forest-100 md:hidden"
            aria-label={isMobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMobileOpen}
          >
            {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-20 z-40 bg-cream/98 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-2 px-6 pt-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setIsMobileOpen(false)}
                  className="rounded-xl px-4 py-4 text-lg font-medium text-forest-800 transition-colors hover:bg-forest-50"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="#contato"
                onClick={() => setIsMobileOpen(false)}
                className="mt-4 rounded-full bg-forest-800 px-7 py-4 text-center text-base font-semibold text-cream transition-all hover:bg-forest-700"
              >
                Fale Conosco
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
