import { prisma } from '../src/lib/prisma';
import fs from 'fs';
import path from 'path';

function flattenDict(obj: any, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {};
  
  function recurse(current: any, path: string) {
    if (typeof current === 'object' && current !== null) {
      if (Array.isArray(current)) {
        current.forEach((val, idx) => {
          recurse(val, path ? `${path}.${idx}` : `${idx}`);
        });
      } else {
        for (const key in current) {
          recurse(current[key], path ? `${path}.${key}` : key);
        }
      }
    } else {
      result[path] = String(current);
    }
  }
  
  recurse(obj, prefix);
  return result;
}

function parseFlatKey(flatKey: string) {
  const parts = flatKey.split('.');
  const page = parts[0];
  if (parts.length === 1) {
    return { page, section: '', key: '' };
  }
  if (parts.length === 2) {
    return { page, section: '', key: parts[1] };
  }
  const key = parts[parts.length - 1];
  const section = parts.slice(1, parts.length - 1).join('.');
  return { page, section, key };
}

async function main() {
  console.log('🌱 Seeding CMS PageContent from JSON dictionaries...');
  
  const frPath = path.join(__dirname, '../src/dictionaries/fr.json');
  const arPath = path.join(__dirname, '../src/dictionaries/ar.json');
  
  const frDict = JSON.parse(fs.readFileSync(frPath, 'utf-8'));
  const arDict = JSON.parse(fs.readFileSync(arPath, 'utf-8'));
  
  const flatFr = flattenDict(frDict);
  const flatAr = flattenDict(arDict);
  
  // We will seed all root keys EXCEPT 'admin'
  const keysToSeed = Object.keys(flatFr).filter(k => !k.startsWith('admin.'));
  
  for (const flatKey of keysToSeed) {
    const { page, section, key } = parseFlatKey(flatKey);
    const valueFr = flatFr[flatKey];
    const valueAr = flatAr[flatKey] || '';
    
    await prisma.pageContent.upsert({
      where: {
        page_section_key: {
          page,
          section,
          key
        }
      },
      update: {
        // Only update if they don't exist? Actually let's just insert missing
        // or update them so that they are in sync
      },
      create: {
        page,
        section,
        key,
        valueFr,
        valueAr
      }
    });
  }
  
  console.log(`✅ Successfully seeded ${keysToSeed.length} CMS keys!`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
