import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, HelpCircle, Info } from 'lucide-react';

interface Props {
  confidence: number; // 0 to 1
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  showExplanation?: boolean;
  className?: string;
}

export const ConfidenceMeter: React.FC<Props> = ({
  confidence,
  size = 'md',
  showLabel = true,
  showExplanation = false,
  className = '',
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const percent = Math.min(100, Math.max(0, Math.round(confidence * 100)));

  let tierLabel = 'High Pattern Match';
  let tierBadge = 'bg-teal-50 text-teal-900 border-teal-200';
  let barColor = 'bg-teal-700';
  let Icon = CheckCircle2;

  if (percent < 40) {
    tierLabel = 'Low Certainty Match';
    tierBadge = 'bg-amber-50 text-amber-900 border-amber-300';
    barColor = 'bg-amber-600';
    Icon = AlertCircle;
  } else if (percent < 70) {
    tierLabel = 'Moderate Pattern Match';
    tierBadge = 'bg-cyan-50 text-cyan-900 border-cyan-200';
    barColor = 'bg-cyan-700';
    Icon = Info;
  }

  const heights = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-3.5',
  };

  return (
    <div className={`space-y-1.5 ${className}`}>
      {showLabel && (
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-700">Model Confidence</span>
            <button
              type="button"
              onClick={() => setShowTooltip(!showTooltip)}
              className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              title="Learn about model confidence"
              aria-label="Learn about model confidence"
            >
              <HelpCircle className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold tracking-wide border ${tierBadge}`}>
              <Icon className="w-3 h-3 shrink-0" />
              <span>{tierLabel}</span>
            </span>
            <span className="font-bold text-slate-900 text-sm font-mono">{percent}%</span>
          </div>
        </div>
      )}

      {showTooltip && (
        <div className="p-2.5 rounded-lg bg-slate-100 border border-slate-200 text-xs text-slate-700 animate-in fade-in duration-150">
          <p>
            <strong>What does this mean?</strong> Confidence describes how strongly the AI matched your image's visual patterns against training classes. It is <em>not</em> the medical probability that you have this condition.
          </p>
        </div>
      )}

      <div
        className={`w-full bg-slate-100 rounded-full overflow-hidden ${heights[size]} border border-slate-200`}
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Model confidence: ${percent}%, ${tierLabel}`}
      >
        <div
          className={`${heights[size]} rounded-full transition-all duration-700 ease-out ${barColor}`}
          style={{ width: `${percent}%` }}
        />
      </div>

      {showExplanation && (
        <p className="text-[11px] text-slate-500 leading-normal pt-0.5">
          Confidence describes how strongly the model matched the image pattern. It does not confirm a diagnosis.
        </p>
      )}
    </div>
  );
};
