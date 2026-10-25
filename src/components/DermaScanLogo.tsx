import React from 'react';
import logoImage from '../assets/images/dermascan_logo_1788579032229.jpg';

interface DermaScanLogoProps {
  className?: string;
  variant?: 'mark' | 'full' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
}

export const DermaScanLogo: React.FC<DermaScanLogoProps> = ({
  className = '',
  variant = 'full',
  size = 'md',
  showSubtitle = true,
}) => {
  const sizeMap = {
    sm: { img: 'w-7 h-7', text: 'text-sm', sub: 'text-[9px]' },
    md: { img: 'w-[40.4px] h-[40.4px]', text: 'text-base', sub: 'text-[10px]' },
    lg: { img: 'w-12 h-12', text: 'text-xl', sub: 'text-xs' },
    xl: { img: 'w-16 h-16', text: 'text-2xl', sub: 'text-sm' },
  };

  const { img, text, sub } = sizeMap[size];

  if (variant === 'icon' || variant === 'mark') {
    return (
      <div className={`relative flex items-center justify-center shrink-0 rounded-full overflow-hidden shadow-2xs border border-slate-200/80 bg-white ${img} ${className}`}>
        <img
          src={logoImage}
          alt="DermaScan AI Logo"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform scale-110"
        />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Emblem Icon */}
      <div className={`relative flex items-center justify-center shrink-0 rounded-full overflow-hidden shadow-2xs border border-slate-200/80 bg-white ${img}`}>
        <img
          src={logoImage}
          alt="DERMA 4 ALL Emblem"
          referrerPolicy="no-referrer"
          style={size === 'md' ? { width: '40.4px', height: '40.4px' } : undefined}
          className="w-full h-full object-cover object-center transform scale-110"
        />
      </div>

      {/* Brand Text */}
      <div className="flex flex-col leading-tight">
        <div className="flex items-center gap-1.5">
          <span className={`font-black tracking-tight text-slate-900 font-sans ${text}`}>
            DERMA <span className="text-teal-800 font-extrabold">4 ALL</span>
          </span>
          <span className="text-[9px] tracking-wider uppercase font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
            v2.4
          </span>
        </div>
        {showSubtitle && (
          <span className={`text-slate-500 font-medium tracking-wide ${sub}`}>
            AI-Assisted Cutaneous Screening
          </span>
        )}
      </div>
    </div>
  );
};
