export const STORE_URL = 'https://jobaragro.com.br';
export const STORE_ALL_PLANTS = `${STORE_URL}/produtos/`;
export const STORE_PROJECTS = `${STORE_URL}/paisagismo-e-projetos`;
export const STORE_BLOG = `${STORE_URL}/blog/`;
export const STORE_DELIVERY = `${STORE_URL}/cidades-atendidas/`;
export const WHATSAPP_URL = 'https://wa.me/5519995791472';

export const CONTACT = {
  phone: '(19) 99579-1472',
  phoneHref: 'tel:+5519995791472',
  address: 'R. Ana de Lima Pinha, 472 — Parque Res. São Clemente',
  city: 'Monte Mor — SP',
  postalCode: '13197-168',
};

export const SOCIAL = {
  instagram: 'https://instagram.com/jobaragro_mudas',
  facebook: 'https://www.facebook.com/jobaragro',
  pinterest: 'https://br.pinterest.com/jobaragro/',
};

export const NAV_LINKS = [
  { label: 'Plantas', href: '#plantas' },
  { label: 'O viveiro', href: '#viveiro' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Dúvidas', href: '#duvidas' },
  { label: 'Diário', href: STORE_BLOG, external: true },
  { label: 'Contato', href: '#contato' },
] as const;

export const STORE_CATEGORIES = [
  {
    label: 'Mudas frutíferas',
    href: `${STORE_URL}/mudas-frutiferas/`,
  },
  {
    label: 'Plantas ornamentais',
    href: `${STORE_URL}/plantas-para-paisagismo-e-jardim/`,
  },
  {
    label: 'Cercas vivas',
    href: `${STORE_URL}/cercas-vivas-e-fechamentos/`,
  },
  {
    label: 'Árvores nativas',
    href: `${STORE_URL}/arvores-nativas-e-reflorestamento/`,
  },
  {
    label: 'Palmeiras',
    href: `${STORE_URL}/plantas-para-paisagismo-e-jardim/palmeiras/`,
  },
  {
    label: 'Casa e apartamento',
    href: `${STORE_URL}/urban-jungle-e-interiores/`,
  },
  {
    label: 'Vasos e jardinagem',
    href: `${STORE_URL}/jardinagem-e-acessorios/`,
  },
  {
    label: 'Ofertas da semana',
    href: `${STORE_URL}/ofertas-da-semana-jobar-agro`,
  },
  {
    label: 'Plantas raras',
    href: `${STORE_URL}/search/?q=rara`,
  },
] as const;

export const TRUST_ITEMS = [
  {
    icon: 'store',
    title: 'Retirada grátis',
    text: 'no viveiro em Monte Mor',
  },
  {
    icon: 'truck',
    title: 'Entrega própria',
    text: 'Campinas, Grande SP e região',
  },
  {
    icon: 'card',
    title: '4x sem juros',
    text: 'ou 5% de desconto no Pix',
  },
  {
    icon: 'leaf',
    title: 'Garantia de enraizamento',
    text: 'com suporte de especialistas',
  },
] as const;

export const STATS = [
  { value: '15+', label: 'anos de viveiro' },
  { value: '500+', label: 'projetos entregues' },
  { value: '300+', label: 'variedades de plantas' },
  { value: '98%', label: 'de satisfação' },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      'A Jobar transformou completamente o conceito do nosso condomínio. As plantas frutíferas deram um caráter único ao projeto.',
    name: 'Carlos Mendes',
    role: 'Sócio — Mendes Arquitetura',
    metric: '+18% no valor dos apartamentos',
  },
  {
    quote:
      'Profissionalismo do início ao fim. A consultoria técnica fez toda a diferença na escolha das espécies para nosso resort.',
    name: 'Ana Paula Silva',
    role: 'Diretora — Hotel Fazenda Estrela',
    metric: 'R$ 2,4M em paisagismo',
  },
  {
    quote:
      'Trabalhamos com a Jobar há 8 anos. A consistência na qualidade e no prazo é o que nos faz continuar referenciando.',
    name: 'Roberto Almeida',
    role: 'CEO — Almeida Engenharia',
    metric: '50+ projetos juntos',
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: 'Como faço para comprar?',
    answer:
      'Você pode comprar direto na loja online ou falar com a gente no WhatsApp. Se preferir, também é possível retirar no viveiro em Monte Mor, com agendamento.',
  },
  {
    question: 'Vocês entregam em todo o Brasil?',
    answer:
      'Sim. A entrega é feita com frota própria em Campinas, Grande SP e região, e por transportadora para as demais regiões. O frete é calculado pelo CEP no site da loja.',
  },
  {
    question: 'As mudas têm garantia?',
    answer:
      'Todas as mudas têm garantia de enraizamento. Se a planta não se adaptar nas primeiras semanas, orientamos o manejo e fazemos a substituição quando necessário. O suporte técnico acompanha o desenvolvimento.',
  },
  {
    question: 'Posso retirar no viveiro?',
    answer:
      'Sim. A retirada é gratuita em Monte Mor, com agendamento. Endereço: R. Ana de Lima Pinha, 472 — Parque Res. São Clemente.',
  },
  {
    question: 'Vocês fazem projetos de paisagismo?',
    answer:
      'Sim. Nossa equipe atende do projeto à execução, com seleção de espécies, consultoria e acompanhamento. Fale com um especialista para avaliar o seu espaço.',
  },
  {
    question: 'Quais são as formas de pagamento?',
    answer:
      'No site, você pode parcelar em até 4x sem juros ou pagar no Pix com 5% de desconto. Consulte as condições no checkout da loja.',
  },
] as const;
