import fs from 'fs';
import path from 'path';


export class FileUtils {
  private static LOOP_LIMIT = 4;


  declare private currentLoop: number;


  findFile(fileName: string, currentDir = process.cwd()) : any {

    const filePath = path.join(currentDir, fileName);
    if (fs.existsSync(filePath)) {
      return filePath;
    }

    const parentDir = path.dirname(currentDir);
    if ((parentDir === currentDir) || this.reachedLoopLimit()) {
      throw new Error(`O arquivo '${fileName}' não foi encontrado`);
    }
  
    this.currentLoop++;
    return this.findFile(fileName, parentDir);
  }


  reachedLoopLimit() : boolean {
    return this.currentLoop >= FileUtils.LOOP_LIMIT;
  }
}
