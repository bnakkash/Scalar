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
      'bbld':  { name: 'Barrel per day (oil)',   sym: 'bbl/d', f: 0.158987294928/86400 },
      'bblh':  { name: 'Barrel per hour (oil)',  sym: 'bbl/h', f: 0.158987294928/3600 },
    }
  },

  length: {
    label: 'Length',
    glyph: 'L',
    base: 'm',
    default: ['in', 'mm'],
    units: {
      m:   { name: 'Meter',       sym: 'm',   f: 1 },
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
      mL:    { name: 'Milliliter',        sym: 'mL',    f: 1e-6 },
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
      mW:   { name: 'Milliwatt',           sym: 'mW',    f: 1e-3 },
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
      kJ:   { name: 'Kilojoule',       sym: 'kJ',    f: 1000 },
      MJ:   { name: 'Megajoule',       sym: 'MJ',    f: 1e6 },
      Wh:   { name: 'Watt-hour',       sym: 'Wh',    f: 3600 },
      kWh:  { name: 'Kilowatt-hour',   sym: 'kWh',   f: 3.6e6 },
      MWh:  { name: 'Megawatt-hour',   sym: 'MWh',   f: 3.6e9 },
      BTU:  { name: 'British thermal unit', sym: 'BTU', f: 1055.05585262 },
      kBTU: { name: 'Thousand BTU',    sym: 'kBTU',  f: 1055055.85262 },
      therm:{ name: 'Therm (US)',      sym: 'therm', f: 1.054804e8 },
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
      kHz: { name: 'Kilohertz',  sym: 'kHz', f: 1000 },
      MHz: { name: 'Megahertz',  sym: 'MHz', f: 1e6 },
      GHz: { name: 'Gigahertz',  sym: 'GHz', f: 1e9 },
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
};
