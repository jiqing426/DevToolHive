export interface OcrLanguage {
  value: string;
  labelKey: string;
}

/** OCR 识别语言选项（value 对应 tesseract.js 语言包代码） */
export const OCR_LANGUAGES: OcrLanguage[] = [
  { value: 'eng', labelKey: 'english' },
  { value: 'chi_sim', labelKey: 'chinese' },
];

/**
 * 使用 tesseract.js 对图片执行 OCR 文字识别。
 * 动态 import 避免将该重型依赖打入主包/SSR 评估。
 * 仅在浏览器环境调用（点击识别时执行）。
 */
export async function runOcr(
  image: File | Blob,
  lang: string,
  onProgress?: (progress: number) => void,
): Promise<string> {
  const { createWorker } = await import('tesseract.js');
  const worker = await createWorker(lang, 1, {
    logger: (m: { status?: string; progress?: number }) => {
      if (m.status === 'recognizing text' && typeof m.progress === 'number') {
        onProgress?.(m.progress);
      }
    },
  });
  try {
    const { data } = await worker.recognize(image);
    return data.text;
  } finally {
    await worker.terminate();
  }
}
