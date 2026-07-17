import React from 'react';
import { ArrowUpRight, TrendingUp, TrendingDown, Users, UserPlus, Activity, ShieldCheck, AlertTriangle, CheckCircle2, IdCard, Ban, HeartPulse } from 'lucide-react';
import './KPISection.css';
const ICON_MAP = {
  'users': Users,
  'user-plus': UserPlus,
  'activity': Activity,
  'shield-check': ShieldCheck,
  'alert-triangle': AlertTriangle,
  'check-circle-2': CheckCircle2,
  'id-card': IdCard,
  'ban': Ban,
  'heart-pulse': HeartPulse
};

const KPISection = ({ kpis = [], onKpiClick }) => {
  return (
    <div className="kpi-grid">
      {kpis.map(k => {
        const IconComponent = ICON_MAP[k.icon];
        const TrendIcon = k.dir === 'up' ? TrendingUp : TrendingDown;
        
        return (
          <button 
            key={k.key} 
            className="kpi-card"
            onClick={() => onKpiClick && onKpiClick(k.key)}
          >
            <ArrowUpRight className="kpi-arrow" />
            
            <div className="kpi-top">
              <span className="kpi-label">{k.label}</span>
              <span className={`kpi-icon icon-${k.key}`}>
                {IconComponent && <IconComponent />}
              </span>
            </div>
            
            <span className="kpi-value">{k.value}</span>
            
            <span className={`kpi-delta ${k.dir}`}>
              <TrendIcon className="kpi-trend-icon" />
              {k.delta}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default KPISection;
