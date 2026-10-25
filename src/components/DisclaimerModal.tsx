import React, { useEffect } from 'react';
import { X, ShieldAlert, CheckCircle2, Lock, ExternalLink } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToFullDisclaimer?: () => void;
}

export const DisclaimerModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onNavigateToFullDisclaimer,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="disclaimer-modal-title"
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-xl border border-slate-200 space-y-5 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-800 shrink-0">
            <ShieldAlert className="w-5 h-5 text-teal-700" />
          </div>
          <div>
            <h3 id="disclaimer-modal-title" className="text-lg font-bold text-slate-900">
              Safety, Purpose & Privacy
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              DERMA 4 ALL • Educational Screening & Care Guide
            </p>
          </div>
        </div>

        <div className="space-y-3.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-950 flex items-start gap-2.5">
            <span className="font-bold text-amber-800 text-base leading-none mt-0.5">•</span>
            <div>
              <strong className="font-semibold text-slate-900">Screening, not a diagnosis:</strong>{' '}
              DERMA 4 ALL is an educational platform that analyzes visual patterns against dermatological reference data. It cannot replace a clinical exam, dermoscopy, or biopsy performed by a doctor.
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 space-y-2">
            <div className="font-semibold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>What this tool provides:</span>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs">
              <li>Educational matching of skin conditions based on visual characteristics.</li>
              <li>General guidance on symptoms, causes, and when to seek care.</li>
              <li>Direct routing to nearby certified dermatologists and clinics.</li>
            </ul>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 space-y-2">
            <div className="font-semibold text-slate-900 flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-teal-700" />
              <span>Privacy & image handling:</span>
            </div>
            <p className="text-xs text-slate-600">
              Your uploaded images are processed solely to produce your screening report. We do not sell or permanently store personal health photos on our servers.
            </p>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
          {onNavigateToFullDisclaimer && (
            <button
              onClick={() => {
                onClose();
                onNavigateToFullDisclaimer();
              }}
              className="text-xs font-semibold text-teal-800 hover:text-teal-950 flex items-center gap-1 cursor-pointer"
            >
              <span>Read Full Regulatory Disclaimer</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold shadow-xs cursor-pointer ml-auto"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
