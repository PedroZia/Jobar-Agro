import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';
import gsap from 'gsap';
import { STORE_ALL_PLANTS } from '../../data/site';
import { loadImageElement, loadLogImages, type Bitmap } from '../../lib/loadImages';
import { LogCanvas, type HeroMotion } from './LogCanvas';
import styles from './Hero.module.css';

const LOG_BARE = 'https://assets.uberdesigner.ai/easylog/log-bare.webp';
const LOG_MOSS = 'https://assets.uberdesigner.ai/easylog/log-moss.webp';
const LOGO = '/assets/logo-jobar.png';
const MOSS_TEXTURE = '/assets/moss-texture.webp';

const ZOOM_FROM = 2.6;
const PIXEL_LOG_FROM = 6;
const ZOOM_DURATION = 0.9;
const PIXEL_DURATION = 1;
const COUNTER_DURATION = 0.8;

type HeroAssets = {
  bare: Bitmap | null;
  moss: Bitmap | null;
  logo: Bitmap | null;
  texture: Bitmap | null;
};

type HeroProps = {
  headerRef: RefObject<HTMLElement | null>;
  onIntroDone: () => void;
};

function renderChars(text: string) {
  return Array.from(text).map((char, index) => (
    <span
      key={`${char}-${index}`}
      className={`${styles.char} intro-char`}
      data-char
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));
}

export function Hero({ headerRef, onIntroDone }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const leadRef = useRef<HTMLParagraphElement>(null);
  const actionTextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const counterWrapRef = useRef<HTMLParagraphElement>(null);

  const motion = useRef<HeroMotion>({ zoom: ZOOM_FROM, pixel: PIXEL_LOG_FROM });
  const counterValue = useRef({ value: 0 });

  const reducedMotion = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const scrollSkip = useRef(
    typeof window !== 'undefined' && window.scrollY > 40,
  );
  const skipIntro = useRef(reducedMotion.current || scrollSkip.current);

  const [assets, setAssets] = useState<HeroAssets | null>(null);

  const renderCounter = useCallback(() => {
    const element = counterRef.current;
    if (!element) return;
    const value = Math.round(counterValue.current.value * 100);
    element.textContent = String(value).padStart(2, '0');
  }, []);

  useEffect(() => {
    if (scrollSkip.current) onIntroDone();
  }, [onIntroDone]);

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    const setProgress = gsap.quickTo(counterValue.current, 'value', {
      duration: 0.4,
      ease: 'power1.out',
      onUpdate: renderCounter,
    });

    const waitForFonts = async () => {
      if (!('fonts' in document)) return;
      await Promise.allSettled([
        document.fonts.load('italic 400 1em "Instrument Serif"'),
        document.fonts.load('400 1em "Instrument Sans"'),
        document.fonts.load('500 1em "Instrument Sans"'),
        document.fonts.load('600 1em "Instrument Sans"'),
      ]);
    };

    const load = async () => {
      const [images] = await Promise.all([
        loadLogImages([LOG_BARE, LOG_MOSS], controller.signal, (value) => {
          if (!cancelled) setProgress(value * 0.9);
        }),
        waitForFonts(),
      ]);

      const [logo, texture] = await Promise.all([
        loadImageElement(LOGO).catch(() => null),
        loadImageElement(MOSS_TEXTURE).catch(() => null),
      ]);

      if (cancelled) return;

      if (skipIntro.current) {
        motion.current.zoom = 1;
        motion.current.pixel = 0;
      }

      setAssets({
        bare: images[0] ?? null,
        moss: images[1] ?? null,
        logo,
        texture,
      });
    };

    load().catch((error: unknown) => {
      if (!controller.signal.aborted) {
        console.error('[Jobar] Falha ao carregar o hero.', error);
      }
      if (cancelled) return;

      if (skipIntro.current) {
        motion.current.zoom = 1;
        motion.current.pixel = 0;
      }

      setAssets({ bare: null, moss: null, logo: null, texture: null });
    });

    return () => {
      cancelled = true;
      controller.abort();
      gsap.killTweensOf(counterValue.current);
    };
  }, [renderCounter]);

  useEffect(() => {
    if (!assets) return;

    const hero = heroRef.current;
    if (!hero) return;

    const header = headerRef.current;
    const counterWrap = counterWrapRef.current;
    const chars = Array.from(hero.querySelectorAll<HTMLElement>('[data-char]'));
    const line1 = Array.from(hero.querySelectorAll<HTMLElement>('[data-line="1"] [data-char]'));
    const line2 = Array.from(hero.querySelectorAll<HTMLElement>('[data-line="2"] [data-char]'));
    const lead = leadRef.current;
    const actionText = actionTextRef.current;
    const cta = ctaRef.current;
    const bottom = bottomRef.current;

    const skip = skipIntro.current || window.scrollY > 40;

    if (skip) {
      motion.current.zoom = 1;
      motion.current.pixel = 0;
      if (counterWrap) counterWrap.style.display = 'none';

      const targets = [header, lead, actionText, cta, bottom].filter(
        (element): element is HTMLElement => element !== null,
      );

      if (reducedMotion.current && !scrollSkip.current) {
        gsap.to([...targets, ...chars], {
          opacity: 1,
          duration: 0.4,
          ease: 'power1.out',
          onComplete: onIntroDone,
        });
        gsap.set(chars, { filter: 'none', transform: 'none' });
      } else {
        gsap.set([...targets, ...chars], {
          opacity: 1,
          filter: 'none',
          xPercent: 0,
        });
        onIntroDone();
      }

      return;
    }

    const ctx = gsap.context(() => {
      gsap.killTweensOf(counterValue.current);

      const timeline = gsap.timeline();

      timeline.to(
        counterValue.current,
        {
          value: 1,
          duration: COUNTER_DURATION,
          ease: 'power1.out',
          onUpdate: renderCounter,
        },
        0,
      );

      timeline.to(
        motion.current,
        { zoom: 1, duration: ZOOM_DURATION, ease: 'expo.out' },
        0,
      );

      timeline.to(
        motion.current,
        { pixel: 0, duration: PIXEL_DURATION, ease: 'none' },
        0,
      );

      if (counterWrap) {
        timeline.to(
          counterWrap,
          { opacity: 0, duration: 0.4, ease: 'power1.in' },
          0.85,
        );
        timeline.call(
          () => {
            counterWrap.style.visibility = 'hidden';
          },
          undefined,
          1.3,
        );
      }

      if (header) {
        timeline.fromTo(
          header,
          { opacity: 0, filter: 'blur(8px)' },
          {
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.5,
            ease: 'power2.out',
            clearProps: 'filter',
          },
          1,
        );
      }

      const charFrom = { opacity: 0, filter: 'blur(18px)', xPercent: -30 };
      const charTo = {
        opacity: 1,
        filter: 'blur(0px)',
        xPercent: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.035,
        clearProps: 'filter,transform',
      };

      timeline.fromTo(line1, charFrom, charTo, 1.3);
      timeline.fromTo(line2, charFrom, charTo, 1.3);

      if (lead) {
        timeline.fromTo(
          lead,
          { opacity: 0, filter: 'blur(10px)' },
          {
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.6,
            ease: 'power2.out',
            clearProps: 'filter',
          },
          2.1,
        );
      }

      if (bottom) {
        timeline.fromTo(
          bottom,
          { opacity: 0, filter: 'blur(10px)' },
          {
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.6,
            ease: 'power2.out',
            clearProps: 'filter',
          },
          2.5,
        );
      }

      if (actionText) {
        timeline.fromTo(
          actionText,
          { opacity: 0, filter: 'blur(10px)' },
          {
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.6,
            ease: 'power2.out',
            clearProps: 'filter',
          },
          2.7,
        );
      }

      if (cta) {
        timeline.fromTo(
          cta,
          { opacity: 0, filter: 'blur(10px)' },
          {
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.6,
            ease: 'power2.out',
            clearProps: 'filter',
          },
          2.85,
        );
      }

      timeline.call(() => onIntroDone(), undefined, 1.5);
    }, hero);

    return () => ctx.revert();
  }, [assets, headerRef, onIntroDone, renderCounter]);

  return (
    <section
      ref={heroRef}
      id="inicio"
      className={styles.hero}
      aria-labelledby="hero-title"
    >
      <LogCanvas
        bare={assets?.bare ?? null}
        moss={assets?.moss ?? null}
        logo={assets?.logo ?? null}
        texture={assets?.texture ?? null}
        motion={motion}
        heroRef={heroRef}
      />

      <div className={styles.top}>
        <h1
          id="hero-title"
          className={styles.headline}
          aria-label="Do viveiro para o jardim."
        >
          <span className={styles.line1} data-line="1" aria-hidden="true">
            {renderChars('Do viveiro')}
          </span>
          <span className={styles.line2} data-line="2" aria-hidden="true">
            {renderChars('para o jardim.')}
          </span>
        </h1>

        <p ref={leadRef} className={`${styles.lead} ${styles.body} intro-hidden`}>
          Mudas frutíferas, ornamentais e nativas para projetos que crescem com o
          tempo.
        </p>
      </div>

      <div className={styles.action}>
        <p
          ref={actionTextRef}
          className={`${styles.actionText} ${styles.body} intro-hidden`}
        >
          Do viveiro em Monte Mor para todo o Brasil — com consultoria, entrega
          própria e garantia de enraizamento.
        </p>
        <a
          ref={ctaRef}
          href={STORE_ALL_PLANTS}
          className={`${styles.cta} intro-hidden`}
        >
          Explorar mudas
        </a>
      </div>

      <div ref={bottomRef} className={`${styles.bottom} ${styles.small} intro-hidden`}>
        <div className={styles.scrollCue}>
          <span className={styles.circle} aria-hidden="true">
            <span className={styles.arrow}>↓</span>
          </span>
          <span>Role para descobrir</span>
          <span className={styles.hint}>Passe o mouse no tronco</span>
        </div>
        <span className={styles.place}>Monte Mor — SP</span>
      </div>

      <p
        ref={counterWrapRef}
        className={`${styles.counter} intro-counter`}
        aria-hidden="true"
      >
        <span ref={counterRef}>00</span>
        <span className={styles.percent}>%</span>
      </p>
    </section>
  );
}
