import { useEffect, useRef, type RefObject } from 'react';
import type { Bitmap } from '../../lib/loadImages';
import styles from './LogCanvas.module.css';

export type HeroMotion = {
  zoom: number;
  pixel: number;
};

type MotionRef = { current: HeroMotion };

type LogCanvasProps = {
  bare: Bitmap | null;
  moss: Bitmap | null;
  logo: Bitmap | null;
  texture: Bitmap | null;
  motion: MotionRef;
  heroRef: RefObject<HTMLElement | null>;
};

type Rect = { x: number; y: number; w: number; h: number };

type Layout = {
  heroW: number;
  heroH: number;
  dpr: number;
  unit: number;
  clip: Rect;
  image: Rect;
};

type Stamp = {
  x: number;
  y: number;
  strength: number;
  born: number;
};

type Resources = {
  scene: HTMLCanvasElement;
  sceneCtx: CanvasRenderingContext2D;
  layer: HTMLCanvasElement;
  layerCtx: CanvasRenderingContext2D;
  mask: HTMLCanvasElement;
  maskCtx: CanvasRenderingContext2D;
  pixel: HTMLCanvasElement;
  pixelCtx: CanvasRenderingContext2D;
  brush: HTMLCanvasElement;
  logo: HTMLCanvasElement | null;
  logoKey: string;
};

const FADE_MS = 1100;
const BRUSH_RADIUS = 240;
const LOGO_X = 0.42;
const LOGO_Y = 0.64;
const LOGO_WIDTH_RATIO = 0.2;

function makeCanvas(): [HTMLCanvasElement, CanvasRenderingContext2D] | null {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  return ctx ? [canvas, ctx] : null;
}

function bitmapSize(bitmap: Bitmap): { w: number; h: number } {
  if ('naturalWidth' in bitmap) {
    return { w: bitmap.naturalWidth, h: bitmap.naturalHeight };
  }
  return { w: bitmap.width, h: bitmap.height };
}

function createBrush(radius: number): HTMLCanvasElement {
  const size = Math.max(2, Math.round(radius * 2));
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const gradient = ctx.createRadialGradient(radius, radius, 0, radius, radius, radius);
  gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
  gradient.addColorStop(0.45, 'rgba(0, 0, 0, 0.85)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  return canvas;
}

function createMossLogo(
  logo: Bitmap,
  texture: Bitmap,
  width: number,
  height: number,
  dpr: number,
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.ceil(width * dpr));
  canvas.height = Math.max(1, Math.ceil(height * dpr));
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  ctx.scale(dpr, dpr);

  const textureSize = bitmapSize(texture);
  const destAspect = width / height;
  const textureAspect = textureSize.w / textureSize.h;

  let sx = 0;
  let sy = 0;
  let sw = textureSize.w;
  let sh = textureSize.h;

  if (textureAspect > destAspect) {
    sw = textureSize.h * destAspect;
    sx = (textureSize.w - sw) / 2;
  } else {
    sh = textureSize.w / destAspect;
    sy = (textureSize.h - sh) / 2;
  }

  ctx.drawImage(texture, sx, sy, sw, sh, 0, 0, width, height);
  ctx.globalCompositeOperation = 'source-atop';
  ctx.fillStyle = 'rgba(208, 242, 75, 0.22)';
  ctx.fillRect(0, 0, width, height);
  ctx.globalCompositeOperation = 'destination-in';
  ctx.drawImage(logo, 0, 0, width, height);
  ctx.globalCompositeOperation = 'source-over';
  return canvas;
}

export function LogCanvas({
  bare,
  moss,
  logo,
  texture,
  motion,
  heroRef,
}: LogCanvasProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const probeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const clipEl = clipRef.current;
    const imageEl = imageRef.current;
    const probeEl = probeRef.current;

    if (!hero || !root || !canvas || !clipEl || !imageEl || !probeEl) return;

    const mainCtx = canvas.getContext('2d');
    const scene = makeCanvas();
    const layer = makeCanvas();
    const mask = makeCanvas();
    const pixel = makeCanvas();

    if (!mainCtx || !scene || !layer || !mask || !pixel) return;

    const resources: Resources = {
      scene: scene[0],
      sceneCtx: scene[1],
      layer: layer[0],
      layerCtx: layer[1],
      mask: mask[0],
      maskCtx: mask[1],
      pixel: pixel[0],
      pixelCtx: pixel[1],
      brush: createBrush(120),
      logo: null,
      logoKey: '',
    };

    let layout: Layout | null = null;
    let stamps: Stamp[] = [];
    let raf = 0;
    let disposed = false;
    let needsDraw = true;
    let lastPaintedZoom = -1;
    let lastPaintedPixel = -1;

    let inside = false;
    let lastX: number | null = null;
    let lastY: number | null = null;
    let lastMoveAt = 0;
    let lastRestStampAt = 0;
    let travel = 0;
    let radius = BRUSH_RADIUS;
    let brushRadius = BRUSH_RADIUS * 0.5;

    const touchQuery = window.matchMedia('(hover: none)');
    let isTouch = touchQuery.matches;

    const onTouchChange = (event: MediaQueryListEvent) => {
      isTouch = event.matches;
      needsDraw = true;
    };

    if (typeof touchQuery.addEventListener === 'function') {
      touchQuery.addEventListener('change', onTouchChange);
    } else {
      touchQuery.addListener(onTouchChange);
    }

    const resize = () => {
      const heroRect = hero.getBoundingClientRect();
      const clipRect = clipEl.getBoundingClientRect();
      const imageRect = imageEl.getBoundingClientRect();
      const probeRect = probeEl.getBoundingClientRect();

      const heroW = Math.max(0, heroRect.width);
      const heroH = Math.max(0, heroRect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      if (heroW <= 0 || heroH <= 0) {
        layout = null;
        return;
      }

      canvas.width = Math.round(heroW * dpr);
      canvas.height = Math.round(heroH * dpr);
      resources.scene.width = canvas.width;
      resources.scene.height = canvas.height;
      resources.layer.width = canvas.width;
      resources.layer.height = canvas.height;
      resources.mask.width = Math.max(1, Math.round(heroW * 0.5));
      resources.mask.height = Math.max(1, Math.round(heroH * 0.5));

      const unit = probeRect.width / 100;
      radius = BRUSH_RADIUS * unit;
      brushRadius = Math.max(1, Math.round(radius * 0.5));
      resources.brush = createBrush(brushRadius);

      const left = heroRect.left;
      const top = heroRect.top;

      layout = {
        heroW,
        heroH,
        dpr,
        unit,
        clip: {
          x: clipRect.left - left,
          y: clipRect.top - top,
          w: clipRect.width,
          h: clipRect.height,
        },
        image: {
          x: imageRect.left - left,
          y: imageRect.top - top,
          w: imageRect.width,
          h: imageRect.height,
        },
      };

      stamps = [];
      needsDraw = true;
    };

    const updateMask = (now: number) => {
      const ctx = resources.maskCtx;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, resources.mask.width, resources.mask.height);

      if (stamps.length === 0) return;

      stamps = stamps.filter((stamp) => {
        const alpha = stamp.strength * Math.exp(-(now - stamp.born) / FADE_MS);
        if (alpha < 0.004) return false;
        ctx.globalAlpha = alpha;
        ctx.drawImage(
          resources.brush,
          stamp.x * 0.5 - brushRadius,
          stamp.y * 0.5 - brushRadius,
        );
        return true;
      });

      ctx.globalAlpha = 1;
    };

    const drawMossLogo = (ctx: CanvasRenderingContext2D) => {
      if (!layout || !logo || !texture) return;

      const logoSize = bitmapSize(logo);
      const logoW = Math.max(120, layout.image.w * LOGO_WIDTH_RATIO);
      const logoH = logoW * (logoSize.h / logoSize.w);
      const key = `${Math.round(logoW)}:${Math.round(logoH)}:${layout.dpr}`;

      if (!resources.logo || resources.logoKey !== key) {
        resources.logo = createMossLogo(logo, texture, logoW, logoH, layout.dpr);
        resources.logoKey = key;
      }

      const cx = layout.image.x + layout.image.w * LOGO_X;
      const cy = layout.image.y + layout.image.h * LOGO_Y;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate((-3 * Math.PI) / 180);

      ctx.shadowColor = 'rgba(12, 26, 8, 0.5)';
      ctx.shadowBlur = 8;
      ctx.shadowOffsetY = 3;
      ctx.drawImage(resources.logo, -logoW / 2, -logoH / 2, logoW, logoH);

      ctx.shadowColor = 'rgba(208, 242, 75, 0.22)';
      ctx.shadowBlur = 12;
      ctx.shadowOffsetY = 0;
      ctx.drawImage(resources.logo, -logoW / 2, -logoH / 2, logoW, logoH);

      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;
      ctx.drawImage(resources.logo, -logoW / 2, -logoH / 2, logoW, logoH);
      ctx.restore();
    };

    const draw = (now: number) => {
      if (!layout) return;
      const { heroW, heroH, dpr, clip, image } = layout;

      if (heroW <= 0 || heroH <= 0) return;

      mainCtx.setTransform(1, 0, 0, 1, 0, 0);
      mainCtx.clearRect(0, 0, canvas.width, canvas.height);

      if (!bare) return;

      const zoom = Math.max(0.01, motion.current.zoom);
      const pixelLog = Math.max(0, motion.current.pixel);

      const sceneCtx = resources.sceneCtx;
      sceneCtx.setTransform(1, 0, 0, 1, 0, 0);
      sceneCtx.clearRect(0, 0, resources.scene.width, resources.scene.height);
      sceneCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

      sceneCtx.save();
      sceneCtx.beginPath();
      sceneCtx.rect(clip.x, clip.y, clip.w, clip.h);
      sceneCtx.clip();

      const focusX = image.x + image.w / 2;
      const focusY = image.y + image.h / 2;
      sceneCtx.translate(focusX, focusY);
      sceneCtx.scale(zoom, zoom);
      sceneCtx.translate(-focusX, -focusY);

      sceneCtx.drawImage(bare, image.x, image.y, image.w, image.h);

      if (moss) {
        if (isTouch) {
          sceneCtx.drawImage(moss, image.x, image.y, image.w, image.h);
          drawMossLogo(sceneCtx);
        } else {
          updateMask(now);

          const layerCtx = resources.layerCtx;
          layerCtx.setTransform(1, 0, 0, 1, 0, 0);
          layerCtx.clearRect(0, 0, resources.layer.width, resources.layer.height);
          layerCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
          layerCtx.drawImage(moss, image.x, image.y, image.w, image.h);
          drawMossLogo(layerCtx);
          layerCtx.globalCompositeOperation = 'destination-in';
          layerCtx.drawImage(resources.mask, 0, 0, heroW, heroH);
          layerCtx.globalCompositeOperation = 'source-over';

          sceneCtx.drawImage(resources.layer, 0, 0, heroW, heroH);
        }
      }

      sceneCtx.restore();

      const block = 2 ** pixelLog;

      if (block > 1.01) {
        const pw = Math.max(1, Math.round(heroW / block));
        const ph = Math.max(1, Math.round(heroH / block));

        if (resources.pixel.width !== pw || resources.pixel.height !== ph) {
          resources.pixel.width = pw;
          resources.pixel.height = ph;
        }

        const pixelCtx = resources.pixelCtx;
        pixelCtx.setTransform(1, 0, 0, 1, 0, 0);
        pixelCtx.clearRect(0, 0, pw, ph);
        pixelCtx.imageSmoothingEnabled = true;
        pixelCtx.drawImage(
          resources.scene,
          0,
          0,
          resources.scene.width,
          resources.scene.height,
          0,
          0,
          pw,
          ph,
        );

        mainCtx.imageSmoothingEnabled = false;
        mainCtx.drawImage(resources.pixel, 0, 0, pw, ph, 0, 0, canvas.width, canvas.height);
      } else {
        mainCtx.imageSmoothingEnabled = true;
        mainCtx.drawImage(resources.scene, 0, 0);
      }
    };

    const pointerMove = (event: PointerEvent) => {
      if (isTouch || event.pointerType === 'touch') return;
      if (!layout) return;

      const rect = hero.getBoundingClientRect();
      const px = event.clientX - rect.left;
      const py = event.clientY - rect.top;

      if (px < 0 || py < 0 || px > rect.width || py > rect.height) {
        inside = false;
        lastX = null;
        lastY = null;
        return;
      }

      inside = true;
      const now = performance.now();

      if (lastX === null || lastY === null) {
        lastX = px;
        lastY = py;
        lastMoveAt = now;
        travel = 0;
        stamps.push({ x: px, y: py, strength: 0.5, born: now });
        needsDraw = true;
        return;
      }

      const dx = px - lastX;
      const dy = py - lastY;
      const distance = Math.hypot(dx, dy);

      if (distance < 0.5) {
        lastMoveAt = now;
        return;
      }

      const step = Math.max(1, radius * 0.12);

      for (let d = step - travel; d <= distance; d += step) {
        const t = d / distance;
        stamps.push({
          x: lastX + dx * t,
          y: lastY + dy * t,
          strength: 0.5,
          born: now,
        });
      }

      travel = (travel + distance) % step;
      lastX = px;
      lastY = py;
      lastMoveAt = now;
      needsDraw = true;
    };

    const pointerEnter = () => {
      inside = true;
      lastX = null;
      lastY = null;
      travel = 0;
    };

    const pointerLeave = () => {
      inside = false;
      lastX = null;
      lastY = null;
    };

    const windowOut = (event: MouseEvent) => {
      if (!event.relatedTarget) {
        inside = false;
        lastX = null;
        lastY = null;
      }
    };

    const loop = (now: number) => {
      if (disposed) return;

      if (
        motion.current.zoom !== lastPaintedZoom ||
        motion.current.pixel !== lastPaintedPixel
      ) {
        lastPaintedZoom = motion.current.zoom;
        lastPaintedPixel = motion.current.pixel;
        needsDraw = true;
      }

      if (
        !isTouch &&
        inside &&
        lastX !== null &&
        lastY !== null &&
        now - lastMoveAt > 50 &&
        now - lastRestStampAt > 50
      ) {
        stamps.push({ x: lastX, y: lastY, strength: 0.25, born: now });
        lastRestStampAt = now;
        needsDraw = true;
      }

      if (needsDraw || stamps.length > 0) {
        draw(now);
        needsDraw = false;
      }

      raf = requestAnimationFrame(loop);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(hero);
    const clipObserver = new ResizeObserver(resize);
    clipObserver.observe(clipEl);
    const imageObserver = new ResizeObserver(resize);
    imageObserver.observe(imageEl);

    window.addEventListener('resize', resize);
    hero.addEventListener('pointermove', pointerMove);
    hero.addEventListener('pointerenter', pointerEnter);
    hero.addEventListener('pointerleave', pointerLeave);
    window.addEventListener('mouseout', windowOut);

    resize();
    raf = requestAnimationFrame(loop);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      clipObserver.disconnect();
      imageObserver.disconnect();
      window.removeEventListener('resize', resize);
      hero.removeEventListener('pointermove', pointerMove);
      hero.removeEventListener('pointerenter', pointerEnter);
      hero.removeEventListener('pointerleave', pointerLeave);
      window.removeEventListener('mouseout', windowOut);

      if (typeof touchQuery.removeEventListener === 'function') {
        touchQuery.removeEventListener('change', onTouchChange);
      } else {
        touchQuery.removeListener(onTouchChange);
      }
    };
  }, [bare, moss, logo, texture, motion, heroRef]);

  return (
    <div className={styles.root} ref={rootRef} aria-hidden="true">
      <canvas className={styles.canvas} ref={canvasRef} />
      <div className={styles.clip} ref={clipRef}>
        <div className={styles.image} ref={imageRef} />
      </div>
      <div className={styles.probe} ref={probeRef} />
    </div>
  );
}
