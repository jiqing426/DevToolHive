import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { toolHref } from '@/lib/site';

export default function Footer() {
  const { t } = useTranslation('common');
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col desktop:flex-row items-center justify-between gap-4 text-sm text-gray-600">
        <span>{t('footer.copyright')}</span>
        <nav className="flex gap-6">
          <Link href="/about" className="hover:text-honey-600 transition-colors">
            {t('footer.about')}
          </Link>
          <Link href="/privacy-policy" className="hover:text-honey-600 transition-colors">
            {t('footer.privacy')}
          </Link>
          <Link href="/terms-of-service" className="hover:text-honey-600 transition-colors">
            {t('footer.terms')}
          </Link>
        </nav>
      </div>
      <div className="sr-only">
        {/* SEO 文字强化本地处理卖点 */}
        {t('sellingPoints.localProcessing')} · {t('sellingPoints.noUpload')}
      </div>
    </footer>
  );
}
