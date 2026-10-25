import React, { useState } from 'react';
import { Info, HelpCircle } from 'lucide-react';
import { SeverityLevel } from '../types';

interface Props {
  severity: SeverityLevel;
  score?: number; // 0 to 1
  compact?: boolean;
  className?: string;
}

export const SeverityBadge: React.FC<Props> = ({
  severity,
  score,
  compact = false,
  className = '',
}) => {
  const [showExplanation, setShowExplanation] = useState(false);

  const config = {
    Low: {
      label: 'Low Severity Estimate',
      badgeClass: 'bg-slate-100 text-slate-800 border-slate-300',
      pillClass: 'bg-emerald-600',
      desc: 'Mild epidermal presentation in reference data.',
    },
    Moderate: {
      label: 'Moderate Severity Estimate',
      badgeClass: 'bg-amber-50 text-amber-900 border-amber-300',
      pillClass: 'bg-amber-600',
      desc: 'Noticeable surface texture or localized redness.',
    },
    High: {
      label: 'High Severity Estimate',
      badgeClass: 'bg-slate-100 text-slate-800 border-slate-300',
      pillClass: 'bg-slate-700',
      desc: 'Elevated visual features in research dataset.',
    },
    Indeterminate: {
      label: 'Indeterminate Estimate',
      badgeClass: 'bg-slate-50 text-slate-700 border-slate-200',
      pillClass: 'bg-slate-400',
      desc: 'Unable to calibrate morphological depth.',
    },
  };

  const current = config[severity] || config.Indeterminate;

  if (compact) {
    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${current.badgeClass} ${className}`}>
        <span className={`w-2 h-2 rounded-full ${current.pillClass}`} />
        <span>{current.label}</span>
      </div>
    );
  }

  return (
    <div className={`space-y-2 p-3.5 rounded-xl bg-slate-50/80 border border-slate-200 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold text-slate-700">
            Experimental Severity Estimate
          </span>
          <button
            type="button"
            onClick={() => setShowExplanation(!showExplanation)}
            className="text-slate-400 hover:text-slate-600 transition-colors p-0.5 cursor-pointer"
            title="What is the experimental severity estimate?"
            aria-label="What is the experimental severity estimate?"
          >
            <HelpCircle className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${current.badgeClass}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${current.pillClass}`} />
          <span>{severity}</span>
        </div>
      </div>

      {showExplanation && (
        <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-600 animate-in fade-in duration-150">
          <p>
            <strong>Note:</strong> This is an experimental model estimate and should not be interpreted as a clinical severity assessment or emergency triage.
          </p>
        </div>
      )}

      <p className="text-[11px] text-slate-500 leading-relaxed">
        {current.desc}
      </p>
    </div>
  );
};
