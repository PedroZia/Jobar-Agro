"use client";

import { Leaf } from "lucide-react";

const footerLinks = {
  Serviços: [
    { label: "Plantas Frutíferas", href: "#" },
    { label: "Plantas Ornamentais", href: "#" },
    { label: "Acessórios", href: "#" },
    { label: "Consultoria", href: "#" },
  ],
  Empresa: [
    { label: "Sobre Nós", href: "#sobre" },
    { label: "Portfólio", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Contato", href: "#contato" },
  ],
  Suporte: [
    { label: "FAQ", href: "#faq" },
    { label: "Política de Garantia", href: "#" },
    { label: "Termos de Uso", href: "#" },
    { label: "Privacidade", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-forest-200/40 bg-cream">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-8">
          {/* Brand */}
          <div>
            <a href="#" className="inline-flex items-center gap-2.5" aria-label="Jobar Agro">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-forest-800">
                <Leaf className="h-5 w-5 text-gold-400" strokeWidth={1.5} />
              </div>
              <span className="font-serif text-xl font-semibold tracking-tight text-forest-800">
                Jobar<span className="text-gold-500">.</span>
              </span>
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-forest-700/50">
              Paisagismo de alto impacto para projetos que valorizam espaços e
              geram retorno real.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-forest-800">
                {category}
              </h4>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-forest-600/50 transition-colors duration-200 hover:text-forest-800"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-forest-200/40 py-6 sm:flex-row">
          <p className="text-xs text-forest-600/40">
            &copy; {new Date().getFullYear()} Jobar Agro. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-xs text-forest-600/40 transition-colors hover:text-forest-800"
              aria-label="Instagram"
            >
              Instagram
            </a>
            <a
              href="#"
              className="text-xs text-forest-600/40 transition-colors hover:text-forest-800"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
            <a
              href="#"
              className="text-xs text-forest-600/40 transition-colors hover:text-forest-800"
              aria-label="WhatsApp"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
