
import React from 'react';
import { ToastMessage } from '../types';
import { CheckCircle, XCircle } from 'lucide-react';

interface ToastContainerProps {
  toasts: ToastMessage[];
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts }) => {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <div 
          key={toast.id}
          className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border backdrop-blur-md animate-in slide-in-from-right fade-in duration-300 ${
            toast.type === 'success' 
            ? 'bg-slate-900/90 border-emerald-500/50 text-emerald-400' 
            : 'bg-slate-900/90 border-red-500/50 text-red-400'
          }`}
        >
          {toast.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
          <span className="text-sm font-semibold">{toast.text}</span>
        </div>
      ))}
    </div>
  );
};
