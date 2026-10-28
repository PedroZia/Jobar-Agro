import { useEffect, useRef, type RefObject } from 'react';
import {
  CONTACT,
  NAV_LINKS,
  STORE_ALL_PLANTS,
  STORE_CATEGORIES,
  WHATSAPP_URL,
} from '../../data/site';
import { ArrowUpRight, CloseIcon, WhatsAppIcon } from '../ui/Icons';
import { Logo } from '../ui/Logo';
import styles from './MenuDrawer.module.css';

type MenuDrawerProps = {
  open: boolean;
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
};

const SITE_LINKS = [{ label: 'Início', href: '#inicio' }, ...NAV_LINKS];

export function MenuDrawer({ open, onClose, triggerRef }: MenuDrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousFocus = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 40);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab') return;

      const panel = panelRef.current;
      if (!panel) return;

      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.offsetParent !== null);

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
      previousFocus?.focus();
    };
  }, [open, onClose, triggerRef]);

  return (
    <div
      id="site-menu"
      className={`${styles.drawer} ${open ? styles.open : ''}`.trim()}
      role="dialog"
      aria-modal="true"
      aria-label="Menu do site"
      aria-hidden={!open}
      inert={!open}
    >
      <div className={styles.panel} ref={panelRef}>
        <div className={styles.top}>
          <a
            href="#inicio"
            className={styles.logoLink}
            aria-label="Jobar Agro — voltar ao início"
            onClick={onClose}
          >
            <Logo className={styles.logo} />
          </a>
          <button
            ref={closeButtonRef}
            type="button"
            className={styles.close}
            aria-label="Fechar menu"
            onClick={onClose}
          >
            <CloseIcon size={22} />
          </button>
        </div>

        <div className={styles.grid}>
          <nav className={styles.column} aria-label="Menu principal">
            <h2 className={styles.kicker}>Navegue</h2>
            <div className={styles.siteList}>
              {SITE_LINKS.map((link, index) => {
                const external = 'external' in link && link.external;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className={styles.siteLink}
                    onClick={onClose}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <span className={styles.index} aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span>{link.label}</span>
                  </a>
                );
              })}
            </div>
          </nav>

          <div className={styles.column}>
            <h2 className={styles.kicker}>Compre no viveiro</h2>
            <div className={styles.storeGrid}>
              {STORE_CATEGORIES.map((category) => (
                <a key={category.label} href={category.href} className={styles.storeLink} onClick={onClose}>
                  <span>{category.label}</span>
                  <ArrowUpRight size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.actions}>
            <a className="btn btn-lime" href={STORE_ALL_PLANTS} onClick={onClose}>
              Explorar mudas
              <ArrowUpRight size={18} />
            </a>
            <a
              className={styles.whatsapp}
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon size={18} />
              Falar no WhatsApp
            </a>
          </div>

          <div className={styles.contact}>
            <a href={CONTACT.phoneHref} className={styles.phone}>
              {CONTACT.phone}
            </a>
            <p>
              {CONTACT.address}
              <br />
              {CONTACT.city} · {CONTACT.postalCode}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
