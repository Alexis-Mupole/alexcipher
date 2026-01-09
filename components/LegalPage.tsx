
import React from 'react';
import { Shield, ScrollText, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface LegalPageProps {
  type: 'privacy' | 'terms';
  language: Language;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, language }) => {
  const content = translations[language].legal[type];

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-800 rounded-2xl mb-6">
          {type === 'privacy' ? (
            <Shield className="w-8 h-8 text-cyan-400" />
          ) : (
            <ScrollText className="w-8 h-8 text-indigo-400" />
          )}
        </div>
        <h1 className="text-4xl font-extrabold text-white mb-4 tracking-tight">
          {content.title}
        </h1>
        <p className="text-slate-400 text-lg leading-relaxed">
          {content.desc}
        </p>
      </div>

      <div className="space-y-12">
        {content.sections.map((section, idx) => (
          <section key={idx} className="bg-slate-900 border border-slate-800 p-8 rounded-3xl relative overflow-hidden group">
            <div className={`absolute top-0 left-0 w-1 h-full opacity-0 group-hover:opacity-100 transition-opacity ${type === 'privacy' ? 'bg-cyan-500' : 'bg-indigo-500'}`} />
            <div className="flex items-start gap-4">
              <div className={`p-2 rounded-lg mt-1 ${type === 'privacy' ? 'bg-cyan-500/10 text-cyan-400' : 'bg-indigo-500/10 text-indigo-400'}`}>
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-4">{section.title}</h3>
                <p className="text-slate-400 leading-relaxed">
                  {section.content}
                </p>
              </div>
            </div>
          </section>
        ))}
      </div>
      
      <div className="mt-16 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm italic">
        Dernière mise à jour : Mars 2025
      </div>
    </div>
  );
};
