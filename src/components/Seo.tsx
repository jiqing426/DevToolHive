import Head from 'next/head';
import { useRouter } from 'next/router';
import { LOCALES, DEFAULT_LOCALE, SITE_ORIGIN, type Locale } from '@/lib/site';

interface SeoProps {
  title: string;
  description: string;
  path: string;
}

const OG_LOCALE: Record<Locale, string> = {
  en: 'en_US',
  'zh-CN': 'zh_CN',
  de: 'de_DE',
  fr: 'fr_FR',
  it: 'it_IT',
  es: 'es_ES',
  ja: 'ja_JP',
};

/**
 * 服务端输出 meta + 7 语种 hreflang + JSON-LD 结构化数据。
 * 禁止客户端动态修改，爬虫 100% 抓取完整。
 */
export default function Seo({ title, description, path }: SeoProps) {
  const router = useRouter();
  const locale = (router.locale as Locale) || DEFAULT_LOCALE;
  const cleanPath = path === '/' ? '' : path;

  const hrefFor = (l: Locale): string => {
    const p = l === DEFAULT_LOCALE ? cleanPath : `/${l}${cleanPath}`;
    return `${SITE_ORIGIN}${p || '/'}`;
  };

  const canonical = hrefFor(locale);
  const ogImage = `${SITE_ORIGIN}/favicon.svg`;

  // JSON-LD 结构化数据：WebApplication，提升 Google 丰富摘要概率
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: title,
    description,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any (Web Browser)',
    url: canonical,
    browserRequirements: 'Requires JavaScript',
    inLanguage: locale,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="DevToolHive" />
      <meta property="og:locale" content={OG_LOCALE[locale]} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      {LOCALES.map((l) => (
        <link key={l} rel="alternate" hrefLang={l} href={hrefFor(l)} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={hrefFor(DEFAULT_LOCALE)} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  );
}
