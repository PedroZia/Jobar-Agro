import { STORE_PROJECTS, TESTIMONIALS } from '../../data/site';
import { ArrowUpRight } from '../ui/Icons';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';
import styles from './Testimonials.module.css';

export function Testimonials() {
  return (
    <section id="projetos" className={`section ${styles.section}`}>
      <div className="container">
        <Reveal>
          <SectionHeader
            tag="Quem já plantou"
            title={
              <>
                Resultados que <em>crescem</em> com o tempo.
              </>
            }
            lead="Projetos residenciais, condomínios e hotéis que ganharam outra escala com a Jobar."
            action={
              <a className={styles.allLink} href={STORE_PROJECTS}>
                Ver projetos
                <span className={styles.allCircle} aria-hidden="true">
                  <ArrowUpRight size={17} />
                </span>
              </a>
            }
          />
        </Reveal>

        <div className={styles.grid}>
          {TESTIMONIALS.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 90} className={styles.cardReveal}>
              <figure className={styles.card}>
                <span className={styles.quoteMark} aria-hidden="true">
                  “
                </span>
                <blockquote className={styles.quote}>
                  <p>{testimonial.quote}</p>
                </blockquote>
                <figcaption className={styles.author}>
                  <span className={styles.name}>{testimonial.name}</span>
                  <span className={styles.role}>{testimonial.role}</span>
                </figcaption>
                <span className={styles.metric}>{testimonial.metric}</span>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
