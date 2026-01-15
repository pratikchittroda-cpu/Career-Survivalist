import React, { useState } from 'react';
import { AnalysisRequest, CareerAnalysis, LoadingState } from './types';
import { analyzeCareerRisk } from './services/geminiService';
import CareerForm from './components/CareerForm';
import RiskReport from './components/RiskReport';
import { Shield, Info } from 'lucide-react';

const App: React.FC = () => {
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [data, setData] = useState<CareerAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysis = async (request: AnalysisRequest) => {
    setLoadingState(LoadingState.LOADING);
    setError(null);
    setData(null);

    try {
      const result = await analyzeCareerRisk(request);
      setData(result);
      setLoadingState(LoadingState.SUCCESS);
    } catch (err) {
      console.error(err);
      setError("System malfunction. Unable to connect to analysis engine. Please verify inputs and try again.");
      setLoadingState(LoadingState.ERROR);
    }
  };

  return (
    <div className="min-h-screen grid-bg flex flex-col font-sans selection:bg-brand-blue selection:text-white pb-20">
      
      {/* Header */}
      <header className="pt-12 pb-8 px-6 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-gray-900 rounded-full border border-gray-700 mb-6 shadow-2xl">
          <Shield className="text-brand-red mr-2" size={24} />
          <span className="font-mono font-bold tracking-widest text-lg text-white">SURVIVALIST_AI</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
          Will Your Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-orange">Survive the Future?</span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-lg">
          No dreams sold here. Just ruthless data. Stress-test your job against AI automation, burnout, and market obsolescence.
        </p>
      </header>

      {/* Main Content */}
      <main className="flex-grow px-4 flex flex-col items-center w-full max-w-5xl mx-auto gap-8">
        
        {/* Form is always visible, but maybe smaller when result is shown? No, keep it top for re-entry */}
        <CareerForm 
          onSubmit={handleAnalysis} 
          isLoading={loadingState === LoadingState.LOADING} 
        />

        {loadingState === LoadingState.ERROR && (
          <div className="w-full max-w-2xl bg-red-900/20 border border-brand-red text-brand-red p-4 rounded-lg flex items-center gap-3">
            <Info size={20} />
            <p>{error}</p>
          </div>
        )}

        {loadingState === LoadingState.SUCCESS && data && (
          <RiskReport data={data} />
        )}

        {/* Empty State / Initial View */}
        {loadingState === LoadingState.IDLE && (
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-8 opacity-60">
             {[
               { title: "Automation Risk", desc: "How likely is AI to take this job?", color: "border-brand-blue" },
               { title: "Burnout Index", desc: "Is the stress worth the paycheck?", color: "border-brand-orange" },
               { title: "Market Longevity", desc: "Will this role exist in 10 years?", color: "border-brand-green" },
             ].map((item, i) => (
               <div key={i} className={`bg-gray-900/40 p-6 rounded-xl border-t-2 ${item.color}`}>
                 <h3 className="text-white font-bold mb-2 font-mono">{item.title}</h3>
                 <p className="text-sm text-gray-500">{item.desc}</p>
               </div>
             ))}
           </div>
        )}

      </main>

      <footer className="mt-auto py-8 text-center text-gray-600 text-sm font-mono">
        <p>POWERED BY GEMINI 3.0 FLASH • DATA IS ESTIMATED NOT FINANCIAL ADVICE</p>
      </footer>

    </div>
  );
};

export default App;
