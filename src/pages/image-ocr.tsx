import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Upload, ScanText } from 'lucide-react';
import Seo from '@/components/Seo';
import ToolLayout from '@/components/layout/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { runOcr, OCR_LANGUAGES } from '@/lib/tools/imageOcr';

export default function ImageOcrPage() {
  const { t } = useTranslation('image-ocr');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [lang, setLang] = useState('eng');
  const [text, setText] = useState('');
  const [progress, setProgress] = useState(0);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const onFile = (f?: File) => {
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setText('');
    setErr('');
  };

  const recognize = async () => {
    if (!file) return;
    setBusy(true);
    setText('');
    setProgress(0);
    setErr('');
    try {
      const r = await runOcr(file, lang, (p) => setProgress(p));
      setText(r);
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <ToolLayout
      title={t('title')}
      description={t('description')}
      howToUse={<p className="text-gray-600 text-sm leading-relaxed">{t('howToUse')}</p>}
    >
      <Seo title={t('seo.title')} description={t('seo.description')} path="/image-ocr" />

      <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-honey-400 text-gray-500">
        <Upload size={24} />
        <span className="text-sm mt-2">{t('uploadPlaceholder')}</span>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => onFile(e.target.files?.[0])}
        />
      </label>

      {preview && (
        <div className="mt-4 flex flex-col desktop:flex-row items-start gap-4">
          <div className="w-full desktop:w-56 shrink-0">
            <div className="h-40 desktop:h-48 rounded-lg border border-gray-200 bg-gray-50 overflow-hidden flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview} alt="preview" className="max-w-full max-h-full object-contain" />
            </div>
          </div>
          <div className="flex-1 w-full min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm text-gray-600">{t('language')}</span>
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-gray-300 text-sm bg-white"
              >
                {OCR_LANGUAGES.map((l) => (
                  <option key={l.value} value={l.value}>
                    {t(`languages.${l.labelKey}`)}
                  </option>
                ))}
              </select>
              <button
                onClick={recognize}
                disabled={!file || busy}
                className="inline-flex items-center gap-1 px-4 py-1.5 rounded-lg bg-honey-500 text-white text-sm hover:bg-honey-600 disabled:opacity-40"
              >
                <ScanText size={14} /> {t('recognize')}
              </button>
            </div>
            {busy && (
              <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                <div className="bg-honey-500 h-2 rounded-full transition-all" style={{ width: `${Math.round(progress * 100)}%` }} />
              </div>
            )}
            <div className="text-sm text-gray-600 mb-1">{t('result')}</div>
            <div className="flex items-start gap-2">
              <textarea
                value={text}
                readOnly
                placeholder={busy ? t('recognizing') : ''}
                className="flex-1 h-40 p-3 rounded-lg border border-gray-200 bg-gray-50 font-mono text-sm"
              />
              <CopyButton value={text} />
            </div>
            {err && <p className="text-sm text-red-600 mt-2">{err}</p>}
          </div>
        </div>
      )}
    </ToolLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'en', ['common', 'tools', 'image-ocr'])),
  },
});
