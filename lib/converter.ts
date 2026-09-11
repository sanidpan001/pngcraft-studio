// NO WATERMARK LOGIC - This tool never adds watermarks to any image

export interface ConvertedImageFile {
  id: string;
  originalFile: File;
  originalSize: number;
  convertedBlob: Blob;
  convertedSize: number;
  originalUrl: string;
  convertedUrl: string;
  width: number;
  height: number;
  name: string;
  convertedName: string;
  duration: number;
}

export type BackgroundMode = 'transparent' | 'white' | 'custom';
export type QualityMode = 'lossless' | 'compressed';

export interface ConvertOptions {
  background: BackgroundMode;
  customColor: string;
  quality: QualityMode;
}

/**
 * Convert a JPG/JPEG image to PNG entirely client-side using the Canvas API.
 * No server upload. No watermark. No external processing.
 */
export async function convertJpgToPng(
  file: File,
  options: ConvertOptions
): Promise<ConvertedImageFile> {
  const startTime = performance.now();

  const img = await loadImage(file);
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas not supported in this browser');

  // Fill background if not transparent
  if (options.background === 'white') {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else if (options.background === 'custom') {
    ctx.fillStyle = options.customColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  // For transparent, we don't fill - canvas is transparent by default

  ctx.drawImage(img, 0, 0);

  const blob = await canvasToBlob(canvas, options.quality);
  const endTime = performance.now();
  const duration = Math.max(0.01, (endTime - startTime) / 1000);

  const convertedName = file.name.replace(/\.(jpe?g)$/i, '.png');

  return {
    id: crypto.randomUUID(),
    originalFile: file,
    originalSize: file.size,
    convertedBlob: blob,
    convertedSize: blob.size,
    originalUrl: URL.createObjectURL(file),
    convertedUrl: URL.createObjectURL(blob),
    width: img.naturalWidth,
    height: img.naturalHeight,
    name: file.name,
    convertedName,
    duration,
  };
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(`Failed to load image: ${file.name}`));
    };
    img.src = url;
  });
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  quality: QualityMode
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    // PNG is always lossless by nature; quality mode affects compression level
    // For "compressed" mode, we could use a lower quality canvas export,
    // but since PNG is lossless, we still use image/png
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Failed to convert image'));
      },
      'image/png',
      quality === 'compressed' ? 0.8 : 1.0
    );
  });
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
