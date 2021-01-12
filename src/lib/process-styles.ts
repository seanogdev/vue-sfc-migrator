import * as fs from 'fs';
import * as path from 'path';
import { FileProcessStatus, ProcessFileArgs } from '../types';

export default function processStyles({
  vueFile,
  componentName,
  directory,
}: ProcessFileArgs):FileProcessStatus {
  // Find the script
  // i.e. <script src="./Activities.js"></script>
  const regexp = new RegExp(`(<style.*(src="(./${componentName}.*[.]scss)").*></style>)`, 'g');

  const styleTagMatches = [...vueFile.matchAll(regexp)];

  let newVueFile = vueFile;
  if (styleTagMatches.length === 0) {
    return {
      vueFile,
      hasModified: false,
    };
  }

  // eslint-disable-next-line no-restricted-syntax
  styleTagMatches.forEach((styleTagMatch) => {
    const styleTag = styleTagMatch[1];
    const styleSrcAttr = styleTagMatch[2];
    const styleSrc = styleTagMatch[3];

    // Read script file
    const stylePath = path.resolve(directory, styleSrc);
    const styleContent = fs.readFileSync(stylePath, { encoding: 'utf8' });

    // Create inlined style tag
    const cleanStyleTag = styleTag.replace(` ${styleSrcAttr}`, '').replace('</style>', `\n${styleContent}</style>`);

    // Define new file
    newVueFile = newVueFile.replace(styleTag, `\n${cleanStyleTag}`);
  });

  return {
    vueFile: newVueFile,
    hasModified: true,
  };
}
