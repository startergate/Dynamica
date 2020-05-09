import { Setting } from '../models/setting';
import { initialize } from './initialize';

let setting: Setting = initialize();

export const getImage = () => {
  const now: Date = new Date;
  for (let [time, image] of Object.entries(setting)) {
    if (parseInt(time) <= now.getHours() * 100 + now.getMinutes()) return image.image;
  }
  return null;
};

export const reinitialize = () => {
  setting = initialize();
};
