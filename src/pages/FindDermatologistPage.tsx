import React, { useState } from 'react';
import {
  Stethoscope,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Printer,
  FileCheck,
  HelpCircle,
  Sparkles,
  ChevronRight,
  AlertOctagon,
  Calendar,
  Layers,
  Search,
  Eye,
  Microscope,
  RotateCcw,
  BookOpen,
} from 'lucide-react';
import { MedicalDisclaimerBanner } from '../components/MedicalDisclaimerBanner';

interface ChecklistItem {
  id: string;
  category: string;
  title: string;
  description: string;
  tip?: string;
}

const CONSULTATION_CHECKLIST: ChecklistItem[] = [
  // 1. Lesion History & Symptom Trajectory
  {
    id: 'onset-timeline',
    category: '1. Lesion History & Symptom Trajectory',
    title: 'Document Approximate Onset Date & Evolution',
    description: 'Note exactly when the rash, bump, or discoloration first appeared and whether it is expanding, darkening, fading, or cyclical.',
    tip: 'Example: "Started 3 weeks ago on left forearm as small bumps, merged into a 4cm dry plaque."',
  },
  {
    id: 'primary-sensation',
    category: '1. Lesion History & Symptom Trajectory',
    title: 'Record Primary Sensory Characteristics',
    description: 'Determine whether the area primarily itches (pruritus), burns, stings, throbs, is tender to touch, or is completely asymptomatic.',
    tip: 'Pruritus that worsens at night often correlates with atopic eczema or scabies; burning sensation points toward contact dermatitis or neuropathy.',
  },
  {
    id: 'identifiable-triggers',
    category: '1. Lesion History & Symptom Trajectory',
    title: 'Identify Specific Exposures & Aggravators',
    description: 'List any new personal care products, detergents, fragrances, occupational chemicals, jewelry (nickel), fabrics, pet dander, or intense sun exposure.',
    tip: 'Also note whether hot showers, cold dry air, sweating, or acute psychological stress trigger flare-ups.',
  },
  {
    id: 'prior-treatments',
    category: '1. Lesion History & Symptom Trajectory',
    title: 'Log Previous Treatments & Home Remedies Attempted',
    description: 'Write down all creams, herbal salves, essential oils, or OTC hydrocortisone you applied before the appointment and their effects.',
    tip: 'Crucial: Overusing OTC steroids can mask fungal infections (Tinea Incognito) or trigger steroid rosacea.',
  },

  // 2. Medication & Topical Product Inventory
  {
    id: 'prescription-meds',
    category: '2. Medication & Topical Product Inventory',
    title: 'List All Current Prescription Medications',
    description: 'Compile a full list of oral and injectable drugs, including blood pressure medications, biologics, immunosuppressants, and antibiotics.',
    tip: 'Drug-induced cutaneous eruptions (e.g. beta-blockers exacerbating psoriasis, antibiotics causing morbilliform rashes) are very common.',
  },
  {
    id: 'otc-supplements',
    category: '2. Medication & Topical Product Inventory',
    title: 'Inventory OTC Supplements & Skincare Products',
    description: 'Bring photos or the actual packaging of your daily cleanser, moisturizer, active serums (retinoids, AHA/BHA, vitamin C), and dietary supplements.',
    tip: 'High-dose Biotin (Vitamin B7) supplements can interfere with diagnostic thyroid and hormone laboratory blood tests.',
  },
  {
    id: 'drug-allergies',
    category: '2. Medication & Topical Product Inventory',
    title: 'Verify Known Allergies & Sensitivities',
    description: 'Document any known hypersensitivities to antibiotics, local anesthetics (e.g. lidocaine), surgical adhesive tapes, or latex.',
    tip: 'Alert the nursing staff immediately if a skin biopsy or minor dermatosurgical procedure is anticipated.',
  },

  // 3. Physical Skin Preparation
  {
    id: 'clean-skin-no-makeup',
    category: '3. Physical Skin Preparation (Day of Visit)',
    title: 'Arrive with Clean Skin Free of Cosmetic Concealers',
    description: 'Do not apply foundation, tinted sunscreen, bronzer, or heavy camouflage creams to the affected areas on the day of examination.',
    tip: 'Dermoscopy requires optical transparency to visualize subsurface pigment networks and microvascular architecture.',
  },
  {
    id: 'avoid-thick-ointments',
    category: '3. Physical Skin Preparation (Day of Visit)',
    title: 'Avoid Thick Opaque Ointments on the Lesion',
    description: 'Refrain from applying dense petroleum jelly, zinc oxide paste, or sticky salves within 3–4 hours of your appointment.',
    tip: 'Thick pastes obscure epidermal borders and make diagnostic scrapings or biopsies slippery and unreadable.',
  },
  {
    id: 'clean-nails-no-polish',
    category: '3. Physical Skin Preparation (Day of Visit)',
    title: 'Remove Nail Polish if Nails or Extremities are Involved',
    description: 'If you have nail pitting, discoloration, subungual hyperkeratosis, or hand rashes, remove nail polish before your consultation.',
    tip: 'Nail changes provide vital clues for systemic diseases like psoriasis, lichen planus, melanoma (Hutchinson sign), and alopecia.',
  },
  {
    id: 'comfortable-clothing',
    category: '3. Physical Skin Preparation (Day of Visit)',
    title: 'Wear Loose-Fitting, Easily Removable Clothing',
    description: 'Wear two-piece clothing that allows quick exposure of extensor/flexor creases or a complete head-to-toe full-body skin exam.',
    tip: 'Full-body skin exams (FBSE) are standard for patients with numerous moles, sun damage, or unexplained generalized rashes.',
  },

  // 4. Clinical History & Family Background
  {
    id: 'family-oncology-history',
    category: '4. Clinical History & Family Background',
    title: 'Review Family History of Melanoma & Skin Cancers',
    description: 'Note if any first-degree relative (parent, sibling, child) has had melanoma, dysplastic nevus syndrome, or non-melanoma skin cancer.',
    tip: 'A family history of melanoma significantly alters your screening risk tier and recommended surveillance interval.',
  },
  {
    id: 'atopic-autoimmune-history',
    category: '4. Clinical History & Family Background',
    title: 'Review Personal or Family History of Autoimmune & Atopic Disease',
    description: 'Document family occurrences of asthma, allergic rhinitis (hay fever), eczema (the atopic triad), psoriasis, vitiligo, or lupus.',
    tip: 'Genetic predispositions strongly guide medical decision-making toward targeted biologic or barrier-repair protocols.',
  },
  {
    id: 'photo-chronology',
    category: '4. Clinical History & Family Background',
    title: 'Prepare Chronological Smartphone Progress Photographs',
    description: 'Organize earlier photographs showing how the lesion looked when it began, during peak flares, and after prior treatments.',
    tip: 'Transient conditions like urticaria (hives) or drug eruptions may have faded by appointment day—photos are invaluable.',
  },
];

const CLINICAL_QUESTIONS = [
  {
    category: 'Diagnostic Clarity & Differentials',
    questions: [
      'What is your primary clinical diagnosis, and what other differential possibilities are you considering?',
      'Do you recommend performing a dermoscopic exam, skin scraping (KOH mount), or skin biopsy today?',
      'Are these skin changes isolated to the skin, or could they reflect an underlying internal or systemic condition?',
    ],
  },
  {
    category: 'Prescription & Therapeutics Strategy',
    questions: [
      'What is the mechanism of action of the prescribed treatment, and are there steroid-sparing alternatives (e.g. calcineurin or PDE4 inhibitors)?',
      'For topical corticosteroids: what is the exact potency, maximum consecutive days of application, and required rest period?',
      'What common side effects should I watch for, and what should I do if the condition flares upon stopping?',
    ],
  },
  {
    category: 'Prevention, Timeline & Follow-Up',
    questions: [
      'How many days or weeks of consistent therapy should I expect before observing measurable clinical improvement?',
      'What specific warning signs (e.g. pus, severe pain, spreading warmth) require immediate contact before my scheduled follow-up?',
      'What daily barrier repair products (cleanser pH, ceramide moisturizers, SPF 30+) are best suited for my skin phototype?',
    ],
  },
];

const EXAMINATION_PROCEDURES = [
  {
    name: 'Visual Gross Inspection',
    description: 'The dermatologist evaluates lesion distribution, bilateral symmetry, arrangement (annular, linear, clustered), and primary morphological features (macules, papules, plaques, vesicles).',
    icon: Eye,
  },
  {
    name: 'Dermoscopy (Surface Microscopy)',
    description: 'Using a high-precision polarized dermatoscope with 10x magnification, the doctor examines subsurface pigment networks, follicular structures, and microvascular blood vessel patterns without cutting the skin.',
    icon: Microscope,
  },
  {
    name: "Wood's Lamp Examination",
    description: 'Inspection under long-wave ultraviolet light (blacklight) detects characteristic fluorescence: coral-red in erythrasma, bright blue-white in vitiligo, or green in fungal tinea infections.',
    icon: Sparkles,
  },
  {
    name: 'Skin Scraping / KOH Preparation',
    description: 'A gentle scrape of superficial epidermal scales examined with potassium hydroxide solution under a microscope to instantly rule in or out fungal hyphae or mites (scabies).',
    icon: Layers,
  },
  {
    name: 'Diagnostic Cutaneous Biopsy',
    description: 'Under local lidocaine anesthesia, a tiny circular specimen (punch biopsy 3–4mm) or superficial shave is removed and sent to a dermatopathologist for definitive histological diagnosis.',
    icon: FileCheck,
  },
];

export const FindDermatologistPage: React.FC = () => {
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});
  const [activePrepTab, setActivePrepTab] = useState<'checklist' | 'triage' | 'procedures' | 'questions'>('checklist');

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleResetChecklist = () => {
    setCheckedIds({});
  };

  const handlePrint = () => {
    window.print();
  };

  const totalItems = CONSULTATION_CHECKLIST.length;
  const completedCount = Object.values(checkedIds).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalItems) * 100);

  // Group checklist items by category
  const categories = Array.from(new Set(CONSULTATION_CHECKLIST.map((item) => item.category)));

  return (
    <div id="find-dermatologist-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* 1. Header Banner */}
      <div className="space-y-3 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
          <Stethoscope className="w-3.5 h-3.5 text-teal-700" />
          <span>Patient Consultation & Clinical Care Guide</span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 font-sans">
          Dermatology Consultation &{' '}
          <span className="font-serif-clinical italic text-teal-800 font-normal">
            Care Preparation Guide
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Visiting a dermatologist is the most critical step toward definitive diagnosis and targeted prescription therapy. Use this interactive consultation toolkit, clinical triage guide, and examination checklist to ensure your appointment is thorough, productive, and medically rigorous.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors cursor-pointer shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Patient Checklist</span>
          </button>

          {completedCount > 0 && (
            <button
              onClick={handleResetChecklist}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>Reset Checklist ({completedCount}/{totalItems})</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. Medical Disclaimer */}
      <MedicalDisclaimerBanner variant="subtle" />

      {/* 3. Navigation Tabs */}
      <div className="border-b border-slate-200">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          <button
            onClick={() => setActivePrepTab('checklist')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activePrepTab === 'checklist'
                ? 'bg-teal-800 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Interactive Visit Checklist ({completedCount}/{totalItems})</span>
          </button>

          <button
            onClick={() => setActivePrepTab('triage')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activePrepTab === 'triage'
                ? 'bg-teal-800 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <AlertOctagon className="w-4 h-4" />
            <span>Clinical Triage: When to Seek Care</span>
          </button>

          <button
            onClick={() => setActivePrepTab('procedures')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activePrepTab === 'procedures'
                ? 'bg-teal-800 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Microscope className="w-4 h-4" />
            <span>What to Expect During Exam</span>
          </button>

          <button
            onClick={() => setActivePrepTab('questions')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activePrepTab === 'questions'
                ? 'bg-teal-800 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Questions to Ask Your Doctor</span>
          </button>
        </div>
      </div>

      {/* 4. Tab Content */}

      {/* TAB 1: ELABORATED INTERACTIVE CHECKLIST */}
      {activePrepTab === 'checklist' && (
        <section className="space-y-8 animate-in fade-in duration-150">
          {/* Progress Tracker Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-800 font-mono">
                  CONSULTATION READINESS PROGRESS
                </span>
                <h2 className="text-lg font-bold text-slate-900">
                  {completedCount === totalItems
                    ? '🎉 You Are Fully Prepared for Your Appointment!'
                    : `Completed ${completedCount} of ${totalItems} Preparation Steps (${progressPercent}%)`}
                </h2>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 self-start sm:self-auto">
                {progressPercent}% Complete
              </span>
            </div>

            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200">
              <div
                className="bg-teal-700 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-xs text-slate-500">
              Checking off each item organizes your clinical history, medications, and questions so your dermatologist has maximum context for an accurate diagnosis.
            </p>
          </div>

          {/* Checklist Categories */}
          {categories.map((catTitle) => {
            const items = CONSULTATION_CHECKLIST.filter((i) => i.category === catTitle);
            const categoryCompleted = items.filter((i) => checkedIds[i.id]).length;

            return (
              <div key={catTitle} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                    <span className="text-teal-800">{catTitle}</span>
                  </h3>
                  <span className="text-xs font-mono font-semibold text-slate-500">
                    {categoryCompleted}/{items.length} Ready
                  </span>
                </div>

                <div className="space-y-3 pt-1">
                  {items.map((item) => {
                    const isChecked = Boolean(checkedIds[item.id]);
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleCheck(item.id)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                          isChecked
                            ? 'bg-teal-50/50 border-teal-300 shadow-2xs'
                            : 'bg-slate-50/70 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}} // Handled by container onClick
                          className="w-5 h-5 rounded text-teal-700 focus:ring-teal-500 border-slate-300 mt-0.5 shrink-0 cursor-pointer"
                        />
                        <div className="space-y-1 flex-1">
                          <h4 className={`text-xs sm:text-sm font-bold ${isChecked ? 'text-teal-950 line-through' : 'text-slate-900'}`}>
                            {item.title}
                          </h4>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {item.description}
                          </p>
                          {item.tip && (
                            <div className="mt-1.5 p-2 rounded-lg bg-white/80 border border-slate-200/80 text-[11px] text-slate-500">
                              <span className="font-semibold text-teal-800">Clinical Tip: </span>
                              <span>{item.tip}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </section>
      )}

      {/* TAB 2: CLINICAL TRIAGE */}
      {activePrepTab === 'triage' && (
        <section className="space-y-6 animate-in fade-in duration-150">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-800 font-mono">
              CLINICAL TRIAGE PROTOCOL
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-1">
              When Should You Seek Immediate Evaluation?
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Dermatological conditions span from benign cosmetic annoyances to life-threatening emergencies. Use this triage matrix to determine appropriate care urgency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Level 1: Red Flag Emergency */}
            <div className="rounded-2xl bg-rose-50/80 border border-rose-200 p-6 space-y-4 shadow-xs">
              <div className="flex items-center gap-2 text-rose-900 font-bold text-xs uppercase tracking-wider font-mono">
                <AlertOctagon className="w-5 h-5 text-rose-700 shrink-0" />
                <span>Level 1: Emergency Triage</span>
              </div>
              <h3 className="text-base font-bold text-rose-950">Immediate ER or Same-Day Specialist</h3>
              <p className="text-xs text-rose-900 leading-relaxed font-medium">
                Seek urgent emergency hospital evaluation if you experience:
              </p>
              <ul className="text-xs text-rose-900 space-y-2 list-disc list-inside leading-relaxed">
                <li><strong>Systemic Signs:</strong> Sudden widespread rash with high fever (&gt;101°F/38.3°C), chills, confusion, or difficulty swallowing.</li>
                <li><strong>Mucosal Blistering:</strong> Painful blisters or erosion affecting lips, mouth, eyes, or genitals (concerning for Stevens-Johnson Syndrome / TEN).</li>
                <li><strong>Rapid Spreading Cellulitis:</strong> Red, warm, swollen skin expanding hourly with red streaks toward regional lymph nodes.</li>
                <li><strong>Eczema Herpeticum:</strong> Clustered, painful, punched-out vesicles in a patient with active atopic dermatitis.</li>
                <li><strong>Severe Purpura:</strong> Dark purple or non-blanching petechial spots that do not fade when pressed firmly under a clear glass.</li>
              </ul>
            </div>

            {/* Level 2: Urgent 1-2 Weeks */}
            <div className="rounded-2xl bg-amber-50/80 border border-amber-200 p-6 space-y-4 shadow-xs">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider font-mono">
                <Clock className="w-5 h-5 text-amber-700 shrink-0" />
                <span>Level 2: Urgent Consultation</span>
              </div>
              <h3 className="text-base font-bold text-amber-950">Schedule Within 1 to 2 Weeks</h3>
              <p className="text-xs text-amber-900 leading-relaxed font-medium">
                Book a prompt dermatological visit for:
              </p>
              <ul className="text-xs text-amber-900 space-y-2 list-disc list-inside leading-relaxed">
                <li><strong>Changing or Bleeding Mole:</strong> Any mole demonstrating asymmetry, irregular borders, multiple shades of brown/black, or diameter &gt;6mm (ABCDE criteria).</li>
                <li><strong>Non-Healing Lesion:</strong> A scab, ulcer, or pearly bump that bleeds, crusts over, and fails to resolve after 4 weeks (concerning for BCC/SCC).</li>
                <li><strong>Severe Inflammatory Flare:</strong> Disabling eczema or plaque psoriasis causing sleep loss, painful fissures, or occupational interference.</li>
                <li><strong>Painful Nodular Acne:</strong> Deep cystic nodules resistant to standard topical washes, threatening permanent ice-pick or keloid scarring.</li>
              </ul>
            </div>

            {/* Level 3: Routine & Maintenance */}
            <div className="rounded-2xl bg-teal-50/80 border border-teal-200 p-6 space-y-4 shadow-xs">
              <div className="flex items-center gap-2 text-teal-900 font-bold text-xs uppercase tracking-wider font-mono">
                <ShieldCheck className="w-5 h-5 text-teal-700 shrink-0" />
                <span>Level 3: Routine Care</span>
              </div>
              <h3 className="text-base font-bold text-teal-950">Routine & Preventive Care</h3>
              <p className="text-xs text-teal-900 leading-relaxed font-medium">
                Recommended for preventative long-term maintenance:
              </p>
              <ul className="text-xs text-teal-900 space-y-2 list-disc list-inside leading-relaxed">
                <li><strong>Annual Full-Body Skin Exam:</strong> Comprehensive baseline mole mapping and skin cancer screening for adults.</li>
                <li><strong>Chronic Relapsing Dermatoses:</strong> Routine maintenance check-ins for mild eczema, rosacea, or scalp seborrhea.</li>
                <li><strong>Persistent Warts or Keratoses:</strong> Evaluation of warty growths (seborrheic keratosis) for elective cryotherapy.</li>
                <li><strong>Barrier Optimization:</strong> Professional counseling on customized sun protection, retinoid introduction, and skincare regimens.</li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* TAB 3: PROCEDURES & WHAT TO EXPECT */}
      {activePrepTab === 'procedures' && (
        <section className="space-y-6 animate-in fade-in duration-150">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-800 font-mono">
              CLINICAL EXAMINATION PROTOCOLS
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-1">
              What Diagnostic Procedures Might Your Dermatologist Perform?
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Knowing what physical diagnostics may be conducted removes anxiety and helps you prepare comfortably for your consultation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {EXAMINATION_PROCEDURES.map((proc) => {
              const Icon = proc.icon;
              return (
                <div key={proc.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{proc.name}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{proc.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* TAB 4: QUESTIONS TO ASK */}
      {activePrepTab === 'questions' && (
        <section className="space-y-6 animate-in fade-in duration-150">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-800 font-mono">
              PATIENT ADVOCACY CHEATSHEET
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-1">
              Essential Questions to Ask During Your Consultation
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Consultations can feel rushed. Having these focused clinical questions written down ensures you leave with complete clarity on your diagnosis and treatment path.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CLINICAL_QUESTIONS.map((group) => (
              <div key={group.category} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
                <div className="pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-800 font-mono">
                    CATEGORY
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-0.5">{group.category}</h3>
                </div>
                <div className="space-y-3">
                  {group.questions.map((q, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="leading-relaxed font-medium text-slate-800">"{q}"</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
