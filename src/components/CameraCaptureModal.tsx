import React, { useRef, useState, useEffect } from 'react';
import { Camera, X, RefreshCw, AlertCircle, Image as ImageIcon, Sparkles, Sun } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (dataUrl: string) => void;
  onFallbackToFile?: () => void;
}

export const CameraCaptureModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onCapture,
  onFallbackToFile,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [flashing, setFlashing] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      stopStream();
      return;
    }

    startCamera();

    return () => {
      stopStream();
    };
  }, [isOpen, facingMode]);

  const startCamera = async () => {
    stopStream();
    setError(null);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera access is not supported by your browser environment.');
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err: any) {
      console.warn('Camera stream request error:', err);
      let msg = 'Unable to access your device camera.';
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        msg = 'Camera permission was denied. You can allow camera access in browser settings or simply upload a photo from your gallery.';
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        msg = 'No camera device was found on this system.';
      }
      setError(msg);
    }
  };

  const stopStream = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const handleCapture = () => {
    if (!videoRef.current) return;

    setFlashing(true);
    setTimeout(() => setFlashing(false), 200);

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
      stopStream();
      onCapture(dataUrl);
    }
  };

  const toggleFacingMode = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  if (!isOpen) return null;

  return (
    <div
      id="camera-capture-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-label="Capture Skin Photo"
    >
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 text-white shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-900/80 text-teal-400 border border-teal-700/50 flex items-center justify-center">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Take a Skin Photo</h3>
              <p className="text-[11px] text-slate-400">Position the spot inside the circle</p>
            </div>
          </div>
          <button
            onClick={() => {
              stopStream();
              onClose();
            }}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close camera"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewfinder Stage */}
        <div className="relative aspect-4/3 sm:aspect-square bg-black flex items-center justify-center overflow-hidden">
          {error ? (
            <div className="p-6 text-center text-slate-300 max-w-sm space-y-4">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-white text-sm">Camera Unavailable</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{error}</p>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                {onFallbackToFile && (
                  <button
                    onClick={() => {
                      stopStream();
                      onClose();
                      onFallbackToFile();
                    }}
                    className="min-h-[44px] px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md transition-colors"
                  >
                    <ImageIcon className="w-4 h-4" />
                    <span>Choose from Photo Gallery</span>
                  </button>
                )}

                <button
                  onClick={startCamera}
                  className="min-h-[44px] px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium cursor-pointer transition-colors"
                >
                  Retry Camera
                </button>
              </div>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />

              {/* Viewfinder Reticle with clear visual guidance */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center p-4">
                <div className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-full border-2 border-teal-400/80 border-dashed animate-pulse flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-teal-400 shadow-xs" />
                  <span className="absolute -bottom-7 px-3 py-1 rounded-full bg-slate-950/80 text-[11px] text-slate-200 border border-slate-700 whitespace-nowrap">
                    Center the affected area
                  </span>
                </div>
              </div>

              {/* Tips Banner */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                <div className="bg-slate-950/75 backdrop-blur-xs px-3 py-1 rounded-full text-[11px] text-slate-300 border border-slate-700/60 flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Ensure good lighting</span>
                </div>
              </div>

              {/* Shutter flash animation */}
              {flashing && <div className="absolute inset-0 bg-white transition-opacity duration-150" />}
            </>
          )}
        </div>

        {/* Bottom Controls */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between shrink-0">
          <button
            onClick={toggleFacingMode}
            disabled={!!error}
            className="min-h-[44px] px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors disabled:opacity-40 cursor-pointer flex items-center gap-1.5"
            aria-label="Switch between front and back camera"
          >
            <RefreshCw className="w-4 h-4 text-teal-400" />
            <span className="hidden sm:inline">Flip Camera</span>
          </button>

          {/* Large Shutter Button (Accessible thumb target) */}
          <button
            onClick={handleCapture}
            disabled={!!error || !stream}
            className="w-16 h-16 rounded-full bg-teal-500 hover:bg-teal-400 active:scale-95 text-slate-950 flex items-center justify-center shadow-lg transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer border-4 border-slate-900 ring-2 ring-teal-500/50"
            aria-label="Take picture"
          >
            <Camera className="w-7 h-7 stroke-[2.2]" />
          </button>

          <button
            onClick={() => {
              stopStream();
              onClose();
            }}
            className="min-h-[44px] px-4 py-2 rounded-xl text-slate-400 hover:text-white text-xs font-semibold cursor-pointer transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
