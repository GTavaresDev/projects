export interface TextAnalysisResult {
  originalText: string;
  slug: string;
  wordCount: number;
  charCount: number;
  readingTimeMinutes: number;
  estimatedReadingTime: string;
}

export class TextAnalysisService {
  public static slugify(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }

  public static analyze(text: string): TextAnalysisResult {
    const words = text.trim().split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    const charCount = text.length;
    const readingTimeMinutes = parseFloat((wordCount / 200).toFixed(2));
    const slug = this.slugify(text);

    return {
      originalText: text,
      slug,
      wordCount,
      charCount,
      readingTimeMinutes,
      estimatedReadingTime: readingTimeMinutes < 1 ? '< 1 min read' : `${Math.ceil(readingTimeMinutes)} min read`,
    };
  }
}
