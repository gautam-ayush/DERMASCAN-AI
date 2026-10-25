import { DoctorClinic } from '../types';
import { VERIFIED_DERMATOLOGISTS } from '../data/verifiedDermatologists';

export interface DoctorSearchParams {
  query?: string;
  specialty?: string;
  openOnly?: boolean;
  telehealthOnly?: boolean;
}

/**
 * Service to search verified dermatologists and specialized skin clinics
 * without requiring Google Maps API or device GPS location.
 */
export async function fetchDoctors(params: DoctorSearchParams = {}): Promise<DoctorClinic[]> {
  const { query, specialty, openOnly, telehealthOnly } = params;

  // Attempt backend API if running
  try {
    const searchParams = new URLSearchParams();
    if (query) searchParams.append('query', query);
    if (specialty) searchParams.append('specialty', specialty);
    if (openOnly) searchParams.append('openOnly', 'true');
    if (telehealthOnly) searchParams.append('telehealthOnly', 'true');

    const res = await fetch(`/api/doctors?${searchParams.toString()}`);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    }
  } catch (err) {
    console.warn('[DoctorService] Backend query failed, using built-in directory registry:', err);
  }

  // Local verified specialist directory
  let list = [...VERIFIED_DERMATOLOGISTS];

  if (query && query.trim()) {
    const q = query.toLowerCase().trim();
    list = list.filter((c) =>
      c.name.toLowerCase().includes(q) ||
      (c.doctorName && c.doctorName.toLowerCase().includes(q)) ||
      c.city.toLowerCase().includes(q) ||
      c.clinicType.toLowerCase().includes(q) ||
      (c.specialties && c.specialties.some((s) => s.toLowerCase().includes(q))) ||
      c.address.toLowerCase().includes(q)
    );
  }

  if (specialty && specialty !== 'All Specialties') {
    const sLower = specialty.toLowerCase();
    list = list.filter((c) =>
      c.clinicType.toLowerCase().includes(sLower) ||
      (c.specialties && c.specialties.some((s) => s.toLowerCase().includes(sLower)))
    );
  }

  if (openOnly) {
    list = list.filter((c) => c.openNow);
  }

  if (telehealthOnly) {
    list = list.filter((c) => c.telehealthAvailable);
  }

  return list;
}

/**
 * Available clinical specialty filters for easy condition-specific directory lookup
 */
export const DERMATOLOGY_SPECIALTIES = [
  'All Specialties',
  'General & Medical Dermatology',
  'Pediatric Dermatology',
  'Surgical & Dermato-Oncology',
  'Psoriasis & Inflammatory Disorders',
  'Acne, Rosacea & Cosmetic Dermatology',
  'Contact Dermatitis & Allergology',
  'Tele-Dermatology & Digital Consultation',
];
