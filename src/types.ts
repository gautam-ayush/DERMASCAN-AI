/**
 * DermaScan AI - Core TypeScript Types & Interfaces
 * Academic/Research Prototype for AI-Assisted Skin Condition Screening
 */

export type SeverityLevel = 'Low' | 'Moderate' | 'High' | 'Indeterminate';

export interface Prediction {
  condition: string;
  slug?: string;
  confidence: number; // 0.0 to 1.0
  category?: string;
  descriptionSnippet?: string;
}

export interface SeverityEstimate {
  label: SeverityLevel;
  score: number; // 0.0 to 1.0
  confidenceNotes?: string;
}

export interface ImageQualityReport {
  acceptable: boolean;
  blurScore: number; // 0 to 1, higher = sharper
  brightnessScore: number; // 0 to 1, ~0.5 is optimal
  resolutionScore: number; // 0 to 1
  skinRegionLikelihood: number; // 0 to 1
  warnings: string[];
  recommendation: string;
}

export interface DiseaseInfo {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  symptoms: string[];
  causes: string[];
  risk_factors: string[];
  prevention: string[];
  general_management: string[];
  when_to_seek_care: string[];
  warning_signs: string[];
  sources: string[];
  typicalSeverity: SeverityLevel;
}

export type FitzpatrickType = 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI';

export interface FitzpatrickEvaluation {
  type: FitzpatrickType;
  label: string;
  toneCategory: string;
  melaninDensity: 'Low' | 'Moderate' | 'High' | 'Very High';
  erythemaCharacteristics: string;
  biasMitigationApplied: boolean;
  calibrationNote: string;
}

export interface DermoscopyABCD {
  asymmetryScore: 0 | 1 | 2; // 0 = Symmetric, 1 = 1-axis asymmetry, 2 = 2-axis asymmetry
  borderIrregularity: number; // 0-8 segments
  colorCount: number; // 1-6 distinct color tones
  colorPaletteDetected: string[];
  structuresDetected: string[];
  isicRiskTier: 'Benign Pattern / Low Risk' | 'Equivocal / Close Follow-Up' | 'Atypical / Clinical Exam Indicated';
  dermoscopyScoreTotal?: number;
}

export interface DatasetGrounding {
  ham10000Match: {
    classCode: 'nv' | 'mel' | 'bkl' | 'bcc' | 'akiec' | 'vasc' | 'df' | 'inflammatory_non_neoplastic';
    className: string;
    morphologicalCorrelation: string;
  };
  isicArchiveCorrelation: {
    challengeCategory: string;
    keyDermoscopicFeature: string;
    benchmarkComparison: string;
  };
  fitzpatrick17kAlignment: {
    phototype: FitzpatrickType;
    skinToneCalibration: string;
    fairnessAdjustedConfidence: number;
  };
  dermnetCategory: {
    atlasSection: string;
    clinicalEntity: string;
  };
  uefs20Correlation?: {
    morphologyIndex: string;
    clinicalPattern: string;
  };
}

export interface AnalysisResult {
  id: string;
  timestamp: string;
  imageUrl: string;
  predictions: Prediction[];
  topCondition: string;
  topConfidence: number;
  severity: SeverityEstimate;
  quality: ImageQualityReport;
  isLowConfidence: boolean;
  conditionDetails?: DiseaseInfo;
  sourceMode: 'live_ai' | 'demo_model' | 'mock_simulation';
  processingTimeMs?: number;
  fitzpatrick?: FitzpatrickEvaluation;
  dermoscopy?: DermoscopyABCD;
  datasetGrounding?: DatasetGrounding;
}

export interface DoctorClinic {
  id: string;
  name: string;
  doctorName?: string;
  clinicType: string;
  address: string;
  city: string;
  distance?: string;
  distanceKm?: number;
  rating: number;
  reviewCount: number;
  phone: string;
  website: string;
  openNow: boolean;
  hours: string;
  latitude: number;
  longitude: number;
  acceptsNewPatients?: boolean;
  telehealthAvailable?: boolean;
  isDemoData?: boolean;
  isVerifiedGoogleEntity?: boolean;
  specialties?: string[];
  notes?: string;
  googleSearchUrl?: string;
  googleMapsUrl?: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface SearchLocation {
  query: string;
  coordinates?: Coordinates;
  displayName: string;
}

export interface DemoSample {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  sampleImageUrl: string;
  expectedCondition: string;
  expectedConfidence: number;
  expectedSeverity: SeverityLevel;
  qualityNote: string;
  isLowConfidenceSample?: boolean;
}
