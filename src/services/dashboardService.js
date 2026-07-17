import { kpiDefs, systemHealth } from '../data/dashboardData';

export const getKpis = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(kpiDefs);
    }, 100);
  });
};

export const getSystemHealth = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(systemHealth);
    }, 100);
  });
};
