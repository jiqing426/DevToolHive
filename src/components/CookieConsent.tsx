import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';

const STORAGE_KEY = 'devtoolhive-cookie-consent';

/**
 * GDPR Cookie 弹窗（Consent Mode v2）：
 * 纯客户端渲染，SSR 不输出 DOM；用户操作后 localStorage 永久隐藏。
 */
export default function CookieConsent() {
  const { t } = useTranslation('common');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setVisible(true);
      }
    } catch {
      // localStorage 不可用时降级为不弹
    }
  }, []);

  const decide = (accepted: boolean) => {
    try {
      localStorage.setItem(STORAGE_KEY, accepted ? 'accepted' : 'rejected');
    } catch {
      // 忽略写入失败
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col desktop:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-600 text-center desktop:text-left">
          {t('cookie.message')}
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={() => decide(false)}
            className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            {t('cookie.reject')}
          </button>
          <button
            onClick={() => decide(true)}
            className="px-4 py-2 text-sm rounded-lg bg-honey-500 text-white hover:bg-honey-600 transition-colors"
          >
            {t('cookie.accept')}
          </button>
        </div>
      </div>
    </div>
  );
}
