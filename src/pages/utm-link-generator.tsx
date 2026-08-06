import { GetServerSideProps } from 'next';
import { useMemo, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Link2 } from 'lucide-react';
import Seo from '@/components/Seo';
import ToolLayout from '@/components/layout/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { buildUtmUrl, type UtmParams } from '@/lib/tools/utmLink';

const FIELDS: Array<keyof UtmParams> = ['source', 'medium', 'campaign', 'term', 'content'];

export default function UtmLinkGeneratorPage() {
  const { t } = useTranslation('utm-link');
  const [url, setUrl] = useState('');
  const [vals, setVals] = useState<Record<string, string>>({});
  const result = useMemo(
    () => buildUtmUrl({ url, ...vals } as UtmParams),
    [url, vals],
  );
  const set = (k: string, v: string) => setVals((p) => ({ ...p, [k]: v }));

  return (
    <ToolLayout
      title={t('title')}
      description={t('description')}
      howToUse={<p className="text-gray-600 text-sm leading-relaxed">{t('howToUse')}</p>}
    >
      <Seo title={t('seo.title')} description={t('seo.description')} path="/utm-link-generator" />
      <div className="space-y-3">
        <div>
          <label className="block text-sm text-gray-600 mb-1">{t('url')}</label>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={t('urlPlaceholder')}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-honey-400"
          />
        </div>
        <div className="grid grid-cols-1 desktop:grid-cols-2 gap-3">
          {FIELDS.map((f) => (
            <div key={f}>
              <label className="block text-sm text-gray-600 mb-1">{t(f)}</label>
              <input
                value={vals[f] || ''}
                onChange={(e) => set(f, e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-honey-400"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <div className="flex items-center gap-2 mb-2">
          <Link2 size={16} className="text-honey-600" />
          <span className="text-sm font-semibold text-gray-900">{t('result')}</span>
        </div>
        <div className="flex items-start gap-2">
          <code className="flex-1 p-3 rounded-lg bg-gray-50 border border-gray-200 font-mono text-sm break-all text-gray-800">
            {result || '—'}
          </code>
          <CopyButton value={result} />
        </div>
      </div>
    </ToolLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'en', ['common', 'tools', 'utm-link'])),
  },
});
