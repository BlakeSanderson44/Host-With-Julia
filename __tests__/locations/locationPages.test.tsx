import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import EdmondsPage from '../../app/locations/edmonds/page';
import LakeChelanPage from '../../app/locations/lake-chelan/page';
import MtRainierPage from '../../app/locations/mt-rainier/page';

type Case = {
  name: string;
  Component: () => React.ReactElement;
};

const cases: Case[] = [
  { name: 'Edmonds', Component: EdmondsPage },
  { name: 'Lake Chelan', Component: LakeChelanPage },
  { name: 'Mt. Rainier / Ashford', Component: MtRainierPage },
];

for (const { name, Component } of cases) {
  test(`${name} page renders expected structure`, () => {
    const markup = renderToStaticMarkup(<Component />);

    assert.ok(markup.length > 0, `${name} page did not render any markup`);
    assert.ok(
      markup.includes('aria-label="Breadcrumb"'),
      `${name} page is missing breadcrumb navigation`,
    );
    assert.ok(
      markup.includes('href="/#contact"'),
      `${name} page should link CTA to /#contact`,
    );
    assert.ok(
      markup.includes('href="/#properties"'),
      `${name} page should link CTA to /#properties`,
    );
  });
}
