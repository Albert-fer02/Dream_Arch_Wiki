import React from 'react';
import { InfoIcon, LightbulbIcon, WarningIcon } from './icons';

type InfoBoxType = 'note' | 'tip' | 'warning';

interface InfoBoxProps {
  type: InfoBoxType;
  title: string;
  children: React.ReactNode;
}

const styleConfig = {
  note: {
    icon: <InfoIcon className="w-6 h-6 text-cyan-400" />,
    borderColor: 'border-cyan-400',
    bgColor: 'bg-cyan-900/20',
  },
  tip: {
    icon: <LightbulbIcon className="w-6 h-6 text-emerald-400" />,
    borderColor: 'border-emerald-400',
    bgColor: 'bg-emerald-900/20',
  },
  warning: {
    icon: <WarningIcon className="w-6 h-6 text-amber-400" />,
    borderColor: 'border-amber-400',
    bgColor: 'bg-amber-900/20',
  },
};

const InfoBox: React.FC<InfoBoxProps> = ({ type, title, children }) => {
  const { icon, borderColor, bgColor } = styleConfig[type];

  return (
    <div className={`p-4 rounded-lg border-l-4 ${borderColor} ${bgColor} flex space-x-4`}>
      <div className="flex-shrink-0 pt-1">{icon}</div>
      <div>
        <h4 className="font-bold text-slate-100">{title}</h4>
        <div className="text-slate-300 text-sm mt-1">{children}</div>
      </div>
    </div>
  );
};

export default InfoBox;
