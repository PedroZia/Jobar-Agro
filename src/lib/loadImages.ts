export type Bitmap = ImageBitmap | HTMLImageElement;

type ByteProgress = (loaded: number, total: number) => void;

async function decode(blob: Blob): Promise<Bitmap> {
  if (typeof createImageBitmap === 'function') {
    return createImageBitmap(blob);
  }

  const url = URL.createObjectURL(blob);
  const img = new Image();
  img.decoding = 'async';
  img.src = url;
  await img.decode();
  return img;
}

async function fetchBitmap(
  url: string,
  signal: AbortSignal,
  onProgress: ByteProgress,
): Promise<Bitmap> {
  const response = await fetch(url, {
    signal,
    mode: 'cors',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }

  const total = Number(response.headers.get('Content-Length') ?? 0);
  const type = response.headers.get('Content-Type') ?? 'image/webp';
  const reader = response.body?.getReader();

  if (!reader) {
    const blob = await response.blob();
    onProgress(blob.size, blob.size);
    return decode(blob);
  }

  const chunks: BlobPart[] = [];
  let loaded = 0;

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) {
      chunks.push(value.slice().buffer);
      loaded += value.byteLength;
      onProgress(loaded, total);
    }
  }

  const blob = new Blob(chunks, { type });
  onProgress(loaded, total || loaded);
  return decode(blob);
}

/**
 * Loads the two aligned log images while reporting byte progress.
 * Never reports progress going backwards. Missing Content-Length falls
 * back to completed-file count.
 */
export async function loadLogImages(
  urls: readonly string[],
  signal: AbortSignal,
  onProgress: (value: number) => void,
): Promise<Array<Bitmap | null>> {
  const states = urls.map(() => ({
    loaded: 0,
    total: 0,
    settled: false,
  }));
  let lastValue = 0;

  const report = () => {
    const allTotalsKnown = states.every((state) => state.total > 0);
    let value: number;

    if (allTotalsKnown) {
      const total = states.reduce((sum, state) => sum + state.total, 0);
      const loaded = states.reduce((sum, state) => sum + state.loaded, 0);
      value = total > 0 ? loaded / total : 0;
    } else {
      value = states.filter((state) => state.settled).length / states.length;
    }

    lastValue = Math.max(lastValue, value);
    onProgress(lastValue);
  };

  const results = await Promise.allSettled(
    urls.map((url, index) =>
      fetchBitmap(url, signal, (loaded, total) => {
        const state = states[index];
        if (!state) return;
        state.loaded = Math.max(state.loaded, loaded);
        state.total = Math.max(state.total, total);
        report();
      }),
    ),
  );

  return results.map((result, index) => {
    const state = states[index];
    if (state) state.settled = true;

    if (result.status === 'rejected') {
      if (!signal.aborted) {
        console.error(`[Jobar] Não foi possível carregar ${urls[index]}`, result.reason);
      }
      report();
      return null;
    }

    report();
    return result.value;
  });
}

/** Loads a local image through the <img> cache (works with as="image" preloads). */
export function loadImageElement(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load ${url}`));
    img.src = url;
  });
}
