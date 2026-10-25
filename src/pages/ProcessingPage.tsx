import React, { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, Sparkles, Brain, Shield, Info } from 'lucide-react';
import { WorkflowStepper } from '../components/WorkflowStepper';

interface Props {
  imageUrl: string;
  onCompleted: () => void;
  minDurationMs?: number;
}

export const ProcessingPage: React.FC<Props> = ({
  imageUrl,
  onCompleted,
  minDurationMs = 2800,
}) => {
  const [currentStage, setCurrentStage] = useState(1); // 1 to 5
  const [factIndex, setFactIndex] = useState(0);

  const stages = [
    { id: 1, label: 'Image received' },
    { id: 2, label: 'Image quality checked' },
    { id: 3, label: 'Analyzing visual patterns' },
    { id: 4, label: 'Preparing screening result' },
    { id: 5, label: 'Loading educational information' },
  ];

  const reassuringMessages = [
    'Analyzing visual patterns in your image...',
    'Evaluating surface characteristics and color patterns...',
    'Preparing your screening result...',
    'Loading educational guidance...',
  ];

  const facts = [
    'Dermatologists evaluate visual symmetry, border regularity, and color variation when examining skin spots.',
    'Clear lighting and steady focus are essential for detecting fine surface features.',
    'Early professional skin checks help catch conditions early when they are most manageable.',
    'AI screening assists in pattern recognition, but only a human specialist can confirm a medical diagnosis.',
  ];

  useEffect(() => {
    const t1 = setTimeout(() => setCurrentStage(2), 500);
    const t2 = setTimeout(() => setCurrentStage(3), 1100);
    const t3 = setTimeout(() => setCurrentStage(4), 1900);
    const t4 = setTimeout(() => setCurrentStage(5), 2500);
    const t5 = setTimeout(() => onCompleted(), minDurationMs);

    const fInterval = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % facts.length);
    }, 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearInterval(fInterval);
    };
  }, [minDurationMs, onCompleted]);

  const activeMessage =
    currentStage <= 2
      ? reassuringMessages[0]
      : currentStage === 3
      ? reassuringMessages[1]
      : currentStage === 4
      ? reassuringMessages[2]
      : reassuringMessages[3];

  return (
    <div
      id="analysis-processing-page"
      className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-8"
      role="status"
      aria-live="polite"
    >
      {/* Workflow Stepper */}
      <WorkflowStepper currentStep="analyze" />

      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-teal-700 animate-spin" style={{ animationDuration: '4s' }} />
          <span>AI Screening In Progress</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          {activeMessage}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
          Please note: this is an AI-assisted screening tool, not a medical diagnosis.
        </p>
      </div>

      {/* Image Thumbnail with clean subtle pulse */}
      <div className="relative mx-auto w-40 h-40 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-sm">
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Skin photo being analyzed"
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-teal-950/20 backdrop-blur-[0.5px] flex items-center justify-center">
          <div className="w-20 h-20 rounded-full border-2 border-teal-300/60 border-t-transparent animate-spin" />
        </div>
      </div>

      {/* Progress Timeline with Meaningful Stages (Section 40) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs max-w-md mx-auto text-left space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 pb-1 border-b border-slate-100">
          Analysis Stages
        </h4>

        <div className="space-y-2.5">
          {stages.map((stage) => {
            const isDone = currentStage > stage.id;
            const isCurrent = currentStage === stage.id;

            return (
              <div
                key={stage.id}
                className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-medium transition-colors ${
                  isCurrent
                    ? 'bg-teal-50 text-teal-900 border border-teal-200'
                    : isDone
                    ? 'text-slate-700 bg-slate-50'
                    : 'text-slate-400'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 text-teal-700 animate-spin shrink-0" />
                  ) : (
                    <span className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center text-[10px] text-slate-400">
                      ○
                    </span>
                  )}
                  <span>{stage.label}</span>
                </div>

                <span className="text-[11px] font-mono">
                  {isDone ? '✓ Completed' : isCurrent ? '→ Analyzing' : '○ Pending'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reassuring Educational Fact */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 max-w-md mx-auto flex items-start gap-2.5 text-left">
        <Info className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
        <p className="leading-relaxed transition-opacity duration-300">{facts[factIndex]}</p>
      </div>
    </div>
  );
};
