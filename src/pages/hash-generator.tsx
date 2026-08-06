import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Hash } from 'lucide-react';
import Seo from '@/components/Seo';
import ToolLayout from '@/components/layout/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { hashText, type HashAlgorithm } from '@/lib/tools/hashGenerator';

const ALGOS: HashAlgorithm[] = ['MD5', 'SHA-1', 'SHA-256', 'SHA-512'];

export default function HashGeneratorPage() {
  const { t } = useTranslation('hash-generator');
  const [text, setText] = useState('');
  const [algo, setAlgo] = useState<HashAlgorithm>('SHA-256');
  const [hash, setHash] = useState('');

  useEffect(() => {
    let active = true;
    if (!text) {
      setHash('');
      return;
    }
    hashText(text, algo).then((h) => {
      if (active) setHash(h);
    });
    return () => {
      active = false;
    };
  }, [text, algo]);

  return (
    <ToolLayout
      title={t('title')}
      description={t('description')}
      howToUse={<p className="text-gray-600 text-sm leading-relaxed">{t('howToUse')}</p>}
    >
      <Seo title={t('seo.title')} description={t('seo.description')} path="/hash-generator" />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t('inputPlaceholder')}
        className="w-full h-40 p-3 rounded-lg border border-gray-300 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-honey-400"
      />
      <div className="flex items-center gap-3 mt-4">
        <Hash size={18} className="text-honey-600" />
        <span className="text-sm text-gray-600">{t('algorithm')}</span>
        <div className="flex flex-wrap gap-2">
          {ALGOS.map((a) => (
            <button
              key={a}
              onClick={() => setAlgo(a)}
              className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${
                algo === a
                  ? 'bg-honey-500 text-white border-honey-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-honey-300'
              }`}
            >
              {a}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-start gap-2">
        <textarea
          value={hash}
          readOnly
          className="flex-1 h-24 p-3 rounded-lg border border-gray-200 bg-gray-50 font-mono text-sm break-all"
        />
        <CopyButton value={hash} />
      </div>
    </ToolLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'en', ['common', 'tools', 'hash-generator'])),
  },
});
