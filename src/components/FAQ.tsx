"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Quais tipos de plantas vocês trabalham?",
    answer:
      "Trabalhamos com plantas frutíferas (manga, abacate, fruta-do-conde, entre outras), ornamentais (palmeiras, bambus, samambaias, flores) e acessórios para paisagismo como vasos, substratos e sistemas de irrigação. Nosso catálogo conta com mais de 300 variedades.",
  },
  {
    question: "Vocês atendem projetos em todo o Brasil?",
    answer:
      "Sim. Temos logística própria para entrega em qualquer estado brasileiro. Nossa equipe técnica também viaja para projetos presenciais, independente da localização.",
  },
  {
    question: "Como funciona o processo de orçamento?",
    answer:
      "Após o primeiro contato, realizamos uma reunião de escopo para entender o projeto. Em seguida, enviamos uma proposta detalhada com seleção de espécies, valores e cronograma. O orçamento é gratuito e sem compromisso.",
  },
  {
    question: "Vocês oferecem garantia nas plantas?",
    answer:
      "Sim. Todas as nossas plantas possuem garantia de enraizamento. Caso a planta não se adapte nas primeiras semanas, realizamos a substituição sem custo adicional. O suporte técnico se estende por 12 meses após a instalação.",
  },
  {
    question: "Qual o investimento mínimo para um projeto?",
    answer:
      "O investimento varia conforme a escala e complexidade do projeto. Projetos residenciais começam a partir de R$ 15 mil. Projetos corporativos e de grande porte são avaliados individualmente. Entre em contato para uma avaliação personalizada.",
  },
  {
    question: "Vocês também fazem a manutenção das plantas?",
    answer:
      "Sim. Oferecemos planos de manutenção contínua que incluem poda, adubação, controle de pragas e monitoramento da saúde das plantas. Isso garante que seu investimento se mantenha valorizado ao longo do tempo.",
  },
];

function FAQItem({
  faq,
  isOpen,
  onToggle,
  index,
}: {
  faq: (typeof faqs)[0];
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="border-b border-forest-200/60"
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-6 text-left transition-colors hover:text-forest-600"
        aria-expanded={isOpen}
      >
        <span className="pr-4 font-serif text-lg font-semibold text-forest-800">
          {faq.question}
        </span>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest-50 text-forest-600 transition-colors group-hover:bg-forest-100">
          {isOpen ? (
            <Minus className="h-4 w-4" strokeWidth={2} />
          ) : (
            <Plus className="h-4 w-4" strokeWidth={2} />
          )}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 leading-relaxed text-forest-700/55">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-forest-50/50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
          {/* Left: header */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-gold-600"
            >
              Perguntas Frequentes
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl font-bold tracking-tight text-forest-800 sm:text-5xl"
            >
              Tire suas{" "}
              <span className="text-gold-600">dúvidas</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-5 text-lg text-forest-700/55"
            >
              Encontre respostas para as perguntas mais comuns sobre nossos
              serviços e processo de trabalho.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-10 rounded-2xl bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
            >
              <p className="text-sm font-medium text-forest-700">
                Ainda tem dúvidas?
              </p>
              <p className="mt-1 text-sm text-forest-600/50">
                Nossa equipe responde em até 2 horas durante o horário comercial.
              </p>
              <a
                href="#contato"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold-600 transition-colors hover:text-gold-700"
              >
                Fale com um especialista
                <span aria-hidden="true">&rarr;</span>
              </a>
            </motion.div>
          </div>

          {/* Right: accordion */}
          <div>
            {faqs.map((faq, i) => (
              <FAQItem
                key={faq.question}
                faq={faq}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
