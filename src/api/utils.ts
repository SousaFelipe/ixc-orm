

class TextUtils {
  static normalize(text: string): string {
    return text.replace(/[^a-z0-9]/gi, '').trim();
  }
}


const utils = {

  Text: TextUtils

}


export default utils;
