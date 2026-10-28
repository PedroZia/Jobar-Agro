import { useState } from 'react';
import { CONTACT, FAQ_ITEMS, WHATSAPP_URL } from '../../data/site';
import { MinusIcon, PlusIcon, WhatsAppIcon } from '../ui/Icons';
import { Reveal } from '../ui/Reveal';
import styles from './FAQ.module.css';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="duvidas" className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.layout}>
          <Reveal className={styles.leftReveal}>
            <div className={styles.left}>
              <span className={styles.tag}>
                <span className={styles.dot} aria-hidden="true" />
                Dúvidas frequentes
              </span>
              <h2 className={styles.title}>
                Antes de plantar, a gente <em>responde.</em>
              </h2>
              <p className={styles.lead}>
                Do primeiro contato à entrega, o que você precisa saber para
                escolher e cuidar das suas mudas.
              </p>

              <div className={styles.helpCard}>
                <span className={styles.helpTag}>Atendimento</span>
                <p className={styles.helpTitle}>Fale com um especialista.</p>
                <p className={styles.helpText}>
                  Conte o que você quer plantar. A gente ajuda a escolher a muda,
                  o substrato e o melhor momento.
                </p>
                <a
                  className="btn btn-lime"
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon size={17} />
                  Falar no WhatsApp
                </a>
                <a className={styles.phone} href={CONTACT.phoneHref}>
                  {CONTACT.phone}
                </a>
                <span className={styles.note}>
                  Resposta em até 2 horas no horário comercial.
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal className={styles.accordionReveal} delay={80}>
            <div className={styles.accordion}>
              {FAQ_ITEMS.map((item, index) => {
                const isOpen = openIndex === index;
                const buttonId = `faq-button-${index}`;
                const panelId = `faq-panel-${index}`;

                return (
                  <div
                    key={item.question}
                    className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}
                  >
                    <button
                      id={buttonId}
                      type="button"
                      className={styles.question}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                    >
                      <span className={styles.questionText}>{item.question}</span>
                      <span className={styles.icon} aria-hidden="true">
                        {isOpen ? <MinusIcon size={16} /> : <PlusIcon size={16} />}
                      </span>
                    </button>
                    <div
                      id={panelId}
                      className={styles.answer}
                      role="region"
                      aria-labelledby={buttonId}
                      aria-hidden={!isOpen}
                    >
                      <div className={styles.answerInner}>
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
