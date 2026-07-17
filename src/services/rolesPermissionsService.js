import { rolesData } from '../data/rolesPermissionsData';

export const getRoles = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...rolesData]);
    }, 100);
  });
};
