import { modQueue, appeals, reviewers } from '../data/moderationData';

export const getModerationQueue = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...modQueue]);
    }, 100);
  });
};

export const getAppeals = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...appeals]);
    }, 100);
  });
};

export const getReviewers = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...reviewers]);
    }, 100);
  });
};
