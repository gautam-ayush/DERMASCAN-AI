import React from 'react';
import { Shield, ExternalLink, Heart, Sparkles, BookOpen, Stethoscope } from 'lucide-react';
import logoImage from '../assets/images/dermascan_logo_1788579032229.jpg';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const handleNav = (tab: string) => {
    onNavigate(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-800">
          {/* Brand & Purpose */}
          <div className="lg:col-span-2 space-y-3.5">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-700 bg-white shadow-xs shrink-0">
                <img
                  src={logoImage}
                  alt="DermaScan AI Logo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform scale-110"
                />
              </div>
              <span className="text-lg font-black tracking-tight">
                DERMA <span className="text-teal-400 font-extrabold">4 ALL</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              An academic computer vision research platform developed for AI-assisted skin condition screening, educational dermatology dissemination, and verified clinical specialist guidance.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono">
              <span>Status:</span>
              <span className="text-emerald-400 font-semibold">Academic Evaluation v1.0</span>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Product</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('analyze')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-teal-400" />
                  Skin Analysis
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('doctors')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Stethoscope className="w-3 h-3 text-teal-400" />
                  Dermatologist Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Interactive Demo Cases
                </button>
              </li>
            </ul>
          </div>

          {/* Project */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Project</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                >
                  <BookOpen className="w-3 h-3 text-cyan-400" />
                  About the Project
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Methodology & Limitations
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Safety */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Legal & Safety</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('disclaimer')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Medical Disclaimer
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('disclaimer')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Privacy & Data Handling
                </button>
              </li>
              <li>
                <a
                  href="https://www.aad.org"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>American Academy of Dermatology</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Mandatory Academic & Diagnostic Notice */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="text-center sm:text-left">
            <strong className="text-slate-300 font-semibold">DERMA 4 ALL</strong> is an educational screening platform and is <span className="text-amber-400 font-medium">not a medical diagnostic system</span>.
          </p>
          <div className="flex items-center gap-4">
            <span>Research & Clinical Screening Prototype</span>
            <span>&copy; {currentYear} DERMA 4 ALL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
