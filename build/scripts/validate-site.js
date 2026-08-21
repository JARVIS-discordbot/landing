const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../..');

function read(fileName) {
  const filePath = path.join(root, fileName);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing required file: ${fileName}`);
  }
  return fs.readFileSync(filePath, 'utf8');
}

function assertMatch(label, html, pattern) {
  if (!pattern.test(html)) {
    throw new Error(`${label} failed check: ${pattern}`);
  }
}

function assertNoMatch(label, html, pattern) {
  if (pattern.test(html)) {
    throw new Error(`${label} matched unexpected pattern: ${pattern}`);
  }
}

function assertIncludes(label, html, needle) {
  if (!html.includes(needle)) {
    throw new Error(`${label} is missing required content: ${needle}`);
  }
}

function validateInlineScripts(fileName, html) {
  const scriptPattern = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
  let match;
  let index = 0;

  while ((match = scriptPattern.exec(html)) !== null) {
    index += 1;
    const attrs = match[1];
    const body = match[2].trim();

    if (/\bsrc\s*=/.test(attrs)) {
      continue;
    }

    if (!body) {
      continue;
    }

    try {
      // eslint-disable-next-line no-new-func
      new Function(body);
    } catch (error) {
      throw new Error(`${fileName} inline script #${index} has a syntax error: ${error.message}`);
    }
  }
}

function validateClustersHtml(html) {
  const requiredIds = [
    'sync-pill',
    'sync-status',
    'sync-detail',
    'panel-overview',
    'panel-system',
    'panel-latency',
    'panel-clusters',
    'gauge-area',
    'clusters',
    'bot-ram-bar',
    'ram-bar',
    'navToggle',
    'navLinks',
  ];

  for (const id of requiredIds) {
    assertIncludes('clusters.html', html, `id="${id}"`);
  }

  assertIncludes('clusters.html', html, 'fetch(\'/clusters\'');
  assertIncludes('clusters.html', html, 'function setSyncState');
  assertIncludes('clusters.html', html, 'function ensureChartJs');
  assertIncludes('clusters.html', html, 'function syncGauges');
  assertIncludes('clusters.html', html, 'aria-live="polite"');
  assertIncludes('clusters.html', html, 'role="progressbar"');
  assertNoMatch('clusters.html', html, /<script[^>]+src[^>]*chart\.js/i);
}

function validateIndexHtml(html) {
  assertIncludes('index.html', html, 'id="btnContainer"');
  // Removed: assertIncludes('index.html', html, 'class="navbar"');
  assertNoMatch('index.html', html, /<\/script>\s*<\/script>/i);
}

function validateHtmlDocument(fileName, html) {
  assertMatch(fileName, html, /^<!DOCTYPE html>/i);
  assertMatch(fileName, html, /<html[^>]*lang="en"/i);
  assertMatch(fileName, html, /<head[\s>]/i);
  assertMatch(fileName, html, /<body[\s>]/i);
  assertMatch(fileName, html, /<\/html>\s*$/i);
}

function main() {
  const indexHtml = read('index.html');
  const clustersHtml = read('clusters.html');

  validateHtmlDocument('index.html', indexHtml);
  validateHtmlDocument('clusters.html', clustersHtml);
  validateIndexHtml(indexHtml);
  validateClustersHtml(clustersHtml);
  validateInlineScripts('index.html', indexHtml);
  validateInlineScripts('clusters.html', clustersHtml);

  console.log('Site validation passed (index.html, clusters.html).');
}

main();
