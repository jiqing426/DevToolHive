import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Seo from '@/components/Seo';
import ContentLayout from '@/components/layout/ContentLayout';

interface Section {
  heading: string;
  text: string;
}

export default function PrivacyPage() {
  const { t } = useTranslation('privacy');
  const sections = t('sections', { returnObjects: true }) as Section[];
  return (
    <ContentLayout title={t('title')} updated={t('updated')}>
      <Seo title={t('seo.title')} description={t('seo.description')} path="/privacy-policy" />
      {sections.map((s, i) => (
        <div key={i}>
          <h2 className="text-lg font-bold mb-1 text-gray-900">{s.heading}</h2>
          <p className="text-gray-700 leading-relaxed">{s.text}</p>
        </div>
      ))}
    </ContentLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'en', ['common', 'tools', 'privacy'])),
  },
});
