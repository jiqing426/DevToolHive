import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { ShieldCheck, CloudOff, Gift, UserX } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import ToolCard from '@/components/ToolCard';
import AdUnit from '@/components/ads/AdUnit';
import { TOOLS } from '@/lib/site';

export default function HomePage() {
  const { t } = useTranslation(['common', 'home']);
  const router = useRouter();
  const locale = router.locale || 'en';

  const sellingPoints = [
    { icon: ShieldCheck, key: 'localProcessing' },
    { icon: CloudOff, key: 'noUpload' },
    { icon: Gift, key: 'freeForever' },
    { icon: UserX, key: 'noSignup' },
  ];

  return (
    <Layout>
      <Seo title={t('home:seo.title')} description={t('home:seo.description')} path="/" />

      {/* Hero */}
      <section className="bg-gradient-to-b from-white to-gray-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-16 desktop:py-20 text-center">
          <h1 className="text-3xl desktop:text-5xl font-extrabold text-gray-900 tracking-tight">
            {t('home:hero.title')}
          </h1>
          <p className="mt-4 text-gray-600 text-base desktop:text-lg max-w-2xl mx-auto">
            {t('home:hero.subtitle')}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {sellingPoints.map(({ icon: Icon, key }) => (
              <span
                key={key}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-honey-50 text-honey-700 text-sm border border-honey-200"
              >
                <Icon size={14} /> {t(`common:sellingPoints.${key}`)}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 工具网格 + 侧边广告 C */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex gap-8">
          <div className="flex-1 min-w-0">
            <div className="grid grid-cols-1 desktop:grid-cols-2 gap-4">
              {TOOLS.map((tool) => (
                <ToolCard key={tool.slug} slug={tool.slug} locale={locale} />
              ))}
            </div>
            <div className="mt-6">
              <AdUnit slot="home-middle" />
            </div>
          </div>
          <aside className="hidden desktop:block w-[300px] shrink-0">
            <AdUnit slot="sidebar-sticky" />
          </aside>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            {t('home:howItWorks.title')}
          </h2>
          <div className="grid grid-cols-1 desktop:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="text-center">
                <div className="w-10 h-10 mx-auto rounded-full bg-honey-500 text-white flex items-center justify-center font-bold mb-3">
                  {n}
                </div>
                <div className="font-semibold text-gray-900">
                  {t(`home:howItWorks.step${n}Title`)}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {t(`home:howItWorks.step${n}Desc`)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 底部广告 B */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <AdUnit slot="page-bottom" />
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'en', ['common', 'home', 'tools'])),
  },
});
