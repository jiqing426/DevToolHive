import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Download } from 'lucide-react';
import Seo from '@/components/Seo';
import ToolLayout from '@/components/layout/ToolLayout';
import CopyButton from '@/components/CopyButton';
import {
  formatJson,
  minifyJson,
  jsonToYaml,
  yamlToJson,
  diffJson,
  jsonToCsv,
  type ConvertResult,
} from '@/lib/tools/jsonYaml';

export default function JsonYamlConverterPage() {
  const { t } = useTranslation('json-yaml');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [second, setSecond] = useState('');
  const [error, setError] = useState('');

  const apply = (fn: (s: string) => ConvertResult) => {
    const r = fn(input);
    setError(r.error || '');
    setOutput(r.error ? '' : r.output);
  };

  const doDiff = () => {
    setError('');
    setOutput(diffJson(input, second));
  };

  const download = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'output.txt';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <ToolLayout
      title={t('title')}
      description={t('description')}
      howToUse={<p className="text-gray-600 text-sm leading-relaxed">{t('howToUse')}</p>}
    >
      <Seo title={t('seo.title')} description={t('seo.description')} path="/json-yaml-converter" />
      <div className="grid grid-cols-1 desktop:grid-cols-2 gap-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('inputPlaceholder')}
          className="h-64 p-3 rounded-lg border border-gray-300 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-honey-400"
        />
        <textarea
          value={output}
          readOnly
          placeholder={t('outputPlaceholder')}
          className="h-64 p-3 rounded-lg border border-gray-200 bg-gray-50 font-mono text-sm"
        />
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <button onClick={() => apply(formatJson)} className="px-3 py-1.5 rounded-lg text-sm bg-honey-500 text-white hover:bg-honey-600">{t('formatJson')}</button>
        <button onClick={() => apply(minifyJson)} className="px-3 py-1.5 rounded-lg text-sm bg-honey-500 text-white hover:bg-honey-600">{t('minifyJson')}</button>
        <button onClick={() => apply(jsonToYaml)} className="px-3 py-1.5 rounded-lg text-sm bg-honey-500 text-white hover:bg-honey-600">{t('toYaml')}</button>
        <button onClick={() => apply(yamlToJson)} className="px-3 py-1.5 rounded-lg text-sm bg-honey-500 text-white hover:bg-honey-600">{t('toJson')}</button>
        <button onClick={() => apply(jsonToCsv)} className="px-3 py-1.5 rounded-lg text-sm border border-gray-300 text-gray-700 hover:border-honey-300">{t('csv')}</button>
        <button onClick={download} disabled={!output} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm border border-gray-300 text-gray-700 hover:border-honey-300 disabled:opacity-40">
          <Download size={14} /> {t('common:actions.download')}
        </button>
      </div>

      <div className="mt-4">
        <label className="block text-sm text-gray-600 mb-1">{t('secondInput')}</label>
        <div className="flex flex-col desktop:flex-row gap-2">
          <textarea
            value={second}
            onChange={(e) => setSecond(e.target.value)}
            placeholder={t('secondInput')}
            className="flex-1 h-24 p-3 rounded-lg border border-gray-300 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-honey-400"
          />
          <button onClick={doDiff} className="px-4 py-2 rounded-lg text-sm bg-honey-500 text-white hover:bg-honey-600 self-start">{t('diff')}</button>
        </div>
      </div>

      <div className="mt-4 flex items-start gap-2">
        <CopyButton value={output} />
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    </ToolLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'en', ['common', 'tools', 'json-yaml'])),
  },
});
