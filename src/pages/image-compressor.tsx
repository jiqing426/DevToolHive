import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Upload, Download } from 'lucide-react';
import Seo from '@/components/Seo';
import ToolLayout from '@/components/layout/ToolLayout';
import {
  compressImage,
  formatBytes,
  getReduction,
  type CompressResult,
} from '@/lib/tools/imageCompressor';

export default function ImageCompressorPage() {
  const { t } = useTranslation('image-compressor');
  const [file, setFile] = useState<File | null>(null);
  const [origUrl, setOrigUrl] = useState('');
  const [quality, setQuality] = useState(0.8);
  const [result, setResult] = useState<CompressResult | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const onFile = (f?: File) => {
    if (!f) return;
    setFile(f);
    setOrigUrl(URL.createObjectURL(f));
    setResult(null);
    setErr('');
  };

  useEffect(() => {
    if (!file) return;
    let active = true;
    setBusy(true);
    setErr('');
    compressImage(file, quality, file.type || 'image/jpeg')
      .then((r) => {
        if (active) setResult(r);
      })
      .catch((e) => {
        if (active) setErr((e as Error).message);
      })
      .finally(() => {
        if (active) setBusy(false);
      });
    return () => {
      active = false;
    };
  }, [file, quality]);

  const reduction = file && result ? getReduction(file.size, result.size) : 0;
  const download = () => {
    if (!result || !file) return;
    const ext = file.name.split('.').pop() || 'png';
    const a = document.createElement('a');
    a.href = result.url;
    a.download = `compressed.${ext}`;
    a.click();
  };

  return (
    <ToolLayout
      title={t('title')}
      description={t('description')}
      howToUse={<p className="text-gray-600 text-sm leading-relaxed">{t('howToUse')}</p>}
    >
      <Seo title={t('seo.title')} description={t('seo.description')} path="/image-compressor" />

      <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-honey-400 text-gray-500">
        <Upload size={24} />
        <span className="text-sm mt-2">{t('uploadPlaceholder')}</span>
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
          onChange={(e) => onFile(e.target.files?.[0])}
        />
      </label>

      {origUrl && (
        <div className="mt-4 grid grid-cols-1 desktop:grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-600 mb-1">{t('originalPreview')}</div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={origUrl} alt="original" className="max-h-40 rounded border border-gray-200" />
            <div className="text-xs text-gray-500 mt-1">
              {t('originalSize')}: {file ? formatBytes(file.size) : '—'}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-1">{t('compressedPreview')}</div>
            {result && (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={result.url} alt="compressed" className="max-h-40 rounded border border-gray-200" />
                <div className="text-xs text-gray-500 mt-1">
                  {t('compressedSize')}: {formatBytes(result.size)} · {t('reduction')}: {reduction}%
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <div className="mt-4 flex items-center gap-3">
        <span className="text-sm text-gray-600 w-16">{t('quality')}</span>
        <input
          type="range"
          min={0.1}
          max={1}
          step={0.1}
          value={quality}
          onChange={(e) => setQuality(Number(e.target.value))}
          className="flex-1"
        />
        <span className="text-sm font-mono w-10">{quality.toFixed(1)}</span>
        <button
          onClick={download}
          disabled={!result}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm bg-honey-500 text-white hover:bg-honey-600 disabled:opacity-40"
        >
          <Download size={14} /> {t('download')}
        </button>
      </div>

      {busy && <p className="text-sm text-gray-400 mt-2">Compressing...</p>}
      {err && <p className="text-sm text-red-600 mt-2">{err}</p>}
    </ToolLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'en', ['common', 'tools', 'image-compressor'])),
  },
});
