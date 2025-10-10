

class TextUtils {
  
  static normalize(text: string): string {
    return text.replace(/[^a-z0-9_]/gi, '').trim();
  }
}


const Utils = {

  Text: TextUtils

};


export default Utils;
