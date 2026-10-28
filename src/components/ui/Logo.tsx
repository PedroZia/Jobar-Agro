import styles from './Logo.module.css';

type LogoProps = {
  className?: string;
};

/** The official Jobar Agro wordmark, recoloured through a CSS mask. */
export function Logo({ className = '' }: LogoProps) {
  return <span className={`${styles.logo} ${className}`.trim()} aria-hidden="true" />;
}
