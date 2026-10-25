import { DemoSample } from '../types';

// Helper to generate clear illustrative SVG representations for demo presets
function createSvgDataUrl(title: string, bgColor: string, lesionColor: string, pattern: 'patch' | 'plaque' | 'comedone' | 'mole' | 'ring' | 'blurry'): string {
  let innerElements = '';

  if (pattern === 'patch') {
    // Eczema style: diffuse erythema with micro-scaling
    innerElements = `
      <ellipse cx="200" cy="180" rx="90" ry="75" fill="${lesionColor}" opacity="0.65" filter="blur(14px)" />
      <ellipse cx="205" cy="175" rx="65" ry="50" fill="${lesionColor}" opacity="0.8" filter="blur(6px)" />
      <circle cx="180" cy="165" r="4" fill="#d97706" opacity="0.7" />
      <circle cx="220" cy="180" r="5" fill="#d97706" opacity="0.6" />
      <circle cx="195" cy="195" r="3" fill="#b45309" opacity="0.8" />
    `;
  } else if (pattern === 'plaque') {
    // Psoriasis style: demarcated red plaque with silvery-white surface
    innerElements = `
      <path d="M 140,150 Q 180,110 250,140 Q 280,180 240,220 Q 170,240 140,200 Z" fill="${lesionColor}" opacity="0.85" filter="blur(3px)" />
      <path d="M 155,160 Q 190,130 235,150 Q 255,185 225,205 Q 175,220 155,190 Z" fill="#f8fafc" opacity="0.75" filter="blur(2px)" />
      <path d="M 170,170 Q 200,150 220,165 Q 230,185 210,195 Q 180,200 170,185 Z" fill="#e2e8f0" opacity="0.9" />
    `;
  } else if (pattern === 'comedone') {
    // Acne style: multiple follicular papules and pustules
    innerElements = `
      <ellipse cx="170" cy="150" rx="28" ry="26" fill="${lesionColor}" opacity="0.8" filter="blur(4px)" />
      <circle cx="170" cy="150" r="7" fill="#fef08a" stroke="#ef4444" stroke-width="1.5" />
      <ellipse cx="230" cy="175" rx="24" ry="22" fill="${lesionColor}" opacity="0.75" filter="blur(3px)" />
      <circle cx="230" cy="175" r="5" fill="#fef08a" stroke="#ef4444" stroke-width="1" />
      <ellipse cx="190" cy="210" rx="30" ry="28" fill="${lesionColor}" opacity="0.7" filter="blur(4px)" />
      <circle cx="190" cy="210" r="8" fill="#fef08a" stroke="#dc2626" stroke-width="1.5" />
    `;
  } else if (pattern === 'mole') {
    // Benign mole: round, uniform, well-circumscribed
    innerElements = `
      <circle cx="200" cy="180" r="38" fill="${lesionColor}" opacity="0.95" />
      <circle cx="198" cy="178" r="32" fill="#451a03" opacity="0.9" />
    `;
  } else if (pattern === 'ring') {
    // Tinea style: annular ring with central clearing
    innerElements = `
      <circle cx="200" cy="180" r="70" fill="none" stroke="${lesionColor}" stroke-width="18" opacity="0.8" filter="blur(3px)" />
      <circle cx="200" cy="180" r="52" fill="${bgColor}" opacity="0.9" />
    `;
  } else {
    // Blurry / out of focus (low confidence test)
    innerElements = `
      <rect x="80" y="80" width="240" height="200" fill="#94a3b8" opacity="0.4" filter="blur(35px)" />
      <circle cx="200" cy="180" r="60" fill="#cbd5e1" opacity="0.5" filter="blur(30px)" />
    `;
  }

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 340" width="400" height="340">
      <defs>
        <radialGradient id="skinBase" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stop-color="${bgColor}" />
          <stop offset="100%" stop-color="#d4a373" />
        </radialGradient>
      </defs>
      <rect width="400" height="340" fill="url(#skinBase)" rx="16" />
      <!-- Subtle skin surface texture lines -->
      <g stroke="#ffffff" stroke-width="0.5" opacity="0.15">
        <line x1="40" y1="90" x2="360" y2="100" />
        <line x1="20" y1="170" x2="380" y2="180" />
        <line x1="50" y1="250" x2="350" y2="260" />
      </g>
      ${innerElements}
      <!-- Clinical demo badge watermark -->
      <rect x="16" y="16" width="130" height="26" rx="6" fill="#0f172a" fill-opacity="0.75" />
      <text x="24" y="33" fill="#ffffff" font-family="system-ui, sans-serif" font-size="11" font-weight="600">ACADEMIC DEMO</text>
      <!-- Title footer -->
      <rect x="0" y="295" width="400" height="45" fill="#0f172a" fill-opacity="0.85" />
      <text x="20" y="323" fill="#f8fafc" font-family="system-ui, sans-serif" font-size="13" font-weight="600">${title}</text>
    </svg>
  `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg.trim())}`;
}

export const DEMO_SAMPLES: DemoSample[] = [
  {
    id: 'sample-eczema',
    title: 'Flexural Erythematous Dermatitis',
    subtitle: 'Dry, pruritic patch in antecubital fossa',
    category: 'Inflammatory',
    sampleImageUrl: createSvgDataUrl('Eczema / Atopic Dermatitis Demo', '#f6d5b8', '#ef4444', 'patch'),
    expectedCondition: 'Atopic Dermatitis (Eczema)',
    expectedConfidence: 0.84,
    expectedSeverity: 'Moderate',
    qualityNote: 'Optimal illumination, centered focus on affected epidermal zone.'
  },
  {
    id: 'sample-psoriasis',
    title: 'Extensor Erythematous Plaque',
    subtitle: 'Demarcated plaque with micaceous scaling',
    category: 'Papulosquamous',
    sampleImageUrl: createSvgDataUrl('Plaque Psoriasis Demo', '#f3ceb0', '#dc2626', 'plaque'),
    expectedCondition: 'Psoriasis (Plaque Psoriasis)',
    expectedConfidence: 0.79,
    expectedSeverity: 'Moderate',
    qualityNote: 'Clear contrast between scale layer and erythematous base.'
  },
  {
    id: 'sample-acne',
    title: 'Facial Inflammatory Papulopustular',
    subtitle: 'Comedones and inflammatory follicular papules',
    category: 'Pilosebaceous',
    sampleImageUrl: createSvgDataUrl('Acne Vulgaris Demo', '#fce2ce', '#ef4444', 'comedone'),
    expectedCondition: 'Acne Vulgaris',
    expectedConfidence: 0.88,
    expectedSeverity: 'Low',
    qualityNote: 'Sharp resolution capturing individual follicular openings.'
  },
  {
    id: 'sample-nevus',
    title: 'Symmetric Pigmented Macule',
    subtitle: 'Uniform border and pigmentation < 5mm',
    category: 'Melanocytic',
    sampleImageUrl: createSvgDataUrl('Benign Melanocytic Mole Demo', '#fcd5b5', '#78350f', 'mole'),
    expectedCondition: 'Benign Melanocytic Nevus (Mole)',
    expectedConfidence: 0.91,
    expectedSeverity: 'Low',
    qualityNote: 'Symmetric architectural features clearly visible.'
  },
  {
    id: 'sample-contact-derm',
    title: 'Localized Contact Erythema',
    subtitle: 'Linear irritation pattern from accessory strap',
    category: 'Allergic/Irritant',
    sampleImageUrl: createSvgDataUrl('Contact Dermatitis Demo', '#f5d0b2', '#f43f5e', 'patch'),
    expectedCondition: 'Contact Dermatitis',
    expectedConfidence: 0.76,
    expectedSeverity: 'Low',
    qualityNote: 'Sharply delineated boundary matching contact zone.'
  },
  {
    id: 'sample-low-confidence',
    title: 'Sub-Optimal / Low Confidence Test',
    subtitle: 'Blurry, low illumination, out of focus capture',
    category: 'Quality Test',
    sampleImageUrl: createSvgDataUrl('Low Confidence Test (Blurry)', '#cbd5e1', '#64748b', 'blurry'),
    expectedCondition: 'Low-Confidence Screening Result',
    expectedConfidence: 0.38,
    expectedSeverity: 'Indeterminate',
    qualityNote: 'Simulates severe motion blur and insufficient lighting.',
    isLowConfidenceSample: true
  }
];
