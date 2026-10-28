import { PRODUCTS } from '../../data/products';
import { STORE_ALL_PLANTS } from '../../data/site';
import { ArrowUpRight } from '../ui/Icons';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';
import styles from './Featured.module.css';

export function Featured() {
  return (
    <section id="plantas" className={`section ${styles.section}`}>
      <div className="container">
        <Reveal>
          <SectionHeader
            tag="Direto do viveiro"
            title={
              <>
                As favoritas de <em>quem planta.</em>
              </>
            }
            lead="Uma seleção do que sai do nosso viveiro toda semana. Compre online ou fale com um especialista para escolher a muda certa."
            action={
              <a className={styles.allLink} href={STORE_ALL_PLANTS}>
                Ver todas as plantas
                <span className={styles.allCircle} aria-hidden="true">
                  <ArrowUpRight size={17} />
                </span>
              </a>
            }
          />
        </Reveal>

        <div className={styles.grid}>
          {PRODUCTS.map((product, index) => (
            <Reveal key={product.name} delay={index * 80} className={styles.cardReveal}>
              <a className={styles.card} href={product.href}>
                <div className={styles.imageWrap}>
                  <img
                    className={styles.image}
                    src={product.image}
                    alt={product.name}
                    width={640}
                    height={640}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className={styles.category}>{product.category}</span>
                </div>
                <div className={styles.info}>
                  <h3 className={styles.name}>{product.name}</h3>
                  <p className={styles.note}>{product.note}</p>
                  <div className={styles.priceRow}>
                    <span className={styles.price}>{product.price}</span>
                    <span className={styles.buy}>
                      Comprar
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <p className={styles.footnote}>
          Preços e disponibilidade no site da loja. Mudas enviadas com cuidado,
          direto do viveiro.
        </p>
      </div>
    </section>
  );
}
