import React from 'react';

interface ScoreGaugeProps {
  score: number; // 0 to 10
}

const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score }) => {
  const radius = 60;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 10) * circumference;

  let colorClass = "text-red-500";
  let label = "HIGH RISK";
  
  if (score >= 7) {
    colorClass = "text-brand-green";
    label = "SURVIVOR";
  } else if (score >= 4) {
    colorClass = "text-brand-yellow";
    label = "CAUTION";
  } else {
    colorClass = "text-brand-red";
    label = "CRITICAL";
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-40 h-40 flex items-center justify-center">
        {/* Background Circle */}
        <svg
          height="100%"
          width="100%"
          className="transform -rotate-90"
        >
          <circle
            stroke="#374151"
            strokeWidth={stroke}
            fill="transparent"
            r={normalizedRadius}
            cx={radius + 20} // centering adjustment
            cy={radius + 20}
          />
          {/* Progress Circle */}
          <circle
            stroke="currentColor"
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset, transition: "stroke-dashoffset 1.5s ease-in-out" }}
            strokeLinecap="round"
            fill="transparent"
            r={normalizedRadius}
            cx={radius + 20}
            cy={radius + 20}
            className={colorClass}
          />
        </svg>
        <div className="absolute flex flex-col items-center text-white">
          <span className="text-4xl font-bold font-mono tracking-tighter">{score.toFixed(1)}</span>
          <span className={`text-xs font-bold tracking-widest mt-1 ${colorClass.replace('text-', 'text-opacity-80 ')}`}>
            {label}
          </span>
        </div>
      </div>
      <p className="text-gray-400 text-xs mt-2 font-mono uppercase tracking-widest">Survival Score</p>
    </div>
  );
};

export default ScoreGauge;
