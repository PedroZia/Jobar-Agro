import { CATEGORY_CARDS, CATEGORY_STRIP } from '../../data/products';
import { ArrowUpRight } from '../ui/Icons';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';
import styles from './Categories.module.css';

export function Categories() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <Reveal>
          <SectionHeader
            tag="Por onde começar"
            title={
              <>
                Um viveiro inteiro para o seu <em>projeto.</em>
              </>
            }
            lead="Escolha pelo que você quer criar — do pomar à cerca viva, do vaso da sala ao paisagismo de grande escala."
          />
        </Reveal>

        <div className={styles.grid}>
          {CATEGORY_CARDS.map((category, index) => (
            <Reveal key={category.label} delay={index * 70} className={styles.cardReveal}>
              <a className={styles.card} href={category.href}>
                <div className={styles.imageWrap}>
                  <img
                    className={styles.image}
                    src={category.image}
                    alt=""
                    width={640}
                    height={640}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className={styles.body}>
                  <h3 className={styles.label}>{category.label}</h3>
                  <p className={styles.text}>{category.text}</p>
                  <span className={styles.arrow} aria-hidden="true">
                    <ArrowUpRight size={17} />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <div className={styles.strip}>
          {CATEGORY_STRIP.map((item) => (
            <a key={item.label} className={styles.stripLink} href={item.href}>
              {item.label}
              <ArrowUpRight size={14} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
