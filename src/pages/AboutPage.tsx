import React from 'react';
import {
  BookOpen,
  GraduationCap,
  Cpu,
  ShieldAlert,
  Sparkles,
  Layers,
  Database,
  ArrowUpRight,
  ExternalLink,
  Target,
  CheckCircle2,
} from 'lucide-react';
import { DISEASES_DATABASE } from '../data/diseases';
import logoImage from '../assets/images/dermascan_logo_1788579032229.jpg';

interface Props {
  onNavigateToAnalyze: () => void;
}

export const AboutPage: React.FC<Props> = ({ onNavigateToAnalyze }) => {
  return (
    <div id="about-page-container" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="space-y-3 text-center max-w-2xl mx-auto">
        <div className="mx-auto w-24 h-24 rounded-full overflow-hidden border border-slate-200 bg-white shadow-xs flex items-center justify-center mb-2">
          <img
            src={logoImage}
            alt="DERMA 4 ALL Official Logo"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transform scale-110"
          />
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
          <GraduationCap className="w-4 h-4 text-teal-600" />
          <span>Clinical Screening Platform</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          About DERMA 4 ALL
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          An academic inquiry into deep learning computer vision, clinical accessibility, and responsible medical machine learning interfaces.
        </p>
      </div>

      {/* 1. Problem Statement & Motivation */}
      <section className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
          <Target className="w-5 h-5 text-teal-600" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            Problem Statement & Motivation
          </h2>
        </div>
        <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3">
          <p>
            Skin disease affects up to one-third of the global population at any given time. Yet in many rural areas and underserved regions, patients face average wait times of 6 to 18 weeks to see a board-certified dermatologist. Early screening can significantly improve outcomes, but patients frequently rely on unmoderated web searches that cause either unnecessary alarm or dangerous complacency.
          </p>
          <p>
            <strong>DERMA 4 ALL</strong> was developed to explore whether modern multimodal vision models and computer vision pipelines can provide calibrated, low-risk educational screening combined with verified clinical specialist guidance.
          </p>
        </div>
      </section>

      {/* 2. Machine Learning Pipeline Architecture */}
      <section className="rounded-2xl bg-slate-900 text-white p-6 sm:p-8 shadow-md space-y-6">
        <div className="flex items-center gap-2.5 pb-2 border-b border-slate-800">
          <Cpu className="w-5 h-5 text-teal-400" />
          <h2 className="text-lg sm:text-xl font-bold text-white">
            Model Pipeline & Architecture
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          The application uses a multi-stage screening pipeline designed for high-resolution visual feature extraction while maintaining strict confidence guardrails:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-800 border border-slate-700 space-y-1.5">
            <span className="font-mono text-teal-400 text-[11px] font-bold">Stage 1: Pre-Check & Quality Filter</span>
            <h4 className="font-bold text-white text-sm">Client-Side Heuristic Canvas</h4>
            <p className="text-slate-400 leading-relaxed">
              Assesses Laplacian edge variance (sharpness), histogram luminance (illumination), and Kovac skin-tone color distribution before submitting to inference.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800 border border-slate-700 space-y-1.5">
            <span className="font-mono text-teal-400 text-[11px] font-bold">Stage 2: Vision Classification</span>
            <h4 className="font-bold text-white text-sm">Multimodal Neural Feature Extraction</h4>
            <p className="text-slate-400 leading-relaxed">
              Analyzes epidermal texture, pigment network asymmetry, boundary irregularity, color variegation, and lesion diameter (ABCDE criteria).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800 border border-slate-700 space-y-1.5">
            <span className="font-mono text-teal-400 text-[11px] font-bold">Stage 3: Confidence Calibration</span>
            <h4 className="font-bold text-white text-sm">Confidence & Low-Certainty Guardrail</h4>
            <p className="text-slate-400 leading-relaxed">
              Thresholds model softmax probabilities. If certainty falls below 45%, the system triggers an explicit "Low-Confidence" guardrail rather than fabricating guesses.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800 border border-slate-700 space-y-1.5">
            <span className="font-mono text-teal-400 text-[11px] font-bold">Stage 4: Severity & Routing</span>
            <h4 className="font-bold text-white text-sm">Experimental Severity & Provider Search</h4>
            <p className="text-slate-400 leading-relaxed">
              Calculates an experimental severity heuristic (Low, Moderate, High) and automatically connects the patient to local certified dermatologists.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Supported Clinical Conditions */}
      <section className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
          <Database className="w-5 h-5 text-teal-600" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            Supported Conditions & Training Taxonomy
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600">
          DERMA 4 ALL's research knowledgebase covers {DISEASES_DATABASE.length} primary dermatological categories:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
          {DISEASES_DATABASE.map((d) => (
            <div
              key={d.id}
              className="p-3 rounded-xl border border-slate-100 bg-slate-50 text-xs space-y-1"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 block">
                {d.category}
              </span>
              <h4 className="font-bold text-slate-900">{d.name}</h4>
              <p className="text-slate-500 text-[11px] line-clamp-2">{d.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Limitations & Ethical Considerations (Section 18 Mandate) */}
      <section className="rounded-2xl bg-amber-50/70 border border-amber-200 p-6 sm:p-8 text-amber-950 space-y-4">
        <div className="flex items-center gap-2.5 pb-2 border-b border-amber-200">
          <ShieldAlert className="w-5 h-5 text-amber-600" />
          <h2 className="text-lg sm:text-xl font-bold text-amber-950">
            Known Limitations & Bias Safeguards
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs leading-relaxed text-amber-900">
          <div>
            <strong className="block font-bold mb-1 text-amber-950">Optical & Illumination Sensitivity:</strong>
            Standard smartphone cameras lack cross-polarized lighting and dermoscopy fluid interfaces. Reflections, flash glare, and focal blur degrade model certainty.
          </div>
          <div>
            <strong className="block font-bold mb-1 text-amber-950">Fitzpatrick Skin Phototype Bias:</strong>
            Many open-source dermatological datasets underrepresent darker skin types (Fitzpatrick IV–VI), which can introduce sensitivity variations in erythema detection.
          </div>
          <div>
            <strong className="block font-bold mb-1 text-amber-950">Differential False Positives:</strong>
            Benign lesions (e.g. seborrheic keratosis or dysplastic nevi) can visually mimic malignant lesions, necessitating biopsy for definitive pathology.
          </div>
          <div>
            <strong className="block font-bold mb-1 text-amber-950">Regulatory Status:</strong>
            DERMA 4 ALL is NOT approved by the FDA, CE, or any medical device regulatory agency. It must strictly be evaluated as educational screening.
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="text-center pt-4">
        <button
          onClick={onNavigateToAnalyze}
          className="px-6 py-3 rounded-lg bg-teal-800 hover:bg-teal-900 active:bg-slate-900 text-white font-semibold text-sm shadow-xs transition-colors cursor-pointer"
        >
          Launch Screening Simulator
        </button>
      </div>
    </div>
  );
};
