import React from 'react';
import { Check, Upload, Eye, Cpu, FileText, ArrowRight } from 'lucide-react';

export type WorkflowStepId = 'upload' | 'review' | 'analyze' | 'results' | 'next-steps';

interface Step {
  id: WorkflowStepId;
  number: number;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const STEPS: Step[] = [
  { id: 'upload', number: 1, label: 'Upload', icon: Upload },
  { id: 'review', number: 2, label: 'Review', icon: Eye },
  { id: 'analyze', number: 3, label: 'Analyze', icon: Cpu },
  { id: 'results', number: 4, label: 'Results', icon: FileText },
  { id: 'next-steps', number: 5, label: 'Next Steps', icon: ArrowRight },
];

interface Props {
  currentStep: WorkflowStepId;
  className?: string;
}

export const WorkflowStepper: React.FC<Props> = ({ currentStep, className = '' }) => {
  const currentIndex = STEPS.findIndex((s) => s.id === currentStep);

  return (
    <div className={`w-full max-w-2xl mx-auto px-2 sm:px-4 py-3 ${className}`} aria-label="Analysis workflow progress">
      <div className="flex items-center justify-between relative">
        {/* Background connecting line */}
        <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-0.5 bg-slate-200 -z-0" />
        
        {/* Active progress fill line */}
        <div
          className="absolute left-4 top-1/2 -translate-y-1/2 h-0.5 bg-teal-600 transition-all duration-500 ease-out -z-0"
          style={{
            width: `${Math.max(0, Math.min(100, (currentIndex / (STEPS.length - 1)) * 100))}%`,
          }}
        />

        {STEPS.map((step, idx) => {
          const isCompleted = idx < currentIndex;
          const isCurrent = idx === currentIndex;
          const isPending = idx > currentIndex;
          const Icon = step.icon;

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center group">
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 text-xs font-semibold ${
                  isCompleted
                    ? 'bg-teal-700 text-white shadow-xs'
                    : isCurrent
                    ? 'bg-white text-teal-800 ring-2 ring-teal-700 shadow-sm'
                    : 'bg-white text-slate-400 border border-slate-300'
                }`}
                aria-current={isCurrent ? 'step' : undefined}
              >
                {isCompleted ? (
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                ) : (
                  <span className="text-[11px] sm:text-xs">{step.number}</span>
                )}
              </div>
              <span
                className={`text-[10px] sm:text-xs mt-1.5 font-medium transition-colors ${
                  isCurrent
                    ? 'text-teal-900 font-bold'
                    : isCompleted
                    ? 'text-slate-700'
                    : 'text-slate-400'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
