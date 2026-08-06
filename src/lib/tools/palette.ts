export interface PalettePreset {
  id: string;
  name: string;
  colors: string[];
}

/** 经典 8-bit / 16-bit 复古像素配色预设 */
export const PALETTE_PRESETS: PalettePreset[] = [
  {
    id: 'nes',
    name: 'NES',
    colors: [
      '#000000',
      '#fcfcfc',
      '#7c7c7c',
      '#bcbcbc',
      '#f83800',
      '#fc9838',
      '#f0bc3c',
      '#80d010',
      '#00b800',
      '#00a844',
      '#008888',
      '#3cbcfc',
      '#0058f8',
      '#0000bc',
      '#9444e4',
      '#d82888',
    ],
  },
  {
    id: 'gameboy',
    name: 'Game Boy',
    colors: ['#0f380f', '#306230', '#8bac0f', '#9bbc0f'],
  },
  {
    id: 'pico8',
    name: 'Pico-8',
    colors: [
      '#000000',
      '#1d2b53',
      '#7e2553',
      '#008751',
      '#ab5236',
      '#5f574f',
      '#c2c3c7',
      '#fff1e8',
      '#ff004d',
      '#ffa300',
      '#ffec27',
      '#00e436',
      '#29adff',
      '#83769c',
      '#ff77a8',
      '#ffccaa',
    ],
  },
];

/** 将指定位置的色块上移(-1)或下移(1) */
export function moveColor(colors: string[], index: number, dir: -1 | 1): string[] {
  const target = index + dir;
  if (index < 0 || target < 0 || target >= colors.length) return colors;
  const next = [...colors];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

/** 删除指定位置的色块 */
export function deleteColor(colors: string[], index: number): string[] {
  if (index < 0 || index >= colors.length) return colors;
  return colors.filter((_, i) => i !== index);
}

/** 导出为 HEX 文本（每行一个色值） */
export function exportHexText(colors: string[]): string {
  return colors.join('\n');
}

/** 导出为 CSS 变量文本 */
export function exportCssVars(colors: string[]): string {
  return `:root {\n${colors
    .map((c, i) => `  --color-${i + 1}: ${c};`)
    .join('\n')}\n}`;
}

/**
 * 用 Canvas 绘制色块网格并导出为 PNG data URL。
 * 仅在浏览器环境调用（点击导出时执行）。
 */
export function exportPalettePng(colors: string[], cellSize = 48): string {
  const n = colors.length;
  if (n === 0) return '';
  const cols = Math.max(1, Math.ceil(Math.sqrt(n)));
  const rows = Math.ceil(n / cols);
  const canvas = document.createElement('canvas');
  canvas.width = cols * cellSize;
  canvas.height = rows * cellSize;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  colors.forEach((color, i) => {
    const x = (i % cols) * cellSize;
    const y = Math.floor(i / cols) * cellSize;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, cellSize, cellSize);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, cellSize, cellSize);
  });
  return canvas.toDataURL('image/png');
}
