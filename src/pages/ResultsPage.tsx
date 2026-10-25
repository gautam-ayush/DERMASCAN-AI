import React, { useState } from 'react';
import {
  AlertTriangle,
  ShieldCheck,
  Stethoscope,
  RefreshCw,
  Printer,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Info,
  CheckCircle2,
  AlertOctagon,
  HelpCircle,
  Clock,
  ArrowRight,
  Search,
  Eye,
  Calendar,
  PhoneCall,
  Activity,
  Layers,
} from 'lucide-react';
import { AnalysisResult } from '../types';
import { ConfidenceMeter } from '../components/ConfidenceMeter';
import { SeverityBadge } from '../components/SeverityBadge';
import { WorkflowStepper } from '../components/WorkflowStepper';
import { MedicalDisclaimerBanner } from '../components/MedicalDisclaimerBanner';
import { DatasetGroundingCard } from '../components/DatasetGroundingCard';

interface Props {
  result: AnalysisResult;
  onAnalyzeAnother: () => void;
  onNavigateToDoctors: () => void;
}

export const ResultsPage: React.FC<Props> = ({
  result,
  onAnalyzeAnother,
  onNavigateToDoctors,
}) => {
  const [printSuccess, setPrintSuccess] = useState(false);
  const [isMultipleWhyExpanded, setIsMultipleWhyExpanded] = useState(false);
  const [isPhotoZoomed, setIsPhotoZoomed] = useState(false);

  // Progressive Disclosure Sections for Condition Information
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    overview: true,
    symptoms: false,
    causes: false,
    risk_factors: false,
    prevention: false,
    management: false,
    seek_care: true,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const disease = result.conditionDetails;
  const isLowConfidence = result.isLowConfidence || result.topConfidence < 0.40;

  const handlePrint = () => {
    window.print();
    setPrintSuccess(true);
    setTimeout(() => setPrintSuccess(false), 3000);
  };

  const percent = Math.round(result.topConfidence * 100);

  return (
    <div id="results-page-dashboard" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 pb-32">
      {/* 5-Step Workflow Stepper */}
      <WorkflowStepper currentStep="results" />

      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-teal-50 text-teal-800 border border-teal-200 font-mono">
              Screening Report
            </span>
            <span className="text-xs text-slate-500 font-mono">
              ID: #{result.id.slice(-6).toUpperCase()} • {new Date(result.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Screening Results
          </h1>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handlePrint}
            className="flex-1 sm:flex-initial min-h-[44px] flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            title="Print report for doctor consultation"
            aria-label="Print report"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>{printSuccess ? 'Printed!' : 'Print Report'}</span>
          </button>

          <button
            onClick={onAnalyzeAnother}
            className="flex-1 sm:flex-initial min-h-[44px] flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            aria-label="Start new screening"
          >
            <RefreshCw className="w-4 h-4 text-slate-500" />
            <span>New Photo</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. LOW-CONFIDENCE CASE EXPERIENCE */}
      {/* When below threshold, answers the 4 key questions plainly without technical jargon */}
      {/* ========================================================================= */}
      {isLowConfidence ? (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="rounded-2xl border border-amber-300 bg-amber-50/70 p-6 sm:p-8 text-amber-950 space-y-6 shadow-xs">
            {/* Question 1: What did the AI find? */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 font-mono">
                  1. WHAT DID THE AI FIND?
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-amber-950 leading-snug">
                  No reliable pattern match could be determined
                </h2>
                <p className="text-xs sm:text-sm text-amber-900 leading-relaxed pt-1">
                  The model did not find clear visual traits that match reference conditions with acceptable certainty.
                </p>
              </div>
            </div>

            {/* Question 2: How confident is the model? */}
            <div className="p-4 rounded-xl bg-white border border-amber-200 text-slate-800 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
                2. HOW CONFIDENT IS THE MODEL?
              </span>
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="text-amber-800 font-bold">Low Confidence (Under 40%)</span>
                <span className="font-mono text-slate-600">{percent}% Similarity</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: `${percent}%` }} />
              </div>
            </div>

            {/* Question 3: What does that mean? */}
            <div className="p-4 rounded-xl bg-white border border-amber-200 text-slate-700 text-xs sm:text-sm space-y-2">
              <div className="font-bold text-slate-900 flex items-center gap-2">
                <Info className="w-4 h-4 text-amber-700 shrink-0" />
                <span>3. What does that mean?</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Rather than giving you an unreliable guess, DERMA 4 ALL stops when image quality or visual features are unclear. This commonly happens if:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs">
                <li>The photo was taken in dim lighting or with camera shake (slight blur).</li>
                <li>The camera was held too far away from the spot or shadow covered the area.</li>
                <li>The visual features on the skin are subtle or atypical.</li>
              </ul>
            </div>

            {/* Question 4: What should I do next? */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900 font-mono block">
                4. WHAT SHOULD I DO NEXT?
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={onAnalyzeAnother}
                  className="min-h-[48px] px-5 py-3 rounded-xl bg-amber-700 hover:bg-amber-800 active:bg-amber-900 text-white text-xs sm:text-sm font-semibold shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Take a Clearer Photo</span>
                </button>

                <button
                  onClick={onNavigateToDoctors}
                  className="min-h-[48px] px-5 py-3 rounded-xl bg-white border border-amber-300 hover:bg-amber-100/50 text-amber-950 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Stethoscope className="w-4 h-4 text-amber-700" />
                  <span>Dermatologist Care Guide</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* 2. NORMAL SCREENING RESULTS (Answers the 4 Questions with Total Clarity) */
        /* ========================================================================= */
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* THE 4 KEY QUESTIONS HERO CONTAINER */}
          <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs space-y-8">
            
            {/* ========================================================= */}
            {/* QUESTION 1: WHAT DID THE AI FIND? */}
            {/* ========================================================= */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-teal-800 text-white text-xs font-bold flex items-center justify-center shrink-0 font-mono">
                  1
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-800 font-mono">
                  WHAT DID THE AI FIND?
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-4 sm:p-5 rounded-2xl bg-teal-50/40 border border-teal-200/80">
                {/* User Photo Thumbnail with Zoom Toggle */}
                <div className="md:col-span-4 flex flex-col items-center">
                  <div
                    onClick={() => setIsPhotoZoomed(!isPhotoZoomed)}
                    className="relative aspect-square w-full max-w-[180px] rounded-xl overflow-hidden border border-slate-200 bg-slate-900 shadow-xs cursor-pointer group"
                    title="Click to toggle photo magnification"
                  >
                    <img
                      src={result.imageUrl}
                      alt="Skin photo analyzed by AI"
                      className={`w-full h-full object-cover transition-transform duration-300 ${
                        isPhotoZoomed ? 'scale-150' : 'group-hover:scale-105'
                      }`}
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-900/80 text-[10px] font-bold text-slate-200 font-mono">
                      Your Photo
                    </div>
                    <div className="absolute bottom-2 right-2 p-1 rounded bg-slate-900/80 text-white opacity-80 group-hover:opacity-100 transition-opacity">
                      <Eye className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1.5 font-medium">
                    {isPhotoZoomed ? 'Tap photo to zoom out' : 'Tap photo to zoom in'}
                  </span>
                </div>

                {/* Primary Finding Description */}
                <div className="md:col-span-8 space-y-2 text-left">
                  <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">
                    Closest Visual Pattern Match:
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    {result.topCondition}
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 pt-0.5">
                    {disease?.category && (
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white text-slate-700 border border-slate-300">
                        Category: {disease.category}
                      </span>
                    )}
                    {result.fitzpatrick && (
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-300 font-mono">
                        Fitzpatrick: Type {result.fitzpatrick.type}
                      </span>
                    )}
                    {result.dermoscopy?.isicRiskTier && (
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-300 font-mono">
                        ISIC: {result.dermoscopy.isicRiskTier}
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                    The vision model analyzed color distribution, surface borders, and visual texture in your photo and found patterns that most closely correlate with reference imagery of <strong>{result.topCondition}</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* ========================================================= */}
            {/* QUESTION 2: HOW CONFIDENT IS THE MODEL? */}
            {/* ========================================================= */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-teal-800 text-white text-xs font-bold flex items-center justify-center shrink-0 font-mono">
                  2
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-800 font-mono">
                  HOW CONFIDENT IS THE MODEL?
                </span>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <ConfidenceMeter
                  confidence={result.topConfidence}
                  size="lg"
                  showLabel
                  showExplanation
                />

                <div className="text-xs text-slate-600 leading-relaxed bg-white p-3 rounded-xl border border-slate-200/80">
                  <strong className="text-slate-900 block mb-0.5">Understanding this score:</strong>
                  The confidence percentage reflects visual pattern similarity with academic training datasets. It represents how typical the visual presentation appears — <strong>not the statistical chance that you have this illness</strong>.
                </div>
              </div>
            </div>

            {/* ========================================================= */}
            {/* QUESTION 3: WHAT DOES THAT MEAN? */}
            {/* ========================================================= */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-teal-800 text-white text-xs font-bold flex items-center justify-center shrink-0 font-mono">
                  3
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-800 font-mono">
                  WHAT DOES THAT MEAN?
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-white border-2 border-teal-700/20 text-slate-700 text-xs sm:text-sm space-y-3 shadow-2xs">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                      This is an educational screening estimate, not a medical diagnosis.
                    </h4>
                    <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
                      Dermatology is complex. Many common skin conditions (such as eczema, psoriasis, dermatitis, or insect bites) look very similar on camera. Even experienced specialists inspect the skin with physical touch, specialized lighting (dermoscopy), and personal medical history before determining a condition.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-slate-100 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-600">
                    <strong className="text-slate-800 block">Do Not Panic</strong>
                    <span>Most skin spots are benign, temporary, or easily manageable.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-600">
                    <strong className="text-slate-800 block">No Prescription</strong>
                    <span>Do not start new medications without doctor confirmation.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-600">
                    <strong className="text-slate-800 block">Human Check Needed</strong>
                    <span>Only a doctor can diagnose or prescribe medical treatment.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ========================================================= */}
            {/* QUESTION 4: WHAT SHOULD I DO NEXT? */}
            {/* ========================================================= */}
            <div className="space-y-4 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-teal-800 text-white text-xs font-bold flex items-center justify-center shrink-0 font-mono">
                  4
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-800 font-mono">
                  WHAT SHOULD I DO NEXT?
                </span>
              </div>

              {/* 3 Step Actionable Advice */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-900 font-bold flex items-center justify-center text-[10px]">
                      A
                    </span>
                    <strong className="text-slate-900">Review Educational Details</strong>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Read the symptoms and care tips in the section below to better describe your spot to a doctor.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-900 font-bold flex items-center justify-center text-[10px]">
                      B
                    </span>
                    <strong className="text-slate-900">Monitor for Changes</strong>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Take another photo in 7–14 days. Notice if the shape, color, diameter, or itching changes over time.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-900 font-bold flex items-center justify-center text-[10px]">
                      C
                    </span>
                    <strong className="text-slate-900">Get Professional Check</strong>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Schedule an in-person or telehealth visit with a dermatologist for definitive evaluation.
                  </p>
                </div>
              </div>

              {/* Dominant Primary Call to Action Bar */}
              <div className="p-4 sm:p-5 rounded-2xl bg-teal-900 text-white space-y-3 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      Ready for a human doctor's evaluation?
                    </h3>
                    <p className="text-xs text-teal-100 leading-relaxed max-w-xl">
                      Access verified specialist consultation guides, clinical triage protocols, and direct clinic contacts for personalized medical advice.
                    </p>
                  </div>

                  <button
                    id="results-primary-doctor-cta"
                    onClick={onNavigateToDoctors}
                    className="min-h-[48px] px-6 py-3 rounded-xl bg-white text-teal-950 hover:bg-teal-50 font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer transform hover:-translate-y-0.5"
                  >
                    <Stethoscope className="w-4 h-4 text-teal-800" />
                    <span>Specialist Directory & Guide</span>
                    <ArrowRight className="w-4 h-4 text-teal-800" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* PROGRESSIVE DISCLOSURE: DEEPER EDUCATIONAL REFERENCE */}
          {/* Sits comfortably below the primary answers so users aren't overwhelmed */}
          {/* ========================================================================= */}

          {/* 1. Condition Educational Reference Guide */}
          {disease && (
            <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
              <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-800 font-mono">
                    EDUCATIONAL GUIDE
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                    About {disease.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Peer-reviewed medical reference information for patient understanding.
                  </p>
                </div>
              </div>

              {/* Accordion Group */}
              <div className="space-y-2.5">
                {/* 1. Overview */}
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleSection('overview')}
                    className="w-full flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100/80 text-left font-bold text-xs sm:text-sm text-slate-900 cursor-pointer transition-colors"
                    aria-expanded={openSections.overview}
                  >
                    <span>Overview</span>
                    {openSections.overview ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                  </button>
                  {openSections.overview && (
                    <div className="p-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200 bg-white">
                      <p>{disease.description}</p>
                    </div>
                  )}
                </div>

                {/* 2. Common Symptoms */}
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleSection('symptoms')}
                    className="w-full flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100/80 text-left font-bold text-xs sm:text-sm text-slate-900 cursor-pointer transition-colors"
                    aria-expanded={openSections.symptoms}
                  >
                    <span>Common Symptoms</span>
                    {openSections.symptoms ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                  </button>
                  {openSections.symptoms && (
                    <div className="p-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200 bg-white">
                      <ul className="list-disc pl-5 space-y-1">
                        {disease.symptoms.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* 3. Possible Causes */}
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleSection('causes')}
                    className="w-full flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100/80 text-left font-bold text-xs sm:text-sm text-slate-900 cursor-pointer transition-colors"
                    aria-expanded={openSections.causes}
                  >
                    <span>Possible Causes</span>
                    {openSections.causes ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                  </button>
                  {openSections.causes && (
                    <div className="p-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200 bg-white">
                      <ul className="list-disc pl-5 space-y-1">
                        {disease.causes.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* 4. Risk Factors */}
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleSection('risk_factors')}
                    className="w-full flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100/80 text-left font-bold text-xs sm:text-sm text-slate-900 cursor-pointer transition-colors"
                    aria-expanded={openSections.risk_factors}
                  >
                    <span>Risk Factors</span>
                    {openSections.risk_factors ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                  </button>
                  {openSections.risk_factors && (
                    <div className="p-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200 bg-white">
                      <ul className="list-disc pl-5 space-y-1">
                        {disease.risk_factors.map((rf, i) => (
                          <li key={i}>{rf}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* 5. General Management */}
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleSection('management')}
                    className="w-full flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100/80 text-left font-bold text-xs sm:text-sm text-slate-900 cursor-pointer transition-colors"
                    aria-expanded={openSections.management}
                  >
                    <span>General Self-Care & Management</span>
                    {openSections.management ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                  </button>
                  {openSections.management && (
                    <div className="p-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200 bg-white space-y-2">
                      <ul className="list-disc pl-5 space-y-1">
                        {disease.general_management.map((m, i) => (
                          <li key={i}>{m}</li>
                        ))}
                      </ul>
                      <p className="text-[11px] text-slate-400 italic">
                        * Educational information only. Do not take prescription medicines without professional medical consultation.
                      </p>
                    </div>
                  )}
                </div>

                {/* 6. When to Seek Medical Care (Amber Highlighted) */}
                <div className="border border-amber-200 rounded-xl overflow-hidden bg-amber-50/50">
                  <button
                    type="button"
                    onClick={() => toggleSection('seek_care')}
                    className="w-full flex items-center justify-between p-3.5 bg-amber-100/60 hover:bg-amber-100 text-left font-bold text-xs sm:text-sm text-amber-950 cursor-pointer transition-colors"
                    aria-expanded={openSections.seek_care}
                  >
                    <span className="flex items-center gap-1.5">
                      <AlertOctagon className="w-4 h-4 text-amber-700" />
                      <span>When to Seek Immediate Medical Care</span>
                    </span>
                    {openSections.seek_care ? <ChevronUp className="w-4 h-4 text-amber-800" /> : <ChevronDown className="w-4 h-4 text-amber-800" />}
                  </button>
                  {openSections.seek_care && (
                    <div className="p-4 text-xs sm:text-sm text-amber-950 leading-relaxed border-t border-amber-200 bg-white">
                      <ul className="list-disc pl-5 space-y-1 text-amber-900">
                        {disease.when_to_seek_care.map((w, i) => (
                          <li key={i}>{w}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 2. Clinical Dataset Grounding & Calibration (HAM10000, ISIC, Fitzpatrick 17k, UEFS-20, DermNet NZ) */}
          <DatasetGroundingCard
            fitzpatrick={result.fitzpatrick}
            dermoscopy={result.dermoscopy}
            datasetGrounding={result.datasetGrounding}
            conditionName={result.topCondition}
          />

          {/* 3. Secondary Pattern Matches (Transparent Model Comparison) */}
          <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-slate-900">
                  Other Visual Patterns Considered
                </h3>
                <p className="text-xs text-slate-500">
                  Alternative categories evaluated by the vision pipeline
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsMultipleWhyExpanded(!isMultipleWhyExpanded)}
                className="text-xs font-semibold text-teal-800 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Why are other patterns listed?</span>
                {isMultipleWhyExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            {isMultipleWhyExpanded && (
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed animate-in fade-in duration-150">
                <p>
                  Because skin conditions share common visual symptoms like redness, flaking, or raised borders, our screening model computes similarity across several dermatological classes. These are <strong>alternative visual possibilities</strong>, not multiple simultaneous diseases.
                </p>
              </div>
            )}

            <div className="space-y-3 pt-1">
              {result.predictions.map((pred, idx) => {
                const pPercent = Math.round(pred.confidence * 100);
                const isPrimary = idx === 0;

                return (
                  <div
                    key={pred.condition + idx}
                    className={`p-3.5 rounded-xl border transition-colors ${
                      isPrimary
                        ? 'border-teal-300 bg-teal-50/40'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded font-mono ${
                          isPrimary ? 'bg-teal-800 text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {isPrimary ? 'Primary Match' : `Alternative #${idx + 1}`}
                        </span>
                        <span className="font-bold text-slate-900">{pred.condition}</span>
                      </div>
                      <span className="font-mono font-bold text-slate-700">{pPercent}% match</span>
                    </div>

                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden mt-2 border border-slate-200/60">
                      <div
                        className={`h-full rounded-full ${
                          isPrimary ? 'bg-teal-700' : 'bg-slate-400'
                        }`}
                        style={{ width: `${pPercent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Experimental Severity Badge (Contextual Safety) */}
          <div className="space-y-2">
            <SeverityBadge
              severity={result.severity.label}
              score={result.severity.score}
            />
          </div>
        </div>
      )}

      {/* Global Regulatory Medical Disclaimer */}
      <MedicalDisclaimerBanner />

      {/* STICKY BOTTOM ACTIONS FOR MOBILE (Minimum 48px Touch Targets) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 sm:hidden shadow-lg flex items-center justify-between gap-2.5">
        <button
          onClick={onAnalyzeAnother}
          className="flex-1 min-h-[48px] px-3 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <RefreshCw className="w-4 h-4 text-slate-600" />
          <span>New Photo</span>
        </button>

        <button
          onClick={onNavigateToDoctors}
          className="flex-1 min-h-[48px] px-3 rounded-xl bg-teal-800 hover:bg-teal-900 active:bg-slate-900 text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Stethoscope className="w-4 h-4 text-teal-200" />
          <span>Care Guide</span>
        </button>
      </div>
    </div>
  );
};
