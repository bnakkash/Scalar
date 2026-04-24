(function () {
  'use strict';

  const CATEGORIES = window.CATEGORIES;

  const STORAGE_KEY = 'scalar_state_v1';

  const state = {
    category: 'pressure',
    fromUnit: 'psi',
    toUnit: 'bar',
    fromValue: '1',
    precision: 6,
    perCategory: {},
  };

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) Object.assign(state, JSON.parse(raw));
    } catch (_) {}
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (_) {}
  }

  const el = {
    categories: document.getElementById('categories'),
    fromUnit: document.getElementById('fromUnit'),
    toUnit: document.getElementById('toUnit'),
    fromSym: document.getElementById('fromSym'),
    toSym: document.getElementById('toSym'),
    fromName: document.getElementById('fromName'),
    toName: document.getElementById('toName'),
    fromValue: document.getElementById('fromValue'),
    toValue: document.getElementById('toValue'),
    fromCard: document.getElementById('fromCard'),
    toCard: document.getElementById('toCard'),
    swapBtn: document.getElementById('swapBtn'),
    relation: document.getElementById('relation'),
    toast: document.getElementById('toast'),
  };

  function renderCategories() {
    el.categories.innerHTML = '';
    Object.entries(CATEGORIES).forEach(([key, cat]) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'cat-pill' + (key === state.category ? ' active' : '');
      const glyph = cat.glyph || '•';
      b.innerHTML = `<span class="glyph">${glyph}</span><span class="lbl">${cat.label}</span>`;
      b.addEventListener('click', () => selectCategory(key));
      el.categories.appendChild(b);
    });
  }

  function renderUnits() {
    const cat = CATEGORIES[state.category];
    const units = cat.units;
    [el.fromUnit, el.toUnit].forEach(sel => {
      sel.innerHTML = '';
      Object.entries(units).forEach(([key, u]) => {
        const o = document.createElement('option');
        o.value = key;
        o.textContent = `${u.sym} — ${u.name}`;
        sel.appendChild(o);
      });
    });

    const remembered = state.perCategory[state.category];
    if (remembered && units[remembered.from] && units[remembered.to]) {
      state.fromUnit = remembered.from;
      state.toUnit = remembered.to;
    } else {
      const d = cat.default || Object.keys(units).slice(0, 2);
      state.fromUnit = units[d[0]] ? d[0] : Object.keys(units)[0];
      state.toUnit = units[d[1]] ? d[1] : Object.keys(units)[1] || state.fromUnit;
    }

    el.fromUnit.value = state.fromUnit;
    el.toUnit.value = state.toUnit;
    updateLabels();
  }

  function updateLabels() {
    const cat = CATEGORIES[state.category];
    const fu = cat.units[state.fromUnit];
    const tu = cat.units[state.toUnit];
    el.fromSym.textContent = fu.sym;
    el.toSym.textContent = tu.sym;
    el.fromName.textContent = fu.name;
    el.toName.textContent = tu.name;
  }

  function convert(value, fromKey, toKey) {
    const cat = CATEGORIES[state.category];
    if (cat.convert) return cat.convert(value, fromKey, toKey);
    const fromF = cat.units[fromKey].f;
    const toF   = cat.units[toKey].f;
    return value * fromF / toF;
  }

  function formatNum(n, prec) {
    if (!isFinite(n)) return '—';
    if (n === 0) return '0';
    const abs = Math.abs(n);
    let s;
    if (abs >= Math.pow(10, prec) || abs < 1e-4) {
      s = n.toExponential(prec - 1);
      const [mantissa, expRaw] = s.split('e');
      let m = mantissa;
      if (m.includes('.')) m = m.replace(/0+$/, '').replace(/\.$/, '');
      const exp = parseInt(expRaw, 10);
      return m + '×10' + toSuperscript(String(exp));
    }
    s = n.toPrecision(prec);
    if (s.includes('.') && !s.includes('e')) {
      s = s.replace(/0+$/, '').replace(/\.$/, '');
    }
    if (!s.includes('e')) {
      const parts = s.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      s = parts.join('.');
    }
    return s;
  }

  // Convert display string (may contain superscript ×10ⁿ or commas) back to a parseable number string.
  const SUPER_FROM = {'⁰':'0','¹':'1','²':'2','³':'3','⁴':'4','⁵':'5','⁶':'6','⁷':'7','⁸':'8','⁹':'9','⁻':'-'};
  function toSuperscript(str) {
    const SUPER = {'0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹','-':'⁻'};
    return str.split('').map(c => SUPER[c] || c).join('');
  }
  function displayToNumeric(s) {
    if (!s) return '';
    return s
      .replace(/,/g, '')
      .replace(/×10/, 'e')
      .split('').map(c => SUPER_FROM[c] || c).join('');
  }

  // Tolerant parse: accepts "1,234.5", "1.5e3", "1.2×10⁵", "5.5 psi", leading/trailing spaces.
  function parseInputValue(str) {
    if (!str) return '';
    return displayToNumeric(str).replace(/[\s,]/g, '');
  }

  // Shrink font-size until content fits the element's content box.
  function fitText(node, baseSize, minSize) {
    const base = baseSize || 36;
    const min = minSize || 16;
    node.style.fontSize = base + 'px';
    const max = node.clientWidth;
    if (max <= 0) return;
    let size = base;
    while (node.scrollWidth > max && size > min) {
      size -= 1;
      node.style.fontSize = size + 'px';
    }
  }

  function baseValueFontSize() {
    return window.innerWidth <= 360 ? 30 : 36;
  }

  function recompute(animate = true) {
    const raw = parseInputValue(el.fromValue.value);
    if (raw === '' || raw === '-' || raw === '.') {
      el.toValue.textContent = '—';
      el.relation.textContent = '—';
      fitText(el.toValue, baseValueFontSize());
      return;
    }
    const v = parseFloat(raw);
    if (!isFinite(v)) {
      el.toValue.textContent = '—';
      el.relation.textContent = '—';
      fitText(el.toValue, baseValueFontSize());
      return;
    }
    const out = convert(v, state.fromUnit, state.toUnit);
    el.toValue.textContent = formatNum(out, state.precision);

    const oneOut = convert(1, state.fromUnit, state.toUnit);
    const oneIn  = convert(1, state.toUnit, state.fromUnit);
    const cat = CATEGORIES[state.category];
    const fu = cat.units[state.fromUnit];
    const tu = cat.units[state.toUnit];
    el.relation.innerHTML =
      `1 ${fu.sym} <span class="eq">=</span> ${formatNum(oneOut, 6)} ${tu.sym}` +
      ` <span class="sep">·</span> ` +
      `1 ${tu.sym} <span class="eq">=</span> ${formatNum(oneIn, 6)} ${fu.sym}`;

    fitText(el.toValue, baseValueFontSize());
    fitText(el.fromValue, baseValueFontSize());

    if (animate) {
      el.toValue.classList.remove('updating');
      void el.toValue.offsetWidth;
      el.toValue.classList.add('updating');
    }
  }

  function selectCategory(key) {
    if (key === state.category) return;
    state.perCategory[state.category] = { from: state.fromUnit, to: state.toUnit };
    state.category = key;
    renderCategories();
    renderUnits();
    recompute();
    saveState();
    haptic(8);
  }

  el.fromUnit.addEventListener('change', (e) => {
    state.fromUnit = e.target.value;
    state.perCategory[state.category] = { from: state.fromUnit, to: state.toUnit };
    updateLabels();
    recompute();
    saveState();
  });

  el.toUnit.addEventListener('change', (e) => {
    state.toUnit = e.target.value;
    state.perCategory[state.category] = { from: state.fromUnit, to: state.toUnit };
    updateLabels();
    recompute();
    saveState();
  });

  el.fromValue.addEventListener('input', (e) => {
    state.fromValue = e.target.value;
    recompute();
    saveState();
  });

  el.fromValue.addEventListener('focus', () => {
    el.fromCard.classList.add('focused');
    setTimeout(() => el.fromValue.select(), 20);
    // Keep the `to` card visible above the iOS keyboard during typing.
    setTimeout(() => {
      try { el.fromCard.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch (_) {}
    }, 300);
  });

  el.fromValue.addEventListener('blur', () => {
    el.fromCard.classList.remove('focused');
  });

  el.swapBtn.addEventListener('click', () => {
    const currentOut = displayToNumeric(el.toValue.textContent);
    const parsedOut = parseFloat(currentOut);

    const oldFrom = state.fromUnit;
    state.fromUnit = state.toUnit;
    state.toUnit = oldFrom;
    state.perCategory[state.category] = { from: state.fromUnit, to: state.toUnit };

    el.fromUnit.value = state.fromUnit;
    el.toUnit.value = state.toUnit;
    updateLabels();

    if (isFinite(parsedOut)) {
      // Normalize to plain numeric form (no commas, no superscript) so the input stays editable.
      el.fromValue.value = displayToNumeric(formatNum(parsedOut, state.precision));
      state.fromValue = el.fromValue.value;
    }
    recompute();
    saveState();
    haptic(10);
  });

  el.relation.addEventListener('click', () => {
    if (el.toValue.textContent === '—') return;
    el.swapBtn.click();
  });
  el.relation.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      el.relation.click();
    }
  });

  document.querySelectorAll('.precision-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.precision-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.precision = parseInt(btn.dataset.prec, 10);
      recompute(false);
      saveState();
    });
  });

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      toast('copied ' + text);
    } catch (_) {
      const r = document.createRange();
      r.selectNode(el.toValue);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(r);
      try { document.execCommand('copy'); toast('copied'); } catch (_) {}
      window.getSelection().removeAllRanges();
    }
  }

  // Long-press = just number; tap = "value unit". Suppress click after a long-press.
  let pressTimer = null;
  let longPressed = false;
  el.toValue.addEventListener('touchstart', () => {
    longPressed = false;
    clearTimeout(pressTimer);
    pressTimer = setTimeout(() => {
      if (el.toValue.textContent === '—') return;
      longPressed = true;
      copyText(displayToNumeric(el.toValue.textContent));
      haptic(25);
    }, 500);
  }, { passive: true });
  el.toValue.addEventListener('touchend', () => clearTimeout(pressTimer));
  el.toValue.addEventListener('touchmove', () => clearTimeout(pressTimer));

  el.toValue.addEventListener('click', () => {
    if (longPressed) { longPressed = false; return; }
    const t = el.toValue.textContent;
    if (t === '—') return;
    const plain = displayToNumeric(t);
    const sym = CATEGORIES[state.category].units[state.toUnit].sym;
    copyText(plain + ' ' + sym);
    haptic(12);
  });

  function toast(msg) {
    el.toast.textContent = msg;
    el.toast.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.toast.classList.remove('show'), 1400);
  }

  function haptic(ms) {
    if (navigator.vibrate) { try { navigator.vibrate(ms); } catch (_) {} }
  }

  let lastTap = 0;
  document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTap < 300 && e.target.tagName !== 'INPUT') {
      e.preventDefault();
    }
    lastTap = now;
  }, { passive: false });

  window.addEventListener('resize', () => {
    fitText(el.toValue, baseValueFontSize());
    fitText(el.fromValue, baseValueFontSize());
  });

  function init() {
    if (!CATEGORIES || typeof CATEGORIES !== 'object') {
      el.categories.textContent = 'Failed to load unit data. Tap to reload.';
      el.categories.style.cursor = 'pointer';
      el.categories.addEventListener('click', () => location.reload());
      return;
    }
    loadState();
    if (!CATEGORIES[state.category]) state.category = 'pressure';
    document.querySelectorAll('.precision-btn').forEach(b => {
      b.classList.toggle('active', parseInt(b.dataset.prec, 10) === state.precision);
    });
    renderCategories();
    renderUnits();
    el.fromValue.value = state.fromValue || '1';
    recompute(false);
  }

  init();
})();
