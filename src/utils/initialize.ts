import * as path from "path";
import * as fs from "fs";
import {Image} from "../models/image";

const settingDir = path.join(require('os').homedir(), 'Dynamica', 'setting.json');

export const initialize = () : Map<string, Image> => {
  try {
    return JSON.parse(fs.readFileSync(settingDir).toString());
  } catch (e) {
    fs.writeFileSync(settingDir, '{}');
    return initialize();
  }
};