
import React from 'react';
import { HelpCircle, ShieldCheck, Zap, ServerOff, Lightbulb, Smartphone, ShieldAlert, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Language, Page } from '../types';
import { translations } from '../translations';

interface FAQSectionProps {
  language: Language;
  onNavigate: (page: Page) => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ language, onNavigate }) => {
  const t = translations[language].faq;
  const common = translations[language].common;

  const tipIcons = [
    <Smartphone className="w-5 h-5" />,
    <Zap className="w-5 h-5" />,
    <ShieldAlert className="w-5 h-5" />,
    <CheckCircle2 className="w-5 h-5" />
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
      {/* Back Button */}
      <button 
        onClick={() => onNavigate('landing')}
        className="flex items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors mb-6 group text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        {common.back}
      </button>

      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
          {t.title}
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
          {t.tagline}
        </p>
      </div>

      {/* Intro Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-20">
        {[
          { icon: <ServerOff className="w-8 h-8 text-orange-500" />, ...t.features[0] },
          { icon: <ShieldCheck className="w-8 h-8 text-emerald-500" />, ...t.features[1] },
          { icon: <Zap className="w-8 h-8 text-cyan-500" />, ...t.features[2] },
        ].map((item, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 p-8 rounded-3xl text-center hover:border-slate-700 transition-all group">
            <div className="flex justify-center mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
            <h4 className="font-bold text-white mb-2 text-xl">{item.title}</h4>
            <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Main Grid: Tips and Questions */}
      <div className="grid lg:grid-cols-5 gap-12">
        
        {/* Tips Section (2/5) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-2 mb-8">
            <Lightbulb className="w-6 h-6 text-yellow-400" />
            <h3 className="text-2xl font-bold text-white">{t.sections.tips}</h3>
          </div>
          
          {t.tips.map((tip, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex gap-4">
                <div className="p-2 bg-slate-800 rounded-lg text-cyan-400 shrink-0 h-fit">
                  {tipIcons[i % tipIcons.length]}
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">{tip.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">{tip.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section (3/5) */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center gap-2 mb-8">
            <HelpCircle className="w-6 h-6 text-cyan-400" />
            <h3 className="text-2xl font-bold text-white">{t.sections.faq}</h3>
          </div>
          
          <div className="space-y-4">
            {t.items.map((item, i) => (
              <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:bg-slate-900 transition-colors">
                <h3 className="text-lg font-bold text-white mb-3 flex items-start gap-3">
                  <span className="text-cyan-500 font-mono mt-1 text-sm">Q.</span>
                  {item.q}
                </h3>
                <div className="flex gap-3">
                  <span className="text-emerald-500 font-mono text-sm mt-0.5">R.</span>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Security Note */}
      <div className="mt-20 p-8 rounded-3xl bg-cyan-500/5 border border-cyan-500/10 text-center">
        <ShieldCheck className="w-10 h-10 text-cyan-400 mx-auto mb-4" />
        <h4 className="text-white font-bold text-lg mb-2">Sécurité par Design</h4>
        <p className="text-slate-500 text-sm max-w-xl mx-auto italic">
          AlexCipher est un projet open-source. Nous croyons que la sécurité ne doit pas être une boîte noire. Chaque ligne de code est auditable pour garantir votre vie privée.
        </p>
      </div>
    </div>
  );
};
