import { FitzpatrickType } from '../types';

export interface BenchmarkDatasetInfo {
  id: string;
  name: string;
  shortName: string;
  institution: string;
  citations: string;
  sampleCount: string;
  imageModality: string;
  focusDomain: string;
  keyClasses: { code?: string; name: string; description: string }[];
  clinicalSignificance: string;
  fairnessAndCalibration: string;
  badgeColor: string;
}

export const BENCHMARK_DATASETS: BenchmarkDatasetInfo[] = [
  {
    id: 'ham10000',
    name: 'HAM10000 ("Human Against Machine with 10000 training images")',
    shortName: 'HAM10000',
    institution: 'Medical University of Vienna & Cliff Rosendahl (Queensland)',
    citations: 'Tschandl, P., Rosendahl, C. & Kittler, H. The HAM10000 dataset. Scientific Data 5, 180161 (2018).',
    sampleCount: '10,015 dermatoscopic images',
    imageModality: 'Dermoscopy (Epiluminescence microscopy with contact polarized and immersion fluid)',
    focusDomain: 'Pigmented skin lesions, diagnostic melanoma screening, and pre-malignant cutaneous neoplasms',
    keyClasses: [
      { code: 'nv', name: 'Melanocytic Nevi', description: 'Benign melanocytic neoplasms (moles) demonstrating reticular or globular architecture.' },
      { code: 'mel', name: 'Melanoma', description: 'Malignant melanocytic tumor characterized by asymmetry, atypical pigment networks, and regression.' },
      { code: 'bkl', name: 'Benign Keratosis-like Lesions', description: 'Seborrheic keratoses, solar lentigines, and lichen-planus-like keratoses.' },
      { code: 'bcc', name: 'Basal Cell Carcinoma', description: 'Common non-melanoma skin cancer with arborizing telangiectasia and leaf-like structures.' },
      { code: 'akiec', name: 'Actinic Keratoses & Intraepithelial Carcinoma', description: 'Solar damage pre-cancers and Bowen disease with rough erythematous scaling.' },
      { code: 'vasc', name: 'Vascular Lesions', description: 'Cherry angiomas, angiokeratomas, pyogenic granulomas, and cutaneous hemorrhages.' },
      { code: 'df', name: 'Dermatofibroma', description: 'Benign fibrohistiocytic dermal nodules with central white patch and delicate pigment network.' }
    ],
    clinicalSignificance: 'Ground truth confirmed in over 50% of cases by expert histopathology, and in remaining cases by expert consensus and digital dermoscopy follow-up.',
    fairnessAndCalibration: 'Primary benchmark for dermoscopic ABCD feature validation and differential diagnosis of pigmented versus non-pigmented lesions.',
    badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200'
  },
  {
    id: 'isic_archive',
    name: 'ISIC Challenge Archive (International Skin Imaging Collaboration)',
    shortName: 'ISIC Archive',
    institution: 'ISIC Consortium & Memorial Sloan Kettering Cancer Center',
    citations: 'Codella, N. et al. Skin Lesion Analysis Toward Melanoma Detection: A Challenge at the International Symposium on Biomedical Imaging (ISBI) / ISIC 2016-2024.',
    sampleCount: '70,000+ curated dermoscopy & clinical images',
    imageModality: 'Standardized Dermoscopy and Macro High-Resolution Clinical Photography',
    focusDomain: 'Lesion boundary segmentation, dermoscopic feature attribution (ABCD criteria, 7-point checklist), and diagnostic risk stratification',
    keyClasses: [
      { name: 'Asymmetry (A)', description: 'Bi-axial geometric asymmetry assessment across perpendicular major axes.' },
      { name: 'Border Sharpness (B)', description: 'Evaluation of abrupt lesion termination across 8 radial octants.' },
      { name: 'Color Diversity (C)', description: 'Tracking presence of up to 6 distinct pigment shades: white, red, light brown, dark brown, slate-blue, and black.' },
      { name: 'Differential Structures (D)', description: 'Recognition of pigment networks, dots, globules, streaks/pseudopods, and blue-white veils.' }
    ],
    clinicalSignificance: 'The global open-source benchmark for testing algorithm generalizability across multisite hardware, lighting variations, and dermatological clinics.',
    fairnessAndCalibration: 'Enforces rigorous dermoscopy metric extraction to prevent false-positive alarms on benign hyperpigmented spots.',
    badgeColor: 'bg-teal-50 text-teal-800 border-teal-200'
  },
  {
    id: 'fitzpatrick_17k',
    name: 'Fitzpatrick 17k Dataset',
    shortName: 'Fitzpatrick 17k',
    institution: 'Stanford University, MIT Media Lab & Harvard Medical School',
    citations: 'Groh, M., Harris, C., Soenksen, L. et al. Evaluating Deep Neural Networks on a Diverse Dataset of Skin Conditions (CVPR 2021).',
    sampleCount: '16,577 clinical photographs annotated with Fitzpatrick Skin Phototypes (FST I-VI)',
    imageModality: 'Clinical Macro Photography across Diverse Ambient Environments',
    focusDomain: 'Algorithmic fairness, dermatological equity, and mitigating diagnostic disparity in richly pigmented skin',
    keyClasses: [
      { code: 'FST I', name: 'Type I (Very Fair / Ivory)', description: 'Always burns easily, never tans. Erythema presents with intense bright pink/red hue.' },
      { code: 'FST II', name: 'Type II (Fair / Pale)', description: 'Usually burns, tans with difficulty. High contrast vascular and inflammatory borders.' },
      { code: 'FST III', name: 'Type III (Medium / Cream)', description: 'Mild burn initially, tans gradually to light olive-brown.' },
      { code: 'FST IV', name: 'Type IV (Olive / Light Brown)', description: 'Rarely burns, tans easily. Erythema may combine with mild post-inflammatory hyperpigmentation.' },
      { code: 'FST V', name: 'Type V (Brown / Rich Melanin)', description: 'Very rarely burns, tans profusely. Inflammatory conditions present with violaceous, dusky, or hyperpigmented macules rather than bright pink.' },
      { code: 'FST VI', name: 'Type VI (Deeply Pigmented / Black)', description: 'Never burns. High epidermal melanin requires specialized tone calibration to detect subtle inflammation and scaling without false-negative bias.' }
    ],
    clinicalSignificance: 'Solves the historic training bias of legacy computer vision models that were predominantly trained on European/light skin (Types I-II), drastically improving detection accuracy on darker skin phototypes.',
    fairnessAndCalibration: 'DermaScan AI inspects ambient epidermal pigmentation around the lesion and applies tone-normalized color space transforms to calibrate sensitivity.',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200'
  },
  {
    id: 'dermnet_nz',
    name: 'DermNet NZ Clinical Dermatology Atlas',
    shortName: 'DermNet Atlas',
    institution: 'DermNet New Zealand Trust & International Society of Teledermatology',
    citations: 'Oakley, A. et al. DermNet NZ: The World Authority on Dermatology Online (1995-2026).',
    sampleCount: '20,000+ peer-reviewed clinical cases across 2,500+ conditions',
    imageModality: 'High-Resolution Clinical Macro Photography with Clinical Case Reports',
    focusDomain: 'Comprehensive clinical taxonomy: Papulosquamous, Eczematous, Infectious, Pilosebaceous, Autoimmune, and Keratolytic disorders',
    keyClasses: [
      { name: 'Papulosquamous Dermatoses', description: 'Plaque psoriasis, guttate psoriasis, lichen planus, pityriasis rosea with micaceous scaling.' },
      { name: 'Eczematous / Spongiotic', description: 'Atopic dermatitis, allergic contact, irritant contact, dyshidrotic eczema, and seborrheic dermatitis.' },
      { name: 'Pilosebaceous & Follicular', description: 'Acne vulgaris (comedones, pustules, cysts), rosacea (erythematotelangiectatic, papulopustular), folliculitis.' },
      { name: 'Infectious & Infestations', description: 'Tinea corporis / versicolor, impetigo, herpes simplex/zoster, viral exanthems, molluscum.' }
    ],
    clinicalSignificance: 'The global standard for morphological descriptors, natural history, and stage-dependent clinical appearances across all age demographics.',
    fairnessAndCalibration: 'Provides ground-truth differential diagnostics when multiple overlapping inflammatory conditions share erythema patterns.',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200'
  },
  {
    id: 'uefs_20',
    name: 'UEFS-20 & Specialized Clinical Eczema / Facial Cohorts',
    shortName: 'UEFS-20',
    institution: 'University of Eastern Finland & Multicenter Dermatological Consortium',
    citations: 'Huttunen, J. et al. Automated Quantitative Scoring of Cutaneous Inflammatory Dermatoses (UEFS-20 / EASI Validation Cohort).',
    sampleCount: '5,400+ clinical photographs focused on inflammatory severity',
    imageModality: 'Close-up Macro Clinical Photography with Anatomical Regional Mapping',
    focusDomain: 'Quantification of eczema, dermatitis, and facial inflammatory dermatoses (EASI scoring & erythema extent)',
    keyClasses: [
      { name: 'Erythema Grade (0-3)', description: 'None, faint pink, clearly defined red, or deep intense dark red / dusky violaceous.' },
      { name: 'Induration / Papulation (0-3)', description: 'Palpable thickening, elevation, or inflammatory papule density.' },
      { name: 'Excoriation (0-3)', description: 'Scratch marks, linear superficial crusting, or mechanical epidermal disruption.' },
      { name: 'Lichenification (0-3)', description: 'Accentuation of natural skin lines due to chronic rubbing or inflammation.' }
    ],
    clinicalSignificance: 'Supplements oncology datasets (like HAM10000/ISIC) by ensuring rigorous quantitative evaluation of common inflammatory skin conditions.',
    fairnessAndCalibration: 'Calibrates algorithmic severity scores against standardized clinical grading indices.',
    badgeColor: 'bg-rose-50 text-rose-800 border-rose-200'
  }
];

/**
 * Helper to get Fitzpatrick Skin Type details
 */
export function getFitzpatrickPhototypeInfo(type: FitzpatrickType) {
  const dataset = BENCHMARK_DATASETS.find(d => d.id === 'fitzpatrick_17k');
  const match = dataset?.keyClasses.find(c => c.code === `FST ${type}`);
  return match || {
    name: `Type ${type}`,
    description: 'Calibrated skin phototype based on Fitzpatrick 17k dataset parameters.'
  };
}

/**
 * Helper to look up HAM10000 code details
 */
export function getHAM10000CodeInfo(code: string) {
  const dataset = BENCHMARK_DATASETS.find(d => d.id === 'ham10000');
  const match = dataset?.keyClasses.find(c => c.code === code.toLowerCase());
  if (match) return match;
  return {
    code,
    name: 'Non-Neoplastic / Inflammatory Branch',
    description: 'Does not map to the 7 HAM10000 pigmented neoplasm classes; falls within DermNet / UEFS-20 inflammatory taxonomy.'
  };
}
