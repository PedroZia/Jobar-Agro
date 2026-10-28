import type { ReactNode } from 'react';
import styles from './SectionHeader.module.css';

type SectionHeaderProps = {
  tag: string;
  title: ReactNode;
  lead?: string;
  action?: ReactNode;
  tone?: 'dark' | 'light';
  className?: string;
};

export function SectionHeader({
  tag,
  title,
  lead,
  action,
  tone = 'dark',
  className = '',
}: SectionHeaderProps) {
  return (
    <div className={`${styles.header} ${tone === 'light' ? styles.light : ''} ${className}`}>
      <div className={styles.text}>
        <span className={styles.tag}>
          <span className={styles.dot} aria-hidden="true" />
          {tag}
        </span>
        <h2 className={styles.title}>{title}</h2>
        {lead ? <p className={styles.lead}>{lead}</p> : null}
      </div>
      {action ? <div className={styles.action}>{action}</div> : null}
    </div>
  );
}
