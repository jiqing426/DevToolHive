export interface MetaInput {
  title: string;
  description: string;
  url: string;
  image: string;
  siteName: string;
  twitterSite: string;
}

function esc(value: string): string {
  return value.replace(/"/g, '&quot;');
}

/** 生成标准 SEO meta + Open Graph + Twitter Card HTML */
export function generateMetaHtml(input: MetaInput): string {
  const lines: string[] = [];
  if (input.title) lines.push(`<title>${input.title}</title>`);
  if (input.description) lines.push(`<meta name="description" content="${esc(input.description)}" />`);

  // Open Graph
  if (input.title) lines.push(`<meta property="og:title" content="${esc(input.title)}" />`);
  if (input.description) lines.push(`<meta property="og:description" content="${esc(input.description)}" />`);
  if (input.url) lines.push(`<meta property="og:url" content="${esc(input.url)}" />`);
  if (input.image) lines.push(`<meta property="og:image" content="${esc(input.image)}" />`);
  if (input.siteName) lines.push(`<meta property="og:site_name" content="${esc(input.siteName)}" />`);
  lines.push(`<meta property="og:type" content="website" />`);

  // Twitter Card
  lines.push(`<meta name="twitter:card" content="summary_large_image" />`);
  if (input.title) lines.push(`<meta name="twitter:title" content="${esc(input.title)}" />`);
  if (input.description) lines.push(`<meta name="twitter:description" content="${esc(input.description)}" />`);
  if (input.image) lines.push(`<meta name="twitter:image" content="${esc(input.image)}" />`);
  if (input.twitterSite) lines.push(`<meta name="twitter:site" content="${esc(input.twitterSite)}" />`);

  return lines.join('\n');
}
