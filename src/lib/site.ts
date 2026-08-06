export const LOCALES = ['en', 'zh-CN', 'de', 'fr', 'it', 'es', 'ja'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';
export const SITE_ORIGIN = 'https://devtoolhive.dev';

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  'zh-CN': '中文(简体)',
  de: 'Deutsch',
  fr: 'Français',
  it: 'Italiano',
  es: 'Español',
  ja: '日本語',
};

export interface ToolMeta {
  slug: string;
  ns: string;
}

/** 10 个工具元数据：slug = 路由段，ns = i18n namespace */
export const TOOLS: ToolMeta[] = [
  { slug: 'json-yaml-converter', ns: 'json-yaml' },
  { slug: 'pixel-art-palette-generator', ns: 'pixel-palette' },
  { slug: 'meta-tag-generator', ns: 'meta-tag' },
  { slug: 'case-converter', ns: 'case-converter' },
  { slug: 'timestamp-converter', ns: 'timestamp' },
  { slug: 'hash-generator', ns: 'hash-generator' },
  { slug: 'color-converter', ns: 'color-converter' },
  { slug: 'utm-link-generator', ns: 'utm-link' },
  { slug: 'image-compressor', ns: 'image-compressor' },
  { slug: 'image-ocr', ns: 'image-ocr' },
];

/** 根据当前 locale 生成工具链接（英文无前缀，其余带前缀） */
export function toolHref(slug: string, locale: string): string {
  return locale === DEFAULT_LOCALE ? `/${slug}` : `/${locale}/${slug}`;
}

/** 根据当前 locale 生成页面链接 */
export function pageHref(path: string, locale: string): string {
  const clean = path === '/' ? '' : path;
  return locale === DEFAULT_LOCALE ? clean || '/' : `/${locale}${clean}`;
}
