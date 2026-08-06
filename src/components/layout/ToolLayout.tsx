import { ReactNode } from 'react';
import Layout from './Layout';
import AdUnit from '@/components/ads/AdUnit';

interface ToolLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  howToUse: ReactNode;
}

/** 工具页统一 SSR 模板：导航 → 标题简介 → [工具交互区 | 广告 C] → 广告 A → How-To-Use → 广告 B → Footer */
export default function ToolLayout({ title, description, children, howToUse }: ToolLayoutProps) {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          <div className="flex-1 min-w-0">
            <header className="mb-6">
              <h1 className="text-2xl desktop:text-3xl font-extrabold text-gray-900">{title}</h1>
              <p className="mt-2 text-gray-600">{description}</p>
            </header>
            <section className="bg-white rounded-xl border border-gray-200 p-4 desktop:p-6 shadow-sm">
              {children}
            </section>
            <div className="mt-6">
              <AdUnit slot="below-tool" />
            </div>
            <section className="mt-8">
              <h2 className="text-lg font-bold text-gray-900 mb-2">How to Use</h2>
              {howToUse}
            </section>
          </div>
          <aside className="hidden desktop:block w-[300px] shrink-0">
            <AdUnit slot="sidebar-sticky" />
          </aside>
        </div>
        <div className="mt-10">
          <AdUnit slot="page-bottom" />
        </div>
      </div>
    </Layout>
  );
}
