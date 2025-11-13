import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import test from 'node:test';

type Case = {
  name: string;
  file: string;
};

const projectRoot = process.cwd();

const cases: Case[] = [
  { name: 'Edmonds', file: 'app/locations/edmonds/page.tsx' },
  { name: 'Lake Chelan', file: 'app/locations/lake-chelan/page.tsx' },
  { name: 'Mt. Rainier / Ashford', file: 'app/locations/mt-rainier/page.tsx' },
];

for (const { name, file } of cases) {
  test(`${name} page includes expected navigation markup`, () => {
    const absolutePath = path.join(projectRoot, file);
    const source = readFileSync(absolutePath, 'utf8');

    assert.ok(source.includes('aria-label="Breadcrumb"'), `${name} page is missing breadcrumb navigation`);
    assert.ok(source.includes('href="/#contact"'), `${name} page should link CTA to /#contact`);
    assert.ok(source.includes('href="/#properties"'), `${name} page should link CTA to /#properties`);
  });
}
