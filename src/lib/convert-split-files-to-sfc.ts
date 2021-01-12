import { glob } from 'glob';
import processFile from './process-vue-file';

export default function convertSplitFilesToSFC(globString:string):void {
  const files = glob.sync(globString);
  files.forEach((file) => {
    processFile(file);
  });
}
