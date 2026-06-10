const combos = [
  {
    id: 'n5d',
    name: 'Beginner N5D',
    shortName: 'N5D',
    difficulty: 1,
    dpsRange: '100%',
    theoreticalDps: 100,
    summary: 'A forgiving starter loop built around full normal strings into dash cancels.',
    pattern: ['N5 → Dash', 'N5 → Dash', 'Repeat'],
    inputs: ['Attack', 'Attack', 'Attack', 'Attack', 'Attack', 'Dash', 'Attack', 'Attack', 'Attack', 'Attack', 'Attack', 'Dash'],
    advantages: ['Very easy to learn', 'Works on mobile', 'Consistent'],
    gains: [{ comparedTo: 'No Cancels', gain: '+8% to +12%' }],
    videoTitle: 'YouTube: Skirk beginner dash-cancel guides',
    videoUrl: 'https://www.youtube.com/results?search_query=Skirk+N5D+dash+cancel+combo+guide',
    videoNote: 'Searches YouTube for beginner N5D / dash-cancel demonstrations.'
  },
  {
    id: 'n2d',
    name: 'Standard N2D',
    shortName: 'N2D',
    difficulty: 3,
    dpsRange: '115-120%',
    theoreticalDps: 118,
    summary: 'The practical recommendation: repeat two attacks into dash for a trainable rhythm.',
    pattern: ['N2D', 'N2D', 'N2D', 'N2D'],
    inputs: ['Attack', 'Attack', 'Dash', 'Attack', 'Attack', 'Dash', 'Attack', 'Attack', 'Dash', 'Attack', 'Attack', 'Dash'],
    advantages: ['Current recommended combo', 'Reliable in real combat', 'Easy to rhythm train'],
    gains: [
      { comparedTo: 'N5D', gain: '+5% to +8%' },
      { comparedTo: 'No Cancels', gain: '+15% to +20%' }
    ],
    videoTitle: 'YouTube: Skirk N2D combo guide',
    videoUrl: 'https://www.youtube.com/results?search_query=Skirk+N2D+combo+guide',
    videoNote: 'N2D-focused guides and theorycrafting breakdowns.'
  },
  {
    id: 'n3w',
    name: 'N3W Hybrid',
    shortName: 'N3W Hybrid',
    difficulty: 4,
    dpsRange: '118-123%',
    theoreticalDps: 122,
    summary: 'A higher-ceiling hybrid that inserts N3 walk cancels between N2D strings.',
    pattern: ['N2D', 'N2D', 'N3W', 'N2D', 'N3W', 'N2D'],
    inputs: ['Attack', 'Attack', 'Dash', 'Attack', 'Attack', 'Dash', 'Attack', 'Attack', 'Attack', 'Walk Cancel', 'Attack', 'Attack', 'Dash', 'Attack', 'Attack', 'Attack', 'Walk Cancel', 'Attack', 'Attack', 'Dash'],
    advantages: ['Slightly higher theoretical DPS', 'Good for experienced players'],
    gains: [
      { comparedTo: 'N2D', gain: '+1% to +3%' },
      { comparedTo: 'N5D', gain: '+8% to +12%' }
    ],
    videoTitle: 'YouTube: N2D + N3W execution example',
    videoUrl: 'https://www.youtube.com/watch?v=AUxjMEfMYo0',
    videoNote: 'Direct example referenced by community discussion for N2D / N3W routing.'
  },
  {
    id: 'advanced-n2d',
    name: 'Advanced N2D',
    shortName: 'Advanced N2D',
    difficulty: 4,
    dpsRange: '117-122%',
    theoreticalDps: 120,
    summary: 'A continuous N2D route that avoids walk cancels while staying close to hybrid output.',
    pattern: ['N2D', 'N2D', 'N2D', 'N2D', 'N2D', 'N2D'],
    inputs: ['Attack', 'Attack', 'Dash', 'Attack', 'Attack', 'Dash', 'Attack', 'Attack', 'Dash', 'Attack', 'Attack', 'Dash', 'Attack', 'Attack', 'Dash', 'Attack', 'Attack', 'Dash'],
    advantages: ['No walk cancels', 'Easier than N3W', 'Extremely consistent'],
    gains: [
      { comparedTo: 'N3W Hybrid', gain: '-1% to +1%' },
      { comparedTo: 'N5D', gain: '+10% to +15%' }
    ],
    videoTitle: 'YouTube: Advanced continuous N2D guides',
    videoUrl: 'https://www.youtube.com/results?search_query=Skirk+continuous+N2D+combo+guide',
    videoNote: 'Searches YouTube for advanced N2D and no-walk-cancel variants.'
  }
];

const inputToMouse = {
  Attack: { button: 0, label: 'Left Click', glyph: '⬤' },
  Dash: { button: 2, label: 'Right Click', glyph: '◆' },
  'Walk Cancel': { button: 1, label: 'Mouse Wheel Click', glyph: '◉' }
};

let selectedCombo = combos[1];
let mode = 'learn';
let trainer = { index: 0, hits: 0, misses: 0 };

const $ = (selector) => document.querySelector(selector);

function renderComboList() {
  $('#comboList').innerHTML = combos.map((combo) => `
    <button class="combo-option ${combo.id === selectedCombo.id ? 'active' : ''}" data-combo="${combo.id}">
      <span>${combo.id === selectedCombo.id ? '●' : '○'}</span>
      <span>${combo.name}</span>
    </button>
  `).join('');
}

function stars(count) {
  return '★'.repeat(count) + '☆'.repeat(5 - count);
}

function renderSelectedCombo() {
  $('#comboTitle').textContent = selectedCombo.name;
  $('#comboSummary').textContent = selectedCombo.summary;
  $('#theoreticalDps').textContent = `${selectedCombo.theoreticalDps}%`;
  $('#dpsRange').textContent = selectedCombo.dpsRange;
  $('#difficultyStars').textContent = stars(selectedCombo.difficulty);
  $('#patternBlock').textContent = selectedCombo.pattern.join('\n');
  $('#advantagesList').innerHTML = selectedCombo.advantages.map((item) => `<li>${item}</li>`).join('');
  $('#gainRows').innerHTML = selectedCombo.gains.map((row) => `<tr><td>${row.comparedTo}</td><td>${row.gain}</td></tr>`).join('');
  renderComboList();
  renderTrainer();
}

function renderComparison() {
  $('#comparisonRows').innerHTML = combos.map((combo) => `
    <tr class="${combo.id === selectedCombo.id ? 'selected' : ''}">
      <td>${combo.shortName}</td>
      <td>${combo.difficulty}/5 ${stars(combo.difficulty)}</td>
      <td>${combo.dpsRange}</td>
      <td>${combo.difficulty <= 3 ? '90%+' : '85%+'}</td>
    </tr>
  `).join('');
}

function renderVideos() {
  $('#videoGuides').innerHTML = combos.map((combo) => `
    <article class="video-card ${combo.id === selectedCombo.id ? 'active' : ''}">
      <div>
        <p class="eyebrow">${combo.name}</p>
        <h3>${combo.videoTitle}</h3>
        <p>${combo.videoNote}</p>
      </div>
      <a href="${combo.videoUrl}" target="_blank" rel="noreferrer">Open on YouTube</a>
    </article>
  `).join('');
}

function currentAccuracy() {
  const total = trainer.hits + trainer.misses;
  return total === 0 ? 100 : Math.round((trainer.hits / total) * 100);
}

function expectedInput() {
  return selectedCombo.inputs[trainer.index % selectedCombo.inputs.length];
}

function renderTrainer() {
  const accuracy = currentAccuracy();
  const effectiveDps = Math.round(selectedCombo.theoreticalDps * (accuracy / 100));
  const next = expectedInput();
  const sequence = selectedCombo.inputs.map((input, index) => {
    const state = index < trainer.index % selectedCombo.inputs.length ? 'done' : index === trainer.index % selectedCombo.inputs.length ? 'next' : '';
    return `<span class="pill ${state}">${inputToMouse[input].glyph} ${input}</span>`;
  }).join('');

  const views = {
    learn: `
      <div class="trainer-callout">
        <span>Next expected input</span>
        <strong>${next}</strong>
        <small>${inputToMouse[next].label}</small>
      </div>
      <p class="explanation">Slowly follow the highlighted sequence. The trainer accepts left click for Attack, right click for Dash, and mouse wheel click for Walk Cancel.</p>
      <div class="sequence">${sequence}</div>
    `,
    practice: `
      <div class="stats-grid">
        <div><span>Accuracy</span><strong>${accuracy}%</strong></div>
        <div><span>Combo counter</span><strong>${trainer.hits}</strong></div>
        <div><span>Miss count</span><strong>${trainer.misses}</strong></div>
      </div>
      <div class="sequence">${sequence}</div>
    `,
    rhythm: `
      <div class="rhythm-lane">${selectedCombo.inputs.map((input, index) => `<span class="beat ${index === trainer.index % selectedCombo.inputs.length ? 'hot' : ''}">${inputToMouse[input].glyph}<small>${input}</small></span>`).join('')}</div>
      <p class="explanation">Treat each marker like a rhythm note and click the matching mouse input when it reaches the highlighted state.</p>
    `,
    simulator: `
      <div class="simulator-card">
        <span>Current Combo:</span><strong>${selectedCombo.name}</strong>
        <span>Estimated DPS:</span><strong>${selectedCombo.theoreticalDps}%</strong>
        <span>Execution Accuracy:</span><strong>${accuracy}%</strong>
        <span>Effective DPS:</span><strong>${effectiveDps}%</strong>
      </div>
      <p class="formula">${selectedCombo.theoreticalDps}% × ${accuracy}% = ${effectiveDps}%</p>
    `
  };

  $('#trainerContent').innerHTML = views[mode];
  renderComparison();
  renderVideos();
}

function handleMouseInput(event) {
  event.preventDefault();
  const expected = expectedInput();
  const expectedButton = inputToMouse[expected].button;
  if (event.button === expectedButton) {
    trainer.hits += 1;
    trainer.index += 1;
  } else {
    trainer.misses += 1;
  }
  renderTrainer();
}

function resetTrainer() {
  trainer = { index: 0, hits: 0, misses: 0 };
  renderTrainer();
}

document.addEventListener('click', (event) => {
  const comboButton = event.target.closest('[data-combo]');
  if (comboButton) {
    selectedCombo = combos.find((combo) => combo.id === comboButton.dataset.combo);
    resetTrainer();
    renderSelectedCombo();
  }

  const modeButton = event.target.closest('[data-mode]');
  if (modeButton) {
    mode = modeButton.dataset.mode;
    document.querySelectorAll('[data-mode]').forEach((button) => button.classList.toggle('active', button.dataset.mode === mode));
    renderTrainer();
  }
});

$('#trainerContent').addEventListener('mousedown', handleMouseInput);
$('#trainerContent').addEventListener('contextmenu', (event) => event.preventDefault());
$('#resetTrainer').addEventListener('click', resetTrainer);

renderSelectedCombo();
renderComparison();
renderVideos();
