import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AnalysisPage } from './pages/AnalysisPage';
import { ProcessingPage } from './pages/ProcessingPage';
import { ResultsPage } from './pages/ResultsPage';
import { FindDermatologistPage } from './pages/FindDermatologistPage';
import { AboutPage } from './pages/AboutPage';
import { DisclaimerPage } from './pages/DisclaimerPage';
import { AnalysisResult } from './types';
import { analyzeImage, isDemoModeActive, setDemoModeState } from './services/analysisService';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isDemoMode, setIsDemoMode] = useState<boolean>(isDemoModeActive());
  const [selectedSampleId, setSelectedSampleId] = useState<string | undefined>(undefined);
  const [currentImageForProcessing, setCurrentImageForProcessing] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [pendingResult, setPendingResult] = useState<AnalysisResult | null>(null);
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Synchronize demo mode toggle
  const handleToggleDemoMode = () => {
    const nextState = !isDemoMode;
    setIsDemoMode(nextState);
    setDemoModeState(nextState);
  };

  const handleNavigate = (tab: string, sampleId?: string) => {
    if (sampleId) {
      setSelectedSampleId(sampleId);
    }
    setActiveTab(tab);
    setErrorMessage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Trigger analysis pipeline
  const handleStartAnalysis = async (
    imageDataUrl: string,
    sampleId?: string,
    file?: File
  ) => {
    setCurrentImageForProcessing(imageDataUrl);
    setIsProcessing(true);
    setErrorMessage(null);

    try {
      // Initiate inference
      const resultPromise = analyzeImage({
        imageData: imageDataUrl,
        sampleId: sampleId,
        imageFile: file,
        demoMode: isDemoMode,
      });

      const result = await resultPromise;
      setPendingResult(result);
    } catch (err: any) {
      console.error('Analysis execution error:', err);
      setErrorMessage(
        err.message || 'An error occurred while evaluating the image. Switched to safe heuristic preview.'
      );
      setIsProcessing(false);
    }
  };

  // Called when ProcessingPage finished all 4 visual stages
  const handleProcessingComplete = () => {
    if (pendingResult) {
      setCurrentResult(pendingResult);
      setPendingResult(null);
      setIsProcessing(false);
      setActiveTab('results');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-teal-100 selection:text-teal-900">
      {/* Top Application Navbar */}
      <Navbar
        activeTab={activeTab}
        onNavigate={handleNavigate}
        isDemoMode={isDemoMode}
        onToggleDemoMode={handleToggleDemoMode}
      />

      {/* Main Content Viewport */}
      <main className="flex-1">
        {errorMessage && (
          <div className="max-w-4xl mx-auto px-4 pt-4">
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-center justify-between">
              <span>{errorMessage}</span>
              <button
                onClick={() => setErrorMessage(null)}
                className="font-bold underline ml-3 cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* View Router */}
        {activeTab === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectSampleToAnalyze={(sampleId) => {
              setSelectedSampleId(sampleId);
              handleNavigate('analyze', sampleId);
            }}
          />
        )}

        {activeTab === 'analyze' && (
          <>
            {isProcessing ? (
              <ProcessingPage
                imageUrl={currentImageForProcessing}
                onCompleted={handleProcessingComplete}
              />
            ) : (
              <AnalysisPage
                initialSampleId={selectedSampleId}
                onStartAnalysis={handleStartAnalysis}
                onNavigateToDoctors={() => handleNavigate('doctors')}
              />
            )}
          </>
        )}

        {activeTab === 'results' && currentResult && (
          <ResultsPage
            result={currentResult}
            onAnalyzeAnother={() => {
              setSelectedSampleId(undefined);
              handleNavigate('analyze');
            }}
            onNavigateToDoctors={() => handleNavigate('doctors')}
          />
        )}

        {activeTab === 'results' && !currentResult && (
          <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
            <h3 className="text-lg font-bold text-slate-800">No Analysis Result Available</h3>
            <p className="text-xs text-slate-500">
              Please upload or photograph a skin image to generate an AI screening assessment.
            </p>
            <button
              onClick={() => handleNavigate('analyze')}
              className="px-5 py-2.5 rounded-xl bg-teal-600 text-white text-xs font-semibold shadow-xs cursor-pointer"
            >
              Start Skin Analysis
            </button>
          </div>
        )}

        {activeTab === 'doctors' && <FindDermatologistPage />}

        {activeTab === 'about' && (
          <AboutPage onNavigateToAnalyze={() => handleNavigate('analyze')} />
        )}

        {activeTab === 'disclaimer' && <DisclaimerPage />}
      </main>

      {/* Global Academic Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
