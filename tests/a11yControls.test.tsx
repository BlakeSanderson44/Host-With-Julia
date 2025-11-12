import { strict as assert } from 'node:assert';
import { afterEach, test } from 'node:test';
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';

import ComparisonToggle from '../components/ComparisonToggle';
import SiteFooter from '../components/SiteFooter';
import type { NavItem } from '../components/Header';

afterEach(() => {
  cleanup();
});

test('comparison toggle exposes descriptive tabs', () => {
  render(
    <ComparisonToggle
      comparisonRows={[
        { label: '24/7 Guest Messaging', owner: { icon: 'x' }, julia: { icon: 'check' } },
        { label: 'Monthly Reporting', owner: { text: 'Ad-hoc' }, julia: { text: 'Included' } },
      ]}
    />,
  );

  const juliaTab = screen.getByRole('tab', { name: 'Host With Julia' });
  const ownerTab = screen.getByRole('tab', { name: 'Owner-Managed' });

  assert.equal(juliaTab.getAttribute('aria-selected'), 'true');
  assert.equal(ownerTab.getAttribute('aria-selected'), 'false');
});

test('footer landmark exposes social link by name', () => {
  const navItems: NavItem[] = [
    { href: '#services', label: 'Services' },
    { href: '#contact', label: 'Contact' },
  ];

  render(<SiteFooter navItems={navItems} />);

  const footer = screen.getByRole('contentinfo', { name: 'Site footer' });
  assert.ok(footer);

  const instagram = screen.getByRole('link', { name: 'Instagram' });
  assert.equal(instagram.getAttribute('href'), 'https://instagram.com/hostwithjulia');
});
