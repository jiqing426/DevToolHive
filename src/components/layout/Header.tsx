import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Menu, ChevronDown, X, Globe } from 'lucide-react';
import { TOOLS, LOCALES, LOCALE_LABELS, toolHref, type Locale } from '@/lib/site';

export default function Header() {
  const { t } = useTranslation(['common', 'tools']);
  const router = useRouter();
  const locale = (router.locale as Locale) || 'en';
  const [toolsOpen, setToolsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [drawer, setDrawer] = useState(false);

  const homeHref = locale === 'en' ? '/' : `/${locale}`;

  const changeLang = (l: Locale) => {
    router.push(router.asPath, router.asPath, { locale: l });
    setLangOpen(false);
    setDrawer(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href={homeHref} className="flex items-center gap-2 font-extrabold text-lg">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-honey-500 text-white">D</span>
          <span className="text-gray-900">DevToolHive</span>
        </Link>

        {/* 桌面导航 */}
        <nav className="hidden desktop:flex items-center gap-1">
          <div className="relative" onMouseLeave={() => setToolsOpen(false)}>
            <button
              onMouseEnter={() => setToolsOpen(true)}
              onClick={() => setToolsOpen((v) => !v)}
              className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700"
            >
              {t('common:nav.tools')} <ChevronDown size={16} />
            </button>
            {toolsOpen && (
              <div className="absolute top-full left-0 w-72 bg-white border border-gray-200 rounded-xl shadow-lg py-2 max-h-[70vh] overflow-y-auto">
                {TOOLS.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={toolHref(tool.slug, locale)}
                    className="block px-4 py-2 hover:bg-honey-50 transition-colors"
                  >
                    <div className="text-sm font-medium text-gray-900">{t(`tools:${tool.slug}.name`)}</div>
                    <div className="text-xs text-gray-500">{t(`tools:${tool.slug}.desc`)}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="relative" onMouseLeave={() => setLangOpen(false)}>
            <button
              onMouseEnter={() => setLangOpen(true)}
              onClick={() => setLangOpen((v) => !v)}
              className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700"
            >
              <Globe size={16} /> {LOCALE_LABELS[locale]} <ChevronDown size={16} />
            </button>
            {langOpen && (
              <div className="absolute top-full right-0 w-44 bg-white border border-gray-200 rounded-xl shadow-lg py-2">
                {LOCALES.map((l) => (
                  <button
                    key={l}
                    onClick={() => changeLang(l)}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-honey-50 ${
                      l === locale ? 'text-honey-600 font-semibold' : 'text-gray-700'
                    }`}
                  >
                    {LOCALE_LABELS[l]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* 移动汉堡 */}
        <button
          className="desktop:hidden p-2 text-gray-700"
          onClick={() => setDrawer(true)}
          aria-label={t('common:nav.menu')}
        >
          <Menu size={22} />
        </button>
      </div>

      {/* 移动抽屉 */}
      {drawer && (
        <div className="fixed inset-0 z-50 desktop:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDrawer(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-white shadow-xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <span className="font-bold text-gray-900">{t('common:nav.menu')}</span>
              <button onClick={() => setDrawer(false)} aria-label="close" className="text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="overflow-y-auto p-4 space-y-6">
              <div>
                <div className="text-xs uppercase tracking-wide text-gray-400 mb-2">
                  {t('common:nav.tools')}
                </div>
                {TOOLS.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={toolHref(tool.slug, locale)}
                    onClick={() => setDrawer(false)}
                    className="block py-2 text-sm text-gray-700 hover:text-honey-600"
                  >
                    {t(`tools:${tool.slug}.name`)}
                  </Link>
                ))}
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-gray-400 mb-2">
                  {t('common:nav.language')}
                </div>
                {LOCALES.map((l) => (
                  <button
                    key={l}
                    onClick={() => changeLang(l)}
                    className={`block w-full text-left py-2 text-sm ${
                      l === locale ? 'text-honey-600 font-semibold' : 'text-gray-700'
                    }`}
                  >
                    {LOCALE_LABELS[l]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
