import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  FileCheck,
  Microscope,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Sun,
  Camera,
  Clock,
  Focus,
  AlertCircle,
  Info,
  Stethoscope,
  HeartPulse,
  Activity,
  ShieldAlert,
  Smile,
  BookOpen,
} from 'lucide-react';
import { DEMO_SAMPLES } from '../data/demoSamples';
import { DisclaimerModal } from '../components/DisclaimerModal';
import logoImage from '../assets/images/dermascan_logo_1788579032229.jpg';

interface Props {
  onNavigate: (tab: string, sampleId?: string) => void;
  onSelectSampleToAnalyze: (sampleId: string) => void;
}

export const HomePage: React.FC<Props> = ({ onNavigate, onSelectSampleToAnalyze }) => {
  const [isDisclaimerModalOpen, setIsDisclaimerModalOpen] = useState(false);
  const [isTipsExpanded, setIsTipsExpanded] = useState(false);

  const handleScrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const steps = [
    {
      stage: '01',
      title: 'Upload or Capture',
      desc: 'Take or choose a clear, well-lit photo of the skin area on your phone or computer.',
      icon: Camera,
    },
    {
      stage: '02',
      title: 'Review Image Quality',
      desc: 'Our pre-check verifies lighting and sharpness so you know if your photo is clear enough.',
      icon: Focus,
    },
    {
      stage: '03',
      title: 'AI Pattern Screening',
      desc: 'The calibrated vision model compares visual morphology against benchmark clinical databases.',
      icon: Microscope,
    },
    {
      stage: '04',
      title: 'Clinical Guidance & Triage',
      desc: 'Review educational condition guides, triage recommendations, and consult verified specialists.',
      icon: Stethoscope,
    },
  ];

  const whatYouNeed = [
    { icon: Camera, label: 'Clear skin photo', desc: 'In-focus close-up' },
    { icon: Sun, label: 'Good lighting', desc: 'Natural light is ideal' },
    { icon: Focus, label: 'Affected area centered', desc: 'Visible borders' },
    { icon: Clock, label: 'A few seconds', desc: 'Fast screening' },
  ];

  const dailyLifeReasons = [
    {
      icon: ShieldCheck,
      badge: 'Physical Defense',
      title: "Your Body's 20-Sq-Ft Protective Armor",
      desc: "Your skin is your body's largest organ. It protects internal organs against environmental toxins, microbial pathogens, extreme temperatures, and harmful UV radiation. Proper dermatologist knowledge preserves this barrier, preventing recurrent infections, moisture loss, and chronic inflammatory flares.",
    },
    {
      icon: HeartPulse,
      badge: 'Early Detection',
      title: 'Early Detection Directly Saves Lives',
      desc: 'Skin malignancies like Melanoma, Basal Cell Carcinoma (BCC), and Squamous Cell Carcinoma (SCC) have a >99% 5-year survival rate when identified early. Knowing dermatological warning signs (ABCDE criteria) and consulting a specialist transforms potentially fatal cancers into straightforward outpatient recoveries.',
    },
    {
      icon: Activity,
      badge: 'Systemic Health',
      title: 'Skin as a Window into Internal Diseases',
      desc: 'Cutaneous symptoms are often the very first clinical manifestations of systemic disorders—including Type 2 diabetes (acanthosis nigricans), lupus, thyroid disease, celiac disease, and autoimmune conditions. Dermatologists recognize these signs long before internal complications escalate.',
    },
    {
      icon: ShieldAlert,
      badge: 'Preventing Harm',
      title: 'Stopping Dangerous DIY & OTC Misuse',
      desc: 'Unsupervised home remedies, harsh acids, or improper hydrocortisone use frequently cause Topical Steroid Withdrawal (TSW), severe rebound flares, skin thinning, and permanent scarring. Dermatologist guidance ensures targeted, evidence-based therapies rather than viral misinformation.',
    },
    {
      icon: Smile,
      badge: 'Daily Living',
      title: 'Daily Quality of Life, Sleep & Mental Health',
      desc: 'Chronic conditions like eczema, psoriasis, acne, and rosacea inflict persistent itching (pruritus), physical pain, sleep deprivation, and psychological distress. Evidence-based clinical management directly restores skin comfort, restorative sleep, and everyday personal confidence.',
    },
    {
      icon: Sun,
      badge: 'Lifelong Prevention',
      title: 'Everyday Prevention & Photoprotection',
      desc: 'Over 80% of preventable premature skin aging and skin cancers stem from cumulative daily ultraviolet exposure. Dermatological guidance empowers you with proper daily broad-spectrum SPF 30+ application, syndet cleansing, and habit tracking to safeguard your skin for decades to come.',
    },
  ];

  return (
    <div id="home-page-container" className="space-y-16 pb-20">
      {/* Disclaimer Modal */}
      <DisclaimerModal
        isOpen={isDisclaimerModalOpen}
        onClose={() => setIsDisclaimerModalOpen(false)}
        onNavigateToFullDisclaimer={() => onNavigate('disclaimer')}
      />

      {/* 1. HERO SECTION */}
      <section className="relative pt-6 sm:pt-10 pb-12 sm:pb-16 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold">
                <div className="w-4 h-4 rounded-full overflow-hidden border border-slate-300 bg-white shrink-0">
                  <img
                    src={logoImage}
                    alt="DERMA 4 ALL Logo"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform scale-110"
                  />
                </div>
                <span>DERMA 4 ALL • Clinical Screening & Care Guide</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-slate-900 leading-[1.18] font-sans">
                  AI-Assisted Skin Screening &{' '}
                  <span className="font-serif-clinical italic text-teal-800 font-normal">
                    Dermatology Care Guide
                  </span>
                </h1>

                <p className="text-base text-slate-600 leading-relaxed max-w-2xl font-normal">
                  Upload a skin image to receive an instant educational screening estimate, understand visual patterns in plain language, and access verified dermatologist consultation guides and clinical triage for daily skin health.
                </p>
              </div>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <button
                  id="hero-primary-analyze-btn"
                  onClick={() => onNavigate('analyze')}
                  className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-teal-800 hover:bg-teal-900 active:bg-slate-900 text-white font-semibold text-sm shadow-md transition-all cursor-pointer transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-4 h-4 text-teal-200" />
                  <span>Analyze Skin Image</span>
                  <ArrowRight className="w-4 h-4 text-teal-200" />
                </button>

                <button
                  id="hero-secondary-doctor-btn"
                  onClick={() => onNavigate('doctors')}
                  className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-300 text-slate-800 font-semibold text-sm shadow-2xs transition-colors cursor-pointer"
                >
                  <Stethoscope className="w-4 h-4 text-teal-700" />
                  <span>Dermatologist Guide</span>
                </button>

                <button
                  onClick={handleScrollToHowItWorks}
                  className="flex items-center gap-1.5 px-4 py-3.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4 text-slate-400" />
                  <span>How does it work?</span>
                </button>
              </div>

              {/* Small Trust Section near Primary CTA */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 pt-1 font-medium">
                <span className="flex items-center gap-1 text-teal-900 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-700" />
                  AI-assisted
                </span>
                <span>•</span>
                <span>Educational screening</span>
                <span>•</span>
                <span>Dermatologist consultation recommended</span>
              </div>

              {/* Short, Friendly Safety Notice with "Learn more" */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs flex items-center justify-between gap-3 max-w-xl shadow-2xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0" />
                  <span>
                    Results are educational screening estimates, <strong>not medical diagnoses</strong>.
                  </span>
                </div>
                <button
                  onClick={() => setIsDisclaimerModalOpen(true)}
                  className="font-bold text-teal-800 hover:underline shrink-0 cursor-pointer"
                >
                  Learn more
                </button>
              </div>
            </div>

            {/* Hero Right Visual: Authentic Clinical Inspection Dossier */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md rounded-2xl bg-white p-5 shadow-sm border border-slate-200">
                {/* Clinical Header Bar */}
                <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center font-bold border border-teal-200">
                      <Microscope className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 tracking-tight">
                        Interactive Screening Preview
                      </h4>
                      <p className="text-[10px] text-slate-500 font-mono">
                        CASE: #DS-4910 • CALIBRATED REFERENCE
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-50 text-teal-800 border border-teal-200 font-mono">
                    SAMPLE CASE
                  </span>
                </div>

                {/* Real Specimen Presentation */}
                <div className="relative my-3.5 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                  <div className="aspect-16/9 w-full relative">
                    <img
                      src={DEMO_SAMPLES[0].sampleImageUrl}
                      alt="Clinical specimen: Atopic Dermatitis"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-slate-900/80 backdrop-blur-xs text-[9px] font-mono text-slate-200 flex items-center gap-1.5">
                      <span className="inline-block w-5 h-0.5 bg-white" />
                      <span>Optical Reticle 10mm</span>
                    </div>

                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-white/90 backdrop-blur-xs text-[10px] font-bold text-slate-800 shadow-2xs">
                      Phototype II
                    </div>
                  </div>
                </div>

                {/* Structured ABCDE Dermatological Heuristics */}
                <div className="space-y-2 py-2 border-y border-slate-100 text-xs">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold uppercase tracking-wider pb-0.5">
                    <span>Pattern Recognition</span>
                    <span className="text-teal-800 font-bold">Possible Match</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2 rounded bg-slate-50 border border-slate-200/80">
                      <span className="font-bold text-slate-800 block">Visual Texture:</span>
                      <span className="text-slate-600">Bilateral Erythematous</span>
                    </div>
                    <div className="p-2 rounded bg-slate-50 border border-slate-200/80">
                      <span className="font-bold text-slate-800 block">Border Margins:</span>
                      <span className="text-slate-600">Ill-defined, Non-ulcerative</span>
                    </div>
                  </div>

                  <div className="pt-1 flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">Atopic Dermatitis (Eczema)</span>
                    <span className="font-mono font-bold text-teal-800">82% Confidence</span>
                  </div>

                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                    <div className="bg-teal-700 h-full rounded-full w-[82%]" />
                  </div>
                </div>

                {/* Guidance Footer */}
                <div className="pt-2.5 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                    <span>Good lighting & clarity</span>
                  </span>
                  <button
                    onClick={() => onSelectSampleToAnalyze('sample-eczema')}
                    className="text-teal-800 font-bold hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span>Try This Sample</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHY DERMATOLOGIST CARE IS ESSENTIAL FOR DAY-TO-DAY LIFE (User Request) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-linear-to-b from-teal-900 via-slate-900 to-slate-950 p-6 sm:p-10 lg:p-12 text-white shadow-xl space-y-10 border border-teal-800/40 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

          {/* Section Header */}
          <div className="max-w-3xl space-y-3 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-800/60 border border-teal-500/30 text-teal-200 text-xs font-semibold font-mono uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5 text-teal-300" />
              <span>CLINICAL SIGNIFICANCE IN DAILY LIFE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white font-sans leading-tight">
              Why Dermatologist Information is Essential for{' '}
              <span className="font-serif-clinical italic text-teal-300 font-normal">
                Day-to-Day Life
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Your skin is not just cosmetic—it is your body's largest organ, your first line of immunological defense, and a real-time window into your internal health. Understanding dermatological care transforms how you protect yourself and your family every single day.
            </p>
          </div>

          {/* 6 Key Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {dailyLifeReasons.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl bg-white/5 border border-white/10 p-5 sm:p-6 hover:bg-white/10 transition-colors space-y-3 backdrop-blur-xs flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/30 text-teal-300 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-teal-200 border border-white/10">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white tracking-tight">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Action / Insight Banner */}
          <div className="rounded-2xl bg-teal-950/80 border border-teal-700/50 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0">
                <Stethoscope className="w-5 h-5" />
              </div>
              <p className="text-xs sm:text-sm text-slate-200">
                <strong className="text-white">1 in 3 individuals</strong> faces an active skin condition at any given moment. Prioritizing skin knowledge is proactive daily healthcare.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => onNavigate('doctors')}
                className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 active:bg-teal-600 text-slate-950 font-bold text-xs shadow-md transition-colors cursor-pointer"
              >
                Specialist Guide
              </button>
              <button
                onClick={() => onNavigate('analyze')}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-colors cursor-pointer"
              >
                Screen Skin Image
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. COMPACT "WHAT YOU'LL NEED" SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800 font-mono">
                SIMPLE PREPARATION
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                What You'll Need to Begin
              </h2>
            </div>
            <button
              onClick={() => setIsTipsExpanded(!isTipsExpanded)}
              className="text-xs font-semibold text-teal-800 hover:text-teal-900 flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <span>{isTipsExpanded ? 'Hide Photo Tips' : 'Before You Start: Photo Tips'}</span>
              {isTipsExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* 4 Simple Requirement Cards with Icons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-5">
            {whatYouNeed.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-800 border border-teal-200 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">{item.label}</h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Expandable "Before You Start" Photo Tips */}
          {isTipsExpanded && (
            <div className="mt-5 pt-5 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600 animate-in fade-in duration-200">
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">1. Focus & Distance</span>
                <p>Hold your camera 4 to 6 inches away so the lesion fills the frame without motion blur.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">2. Natural Lighting</span>
                <p>Avoid harsh camera flash or heavy shadows. Indirect daylight gives the best color accuracy.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">3. Clean Skin Surface</span>
                <p>Ensure the area is free of thick ointments, makeup, or strong filters that alter texture.</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. DEMO QUICK-TRY PRESETS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200 mb-2 font-mono">
                SAMPLE CASES
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Try Sample Skin Conditions
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl">
                Don't have a photo ready? Select one of our curated academic reference cases to see how the screening report and clinical specialist routing work.
              </p>
            </div>
            <button
              onClick={() => onNavigate('analyze')}
              className="text-xs font-semibold text-teal-800 hover:text-teal-900 flex items-center gap-1 cursor-pointer shrink-0"
            >
              <span>Upload Custom Photo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {DEMO_SAMPLES.map((sample) => (
              <div
                key={sample.id}
                onClick={() => onSelectSampleToAnalyze(sample.id)}
                className="group relative rounded-xl border border-slate-200 bg-white hover:border-teal-700 p-3 flex flex-col transition-all cursor-pointer shadow-2xs hover:shadow-xs"
              >
                <div className="aspect-square rounded-lg overflow-hidden bg-slate-100 mb-2 relative border border-slate-200">
                  <img
                    src={sample.sampleImageUrl}
                    alt={sample.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                  <span
                    className={`absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[9px] font-bold font-mono ${
                      sample.isLowConfidenceSample
                        ? 'bg-amber-700 text-white'
                        : 'bg-slate-900/85 text-white'
                    }`}
                  >
                    {Math.round(sample.expectedConfidence * 100)}%
                  </span>
                </div>

                <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-0.5">
                  {sample.category}
                </span>
                <h4 className="text-xs font-bold text-slate-900 line-clamp-1 group-hover:text-teal-800 transition-colors">
                  {sample.title}
                </h4>
                <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5 mb-2">
                  {sample.expectedCondition}
                </p>

                <div className="mt-auto pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] font-semibold text-slate-600 group-hover:text-teal-800">
                  <span>Examine Specimen</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS SECTION */}
      <section id="how-it-works-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-800 font-mono">
            HOW IT WORKS
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 tracking-tight">
            A Simple, 4-Step Journey
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Engineered to guide you smoothly from image intake through to professional consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.stage}
                className="relative rounded-2xl bg-white border border-slate-200 p-5 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-800 border border-teal-200 flex items-center justify-center font-bold">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      STEP {step.stage}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1.5">{step.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. RESPONSIBLE DESIGN HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-teal-800" />
              <h3 className="font-bold text-slate-900 text-base">Academic Research & Safety Standards</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              DERMA 4 ALL is a research screening platform exploring multimodal computer vision and low-confidence fail-safes. We actively route every screening to qualified human healthcare specialists.
            </p>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => onNavigate('about')}
              className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium text-xs sm:text-sm transition-colors cursor-pointer"
            >
              Methodology & Limits
            </button>
            <button
              onClick={() => onNavigate('analyze')}
              className="px-5 py-2.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
            >
              Start Skin Analysis
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
