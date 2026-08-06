import { GetServerSideProps } from 'next';
import { useMemo, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { RotateCcw } from 'lucide-react';
import Seo from '@/components/Seo';
import ToolLayout from '@/components/layout/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { generateMetaHtml, type MetaInput } from '@/lib/tools/metaTag';

const EMPTY: MetaInput = {
  title: '',
  description: '',
  url: '',
  image: '',
  siteName: '',
  twitterSite: '',
};

export default function MetaTagGeneratorPage() {
  const { t } = useTranslation('meta-tag');
  const [form, setForm] = useState<MetaInput>({ ...EMPTY });
  const html = useMemo(() => generateMetaHtml(form), [form]);
  const set = (k: keyof MetaInput, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const fields: Array<{ key: keyof MetaInput; labelKey: string }> = [
    { key: 'title', labelKey: 'pageTitle' },
    { key: 'description', labelKey: 'pageDescription' },
    { key: 'url', labelKey: 'url' },
    { key: 'image', labelKey: 'image' },
    { key: 'siteName', labelKey: 'siteName' },
    { key: 'twitterSite', labelKey: 'twitterSite' },
  ];

  return (
    <ToolLayout
      title={t('title')}
      description={t('description')}
      howToUse={<p className="text-gray-600 text-sm leading-relaxed">{t('howToUse')}</p>}
    >
      <Seo title={t('seo.title')} description={t('seo.description')} path="/meta-tag-generator" />
      <div className="grid grid-cols-1 desktop:grid-cols-2 gap-6">
        <div className="space-y-3">
          {fields.map((f) => (
            <div key={f.key}>
              <label className="block text-sm text-gray-600 mb-1">{t(f.labelKey)}</label>
              <input
                value={form[f.key]}
                onChange={(e) => set(f.key, e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400"
              />
            </div>
          ))}
        </div>

        <div className="space-y-4">
          {/* Facebook 预览 */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">{t('previewFacebook')}</h3>
            <div className="rounded-lg border border-gray-200 overflow-hidden bg-white">
              <div className="aspect-video bg-gray-100 flex items-center justify-center">
                {form.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={form.image} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-300 text-sm">no image</span>
                )}
              </div>
              <div className="p-3">
                <div className="text-xs text-gray-400 uppercase truncate">
                  {form.url || 'example.com'}
                </div>
                <div className="font-semibold text-gray-900 text-sm mt-0.5 line-clamp-2">
                  {form.title || 'Your title here'}
                </div>
                <div className="text-xs text-gray-500 line-clamp-2 mt-1">
                  {form.description || 'Your description here'}
                </div>
              </div>
            </div>
          </div>

          {/* Twitter 预览 */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">{t('previewTwitter')}</h3>
            <div className="rounded-xl border border-gray-200 overflow-hidden bg-white">
              <div className="aspect-video bg-gray-100 flex items-center justify-center">
                {form.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={form.image} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-300 text-sm">no image</span>
                )}
              </div>
              <div className="p-3">
                <div className="text-xs text-gray-400">{form.url || 'example.com'}</div>
                <div className="font-semibold text-gray-900 text-sm line-clamp-2">
                  {form.title || 'Your title here'}
                </div>
                <div className="text-xs text-gray-500 line-clamp-2 mt-1">
                  {form.description || 'Your description here'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-900">{t('outputHtml')}</h3>
          <div className="flex gap-2">
            <CopyButton value={html} label={t('copyHtml')} />
            <button
              onClick={() => setForm({ ...EMPTY })}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm border border-gray-300 text-gray-700 hover:border-honey-300"
            >
              <RotateCcw size={14} /> {t('reset')}
            </button>
          </div>
        </div>
        <pre className="p-3 rounded-lg bg-gray-50 border border-gray-200 font-mono text-xs overflow-x-auto whitespace-pre-wrap break-words text-gray-800">
          {html || '—'}
        </pre>
      </div>
    </ToolLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'en', ['common', 'tools', 'meta-tag'])),
  },
});
