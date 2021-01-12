export interface ProcessFileArgs {
  componentName: string,
  directory: string
  vueFile: string,
}

export interface FileProcessStatus {
  vueFile: string,
  hasModified: boolean
}
