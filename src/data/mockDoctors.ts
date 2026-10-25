import { DoctorClinic, Coordinates } from '../types';

export const BASE_CLINICS: Omit<DoctorClinic, 'distance' | 'distanceKm'>[] = [
  {
    id: 'clinic-1',
    name: 'University Skin & Dermatology Health Center',
    clinicType: 'Academic Medical Center & Clinical Research',
    address: '420 Health Science Blvd, Suite 300',
    city: 'Metro Medical District',
    rating: 4.9,
    reviewCount: 184,
    phone: '+1 (555) 234-8901',
    website: 'https://example.org/health/dermatology',
    openNow: true,
    hours: 'Mon-Fri: 8:00 AM - 5:30 PM',
    latitude: 37.7749,
    longitude: -122.4194,
    acceptsNewPatients: true,
    telehealthAvailable: true,
    isDemoData: true,
  },
  {
    id: 'clinic-2',
    name: 'Metropolitan Dermatology & Laser Institute',
    clinicType: 'Comprehensive Cutaneous Medicine',
    address: '1088 Pine Crest Plaza, Suite 410',
    city: 'Downtown Core',
    rating: 4.8,
    reviewCount: 312,
    phone: '+1 (555) 345-6789',
    website: 'https://example.com/metro-derm',
    openNow: true,
    hours: 'Mon-Sat: 8:30 AM - 6:00 PM',
    latitude: 37.7833,
    longitude: -122.4167,
    acceptsNewPatients: true,
    telehealthAvailable: true,
    isDemoData: true,
  },
  {
    id: 'clinic-3',
    name: 'Northside Advanced Phototherapy & Eczema Care',
    clinicType: 'Specialized Inflammatory Dermatoses Care',
    address: '715 Northern Heights Road',
    city: 'Northside',
    rating: 4.7,
    reviewCount: 96,
    phone: '+1 (555) 456-7890',
    website: 'https://example.com/northside-photo-derm',
    openNow: false,
    hours: 'Mon-Thu: 9:00 AM - 5:00 PM',
    latitude: 37.7915,
    longitude: -122.4089,
    acceptsNewPatients: true,
    telehealthAvailable: false,
    isDemoData: true,
  },
  {
    id: 'clinic-4',
    name: 'Civic Center Clinical Dermoscopy & Skin Check',
    clinicType: 'Preventative Skin Exam & Dermoscopy',
    address: '230 Golden Gate Avenue, 2nd Floor',
    city: 'Civic District',
    rating: 4.9,
    reviewCount: 228,
    phone: '+1 (555) 567-8901',
    website: 'https://example.com/civic-derm-check',
    openNow: true,
    hours: 'Mon-Fri: 8:00 AM - 5:00 PM',
    latitude: 37.7812,
    longitude: -122.4178,
    acceptsNewPatients: false,
    telehealthAvailable: true,
    isDemoData: true,
  },
  {
    id: 'clinic-5',
    name: 'Community Care Allied Dermatology Associates',
    clinicType: 'Community Health & Rapid Access Clinic',
    address: '1540 Mission Valley Court',
    city: 'Mission Valley',
    rating: 4.6,
    reviewCount: 142,
    phone: '+1 (555) 678-9012',
    website: 'https://example.org/community-derm',
    openNow: true,
    hours: 'Mon-Fri: 7:30 AM - 4:30 PM',
    latitude: 37.7650,
    longitude: -122.4220,
    acceptsNewPatients: true,
    telehealthAvailable: true,
    isDemoData: true,
  },
  {
    id: 'clinic-6',
    name: 'Harbor Point Pediatric & Adult Skin Specialists',
    clinicType: 'Family & Pediatric Dermatology',
    address: '89 Maritime Way, Suite 102',
    city: 'Bayside Waterfront',
    rating: 4.8,
    reviewCount: 175,
    phone: '+1 (555) 789-0123',
    website: 'https://example.com/harborpoint-skin',
    openNow: false,
    hours: 'Mon-Fri: 9:00 AM - 4:30 PM',
    latitude: 37.7950,
    longitude: -122.3950,
    acceptsNewPatients: true,
    telehealthAvailable: true,
    isDemoData: true,
  }
];

// Haversine formula to compute great-circle distance between two points in km
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

export const KNOWN_SEARCH_LOCATIONS: Record<string, Coordinates & { name: string; country?: string }> = {
  // India & Regional hubs
  'bhopal': { latitude: 23.2599, longitude: 77.4126, name: 'Bhopal, Madhya Pradesh, India', country: 'IN' },
  'indore': { latitude: 22.7196, longitude: 75.8577, name: 'Indore, Madhya Pradesh, India', country: 'IN' },
  'delhi': { latitude: 28.6139, longitude: 77.2090, name: 'New Delhi, India', country: 'IN' },
  'new delhi': { latitude: 28.6139, longitude: 77.2090, name: 'New Delhi, India', country: 'IN' },
  'mumbai': { latitude: 19.0760, longitude: 72.8777, name: 'Mumbai, Maharashtra, India', country: 'IN' },
  'bangalore': { latitude: 12.9716, longitude: 77.5946, name: 'Bengaluru, Karnataka, India', country: 'IN' },
  'bengaluru': { latitude: 12.9716, longitude: 77.5946, name: 'Bengaluru, Karnataka, India', country: 'IN' },
  'hyderabad': { latitude: 17.3850, longitude: 78.4867, name: 'Hyderabad, Telangana, India', country: 'IN' },
  'chennai': { latitude: 13.0827, longitude: 80.2707, name: 'Chennai, Tamil Nadu, India', country: 'IN' },
  'kolkata': { latitude: 22.5726, longitude: 88.3639, name: 'Kolkata, West Bengal, India', country: 'IN' },
  'pune': { latitude: 18.5204, longitude: 73.8567, name: 'Pune, Maharashtra, India', country: 'IN' },
  'ahmedabad': { latitude: 23.0225, longitude: 72.5714, name: 'Ahmedabad, Gujarat, India', country: 'IN' },
  'jaipur': { latitude: 26.9124, longitude: 75.7873, name: 'Jaipur, Rajasthan, India', country: 'IN' },
  // North America
  'san francisco': { latitude: 37.7749, longitude: -122.4194, name: 'San Francisco, CA, USA', country: 'US' },
  'new york': { latitude: 40.7128, longitude: -74.0060, name: 'New York, NY, USA', country: 'US' },
  'los angeles': { latitude: 34.0522, longitude: -118.2437, name: 'Los Angeles, CA, USA', country: 'US' },
  'chicago': { latitude: 41.8781, longitude: -87.6298, name: 'Chicago, IL, USA', country: 'US' },
  'boston': { latitude: 42.3601, longitude: -71.0589, name: 'Boston, MA, USA', country: 'US' },
  'seattle': { latitude: 47.6062, longitude: -122.3321, name: 'Seattle, WA, USA', country: 'US' },
  'austin': { latitude: 30.2672, longitude: -97.7431, name: 'Austin, TX, USA', country: 'US' },
  'houston': { latitude: 29.7604, longitude: -95.3698, name: 'Houston, TX, USA', country: 'US' },
  'toronto': { latitude: 43.6532, longitude: -79.3832, name: 'Toronto, Ontario, Canada', country: 'CA' },
  'vancouver': { latitude: 49.2827, longitude: -123.1207, name: 'Vancouver, BC, Canada', country: 'CA' },
  // International
  'london': { latitude: 51.5074, longitude: -0.1278, name: 'London, United Kingdom', country: 'UK' },
  'singapore': { latitude: 1.3521, longitude: 103.8198, name: 'Singapore', country: 'SG' },
  'sydney': { latitude: -33.8688, longitude: 151.2093, name: 'Sydney, Australia', country: 'AU' },
  'melbourne': { latitude: -37.8136, longitude: 144.9631, name: 'Melbourne, Australia', country: 'AU' },
  'dubai': { latitude: 25.2048, longitude: 55.2708, name: 'Dubai, United Arab Emirates', country: 'AE' },
  'paris': { latitude: 48.8566, longitude: 2.3522, name: 'Paris, France', country: 'FR' },
  'berlin': { latitude: 52.5200, longitude: 13.4050, name: 'Berlin, Germany', country: 'DE' }
};

/**
 * Generates nearby clinics relative to user coordinates,
 * offsetting coordinates realistically so they cluster naturally around the target location
 */
export function getClinicsNear(coords: Coordinates, locationName?: string): DoctorClinic[] {
  // Offsets in degrees (~1-5 km)
  const offsets = [
    { dLat: 0.012, dLon: 0.015, nameMod: 'Central Hospital Wing', distMod: 1.4 },
    { dLat: -0.018, dLon: 0.009, nameMod: 'Metro Medical District', distMod: 2.3 },
    { dLat: 0.024, dLon: -0.019, nameMod: 'University Health Plaza', distMod: 3.2 },
    { dLat: -0.008, dLon: -0.022, nameMod: 'Valley Specialized Care', distMod: 2.8 },
    { dLat: 0.035, dLon: 0.025, nameMod: 'North Park Clinic', distMod: 4.6 },
    { dLat: -0.031, dLon: 0.038, nameMod: 'Westside Integrated Care', distMod: 5.1 }
  ];

  const cleanLocName = locationName ? locationName.split(',')[0].trim() : '';

  return BASE_CLINICS.map((clinic, index) => {
    const offset = offsets[index % offsets.length];
    const lat = coords.latitude + offset.dLat;
    const lon = coords.longitude + offset.dLon;
    const distanceKm = calculateDistanceKm(coords.latitude, coords.longitude, lat, lon);

    // Context-adaptive clinic naming
    let dynamicName = `${clinic.name} (${offset.nameMod})`;
    let dynamicCity = clinic.city;
    let dynamicAddress = clinic.address;

    if (cleanLocName) {
      const prefixes = [
        `${cleanLocName} Medical University Dermatology Center`,
        `${cleanLocName} Advanced Cutaneous & Laser Institute`,
        `${cleanLocName} Phototherapy & Chronic Skin Care`,
        `${cleanLocName} Clinical Dermoscopy & Melanoma Screening`,
        `Community Skin Health Clinic of ${cleanLocName}`,
        `${cleanLocName} Pediatric & Adult Cutaneous Specialists`
      ];
      dynamicName = prefixes[index % prefixes.length];
      dynamicCity = cleanLocName;
      dynamicAddress = `${120 + index * 45} Medical Square, Suite ${200 + index * 10}, ${cleanLocName}`;
    }

    return {
      ...clinic,
      id: `clinic-${index + 1}-${Math.round(lat * 1000)}`,
      name: dynamicName,
      city: dynamicCity,
      address: dynamicAddress,
      latitude: lat,
      longitude: lon,
      distanceKm,
      distance: `${distanceKm.toFixed(1)} km`,
      isDemoData: true
    };
  }).sort((a, b) => a.distanceKm - b.distanceKm);
}
