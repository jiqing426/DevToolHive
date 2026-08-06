import { GetServerSideProps } from 'next';
import { useMemo, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Seo from '@/components/Seo';
import ToolLayout from '@/components/layout/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { convertColor } from '@/lib/tools/colorConverter';

export default function ColorConverterPage() {
  const { t } = useTranslation('color-converter');
  const [input, setInput] = useState('#f59e0b');
  const result = useMemo(() => convertColor(input), [input]);

  return (
    <ToolLayout
      title={t('title')}
      description={t('description')}
      howToUse={<p className="text-gray-600 text-sm leading-relaxed">{t('howToUse')}</p>}
    >
      <Seo title={t('seo.title')} description={t('seo.description')} path="/color-converter" />
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={t('inputPlaceholder')}
        className="w-full px-3 py-2 rounded-lg border border-gray-300 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-honey-400"
      />
      {result.valid && (
        <div className="mt-4 flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-lg border border-gray-200 shrink-0"
            style={{ backgroundColor: result.hex }}
          />
          <div className="space-y-2 flex-1 min-w-0">
            {(['hex', 'rgb', 'hsl'] as const).map((fmt) => (
              <div key={fmt} className="flex items-center gap-2">
                <span className="text-sm text-gray-500 w-12 uppercase shrink-0">{fmt}</span>
                <code className="flex-1 text-sm font-mono text-gray-800 break-all">
                  {result[fmt]}
                </code>
                <CopyButton value={result[fmt]} />
              </div>
            ))}
          </div>
        </div>
      )}
    </ToolLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'en', ['common', 'tools', 'color-converter'])),
  },
});
