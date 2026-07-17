import { messagesData } from '../data/messageSafetyData';

export const getMessages = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...messagesData]);
    }, 100);
  });
};
