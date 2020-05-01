import { Setting } from '../models/setting';
import { initialize } from './initialize';

let setting: Setting = initialize();

export const getImage = () => {
  const now: Date = new Date;
  for (let time in setting) {
    if (setting.hasOwnProperty(time))
      if (parseInt(time) <= now.getHours() * 100 + now.getMinutes()) return setting.get(time).image;
  }
};

export const reinitialize = () => {
  setting = initialize();
};
