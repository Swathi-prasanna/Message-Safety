import React, { useState, useEffect } from 'react';
import DashboardHeader from '../DashboardHeader/DashboardHeader';
import KPISection from '../KPISection/KPISection';
import SystemHealth from '../SystemHealth/SystemHealth';
import { getKpis, getSystemHealth } from '../../../services/dashboardService';

import './Dashboard.css';
const Dashboard = () => {
  const [kpis, setKpis] = useState([]);
  const [healthData, setHealthData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const kpisData = await getKpis();
      const health = await getSystemHealth();
      setKpis(kpisData);
      setHealthData(health);
    };
    fetchData();
  }, []);

  return (
    <div className="d-flex flex-column h-100">
      <DashboardHeader title="Dashboard Overview" />
      <div className="flex-grow-1 p-4 overflow-auto">
        <KPISection kpis={kpis} />
        <div className="row mt-4">
          <div className="col-lg-4">
            <SystemHealth healthData={healthData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
