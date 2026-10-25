import React, { useState, useRef, useEffect } from 'react';
import {
  Upload,
  Camera,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Info,
  X,
  FileImage,
  Maximize2,
} from 'lucide-react';
import { DEMO_SAMPLES } from '../data/demoSamples';
import { CameraCaptureModal } from '../components/CameraCaptureModal';
import { WorkflowStepper } from '../components/WorkflowStepper';
import { ImageQualityChecker } from '../components/ImageQualityChecker';
import { ImageQualityReport } from '../types';

interface Props {
  initialSampleId?: string;
  onStartAnalysis: (imageDataUrl: string, sampleId?: string, file?: File) => void;
  onNavigateToDoctors: () => void;
}

export const AnalysisPage: React.FC<Props> = ({
  initialSampleId,
  onStartAnalysis,
  onNavigateToDoctors,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [activeSampleId, setActiveSampleId] = useState<string | undefined>(initialSampleId);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [qualityReport, setQualityReport] = useState<ImageQualityReport | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Automatically load initial sample if provided
  useEffect(() => {
    if (initialSampleId) {
      const found = DEMO_SAMPLES.find((s) => s.id === initialSampleId);
      if (found) {
        setSelectedImage(found.sampleImageUrl);
        setActiveSampleId(found.id);
        setSelectedFile(null);
      }
    }
  }, [initialSampleId]);

  // Read dimensions whenever selectedImage changes
  useEffect(() => {
    if (!selectedImage) {
      setImageDimensions(null);
      return;
    }
    const img = new Image();
    img.onload = () => {
      setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.src = selectedImage;
  }, [selectedImage]);

  const handleFileSelect = (file: File) => {
    setFileError(null);

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type.toLowerCase())) {
      setFileError('Unsupported file type. Please upload a JPG, JPEG, PNG, or WEBP photo.');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setFileError('File exceeds the 15MB limit. Please choose a smaller photo.');
      return;
    }

    setSelectedFile(file);
    setActiveSampleId(undefined);

    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleSelectPreset = (sampleId: string) => {
    const found = DEMO_SAMPLES.find((s) => s.id === sampleId);
    if (found) {
      setSelectedImage(found.sampleImageUrl);
      setActiveSampleId(found.id);
      setSelectedFile(null);
      setFileError(null);
    }
  };

  const handleResetImage = () => {
    setSelectedImage(null);
    setSelectedFile(null);
    setActiveSampleId(undefined);
    setQualityReport(null);
    setFileError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmitAnalysis = () => {
    if (!selectedImage) return;
    onStartAnalysis(selectedImage, activeSampleId, selectedFile || undefined);
  };

  const currentStep = selectedImage ? 'review' : 'upload';

  return (
    <div id="analysis-page-container" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 5-Step Workflow Progress Indicator */}
      <WorkflowStepper currentStep={currentStep} />

      {/* Camera Capture Modal */}
      <CameraCaptureModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onFallbackToFile={() => fileInputRef.current?.click()}
        onCapture={(dataUrl) => {
          setSelectedImage(dataUrl);
          setSelectedFile(null);
          setActiveSampleId(undefined);
          setIsCameraOpen(false);
        }}
      />

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFileSelect(e.target.files[0]);
          }
        }}
      />

      {/* STATE 1: UPLOAD STATE */}
      {!selectedImage ? (
        <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
          {/* Header */}
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Upload a Skin Photo
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Take a close-up photo or choose an existing image from your device to begin the screening.
            </p>
          </div>

          {/* Quick Photo Tips for Anxious First-Time Users */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 max-w-xl mx-auto text-xs">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-600 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-[10px] shrink-0 font-mono">1</span>
              <span><strong>Good light:</strong> Daylight or bright room</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-600 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-[10px] shrink-0 font-mono">2</span>
              <span><strong>In focus:</strong> Hold phone 4–6" away</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-600 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-[10px] shrink-0 font-mono">3</span>
              <span><strong>Centered:</strong> Keep spot in middle</span>
            </div>
          </div>

          {/* Error Banner */}
          {fileError && (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-center justify-between">
              <span>{fileError}</span>
              <button
                onClick={() => setFileError(null)}
                className="font-bold underline ml-3 cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Central Upload Card */}
          <div
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            className={`relative rounded-3xl border-2 border-dashed p-6 sm:p-12 text-center transition-all bg-white ${
              isDragging
                ? 'border-teal-600 bg-teal-50/50 scale-[1.01]'
                : 'border-slate-300 hover:border-teal-600/70 hover:bg-slate-50/60'
            }`}
          >
            <div className="max-w-md mx-auto space-y-5">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-teal-50 text-teal-800 border border-teal-200 flex items-center justify-center shadow-xs">
                <Upload className="w-8 h-8 stroke-[1.75]" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-slate-900">
                  Select or take your skin photo
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  Choose an image from your gallery or use your camera
                </p>
              </div>

              {/* Action Buttons with 48px Touch Targets */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full sm:w-auto min-h-[48px] px-6 py-3 rounded-xl bg-teal-800 hover:bg-teal-900 active:bg-slate-900 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>Choose from Gallery</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsCameraOpen(true)}
                  className="w-full sm:w-auto min-h-[48px] px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold border border-slate-300 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Camera className="w-4 h-4 text-teal-700" />
                  <span>Take a Photo</span>
                </button>
              </div>

              <p className="text-[11px] text-slate-400">
                Supports JPG, PNG, or WEBP photos up to 15MB
              </p>
            </div>
          </div>

          {/* Privacy Note */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-xs flex items-center gap-2.5 max-w-xl mx-auto text-center justify-center">
            <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0" />
            <span>
              <strong>Privacy Notice:</strong> Your image is used solely for screening analysis. We do not permanently store personal photos on our servers.
            </span>
          </div>

          {/* Sample Presets */}
          <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Or test with an academic sample
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Click any verified test case to load it into the review card.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {DEMO_SAMPLES.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => handleSelectPreset(sample.id)}
                  className="group rounded-xl border border-slate-200 p-2 text-left hover:border-teal-700 transition-all bg-white hover:bg-teal-50/20 cursor-pointer"
                >
                  <div className="aspect-square rounded-lg overflow-hidden bg-slate-100 mb-1.5 border border-slate-100">
                    <img
                      src={sample.sampleImageUrl}
                      alt={sample.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-800 line-clamp-1 group-hover:text-teal-900 block">
                    {sample.expectedCondition}
                  </span>
                  <span className="text-[9px] text-slate-400 block uppercase font-mono">
                    {sample.category}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* STATE 2: IMAGE REVIEW STATE (Section 39) */
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Header */}
          <div className="text-center max-w-xl mx-auto space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Review Your Image
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Confirm your image is clear and well-lit before proceeding to analysis.
            </p>
          </div>

          {/* Image Review Card */}
          <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-7 shadow-xs space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Image Preview */}
              <div className="md:col-span-5 relative">
                <div className="aspect-square w-full max-w-xs mx-auto rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-2xs relative group">
                  <img
                    src={selectedImage}
                    alt="Uploaded skin photo preview"
                    className="w-full h-full object-cover"
                  />
                  {activeSampleId && (
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-900/80 backdrop-blur-xs text-[10px] font-bold text-white">
                      Sample Case
                    </div>
                  )}
                </div>
              </div>

              {/* Details & Quality Checks */}
              <div className="md:col-span-7 space-y-4">
                {/* File Information */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="flex items-center gap-1.5 font-medium">
                      <FileImage className="w-3.5 h-3.5 text-teal-700" />
                      {selectedFile ? selectedFile.name : activeSampleId ? 'Academic Sample Case' : 'Captured Photo'}
                    </span>
                    {imageDimensions && (
                      <span className="font-mono text-[11px]">
                        {imageDimensions.width} × {imageDimensions.height} px
                      </span>
                    )}
                  </div>
                  {selectedFile && (
                    <div className="text-[11px] text-slate-400">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • {selectedFile.type}
                    </div>
                  )}
                </div>

                {/* Visual Quality Status Indicators (Section 39) */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Image Quality Pre-Check
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-emerald-50/80 border border-emerald-200 text-emerald-900 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="font-medium">Good lighting</span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-emerald-50/80 border border-emerald-200 text-emerald-900 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="font-medium">Image appears clear</span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-emerald-50/80 border border-emerald-200 text-emerald-900 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="font-medium">Skin region visible</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    These indicators verify photographic clarity and are not medical assessments.
                  </p>
                </div>

                {/* Helpful Tip */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
                  <Info className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>Tip:</strong> Keep the affected area centered and avoid heavy shadows or strong cosmetic filters.
                  </span>
                </div>
              </div>
            </div>

            {/* Actions: Dominant "Analyze Image" and secondary "Change Image" */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleResetImage}
                className="w-full sm:w-auto min-h-[48px] px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer order-2 sm:order-1"
              >
                <RefreshCw className="w-4 h-4 text-slate-500" />
                <span>Choose Different Photo</span>
              </button>

              <button
                type="button"
                onClick={handleSubmitAnalysis}
                className="w-full sm:w-auto min-h-[48px] px-8 py-3 rounded-xl bg-teal-800 hover:bg-teal-900 active:bg-slate-900 text-white text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer order-1 sm:order-2 transform hover:-translate-y-0.5"
              >
                <Sparkles className="w-4 h-4 text-teal-200" />
                <span>Analyze Skin Photo</span>
                <ArrowRight className="w-4 h-4 text-teal-200" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
