import { Command, flags } from '@oclif/command';
import convertSplitFilesToSFC from './lib/convert-split-files-to-sfc';

class VueSfcMigratorTs extends Command {
  static description = 'Combines Vue SFC components that are split into multiple files to a single file';

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({ char: 'n', description: 'name to print' }),
    // flag with no value (-f, --force)
    // force: flags.boolean({char: 'f'}),

    dir: flags.string({
      char: 'd',
      description: 'directory of components (can be glob)',
      default: process.cwd(),
    }),
  };

  static args = [{ name: 'file' }];

  run():any {
    const parsedConfig = this.parse(VueSfcMigratorTs);
    convertSplitFilesToSFC(parsedConfig.flags.dir);
  }
}

export = VueSfcMigratorTs;
