import { TRUST_ITEMS } from '../../data/site';
import { CardIcon, LeafIcon, StoreIcon, TruckIcon } from '../ui/Icons';
import styles from './TrustBar.module.css';

const ICONS = {
  store: StoreIcon,
  truck: TruckIcon,
  card: CardIcon,
  leaf: LeafIcon,
} as const;

export function TrustBar() {
  return (
    <section className={styles.bar} aria-label="Vantagens da Jobar Agro">
      <div className="container">
        <ul className={styles.grid}>
          {TRUST_ITEMS.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <li key={item.title} className={styles.item}>
                <span className={styles.icon} aria-hidden="true">
                  <Icon size={21} />
                </span>
                <div>
                  <p className={styles.title}>{item.title}</p>
                  <p className={styles.text}>{item.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
