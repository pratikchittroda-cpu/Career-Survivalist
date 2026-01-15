import React, { useState } from 'react';
import { AnalysisRequest } from '../types';
import { Search, MapPin, Briefcase, Clock } from 'lucide-react';

interface CareerFormProps {
  onSubmit: (data: AnalysisRequest) => void;
  isLoading: boolean;
}

const CareerForm: React.FC<CareerFormProps> = ({ onSubmit, isLoading }) => {
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [industry, setIndustry] = useState('');
  const [yearsExperience, setYearsExperience] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (jobTitle.trim()) {
      onSubmit({ jobTitle, location, industry, yearsExperience });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-gray-800/80 backdrop-blur border border-gray-700 p-6 rounded-2xl shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Job Title */}
        <div className="md:col-span-2">
          <label className="block text-xs font-mono text-gray-400 mb-1 uppercase tracking-wider">Target Role *</label>
          <div className="relative group">
            <Briefcase className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-brand-blue transition-colors" size={18} />
            <input
              type="text"
              required
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. Graphic Designer, Truck Driver, Accountant"
              className="w-full bg-gray-900/50 border border-gray-700 text-white rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all placeholder-gray-600"
            />
          </div>
        </div>

        {/* Industry */}
        <div>
          <label className="block text-xs font-mono text-gray-400 mb-1 uppercase tracking-wider">Industry (Optional)</label>
          <div className="relative group">
            <Search className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-brand-purple transition-colors" size={18} />
            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="e.g. Tech, Healthcare"
              className="w-full bg-gray-900/50 border border-gray-700 text-white rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all placeholder-gray-600"
            />
          </div>
        </div>

        {/* Location */}
        <div>
           <label className="block text-xs font-mono text-gray-400 mb-1 uppercase tracking-wider">Location (Optional)</label>
           <div className="relative group">
            <MapPin className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-brand-orange transition-colors" size={18} />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. London, Remote, Mumbai"
              className="w-full bg-gray-900/50 border border-gray-700 text-white rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all placeholder-gray-600"
            />
          </div>
        </div>
        
         {/* Experience */}
         <div className="md:col-span-2">
           <label className="block text-xs font-mono text-gray-400 mb-1 uppercase tracking-wider">Years Experience (Optional)</label>
           <div className="relative group">
            <Clock className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-brand-green transition-colors" size={18} />
            <input
              type="text"
              value={yearsExperience}
              onChange={(e) => setYearsExperience(e.target.value)}
              placeholder="e.g. 2 years, Entry Level, Senior"
              className="w-full bg-gray-900/50 border border-gray-700 text-white rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all placeholder-gray-600"
            />
          </div>
        </div>

      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`mt-6 w-full py-4 rounded-lg font-bold text-white tracking-widest uppercase transition-all transform hover:scale-[1.01] active:scale-[0.99]
          ${isLoading 
            ? 'bg-gray-700 cursor-not-allowed' 
            : 'bg-gradient-to-r from-brand-blue to-brand-purple hover:shadow-lg hover:shadow-brand-blue/25'}`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Running Simulation...
          </span>
        ) : (
          'Analyze Survival Probability'
        )}
      </button>
    </form>
  );
};

export default CareerForm;
