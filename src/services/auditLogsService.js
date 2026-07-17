import { auditLogsData } from '../data/auditLogsData';

export const getAuditLogs = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...auditLogsData]);
    }, 100);
  });
};
