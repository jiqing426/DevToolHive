export interface UtmParams {
  url: string;
  source: string;
  medium: string;
  campaign: string;
  term: string;
  content: string;
}

/** 将表单参数拼接为完整 UTM 跟踪链接 */
export function buildUtmUrl(params: UtmParams): string {
  const url = params.url.trim();
  if (!url) return '';

  const entries = (
    [
      ['utm_source', params.source],
      ['utm_medium', params.medium],
      ['utm_campaign', params.campaign],
      ['utm_term', params.term],
      ['utm_content', params.content],
    ] as Array<[string, string]>
  ).filter(([, v]) => v.trim() !== '');

  if (entries.length === 0) return url;
  const query = entries.map(([k, v]) => `${k}=${encodeURIComponent(v.trim())}`).join('&');
  const sep = url.includes('?') ? (url.endsWith('?') || url.endsWith('&') ? '' : '&') : '?';
  return `${url}${sep}${query}`;
}
