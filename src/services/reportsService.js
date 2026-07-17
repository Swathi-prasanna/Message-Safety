import { reportsData } from '../data/reportsData';

export const getReports = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...reportsData]);
    }, 100);
  });
};
