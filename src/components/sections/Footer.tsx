import {
  CONTACT,
  SOCIAL,
  STORE_BLOG,
  STORE_DELIVERY,
  STORE_URL,
  WHATSAPP_URL,
} from '../../data/site';
import {
  ArrowUp,
  ArrowUpRight,
  FacebookIcon,
  InstagramIcon,
  PinterestIcon,
  WhatsAppIcon,
} from '../ui/Icons';
import { Logo } from '../ui/Logo';
import styles from './Footer.module.css';

const PLANT_LINKS = [
  { label: 'Mudas frutíferas', href: `${STORE_URL}/mudas-frutiferas/` },
  { label: 'Plantas ornamentais', href: `${STORE_URL}/plantas-para-paisagismo-e-jardim/` },
  { label: 'Cercas vivas', href: `${STORE_URL}/cercas-vivas-e-fechamentos/` },
  { label: 'Árvores nativas', href: `${STORE_URL}/arvores-nativas-e-reflorestamento/` },
  { label: 'Palmeiras', href: `${STORE_URL}/plantas-para-paisagismo-e-jardim/palmeiras/` },
];

const GARDEN_LINKS = [
  { label: 'Vasos e jardineiras', href: `${STORE_URL}/jardinagem-e-acessorios/vasos-e-jardineiras/` },
  { label: 'Substratos', href: `${STORE_URL}/jardinagem-e-acessorios/substratos1/` },
  { label: 'Adubos e fertilizantes', href: `${STORE_URL}/jardinagem-e-acessorios/adubos-e-fertilizantes1/` },
  { label: 'Ferramentas', href: `${STORE_URL}/jardinagem-e-acessorios/acessorios-e-ferramentas/` },
  { label: 'Ofertas da semana', href: `${STORE_URL}/ofertas-da-semana-jobar-agro` },
];

const JOBAR_LINKS = [
  { label: 'O viveiro', href: '#viveiro' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Diário', href: STORE_BLOG },
  { label: 'Dúvidas', href: '#duvidas' },
  { label: 'Contato', href: '#contato' },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <a href="#inicio" aria-label="Jobar Agro — voltar ao início">
              <Logo className={styles.footerLogo} />
            </a>
            <p className={styles.description}>
              Mudas frutíferas, ornamentais e nativas para projetos que crescem
              com o tempo. Viveiro em Monte Mor, entrega para todo o Brasil.
            </p>
            <div className={styles.social}>
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da Jobar Agro"
              >
                <InstagramIcon size={17} />
              </a>
              <a
                href={SOCIAL.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook da Jobar Agro"
              >
                <FacebookIcon size={17} />
              </a>
              <a
                href={SOCIAL.pinterest}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest da Jobar Agro"
              >
                <PinterestIcon size={17} />
              </a>
            </div>
          </div>

          <div className={styles.column}>
            <h3>Plantas</h3>
            <ul>
              {PLANT_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.column}>
            <h3>Jardinagem</h3>
            <ul>
              {GARDEN_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.column}>
            <h3>Jobar</h3>
            <ul>
              {JOBAR_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.column}>
            <h3>Atendimento</h3>
            <address className={styles.address}>
              {CONTACT.address}
              <br />
              {CONTACT.city} · {CONTACT.postalCode}
            </address>
            <a className={styles.phone} href={CONTACT.phoneHref}>
              {CONTACT.phone}
            </a>
            <a
              className={styles.whatsapp}
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon size={15} />
              WhatsApp
            </a>
            <a className={styles.delivery} href={STORE_DELIVERY}>
              Cidades atendidas
              <ArrowUpRight size={13} />
            </a>
            <a className={styles.storeLink} href={STORE_URL}>
              Loja online
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© 2026 Jobar Agro. Todos os direitos reservados.</p>
          <p className={styles.location}>Viveiro em Monte Mor — SP</p>
          <a className={styles.top} href="#inicio">
            Voltar ao topo
            <ArrowUp size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
