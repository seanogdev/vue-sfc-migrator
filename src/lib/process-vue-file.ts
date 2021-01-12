import * as fs from 'fs';
import * as path from 'path';
import processScriptFile from './process-script-file';
import processStyles from './process-styles';

export default function processVueFile(file:string):void {
  const vueFile = fs.readFileSync(file, { encoding: 'utf8' });
  const componentName = path.parse(path.basename(file)).name;
  const directory = path.dirname(file);

  let newVueFile = vueFile;
  let hasModifiedGlobally = false;
  const scriptProcess = processScriptFile({ vueFile: newVueFile, componentName, directory });
  if (scriptProcess.hasModified) {
    newVueFile = scriptProcess.vueFile;
    hasModifiedGlobally = scriptProcess.hasModified;
  }

  const stylesProcess = processStyles({ vueFile: newVueFile, componentName, directory });
  if (stylesProcess.hasModified) {
    newVueFile = stylesProcess.vueFile;
    hasModifiedGlobally = stylesProcess.hasModified;
  }

  if (hasModifiedGlobally) {
    fs.writeFileSync(`${directory}/../${componentName}.vue`, newVueFile);
  } else {
    // eslint-disable-next-line no-console
    console.log(`Component at ${file} already processed`);
  }
}
