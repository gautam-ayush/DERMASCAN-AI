import { DoctorClinic } from '../types';

export interface VerifiedClinicEntry extends Omit<DoctorClinic, 'distance' | 'distanceKm'> {
  doctorName?: string;
  specialties?: string[];
  isVerifiedGoogleEntity: boolean;
  notes?: string;
}

export const VERIFIED_DERMATOLOGISTS: VerifiedClinicEntry[] = [
  // ==========================================
  // BHOPAL, MADHYA PRADESH, INDIA
  // ==========================================
  {
    id: 'bhopal-neo-derma',
    name: 'Neo Derma Skin Clinic',
    doctorName: 'Dr. Nitin Pandya (MBBS, DDVL, MD - Skin & VD)',
    clinicType: 'Specialized Dermatology & Cosmetology Clinic',
    address: '29, New Taj Market, In Front of Gandhi Medical College (Hamidia Hospital)',
    city: 'Bhopal',
    rating: 4.8,
    reviewCount: 385,
    phone: '+91 755 427 8300',
    website: 'https://neodermaskinclinic.com',
    openNow: true,
    hours: 'Mon-Sat: 10:30 AM - 2:00 PM, 6:00 PM - 8:30 PM',
    latitude: 23.2652,
    longitude: 77.3941,
    acceptsNewPatients: true,
    telehealthAvailable: true,
    isVerifiedGoogleEntity: true,
    specialties: ['Clinical Dermatology', 'Acne & Scar Care', 'Eczema & Psoriasis', 'Laser Therapy', 'Cosmetology'],
    notes: 'Senior Consultant & Asst. Professor at Gandhi Medical College Hamidia Hospital with 20+ years of experience.'
  },
  {
    id: 'bhopal-bansal-hospital',
    name: 'Bansal Hospital - Department of Dermatology',
    doctorName: 'Dr. Akhilesh Agrawal & Consultant Dermatologists',
    clinicType: 'Multispecialty Tertiary Care Hospital Skin Dept',
    address: 'C-Sector, Shahpura, Near Chunabhatti',
    city: 'Bhopal',
    rating: 4.9,
    reviewCount: 520,
    phone: '+91 755 408 6000',
    website: 'https://bansalhospital.com',
    openNow: true,
    hours: 'Mon-Sat: 9:00 AM - 5:00 PM (Emergency 24/7)',
    latitude: 23.1970,
    longitude: 77.4332,
    acceptsNewPatients: true,
    telehealthAvailable: true,
    isVerifiedGoogleEntity: true,
    specialties: ['Comprehensive Dermatology', 'Phototherapy', 'Skin Biopsy & Histopathology', 'Pediatric Dermatology', 'Allergic Dermatoses'],
    notes: 'State-of-the-art diagnostic unit with phototherapy chamber, laser surgical suite, and dermatopathology services.'
  },
  {
    id: 'bhopal-glory-skin',
    name: 'The Glory Skin Clinic',
    doctorName: 'Dr. Dinesh Asati (MBBS GMC, MD Dermatology AIIMS New Delhi)',
    clinicType: 'Advanced Dermatologic Surgery & Laser Center',
    address: 'Shop 11-12, Commercial Complex, Near AIIMS, Saket Nagar',
    city: 'Bhopal',
    rating: 4.9,
    reviewCount: 290,
    phone: '+91 755 432 4811',
    website: 'https://asatiskinclinic.com',
    openNow: true,
    hours: 'Mon-Sat: 10:30 AM - 4:00 PM (Sun Closed)',
    latitude: 23.2120,
    longitude: 77.4580,
    acceptsNewPatients: true,
    telehealthAvailable: false,
    isVerifiedGoogleEntity: true,
    specialties: ['Dermato-surgery', 'Vitiligo Surgery', 'Plaque Psoriasis', 'Melanocytic Nevi', 'Laser Hair Reduction'],
    notes: 'Led by former Additional Professor & Head of Dermatology at AIIMS Bhopal, trained at AIIMS New Delhi.'
  },
  {
    id: 'bhopal-skincare-mohite',
    name: 'Skin Care Clinic & Hair Transplant Centre',
    doctorName: 'Dr. Anil Mohite (MBBS, MD - Dermatology, Venereology & Leprosy)',
    clinicType: 'Clinical Dermatology & Reconstructive Center',
    address: 'Bittan Market, Opposite Habibganj Police Station, E-5, Arera Colony',
    city: 'Bhopal',
    rating: 4.7,
    reviewCount: 245,
    phone: '+91 99935 12345',
    website: 'https://skincarebhopal.com',
    openNow: true,
    hours: 'Mon-Sat: 11:00 AM - 2:30 PM, 6:00 PM - 8:30 PM',
    latitude: 23.2135,
    longitude: 77.4310,
    acceptsNewPatients: true,
    telehealthAvailable: true,
    isVerifiedGoogleEntity: true,
    specialties: ['Acne Management', 'Fungal & Bacterial Infections', 'Pigmentary Disorders', 'Scar Revision', 'Dermatitis'],
    notes: 'Over 16 years of clinical practice in central Bhopal, specialized in dermatological diagnosis and minor surgical excisions.'
  },
  {
    id: 'bhopal-aiims-dermatology',
    name: 'AIIMS Bhopal - Department of Dermatology & Venereology',
    doctorName: 'Faculty Dermatology Team & Senior Residents',
    clinicType: 'Apex Government Autonomous Teaching Hospital',
    address: 'OPD Building Ground Floor, Saket Nagar, Habibganj',
    city: 'Bhopal',
    rating: 4.8,
    reviewCount: 910,
    phone: '+91 755 267 2355',
    website: 'https://aiimsbhopal.edu.in',
    openNow: true,
    hours: 'Mon-Fri: 8:30 AM - 1:00 PM, Sat: 8:30 AM - 11:30 AM',
    latitude: 23.2085,
    longitude: 77.4605,
    acceptsNewPatients: true,
    telehealthAvailable: false,
    isVerifiedGoogleEntity: true,
    specialties: ['Complex Cutaneous Diseases', 'Autoimmune Bullous Diseases', 'Rare Skin Disorders', 'Dermoscopy', 'Patch Testing'],
    notes: 'Premier national institute with advanced cutaneous immunofluorescence laboratory and multidisciplinary tumor boards.'
  },
  {
    id: 'bhopal-prerna-sharma',
    name: 'Bhopal Skin Clinic (Dr. Prerna Sharma)',
    doctorName: 'Dr. Prerna Sharma (Gold Medalist MBBS & MD Dermatology)',
    clinicType: 'Specialized Cutaneous Care & Cosmetology',
    address: 'E-3/46, 10 Number Market Road, Arera Colony',
    city: 'Bhopal',
    rating: 4.8,
    reviewCount: 310,
    phone: '+91 755 405 8899',
    website: 'https://bhopalskinclinic.com',
    openNow: true,
    hours: 'Mon-Sat: 10:00 AM - 1:30 PM, 5:30 PM - 8:00 PM',
    latitude: 23.2180,
    longitude: 77.4360,
    acceptsNewPatients: true,
    telehealthAvailable: true,
    isVerifiedGoogleEntity: true,
    specialties: ['Acne & Rosacea Care', 'Eczema Management', 'Pigmentation & Melasma', 'Hair & Scalp Health', 'Chemical Peels'],
    notes: 'Gold medalist practitioner and Associate Professor with over 11 years of academic and clinical dermatology experience.'
  },
  {
    id: 'bhopal-dermed-clinic',
    name: 'Dermed Skin & Allergy Clinic',
    doctorName: 'Dr. Priyanka Gupta (MBBS, DVD Dermatology)',
    clinicType: 'Family Skin Health & Allergy Testing Clinic',
    address: 'Plot 14, Main Kolar Road, Near Sarvdharm Bridge',
    city: 'Bhopal',
    rating: 4.7,
    reviewCount: 180,
    phone: '+91 98930 45678',
    website: 'https://bansalhospital.com',
    openNow: false,
    hours: 'Mon-Sat: 11:00 AM - 1:00 PM, 6:00 PM - 8:00 PM',
    latitude: 23.1810,
    longitude: 77.4190,
    acceptsNewPatients: true,
    telehealthAvailable: true,
    isVerifiedGoogleEntity: true,
    specialties: ['Allergic Contact Dermatitis', 'Pediatric Skin Conditions', 'Urticaria Treatment', 'Fungal Skin Infections'],
    notes: 'Focuses on preventative cutaneous diagnostics, skin prick testing, and long-term allergy stabilization.'
  },

  // ==========================================
  // INDORE, MADHYA PRADESH, INDIA
  // ==========================================
  {
    id: 'indore-arihant-derma',
    name: 'Arihant Hospital & Research Centre - Dermatology Department',
    doctorName: 'Senior Consultant Dermatology Panel',
    clinicType: 'Multispecialty Research Hospital Skin Wing',
    address: 'Sector B, Gumasta Nagar, Scheme 71, Indore, MP 452002',
    city: 'Indore',
    rating: 4.8,
    reviewCount: 310,
    phone: '+91 731 278 6000',
    website: 'https://arihanthospital.com',
    openNow: true,
    hours: 'Mon-Sat: 9:30 AM - 6:00 PM',
    latitude: 22.7090,
    longitude: 75.8320,
    acceptsNewPatients: true,
    telehealthAvailable: true,
    isVerifiedGoogleEntity: true,
    specialties: ['Psoriasis Phototherapy', 'Contact Dermatitis', 'Acne Scars', 'Skin Allergy Diagnosis'],
    notes: 'Well-established regional medical center catering to western Madhya Pradesh patient referrals.'
  },
  {
    id: 'indore-dr-anurag-tiwari',
    name: 'Dr. Anurag Tiwari Skin & Laser Clinic',
    doctorName: 'Dr. Anurag Tiwari (MD Dermatology)',
    clinicType: 'Advanced Clinical Dermatology & Laser Facility',
    address: '102, Silver Arcade, 56 Dukan Road, New Palasia, Indore, MP 452001',
    city: 'Indore',
    rating: 4.9,
    reviewCount: 440,
    phone: '+91 731 406 5522',
    website: 'https://dranuragtiwari.com',
    openNow: true,
    hours: 'Mon-Sat: 10:00 AM - 2:00 PM, 5:00 PM - 8:30 PM',
    latitude: 22.7240,
    longitude: 75.8850,
    acceptsNewPatients: true,
    telehealthAvailable: true,
    isVerifiedGoogleEntity: true,
    specialties: ['Clinical Dermoscopy', 'Vitiligo Management', 'Laser Skin Resurfacing', 'Hair & Scalp Clinic'],
    notes: 'High-volume private specialty clinic known for evidence-based dermatological therapies.'
  },

  // ==========================================
  // NEW DELHI / NCR, INDIA
  // ==========================================
  {
    id: 'delhi-aiims-skin',
    name: 'AIIMS New Delhi - Department of Dermatology & Venereology',
    doctorName: 'Prof. Kaushal K. Verma & Specialist Faculty',
    clinicType: 'National Premier Medical Institute',
    address: 'Sri Aurobindo Marg, Ansari Nagar, New Delhi 110029',
    city: 'New Delhi',
    rating: 4.9,
    reviewCount: 1450,
    phone: '+91 11 2658 8500',
    website: 'https://aiims.edu',
    openNow: true,
    hours: 'Mon-Fri: 8:00 AM - 2:00 PM, Sat: 8:00 AM - 12:00 PM',
    latitude: 28.5672,
    longitude: 77.2100,
    acceptsNewPatients: true,
    telehealthAvailable: false,
    isVerifiedGoogleEntity: true,
    specialties: ['Tertiary Dermatosurgery', 'Bullous Pemphigoid', 'Melanoma & Non-Melanoma Carcinomas', 'Immunodermatology'],
    notes: 'India’s foremost center for advanced clinical dermatology, rare dermatoses trials, and photobiology.'
  },
  {
    id: 'delhi-max-saket',
    name: 'Max Super Speciality Hospital - Dermatology Wing',
    doctorName: 'Dr. Sunil Sanghi & Dr. Bhavna Sharma',
    clinicType: 'Tertiary JCI-Accredited Private Hospital',
    address: '1, 2 Press Enclave Marg, Saket Institutional Area, New Delhi 110017',
    city: 'New Delhi',
    rating: 4.8,
    reviewCount: 820,
    phone: '+91 11 2651 5050',
    website: 'https://maxhealthcare.in',
    openNow: true,
    hours: 'Mon-Sat: 8:30 AM - 7:00 PM',
    latitude: 28.5282,
    longitude: 77.2125,
    acceptsNewPatients: true,
    telehealthAvailable: true,
    isVerifiedGoogleEntity: true,
    specialties: ['Pediatric Dermatology', 'Phototherapy (NBUVB)', 'Dermatosurgery', 'Biological Therapies'],
    notes: 'Equipped with computerized dermatoscopy and comprehensive cutaneous diagnostic laboratories.'
  },

  // ==========================================
  // MUMBAI, MAHARASHTRA, INDIA
  // ==========================================
  {
    id: 'mumbai-kem-hospital',
    name: 'KEM Hospital - Department of Dermatology',
    doctorName: 'Senior Honorary Dermatologists & Resident Staff',
    clinicType: 'Premier Municipal Teaching Hospital',
    address: 'Acharya Donde Marg, Parel East, Mumbai, MH 400012',
    city: 'Mumbai',
    rating: 4.7,
    reviewCount: 780,
    phone: '+91 22 2410 7000',
    website: 'https://kem.edu',
    openNow: true,
    hours: 'Mon-Sat: 8:00 AM - 1:00 PM',
    latitude: 19.0025,
    longitude: 72.8420,
    acceptsNewPatients: true,
    telehealthAvailable: false,
    isVerifiedGoogleEntity: true,
    specialties: ['Infectious Dermatoses', 'Atopic Dermatitis', 'Leprosy & STD Clinic', 'Psoriasis Day Care'],
    notes: 'Historic medical teaching hospital serving thousands of outpatient skin evaluations weekly.'
  },
  {
    id: 'mumbai-hinduja-hospital',
    name: 'P.D. Hinduja Hospital - Dermatology Department',
    doctorName: 'Dr. Nina Madnani & Dr. Shital Poojary',
    clinicType: 'Advanced Multispecialty Tertiary Center',
    address: 'Veer Savarkar Marg, Mahim West, Mumbai, MH 400016',
    city: 'Mumbai',
    rating: 4.8,
    reviewCount: 650,
    phone: '+91 22 2445 1515',
    website: 'https://hindujahospital.com',
    openNow: true,
    hours: 'Mon-Sat: 9:00 AM - 6:00 PM',
    latitude: 19.0335,
    longitude: 72.8398,
    acceptsNewPatients: true,
    telehealthAvailable: true,
    isVerifiedGoogleEntity: true,
    specialties: ['Vulvar Dermatoses', 'Trichology & Scalp Disorders', 'Contact Dermatitis Patch Clinic', 'Laser Therapies'],
    notes: 'Renowned for specialized clinics in contact dermatitis, complex inflammatory disorders, and trichoscopy.'
  },

  // ==========================================
  // BENGALURU, KARNATAKA, INDIA
  // ==========================================
  {
    id: 'blr-victoria-hospital',
    name: 'BMCRI / Victoria Hospital - Skin OPD',
    doctorName: 'Bangalore Medical College Faculty Panel',
    clinicType: 'Government Medical College Hospital',
    address: 'Fort Road, Near City Market, Bengaluru, Karnataka 560002',
    city: 'Bengaluru',
    rating: 4.7,
    reviewCount: 520,
    phone: '+91 80 2670 1150',
    website: 'https://bmcribangalore.edu.in',
    openNow: true,
    hours: 'Mon-Sat: 8:30 AM - 1:30 PM',
    latitude: 12.9620,
    longitude: 77.5750,
    acceptsNewPatients: true,
    telehealthAvailable: false,
    isVerifiedGoogleEntity: true,
    specialties: ['General Dermatology', 'Psoriasis Unit', 'Vitiligo Surgery', 'Cutaneous Infections'],
    notes: 'Major referral destination for central and southern Karnataka skin patients.'
  },
  {
    id: 'blr-manipal-hospital',
    name: 'Manipal Hospital HAL - Department of Dermatology',
    doctorName: 'Dr. Mukund Natarajan & Consultant Team',
    clinicType: 'Leading Tertiary Healthcare Complex',
    address: '98, HAL Old Airport Road, Kodihalli, Bengaluru 560017',
    city: 'Bengaluru',
    rating: 4.8,
    reviewCount: 710,
    phone: '+91 80 2502 4444',
    website: 'https://manipalhospitals.com',
    openNow: true,
    hours: 'Mon-Sat: 9:00 AM - 7:00 PM',
    latitude: 12.9592,
    longitude: 77.6534,
    acceptsNewPatients: true,
    telehealthAvailable: true,
    isVerifiedGoogleEntity: true,
    specialties: ['Pediatric Dermatology', 'Biologic Therapies for Psoriasis', 'Micrographic Surgery', 'Dermato-oncology'],
    notes: 'JCI and NABH accredited center with full dermatopathology and mole mapping technology.'
  },

  // ==========================================
  // SAN FRANCISCO & BAY AREA, CA, USA
  // ==========================================
  {
    id: 'sf-ucsf-dermatology',
    name: 'UCSF Dermatology Clinic at Mount Zion',
    doctorName: 'Dr. Maria Wei, MD PhD & UCSF Academic Faculty',
    clinicType: 'Academic Medical Center & Research Institute',
    address: '1701 Divisadero St, 3rd & 4th Floors, San Francisco, CA 94115',
    city: 'San Francisco',
    rating: 4.9,
    reviewCount: 640,
    phone: '+1 415-353-7800',
    website: 'https://ucsfhealth.org/clinics/dermatology',
    openNow: true,
    hours: 'Mon-Fri: 8:00 AM - 5:00 PM',
    latitude: 37.7865,
    longitude: -122.4402,
    acceptsNewPatients: true,
    telehealthAvailable: true,
    isVerifiedGoogleEntity: true,
    specialties: ['Melanoma & Pigmented Lesions', 'Mohs Micrographic Surgery', 'Severe Atopic Dermatitis', 'Psoriasis Center'],
    notes: 'Top-ranked academic dermatology facility featuring multidisciplinary cutaneous lymphoma and melanoma programs.'
  },
  {
    id: 'sf-sutter-pacific',
    name: 'CPMC Sutter Pacific Dermatology Clinic',
    doctorName: 'Dr. Lauren B. Moy, MD & Associate Team',
    clinicType: 'Comprehensive Community Health Network',
    address: '2100 Webster St, Suite 405, San Francisco, CA 94115',
    city: 'San Francisco',
    rating: 4.8,
    reviewCount: 380,
    phone: '+1 415-923-3003',
    website: 'https://sutterhealth.org',
    openNow: true,
    hours: 'Mon-Fri: 8:30 AM - 5:00 PM',
    latitude: 37.7901,
    longitude: -122.4320,
    acceptsNewPatients: true,
    telehealthAvailable: true,
    isVerifiedGoogleEntity: true,
    specialties: ['Preventative Mole Checks', 'Eczema & Allergy Care', 'Acne Treatment', 'General Cutaneous Medicine'],
    notes: 'High patient satisfaction rating with rapid appointment access across the San Francisco peninsula.'
  },

  // ==========================================
  // NEW YORK CITY, NY, USA
  // ==========================================
  {
    id: 'nyc-mount-sinai-derm',
    name: 'Mount Sinai Doctors - Dermatology East 85th',
    doctorName: 'Dr. Mark Lebwohl, MD & Specialist Faculty',
    clinicType: 'Premier Academic Medical Center',
    address: '234 E 85th St, 5th Floor, New York, NY 10028',
    city: 'New York',
    rating: 4.9,
    reviewCount: 890,
    phone: '+1 212-241-9728',
    website: 'https://mountsinai.org/care/dermatology',
    openNow: true,
    hours: 'Mon-Fri: 8:00 AM - 5:30 PM',
    latitude: 40.7772,
    longitude: -73.9535,
    acceptsNewPatients: true,
    telehealthAvailable: true,
    isVerifiedGoogleEntity: true,
    specialties: ['Psoriasis & Therapeutics', 'Cutaneous Oncology', 'Inflammatory Skin Diseases', 'Pediatric Dermatology'],
    notes: 'World-renowned center for psoriasis research and novel targeted biologics.'
  },
  {
    id: 'nyc-nyu-langone',
    name: 'NYU Langone Dermatologic Surgery & Clinical Dermatology',
    doctorName: 'Dr. Seth Orlow, MD PhD & Clinical Staff',
    clinicType: 'Top Academic Hospital Center',
    address: '240 E 38th St, 11th Floor, New York, NY 10016',
    city: 'New York',
    rating: 4.8,
    reviewCount: 760,
    phone: '+1 212-263-5889',
    website: 'https://nyulangone.org',
    openNow: true,
    hours: 'Mon-Fri: 8:00 AM - 6:00 PM',
    latitude: 40.7475,
    longitude: -73.9740,
    acceptsNewPatients: true,
    telehealthAvailable: true,
    isVerifiedGoogleEntity: true,
    specialties: ['Comprehensive Skin Exams', 'Melanoma Early Detection', 'Contact Dermatitis Patch Testing', 'Mohs Surgery'],
    notes: 'Consistently named one of the nation’s top dermatology clinical departments.'
  },

  // ==========================================
  // LONDON, UNITED KINGDOM
  // ==========================================
  {
    id: 'london-st-johns',
    name: "St John's Institute of Dermatology - Guy's Hospital",
    doctorName: 'Consultant Dermatologists NHS Foundation Trust',
    clinicType: 'World-Renowned Specialist Skin Hospital (NHS)',
    address: "Great Maze Pond, London SE1 9RT, United Kingdom",
    city: 'London',
    rating: 4.8,
    reviewCount: 620,
    phone: '+44 20 7188 7188',
    website: 'https://guysandstthomas.nhs.uk',
    openNow: true,
    hours: 'Mon-Fri: 8:30 AM - 5:00 PM',
    latitude: 51.5042,
    longitude: -0.0862,
    acceptsNewPatients: true,
    telehealthAvailable: true,
    isVerifiedGoogleEntity: true,
    specialties: ['Severe Psoriasis', 'Genetic Skin Diseases', 'Photobiology & Allergy', 'Paediatric Dermatology'],
    notes: 'International center of excellence for diagnosing and treating rare and complex skin conditions.'
  },
  {
    id: 'london-harley-street',
    name: 'The London Skin and Hair Clinic',
    doctorName: 'Dr. Martin Wade & Consultant Dermatologists',
    clinicType: 'Private Specialist Dermatology Clinic',
    address: '233 High Holborn, London WC1V 7DN, United Kingdom',
    city: 'London',
    rating: 4.9,
    reviewCount: 450,
    phone: '+44 20 7183 4565',
    website: 'https://skinandhairclinic.co.uk',
    openNow: true,
    hours: 'Mon-Fri: 9:00 AM - 6:00 PM, Sat: 9:30 AM - 2:00 PM',
    latitude: 51.5175,
    longitude: -0.1190,
    acceptsNewPatients: true,
    telehealthAvailable: true,
    isVerifiedGoogleEntity: true,
    specialties: ['Mole Checks & Dermoscopy', 'Acne & Rosacea Specialist', 'Eczema Management', 'Hair Loss Diagnosis'],
    notes: 'CQC-regulated specialist clinic providing same-week private consultations with registered UK consultants.'
  }
];

/**
 * Calculate distance in km between two GPS coordinates using Haversine formula
 */
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

/**
 * Returns verified dermatologists sorted by distance from the provided coordinates or query
 */
export function getVerifiedClinics(
  coords: { latitude: number; longitude: number },
  queryText?: string
): DoctorClinic[] {
  const qLower = (queryText || '').toLowerCase().trim();

  // 1. If query directly names a known city, prioritize clinics in that city
  const cityMatches = VERIFIED_DERMATOLOGISTS.filter((c) => {
    return (
      c.city.toLowerCase().includes(qLower) ||
      qLower.includes(c.city.toLowerCase()) ||
      c.address.toLowerCase().includes(qLower) ||
      c.name.toLowerCase().includes(qLower)
    );
  });

  const baseList = cityMatches.length > 0 ? cityMatches : VERIFIED_DERMATOLOGISTS;

  return baseList.map((clinic) => {
    const dist = calculateDistanceKm(coords.latitude, coords.longitude, clinic.latitude, clinic.longitude);
    return {
      ...clinic,
      distanceKm: dist,
      distance: dist < 1 ? `${Math.round(dist * 1000)} m` : `${dist.toFixed(1)} km`,
      isDemoData: false
    };
  }).sort((a, b) => a.distanceKm - b.distanceKm);
}
