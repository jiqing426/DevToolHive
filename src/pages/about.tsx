import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Seo from '@/components/Seo';
import ContentLayout from '@/components/layout/ContentLayout';

export default function AboutPage() {
  const { t } = useTranslation('about');
  return (
    <ContentLayout title={t('title')}>
      <Seo title={t('seo.title')} description={t('seo.description')} path="/about" />
      <p className="text-gray-700 leading-relaxed">{t('body.intro')}</p>
      <h2 className="text-xl font-bold mt-6 mb-1 text-gray-900">Mission</h2>
      <p className="text-gray-700 leading-relaxed">{t('body.mission')}</p>
      <h2 className="text-xl font-bold mt-6 mb-1 text-gray-900">Local Processing</h2>
      <p className="text-gray-700 leading-relaxed">{t('body.local')}</p>
      <h2 className="text-xl font-bold mt-6 mb-1 text-gray-900">Revenue</h2>
      <p className="text-gray-700 leading-relaxed">{t('body.revenue')}</p>
    </ContentLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'en', ['common', 'tools', 'about'])),
  },
});
