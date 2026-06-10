const fs = require('node:fs');
const assert = require('node:assert/strict');

const html = fs.readFileSync('index.html', 'utf8');
const js = fs.readFileSync('app.js', 'utf8');
const css = fs.readFileSync('styles.css', 'utf8');

for (const combo of ['Beginner N5D', 'Standard N2D', 'N3W Hybrid', 'Advanced N2D']) {
  assert.match(js, new RegExp(combo.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), `${combo} should be defined`);
}

for (const mode of ['Learn', 'Practice', 'Rhythm', 'DPS Simulator']) {
  assert.match(html, new RegExp(mode), `${mode} tab should exist`);
}

for (const input of ['Left Click', 'Right Click', 'Mouse Wheel Click']) {
  assert.match(html + js, new RegExp(input), `${input} mapping should be visible`);
}

assert.match(js, /theoreticalDps \* \(accuracy \/ 100\)/, 'effective DPS formula should multiply theoretical DPS by accuracy');
assert.match(js, /youtube\.com/, 'video guide links should use YouTube');
assert.match(css, /video-grid/, 'video guide cards should be styled');
