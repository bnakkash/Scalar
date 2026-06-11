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
    motor: {},
    calc: {},
    catGroup: 'Units',
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
    catGroups: document.getElementById('catGroups'),
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
    // Motor LRC panel
    convPanel: document.getElementById('convPanel'),
    motorPanel: document.getElementById('motorPanel'),
    mHP: document.getElementById('mHP'),
    mV: document.getElementById('mV'),
    mPhase: document.getElementById('mPhase'),
    mCode: document.getElementById('mCode'),
    mEff: document.getElementById('mEff'),
    mPF: document.getElementById('mPF'),
    mFLA: document.getElementById('mFLA'),
    mFlaNote: document.getElementById('mFlaNote'),
    mResults: document.getElementById('mResults'),
    mXfmr: document.getElementById('mXfmr'),
    mZ: document.getElementById('mZ'),
    mDip: document.getElementById('mDip'),
    // Generic calc panel
    calcPanel: document.getElementById('calcPanel'),
    calcInputsLabel: document.getElementById('calcInputsLabel'),
    calcInputs: document.getElementById('calcInputs'),
    calcResults: document.getElementById('calcResults'),
    calcNote: document.getElementById('calcNote'),
  };

  // Category groups. A row of group tabs filters the pill grid to one group,
  // so the bar stays compact. Order here defines tab + pill order.
  const CATEGORY_GROUPS = [
    { label: 'Units', keys: ['pressure','temperature','flow','massFlow','length','mass','volume','power','energy','force','speed','area','torque','density','angle','time','frequency','viscosity_d','viscosity_k'] },
    { label: 'Mechanical', keys: ['pump','torquehp','pipe','heat'] },
    { label: 'Electrical', keys: ['motor','ohms','vdrop','power3','xfmrfla','xfmrsc','xfmrvr'] },
    { label: 'Instrument', keys: ['rtd','tc','rtdlead','masignal','maloop','ne43','sqrtdp','dplevel','drumlevel','lvlmap','pitot','kfactor','caltable','zn'] },
    { label: 'Valves', keys: ['cvliq','cvkv','vchar'] },
  ];

  function groupOfCategory(key) {
    const g = CATEGORY_GROUPS.find(g => g.keys.includes(key));
    return g ? g.label : 'More';
  }
  function leftoverKeys() {
    return Object.keys(CATEGORIES).filter(k => !CATEGORY_GROUPS.some(g => g.keys.includes(k)));
  }
  function groupLabels() {
    const labels = CATEGORY_GROUPS.filter(g => g.keys.some(k => CATEGORIES[k])).map(g => g.label);
    if (leftoverKeys().length) labels.push('More');
    return labels;
  }
  function keysForGroup(label) {
    if (label === 'More') return leftoverKeys();
    const g = CATEGORY_GROUPS.find(g => g.label === label);
    return g ? g.keys.filter(k => CATEGORIES[k]) : [];
  }

  function renderGroupTabs() {
    el.catGroups.innerHTML = '';
    groupLabels().forEach(label => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'cat-group-tab' + (label === state.catGroup ? ' active' : '');
      b.textContent = label;
      b.addEventListener('click', () => selectGroup(label));
      el.catGroups.appendChild(b);
    });
  }

  function renderCategories() {
    el.categories.innerHTML = '';
    keysForGroup(state.catGroup).forEach(key => {
      const cat = CATEGORIES[key];
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'cat-pill' + (key === state.category ? ' active' : '');
      b.innerHTML = `<span class="glyph">${cat.glyph || '•'}</span><span class="lbl">${cat.label}</span>`;
      b.addEventListener('click', () => selectCategory(key));
      el.categories.appendChild(b);
    });
  }

  function selectGroup(label) {
    if (label === state.catGroup) return;
    state.catGroup = label;
    renderGroupTabs();
    renderCategories();
    saveState();
    haptic(6);
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
    if (isSpecialMode()) return;
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
    const oldCat = CATEGORIES[state.category];
    if (oldCat && !oldCat.mode) state.perCategory[state.category] = { from: state.fromUnit, to: state.toUnit };
    state.category = key;
    state.catGroup = groupOfCategory(key);
    renderGroupTabs();
    renderCategories();
    const cat = CATEGORIES[key];
    if (cat.mode === 'motor') showMotorMode();
    else if (cat.mode === 'calc') showCalcMode();
    else { showConverterMode(); renderUnits(); recompute(); }
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
    if (isSpecialMode()) return;
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

  /* ====================================================================
     MOTOR LRC / INRUSH CALCULATOR
     A non-converter category (mode: 'motor') with its own panel + logic.
     ==================================================================== */

  // NEMA locked-rotor code letters → [min, max] kVA per HP.
  // (Letters I, O, Q are not used by NEMA.)
  const NEMA_CODE = {
    A: [0, 3.14],     B: [3.15, 3.54],  C: [3.55, 3.99],  D: [4.0, 4.49],
    E: [4.5, 4.99],   F: [5.0, 5.59],   G: [5.6, 6.29],   H: [6.3, 7.09],
    J: [7.1, 7.99],   K: [8.0, 8.99],   L: [9.0, 9.99],   M: [10.0, 11.19],
    N: [11.2, 12.49], P: [12.5, 13.99], R: [14.0, 15.99], S: [16.0, 17.99],
    T: [18.0, 19.99], U: [20.0, 22.39], V: [22.4, 25.0],
  };

  const MOTOR_FIELDS = ['mHP','mV','mPhase','mCode','mEff','mPF','mFLA','mXfmr','mZ'];

  function isMotorMode() {
    const cat = CATEGORIES[state.category];
    return !!(cat && cat.mode === 'motor');
  }

  function mNum(id) {
    const v = parseFloat((el[id].value || '').replace(/[,\s]/g, ''));
    return isFinite(v) ? v : NaN;
  }

  // Round amps: whole numbers ≥100, one decimal below.
  function fmtAmps(n) {
    if (!isFinite(n)) return '—';
    const r = n >= 100 ? Math.round(n) : Math.round(n * 10) / 10;
    return r.toLocaleString('en-US');
  }
  function rangeAmps(lo, hi) {
    const a = fmtAmps(lo), b = fmtAmps(hi);
    return a === b ? a : a + ' – ' + b;
  }

  function buildCodeOptions() {
    if (el.mCode.options.length) return;
    const none = document.createElement('option');
    none.value = ''; none.textContent = '— none —';
    el.mCode.appendChild(none);
    Object.keys(NEMA_CODE).forEach(letter => {
      const [lo, hi] = NEMA_CODE[letter];
      const o = document.createElement('option');
      o.value = letter;
      o.textContent = `${letter} · ${lo}–${hi} kVA/HP`;
      el.mCode.appendChild(o);
    });
  }

  function restoreMotorInputs() {
    MOTOR_FIELDS.forEach(id => {
      if (state.motor && state.motor[id] != null) el[id].value = state.motor[id];
    });
  }

  function showMotorMode() {
    buildCodeOptions();
    restoreMotorInputs();
    el.convPanel.hidden = true;
    el.relation.hidden = true;
    el.calcPanel.hidden = true;
    el.motorPanel.hidden = false;
    computeMotor();
  }

  function showConverterMode() {
    el.motorPanel.hidden = true;
    el.calcPanel.hidden = true;
    el.convPanel.hidden = false;
    el.relation.hidden = false;
  }

  // line-to-line factor for 3-phase, 1 for single phase
  function phaseK(phase) { return phase === 1 ? 1 : Math.sqrt(3); }

  function computeMotor() {
    const HP    = mNum('mHP');
    const V     = mNum('mV');
    const phase = parseInt(el.mPhase.value, 10) === 1 ? 1 : 3;
    const code  = el.mCode.value || '';
    const eff   = (isFinite(mNum('mEff')) ? mNum('mEff') : 93) / 100;
    const pf    = isFinite(mNum('mPF')) ? mNum('mPF') : 0.86;
    const flaIn = mNum('mFLA');

    // Resolve FLA: nameplate value, else estimate from HP/V/eff/PF.
    let fla = NaN, estimated = false;
    if (isFinite(flaIn) && flaIn > 0) {
      fla = flaIn;
    } else if (HP > 0 && V > 0) {
      fla = HP * 746 / (phaseK(phase) * V * eff * pf);
      estimated = true;
    }

    // FLA note
    if (estimated) {
      el.mFlaNote.textContent = `≈ ${fmtAmps(fla)} A estimated from ${HP} HP, ${V} V, ${Math.round(eff*100)}% eff, ${pf} PF.`;
      el.mFlaNote.classList.remove('warn');
    } else if (isFinite(fla)) {
      el.mFlaNote.textContent = 'Using nameplate FLA. Clear to estimate from HP & voltage.';
      el.mFlaNote.classList.remove('warn');
    } else {
      el.mFlaNote.textContent = 'Enter FLA, or HP + voltage to estimate it.';
      el.mFlaNote.classList.add('warn');
    }

    // ---- Inrush rows ----
    const rows = [];
    let dolHi = NaN; // worst-case across-the-line amps, for voltage dip

    // DOL: exact from code letter when HP+V known, else 6–8× FLA rule of thumb.
    if (code && HP > 0 && V > 0) {
      const [kLo, kHi] = NEMA_CODE[code];
      const k = phaseK(phase) * V;
      const lraLo = kLo * HP * 1000 / k;
      const lraHi = kHi * HP * 1000 / k;
      dolHi = lraHi;
      rows.push({ cls: 'hi', label: 'DOL · across-the-line',
        val: rangeAmps(lraLo, lraHi),
        sub: `NEMA code ${code} · ${kLo}–${kHi} kVA/HP (exact)` });
    } else if (isFinite(fla)) {
      dolHi = 8 * fla;
      rows.push({ cls: 'hi', label: 'DOL · across-the-line',
        val: rangeAmps(6 * fla, 8 * fla),
        sub: code ? '6–8× FLA · add HP + V for exact code calc' : '6–8× FLA (NEMA Design B)' });
    }

    if (isFinite(fla)) {
      rows.push({ label: 'Premium-efficiency DOL', val: rangeAmps(10 * fla, 12 * fla), sub: '10–12× FLA (first cycles)' });
      rows.push({ label: 'Soft starter',           val: rangeAmps(3 * fla, 4.5 * fla), sub: '3–4.5× FLA (reduced voltage)' });
      rows.push({ label: 'VFD',                     val: rangeAmps(1 * fla, 1.5 * fla), sub: '1–1.5× FLA (ramped)' });
    }

    if (rows.length) {
      el.mResults.innerHTML = rows.map(r =>
        `<button type="button" class="m-row ${r.cls || ''}" data-copy="${r.val} A">
           <span class="m-row-label">${r.label}</span>
           <span class="m-row-val">${r.val}<i>A</i></span>
           <span class="m-row-sub">${r.sub}</span>
         </button>`).join('');
      el.mResults.querySelectorAll('.m-row').forEach(b => {
        b.addEventListener('click', () => { copyText(b.dataset.copy); haptic(12); });
      });
    } else {
      el.mResults.innerHTML = `<div class="m-empty">Enter the motor's <b>FLA</b> — or <b>HP + voltage</b> to estimate it — to see starting inrush across DOL, soft-start and VFD.</div>`;
    }

    // ---- Voltage dip ----
    renderVoltageDip(V, phase, dolHi);
  }

  function renderVoltageDip(V, phase, dolHi) {
    const xfmr = mNum('mXfmr');
    const Z = isFinite(mNum('mZ')) ? mNum('mZ') : 5.75;

    if (!(V > 0) || !(xfmr > 0) || !isFinite(dolHi)) {
      el.mDip.innerHTML = `<span class="sub">Enter voltage, transformer kVA and (optionally) %Z to estimate the supply voltage dip at start.</span>`;
      return;
    }

    const SCkVA = xfmr * 100 / Z;           // transformer short-circuit capacity
    const k = phaseK(phase) * V / 1000;     // kVA per amp
    const dipFor = (amps) => {
      const kva = k * amps;
      return kva / (kva + SCkVA) * 100;
    };

    const dip = dipFor(dolHi);
    const residual = V * (1 - dip / 100);
    const cls = dip <= 10 ? 'ok' : dip > 20 ? 'bad' : '';
    const verdict = dip <= 10 ? 'within typical limits' : dip > 20 ? 'excessive — may stall/trip or flicker' : 'borderline — check starter';

    el.mDip.innerHTML =
      `<span class="big ${cls}">${dip.toFixed(1)}%</span>` +
      `residual ≈ <b style="color:var(--text)">${fmtAmps(residual)} V</b> at the motor — ${verdict}` +
      `<div class="sub">across-the-line worst case · soft-start ≈ ${dipFor(dolHi * 4.5 / 8).toFixed(1)}% · VFD ≈ ${dipFor(dolHi * 1.5 / 8).toFixed(1)}%` +
      ` <span style="opacity:.7">(${fmtAmps(SCkVA)} kVA available, %Z ${Z})</span></div>`;
  }

  // Persist + recompute on any motor input change.
  MOTOR_FIELDS.forEach(id => {
    const node = el[id];
    if (!node) return;
    const evt = node.tagName === 'SELECT' ? 'change' : 'input';
    node.addEventListener(evt, () => {
      state.motor[id] = node.value;
      computeMotor();
      saveState();
    });
  });

  /* ====================================================================
     GENERIC CALCULATOR ENGINE (mode: 'calc')
     Renders a calc's declarative `fields` into an inputs grid and shows
     `compute()` results as rows. Reuses the motor panel's styling.
     ==================================================================== */

  function isCalcMode() {
    const cat = CATEGORIES[state.category];
    return !!(cat && cat.mode === 'calc');
  }
  function isSpecialMode() { return isMotorMode() || isCalcMode(); }

  function calcVal(id) {
    const node = document.getElementById('calc_' + id);
    return node ? node.value : '';
  }

  function showCalcMode() {
    const cat = CATEGORIES[state.category];
    el.convPanel.hidden = true;
    el.relation.hidden = true;
    el.motorPanel.hidden = true;
    el.calcPanel.hidden = false;
    el.calcInputsLabel.textContent = cat.label;

    const saved = (state.calc && state.calc[state.category]) || {};
    el.calcInputs.innerHTML = '';
    (cat.fields || []).forEach(f => {
      const wrap = document.createElement('label');
      wrap.className = 'm-field';
      const lab = document.createElement('span');
      lab.textContent = f.unit ? `${f.label} (${f.unit})` : f.label;
      wrap.appendChild(lab);

      let input;
      if (f.type === 'select') {
        const sp = document.createElement('span');
        sp.className = 'm-select';
        input = document.createElement('select');
        (f.options || []).forEach(o => {
          const op = document.createElement('option');
          op.value = o.v; op.textContent = o.t;
          input.appendChild(op);
        });
        sp.appendChild(input);
        wrap.appendChild(sp);
      } else {
        input = document.createElement('input');
        input.type = 'text';
        input.inputMode = 'decimal';
        input.autocomplete = 'off';
        input.autocapitalize = 'off';
        input.spellcheck = false;
        if (f.ph != null) input.placeholder = f.ph;
        wrap.appendChild(input);
      }
      input.id = 'calc_' + f.id;
      input.value = saved[f.id] != null ? saved[f.id] : (f.def != null ? f.def : '');

      const evt = f.type === 'select' ? 'change' : 'input';
      input.addEventListener(evt, () => {
        if (!state.calc) state.calc = {};
        if (!state.calc[state.category]) state.calc[state.category] = {};
        state.calc[state.category][f.id] = input.value;
        computeCalc();
        saveState();
      });
      el.calcInputs.appendChild(wrap);
    });

    computeCalc();
  }

  function computeCalc() {
    const cat = CATEGORIES[state.category];
    const api = {
      n: id => { const f = parseFloat((calcVal(id) || '').replace(/[,\s]/g, '')); return isFinite(f) ? f : NaN; },
      s: id => calcVal(id) || '',
      fmt: x => formatNum(x, 4),
    };
    let res = {};
    try { res = cat.compute(api) || {}; } catch (_) { res = { note: 'Check the inputs.' }; }
    const rows = res.rows || [];

    if (rows.length) {
      el.calcResults.innerHTML = rows.map(r => {
        const valStr = (typeof r.value === 'number') ? formatNum(r.value, 4) : String(r.value);
        const copy = (r.copy != null ? r.copy : valStr + (r.unit ? ' ' + r.unit : '')).replace(/"/g, '&quot;');
        return `<button type="button" class="m-row ${r.hi ? 'hi' : ''}" data-copy="${copy}">
            <span class="m-row-label">${r.label}</span>
            <span class="m-row-val">${valStr}${r.unit ? `<i>${r.unit}</i>` : ''}</span>
            ${r.sub ? `<span class="m-row-sub">${r.sub}</span>` : ''}
          </button>`;
      }).join('');
      el.calcResults.querySelectorAll('.m-row').forEach(b => {
        b.addEventListener('click', () => { copyText(b.dataset.copy); haptic(12); });
      });
    } else {
      el.calcResults.innerHTML = `<div class="m-empty">${res.note || 'Enter values to calculate.'}</div>`;
    }

    const showNote = res.note && rows.length;
    el.calcNote.innerHTML = showNote ? res.note : '';
    el.calcNote.hidden = !showNote;
  }

  function init() {
    if (!CATEGORIES || typeof CATEGORIES !== 'object') {
      el.categories.textContent = 'Failed to load unit data. Tap to reload.';
      el.categories.style.cursor = 'pointer';
      el.categories.addEventListener('click', () => location.reload());
      return;
    }
    loadState();
    if (!CATEGORIES[state.category]) state.category = 'pressure';
    if (!groupLabels().includes(state.catGroup)) state.catGroup = groupOfCategory(state.category);
    document.querySelectorAll('.precision-btn').forEach(b => {
      b.classList.toggle('active', parseInt(b.dataset.prec, 10) === state.precision);
    });
    renderGroupTabs();
    renderCategories();
    const cat = CATEGORIES[state.category];
    if (cat.mode === 'motor') showMotorMode();
    else if (cat.mode === 'calc') showCalcMode();
    else {
      renderUnits();
      el.fromValue.value = state.fromValue || '1';
      recompute(false);
    }
  }

  init();
})();
