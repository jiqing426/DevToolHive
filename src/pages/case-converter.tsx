import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Seo from '@/components/Seo';
import ToolLayout from '@/components/layout/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { convertCase, type CaseMode } from '@/lib/tools/caseConverter';

const MODES: CaseMode[] = [
  'upper',
  'lower',
  'title',
  'camel',
  'pascal',
  'snake',
  'kebab',
  'constant',
];

export default function CaseConverterPage() {
  const { t } = useTranslation('case-converter');
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<CaseMode>('camel');
  const output = input ? convertCase(input, mode) : '';

  return (
    <ToolLayout
      title={t('title')}
      description={t('description')}
      howToUse={<p className="text-gray-600 text-sm leading-relaxed">{t('howToUse')}</p>}
    >
      <Seo title={t('seo.title')} description={t('seo.description')} path="/case-converter" />
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={t('inputPlaceholder')}
        className="w-full h-40 p-3 rounded-lg border border-gray-300 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-honey-400 focus:border-honey-400"
      />
      <div className="flex flex-wrap gap-2 mt-4">
        {MODES.map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${
              mode === m
                ? 'bg-honey-500 text-white border-honey-500'
                : 'bg-white text-gray-700 border-gray-300 hover:border-honey-300'
            }`}
          >
            {t(`modes.${m}`)}
          </button>
        ))}
      </div>
      <div className="mt-4 flex items-start gap-2">
        <textarea
          value={output}
          readOnly
          className="flex-1 h-40 p-3 rounded-lg border border-gray-200 bg-gray-50 font-mono text-sm"
        />
        <CopyButton value={output} />
      </div>
    </ToolLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'en', ['common', 'tools', 'case-converter'])),
  },
});
