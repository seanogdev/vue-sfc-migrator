import * as fs from 'fs';
import * as path from 'path';
import { FileProcessStatus, ProcessFileArgs } from '../types';

export default function processScriptFile({
  vueFile,
  componentName,
  directory,
}: ProcessFileArgs):FileProcessStatus {
  // Find the script
  // i.e. <script src="./Activities.js"></script>
  const regexp = new RegExp(`(<script src="(./${componentName}.js)"></script>)`);

  const scriptTagMatches = vueFile.match(regexp) ?? [];
  if (scriptTagMatches.length === 0) {
    return {
      vueFile,
      hasModified: false,
    };
  }
  const scriptTag = scriptTagMatches[1];
  const scriptSrc = scriptTagMatches[2];

  // Read script file
  const scriptPath = path.resolve(directory, scriptSrc);
  const scriptContent = fs.readFileSync(scriptPath, { encoding: 'utf8' });

  // Define new file
  let newVueFile;

  // Delete script tag
  newVueFile = vueFile.replace(scriptTag, '');

  // Place new script tag with file contents above template
  newVueFile = newVueFile.replace('<template>\n', `<script>\n${scriptContent}</script>\n\n<template>\n`);

  // TODO: Optional: delete script file
  return {
    vueFile: newVueFile,
    hasModified: true,
  };
}
