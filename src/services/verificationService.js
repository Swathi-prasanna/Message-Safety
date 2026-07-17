import { verificationData } from '../data/verificationData';

export const getVerifications = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...verificationData]);
    }, 100);
  });
};
