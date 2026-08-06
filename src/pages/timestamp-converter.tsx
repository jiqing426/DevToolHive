import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Clock } from 'lucide-react';
import Seo from '@/components/Seo';
import ToolLayout from '@/components/layout/ToolLayout';
import CopyButton from '@/components/CopyButton';
import {
  timestampToDate,
  dateToTimestamp,
  nowTimestamp,
  type TimestampUnit,
} from '@/lib/tools/timestampConverter';

export default function TimestampConverterPage() {
  const { t } = useTranslation('timestamp');
  const [ts, setTs] = useState('');
  const [unit, setUnit] = useState<TimestampUnit>('s');
  const [date, setDate] = useState('');

  const tsNum = Number(ts);
  const result = ts && Number.isFinite(tsNum) ? timestampToDate(tsNum, unit) : null;
  const dateTs = date ? dateToTimestamp(date, unit) : null;

  return (
    <ToolLayout
      title={t('title')}
      description={t('description')}
      howToUse={<p className="text-gray-600 text-sm leading-relaxed">{t('howToUse')}</p>}
    >
      <Seo title={t('seo.title')} description={t('seo.description')} path="/timestamp-converter" />

      <section className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Clock size={18} className="text-honey-600" />
          <h2 className="font-semibold text-gray-900">{t('timestampPlaceholder')}</h2>
        </div>
        <div className="flex flex-col desktop:flex-row gap-3">
          <input
            value={ts}
            onChange={(e) => setTs(e.target.value)}
            inputMode="numeric"
            placeholder={t('timestampPlaceholder')}
            className="flex-1 px-3 py-2 rounded-lg border border-gray-300 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-honey-400"
          />
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value as TimestampUnit)}
            className="px-3 py-2 rounded-lg border border-gray-300 text-sm bg-white"
          >
            <option value="s">{t('seconds')}</option>
            <option value="ms">{t('milliseconds')}</option>
          </select>
          <button
            onClick={() => setTs(String(nowTimestamp(unit)))}
            className="px-4 py-2 rounded-lg bg-honey-500 text-white text-sm hover:bg-honey-600"
          >
            Now
          </button>
        </div>
        {result?.valid && (
          <div className="mt-4 space-y-2">
            {[
              { label: t('iso'), value: result.iso },
              { label: t('local'), value: result.local },
            ].map((row) => (
              <div key={row.label} className="flex items-center gap-2">
                <span className="text-sm text-gray-500 w-20 shrink-0">{row.label}</span>
                <code className="flex-1 text-sm font-mono text-gray-800 break-all">{row.value}</code>
                <CopyButton value={row.value} />
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="font-semibold text-gray-900 mb-3">{t('pickDate')}</h2>
        <div className="flex flex-col desktop:flex-row gap-3 items-start desktop:items-center">
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 text-sm"
          />
          {dateTs !== null && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">{t('resultTimestamp')}</span>
              <code className="text-sm font-mono text-gray-800">{dateTs}</code>
              <CopyButton value={String(dateTs)} />
            </div>
          )}
        </div>
      </section>
    </ToolLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'en', ['common', 'tools', 'timestamp'])),
  },
});
