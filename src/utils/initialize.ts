import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

import { Image } from '../models/image';

const settingDir = path.join(os.homedir(), 'Documents', 'Dynamica');
export const settingFile = path.join(settingDir, 'setting.json');

export const initialize = () : Map<string, Image> => {
  try {
    const save = fs.readFileSync(settingFile).toString();
    return JSON.parse(save);
  } catch (e) {
    fs.mkdirSync(settingDir)
    fs.writeFileSync(settingFile, '{}', { flag: 'w+' });
    return initialize();
  }
};
