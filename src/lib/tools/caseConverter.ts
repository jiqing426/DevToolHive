export type CaseMode =
  | 'upper'
  | 'lower'
  | 'title'
  | 'camel'
  | 'pascal'
  | 'snake'
  | 'kebab'
  | 'constant';

const cap = (w: string): string => w.charAt(0).toUpperCase() + w.slice(1);

/** 将任意文本按空格/下划线/连字符/驼峰边界拆分为单词 */
export function splitWords(text: string): string[] {
  return text
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_\-\s]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

export function convertCase(text: string, mode: CaseMode): string {
  switch (mode) {
    case 'upper':
      return text.toUpperCase();
    case 'lower':
      return text.toLowerCase();
    case 'title':
      return text.replace(/\w\S*/g, (w) => cap(w.toLowerCase()));
    case 'camel': {
      const words = splitWords(text);
      return words.map((w, i) => (i === 0 ? w.toLowerCase() : cap(w.toLowerCase()))).join('');
    }
    case 'pascal': {
      return splitWords(text)
        .map((w) => cap(w.toLowerCase()))
        .join('');
    }
    case 'snake':
      return splitWords(text)
        .map((w) => w.toLowerCase())
        .join('_');
    case 'kebab':
      return splitWords(text)
        .map((w) => w.toLowerCase())
        .join('-');
    case 'constant':
      return splitWords(text)
        .map((w) => w.toUpperCase())
        .join('_');
    default:
      return text;
  }
}
