import { ReactNode } from 'react';
import Layout from './Layout';
import AdUnit from '@/components/ads/AdUnit';

interface ContentLayoutProps {
  title: string;
  updated?: string;
  children: ReactNode;
}

/** 内容页统一布局：导航 → 标题 → [正文 | 广告 C] → 广告 B → Footer */
export default function ContentLayout({ title, updated, children }: ContentLayoutProps) {
  return (
    <Layout>
      <article className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex gap-8">
          <div className="flex-1 min-w-0 max-w-3xl">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{title}</h1>
            {updated && <p className="text-sm text-gray-500 mb-6">{updated}</p>}
            <div className="space-y-4">{children}</div>
          </div>
          <aside className="hidden desktop:block w-[300px] shrink-0">
            <AdUnit slot="sidebar-sticky" />
          </aside>
        </div>
        <div className="mt-10">
          <AdUnit slot="page-bottom" />
        </div>
      </article>
    </Layout>
  );
}
