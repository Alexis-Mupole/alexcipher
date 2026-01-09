
import React, { useState } from 'react';
import { Lock, Zap, EyeOff, ArrowRight, X, Type, Cpu, Send, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface HeroProps {
  onStart: () => void;
  language: Language;
}

export const Hero: React.FC<HeroProps> = ({ onStart, language }) => {
  const t = translations[language].hero;
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'Type': return <Type className="w-6 h-6" />;
      case 'Cpu': return <Cpu className="w-6 h-6" />;
      case 'Lock': return <Lock className="w-6 h-6" />;
      case 'Send': return <Send className="w-6 h-6" />;
      default: return <ShieldCheck className="w-6 h-6" />;
    }
  };

  return (
    <div className="relative overflow-hidden pt-20 pb-24 lg:pt-32 lg:pb-40">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-8">
          <Zap className="w-3 h-3" />
          {t.badge}
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6">
          {t.title1} <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-500">
            {t.title2}
          </span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-10 leading-relaxed">
          {t.desc}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
          <button 
            onClick={onStart}
            className="flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-[#0f172a] font-bold px-8 py-4 rounded-xl transition-all hover:scale-105"
          >
            {t.ctaStart} <ArrowRight className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setIsHowItWorksOpen(true)}
            className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold px-8 py-4 rounded-xl border border-slate-700 transition-all"
          >
            {t.ctaHow}
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <EyeOff className="w-6 h-6 text-cyan-400" />, ...t.features[0] },
            { icon: <Lock className="w-6 h-6 text-indigo-400" />, ...t.features[1] },
            { icon: <Zap className="w-6 h-6 text-emerald-400" />, ...t.features[2] }
          ].map((feature, i) => (
            <div key={i} className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800 hover:border-slate-700 transition-all group">
              <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works Modal */}
      {isHowItWorksOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-[#0f172a]/80 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setIsHowItWorksOpen(false)}
          />
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center justify-between p-6 border-b border-slate-800">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                {t.howItWorks.title}
              </h2>
              <button 
                onClick={() => setIsHowItWorksOpen(false)}
                className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-8">
              <div className="space-y-8">
                {t.howItWorks.steps.map((step, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-slate-800 border border-slate-700 rounded-2xl flex items-center justify-center text-cyan-400 group-hover:border-cyan-500/50 transition-colors">
                        {getStepIcon(step.icon)}
                      </div>
                      {i < t.howItWorks.steps.length - 1 && (
                        <div className="w-0.5 flex-grow bg-gradient-to-b from-slate-800 to-transparent my-2" />
                      )}
                    </div>
                    <div className="pb-8">
                      <h4 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                        <span className="text-cyan-500/50 mr-2">0{i + 1}.</span>
                        {step.title}
                      </h4>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/30 p-6 flex justify-end">
              <button 
                onClick={() => setIsHowItWorksOpen(false)}
                className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-6 py-2.5 rounded-xl transition-all"
              >
                {t.howItWorks.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
