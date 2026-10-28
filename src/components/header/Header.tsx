import { useEffect, useRef, useState, type RefObject } from 'react';
import { NAV_LINKS } from '../../data/site';
import { Logo } from '../ui/Logo';
import { MenuDrawer } from './MenuDrawer';
import styles from './Header.module.css';

type HeaderProps = {
  headerRef: RefObject<HTMLElement | null>;
  introDone: boolean;
};

export function Header({ headerRef, introDone }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className={`${styles.header} site-header ${!introDone ? 'is-intro' : ''} ${
          scrolled ? styles.scrolled : ''
        }`.trim()}
      >
        <div className={styles.row}>
          <a href="#inicio" className={styles.logoLink} aria-label="Jobar Agro — voltar ao início">
            <Logo className={styles.logo} />
          </a>

          <nav className={styles.pill} aria-label="Navegação principal">
            {NAV_LINKS.map((link) => {
              const external = 'external' in link && link.external;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={styles.link}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          <button
            ref={menuButtonRef}
            type="button"
            className={`${styles.menuButton} site-menu-button`}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            onClick={() => setMenuOpen(true)}
          >
            menu
          </button>
        </div>
      </header>

      <MenuDrawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        triggerRef={menuButtonRef}
      />
    </>
  );
}
