import { STORE_URL } from './site';

export type Product = {
  name: string;
  category: string;
  note: string;
  price: string;
  image: string;
  href: string;
};

const CDN = 'https://acdn-us.mitiendanube.com/stores/005/027/661/products';

export const PRODUCTS: Product[] = [
  {
    name: 'Laranjeira Toranja',
    category: 'Frutíferas',
    note: 'Muda enxertada de alta produção',
    price: 'R$ 61,90',
    image: `${CDN}/grapefruit-kg-0316f0b87b9344cadb17497517054784-640-0.webp`,
    href: `${STORE_URL}/produtos/laranjeira-toranja-grapefruit-muda-enxertada-de-alta-producao-hn3bm/`,
  },
  {
    name: 'Tumbérgia Arbustiva',
    category: 'Cercas vivas',
    note: 'Cerca viva de crescimento rápido',
    price: 'R$ 11,50',
    image: `${CDN}/jobar-agro-loja-de-plantas-on-line-promocao-oferta-paisagismo-decoracao-1280px-tumbergia-cerca-viva-a62777b537acb10ebc17852462718111-640-0.webp`,
    href: `${STORE_URL}/produtos/tumbergia-arbustiva-para-cerca-viva-viva-muda-ideal-para-privacidade-e-paisagismo-0yr7q/`,
  },
  {
    name: 'Palmeira Azul Bismarckia',
    category: 'Paisagismo',
    note: 'Presença e contraste para projetos',
    price: 'R$ 450,00',
    image: `${CDN}/post-para-instagram-moderno-comunicado-importante-amarelo-78-f60dea8383f5f0346b17518924347809-640-0.webp`,
    href: `${STORE_URL}/produtos/palmeira-azul-bismarckia-nobilis/`,
  },
  {
    name: 'Monstera Deliciosa',
    category: 'Interiores',
    note: 'A costela-de-adão que transforma ambientes',
    price: 'R$ 39,60',
    image: `${CDN}/jobar-agro-loja-de-plantas-online-mudas-frutiferas-ornamentais-e-acessorios-38-9986321e23ee0297ef17834335875320-640-0.webp`,
    href: `${STORE_URL}/produtos/muda-de-monstera-deliciosa-p20-costela-de-adao-70cm/`,
  },
];

export const CATEGORY_CARDS = [
  {
    label: 'Frutíferas',
    text: 'Pomar em casa, em vaso ou no quintal.',
    image: PRODUCTS[0]!.image,
    href: `${STORE_URL}/mudas-frutiferas/`,
  },
  {
    label: 'Ornamentais',
    text: 'Tropicais, folhagens e palmeiras.',
    image: PRODUCTS[3]!.image,
    href: `${STORE_URL}/plantas-para-paisagismo-e-jardim/`,
  },
  {
    label: 'Cercas vivas',
    text: 'Privacidade que cresce com o tempo.',
    image: PRODUCTS[1]!.image,
    href: `${STORE_URL}/cercas-vivas-e-fechamentos/`,
  },
  {
    label: 'Paisagismo',
    text: 'Projetos que ganham escala e presença.',
    image: PRODUCTS[2]!.image,
    href: `${STORE_URL}/plantas-para-paisagismo-e-jardim/`,
  },
] as const;

export const CATEGORY_STRIP = [
  { label: 'Nativas e reflorestamento', href: `${STORE_URL}/arvores-nativas-e-reflorestamento/` },
  { label: 'Palmeiras', href: `${STORE_URL}/plantas-para-paisagismo-e-jardim/palmeiras/` },
  { label: 'Casa e apartamento', href: `${STORE_URL}/urban-jungle-e-interiores/` },
  { label: 'Vasos e jardinagem', href: `${STORE_URL}/jardinagem-e-acessorios/` },
  { label: 'Ofertas da semana', href: `${STORE_URL}/ofertas-da-semana-jobar-agro` },
] as const;
