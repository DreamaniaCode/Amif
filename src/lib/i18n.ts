import type { Locale, Dictionary } from '@/types';
import { getCMSEnrichedDictionary } from './cms';

const dictionaries: Record<string, () => Promise<Dictionary>> = {
  fr: () => import('@/dictionaries/fr.json').then((m) => m.default as Dictionary),
  ar: () => import('@/dictionaries/ar.json').then((m) => m.default as Dictionary),
};

export const getDictionary = async (locale: Locale) => {
  const baseDict = await (dictionaries[locale]?.() ?? dictionaries['fr']());
  return getCMSEnrichedDictionary(locale, baseDict);
};
