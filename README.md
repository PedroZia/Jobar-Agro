# Jobar Agro — Do viveiro para o seu jardim

Landing page da Jobar Agro com um hero interativo: um tronco flutuante em que o
musgo cresce atrás do cursor e revela o wordmark da marca. A página também
conecta o visitante às categorias e aos produtos da loja online.

## Stack

- Vite + React 19 + TypeScript
- GSAP 3.15 (intro do hero)
- Canvas 2D (musgo, pixelização, zoom)
- CSS Modules + tokens globais
- Fontes: Instrument Serif + Instrument Sans

## Local

```bash
npm install
npm run dev
```

Build de produção:

```bash
npm run build
npm run preview
```

## Estrutura

```
index.html                     meta tags, fontes, preloads, JSON-LD
public/assets/                 logo, textura de musgo, foto do viveiro
src/App.tsx                    composição da home
src/components/hero/           Hero, LogCanvas, Cursor
src/components/header/         header fixo + menu fullscreen
src/components/sections/       vitrine, categorias, viveiro, quiz, provas, FAQ, CTA, footer
src/components/ui/             logo, ícones, reveal, cabeçalho de seção
src/data/                      produtos, categorias, contatos e conteúdo
src/lib/loadImages.ts          carregamento das imagens com progresso
src/styles/                    tokens e reset
```

## O que editar primeiro

- **Produtos:** `src/data/products.ts` — nome, categoria, preço, imagem e link.
- **Categorias e contatos:** `src/data/site.ts`.
- **Copy do hero:** `src/components/hero/Hero.tsx`.
- **Números e depoimentos:** `src/data/site.ts` (os números e depoimentos vieram
  da landing antiga; confirme antes de publicar).
- **Cores e tipografia:** `src/styles/tokens.css`.

## Hero e musgo

O hero usa o par de imagens `log-bare.webp` / `log-moss.webp` do template
easylog como material provisório. O canvas:

1. desenha o tronco seco;
2. carimba o musgo atrás do cursor em uma máscara;
3. aplica a máscara na versão com musgo;
4. desenha o wordmark da Jobar dentro da mesma camada de musgo (o logo aparece
   quando o cursor passa; em telas touch ele fica visível por inteiro).

Para trocar por imagens próprias, mantenha duas imagens do mesmo tamanho e
enquadramento, alinhadas pixel a pixel, com fundo transparente, e atualize as
constantes `LOG_BARE` / `LOG_MOSS` em `src/components/hero/Hero.tsx`. Se mudar a
proporção, ajuste o `aspect-ratio` em `LogCanvas.module.css`.

## Loja

O CTA principal aponta para `https://jobaragro.com.br/produtos/`. As categorias
do menu e do footer apontam para as coleções da Nuvemshop. Os preços exibidos na
vitrine foram lidos da loja em outubro de 2026 e ficam em
`src/data/products.ts`; o rodapé da seção avisa que preços e disponibilidade
valem no site da loja.

## Assets e licença

- O logo e a foto do viveiro são da Jobar Agro.
- As duas imagens do tronco vêm do template easylog e estão aqui como
  placeholder. O template é gratuito para uso pessoal; para uso comercial, revise
  a licença do Uberdesigner ou troque por um par de imagens próprio.
- Fontes Instrument Serif/Sans são SIL Open Font License.

## Deploy

A Vercel detecta o Vite automaticamente. Build: `npm run build`; output: `dist`.
