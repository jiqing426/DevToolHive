import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  value: string;
  label?: string;
}

export default function CopyButton({ value, label }: CopyButtonProps) {
  const { t } = useTranslation('common');
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // 剪贴板不可用时静默
    }
  };

  return (
    <button
      onClick={copy}
      disabled={!value}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm bg-honey-500 text-white hover:bg-honey-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
      {label ?? (copied ? t('actions.copied') : t('actions.copy'))}
    </button>
  );
}
