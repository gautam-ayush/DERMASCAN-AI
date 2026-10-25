import React, { useState } from 'react';
import {
  Database,
  Scale,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  ExternalLink,
  BookOpen,
  Layers,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { FitzpatrickEvaluation, DermoscopyABCD, DatasetGrounding } from '../types';
import { BENCHMARK_DATASETS } from '../data/benchmarkDatasets';

interface Props {
  fitzpatrick?: FitzpatrickEvaluation;
  dermoscopy?: DermoscopyABCD;
  datasetGrounding?: DatasetGrounding;
  conditionName: string;
}

export const DatasetGroundingCard: React.FC<Props> = ({
  fitzpatrick,
  dermoscopy,
  datasetGrounding,
  conditionName
}) => {
  const [showBenchmarkExplorer, setShowBenchmarkExplorer] = useState(false);
  const [activeDatasetTab, setActiveDatasetTab] = useState<string>('ham10000');

  if (!datasetGrounding && !fitzpatrick && !dermoscopy) {
    return null;
  }

  const selectedDataset = BENCHMARK_DATASETS.find((d) => d.id === activeDatasetTab) || BENCHMARK_DATASETS[0];

  return (
    <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 shadow-xs space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-teal-800 text-white text-xs font-bold flex items-center justify-center shrink-0 font-mono">
              ★
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-800 font-mono">
              CLINICAL DATASET GROUNDING
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            Academic Benchmark Alignment & Calibration
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">
            This screening assessment is cross-referenced against five premier dermatological training corpora to maximize diagnostic fairness, dermoscopic precision, and morphological accuracy.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowBenchmarkExplorer(!showBenchmarkExplorer)}
          className="self-start sm:self-center px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
        >
          <Database className="w-3.5 h-3.5 text-teal-700" />
          <span>{showBenchmarkExplorer ? 'Hide Dataset Index' : 'Inspect 5 Benchmark Datasets'}</span>
          {showBenchmarkExplorer ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
        </button>
      </div>

      {/* Dataset Benchmark Explorer Expandable Drawer */}
      {showBenchmarkExplorer && (
        <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-teal-800" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Peer-Reviewed Clinical Datasets Integrated
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-mono">
              5 Core Archives
            </span>
          </div>

          {/* Dataset Selector Tabs */}
          <div className="flex flex-wrap gap-1.5 border-b border-slate-200 pb-2">
            {BENCHMARK_DATASETS.map((ds) => {
              const isActive = ds.id === activeDatasetTab;
              return (
                <button
                  key={ds.id}
                  type="button"
                  onClick={() => setActiveDatasetTab(ds.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-teal-800 text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {ds.shortName}
                </button>
              );
            })}
          </div>

          {/* Active Dataset Details */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-sm font-bold text-slate-900">{selectedDataset.name}</h4>
                <p className="text-[11px] text-teal-800 font-medium">{selectedDataset.institution}</p>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono font-semibold">
                  {selectedDataset.sampleCount}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 font-semibold border border-teal-200">
                  {selectedDataset.keyClasses.length} Key Categories
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {selectedDataset.focusDomain}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs border-t border-slate-100">
              <div>
                <strong className="text-slate-800 block text-[11px] uppercase tracking-wider mb-1">
                  Clinical Modality & Methodology
                </strong>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  {selectedDataset.imageModality}
                </p>
              </div>
              <div>
                <strong className="text-slate-800 block text-[11px] uppercase tracking-wider mb-1">
                  Diagnostic Grounding Role
                </strong>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  {selectedDataset.clinicalSignificance}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid of 2 Core Clinical Pillars: Fitzpatrick 17k & ISIC Dermoscopy ABCD */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Pillar 1: Fitzpatrick Skin Phototype Calibration */}
        {fitzpatrick && (
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/40 border border-amber-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-100 border border-amber-200 text-amber-900 flex items-center justify-center shrink-0">
                  <Scale className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-800 font-mono block">
                    FITZPATRICK 17K CALIBRATION
                  </span>
                  <h4 className="text-sm font-bold text-slate-900">
                    Skin Phototype Fairness
                  </h4>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-950 border border-amber-300 font-mono">
                Type {fitzpatrick.type}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-white border border-amber-200/60 space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">Epidermal Tone Category:</span>
                  <strong className="text-slate-800">{fitzpatrick.toneCategory}</strong>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">Melanin Density:</span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                    {fitzpatrick.melaninDensity}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-amber-200/60 space-y-1">
                <strong className="text-slate-800 text-[11px] block">
                  Erythema & Lesion Presentation:
                </strong>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  {fitzpatrick.erythemaCharacteristics}
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-amber-900 bg-amber-100/60 p-2.5 rounded-lg border border-amber-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span>
                  <strong>Ethical AI Calibration:</strong> Sensitivity normalized across FST I–VI using Fitzpatrick 17k data distribution.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Pillar 2: ISIC Dermoscopy ABCD Metrics */}
        {dermoscopy && (
          <div className="p-4 sm:p-5 rounded-2xl bg-teal-50/40 border border-teal-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-teal-100 border border-teal-200 text-teal-900 flex items-center justify-center shrink-0">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-teal-800 font-mono block">
                    ISIC DERMOSCOPY BENCHMARK
                  </span>
                  <h4 className="text-sm font-bold text-slate-900">
                    ABCD Morphological Rules
                  </h4>
                </div>
              </div>

              <span className={`px-2.5 py-1 rounded-full text-xs font-bold border font-mono ${
                dermoscopy.isicRiskTier.includes('Low')
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : dermoscopy.isicRiskTier.includes('Equivocal')
                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                  : 'bg-rose-50 text-rose-800 border-rose-200'
              }`}>
                {dermoscopy.isicRiskTier}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white border border-teal-200/60">
                <span className="text-[10px] text-slate-500 block uppercase font-mono">A • Asymmetry</span>
                <strong className="text-slate-900 text-xs">
                  {dermoscopy.asymmetryScore === 0 ? '0 (Symmetric)' : dermoscopy.asymmetryScore === 1 ? '1 (1-Axis)' : '2 (2-Axis Bi-directional)'}
                </strong>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-teal-200/60">
                <span className="text-[10px] text-slate-500 block uppercase font-mono">B • Border Cutoff</span>
                <strong className="text-slate-900 text-xs">
                  {dermoscopy.borderIrregularity} / 8 Octants
                </strong>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-teal-200/60 col-span-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-slate-500 uppercase font-mono">C • Colors Detected ({dermoscopy.colorCount})</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {dermoscopy.colorPaletteDetected.map((col, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-medium border border-slate-200">
                      {col}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-teal-200/60 col-span-2">
                <span className="text-[10px] text-slate-500 block uppercase font-mono mb-1">D • Differential Structures</span>
                <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-slate-600">
                  {dermoscopy.structuresDetected.map((struct, i) => (
                    <li key={i}>{struct}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Grounding Mapping Cards: HAM10000, DermNet NZ, and UEFS-20 */}
      {datasetGrounding && (
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
            <BookOpen className="w-4 h-4 text-teal-800" />
            <span className="font-bold text-slate-900 text-xs sm:text-sm">
              Dataset Taxonomy & Cross-Verification
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            {/* HAM10000 Mapping */}
            <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-mono uppercase font-bold text-slate-500 block">
                HAM10000 Class Match
              </span>
              <strong className="text-slate-900 block text-xs">
                {datasetGrounding.ham10000Match.className}
              </strong>
              <p className="text-[11px] text-slate-600 leading-relaxed pt-0.5">
                {datasetGrounding.ham10000Match.morphologicalCorrelation}
              </p>
            </div>

            {/* DermNet NZ Atlas Mapping */}
            <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-mono uppercase font-bold text-slate-500 block">
                DermNet NZ Atlas Entity
              </span>
              <strong className="text-slate-900 block text-xs">
                {datasetGrounding.dermnetCategory.atlasSection}
              </strong>
              <p className="text-[11px] text-slate-600 leading-relaxed pt-0.5">
                Cataloged entity: <strong>{datasetGrounding.dermnetCategory.clinicalEntity}</strong>
              </p>
            </div>

            {/* UEFS-20 Morphological Scoring */}
            <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-mono uppercase font-bold text-slate-500 block">
                UEFS-20 Morphological Index
              </span>
              <strong className="text-slate-900 block text-xs">
                {datasetGrounding.uefs20Correlation.clinicalPattern}
              </strong>
              <p className="text-[11px] text-slate-600 leading-relaxed pt-0.5">
                {datasetGrounding.uefs20Correlation.morphologyIndex}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
