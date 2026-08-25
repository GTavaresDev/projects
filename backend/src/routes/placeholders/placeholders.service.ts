export interface PlaceholderParams {
  width: number;
  height: number;
  text?: string;
  bg?: string;
  color?: string;
}

export class PlaceholderService {
  public static generateSvg({
    width,
    height,
    text = `${width} × ${height}`,
    bg = '0f172a',
    color = '94a3b8',
  }: PlaceholderParams): string {
    const fontSize = Math.max(16, Math.floor(Math.min(width, height) / 12));
    return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#${bg}"/><line x1="0" y1="0" x2="${width}" y2="${height}" stroke="#${color}" stroke-width="1" stroke-opacity="0.15"/><line x1="0" y1="${height}" x2="${width}" y2="0" stroke="#${color}" stroke-width="1" stroke-opacity="0.15"/><circle cx="${width / 2}" cy="${height / 2}" r="${Math.min(width, height) / 4}" fill="none" stroke="#${color}" stroke-width="1.5" stroke-opacity="0.25"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="${fontSize}" font-weight="600" fill="#${color}">${text}</text></svg>`;
  }
}
