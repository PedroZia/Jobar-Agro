import { STORE_ALL_PLANTS, WHATSAPP_URL } from '../../data/site';
import { ArrowUpRight, WhatsAppIcon } from '../ui/Icons';
import { Reveal } from '../ui/Reveal';
import styles from './FinalCTA.module.css';

export function FinalCTA() {
  return (
    <section id="contato" className={styles.section}>
      <div className={styles.log} aria-hidden="true" />
      <div className="container">
        <Reveal>
          <div className={styles.inner}>
            <span className={styles.tag}>
              <span className={styles.dot} aria-hidden="true" />
              Vamos plantar?
            </span>
            <h2 className={styles.title}>
              Pronto para plantar a <em>próxima história?</em>
            </h2>
            <p className={styles.lead}>
              Escolha suas mudas direto no viveiro online ou fale com a gente
              para montar o seu projeto, do primeiro desenho à entrega.
            </p>
            <div className={styles.actions}>
              <a className="btn btn-lime" href={STORE_ALL_PLANTS}>
                Explorar mudas
                <ArrowUpRight size={18} />
              </a>
              <a
                className="btn btn-outline-light"
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon size={18} />
                Falar no WhatsApp
              </a>
            </div>
            <p className={styles.note}>
              Retirada grátis em Monte Mor · Entrega para todo o Brasil
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
