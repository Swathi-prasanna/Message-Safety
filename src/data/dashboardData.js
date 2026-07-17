export const kpiDefs = [
  { key: 'total-users', label: 'Total Users', value: '128,942', delta: '+4.2%', dir: 'up', icon: 'users' },
  { key: 'new-signups', label: 'New Signups', value: '842', delta: '+11%', dir: 'up', icon: 'user-plus' },
  { key: 'active-users', label: 'Active Users (24h)', value: '41,208', delta: '+1.8%', dir: 'up', icon: 'activity' },
  { key: 'verified-users', label: 'Verified Users', value: '19,760', delta: '+2.1%', dir: 'up', icon: 'shield-check' },
  { key: 'reports-pending', label: 'Reports Pending', value: '27', delta: '-6.4%', dir: 'down', icon: 'alert-triangle' },
  { key: 'reports-resolved', label: 'Reports Resolved (7d)', value: '312', delta: '+9.5%', dir: 'up', icon: 'check-circle-2' },
  { key: 'verifications-pending', label: 'Verifications Pending', value: '18', delta: '+3', dir: 'up', icon: 'id-card' },
  { key: 'banned', label: 'Banned / Suspended', value: '1,204', delta: '+0.5%', dir: 'up', icon: 'ban' },
  { key: 'system-health', label: 'System Health', value: '99.98%', delta: 'Operational', dir: 'up', icon: 'heart-pulse' },
];

export const systemHealth = [
  { name: 'API Gateway', status: 'Active' },
  { name: 'Media CDN', status: 'Active' },
  { name: 'Notification Queue', status: 'Suspended' },
  { name: 'Background Jobs', status: 'Banned' }
];
