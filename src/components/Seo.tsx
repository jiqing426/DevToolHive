import Head from 'next/head';
import { useRouter } from 'next/router';
import { LOCALES, DEFAULT_LOCALE, SITE_ORIGIN, type Locale } from '@/lib/site';

interface SeoProps {
  title: string;
  description: string;
  path: string;
}

/** 服务端输出 meta + 7 语种 hreflang，禁止客户端动态修改 */
export default function Seo({ title, description, path }: SeoProps) {
  const router = useRouter();
  const locale = (router.locale as Locale) || DEFAULT_LOCALE;
  const cleanPath = path === '/' ? '' : path;

  const hrefFor = (l: Locale): string => {
    const p = l === DEFAULT_LOCALE ? cleanPath : `/${l}${cleanPath}`;
    return `${SITE_ORIGIN}${p || '/'}`;
  };

  const canonical = hrefFor(locale);

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {LOCALES.map((l) => (
        <link key={l} rel="alternate" hrefLang={l} href={hrefFor(l)} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={hrefFor(DEFAULT_LOCALE)} />
    </Head>
  );
}
