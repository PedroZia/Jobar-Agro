import { STATS, STORE_PROJECTS, WHATSAPP_URL } from '../../data/site';
import { ArrowUpRight, LeafIcon, WhatsAppIcon } from '../ui/Icons';
import { Reveal } from '../ui/Reveal';
import styles from './Story.module.css';

export function Story() {
  return (
    <section id="viveiro" className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.grid}>
          <Reveal className={styles.mediaReveal}>
            <div className={styles.media}>
              <img
                src="/assets/viveiro.webp"
                alt="Mudas e plantas no viveiro da Jobar Agro, em Monte Mor"
                width={640}
                height={533}
                loading="lazy"
                decoding="async"
              />
              <span className={styles.badge}>
                <LeafIcon size={13} />
                Retirada grátis
              </span>
              <span className={styles.caption}>Viveiro em Monte Mor — SP</span>
            </div>
          </Reveal>

          <Reveal className={styles.contentReveal} delay={100}>
            <div className={styles.content}>
              <span className={styles.tag}>
                <span className={styles.dot} aria-hidden="true" />O viveiro
              </span>
              <h2 className={styles.title}>
                Cada muda carrega o <em>tempo</em> de quem cuida.
              </h2>
              <p className={styles.lead}>
                A Jobar Agro é um viveiro de Monte Mor que abastece paisagistas,
                condomínios e jardins de todo o Brasil. São mais de 300 variedades
                entre frutíferas, ornamentais e nativas, selecionadas uma a uma —
                com consultoria de quem entende de solo, clima e paisagem.
              </p>

              <div className={styles.stats}>
                {STATS.map((stat) => (
                  <div key={stat.label} className={styles.stat}>
                    <span className={styles.value}>{stat.value}</span>
                    <span className={styles.label}>{stat.label}</span>
                  </div>
                ))}
              </div>

              <div className={styles.links}>
                <a className={styles.link} href={STORE_PROJECTS}>
                  Conheça nossos projetos
                  <ArrowUpRight size={16} />
                </a>
                <a
                  className={styles.whatsapp}
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon size={16} />
                  Falar com um especialista
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
