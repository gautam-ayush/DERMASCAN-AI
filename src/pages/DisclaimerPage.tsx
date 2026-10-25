import React, { useState } from 'react';
import {
  ShieldAlert,
  Lock,
  FileText,
  AlertTriangle,
  CheckCircle2,
  PhoneCall,
  EyeOff,
  Server,
  UserCheck,
} from 'lucide-react';

export const DisclaimerPage: React.FC = () => {
  const [acknowledged, setAcknowledged] = useState(false);

  return (
    <div id="disclaimer-and-privacy-page" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="space-y-3 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold">
          <ShieldAlert className="w-4 h-4 text-rose-600" />
          <span>Safety, Ethics & Governance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Medical Disclaimer & Privacy Policy
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Please read these policies carefully. DERMA 4 ALL operates strictly as an educational screening prototype.
        </p>
      </div>

      {/* 1. Full Medical Disclaimer (Section 19 Mandate) */}
      <section className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            Medical Disclaimer & Clinical Non-Diagnostic Notice
          </h2>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-300 text-amber-950 font-medium leading-relaxed">
            <strong>CRITICAL NOTICE:</strong> DERMA 4 ALL is NOT a certified medical device and does NOT provide a definitive clinical diagnosis. The artificial intelligence models utilized here produce exploratory, probabilistic pattern matches intended solely for educational screening awareness.
          </div>

          <p>
            The software, services, and educational summaries provided on this website are not intended to replace, override, or substitute for the clinical judgment, physical examination, dermoscopy, or biopsy performed by a board-certified dermatologist, physician, or other qualified healthcare provider.
          </p>

          <h3 className="font-bold text-slate-900 text-sm pt-2 uppercase tracking-wide">
            Key Diagnostic Risks & Model Variance:
          </h3>
          <ul className="space-y-2 pl-4 list-disc text-slate-600">
            <li>
              <strong>False Positives & False Negatives:</strong> Computer vision models can misclassify benign lesions (e.g. seborrheic keratosis, benign melanocytic nevi) as concerning, or conversely, fail to recognize early-stage malignant melanoma or carcinoma.
            </li>
            <li>
              <strong>Resolution & Artifact Sensitivity:</strong> Image compression, camera focal length, optical aberrations, motion blur, and ambient illumination heavily skew mathematical predictions.
            </li>
            <li>
              <strong>Non-Exclusionary:</strong> A low-confidence or benign-leaning output does NOT guarantee that the lesion is safe. Always consult a physician if any lesion is itchy, bleeding, growing, or changing.
            </li>
          </ul>

          {/* Emergency Statement */}
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-950 space-y-2">
            <div className="flex items-center gap-2 font-bold text-rose-900 text-sm">
              <PhoneCall className="w-4 h-4 text-rose-600" />
              <span>Medical Emergency Instructions</span>
            </div>
            <p className="text-xs leading-relaxed text-rose-900">
              If you or someone in your care is experiencing severe sudden swelling, difficulty breathing, rapidly spreading rash accompanied by high fever, severe pain, or any life-threatening symptoms, immediately call your local emergency services (e.g., <strong>911</strong> in North America, <strong>999</strong> in the UK, <strong>112</strong> in Europe) or go to the nearest emergency department.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Privacy & Data Handling (Section 20 Mandate) */}
      <section className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
          <Lock className="w-5 h-5 text-teal-600" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            Privacy Policy & Data Handling
          </h2>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <p>
            We take health data privacy extremely seriously. Because DERMA 4 ALL is an educational project, we enforce strict zero-retention defaults:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <EyeOff className="w-4 h-4 text-teal-600" />
                <span>Zero Permanent Image Storage</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Images uploaded or captured via camera are processed in ephemeral memory (RAM) solely for the duration of inference. They are never written to permanent disk storage, nor sold or monetized.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <Server className="w-4 h-4 text-teal-600" />
                <span>Geospatial Session Isolation</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                GPS coordinates or city search terms are used exclusively to query nearby clinics during your active session. Coordinates are never saved or tied to your device identity.
              </p>
            </div>
          </div>

          <h3 className="font-bold text-slate-900 text-sm pt-2 uppercase tracking-wide">
            User Upload Responsibilities & Best Practices:
          </h3>
          <ul className="space-y-1.5 pl-4 list-disc text-slate-600">
            <li>Do not upload photographs that contain identifiable facial features, tattoos, or background identification documents.</li>
            <li>Do not upload photographs of sensitive anatomical regions or children.</li>
            <li>Ensure you have the right to analyze any photograph you submit.</li>
          </ul>
        </div>
      </section>

      {/* User Consent & Acknowledgement Toggle */}
      <section className="rounded-2xl bg-teal-50/70 border border-teal-200 p-6 flex items-start gap-3">
        <input
          id="user-acknowledgement-checkbox"
          type="checkbox"
          checked={acknowledged}
          onChange={(e) => setAcknowledged(e.target.checked)}
          className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500 border-slate-300 mt-1 cursor-pointer"
        />
        <label
          htmlFor="user-acknowledgement-checkbox"
          className="text-xs sm:text-sm text-teal-950 cursor-pointer select-none leading-relaxed"
        >
          <strong className="font-semibold text-teal-900">User Acknowledgement:</strong> I understand that DERMA 4 ALL is strictly an educational screening prototype and not a medical diagnostic tool. I agree not to use this system as a substitute for professional clinical medical advice.
          {acknowledged && (
            <span className="block mt-1 text-emerald-700 font-bold flex items-center gap-1 text-xs">
              <CheckCircle2 className="w-3.5 h-3.5" /> Policy acknowledged for current browser session.
            </span>
          )}
        </label>
      </section>
    </div>
  );
};
