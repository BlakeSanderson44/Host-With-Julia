const ReactDOMServer = require('react-dom/server');

let currentMarkup = '';

class StaticElement {
  constructor(tag, attributes, content) {
    this.tagName = tag;
    this._attributes = attributes;
    this._content = content;
  }

  getAttribute(name) {
    const key = name.toLowerCase();
    return this._attributes[key] ?? null;
  }

  get textContent() {
    return stripTags(this._content);
  }
}

function stripTags(value) {
  return value.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
}

function parseAttributes(raw) {
  const attributes = {};
  const attrPattern = /(\S+)=(["'])([\s\S]*?)\2/g;
  let match;
  while ((match = attrPattern.exec(raw)) !== null) {
    const [, name, , value] = match;
    attributes[name.toLowerCase()] = value;
  }
  return attributes;
}

function findByRole(markup, role) {
  const pattern = new RegExp(
    `<([a-zA-Z0-9:-]+)([^>]*?role=["']${role}["'][^>]*)>([\\s\\S]*?)</\\1>`,
    'g',
  );
  const results = [];
  let match;
  while ((match = pattern.exec(markup)) !== null) {
    const [, tag, attrChunk, content] = match;
    const attributes = parseAttributes(attrChunk);
    const element = new StaticElement(tag, attributes, content);
    if (process.env['DEBUG_A11Y_TESTS']) {
      console.log('found role candidate', role, attributes, element.textContent);
    }
    results.push(element);
  }
  const implicitTagMap = {
    contentinfo: 'footer',
    navigation: 'nav',
    main: 'main',
    link: 'a',
  };
  const tag = implicitTagMap[role];
  if (tag) {
    const implicitPattern = new RegExp(`<${tag}([^>]*)>([\\s\\S]*?)</${tag}>`, 'g');
    while ((match = implicitPattern.exec(markup)) !== null) {
      const [, attrChunk, content] = match;
      const attributes = parseAttributes(attrChunk);
      if (attributes['role']) continue;
      const element = new StaticElement(tag, attributes, content);
      if (process.env['DEBUG_A11Y_TESTS']) {
        console.log('found implicit role candidate', role, attributes, element.textContent);
      }
      results.push(element);
    }
  }
  if (process.env['DEBUG_A11Y_TESTS'] && results.length === 0) {
    console.log('no matches for role', role, 'with regex', pattern, 'in markup length', markup.length);
  }
  return results;
}

function matchAccessibleName(element, expected) {
  if (!expected) return true;
  const accessibleName = element.getAttribute('aria-label') || element.textContent;
  if (process.env['DEBUG_A11Y_TESTS']) {
    console.log('checking name', accessibleName, 'against', expected);
  }
  if (typeof expected === 'string') {
    return accessibleName === expected;
  }
  if (expected instanceof RegExp) {
    return expected.test(accessibleName);
  }
  if (typeof expected === 'function') {
    return expected(accessibleName);
  }
  return false;
}

function findByText(markup, expected) {
  const pattern = /<[^>]+>|([^<]+)/g;
  let match;
  while ((match = pattern.exec(markup)) !== null) {
    const text = match[1];
    if (!text) continue;
    const normalized = stripTags(text);
    if (!normalized) continue;
    if (typeof expected === 'string') {
      if (normalized === expected) {
        return new StaticElement('#text', {}, text);
      }
    } else if (expected.test(normalized)) {
      return new StaticElement('#text', {}, text);
    }
  }
  return null;
}

function render(ui) {
  currentMarkup = ReactDOMServer.renderToStaticMarkup(ui);
  const container = { innerHTML: currentMarkup };
  return {
    container,
    rerender(nextUi) {
      currentMarkup = ReactDOMServer.renderToStaticMarkup(nextUi);
      container.innerHTML = currentMarkup;
    },
    unmount() {
      currentMarkup = '';
      container.innerHTML = '';
    },
  };
}

function cleanup() {
  currentMarkup = '';
}

function getByRole(role, options = {}) {
  if (!currentMarkup) {
    throw new Error('No markup rendered. Call render() first.');
  }
  const matches = findByRole(currentMarkup, role);
  for (const element of matches) {
    if (matchAccessibleName(element, options.name)) {
      return element;
    }
  }
  const available = matches.map((item) => item.getAttribute('aria-label') || item.textContent);
  throw new Error(`Unable to find role "${role}" with name ${String(options.name)}. Found: [${available.join(', ')}]`);
}

function getByText(expected) {
  if (!currentMarkup) {
    throw new Error('No markup rendered. Call render() first.');
  }
  const match = findByText(currentMarkup, expected);
  if (!match) {
    throw new Error(`Unable to find text: ${expected}`);
  }
  return match;
}

const screen = {
  getByRole,
  getByText,
};

function fireEvent() {
  throw new Error('fireEvent is not supported in the static test environment.');
}

module.exports = {
  render,
  cleanup,
  fireEvent,
  screen,
  __getMarkup: () => currentMarkup,
};
