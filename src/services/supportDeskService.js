import { ticketsData } from '../data/supportDeskData';

export const getTickets = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...ticketsData]);
    }, 100);
  });
};
