
export class TextUtils {
  
  static normalize(text: string): string {
    return text.replace(/[^a-z0-9_]/gi, '').trim();
  }
}
