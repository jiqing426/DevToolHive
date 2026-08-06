import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import {
  FileJson,
  Palette,
  Tag,
  Type,
  Clock,
  Hash,
  Paintbrush,
  Link2,
  ImageDown,
  ScanText,
  type LucideIcon,
} from 'lucide-react';
import { toolHref } from '@/lib/site';

interface ToolCardProps {
  slug: string;
  locale: string;
}

const ICONS: Record<string, LucideIcon> = {
  'json-yaml-converter': FileJson,
  'pixel-art-palette-generator': Palette,
  'meta-tag-generator': Tag,
  'case-converter': Type,
  'timestamp-converter': Clock,
  'hash-generator': Hash,
  'color-converter': Paintbrush,
  'utm-link-generator': Link2,
  'image-compressor': ImageDown,
  'image-ocr': ScanText,
};

export default function ToolCard({ slug, locale }: ToolCardProps) {
  const { t } = useTranslation('tools');
  const Icon = ICONS[slug] || FileJson;
  return (
    <Link
      href={toolHref(slug, locale)}
      className="group block p-5 bg-white rounded-xl border border-gray-200 hover:border-honey-300 hover:shadow-md transition-all"
    >
      <div className="flex items-start gap-3">
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-honey-100 text-honey-600 group-hover:bg-honey-500 group-hover:text-white transition-colors shrink-0">
          <Icon size={20} />
        </span>
        <div className="min-w-0">
          <div className="font-semibold text-gray-900 group-hover:text-honey-700">
            {t(`${slug}.name`)}
          </div>
          <div className="text-sm text-gray-500 mt-0.5">{t(`${slug}.desc`)}</div>
        </div>
      </div>
    </Link>
  );
}
