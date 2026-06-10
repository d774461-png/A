const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

test('combo data exposes four presets with mouse inputs and DPS values', () => {
  const source = fs.readFileSync('app.js', 'utf8');
  const context = {
    document: {
      querySelector: () => ({
        innerHTML: '',
        textContent: '',
        addEventListener: () => {},
        classList: { toggle: () => {} }
      }),
      querySelectorAll: () => [],
      addEventListener: () => {}
    }
  };
  vm.createContext(context);
  vm.runInContext(`${source}\nthis.__combos = combos; this.__inputToMouse = inputToMouse;`, context);

  assert.equal(context.__combos.length, 4);
  assert.deepEqual(Object.keys(context.__inputToMouse), ['Attack', 'Dash', 'Walk Cancel']);
  assert.ok(context.__combos.every((combo) => combo.theoreticalDps >= 100));
  assert.ok(context.__combos.every((combo) => combo.videoUrl.includes('youtube.com')));
});
