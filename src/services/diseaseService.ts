import { DiseaseInfo } from '../types';
import { DISEASES_DATABASE, getDiseaseById } from '../data/diseases';

export async function fetchDiseases(): Promise<DiseaseInfo[]> {
  try {
    const res = await fetch('/api/diseases');
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    // fallback
  }
  return DISEASES_DATABASE;
}

export async function fetchDiseaseById(id: string): Promise<DiseaseInfo | undefined> {
  try {
    const res = await fetch(`/api/diseases/${encodeURIComponent(id)}`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    // fallback
  }
  return getDiseaseById(id);
}
