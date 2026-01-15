import React from 'react';
import { CareerAnalysis } from '../types';
import ScoreGauge from './ScoreGauge';
import { 
  AlertTriangle, 
  TrendingUp, 
  Cpu, 
  Flame, 
  ShieldAlert, 
  Activity 
} from 'lucide-react';

interface RiskReportProps {
  data: CareerAnalysis;
}

const ProgressBar: React.FC<{ value: number; color: string; label: string; icon: React.ReactNode }> = ({ value, color, label, icon }) => (
  <div className="mb-6">
    <div className="flex justify-between items-end mb-2">
      <div className="flex items-center gap-2 text-gray-300 font-medium text-sm uppercase tracking-wide">
        {icon}
        {label}
      </div>
      <span className={`font-mono font-bold ${color}`}>{value}%</span>
    </div>
    <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
      <div 
        className={`h-full rounded-full transition-all duration-1000 ease-out ${color.replace('text-', 'bg-')}`}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  </div>
);

const RiskReport: React.FC<RiskReportProps> = ({ data }) => {
  return (
    <div className="w-full max-w-4xl animate-fade-in pb-12">
      {/* Header Section */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 md:p-8 mb-6 shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-brand-blue to-brand-purple"></div>
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
              <Activity className="text-brand-blue" />
              Strategic Overview
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg border-l-4 border-gray-600 pl-4 italic">
              "{data.careerOverview}"
            </p>
            <div className="mt-6 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
               <h4 className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-bold">Verdict</h4>
               <p className="text-sm text-gray-200">{data.survivalScoreExplanation}</p>
            </div>
          </div>
          <div className="flex-shrink-0">
            <ScoreGauge score={data.survivalScore} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Risks & Upside Cards */}
        <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-6 flex flex-col">
          <h3 className="text-brand-green font-bold text-lg mb-4 flex items-center gap-2">
            <TrendingUp size={20} />
            Short-Term Upside
          </h3>
          <p className="text-gray-300 text-sm mb-6 flex-grow">
            {data.shortTermUpside}
          </p>
          
          <div className="mt-4 pt-4 border-t border-gray-700">
             <h3 className="text-brand-red font-bold text-lg mb-4 flex items-center gap-2">
              <ShieldAlert size={20} />
              Existential Threats
            </h3>
            <ul className="space-y-2">
              {data.longTermRisks.map((risk, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-brand-red mt-1">•</span>
                  {risk}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Metrics Column */}
        <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-6">
           <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
             <AlertTriangle size={20} className="text-brand-yellow" />
             Vulnerability Matrix
           </h3>

           <ProgressBar 
              value={data.automationExposure.score} 
              color={data.automationExposure.score > 70 ? 'text-brand-red' : data.automationExposure.score > 40 ? 'text-brand-yellow' : 'text-brand-green'}
              label="Automation Exposure" 
              icon={<Cpu size={16} />}
           />
           <p className="text-xs text-gray-400 mb-8 -mt-4 pl-1">
             {data.automationExposure.details}
           </p>

           <ProgressBar 
              value={data.burnoutProbability.score} 
              color={data.burnoutProbability.score > 70 ? 'text-brand-red' : data.burnoutProbability.score > 40 ? 'text-brand-yellow' : 'text-brand-green'}
              label="Burnout Probability"
              icon={<Flame size={16} />}
           />
           <p className="text-xs text-gray-400 -mt-4 pl-1">
             {data.burnoutProbability.details}
           </p>
        </div>

      </div>
    </div>
  );
};

export default RiskReport;
