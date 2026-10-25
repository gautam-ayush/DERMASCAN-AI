import React, { useEffect, useState } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info, Sparkles, Eye } from 'lucide-react';
import { ImageQualityReport } from '../types';

interface Props {
  imageUrl: string;
  onQualityEvaluated?: (report: ImageQualityReport) => void;
  className?: string;
}

export const ImageQualityChecker: React.FC<Props> = ({
  imageUrl,
  onQualityEvaluated,
  className = '',
}) => {
  const [report, setReport] = useState<ImageQualityReport | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    if (!imageUrl) {
      setReport(null);
      return;
    }

    let isMounted = true;
    setAnalyzing(true);

    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Sample down for fast client-side heuristic inspection
        const sampleWidth = Math.min(img.width, 240);
        const sampleHeight = Math.min(img.height, 240);
        canvas.width = sampleWidth;
        canvas.height = sampleHeight;

        ctx.drawImage(img, 0, 0, sampleWidth, sampleHeight);
        const imgData = ctx.getImageData(0, 0, sampleWidth, sampleHeight);
        const pixels = imgData.data;

        let totalBrightness = 0;
        let skinLikePixels = 0;
        const totalPixels = sampleWidth * sampleHeight;

        // Grayscale values for Laplacian edge variance calculation
        const gray: number[] = new Array(totalPixels);

        for (let i = 0; i < pixels.length; i += 4) {
          const r = pixels[i];
          const g = pixels[i + 1];
          const b = pixels[i + 2];

          // Perceived brightness
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;
          totalBrightness += lum;
          gray[i / 4] = lum;

          // Simple dermoscopic skin tone range heuristic (Kovac rule in RGB)
          // r > 95 && g > 40 && b > 20 && max-min > 15 && |r-g| > 15 && r > g && r > b
          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          const isSkin = r > 80 && g > 35 && b > 20 && max - min > 12 && r >= g && r >= b;
          if (isSkin) {
            skinLikePixels++;
          }
        }

        const avgBrightness = totalBrightness / totalPixels; // 0 to 255
        const skinFraction = skinLikePixels / totalPixels;

        // Discrete Laplacian edge gradient calculation
        let edgeSum = 0;
        let edgeCount = 0;
        for (let y = 1; y < sampleHeight - 1; y += 2) {
          for (let x = 1; x < sampleWidth - 1; x += 2) {
            const idx = y * sampleWidth + x;
            const center = gray[idx] * 4;
            const neighbors =
              gray[idx - 1] + gray[idx + 1] + gray[idx - sampleWidth] + gray[idx + sampleWidth];
            const laplacian = Math.abs(center - neighbors);
            edgeSum += laplacian;
            edgeCount++;
          }
        }
        const avgEdge = edgeCount > 0 ? edgeSum / edgeCount : 0; // ~5 to 40+

        // Compute normalized metrics
        const resolutionScore =
          img.width >= 400 && img.height >= 400 ? 1.0 : Math.max(0.3, img.width / 400);

        // Brightness score optimal between 80 and 190
        let brightnessScore = 1.0;
        if (avgBrightness < 60) {
          brightnessScore = Math.max(0.2, avgBrightness / 60);
        } else if (avgBrightness > 220) {
          brightnessScore = Math.max(0.3, (255 - avgBrightness) / 35);
        }

        // Blur score normalized (edge variance)
        const blurScore = Math.min(1.0, Math.max(0.2, avgEdge / 18));

        // Skin likelihood score
        const skinRegionLikelihood = Math.min(1.0, skinFraction > 0.25 ? 0.95 : skinFraction * 3.5);

        const warnings: string[] = [];
        if (img.width < 250 || img.height < 250) {
          warnings.push('Image resolution is small (under 250px). High-resolution detail may be lost.');
        }
        if (avgBrightness < 55) {
          warnings.push('Image appears significantly dark or under-illuminated.');
        } else if (avgBrightness > 225) {
          warnings.push('Image appears overexposed with glare or harsh flash reflection.');
        }
        if (blurScore < 0.42) {
          warnings.push('Image appears blurry or out of focus. Fine skin texture cannot be resolved.');
        }
        if (skinRegionLikelihood < 0.25) {
          warnings.push('Low epidermal tone presence detected. Ensure the photo is focused on the skin.');
        }

        const isAcceptable = warnings.length <= 1 && blurScore >= 0.35 && brightnessScore >= 0.35;

        const calculatedReport: ImageQualityReport = {
          acceptable: isAcceptable,
          blurScore: Number(blurScore.toFixed(2)),
          brightnessScore: Number(brightnessScore.toFixed(2)),
          resolutionScore: Number(resolutionScore.toFixed(2)),
          skinRegionLikelihood: Number(skinRegionLikelihood.toFixed(2)),
          warnings,
          recommendation: isAcceptable
            ? 'Image optical quality is sufficient for screening analysis.'
            : 'Please upload a clearer, well-lit image for better screening performance.'
        };

        if (isMounted) {
          setReport(calculatedReport);
          setAnalyzing(false);
          if (onQualityEvaluated) {
            onQualityEvaluated(calculatedReport);
          }
        }
      } catch (err) {
        console.warn('Quality check calculation fallback:', err);
        if (isMounted) setAnalyzing(false);
      }
    };

    img.onerror = () => {
      if (isMounted) setAnalyzing(false);
    };

    img.src = imageUrl;

    return () => {
      isMounted = false;
    };
  }, [imageUrl, onQualityEvaluated]);

  if (!imageUrl) return null;

  if (analyzing) {
    return (
      <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-500 flex items-center gap-2">
        <div className="w-3.5 h-3.5 border-2 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
        <span>Evaluating optical image quality (blur, illumination, resolution)...</span>
      </div>
    );
  }

  if (!report) return null;

  return (
    <div
      id="image-quality-check-panel"
      className={`rounded-xl border p-4 text-xs transition-all ${
        report.acceptable
          ? 'bg-emerald-50/60 border-emerald-200/90 text-emerald-950'
          : 'bg-amber-50/70 border-amber-300 text-amber-950'
      } ${className}`}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          {report.acceptable ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          )}
          <span className="font-bold text-sm tracking-tight">
            {report.acceptable ? 'Image Quality Check Passed' : 'Image Quality Check Notice'}
          </span>
        </div>
        <span
          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
            report.acceptable ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-200 text-amber-900'
          }`}
        >
          {report.acceptable ? 'Acceptable' : 'Attention Needed'}
        </span>
      </div>

      <p className="text-slate-700 mb-3 leading-relaxed">{report.recommendation}</p>

      {/* Metric Breakdown Progress Indicators */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-slate-200/70 text-[11px]">
        <div>
          <div className="flex justify-between text-slate-600 mb-1">
            <span>Sharpness</span>
            <span className="font-semibold">{Math.round(report.blurScore * 100)}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-full rounded-full ${
                report.blurScore > 0.5 ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
              style={{ width: `${Math.round(report.blurScore * 100)}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-slate-600 mb-1">
            <span>Illumination</span>
            <span className="font-semibold">{Math.round(report.brightnessScore * 100)}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-full rounded-full ${
                report.brightnessScore > 0.5 ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
              style={{ width: `${Math.round(report.brightnessScore * 100)}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-slate-600 mb-1">
            <span>Resolution</span>
            <span className="font-semibold">{Math.round(report.resolutionScore * 100)}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
            <div
              className="h-full rounded-full bg-teal-500"
              style={{ width: `${Math.round(report.resolutionScore * 100)}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-slate-600 mb-1">
            <span>Skin Region</span>
            <span className="font-semibold">{Math.round(report.skinRegionLikelihood * 100)}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
            <div
              className="h-full rounded-full bg-cyan-500"
              style={{ width: `${Math.round(report.skinRegionLikelihood * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Warnings List */}
      {report.warnings.length > 0 && (
        <ul className="mt-3 pt-2 border-t border-amber-200/80 space-y-1 text-[11px] text-amber-900">
          {report.warnings.map((w, i) => (
            <li key={i} className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>
              <span>{w}</span>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-2.5 text-[10px] text-slate-500 italic">
        * Heuristic pre-check only. Does not reflect definitive medical diagnostic quality.
      </p>
    </div>
  );
};
