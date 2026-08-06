import { useEffect, useState } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

type SlotName = 'below-tool' | 'page-bottom' | 'sidebar-sticky' | 'home-middle';

const SLOT_CONFIG: Record<SlotName, { id: string; desktopOnly?: boolean }> = {
  'below-tool': { id: 'ads-unit-below-tool' },
  'page-bottom': { id: 'ads-unit-page-bottom' },
  'sidebar-sticky': { id: 'ads-unit-sidebar-sticky', desktopOnly: true },
  'home-middle': { id: 'ads-unit-home-middle' },
};

interface AdUnitProps {
  slot: SlotName;
  className?: string;
}

/**
 * SSR 广告占位组件：服务端输出固定高度占位 DIV，
 * 客户端按断点决定是否挂载 AdSense。
 * 侧边广告 C：移动端直接不渲染 DOM（非 visibility:hidden），杜绝 CLS。
 */
export default function AdUnit({ slot, className = '' }: AdUnitProps) {
  const config = SLOT_CONFIG[slot];
  const [mounted, setMounted] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  useEffect(() => {
    setMounted(true);
  }, []);

  // 侧边广告：仅桌面端渲染，SSR 与移动端不输出 DOM
  if (config.desktopOnly && !(mounted && isDesktop)) {
    return null;
  }

  return (
    <div
      className={`ads-slot w-full ${config.desktopOnly ? 'sticky top-24' : ''} ${className}`}
      data-ad-slot={config.id}
      aria-hidden="true"
    >
      {/* 开发占位，上线挂载 AdSense 后无需改代码 */}
      <div className="flex items-center justify-center w-full h-[90px] bg-gray-50 border border-dashed border-gray-200 rounded-lg text-xs text-gray-400">
        Ad Slot · {config.id}
      </div>
    </div>
  );
}
