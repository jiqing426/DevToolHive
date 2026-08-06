export interface CompressResult {
  blob: Blob;
  url: string;
  size: number;
}

/** 字节数格式化为人类可读字符串 */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/** 计算压缩率（百分比，正数表示减小） */
export function getReduction(original: number, compressed: number): number {
  if (original <= 0) return 0;
  return Math.round(((original - compressed) / original) * 100);
}

/**
 * 用 Canvas 重新绘制图片并按指定质量/类型压缩为 Blob。
 * 仅在浏览器环境调用（事件处理 / effect 中执行）。
 */
export async function compressImage(
  file: File | Blob,
  quality: number,
  type: string,
): Promise<CompressResult> {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement('canvas');
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    bitmap.close?.();
    throw new Error('Canvas not supported');
  }
  ctx.drawImage(bitmap, 0, 0);
  bitmap.close?.();

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, type, quality),
  );
  if (!blob) throw new Error('Compression failed');
  return { blob, url: URL.createObjectURL(blob), size: blob.size };
}
