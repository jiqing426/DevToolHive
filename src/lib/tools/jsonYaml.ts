import yaml from 'js-yaml';
import { diffLines } from 'diff';

export interface ConvertResult {
  output: string;
  error: string | null;
}

/** 格式化 JSON */
export function formatJson(input: string): ConvertResult {
  try {
    const obj = JSON.parse(input);
    return { output: JSON.stringify(obj, null, 2), error: null };
  } catch (e) {
    return { output: '', error: (e as Error).message };
  }
}

/** 压缩 JSON */
export function minifyJson(input: string): ConvertResult {
  try {
    const obj = JSON.parse(input);
    return { output: JSON.stringify(obj), error: null };
  } catch (e) {
    return { output: '', error: (e as Error).message };
  }
}

/** JSON → YAML */
export function jsonToYaml(input: string): ConvertResult {
  try {
    const obj = JSON.parse(input);
    return { output: yaml.dump(obj), error: null };
  } catch (e) {
    return { output: '', error: (e as Error).message };
  }
}

/** YAML → JSON */
export function yamlToJson(input: string): ConvertResult {
  try {
    const obj = yaml.load(input);
    return { output: JSON.stringify(obj, null, 2), error: null };
  } catch (e) {
    return { output: '', error: (e as Error).message };
  }
}

/** 校验 JSON 语法，返回错误信息（无错返回 null） */
export function validateJson(input: string): string | null {
  try {
    JSON.parse(input);
    return null;
  } catch (e) {
    return (e as Error).message;
  }
}

/** 两段 JSON 文本逐行 Diff，返回带标记的合并文本 */
export function diffJson(a: string, b: string): string {
  const part = diffLines(a, b);
  return part
    .map((p) => {
      const sign = p.added ? '+' : p.removed ? '-' : ' ';
      return p.value
        .split('\n')
        .filter((_, i, arr) => i < arr.length - 1 || p.value.endsWith('\n') === false)
        .map((line) => `${sign} ${line}`)
        .join('\n');
    })
    .join('\n');
}

/** JSON 数组 → CSV 文本（取对象键并集作为表头） */
export function jsonToCsv(input: string): ConvertResult {
  try {
    const obj = JSON.parse(input);
    const arr = Array.isArray(obj) ? obj : [obj];
    if (arr.length === 0) return { output: '', error: null };
    const keys = Array.from(
      arr.reduce<Set<string>>((set, item) => {
        if (item && typeof item === 'object') Object.keys(item).forEach((k) => set.add(k));
        return set;
      }, new Set()),
    );
    const escape = (v: unknown): string => {
      const s = v === null || v === undefined ? '' : typeof v === 'object' ? JSON.stringify(v) : String(v);
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const header = keys.join(',');
    const rows = arr.map((item) =>
      keys.map((k) => escape((item as Record<string, unknown>)?.[k])).join(','),
    );
    return { output: [header, ...rows].join('\n'), error: null };
  } catch (e) {
    return { output: '', error: (e as Error).message };
  }
}
