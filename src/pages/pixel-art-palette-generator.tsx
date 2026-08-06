import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Plus, Trash2, ArrowUp, ArrowDown, Download } from 'lucide-react';
import Seo from '@/components/Seo';
import ToolLayout from '@/components/layout/ToolLayout';
import CopyButton from '@/components/CopyButton';
import {
  PALETTE_PRESETS,
  moveColor,
  deleteColor,
  exportHexText,
  exportCssVars,
  exportPalettePng,
} from '@/lib/tools/palette';

export default function PixelPalettePage() {
  const { t } = useTranslation('pixel-palette');
  const [colors, setColors] = useState<string[]>(['#000000', '#ffffff', '#f59e0b']);
  const [picker, setPicker] = useState('#f59e0b');
  const [selected, setSelected] = useState<number>(-1);

  const add = () => {
    setColors((c) => [...c, picker]);
    setSelected(colors.length);
  };
  const applyPreset = (id: string) => {
    const p = PALETTE_PRESETS.find((x) => x.id === id);
    if (p) {
      setColors(p.colors);
      setSelected(-1);
    }
  };
  const exportPng = () => {
    const url = exportPalettePng(colors);
    if (!url) return;
    const a = document.createElement('a');
    a.href = url;
    a.download = 'palette.png';
    a.click();
  };

  return (
    <ToolLayout
      title={t('title')}
      description={t('description')}
      howToUse={<p className="text-gray-600 text-sm leading-relaxed">{t('howToUse')}</p>}
    >
      <Seo title={t('seo.title')} description={t('seo.description')} path="/pixel-art-palette-generator" />

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <input
          type="color"
          value={picker}
          onChange={(e) => setPicker(e.target.value)}
          className="w-12 h-10 rounded cursor-pointer border border-gray-300 bg-white"
          aria-label={t('add')}
        />
        <button
          onClick={add}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-honey-500 text-white text-sm hover:bg-honey-600"
        >
          <Plus size={14} /> {t('add')}
        </button>
        <select
          onChange={(e) => applyPreset(e.target.value)}
          defaultValue=""
          className="px-3 py-2 rounded-lg border border-gray-300 text-sm bg-white"
        >
          <option value="">{t('presetPlaceholder')}</option>
          {PALETTE_PRESETS.map((p) => (
            <option key={p.id} value={p.id}>
              {t(`presets.${p.id}`)}
            </option>
          ))}
        </select>
      </div>

      {colors.length === 0 ? (
        <p className="text-sm text-gray-400">{t('empty')}</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {colors.map((c, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              style={{ backgroundColor: c }}
              className={`w-12 h-12 rounded-lg border-2 transition-all ${
                selected === i ? 'border-honey-500 scale-105' : 'border-gray-200'
              }`}
              title={c}
              aria-label={c}
            />
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2 mt-4">
        <button
          onClick={() => setColors((c) => moveColor(c, selected, -1))}
          disabled={selected < 1}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm border border-gray-300 text-gray-700 hover:border-honey-300 disabled:opacity-40"
        >
          <ArrowUp size={14} /> {t('moveUp')}
        </button>
        <button
          onClick={() => setColors((c) => moveColor(c, selected, 1))}
          disabled={selected < 0 || selected >= colors.length - 1}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm border border-gray-300 text-gray-700 hover:border-honey-300 disabled:opacity-40"
        >
          <ArrowDown size={14} /> {t('moveDown')}
        </button>
        <button
          onClick={() => {
            setColors((c) => deleteColor(c, selected));
            setSelected(-1);
          }}
          disabled={selected < 0}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm border border-gray-300 text-gray-700 hover:border-red-300 hover:text-red-600 disabled:opacity-40"
        >
          <Trash2 size={14} /> {t('delete')}
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <button
          onClick={exportPng}
          disabled={!colors.length}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm bg-honey-500 text-white hover:bg-honey-600 disabled:opacity-40"
        >
          <Download size={14} /> {t('exportPng')}
        </button>
        <CopyButton value={exportHexText(colors)} label={t('copyHex')} />
        <CopyButton value={exportCssVars(colors)} label={t('copyCss')} />
      </div>
    </ToolLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'en', ['common', 'tools', 'pixel-palette'])),
  },
});
