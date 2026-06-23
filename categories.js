/* Unit category data. Assigns to window.CATEGORIES so app.js can read it. */
window.CATEGORIES = {
  pressure: {
    label: 'Pressure',
    glyph: 'P',
    base: 'Pa',
    default: ['psi', 'bar'],
    units: {
      Pa:       { name: 'Pascal',                     sym: 'Pa',     f: 1 },
      kPa:      { name: 'Kilopascal',                 sym: 'kPa',    f: 1e3 },
      MPa:      { name: 'Megapascal',                 sym: 'MPa',    f: 1e6 },
      bar:      { name: 'Bar',                        sym: 'bar',    f: 1e5 },
      mbar:     { name: 'Millibar',                   sym: 'mbar',   f: 100 },
      hPa:      { name: 'Hectopascal',                sym: 'hPa',    f: 100 },
      psi:      { name: 'Pound-force per sq. inch',   sym: 'psi',    f: 6894.757293168 },
      psig:     { name: 'psi (gauge, same scale)',    sym: 'psig',   f: 6894.757293168 },
      atm:      { name: 'Atmosphere (standard)',      sym: 'atm',    f: 101325 },
      inHg:     { name: 'Inch of mercury',            sym: 'inHg',   f: 3386.389 },
      mmHg:     { name: 'Millimeter of mercury',      sym: 'mmHg',   f: 133.322387415 },
      Torr:     { name: 'Torr',                       sym: 'Torr',   f: 133.322387415 },
      inH2O:    { name: 'Inch of water (60°F)',  sym: 'inH₂O',  f: 248.84 },
      ftH2O:    { name: 'Foot of water (60°F)',  sym: 'ftH₂O',  f: 2986.08 },
      mH2O:     { name: 'Meter of water',             sym: 'mH₂O',   f: 9806.65 },
      kgfcm2:   { name: 'Kilogram-force per cm²',sym: 'kgf/cm²',f: 98066.5 },
    }
  },

  temperature: {
    label: 'Temperature',
    glyph: 'T',
    default: ['C', 'F'],
    units: {
      C: { name: 'Celsius',    sym: '°C' },
      F: { name: 'Fahrenheit', sym: '°F' },
      K: { name: 'Kelvin',     sym: 'K'  },
      R: { name: 'Rankine',    sym: '°R' },
    },
    convert: (v, from, to) => {
      let k;
      switch (from) {
        case 'C': k = v + 273.15; break;
        case 'F': k = (v - 32) * 5/9 + 273.15; break;
        case 'K': k = v; break;
        case 'R': k = v * 5/9; break;
      }
      switch (to) {
        case 'C': return k - 273.15;
        case 'F': return (k - 273.15) * 9/5 + 32;
        case 'K': return k;
        case 'R': return k * 9/5;
      }
    }
  },

  flow: {
    label: 'Flow Rate',
    glyph: 'Q',
    base: 'm³/s',
    default: ['gpm', 'Lpm'],
    units: {
      'm3s':   { name: 'Cubic meter per second', sym: 'm³/s',  f: 1 },
      'm3h':   { name: 'Cubic meter per hour',   sym: 'm³/h',  f: 1/3600 },
      'm3min': { name: 'Cubic meter per minute', sym: 'm³/min',f: 1/60 },
      'Ls':    { name: 'Liter per second',       sym: 'L/s',   f: 1e-3 },
      'Lpm':   { name: 'Liter per minute',       sym: 'L/min', f: 1e-3/60 },
      'Lh':    { name: 'Liter per hour',         sym: 'L/h',   f: 1e-3/3600 },
      'gpm':   { name: 'US gallon per minute',   sym: 'gpm',   f: 3.785411784e-3/60 },
      'gph':   { name: 'US gallon per hour',     sym: 'gph',   f: 3.785411784e-3/3600 },
      'gpmUK': { name: 'UK gallon per minute',   sym: 'gpm (UK)', f: 4.54609e-3/60 },
      'cfm':   { name: 'Cubic foot per minute',  sym: 'cfm',   f: 0.0283168466/60 },
      'cfh':   { name: 'Cubic foot per hour',    sym: 'cfh',   f: 0.0283168466/3600 },
      'cfs':   { name: 'Cubic foot per second',  sym: 'cfs',   f: 0.0283168466 },
      'scfm':  { name: 'Std. cubic foot per minute', sym: 'scfm', f: 0.0283168466/60 },
      'scfh':  { name: 'Std. cubic foot per hour',   sym: 'scfh', f: 0.0283168466/3600 },
      'bbld':  { name: 'Barrel per day (oil)',   sym: 'bbl/d', f: 0.158987294928/86400 },
      'bblh':  { name: 'Barrel per hour (oil)',  sym: 'bbl/h', f: 0.158987294928/3600 },
    }
  },

  massFlow: {
    label: 'Mass Flow',
    glyph: 'ṁ',
    base: 'kg/s',
    default: ['lbhr', 'kgmin'],
    units: {
      kgs:   { name: 'Kilogram per second', sym: 'kg/s',   f: 1 },
      kgmin: { name: 'Kilogram per minute', sym: 'kg/min', f: 1/60 },
      kghr:  { name: 'Kilogram per hour',   sym: 'kg/h',   f: 1/3600 },
      gs:    { name: 'Gram per second',     sym: 'g/s',    f: 1e-3 },
      gmin:  { name: 'Gram per minute',     sym: 'g/min',  f: 1e-3/60 },
      tonhr: { name: 'Metric ton per hour', sym: 't/h',    f: 1000/3600 },
      tonday:{ name: 'Metric ton per day',  sym: 't/day',  f: 1000/86400 },
      lbs:   { name: 'Pound per second',    sym: 'lb/s',   f: 0.45359237 },
      lbmin: { name: 'Pound per minute',    sym: 'lb/min', f: 0.45359237/60 },
      lbhr:  { name: 'Pound per hour',      sym: 'lb/hr',  f: 0.45359237/3600 },
      ozs:   { name: 'Ounce per second',    sym: 'oz/s',   f: 0.028349523125 },
      ozmin: { name: 'Ounce per minute',    sym: 'oz/min', f: 0.028349523125/60 },
    }
  },

  length: {
    label: 'Length',
    glyph: 'L',
    base: 'm',
    default: ['in', 'mm'],
    units: {
      m:   { name: 'Meter',       sym: 'm',   f: 1 },
      dm:  { name: 'Decimeter',   sym: 'dm',  f: 0.1 },
      cm:  { name: 'Centimeter',  sym: 'cm',  f: 0.01 },
      mm:  { name: 'Millimeter',  sym: 'mm',  f: 0.001 },
      um:  { name: 'Micrometer',  sym: 'µm',  f: 1e-6 },
      nm:  { name: 'Nanometer',   sym: 'nm',  f: 1e-9 },
      km:  { name: 'Kilometer',   sym: 'km',  f: 1000 },
      inch:{ name: 'Inch',        sym: 'in',  f: 0.0254 },
      ft:  { name: 'Foot',        sym: 'ft',  f: 0.3048 },
      yd:  { name: 'Yard',        sym: 'yd',  f: 0.9144 },
      mi:  { name: 'Mile',        sym: 'mi',  f: 1609.344 },
      mil: { name: 'Mil (thou)',  sym: 'mil', f: 2.54e-5 },
      nmi: { name: 'Nautical mile', sym: 'nmi', f: 1852 },
    }
  },

  mass: {
    label: 'Mass',
    glyph: 'm',
    base: 'kg',
    default: ['lb', 'kg'],
    units: {
      kg:    { name: 'Kilogram',         sym: 'kg',  f: 1 },
      g:     { name: 'Gram',             sym: 'g',   f: 1e-3 },
      mg:    { name: 'Milligram',        sym: 'mg',  f: 1e-6 },
      ug:    { name: 'Microgram',        sym: 'µg',  f: 1e-9 },
      tonne: { name: 'Metric ton',       sym: 't',   f: 1000 },
      lb:    { name: 'Pound',            sym: 'lb',  f: 0.45359237 },
      oz:    { name: 'Ounce',            sym: 'oz',  f: 0.028349523125 },
      stS:   { name: 'Short ton (US)',   sym: 'ton (US)', f: 907.18474 },
      stL:   { name: 'Long ton (UK)',    sym: 'ton (UK)', f: 1016.0469088 },
      stone: { name: 'Stone',            sym: 'st',  f: 6.35029318 },
      slug:  { name: 'Slug',             sym: 'slug',f: 14.593902937 },
    }
  },

  volume: {
    label: 'Volume',
    glyph: 'V',
    base: 'm³',
    default: ['gal', 'L'],
    units: {
      m3:    { name: 'Cubic meter',       sym: 'm³',    f: 1 },
      L:     { name: 'Liter',             sym: 'L',     f: 1e-3 },
      dL:    { name: 'Deciliter',         sym: 'dL',    f: 1e-4 },
      mL:    { name: 'Milliliter',        sym: 'mL',    f: 1e-6 },
      uL:    { name: 'Microliter',        sym: 'µL',    f: 1e-9 },
      cm3:   { name: 'Cubic centimeter',  sym: 'cm³',   f: 1e-6 },
      in3:   { name: 'Cubic inch',        sym: 'in³',   f: 1.6387064e-5 },
      ft3:   { name: 'Cubic foot',        sym: 'ft³',   f: 0.028316846592 },
      yd3:   { name: 'Cubic yard',        sym: 'yd³',   f: 0.764554857984 },
      gal:   { name: 'US gallon',         sym: 'gal',   f: 0.003785411784 },
      galUK: { name: 'UK gallon',         sym: 'gal (UK)', f: 0.00454609 },
      qt:    { name: 'US quart',          sym: 'qt',    f: 0.000946352946 },
      pt:    { name: 'US pint',           sym: 'pt',    f: 0.000473176473 },
      floz:  { name: 'US fluid ounce',    sym: 'fl oz', f: 2.95735295625e-5 },
      bbl:   { name: 'Oil barrel',        sym: 'bbl',   f: 0.158987294928 },
    }
  },

  power: {
    label: 'Power',
    glyph: 'W',
    base: 'W',
    default: ['HP', 'kW'],
    units: {
      W:    { name: 'Watt',                sym: 'W',     f: 1 },
      kW:   { name: 'Kilowatt',            sym: 'kW',    f: 1000 },
      MW:   { name: 'Megawatt',            sym: 'MW',    f: 1e6 },
      GW:   { name: 'Gigawatt',            sym: 'GW',    f: 1e9 },
      mW:   { name: 'Milliwatt',           sym: 'mW',    f: 1e-3 },
      uW:   { name: 'Microwatt',           sym: 'µW',    f: 1e-6 },
      HP:   { name: 'Horsepower (mech)',   sym: 'HP',    f: 745.699871582 },
      HPm:  { name: 'Horsepower (metric)', sym: 'HP (m)',f: 735.49875 },
      btuh: { name: 'BTU per hour',        sym: 'BTU/h', f: 0.29307107 },
      btus: { name: 'BTU per second',      sym: 'BTU/s', f: 1055.05585262 },
      kcalh:{ name: 'Kilocalorie per hour',sym: 'kcal/h',f: 1.163 },
      tr:   { name: 'Ton of refrigeration',sym: 'TR',    f: 3516.8528421 },
      ftlbs:{ name: 'Foot-pound per second', sym: 'ft·lbf/s', f: 1.35581794833 },
    }
  },

  energy: {
    label: 'Energy',
    glyph: 'E',
    base: 'J',
    default: ['kWh', 'BTU'],
    units: {
      J:    { name: 'Joule',           sym: 'J',     f: 1 },
      mJ:   { name: 'Millijoule',      sym: 'mJ',    f: 1e-3 },
      kJ:   { name: 'Kilojoule',       sym: 'kJ',    f: 1000 },
      MJ:   { name: 'Megajoule',       sym: 'MJ',    f: 1e6 },
      Wh:   { name: 'Watt-hour',       sym: 'Wh',    f: 3600 },
      kWh:  { name: 'Kilowatt-hour',   sym: 'kWh',   f: 3.6e6 },
      MWh:  { name: 'Megawatt-hour',   sym: 'MWh',   f: 3.6e9 },
      BTU:  { name: 'British thermal unit', sym: 'BTU', f: 1055.05585262 },
      kBTU: { name: 'Thousand BTU',    sym: 'kBTU',  f: 1055055.85262 },
      MMBtu:{ name: 'Million BTU',     sym: 'MMBtu', f: 1055055852.62 },
      therm:{ name: 'Therm (US)',      sym: 'therm', f: 1.05505585262e8 },
      cal:  { name: 'Calorie',         sym: 'cal',   f: 4.184 },
      kcal: { name: 'Kilocalorie',     sym: 'kcal',  f: 4184 },
      ftlbf:{ name: 'Foot-pound',      sym: 'ft·lbf',f: 1.35581794833 },
      eV:   { name: 'Electronvolt',    sym: 'eV',    f: 1.602176634e-19 },
    }
  },

  force: {
    label: 'Force',
    glyph: 'F',
    base: 'N',
    default: ['lbf', 'N'],
    units: {
      N:    { name: 'Newton',      sym: 'N',    f: 1 },
      mN:   { name: 'Millinewton', sym: 'mN',   f: 1e-3 },
      uN:   { name: 'Micronewton', sym: 'µN',   f: 1e-6 },
      kN:   { name: 'Kilonewton',  sym: 'kN',   f: 1000 },
      MN:   { name: 'Meganewton',  sym: 'MN',   f: 1e6 },
      lbf:  { name: 'Pound-force', sym: 'lbf',  f: 4.4482216152605 },
      kgf:  { name: 'Kilogram-force', sym: 'kgf', f: 9.80665 },
      gf:   { name: 'Gram-force',  sym: 'gf',   f: 9.80665e-3 },
      ozf:  { name: 'Ounce-force', sym: 'ozf',  f: 0.2780138509537812 },
      dyne: { name: 'Dyne',        sym: 'dyn',  f: 1e-5 },
      kip:  { name: 'Kip',         sym: 'kip',  f: 4448.2216152605 },
    }
  },

  speed: {
    label: 'Speed',
    glyph: 'v',
    base: 'm/s',
    default: ['mph', 'ft/s'],
    units: {
      ms:    { name: 'Meter per second',   sym: 'm/s',    f: 1 },
      cms:   { name: 'Centimeter/second',  sym: 'cm/s',   f: 0.01 },
      mms:   { name: 'Millimeter/second',  sym: 'mm/s',   f: 1e-3 },
      kmh:   { name: 'Kilometer per hour', sym: 'km/h',   f: 1/3.6 },
      fts:   { name: 'Foot per second',    sym: 'ft/s',   f: 0.3048 },
      ftm:   { name: 'Foot per minute',    sym: 'ft/min', f: 0.3048/60 },
      mph:   { name: 'Mile per hour',      sym: 'mph',    f: 0.44704 },
      knot:  { name: 'Knot',               sym: 'kn',     f: 0.514444444 },
      ips:   { name: 'Inch per second',    sym: 'in/s',   f: 0.0254 },
    }
  },

  area: {
    label: 'Area',
    glyph: 'A',
    base: 'm²',
    default: ['ft²', 'm²'],
    units: {
      m2:  { name: 'Square meter',      sym: 'm²',  f: 1 },
      cm2: { name: 'Square centimeter', sym: 'cm²', f: 1e-4 },
      mm2: { name: 'Square millimeter', sym: 'mm²', f: 1e-6 },
      km2: { name: 'Square kilometer',  sym: 'km²', f: 1e6 },
      in2: { name: 'Square inch',       sym: 'in²', f: 6.4516e-4 },
      ft2: { name: 'Square foot',       sym: 'ft²', f: 0.09290304 },
      yd2: { name: 'Square yard',       sym: 'yd²', f: 0.83612736 },
      mi2: { name: 'Square mile',       sym: 'mi²', f: 2589988.110336 },
      ac:  { name: 'Acre',              sym: 'ac',  f: 4046.8564224 },
      ha:  { name: 'Hectare',           sym: 'ha',  f: 10000 },
    }
  },

  torque: {
    label: 'Torque',
    glyph: 'τ',
    base: 'N·m',
    default: ['lbf·ft', 'N·m'],
    units: {
      Nm:    { name: 'Newton-meter',         sym: 'N·m',    f: 1 },
      mNm:   { name: 'Millinewton-meter',    sym: 'mN·m',   f: 1e-3 },
      kNm:   { name: 'Kilonewton-meter',     sym: 'kN·m',   f: 1000 },
      lbft:  { name: 'Pound-force foot',     sym: 'lbf·ft', f: 1.3558179483314 },
      lbin:  { name: 'Pound-force inch',     sym: 'lbf·in', f: 0.1129848290276 },
      kgfm:  { name: 'Kilogram-force meter', sym: 'kgf·m',  f: 9.80665 },
      ozin:  { name: 'Ounce-force inch',     sym: 'ozf·in', f: 0.00706155181439 },
      dyncm: { name: 'Dyne-centimeter',      sym: 'dyn·cm', f: 1e-7 },
    }
  },

  density: {
    label: 'Density',
    glyph: 'ρ',
    base: 'kg/m³',
    default: ['lb/ft³', 'kg/m³'],
    units: {
      kgm3:  { name: 'Kilogram per cubic meter', sym: 'kg/m³',  f: 1 },
      gcm3:  { name: 'Gram per cubic centimeter',sym: 'g/cm³',  f: 1000 },
      gL:    { name: 'Gram per liter',           sym: 'g/L',    f: 1 },
      lbft3: { name: 'Pound per cubic foot',     sym: 'lb/ft³', f: 16.01846337396 },
      lbin3: { name: 'Pound per cubic inch',     sym: 'lb/in³', f: 27679.90471020312 },
      lbgal: { name: 'Pound per US gallon',      sym: 'lb/gal', f: 119.8264273 },
      ozin3: { name: 'Ounce per cubic inch',     sym: 'oz/in³', f: 1729.994046875 },
      sg:    { name: 'Specific gravity (water @ 4°C)', sym: 'SG', f: 1000 },
    }
  },

  angle: {
    label: 'Angle',
    glyph: 'θ',
    base: 'rad',
    default: ['deg', 'rad'],
    units: {
      deg:  { name: 'Degree',    sym: '°',    f: Math.PI / 180 },
      rad:  { name: 'Radian',    sym: 'rad',  f: 1 },
      grad: { name: 'Gradian',   sym: 'grad', f: Math.PI / 200 },
      turn: { name: 'Turn',      sym: 'turn', f: 2 * Math.PI },
      amin: { name: 'Arcminute', sym: 'arcmin', f: Math.PI / 10800 },
      asec: { name: 'Arcsecond', sym: 'arcsec', f: Math.PI / 648000 },
      mil:  { name: 'NATO Mil',  sym: 'mil',  f: Math.PI / 3200 },
    }
  },

  time: {
    label: 'Time',
    glyph: 't',
    base: 's',
    default: ['min', 's'],
    units: {
      ms:  { name: 'Millisecond', sym: 'ms',  f: 1e-3 },
      us:  { name: 'Microsecond', sym: 'µs',  f: 1e-6 },
      s:   { name: 'Second',      sym: 's',   f: 1 },
      min: { name: 'Minute',      sym: 'min', f: 60 },
      h:   { name: 'Hour',        sym: 'h',   f: 3600 },
      d:   { name: 'Day',         sym: 'd',   f: 86400 },
      wk:  { name: 'Week',        sym: 'wk',  f: 604800 },
      yr:  { name: 'Year (365d)', sym: 'yr',  f: 31536000 },
    }
  },

  frequency: {
    label: 'Frequency',
    glyph: 'f',
    base: 'Hz',
    default: ['Hz', 'rpm'],
    units: {
      Hz:  { name: 'Hertz',      sym: 'Hz',  f: 1 },
      mHz: { name: 'Millihertz', sym: 'mHz', f: 1e-3 },
      kHz: { name: 'Kilohertz',  sym: 'kHz', f: 1000 },
      MHz: { name: 'Megahertz',  sym: 'MHz', f: 1e6 },
      GHz: { name: 'Gigahertz',  sym: 'GHz', f: 1e9 },
      THz: { name: 'Terahertz',  sym: 'THz', f: 1e12 },
      rpm: { name: 'Rev/min',    sym: 'rpm', f: 1/60 },
      rads:{ name: 'Radian/sec', sym: 'rad/s', f: 1/(2*Math.PI) },
    }
  },

  viscosity_d: {
    label: 'Visc. dyn',
    glyph: 'μ',
    base: 'Pa·s',
    default: ['cP', 'Pa·s'],
    units: {
      Pas:   { name: 'Pascal-second',     sym: 'Pa·s',  f: 1 },
      mPas:  { name: 'Millipascal-second',sym: 'mPa·s', f: 1e-3 },
      cP:    { name: 'Centipoise',        sym: 'cP',    f: 1e-3 },
      P:     { name: 'Poise',             sym: 'P',     f: 0.1 },
      lbfsft2:{ name: 'lbf·s/ft²', sym: 'lbf·s/ft²', f: 47.8802589803 },
    }
  },

  viscosity_k: {
    label: 'Visc. kin',
    glyph: 'ν',
    base: 'm²/s',
    default: ['cSt', 'm²/s'],
    units: {
      m2s:  { name: 'Square meter/sec',  sym: 'm²/s',  f: 1 },
      mm2s: { name: 'Square mm/sec',     sym: 'mm²/s', f: 1e-6 },
      cSt:  { name: 'Centistokes',       sym: 'cSt',   f: 1e-6 },
      St:   { name: 'Stokes',            sym: 'St',    f: 1e-4 },
      ft2s: { name: 'Square foot/sec',   sym: 'ft²/s', f: 0.09290304 },
    }
  },

  /* Motor LRC / inrush calculator. This category is not a unit converter —
     it has its own panel and logic in app.js (see mode: 'motor'). From a
     motor's nameplate it estimates locked-rotor / inrush current across all
     starting methods, optionally the exact NEMA code-letter LRC, and the
     supply voltage dip at start. */
  motor: {
    label: 'Motor LRC',
    glyph: 'M',
    mode: 'motor',
  },

  /* ====================================================================
     CALCULATORS (mode: 'calc') — declarative engineering calcs rendered
     by a generic panel in app.js. Each has `fields` (inputs) and a
     `compute(a)` that returns { rows:[{label,value,unit,sub,hi}], note }.
     `a` provides: a.n(id)=parsed number, a.s(id)=string, a.fmt(x)=format.
     Do NOT reference app.js helpers here — only use `a`.
     ==================================================================== */

  ohms: {
    label: "Ohm's Law", glyph: 'Ω', mode: 'calc',
    fields: [
      { id: 'V', label: 'Voltage', unit: 'V', ph: '120' },
      { id: 'I', label: 'Current', unit: 'A', ph: '2' },
      { id: 'R', label: 'Resistance', unit: 'Ω', ph: '60' },
      { id: 'P', label: 'Power', unit: 'W', ph: '' },
    ],
    compute(a) {
      let V = a.n('V'), I = a.n('I'), R = a.n('R'), P = a.n('P');
      const had = { V: isFinite(V), I: isFinite(I), R: isFinite(R), P: isFinite(P) };
      const known = ['V','I','R','P'].filter(k => had[k]);
      if (known.length < 2) return { note: 'Enter any two of V, I, R, P to solve for the rest.' };
      if (had.V && had.I) { R = V/I; P = V*I; }
      else if (had.V && had.R) { I = V/R; P = V*V/R; }
      else if (had.V && had.P) { I = P/V; R = V*V/P; }
      else if (had.I && had.R) { V = I*R; P = I*I*R; }
      else if (had.I && had.P) { V = P/I; R = P/(I*I); }
      else if (had.R && had.P) { V = Math.sqrt(P*R); I = Math.sqrt(P/R); }
      return { rows: [
        { label: 'Voltage', value: V, unit: 'V', hi: !had.V },
        { label: 'Current', value: I, unit: 'A', hi: !had.I },
        { label: 'Resistance', value: R, unit: 'Ω', hi: !had.R },
        { label: 'Power', value: P, unit: 'W', hi: !had.P },
      ], note: known.length > 2 ? 'More than two entered — solved from the first valid pair.' : '' };
    }
  },

  vdrop: {
    label: 'Voltage Drop', glyph: 'V', mode: 'calc',
    fields: [
      { id: 'sys', label: 'System', type: 'select', def: '3', options: [
        { v: '3', t: '3-phase' }, { v: '1', t: '1-phase' }, { v: 'dc', t: 'DC' } ] },
      { id: 'mat', label: 'Conductor', type: 'select', def: 'cu', options: [
        { v: 'cu', t: 'Copper' }, { v: 'al', t: 'Aluminum' } ] },
      { id: 'awg', label: 'Wire size', type: 'select', def: '10', options: [
        { v:'14',t:'14 AWG'},{v:'12',t:'12 AWG'},{v:'10',t:'10 AWG'},{v:'8',t:'8 AWG'},
        {v:'6',t:'6 AWG'},{v:'4',t:'4 AWG'},{v:'3',t:'3 AWG'},{v:'2',t:'2 AWG'},{v:'1',t:'1 AWG'},
        {v:'1/0',t:'1/0'},{v:'2/0',t:'2/0'},{v:'3/0',t:'3/0'},{v:'4/0',t:'4/0'},
        {v:'250',t:'250 kcmil'},{v:'300',t:'300 kcmil'},{v:'350',t:'350 kcmil'},
        {v:'400',t:'400 kcmil'},{v:'500',t:'500 kcmil'} ] },
      { id: 'len', label: 'Length (1-way)', unit: 'ft', ph: '100' },
      { id: 'amp', label: 'Current', unit: 'A', ph: '20' },
      { id: 'volt', label: 'Source', unit: 'V', ph: '240' },
    ],
    compute(a) {
      // Ω per 1000 ft, NEC Ch.9 Table 8 (DC, stranded, uncoated Cu / Al).
      const R_CU = {'14':3.07,'12':1.93,'10':1.21,'8':0.764,'6':0.491,'4':0.308,'3':0.245,
        '2':0.194,'1':0.154,'1/0':0.122,'2/0':0.0967,'3/0':0.0766,'4/0':0.0608,
        '250':0.0515,'300':0.0429,'350':0.0367,'400':0.0321,'500':0.0258};
      const R_AL = {'12':3.18,'10':2.00,'8':1.26,'6':0.808,'4':0.508,'3':0.403,'2':0.319,
        '1':0.253,'1/0':0.201,'2/0':0.159,'3/0':0.126,'4/0':0.100,'250':0.0847,
        '300':0.0707,'350':0.0605,'400':0.0529,'500':0.0424};
      const sys = a.s('sys'), mat = a.s('mat'), awg = a.s('awg');
      const len = a.n('len'), I = a.n('amp'), Vs = a.n('volt');
      const tbl = mat === 'al' ? R_AL : R_CU;
      const r = tbl[awg];
      if (r == null) return { note: 'That size isn’t listed for aluminum — pick 12 AWG or larger.' };
      if (!isFinite(len) || !isFinite(I)) return { note: 'Enter one-way run length and load current.' };
      const k = sys === '3' ? Math.sqrt(3) : 2;   // 2 for 1φ & DC (out-and-back), √3 for 3φ
      const Vd = k * I * r * (len / 1000);
      const rows = [{ label: 'Voltage drop', value: Vd, unit: 'V', hi: true }];
      if (isFinite(Vs) && Vs > 0) {
        const pct = Vd / Vs * 100;
        rows.push({ label: 'Drop', value: pct, unit: '%',
          sub: pct <= 3 ? '≤3% — good (branch)' : pct <= 5 ? '3–5% — OK (feeder + branch)' : '>5% — exceeds NEC guidance' });
        rows.push({ label: 'Voltage at load', value: Vs - Vd, unit: 'V' });
      }
      return { rows, note: `${mat === 'al' ? 'Al' : 'Cu'} ${awg} · ${r} Ω/1000ft · ${sys === 'dc' ? 'DC' : sys + 'φ'}` };
    }
  },

  power3: {
    label: '3φ Power', glyph: 'φ', mode: 'calc',
    fields: [
      { id: 'sys', label: 'System', type: 'select', def: '3', options: [
        { v: '3', t: '3-phase' }, { v: '1', t: '1-phase' } ] },
      { id: 'V', label: 'Voltage', unit: 'V', ph: '480' },
      { id: 'I', label: 'Current', unit: 'A', ph: '100' },
      { id: 'pf', label: 'Power factor', ph: '0.9', def: '0.9' },
    ],
    compute(a) {
      const sys = a.s('sys'); const V = a.n('V'), I = a.n('I');
      let pf = a.n('pf'); if (!isFinite(pf)) pf = 1; pf = Math.min(Math.max(pf, 0), 1);
      if (!isFinite(V) || !isFinite(I)) return { note: 'Enter line voltage and current.' };
      const k = sys === '1' ? 1 : Math.sqrt(3);
      const kVA = k * V * I / 1000;
      const kW = kVA * pf;
      const kVAR = Math.sqrt(Math.max(kVA*kVA - kW*kW, 0));
      return { rows: [
        { label: 'Apparent power', value: kVA, unit: 'kVA', hi: true },
        { label: 'Real power', value: kW, unit: 'kW', sub: `PF ${pf}` },
        { label: 'Reactive power', value: kVAR, unit: 'kVAR' },
        { label: 'Real power', value: kW / 0.7457, unit: 'HP', sub: 'electrical equiv. (before motor losses)' },
      ], note: `${sys === '1' ? '1' : '3'}φ · S = ${sys === '1' ? '' : '√3·'}V·I` };
    }
  },

  pump: {
    label: 'Pump Power', glyph: '⌽', mode: 'calc',
    fields: [
      { id: 'Q', label: 'Flow', unit: 'gpm', ph: '100' },
      { id: 'H', label: 'Head', unit: 'ft', ph: '80' },
      { id: 'sg', label: 'Specific gravity', ph: '1.0', def: '1.0' },
      { id: 'eff', label: 'Pump eff', unit: '%', ph: '70', def: '70' },
      { id: 'spd', label: 'New speed (affinity)', unit: '%', ph: 'optional' },
    ],
    compute(a) {
      const Q = a.n('Q'), H = a.n('H');
      let sg = a.n('sg'); if (!isFinite(sg)) sg = 1;
      let eff = a.n('eff'); if (!isFinite(eff) || eff <= 0) eff = 70;
      if (!isFinite(Q) || !isFinite(H)) return { note: 'Enter flow (gpm) and head (ft).' };
      const whp = Q * H * sg / 3960;
      const bhp = whp / (eff / 100);
      const kW = bhp * 0.7457;
      const rows = [
        { label: 'Hydraulic power', value: whp, unit: 'HP', hi: true, sub: 'WHP = Q·H·SG / 3960' },
        { label: 'Brake power', value: bhp, unit: 'HP', sub: `at ${eff}% pump eff` },
        { label: 'Motor power', value: kW, unit: 'kW' },
      ];
      const spd = a.n('spd');
      if (isFinite(spd) && spd > 0) {
        const r = spd / 100;
        rows.push({ label: `Flow @ ${spd}%`, value: Q * r, unit: 'gpm', sub: '∝ N' });
        rows.push({ label: `Head @ ${spd}%`, value: H * r * r, unit: 'ft', sub: '∝ N²' });
        rows.push({ label: `Brake power @ ${spd}%`, value: bhp * r * r * r, unit: 'HP', sub: '∝ N³ (affinity)' });
      }
      return { rows };
    }
  },

  torquehp: {
    label: 'Torque·HP·RPM', glyph: 'τ', mode: 'calc',
    fields: [
      { id: 'T', label: 'Torque', unit: 'lb·ft', ph: '' },
      { id: 'N', label: 'Speed', unit: 'RPM', ph: '1750' },
      { id: 'HP', label: 'Power', unit: 'HP', ph: '10' },
    ],
    compute(a) {
      let T = a.n('T'), N = a.n('N'), HP = a.n('HP');
      const had = { T: isFinite(T), N: isFinite(N), HP: isFinite(HP) };
      const known = ['T','N','HP'].filter(k => had[k]);
      if (known.length < 2) return { note: 'Enter any two of torque, speed, power.' };
      if (had.HP && had.N) T = 5252 * HP / N;
      else if (had.T && had.N) HP = T * N / 5252;
      else if (had.T && had.HP) N = 5252 * HP / T;
      return { rows: [
        { label: 'Torque', value: T, unit: 'lb·ft', hi: !had.T, sub: `${a.fmt(T * 1.355818)} N·m` },
        { label: 'Speed', value: N, unit: 'RPM', hi: !had.N },
        { label: 'Power', value: HP, unit: 'HP', hi: !had.HP, sub: `${a.fmt(HP * 0.7457)} kW` },
      ], note: 'HP = Torque × RPM / 5252' };
    }
  },

  pipe: {
    label: 'Pipe Flow', glyph: 'R', mode: 'calc',
    fields: [
      { id: 'Q', label: 'Flow', unit: 'gpm', ph: '100' },
      { id: 'd', label: 'Inside dia', unit: 'in', ph: '2' },
      { id: 'nu', label: 'Kinematic visc', unit: 'cSt', ph: '1.0', def: '1.0' },
    ],
    compute(a) {
      const Q = a.n('Q'), d = a.n('d');
      let nu = a.n('nu'); if (!isFinite(nu) || nu <= 0) nu = 1.0;
      if (!isFinite(Q) || !isFinite(d) || d <= 0) return { note: 'Enter flow (gpm) and inside diameter (in).' };
      const v_fts = 0.4085 * Q / (d * d);                 // ft/s
      const Re = (v_fts * 0.3048) * (d * 0.0254) / (nu * 1e-6);
      const regime = Re < 2300 ? 'laminar' : Re < 4000 ? 'transitional' : 'turbulent';
      const warn = v_fts > 7 ? ' · high — erosion risk' : v_fts < 2 ? ' · low — may silt' : ' · good range';
      return { rows: [
        { label: 'Velocity', value: v_fts, unit: 'ft/s', hi: true, sub: `${a.fmt(v_fts * 0.3048)} m/s${warn}` },
        { label: 'Reynolds number', value: Re, unit: '', sub: regime },
      ], note: 'Water ν ≈ 1.0 cSt at 20 °C' };
    }
  },

  heat: {
    label: 'Heat Load', glyph: 'Q', mode: 'calc',
    fields: [
      { id: 'fluid', label: 'Fluid', type: 'select', def: 'water', options: [
        { v: 'water', t: 'Water (gpm)' }, { v: 'air', t: 'Air (cfm)' } ] },
      { id: 'flow', label: 'Flow', unit: 'gpm / cfm', ph: '50' },
      { id: 'dT', label: 'ΔT', unit: '°F', ph: '20', neg: true },
    ],
    compute(a) {
      const fluid = a.s('fluid'); const flow = a.n('flow'); const dT = a.n('dT');
      if (!isFinite(flow) || !isFinite(dT)) return { note: 'Enter flow and temperature difference (ΔT).' };
      const k = fluid === 'air' ? 1.08 : 500;             // BTU/h per unit-flow per °F
      const btu = k * flow * dT;
      return { rows: [
        { label: 'Heat load', value: btu, unit: 'BTU/h', hi: true,
          sub: fluid === 'air' ? 'Q = 1.08 × cfm × ΔT' : 'Q = 500 × gpm × ΔT' },
        { label: 'Refrigeration', value: btu / 12000, unit: 'tons' },
        { label: 'Power', value: btu * 0.00029307, unit: 'kW' },
      ] };
    }
  },

  rtd: {
    label: 'RTD', glyph: 'Pt', mode: 'calc',
    models: [['Rosemount','644 · 3144P · 848T'],['Honeywell','STT3000 · STT350']],
    fields: [
      { id: 'type', label: 'Sensor', type: 'select', def: '100', options: [
        { v: '100', t: 'Pt100 (385)' }, { v: '500', t: 'Pt500' }, { v: '1000', t: 'Pt1000' } ] },
      { id: 'T', label: 'Temperature', unit: '°C', ph: '100', neg: true },
      { id: 'R', label: 'or Resistance', unit: 'Ω', ph: '' },
    ],
    // Callendar–Van Dusen, IEC 60751 (α = 0.00385).
    _A: 3.9083e-3, _B: -5.775e-7, _C: -4.183e-12,
    res(T, R0) {
      const t3 = T < 0 ? this._C * (T - 100) * T * T * T : 0;
      return R0 * (1 + this._A * T + this._B * T * T + t3);
    },
    temp(R, R0) {
      const A = this._A, B = this._B;
      if (R >= R0) return (-A + Math.sqrt(A * A - 4 * B * (1 - R / R0))) / (2 * B); // T ≥ 0, exact
      let T = (R / R0 - 1) / A;                                                     // T < 0, Newton on full CVD
      for (let i = 0; i < 80; i++) {
        const f = this.res(T, R0) - R;
        const d = (this.res(T + 0.05, R0) - this.res(T - 0.05, R0)) / 0.1;
        if (!d) break;
        const step = f / d; T -= step;
        if (Math.abs(step) < 1e-5) break;
      }
      return T;
    },
    compute(a) {
      const R0 = parseFloat(a.s('type'));
      const T = a.n('T'), R = a.n('R');
      if (isFinite(T)) {
        return { rows: [
          { label: 'Temperature', value: T, unit: '°C', sub: `${a.fmt(T * 9/5 + 32)} °F` },
          { label: 'Resistance', value: this.res(T, R0), unit: 'Ω', hi: true },
        ] };
      }
      if (isFinite(R)) {
        const t = this.temp(R, R0);
        return { rows: [
          { label: 'Temperature', value: t, unit: '°C', hi: true, sub: `${a.fmt(t * 9/5 + 32)} °F` },
          { label: 'Resistance', value: R, unit: 'Ω' },
        ] };
      }
      return { note: 'Enter a temperature (→ resistance) or a resistance (→ temperature).' };
    }
  },

  tc: {
    label: 'Thermocouple', glyph: 'TC', mode: 'calc',
    models: [['Rosemount','644 · 3144P'],['Honeywell','STT3000 · STT350']],
    fields: [
      { id: 'type', label: 'Type', type: 'select', def: 'K', options: [
        { v: 'K', t: 'Type K' }, { v: 'J', t: 'Type J' }, { v: 'T', t: 'Type T' }, { v: 'E', t: 'Type E' } ] },
      { id: 'T', label: 'Process temp', unit: '°C', ph: '100', neg: true },
      { id: 'cj', label: 'Cold junction', unit: '°C', ph: '25', def: '25', neg: true },
      { id: 'mv', label: 'or measured EMF', unit: 'mV', ph: '' },
    ],
    // NIST ITS-90 reference functions (T in °C → EMF in mV). Horner on c0..cn.
    _C: {
      K: [
        { lo: -270, hi: 0, c: [0, 3.9450128025e-2, 2.3622373598e-5, -3.2858906784e-7, -4.9904828777e-9, -6.7509059173e-11, -5.7410327428e-13, -3.1088872894e-15, -1.0451609365e-17, -1.9889266878e-20, -1.6322697486e-23] },
        { lo: 0, hi: 1372, c: [-1.7600413686e-2, 3.8921204975e-2, 1.8558770032e-5, -9.9457592874e-8, 3.1840945719e-10, -5.6072844889e-13, 5.6075059059e-16, -3.2020720003e-19, 9.7151147152e-23, -1.2104721275e-26], exp: [0.1185976, -1.183432e-4, 126.9686] },
      ],
      J: [
        { lo: -210, hi: 760, c: [0, 5.0381187815e-2, 3.0475836930e-5, -8.5681065720e-8, 1.3228195295e-10, -1.7052958337e-13, 2.0948090697e-16, -1.2538395336e-19, 1.5631725697e-23] },
        { lo: 760, hi: 1200, c: [2.9645625681e2, -1.4976127786, 3.1787103924e-3, -3.1847686701e-6, 1.5720819004e-9, -3.0691369056e-13] },
      ],
      T: [
        { lo: -270, hi: 0, c: [0, 3.8748106364e-2, 4.4194434347e-5, 1.1844323105e-7, 2.0032973554e-8, 9.0138019559e-10, 2.2651156593e-11, 3.6071154205e-13, 3.8493939883e-15, 2.8213521925e-17, 1.4251594779e-19, 4.8768662286e-22, 1.0795539270e-24, 1.3945027062e-27, 7.9795153927e-31] },
        { lo: 0, hi: 400, c: [0, 3.8748106364e-2, 3.3292227880e-5, 2.0618243404e-7, -2.1882256846e-9, 1.0996880928e-11, -3.0815758772e-14, 4.5479135290e-17, -2.7512901673e-20] },
      ],
      E: [
        { lo: -270, hi: 0, c: [0, 5.8665508708e-2, 4.5410977124e-5, -7.7998048686e-7, -2.5800160843e-8, -5.9452583057e-10, -9.3214058667e-12, -1.0287605534e-13, -8.0370123621e-16, -4.3979497391e-18, -1.6414776355e-20, -3.9673619516e-23, -5.5827328721e-26, -3.4657842013e-29] },
        { lo: 0, hi: 1000, c: [0, 5.8665508710e-2, 4.5032275582e-5, 2.8908407212e-8, -3.3056896652e-10, 6.5024403270e-13, -1.9197495504e-16, -1.2536600497e-18, 2.1489217569e-21, -1.4388041782e-24, 3.5960899481e-28] },
      ],
    },
    emf(type, T) {
      const segs = this._C[type];
      for (const s of segs) {
        if (T >= s.lo && T <= s.hi) {
          let e = 0;
          for (let i = s.c.length - 1; i >= 0; i--) e = e * T + s.c[i];
          if (s.exp) e += s.exp[0] * Math.exp(s.exp[1] * (T - s.exp[2]) * (T - s.exp[2]));
          return e;
        }
      }
      return NaN;
    },
    tempFromEmf(type, E) {
      if (!isFinite(E)) return NaN;
      // EMF is monotonic in T for these types → bisection over the full range.
      const segs = this._C[type];
      let a = segs[0].lo, b = segs[segs.length - 1].hi;
      if (E < this.emf(type, a) || E > this.emf(type, b)) return NaN;
      for (let i = 0; i < 100; i++) {
        const m = (a + b) / 2;
        const fm = this.emf(type, m) - E;
        if (Math.abs(fm) < 1e-6 || (b - a) < 1e-5) return m;
        if (fm < 0) a = m; else b = m;
      }
      return (a + b) / 2;
    },
    compute(a) {
      const type = a.s('type');
      let cj = a.n('cj'); if (!isFinite(cj)) cj = 0;
      const T = a.n('T'), mv = a.n('mv');
      if (isFinite(T)) {
        const e = this.emf(type, T) - this.emf(type, cj);
        if (!isFinite(e)) return { note: `Temperature out of range for type ${type}.` };
        const sens = this.emf(type, T + 0.5) - this.emf(type, T - 0.5);
        return { rows: [
          { label: 'Thermocouple EMF', value: e, unit: 'mV', hi: true, sub: `type ${type} · CJ ${cj} °C` },
          { label: 'Sensitivity', value: sens, unit: 'mV/°C' },
        ] };
      }
      if (isFinite(mv)) {
        const eHot = mv + this.emf(type, cj);
        const Th = this.tempFromEmf(type, eHot);
        if (!isFinite(Th)) return { note: `EMF out of range for type ${type}.` };
        return { rows: [
          { label: 'Process temp', value: Th, unit: '°C', hi: true, sub: `${a.fmt(Th * 9/5 + 32)} °F · CJ ${cj} °C` },
        ] };
      }
      return { note: 'Enter a process temperature (→ mV), or a measured EMF (→ temperature).' };
    }
  },

  cvliq: {
    label: 'Valve Cv (liquid)', glyph: 'Cv', mode: 'calc',
    fields: [
      { id: 'Q', label: 'Flow', unit: 'gpm', ph: '100' },
      { id: 'dP', label: 'ΔP', unit: 'psi', ph: '25' },
      { id: 'SG', label: 'Specific gravity', ph: '1.0', def: '1.0' },
      { id: 'P1', label: 'Inlet P1', unit: 'psia', ph: 'optional' },
      { id: 'Pv', label: 'Vapor press', unit: 'psia', ph: 'optional' },
      { id: 'FL', label: 'Recovery FL', ph: '0.9', def: '0.9' },
    ],
    compute(a) {
      const Q = a.n('Q'); let dP = a.n('dP');
      let SG = a.n('SG'); if (!isFinite(SG) || SG <= 0) SG = 1;
      if (!isFinite(Q) || !isFinite(dP) || dP <= 0) return { note: 'Enter flow (gpm) and pressure drop ΔP (psi).' };
      const P1 = a.n('P1'), Pv = a.n('Pv');
      let FL = a.n('FL'); if (!isFinite(FL)) FL = 0.9;
      let choked = false, dPmax = NaN, note = '';
      if (isFinite(P1) && isFinite(Pv)) {
        const Pc = 3206;                                   // water critical pressure, psia
        const FF = 0.96 - 0.28 * Math.sqrt(Math.max(Pv, 0) / Pc);
        dPmax = FL * FL * (P1 - FF * Pv);
        if (dP >= dPmax) { choked = true; dP = dPmax; }
        note = choked ? `Choked — ΔP capped at ${a.fmt(dPmax)} psi (flashing/cavitation).`
                      : `Not choked · chokes above ΔP ≈ ${a.fmt(dPmax)} psi.`;
      }
      const Cv = Q * Math.sqrt(SG / dP);
      const rows = [
        { label: 'Required Cv', value: Cv, unit: '', hi: true, sub: choked ? 'at choked ΔP' : '' },
        { label: 'Required Kv', value: Cv * 0.865, unit: '' },
      ];
      if (choked) rows.push({ label: 'Choked ΔP', value: dPmax, unit: 'psi' });
      return { rows, note };
    }
  },

  cvkv: {
    label: 'Cv ⇄ Kv', glyph: 'Kv', mode: 'calc',
    fields: [
      { id: 'Cv', label: 'Cv', ph: '20' },
      { id: 'Kv', label: 'or Kv', ph: '' },
      { id: 'dP', label: 'ΔP', unit: 'psi', ph: 'optional' },
      { id: 'SG', label: 'Specific gravity', ph: '1.0', def: '1.0' },
    ],
    compute(a) {
      let Cv = a.n('Cv'); const Kv = a.n('Kv');
      if (!isFinite(Cv) && isFinite(Kv)) Cv = Kv / 0.865;
      if (!isFinite(Cv)) return { note: 'Enter a Cv (or a Kv) to convert.' };
      let SG = a.n('SG'); if (!isFinite(SG) || SG <= 0) SG = 1;
      const dP = a.n('dP');
      const rows = [
        { label: 'Cv', value: Cv, unit: '', hi: true },
        { label: 'Kv', value: Cv * 0.865, unit: '', sub: 'Kv = 0.865 × Cv' },
      ];
      if (isFinite(dP) && dP > 0) rows.push({ label: 'Flow at ΔP', value: Cv * Math.sqrt(dP / SG), unit: 'gpm', sub: `${a.fmt(dP)} psi, SG ${SG}` });
      return { rows };
    }
  },

  vchar: {
    label: 'Valve % Travel', glyph: '%', mode: 'calc',
    fields: [
      { id: 'Cv', label: 'Required Cv', ph: '20' },
      { id: 'Cvmax', label: 'Rated Cv (open)', ph: '40' },
      { id: 'R', label: 'Rangeability', ph: '50', def: '50' },
    ],
    compute(a) {
      const Cv = a.n('Cv'), Cvmax = a.n('Cvmax');
      let R = a.n('R'); if (!isFinite(R) || R <= 1) R = 50;
      if (!isFinite(Cv) || !isFinite(Cvmax) || Cvmax <= 0) return { note: 'Enter required Cv and the valve’s rated (full-open) Cv.' };
      const ratio = Cv / Cvmax;
      const lin = ratio * 100;
      const eqp = Math.max(0, 100 * (1 + Math.log(ratio) / Math.log(R)));
      const flag = ratio > 1 ? 'undersized — needs >100% travel' :
                   lin < 10 ? 'throttles near seat — likely oversized' :
                   lin > 90 ? 'little margin — near full open' : 'good control range';
      return { rows: [
        { label: 'Linear valve', value: Math.min(lin, 100), unit: '% open', hi: true },
        { label: 'Equal-% valve', value: Math.min(eqp, 100), unit: '% open', sub: `R = ${R}` },
        { label: 'Cv ratio', value: ratio, unit: '', sub: flag },
      ] };
    }
  },

  cvgas: {
    label: 'Valve Cv (gas)', glyph: 'Cg', mode: 'calc',
    fields: [
      { id: 'Q', label: 'Flow', unit: 'scfh', section: 'Flow', ph: '10000' },
      { id: 'P1', label: 'Inlet P1', unit: 'psia', section: 'Conditions', ph: '100' },
      { id: 'dP', label: 'ΔP', unit: 'psi', section: 'Conditions', ph: '10' },
      { id: 'G', label: 'Gas SG', unit: 'air=1', section: 'Conditions', ph: '1.0', def: '1.0' },
      { id: 'T', label: 'Inlet temp', unit: '°F', section: 'Conditions', ph: '60', def: '60' },
      { id: 'xT', label: 'xT factor', section: 'Conditions', ph: '0.7', def: '0.7' },
    ],
    compute(a) {
      const Q = a.n('Q'), P1 = a.n('P1'), dP = a.n('dP');
      let G = a.n('G'); if (!isFinite(G) || G <= 0) G = 1;
      let T = a.n('T'); if (!isFinite(T)) T = 60;
      let xT = a.n('xT'); if (!isFinite(xT) || xT <= 0) xT = 0.7;
      if (!isFinite(Q) || !isFinite(P1) || P1 <= 0 || !isFinite(dP) || dP <= 0) return { note: 'Enter flow (scfh), inlet P1 (psia) and ΔP (psi).' };
      let x = dP / P1, choked = false;
      if (x >= xT) { x = xT; choked = true; }
      const Y = 1 - x / (3 * xT);
      const Cv = Q / (1360 * P1 * Y) * Math.sqrt(G * (T + 460) / x);
      return { rows: [
        { label: 'Required Cv', value: Cv, unit: '', hi: true, sub: choked ? 'choked — x capped at xT' : '' },
        { label: 'Pressure ratio x', value: dP / P1, unit: '', sub: `xT = ${a.fmt(xT)}` },
        { label: 'Expansion factor Y', value: Y, unit: '' },
      ], note: 'Simplified ISA gas sizing (Z=1): Cv = Q / (1360·P1·Y·√(x/(G·T_°R))). Verify vs vendor software for critical service.' };
    }
  },

  vauth: {
    label: 'Valve Authority', glyph: 'N', mode: 'calc',
    fields: [
      { id: 'dpv', label: 'Valve ΔP (open)', unit: 'psi', ph: '10' },
      { id: 'dps', label: 'Rest of system ΔP', unit: 'psi', ph: '10' },
    ],
    compute(a) {
      const dpv = a.n('dpv'), dps = a.n('dps');
      if (!isFinite(dpv) || dpv < 0 || !isFinite(dps) || dps < 0) return { note: 'Enter the valve ΔP (fully open) and the rest-of-system ΔP at full flow.' };
      const N = dpv / (dpv + dps || 1);
      const verdict = N >= 0.5 ? 'good — near-linear installed char.' : N >= 0.25 ? 'acceptable' : 'low — valve loses authority';
      return { rows: [
        { label: 'Authority N', value: N, unit: '', hi: true, sub: verdict },
        { label: 'Valve ΔP share', value: N * 100, unit: '%', sub: 'of total at full flow' },
      ], note: 'N = ΔP_valve / (ΔP_valve + ΔP_system) at full flow. Aim for ≥ 0.25–0.5.' };
    }
  },

  masignal: {
    label: '4-20 mA Signal', glyph: 'mA', mode: 'calc',
    models: [['Rosemount','3051 · 644 · 5408'],['Honeywell','ST3000 · STT3000']],
    fields: [
      { id: 'mA', label: 'Current', unit: 'mA', ph: '12' },
      { id: 'R', label: 'Sense resistor', unit: 'Ω', ph: '250', def: '250' },
      { id: 'lrv', label: 'Value @ 4 mA', ph: '0', def: '0', neg: true },
      { id: 'urv', label: 'Value @ 20 mA', ph: '100', def: '100', neg: true },
    ],
    compute(a) {
      const mA = a.n('mA');
      let R = a.n('R'); if (!isFinite(R)) R = 250;
      let lrv = a.n('lrv'); if (!isFinite(lrv)) lrv = 0;
      let urv = a.n('urv'); if (!isFinite(urv)) urv = 100;
      if (!isFinite(mA)) return { note: 'Enter the loop current in mA (4 = 0%, 20 = 100%).' };
      const pct = (mA - 4) / 16 * 100;
      const val = lrv + pct / 100 * (urv - lrv);
      const V = mA * R / 1000;
      const note = R === 250 ? '250 Ω turns 4–20 mA into the standard 1–5 V (4 mA→1 V, 20 mA→5 V).'
                             : `Across ${a.fmt(R)} Ω: 4 mA→${a.fmt(4*R/1000)} V, 20 mA→${a.fmt(20*R/1000)} V.`;
      return { rows: [
        { label: '% of span', value: pct, unit: '%', hi: true },
        { label: 'Process value', value: val, unit: '' },
        { label: `Voltage across ${a.fmt(R)} Ω`, value: V, unit: 'V', sub: 'V = mA × Ω ÷ 1000' },
      ], note };
    }
  },

  maloop: {
    label: '4-20 mA Loop', glyph: 'LP', mode: 'calc',
    models: [['','any 4–20 mA loop']],
    fields: [
      { id: 'Vs', label: 'Supply', unit: 'V', ph: '24', def: '24' },
      { id: 'Vtx', label: 'Transmitter min', unit: 'V', ph: '12', def: '12' },
      { id: 'R', label: 'Loop resistance', unit: 'Ω', ph: 'optional' },
    ],
    compute(a) {
      let Vs = a.n('Vs'); if (!isFinite(Vs)) Vs = 24;
      let Vtx = a.n('Vtx'); if (!isFinite(Vtx)) Vtx = 12;
      const R = a.n('R');
      const Rmax = (Vs - Vtx) / 0.020;                     // worst case at 20 mA
      const rows = [
        { label: 'Max loop resistance', value: Rmax, unit: 'Ω', hi: true, sub: `(Vs − Vtx) ÷ 20 mA` },
      ];
      if (isFinite(R)) {
        const drop = 0.020 * R;
        const left = Vs - drop;
        const ok = left >= Vtx;
        rows.push({ label: 'Drop at 20 mA', value: drop, unit: 'V', sub: `across ${a.fmt(R)} Ω` });
        rows.push({ label: 'Left for transmitter', value: left, unit: 'V', sub: ok ? `OK — ≥ ${a.fmt(Vtx)} V` : `FAIL — below ${a.fmt(Vtx)} V min` });
      }
      return { rows, note: 'Loop works if total resistance (sense R + wire + barriers) ≤ max, so the transmitter keeps its minimum voltage at 20 mA.' };
    }
  },

  xfmrfla: {
    label: 'Transformer FLA', glyph: 'kVA', mode: 'calc',
    fields: [
      { id: 'ph', label: 'Phase', type: 'select', def: '3', options: [
        { v: '3', t: '3-phase' }, { v: '1', t: '1-phase' } ] },
      { id: 'kVA', label: 'Rating', unit: 'kVA', ph: '75' },
      { id: 'Vp', label: 'Primary', unit: 'V', ph: '480' },
      { id: 'Vs', label: 'Secondary', unit: 'V', ph: '208' },
    ],
    compute(a) {
      const ph = a.s('ph'); const kVA = a.n('kVA'), Vp = a.n('Vp'), Vs = a.n('Vs');
      if (!isFinite(kVA) || kVA <= 0) return { note: 'Enter the transformer kVA and at least one voltage.' };
      const k = ph === '1' ? 1 : Math.sqrt(3);
      const rows = [];
      if (isFinite(Vp) && Vp > 0) rows.push({ label: 'Primary FLA', value: kVA * 1000 / (k * Vp), unit: 'A', hi: true });
      if (isFinite(Vs) && Vs > 0) rows.push({ label: 'Secondary FLA', value: kVA * 1000 / (k * Vs), unit: 'A', hi: !rows.length });
      if (isFinite(Vp) && isFinite(Vs) && Vs > 0) rows.push({ label: 'Turns ratio', value: Vp / Vs, unit: ': 1', sub: `${a.fmt(Vp)} : ${a.fmt(Vs)}` });
      if (!rows.length) return { note: 'Enter a primary or secondary voltage.' };
      return { rows, note: `${ph === '1' ? '1' : '3'}φ · I = kVA·1000 / (${ph === '1' ? '' : '√3·'}V)` };
    }
  },

  xfmrsc: {
    label: 'Xfmr Fault Current', glyph: 'SC', mode: 'calc',
    fields: [
      { id: 'ph', label: 'Phase', type: 'select', def: '3', options: [
        { v: '3', t: '3-phase' }, { v: '1', t: '1-phase' } ] },
      { id: 'kVA', label: 'Rating', unit: 'kVA', ph: '75' },
      { id: 'Vs', label: 'Secondary', unit: 'V', ph: '208' },
      { id: 'Z', label: 'Impedance %Z', ph: '5.75', def: '5.75' },
    ],
    compute(a) {
      const ph = a.s('ph'); const kVA = a.n('kVA'), Vs = a.n('Vs');
      let Z = a.n('Z'); if (!isFinite(Z) || Z <= 0) Z = 5.75;
      if (!isFinite(kVA) || kVA <= 0 || !isFinite(Vs) || Vs <= 0) return { note: 'Enter kVA and secondary voltage.' };
      const k = ph === '1' ? 1 : Math.sqrt(3);
      const Is = kVA * 1000 / (k * Vs);
      return { rows: [
        { label: 'Secondary FLA', value: Is, unit: 'A' },
        { label: 'Available fault', value: Is * 100 / Z, unit: 'A', hi: true, sub: `FLA × 100 / %Z` },
        { label: 'Short-circuit power', value: kVA * 100 / Z, unit: 'kVA' },
      ], note: `Infinite-bus estimate (max). %Z = ${a.fmt(Z)}. Real fault is lower with finite upstream capacity.` };
    }
  },

  xfmrvr: {
    label: 'Xfmr Voltage Reg.', glyph: 'VR', mode: 'calc',
    fields: [
      { id: 'Z', label: 'Impedance %Z', ph: '5.75', def: '5.75' },
      { id: 'xr', label: 'X/R ratio', ph: '3', def: '3' },
      { id: 'load', label: 'Load', unit: '%', ph: '100', def: '100' },
      { id: 'pf', label: 'Power factor', ph: '0.85', def: '0.85' },
    ],
    compute(a) {
      let Z = a.n('Z'); if (!isFinite(Z) || Z <= 0) return { note: 'Enter the transformer impedance %Z.' };
      let xr = a.n('xr'); if (!isFinite(xr) || xr < 0) xr = 3;
      let load = a.n('load'); if (!isFinite(load)) load = 100;
      let pf = a.n('pf'); if (!isFinite(pf)) pf = 0.85; pf = Math.min(Math.max(pf, 0), 1);
      const pctR = Z / Math.sqrt(1 + xr * xr);
      const pctX = pctR * xr;
      const sinphi = Math.sqrt(Math.max(1 - pf * pf, 0));   // lagging PF
      const VR = (load / 100) * (pctR * pf + pctX * sinphi);
      return { rows: [
        { label: 'Voltage regulation', value: VR, unit: '%', hi: true, sub: `at ${a.fmt(load)}% load, PF ${pf} lag` },
        { label: 'Resistance %R', value: pctR, unit: '%' },
        { label: 'Reactance %X', value: pctX, unit: '%' },
      ], note: 'VR ≈ load · (%R·cosφ + %X·sinφ). Add for lagging PF (shown), subtract %X·sinφ for leading.' };
    }
  },

  sqrtdp: {
    label: '√ DP Flow', glyph: '√', mode: 'calc',
    models: [['Rosemount','3051SF · 3051S MV'],['Honeywell','ST3000 (DP flow)']],
    fields: [
      { id: 'mA', label: 'DP signal', unit: 'mA', ph: '12' },
      { id: 'flow', label: 'or Flow', unit: '%', ph: '' },
      { id: 'Qmax', label: 'Flow at 100%', ph: 'optional' },
      { id: 'cut', label: 'Low-flow cutoff', unit: '%', ph: '0', def: '0' },
    ],
    compute(a) {
      const mA = a.n('mA'), flowIn = a.n('flow'), Qmax = a.n('Qmax');
      let cut = a.n('cut'); if (!isFinite(cut)) cut = 0;
      let dpPct, flowPct, sig;
      if (isFinite(mA)) { dpPct = Math.max((mA - 4) / 16 * 100, 0); flowPct = Math.sqrt(dpPct / 100) * 100; sig = mA; }
      else if (isFinite(flowIn)) { flowPct = flowIn; dpPct = flowPct * flowPct / 100; sig = 4 + dpPct / 100 * 16; }
      else return { note: 'Enter the DP signal (mA) → flow %, or a flow % → DP signal.' };
      let cutNote = '';
      if (flowPct < cut) { flowPct = 0; cutNote = ` · below ${a.fmt(cut)}% cutoff → 0`; }
      const rows = [
        { label: 'Flow', value: flowPct, unit: '%', hi: true, sub: 'flow% = √(DP%)' + cutNote },
        { label: 'DP / signal', value: dpPct, unit: '%', sub: `${a.fmt(sig)} mA` },
      ];
      if (isFinite(Qmax)) rows.push({ label: 'Flow rate', value: flowPct / 100 * Qmax, unit: '' });
      return { rows, note: 'Orifice/DP flow: signal ∝ DP ∝ flow². 50% DP = 70.7% flow.' };
    }
  },

  dplevel: {
    label: 'DP Level Cal', glyph: 'LT', mode: 'calc',
    models: [['Rosemount','3051 · 2051 · 1151'],['Honeywell','ST3000 · ST350']],
    fields: [
      { id: 'H', label: 'Level span', unit: 'in', ph: '100' },
      { id: 'SG', label: 'Process SG', ph: '1.0', def: '1.0' },
      { id: 'off', label: 'Zero offset', unit: 'inH₂O', ph: '0', def: '0', neg: true },
      { id: 'L', label: 'Level point', unit: 'in', ph: 'optional' },
    ],
    compute(a) {
      const H = a.n('H'); let SG = a.n('SG'); if (!isFinite(SG) || SG <= 0) SG = 1;
      let off = a.n('off'); if (!isFinite(off)) off = 0;
      if (!isFinite(H) || H <= 0) return { note: 'Enter the level span height (in) and process SG.' };
      const dpSpan = H * SG;
      const rows = [
        { label: 'DP span', value: dpSpan, unit: 'inH₂O', hi: true, sub: 'span = height × SG' },
        { label: 'LRV (4 mA)', value: off, unit: 'inH₂O' },
        { label: 'URV (20 mA)', value: off + dpSpan, unit: 'inH₂O' },
      ];
      const L = a.n('L');
      if (isFinite(L)) {
        const pct = L / H * 100;
        rows.push({ label: `At ${a.fmt(L)} in`, value: pct, unit: '% level', sub: `${a.fmt(off + L * SG)} inH₂O · ${a.fmt(4 + pct / 100 * 16)} mA` });
      }
      return { rows, note: 'Wet/reference leg: enter zero offset as negative = −(fill height × fill SG) for elevation.' };
    }
  },

  rtdlead: {
    label: 'RTD Lead Error', glyph: 'RL', mode: 'calc',
    models: [['Rosemount','644 · 3144P'],['Honeywell','STT3000 · STT350']],
    fields: [
      { id: 'type', label: 'Sensor', type: 'select', def: '100', options: [
        { v: '100', t: 'Pt100' }, { v: '500', t: 'Pt500' }, { v: '1000', t: 'Pt1000' } ] },
      { id: 'wiring', label: 'Wiring', type: 'select', def: '2', options: [
        { v: '2', t: '2-wire' }, { v: '3', t: '3-wire' }, { v: '4', t: '4-wire' } ] },
      { id: 'R', label: 'Lead R (per wire)', unit: 'Ω', ph: '1' },
    ],
    compute(a) {
      const R0 = parseFloat(a.s('type'));
      const wiring = a.s('wiring');
      const R = a.n('R');
      if (!isFinite(R)) return { note: 'Enter the one-way lead resistance per wire (Ω).' };
      const sens = 0.385 * R0 / 100;                       // Ω/°C (≈ Pt100 0.385)
      const loop = 2 * R;
      const err = wiring === '2' ? loop / sens : 0;
      return { rows: [
        { label: 'Temperature error', value: err, unit: '°C', hi: true, sub: wiring === '2' ? `${a.fmt(err * 9/5)} °F` : 'compensated (≈0)' },
        { label: 'Lead loop resistance', value: loop, unit: 'Ω', sub: '2 × per-wire' },
        { label: 'Sensitivity', value: sens, unit: 'Ω/°C' },
      ], note: wiring === '2' ? '2-wire adds full lead resistance as error — use 3- or 4-wire to cancel it.' : '3-/4-wire cancels matched lead resistance.' };
    }
  },

  pitot: {
    label: 'Pitot Velocity', glyph: 'Pv', mode: 'calc',
    models: [['Rosemount','3051SFA + 485'],['Honeywell','ST3000 + pitot']],
    fields: [
      { id: 'dP', label: 'ΔP', unit: 'inH₂O', ph: '1' },
      { id: 'fluid', label: 'Fluid', type: 'select', def: 'air', options: [
        { v: 'air', t: 'Air (STP)' }, { v: 'water', t: 'Water' }, { v: 'custom', t: 'Custom ρ' } ] },
      { id: 'rho', label: 'Density', unit: 'kg/m³', ph: 'if custom' },
    ],
    compute(a) {
      const dP = a.n('dP'); const fluid = a.s('fluid');
      let rho = fluid === 'water' ? 998 : fluid === 'custom' ? a.n('rho') : 1.204;
      if (!isFinite(dP) || dP < 0) return { note: 'Enter the differential pressure (inH₂O).' };
      if (!isFinite(rho) || rho <= 0) return { note: 'Enter the fluid density (kg/m³).' };
      const dPa = dP * 248.84;
      const v = Math.sqrt(2 * dPa / rho);                  // m/s
      const fts = v / 0.3048;
      return { rows: [
        { label: 'Velocity', value: fts, unit: 'ft/s', hi: true },
        { label: 'Velocity', value: fts * 60, unit: 'ft/min' },
        { label: 'Velocity', value: v, unit: 'm/s' },
      ], note: 'v = √(2ΔP/ρ). Standard air: ≈ 4005·√(inH₂O) ft/min.' };
    }
  },

  kfactor: {
    label: 'Meter K-factor', glyph: 'K', mode: 'calc',
    models: [['Rosemount','8800 Vortex · 8700 Mag'],['Micro Motion','ELITE · F-Series (freq out)']],
    fields: [
      { id: 'K', label: 'K-factor', unit: 'p/gal', ph: '1000' },
      { id: 'f', label: 'Frequency', unit: 'Hz', ph: '' },
      { id: 'Q', label: 'Flow', unit: 'gpm', ph: '' },
      { id: 'p', label: 'Pulse count', ph: 'optional' },
    ],
    compute(a) {
      let K = a.n('K'), f = a.n('f'), Q = a.n('Q');
      const had = { K: isFinite(K), f: isFinite(f), Q: isFinite(Q) };
      const known = ['K','f','Q'].filter(k => had[k]);
      if (known.length < 2) return { note: 'Enter any two of K-factor, frequency, flow (freq = K × gpm / 60).' };
      if (had.K && had.Q) f = K * Q / 60;
      else if (had.K && had.f) Q = f * 60 / K;
      else if (had.f && had.Q) K = f * 60 / Q;
      const rows = [
        { label: 'K-factor', value: K, unit: 'p/gal', hi: !had.K },
        { label: 'Frequency', value: f, unit: 'Hz', hi: !had.f },
        { label: 'Flow', value: Q, unit: 'gpm', hi: !had.Q },
      ];
      const p = a.n('p');
      if (isFinite(p) && isFinite(K) && K > 0) rows.push({ label: 'Total volume', value: p / K, unit: 'gal', sub: 'pulses ÷ K' });
      return { rows };
    }
  },

  coriolis: {
    label: 'Coriolis Flow', glyph: 'ṁ', mode: 'calc',
    models: [['Micro Motion', 'ELITE · F-Series · 2700/5700']],
    fields: [
      { id: 'sg', label: 'Density', unit: 'g/cm³', section: 'Fluid', ph: '1.0', def: '1.0' },
      { id: 'mass', label: 'Mass flow', unit: 'lb/min', section: 'Flow · enter one', ph: '' },
      { id: 'vol', label: 'or Volume', unit: 'gpm', section: 'Flow · enter one', ph: '' },
    ],
    compute(a) {
      let sg = a.n('sg'); if (!isFinite(sg) || sg <= 0) sg = 1;
      const lbGal = 8.3454 * sg;                       // lb per gallon at this SG
      const mass = a.n('mass'), vol = a.n('vol');
      let m, v, hiM = false, hiV = false;
      if (isFinite(mass)) { m = mass; v = mass / lbGal; hiV = true; }
      else if (isFinite(vol)) { v = vol; m = vol * lbGal; hiM = true; }
      else return { note: 'Enter a mass flow (lb/min) or a volume flow (gpm) — density relates them.' };
      return { rows: [
        { label: 'Mass flow', value: m, unit: 'lb/min', hi: hiM, sub: `${a.fmt(m * 27.2155)} kg/h` },
        { label: 'Volume flow', value: v, unit: 'gpm', hi: hiV, sub: `${a.fmt(v * 0.227125)} m³/h` },
        { label: 'Density', value: sg, unit: 'g/cm³', sub: `${a.fmt(sg * 62.428)} lb/ft³` },
      ], note: 'Q = ṁ / ρ. A Coriolis meter measures mass flow and density directly.' };
    }
  },

  caltable: {
    label: 'Cal Table / Error', glyph: 'cal', mode: 'calc',
    models: [['','any 4–20 mA tx']],
    fields: [
      { id: 'lrv', label: 'Value @ 4 mA', ph: '0', def: '0', neg: true },
      { id: 'urv', label: 'Value @ 20 mA', ph: '100', def: '100', neg: true },
      { id: 'pt', label: 'Test point', unit: '%', ph: 'optional' },
      { id: 'meas', label: 'Measured', unit: 'mA', ph: 'optional' },
    ],
    compute(a) {
      let lrv = a.n('lrv'); if (!isFinite(lrv)) lrv = 0;
      let urv = a.n('urv'); if (!isFinite(urv)) urv = 100;
      const pt = a.n('pt'), meas = a.n('meas');
      if (isFinite(pt) && isFinite(meas)) {
        const ideal = 4 + pt / 100 * 16;
        const errMA = meas - ideal;
        return { rows: [
          { label: 'Ideal output', value: ideal, unit: 'mA', sub: `at ${a.fmt(pt)}%` },
          { label: 'Measured', value: meas, unit: 'mA' },
          { label: 'Error', value: errMA / 16 * 100, unit: '% span', hi: true, sub: `${a.fmt(errMA)} mA` },
        ] };
      }
      const rows = [0, 25, 50, 75, 100].map(p => {
        const mA = 4 + p / 100 * 16;
        const val = lrv + p / 100 * (urv - lrv);
        return { label: `${p}%`, value: mA, unit: 'mA', copy: `${a.fmt(mA)} mA`, sub: `${a.fmt(val)} · ${a.fmt(1 + p / 100 * 4)} V` };
      });
      return { rows, note: 'Enter a test % and measured mA to get as-found % of span error.' };
    }
  },

  zn: {
    label: 'PID Tuning (Z-N)', glyph: 'PID', mode: 'calc',
    fields: [
      { id: 'Ku', label: 'Ultimate gain Ku', ph: '10' },
      { id: 'Pu', label: 'Ultimate period Pu', unit: 's', ph: '4' },
    ],
    compute(a) {
      const Ku = a.n('Ku'), Pu = a.n('Pu');
      if (!isFinite(Ku) || !isFinite(Pu)) return { note: 'Enter the ultimate gain Ku and ultimate period Pu (from a sustained oscillation).' };
      return { rows: [
        { label: 'P · Kp', value: 0.5 * Ku, unit: '' },
        { label: 'PI · Kp', value: 0.45 * Ku, unit: '' },
        { label: 'PI · Ti', value: Pu / 1.2, unit: 's' },
        { label: 'PID · Kp', value: 0.6 * Ku, unit: '', hi: true },
        { label: 'PID · Ti', value: Pu / 2, unit: 's', hi: true },
        { label: 'PID · Td', value: Pu / 8, unit: 's', hi: true },
      ], note: 'Ziegler–Nichols closed-loop (ultimate) method. Expect ~25% overshoot — detune for tighter loops.' };
    }
  },

  drumlevel: {
    label: 'Steam Drum Level', glyph: 'SD', mode: 'calc',
    models: [['Rosemount','3051 DP + wet leg'],['Honeywell','ST3000 DP + wet leg']],
    fields: [
      { id: 'L', label: 'Level span', section: 'Geometry · in', ph: '24' },
      { id: 'Hl', label: 'Lower tap ht', section: 'Geometry · in', ph: '480' },
      { id: 'SGref', label: 'Wet leg', section: 'Density · SG', ph: '1.0', def: '1.0' },
      { id: 'SGw', label: 'Sat. water', section: 'Density · SG', ph: '1.0', def: '1.0' },
      { id: 'SGs', label: 'Sat. steam', section: 'Density · SG', ph: '0', def: '0' },
      { id: 'plc0', label: '@ 4 mA', section: 'PLC range · in', ph: '−½ span', neg: true },
      { id: 'plc100', label: '@ 20 mA', section: 'PLC range · in', ph: '+½ span', neg: true },
      { id: 'plcq', label: 'reading', section: 'PLC range · in', ph: 'optional', neg: true },
    ],
    // Wet reference leg on HP side, variable (water) leg on LP side → reverse acting.
    // DP(inH2O) = Hl·(SGref−SGw) + L·(SGref−SGs) − h·(SGw−SGs), h = level above lower tap.
    compute(a) {
      const L = a.n('L'), Hl = a.n('Hl');
      let SGref = a.n('SGref'); if (!isFinite(SGref)) SGref = 1;
      let SGw = a.n('SGw'); if (!isFinite(SGw)) SGw = 1;
      let SGs = a.n('SGs'); if (!isFinite(SGs)) SGs = 0;
      if (!isFinite(L) || L <= 0 || !isFinite(Hl)) return { note: 'Enter the level span and lower-tap height above the transmitter.' };
      const dpSpan = L * (SGw - SGs);
      const dpLow = Hl * (SGref - SGw) + L * (SGref - SGs);   // 0% level, max DP
      const dpHigh = (Hl + L) * (SGref - SGw);                // 100% level, min DP
      let p0 = a.n('plc0'); if (!isFinite(p0)) p0 = -L / 2;    // PLC range defaults: 0 in = centerline
      let p100 = a.n('plc100'); if (!isFinite(p100)) p100 = L / 2;
      const q = a.n('plcq');
      const rows = [
        { label: 'DP span (instrument)', value: dpSpan, unit: 'inH₂O', hi: !isFinite(q), sub: 'L·(SGw − SGs)' },
        { label: '4 mA · 0% low', value: p0, unit: 'in', sub: `PLC · ${a.fmt(dpLow)} inH₂O` },
        { label: '20 mA · 100% high', value: p100, unit: 'in', sub: `PLC · ${a.fmt(dpHigh)} inH₂O` },
      ];
      if (isFinite(q)) {
        const denom = (p100 - p0) || 1;
        const pct = (q - p0) / denom * 100;
        const mA = 4 + pct / 100 * 16;
        const dp = dpLow - pct / 100 * dpSpan;
        rows.push({ label: `PLC ${a.fmt(q)} in`, value: mA, unit: 'mA', hi: true, sub: `${a.fmt(pct)}% · ${a.fmt(dp)} inH₂O` });
      }
      return { rows, note: 'Reverse acting (4 mA = low). PLC reads inches of level, instrument reads inH₂O of DP — same 0–100%, different scales. 0 in = centerline = 50% = 12 mA.' };
    },
    visual(a) {
      const L = a.n('L'), Hl = a.n('Hl');
      let SGref = a.n('SGref'); if (!isFinite(SGref)) SGref = 1;
      let SGw = a.n('SGw'); if (!isFinite(SGw)) SGw = 1;
      let SGs = a.n('SGs'); if (!isFinite(SGs)) SGs = 0;
      if (!isFinite(L) || L <= 0 || !isFinite(Hl)) return '';
      const dpSpan = L * (SGw - SGs);
      const dpLow = Hl * (SGref - SGw) + L * (SGref - SGs);
      let p0 = a.n('plc0'); if (!isFinite(p0)) p0 = -L / 2;
      let p100 = a.n('plc100'); if (!isFinite(p100)) p100 = L / 2;
      const span = (p100 - p0) || 1;
      const q = a.n('plcq');
      const hasQ = isFinite(q);
      const nwlPct = (0 - p0) / span * 100;                 // where 0 in (NWL) sits in the span
      const pct = hasQ ? (q - p0) / span * 100 : nwlPct;    // default: show water at NWL
      const clamp = x => Math.max(0, Math.min(100, x));
      const top = 46, bot = 104;
      const wy = (bot - clamp(pct) / 100 * (bot - top)).toFixed(1);
      const nwly = (bot - clamp(nwlPct) / 100 * (bot - top)).toFixed(1);
      const dp = dpLow - pct / 100 * dpSpan, mA = 4 + pct / 100 * 16;
      const f = x => a.fmt(x);
      const devTxt = hasQ ? (f(q) + '″ ' + (q >= 0 ? 'above' : 'below') + ' NWL') : 'at NWL · 0″';
      return `<svg viewBox="0 0 300 348" width="100%" font-family="Archivo,system-ui,sans-serif">
        <defs><clipPath id="drumclip"><rect x="97" y="33" width="166" height="86" rx="21"/></clipPath></defs>
        <rect x="96" y="32" width="168" height="88" rx="22" fill="#15181c" stroke="#9ea3ad" stroke-width="1.5"/>
        <rect x="97" y="${wy}" width="166" height="${(119 - wy).toFixed(1)}" fill="#2f6d8f" opacity="0.6" clip-path="url(#drumclip)"/>
        <line x1="97" y1="${wy}" x2="263" y2="${wy}" stroke="#7cc6e8" stroke-width="2"/>
        <line x1="246" y1="46" x2="262" y2="46" stroke="#6b7079" stroke-width="1"/>
        <line x1="246" y1="104" x2="262" y2="104" stroke="#6b7079" stroke-width="1"/>
        <text x="244" y="44" text-anchor="end" fill="#9ea3ad" font-size="9">${f(p100)}″</text>
        <text x="244" y="52" text-anchor="end" fill="#6b7079" font-size="7">100%</text>
        <text x="244" y="103" text-anchor="end" fill="#9ea3ad" font-size="9">${f(p0)}″</text>
        <text x="244" y="111" text-anchor="end" fill="#6b7079" font-size="7">0%</text>
        <line x1="97" y1="${nwly}" x2="263" y2="${nwly}" stroke="#e8b657" stroke-width="1.3" stroke-dasharray="5 3"/>
        <text x="101" y="${(nwly - 3).toFixed(1)}" fill="#e8b657" font-size="9" font-weight="700">NWL 0″</text>
        <text x="180" y="44" text-anchor="middle" fill="#9ea3ad" font-size="9" letter-spacing="1">STEAM</text>
        <text x="180" y="116" text-anchor="middle" fill="#cfe6f2" font-size="9" letter-spacing="1">WATER</text>
        <text x="180" y="131" text-anchor="middle" fill="#6b7079" font-size="8">reverse · PLC = ± from NWL</text>
        <path d="M96 50 H72 V296" fill="none" stroke="#8a9099" stroke-width="3"/>
        <path d="M96 106 H126 V296" fill="none" stroke="#8a9099" stroke-width="3"/>
        <circle cx="72" cy="60" r="3" fill="#7cc6e8"/>
        <rect x="66" y="190" width="12" height="18" fill="#141619"/>
        <path d="M64 207 l16 -7 M64 199 l16 -7" stroke="#9ea3ad" stroke-width="1.2"/>
        <rect x="120" y="190" width="12" height="18" fill="#141619"/>
        <path d="M118 207 l16 -7 M118 199 l16 -7" stroke="#9ea3ad" stroke-width="1.2"/>
        <text x="44" y="160" fill="#9ea3ad" font-size="9" transform="rotate(-90 44 160)" text-anchor="middle">wet leg · HP</text>
        <text x="150" y="158" fill="#9ea3ad" font-size="9" transform="rotate(-90 150 158)" text-anchor="middle">variable leg · LP</text>
        <text x="272" y="80" fill="#6b7079" font-size="9" transform="rotate(-90 272 80)" text-anchor="middle">span ${f(L)}″</text>
        <text x="165" y="232" fill="#6b7079" font-size="9">Hl ${f(Hl)}″</text>
        <rect x="58" y="296" width="100" height="34" rx="6" fill="#23262d" stroke="#e8b657" stroke-width="1.5"/>
        <text x="108" y="312" text-anchor="middle" fill="#e8b657" font-size="11" font-weight="700">DP CELL</text>
        <text x="108" y="324" text-anchor="middle" fill="#6b7079" font-size="8">grade</text>
        <text x="72" y="293" text-anchor="middle" fill="#e06c5a" font-size="10" font-weight="700">H</text>
        <text x="126" y="293" text-anchor="middle" fill="#7cc6e8" font-size="10" font-weight="700">L</text>
        <line x1="30" y1="336" x2="250" y2="336" stroke="#6b7079" stroke-width="1" stroke-dasharray="2 3"/>
        <text x="175" y="305" fill="#eef0f2" font-size="13" font-weight="600">${f(mA)} mA</text>
        <text x="175" y="319" fill="#9ea3ad" font-size="10">${f(pct)}% · ${f(dp)} inH₂O</text>
        <text x="175" y="331" fill="#e8b657" font-size="9">${devTxt}</text>
      </svg>`;
    }
  },

  lvlmap: {
    label: 'Range Map', glyph: '⇄', mode: 'calc',
    models: [['Rosemount','3051 · 5408 · 5300'],['Honeywell','ST3000']],
    fields: [
      { id: 'iLo', label: '@ 4 mA', section: 'Instrument range · inH₂O', ph: '0', def: '0', neg: true },
      { id: 'iHi', label: '@ 20 mA', section: 'Instrument range · inH₂O', ph: '30', neg: true },
      { id: 'pLo', label: '@ 4 mA', section: 'PLC range · in', ph: '-2', neg: true },
      { id: 'pHi', label: '@ 20 mA', section: 'PLC range · in', ph: '8', neg: true },
      { id: 'mA', label: 'mA', section: 'Convert · enter one', ph: 'query' },
      { id: 'iv', label: 'instrument', section: 'Convert · enter one', ph: 'inH₂O', neg: true },
      { id: 'pv', label: 'PLC', section: 'Convert · enter one', ph: 'in', neg: true },
    ],
    compute(a) {
      const iLo = a.n('iLo'), iHi = a.n('iHi'), pLo = a.n('pLo'), pHi = a.n('pHi');
      if (![iLo, iHi, pLo, pHi].every(isFinite)) return { note: 'Enter both ranges — instrument (inH₂O) and PLC (in) at 4 mA and 20 mA.' };
      const mAq = a.n('mA'), iv = a.n('iv'), pv = a.n('pv');
      let pct;
      if (isFinite(mAq)) pct = (mAq - 4) / 16 * 100;
      else if (isFinite(iv)) pct = (iv - iLo) / ((iHi - iLo) || 1) * 100;
      else if (isFinite(pv)) pct = (pv - pLo) / ((pHi - pLo) || 1) * 100;
      const rows = [
        { label: '4 mA · 0%', value: iLo, unit: 'inH₂O', sub: `PLC ${a.fmt(pLo)} in` },
        { label: '20 mA · 100%', value: iHi, unit: 'inH₂O', sub: `PLC ${a.fmt(pHi)} in` },
      ];
      if (isFinite(pct)) {
        rows.push({ label: 'Signal', value: 4 + pct / 100 * 16, unit: 'mA', hi: true, sub: `${a.fmt(pct)}%` });
        rows.push({ label: 'Instrument', value: iLo + pct / 100 * (iHi - iLo), unit: 'inH₂O' });
        rows.push({ label: 'PLC', value: pLo + pct / 100 * (pHi - pLo), unit: 'in' });
      }
      return { rows, note: 'Maps 4–20 mA between the instrument and PLC scales. Enter an mA, an inH₂O value, or a PLC value.' };
    }
  },

  mascale: {
    label: '4-20 mA Scale', glyph: 'I/O', mode: 'calc',
    models: [['Rosemount','3051 · 5408'],['Honeywell','ST3000']],
    fields: [
      { id: 'lrv', label: '@ 4 mA', section: 'Engineering range', ph: '0', def: '0', neg: true },
      { id: 'urv', label: '@ 20 mA', section: 'Engineering range', ph: '100', def: '100', neg: true },
      { id: 'mA', label: 'mA', section: 'Convert · enter one', ph: 'enter one', neg: true },
      { id: 'ev', label: 'value', section: 'Convert · enter one', ph: 'enter one', neg: true },
    ],
    compute(a) {
      let lrv = a.n('lrv'); if (!isFinite(lrv)) lrv = 0;
      let urv = a.n('urv'); if (!isFinite(urv)) urv = 100;
      const span = urv - lrv;
      const mA = a.n('mA'), ev = a.n('ev');
      let pct = NaN;
      if (isFinite(mA)) pct = (mA - 4) / 16 * 100;
      else if (isFinite(ev)) pct = (ev - lrv) / (span || 1) * 100;
      if (isFinite(pct)) {
        return { rows: [
          { label: 'Signal', value: 4 + pct / 100 * 16, unit: 'mA', hi: true },
          { label: 'Engineering value', value: lrv + pct / 100 * span, unit: '' },
          { label: '% of span', value: pct, unit: '%' },
        ], note: `4 mA = ${a.fmt(lrv)} · 20 mA = ${a.fmt(urv)}` };
      }
      // No entry → show the scaling chart for the range.
      const rows = [0, 25, 50, 75, 100].map(p => ({
        label: `${p}%`, value: 4 + p / 100 * 16, unit: 'mA',
        copy: `${a.fmt(4 + p / 100 * 16)} mA`, sub: `${a.fmt(lrv + p / 100 * span)}`,
      }));
      return { rows, note: 'Enter an mA or an engineering value to convert either direction.' };
    }
  },

  ne43: {
    label: 'NAMUR NE43', glyph: 'NE', mode: 'calc',
    models: [['Rosemount','3051 · 644 · 5408'],['Honeywell','ST3000 · STT3000']],
    fields: [
      { id: 'mA', label: 'Loop current', unit: 'mA', ph: '12' },
      { id: 'lo', label: 'Low trip', unit: 'mA', ph: '3.8', def: '3.8' },
      { id: 'hi', label: 'High trip', unit: 'mA', ph: '20.8', def: '20.8' },
    ],
    compute(a) {
      const mA = a.n('mA');
      let lo = a.n('lo'); if (!isFinite(lo)) lo = 3.8;
      let hi = a.n('hi'); if (!isFinite(hi)) hi = 20.8;
      if (!isFinite(mA)) return { note: 'Enter the loop current (mA) to check it against the interlock window.' };
      const pct = (mA - 4) / 16 * 100;
      const status = mA < lo ? '✕ Under-range — interlock drops'
                   : mA > hi ? '✕ Over-range — interlock drops'
                   : (mA < 3.8 || mA > 20.5) ? '△ Saturated (NE43 edge)'
                   : '✓ Valid signal';
      return { rows: [
        { label: status, value: mA, unit: 'mA', hi: true, sub: `${a.fmt(pct)}% of span` },
        { label: 'Margin to low trip', value: mA - lo, unit: 'mA', sub: `drops < ${a.fmt(lo)} mA` },
        { label: 'Margin to high trip', value: hi - mA, unit: 'mA', sub: `drops > ${a.fmt(hi)} mA` },
      ], note: 'NE43: 4–20 mA live, 3.8–20.5 usable, ≤3.6 or ≥21.0 = fault (open/short/off-scale). Outside the trip window the critical-AI interlock blocks start.' };
    }
  },

  satsteam: {
    label: 'Sat. Steam', glyph: 'St', mode: 'calc',
    // [psia, Tsat °F, ρ_water lb/ft³, ρ_steam lb/ft³] — approx ASME saturated values.
    _t: [[14.696,212.0,59.81,0.0373],[30,250.3,58.82,0.0727],[50,281.0,57.90,0.1174],[75,307.6,57.05,0.1719],[100,327.8,56.37,0.2256],[150,358.4,55.28,0.3318],[200,381.8,54.38,0.4371],[250,401.0,53.62,0.5425],[300,417.4,52.91,0.6482],[400,444.6,51.71,0.8613],[500,467.0,50.63,1.0779],[600,486.2,49.68,1.2990],[700,503.1,48.78,1.5253],[800,518.2,47.92,1.7575],[900,532.0,47.10,1.9964],[1000,544.6,46.32,2.2427],[1200,567.2,44.80,2.760],[1500,596.2,42.63,3.612],[2000,635.8,38.99,5.319]],
    fields: [ { id: 'P', label: 'Pressure', unit: 'psig', section: 'Drum / line', ph: '150' } ],
    compute(a) {
      const Pg = a.n('P'); if (!isFinite(Pg)) return { note: 'Enter drum / line pressure (psig).' };
      const P = Pg + 14.696, t = this._t;
      if (P < t[0][0] || P > t[t.length - 1][0]) return { note: `Pressure out of table range (${a.fmt(t[0][0] - 14.7)}–${a.fmt(t[t.length - 1][0] - 14.7)} psig).` };
      let i = 0; while (i < t.length - 1 && t[i + 1][0] < P) i++;
      const A = t[i], B = t[Math.min(i + 1, t.length - 1)];
      const r = B[0] === A[0] ? 0 : (P - A[0]) / (B[0] - A[0]);
      const Tsat = A[1] + r * (B[1] - A[1]), rf = A[2] + r * (B[2] - A[2]), rg = A[3] + r * (B[3] - A[3]);
      return { rows: [
        { label: 'Sat. temperature', value: Tsat, unit: '°F', hi: true, sub: `${a.fmt((Tsat - 32) * 5 / 9)} °C` },
        { label: 'Water density', value: rf, unit: 'lb/ft³', sub: `SG ${a.fmt(rf / 62.4)}` },
        { label: 'Steam density', value: rg, unit: 'lb/ft³', sub: `SG ${a.fmt(rg / 62.4)}` },
      ], note: 'Approx. saturated-steam values — use the water/steam SG in Steam Drum Level. Verify vs official steam tables.' };
    }
  },

  pipesch: {
    label: 'Pipe Schedule', glyph: 'NPS', mode: 'calc',
    _od: { '0.5':0.840,'0.75':1.050,'1':1.315,'1.25':1.660,'1.5':1.900,'2':2.375,'2.5':2.875,'3':3.500,'4':4.500,'6':6.625,'8':8.625 },
    _w40: { '0.5':0.109,'0.75':0.113,'1':0.133,'1.25':0.140,'1.5':0.145,'2':0.154,'2.5':0.203,'3':0.216,'4':0.237,'6':0.280,'8':0.322 },
    _w80: { '0.5':0.147,'0.75':0.154,'1':0.179,'1.25':0.191,'1.5':0.200,'2':0.218,'2.5':0.276,'3':0.300,'4':0.337,'6':0.432,'8':0.500 },
    fields: [
      { id: 'nps', label: 'NPS', type: 'select', def: '1', options: [{v:'0.5',t:'½"'},{v:'0.75',t:'¾"'},{v:'1',t:'1"'},{v:'1.25',t:'1¼"'},{v:'1.5',t:'1½"'},{v:'2',t:'2"'},{v:'2.5',t:'2½"'},{v:'3',t:'3"'},{v:'4',t:'4"'},{v:'6',t:'6"'},{v:'8',t:'8"'}] },
      { id: 'sch', label: 'Schedule', type: 'select', def: '40', options: [{v:'40',t:'Sch 40'},{v:'80',t:'Sch 80'}] },
    ],
    compute(a) {
      const nps = a.s('nps'), sch = a.s('sch');
      const od = this._od[nps], wall = (sch === '80' ? this._w80 : this._w40)[nps];
      if (od == null || wall == null) return { note: 'Pick a pipe size and schedule.' };
      const id = od - 2 * wall, area = Math.PI / 4 * id * id;
      return { rows: [
        { label: 'Inside dia', value: id, unit: 'in', hi: true, sub: `OD ${a.fmt(od)} · wall ${a.fmt(wall)}` },
        { label: 'Flow area', value: area, unit: 'in²', sub: `${a.fmt(area / 144)} ft²` },
      ], note: 'ASME B36.10 steel pipe. Use this ID in Pipe Flow.' };
    }
  },

  ampacity: {
    label: 'NEC Ampacity', glyph: 'A', mode: 'calc',
    _cu: { '14':20,'12':25,'10':35,'8':50,'6':65,'4':85,'3':100,'2':115,'1':130,'1/0':150,'2/0':175,'3/0':200,'4/0':230,'250':255,'300':285,'350':310,'400':335,'500':380 },
    _al: { '12':20,'10':30,'8':40,'6':50,'4':65,'3':75,'2':90,'1':100,'1/0':120,'2/0':135,'3/0':155,'4/0':180,'250':205,'300':230,'350':250,'400':270,'500':310 },
    _sc: { '14':15,'12':20,'10':30 },
    fields: [
      { id: 'mat', label: 'Conductor', type: 'select', def: 'cu', options: [{v:'cu',t:'Copper'},{v:'al',t:'Aluminum'}] },
      { id: 'size', label: 'Wire size', type: 'select', def: '12', options: [{v:'14',t:'14 AWG'},{v:'12',t:'12 AWG'},{v:'10',t:'10 AWG'},{v:'8',t:'8 AWG'},{v:'6',t:'6 AWG'},{v:'4',t:'4 AWG'},{v:'3',t:'3 AWG'},{v:'2',t:'2 AWG'},{v:'1',t:'1 AWG'},{v:'1/0',t:'1/0'},{v:'2/0',t:'2/0'},{v:'3/0',t:'3/0'},{v:'4/0',t:'4/0'},{v:'250',t:'250 kcmil'},{v:'300',t:'300 kcmil'},{v:'350',t:'350 kcmil'},{v:'400',t:'400 kcmil'},{v:'500',t:'500 kcmil'}] },
    ],
    compute(a) {
      const mat = a.s('mat'), size = a.s('size');
      const amp = (mat === 'al' ? this._al : this._cu)[size];
      if (amp == null) return { note: 'That size isn’t listed for aluminum — pick 12 AWG or larger.' };
      const rows = [{ label: 'Ampacity (75 °C)', value: amp, unit: 'A', hi: true }];
      if (mat === 'cu' && this._sc[size]) rows.push({ label: 'Max breaker', value: this._sc[size], unit: 'A', sub: 'NEC 240.4(D) small-conductor' });
      return { rows, note: 'NEC 310.16, 75 °C column, ≤3 current-carrying, 30 °C ambient. Apply ambient/fill derates & verify code edition.' };
    }
  },
};
