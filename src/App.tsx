import { useCallback, useRef, useState } from 'react';
import { Header } from './components/header/Header';
import { Cursor } from './components/hero/Cursor';
import { Hero } from './components/hero/Hero';
import { Categories } from './components/sections/Categories';
import { FAQ } from './components/sections/FAQ';
import { Featured } from './components/sections/Featured';
import { FinalCTA } from './components/sections/FinalCTA';
import { Footer } from './components/sections/Footer';
import { Quiz } from './components/sections/Quiz';
import { Story } from './components/sections/Story';
import { Testimonials } from './components/sections/Testimonials';
import { TrustBar } from './components/sections/TrustBar';

export default function App() {
  const headerRef = useRef<HTMLElement | null>(null);
  const [introDone, setIntroDone] = useState(false);
  const onIntroDone = useCallback(() => setIntroDone(true), []);

  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>

      <Header headerRef={headerRef} introDone={introDone} />

      <main id="conteudo">
        <Hero headerRef={headerRef} onIntroDone={onIntroDone} />
        <TrustBar />
        <Featured />
        <Categories />
        <Story />
        <Quiz />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />
      <Cursor />
    </>
  );
}
