import { prisma } from './prisma';
import type { Dictionary, Locale } from '@/types';

/**
 * Sets a value at a nested path in an object.
 * e.g., setNestedPath(obj, 'hero.subtitle', 'New text')
 * e.g., setNestedPath(obj, 'poles.items.0.title', 'New title')
 */
function setNestedPath(obj: any, pathStr: string, value: any) {
  const parts = pathStr.split('.');
  let current = obj;
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    const nextPart = parts[i + 1];
    const isNextNumber = nextPart !== undefined && !isNaN(Number(nextPart));

    if (i === parts.length - 1) {
      current[part] = value;
    } else {
      if (current[part] === undefined) {
        current[part] = isNextNumber ? [] : {};
      }
      current = current[part];
    }
  }
}

/**
 * Fetches all PageContent overrides from the database and overlays them
 * onto the base JSON dictionary.
 */
export async function getCMSEnrichedDictionary(locale: Locale, baseDict: Dictionary): Promise<Dictionary> {
  try {
    const overrides = await prisma.pageContent.findMany();
    if (overrides.length === 0) return baseDict;

    // Deep clone the base dictionary
    const enriched = JSON.parse(JSON.stringify(baseDict));

    for (const record of overrides) {
      const value = locale === 'ar' ? record.valueAr : record.valueFr;
      
      // Skip empty database entries to fallback to JSON files
      if (value === undefined || value === null || value.trim() === '') continue;

      let path = '';
      if (record.page) {
        path += record.page;
      }
      if (record.section) {
        path += (path ? '.' : '') + record.section;
      }
      if (record.key) {
        path += (path ? '.' : '') + record.key;
      }

      if (path) {
        setNestedPath(enriched, path, value);
      }
    }

    return enriched;
  } catch (error) {
    console.error('Error enriching dictionary with CMS values:', error);
    return baseDict;
  }
}
