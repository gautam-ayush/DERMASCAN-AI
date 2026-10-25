import React, { useState } from 'react';
import { Sparkles, Menu, X, Home, Stethoscope, Info, Shield, Lock } from 'lucide-react';
import { DermaScanLogo } from './DermaScanLogo';

interface NavbarProps {
  currentTab?: string;
  activeTab?: string;
  onNavigate: (tab: string) => void;
  demoMode?: boolean;
  isDemoMode?: boolean;
  onToggleDemoMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  activeTab,
  onNavigate,
  demoMode,
  isDemoMode,
  onToggleDemoMode,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const active = activeTab || currentTab || 'home';
  const isDemo = isDemoMode ?? demoMode ?? false;

  const primaryNavItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'analyze', label: 'Analyze', icon: Sparkles },
    { id: 'doctors', label: 'Dermatologist Guide', icon: Stethoscope },
    { id: 'about', label: 'About', icon: Info },
  ];

  const handleNav = (tabId: string) => {
    onNavigate(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Reassuring Safety Bar (Section 35 & 36) */}
      <div className="bg-slate-900 text-slate-300 text-[11px] sm:text-xs py-1.5 px-4 flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-teal-400"></span>
            <span className="font-medium text-slate-200">
              AI-assisted educational skin screening • Not a medical diagnosis
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-slate-400">
            <button
              onClick={() => handleNav('disclaimer')}
              className="text-slate-300 hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
            >
              Medical Disclaimer
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => handleNav('disclaimer')}
              className="text-slate-300 hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div
            id="nav-brand-logo"
            onClick={() => handleNav('home')}
            className="cursor-pointer select-none group py-1"
          >
            <DermaScanLogo size="md" variant="full" />
          </div>

          {/* Desktop Primary Navigation Links (Section 57) */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {primaryNavItems.map((item) => {
              const Icon = item.icon;
              const isCurrent = active === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNav(item.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold tracking-tight transition-colors cursor-pointer ${
                    isCurrent
                      ? 'bg-teal-800 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isCurrent ? 'text-teal-200' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action: Demo Mode Pill & Quick CTA */}
          <div className="flex items-center gap-2.5">
            {/* Demo Mode Toggle Switch */}
            <div
              id="demo-mode-toggle"
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs"
              title="Toggle between Academic Test Library and Direct Upload"
            >
              <span className="hidden sm:inline text-slate-600 font-medium text-[11px]">Academic Samples</span>
              <button
                type="button"
                role="switch"
                aria-checked={isDemo}
                onClick={onToggleDemoMode}
                className={`relative inline-flex h-4.5 w-8 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  isDemo ? 'bg-teal-800' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-xs transition duration-200 ease-in-out ${
                    isDemo ? 'translate-x-3.5' : 'translate-x-0'
                  }`}
                />
              </button>
              <span
                className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded font-mono flex items-center gap-1 ${
                  isDemo ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'
                }`}
              >
                {!isDemo && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
                {isDemo ? 'Demo Mode' : 'Live AI Vision'}
              </span>
            </div>

            {/* Primary Action Button */}
            <button
              id="nav-cta-analyze"
              onClick={() => handleNav('analyze')}
              className="hidden lg:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-800 hover:bg-teal-900 active:bg-slate-900 text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-200" />
              <span>Analyze Image</span>
            </button>

            {/* Mobile Menu Hamburger Button */}
            <button
              id="mobile-menu-button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation (Section 57) */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 block">
              Menu
            </span>
            {primaryNavItems.map((item) => {
              const Icon = item.icon;
              const isCurrent = active === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`w-full min-h-[44px] flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors text-left cursor-pointer ${
                    isCurrent
                      ? 'bg-teal-800 text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isCurrent ? 'text-teal-200' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 block">
              Legal & Safety
            </span>
            <button
              onClick={() => handleNav('disclaimer')}
              className={`w-full min-h-[44px] flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-left cursor-pointer ${
                active === 'disclaimer' ? 'bg-slate-100 font-semibold text-slate-900' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Shield className="w-4 h-4 text-slate-400" />
              <span>Medical Disclaimer</span>
            </button>
            <button
              onClick={() => handleNav('disclaimer')}
              className={`w-full min-h-[44px] flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-left cursor-pointer ${
                active === 'disclaimer' ? 'bg-slate-100 font-semibold text-slate-900' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Lock className="w-4 h-4 text-slate-400" />
              <span>Privacy Policy</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
