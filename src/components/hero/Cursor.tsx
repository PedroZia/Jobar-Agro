import { useEffect, useRef, useState } from 'react';
import styles from './Cursor.module.css';

const QUERY = '(hover: hover) and (pointer: fine)';

export function Cursor() {
  const [enabled, setEnabled] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(QUERY).matches,
  );
  const discRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia(QUERY);
    const onChange = (event: MediaQueryListEvent) => setEnabled(event.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const disc = discRef.current;
    if (!disc) return;

    const root = document.documentElement;
    root.classList.add('has-custom-cursor');

    let raf = 0;
    let hasPosition = false;
    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;
    let lastFrame = performance.now();

    const move = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;

      if (!hasPosition) {
        x = targetX;
        y = targetY;
        hasPosition = true;
        disc.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }

      disc.style.opacity = '1';
    };

    const hide = () => {
      disc.style.opacity = '0';
    };

    const out = (event: MouseEvent) => {
      if (!event.relatedTarget) hide();
    };

    const loop = (now: number) => {
      const dt = Math.min(50, now - lastFrame);
      lastFrame = now;

      if (hasPosition) {
        const k = 1 - 0.7 ** (dt / 16.67);
        x += (targetX - x) * k;
        y += (targetY - y) * k;
        disc.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }

      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('mouseout', out);

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', move);
      document.removeEventListener('mouseout', out);
      root.classList.remove('has-custom-cursor');
    };
  }, [enabled]);

  if (!enabled) return null;

  return <div ref={discRef} className={styles.cursor} aria-hidden="true" />;
}
