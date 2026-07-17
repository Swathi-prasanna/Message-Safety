import { settingsData } from '../data/settingsData';

export const getSettings = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ...settingsData });
    }, 100);
  });
};
