/*******************************************************************************
 * Project                                               _ ____  _     _ _
 *                                                      | / ___|| |   (_) |__
 *                                                   _  | \___ \| |   | | '_ \
 *                                                  | |_| |___) | |___| | |_) |
 *                                                   \___/|____/|_____|_|_.__/
 *
 * Author: Luís Góis
 *
 * This software is licensed as described in the file LICENSE, which
 * you should have received as part of this distribution.
 *
 * You may opt to use, copy, modify, merge, publish, distribute and/or sell
 * copies of the Software, and permit persons to whom the Software is
 * furnished to do so, under the terms of the LICENSE file.
 *
 * This software is distributed on an "AS IS" basis, WITHOUT WARRANTY OF ANY
 * KIND, either express or implied.
 *
 ******************************************************************************/

// Constants {{{

const HORIZONTAL = "horizontal";
const VERTICAL = "vertical";
const DEGREES = 'degrees';
const RADIANS = 'radians';
const PI = Math.PI;
const Tau = 2 * Math.PI;
Math.Tau = 2 * Math.PI;
const LEFT_ARROW = 37;
const UP_ARROW = 38;
const RIGHT_ARROW = 39;
const DOWN_ARROW = 40;
const SPACE = 32;
const mouse = {
  x: 0,
  y: 0
};


// }}}

// Color {{{

// const rgb = (...args) => 'rgba(' + (args[0] instanceof Array ? args[0] : Array(4).fill(255)).map((cor, i) => parseInt(args[0] instanceof Array ? args[0][i] : args[i] || (i === 3 ? 1 : args[0] || 0))).toString() + ')';

const rgb = (...args) => 'rgba(' + Array(3).fill().map((cor, i) => args[0] instanceof Array ? typeof args[0][i] === 'number' ? constrain(parseInt(args[0][i]), 0, 255) : 0 : typeof args[i] === 'number' ? constrain(parseInt(args[i]), 0, 255) : 0).concat(args[0] instanceof Array ? typeof args[0][3] === 'number' ? constrain(parseFloat(args[0][3]), 0, 1) : 1 : typeof args[3] === 'number' ? constrain(parseFloat(args[3]), 0, 1) : 1).toString() + ')';

const hsl = (hue = 0, saturation = 100, light = 100) => 'hsl(' + hue + ',' + saturation + '%,' + light + '%' + ')'

const rgbToHex = (r, g, b) => '#' + toHex(r) + toHex(g) + toHex(b);

const toHex = function(n) {
  n = parseInt(n, 10);
  if (isNaN(n)) return "00";
  n = Math.max(0, Math.min(n, 255));
  return "0123456789ABCDEF".charAt((n - n % 16) / 16) +
    "0123456789ABCDEF".charAt(n % 16);
}

const hexToRgb = function(hex = '000000') {
  let rgbColors = [];
  if (hex.charAt(0) == '#') hex = hex.substring(1, hex.length);
  if (hex.length != 6) return alert("Please enter 6 digits color code !");
  for (let i = 0; i < 3; i++) rgbColors[i] = hex.substring(i * 2, i * 2 + 2);
  rgbColors = rgbColors.map(c => parseInt(c, 16));
  return 'rgb(' + rgbColors.toString() + ')';
}

const lerpColor = function(c1, c2, amt) {

};

class Color {
  constructor(r, g, b, a = 255) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }
}

// }}}

// Maths {{{

//natives
// Math.randomNative = Math.random;
Math.roundNative = Math.round;

Math.fPart = number => Number('0.' + `${number}`.split('.')[1]) * Math.pow(-1, Number(number < 0)) || 0;

Math.factorial = number => number > 1 ? number * Math.factorial(number - 1) : 1;

Math.round = (number, casas = 0) => Math.roundNative(number * Math.pow(10, casas)) / Math.pow(10, casas);

Math.sq = number => Math.pow(number, 2);

Math.ln = Math.log;

Math.logbase = (base, number) => Math.log10(number) / Math.log10(base);

Math.combinations = (n, k) => formarTriangulo(n)[n][k];

Math.permutations = Math.factorial;

Math.arranjosSimples = (n, k) => Math.factorial(n) / Math.factorial(n - k);

Math.arranjosCompletos = Math.pow;

Math.reduceAngle = (angle, system = RADIANS) => system == RADIANS ? 2 * Math.PI * (Math.fPart(angle / 2 / Math.PI) + Number(angle < 0)) : Math.degrees(2 * Math.PI * (Math.fPart(angle / 2 / Math.PI) + Number(angle < 0)));

Math.convertAngle = (angle, system = DEGREES) => angle * Math.pow(180 / Math.PI, Math.pow(-1, Number(system == DEGREES) + 1));

Math.lim = (f, x, side = 0) => {
  let c = 5;
  let h = Math.pow(10, -c - 1);
  let limP = (f(x + h) - f(x)) / h;
  let limN = (f(x - h) - f(x)) / -h;
  switch (side) {
    case 0:
      if (Math.arredondar(limP, c) == Math.arredondar(limN, c)) return Math.arredondar(limP, c)
      else return undefined;
      break;
    case 1:
      return limP;
      break;
    case -1:
      return limN;
      break;
  }
}

const constrain = function(vari, min, max) {
  if (vari < min) return min;
  if (vari > max) return max;
  return vari;
}

const map = function(n, start1, stop1, start2, stop2, withinBounds) {
  let newval = ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
  if (!withinBounds) return newval;
  if (start2 < stop2) return this.constrain(newval, start2, stop2);
  else return this.constrain(newval, stop2, start2);
};

const mean = list => list.reduce((a, b) => a + b) / list.length;

Array.prototype.mean = function() {
  return this.reduce((a, b) => a + b) / this.length;
};

Math.mmc = function(num1, num2) {
  let resto, a, b;
  a = num1;
  b = num2;
  do {
    resto = a % b;
    a = b;
    b = resto;
  } while (resto != 0);
  return (num1 * num2) / a;
}

Math.mdc = function(num1, num2) {
  let resto;
  do {
    resto = num1 % num2;
    num1 = num2;
    num2 = resto;
  } while (resto != 0);
  return num1;
}

Math.dist = (...args) => Math.sqrt([0, 0, 0].map((value, i) => Math.pow(args[i + 2 + (args.length == 6)] - args[i], 2) || 0).reduce((a, b) => a + b));

Math.distSq = (...args) => [0, 0, 0].map((value, i) => Math.pow(args[i + 2 + (args.length == 6)] - args[i], 2) || 0).reduce((a, b) => a + b);

Math.isPrime = function(n) {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 == 0 || n % 3 == 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i == 0 || n % (i + 2) == 0) return false;
  }
  return true;
};

Math.isPerfectNumber = (number, mult = 1) => sumatorio(divisorsList(number)) === mult * number;

Math.isAbundantNumber = number => sumatorio(divisorsList(number)) - number > number;

const primeFactorization = function(number) {
  let list = [];
  let p = 2;
  do {
    if (Math.isPrime(p) && number % p == 0) {
      number /= p;
      list.push(p);
      p = 2;
    } else {
      p++;
    };
  } while (number > 1);
  return list;
};

const random = function() {
  switch (typeof arguments[0]) {
    case 'number':
      let min = (arguments.length == 1) ? 0 : arguments[0];
      let max = (arguments.length == 1) ? arguments[0] : arguments[1];
      return Math.random() * (max - min) + min;
      break;
    case 'object':
      return arguments[0][Math.floor(Math.random() * arguments[0].length)];
      break;
    default:
      return Math.random();
  }
};

// const randomGaussian = function(mean, sd) {
//   var y1, x1, x2, w;
//   if (previous) {
//     y1 = y2;
//     previous = false;
//   } else {
//     do {
//       x1 = this.random(2) - 1;
//       x2 = this.random(2) - 1;
//       w = x1 * x1 + x2 * x2;
//     } while (w >= 1);
//     w = Math.sqrt((-2 * Math.log(w)) / w);
//     y1 = x1 * w;
//     y2 = x2 * w;
//     previous = true;
//   }
//   var m = mean || 0;
//   var s = sd || 1;
//   return y1 * s + m;
// };

Math.randInt = function() {
  let min = (arguments.length == 1) ? 0 : arguments[0];
  let max = arguments[arguments.length - 1];
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const divisorsList = function(number) {
  let list = [];
  for (let d = 1; d <= number; d++) number % d == 0 ? list.push(d) : 0;
  return list;
}

const getPerfectList = function(nP, mult = 1) {
  let pass = true;
  if (nP > 4) {
    pass = window.confirm('Are You Sure?');
  }
  if (pass) {
    let list = [];
    let n = 6;
    do {
      if (Math.isPerfectNumber(n, mult)) list.push(n);
      n++;
    } while (list.length < nP && n < Infinity);
    return list;
  };
}

const getFermatList = function(nP) {
  let list = [];
  let n = 0;
  do {
    list.push(Math.pow(2, Math.pow(2, n)) + 1);
    n++;
  } while (list.length < nP);
  return list;
}

const getAbundantList = function(nP) {
  let list = [];
  let n = 12;
  do {
    if (Math.isAbundantNumber(n)) list.push(n);
    n++;
  } while (list.length < nP);
  return list;
}


const getPrimesList = function(nP) {
  let n = 3;
  let primes = [2];
  do {
    Math.isPrime(n) ? primes.push((n += 2) - 2) : n += 2;
  } while (primes.length < nP);
  primes.length = nP;
  return primes;
}

const CollatzConjecture = function(n) {
  let c = [n];
  if (n < 1 || parseInt(n) !== n) return;
  while (n !== 1) c.push(n % 2 === 0 ? n *= 0.5 : n = 3 * n + 1);
  return c;
}

const FibonacciSequence = function(end = 10) {
  let seq = [1];
  let index = 1;
  do {
    seq[index] = (seq[index - 1] || 0) + (seq[index - 2] || 0);
    index++;
  } while (index < end && index < 1476);
  return seq;
}

const TriangularNumbers = function(end = 10) {
  let seq = [];
  for (let n = 1; n < end + 1; n++) seq.push(n * (n + 1) / 2);
  return seq;
}

const formarTriangulo = function(max, funct) {
  let tri = [];
  let array;
  for (let i = 0; i <= max; i++) {
    array = [];
    for (let j = 0; j < i + 1; j++) {
      if (i == 0 && j == 0) {
        array.push(1)
      } else {
        let value1 = tri[i - 1][j - 1];
        let value2 = tri[i - 1][j];
        if (value1 == undefined) value1 = 0;
        if (value2 == undefined) value2 = 0;
        array.push(value1 + value2);
      }
    }
    tri.push(array);
  }
  if (funct) {
    funct(tri);
  }
  return tri;
}

const tabelaTrigonometrica = function() {
  let tab = [
    [" ", 30, 45, 60],
    ["sen", "1/2", "sqrt(2)/2", "sqrt(3)/2"],
    ["cos", "sqrt(3)/2", "sqrt(2)/2", "1/2"],
    ["tan", "sqrt(3)/2", 1, "sqrt(3)"]
  ];
  console.table([
    [" ", 30, 45, 60],
    ["sen", "1/2", "sqrt(2)/2", "sqrt(3)/2"],
    ["cos", "sqrt(3)/2", "sqrt(2)/2", "1/2"],
    ["tan", "sqrt(3)/2", 1, "sqrt(3)"]
  ]);
  return [
    [" ", 30, 45, 60],
    ["sen", 1 / 2, Math.sqrt(2) / 2, Math.sqrt(3) / 2],
    ["cos", Math.sqrt(3) / 2, Math.sqrt(2) / 2, 1 / 2],
    ["tan", Math.sqrt(3) / 2, 1, Math.sqrt(3)]
  ];
};

const checkWithin = (variable, minimo, maximo) => variable >= minimo && variable <= maximo;

// }}}

// LOGIC {{{

const XOR = (state1, state2) => Boolean(state1) !== Boolean(state2);

// }}}

// Strings {{{

const reverseString = str => str.split('').reverse().join('');

String.prototype.reverse = function() {
  return this.split('').reverse().join('');
};

String.prototype.palindrome = function() {
  return this.toLowerCase() === this.toLowerCase().replace(/[\W_]/g, '').split('').reverse().join('');
}

const findLongestWord = str => str.split(/ /g).reduce((a, b) => b.length > a.length ? b : a, '');

String.prototype.findLongestWord = function() {
  return this.split(/ /g).reduce((a, b) => b.length > a.length ? b : a, '');
}

const titleCase = str => str.split(/ /g).map(word => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(' ');

String.prototype.titleCase = function() {
  return this.split(/ /g).map(word => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}

String.prototype.composition = function(delimiter = '') {
  let obj = {};
  this.split(delimiter).forEach(char => obj[char] = obj[char] ? obj[char] + 1 : 1);
  return obj;
}

String.prototype.anagrams = function() {
  console.log(Math.factorial(this.length));
  let ana = [String(this)];
  let strArr = this.split('');
  for (let i = 0; i < this.length; i++) {
    for (let j = 0; j < this.length; j++) {
      if (i === j) continue;
      strArr.swap(i, j);
      ana.push(strArr.join(''));
      strArr.swap(i, j);
    }
  }
  return ana;
}

// }}}

// ARRAYS {{{

const sumatorio = (array, start = typeof this[0] === 'string' ? '' : 0) => array.reduce((a, b) => a + b, start);

const produtorio = (array, start = 1) => array.reduce((a, b) => a * b, start);

Array.prototype.sum = function(start = typeof this[0] === 'string' ? '' : 0) {
  return this.reduce((a, b) => a + b, start);
}

Array.prototype.prod = function(start = 1) {
  return this.reduce((a, b) => a * b, start);
}

Array.prototype.add = function(number) {
  if (number instanceof Array) number = (this.length === number.length) ? number : 0;
  let add = this.map((val, i) => val + (number instanceof Array ? number[i] : number));
  add.forEach((val, i) => this[i] = val);
  return this;
}

Array.prototype.randomize = function(a, b) {
  let c = this.map((e, i) => Math.random() * (b - a) + a);
  this.length = 0;
  this.push.apply(this, c);
  return this;
}

Array.prototype.mult = function(number) {
  if (number instanceof Array) number = (this.length === number.length) ? number : 1;
  let mult = this.map((val, i) => val * (number instanceof Array ? number[i] : number));
  mult.forEach((val, i) => this[i] = val);
  return this;
}

Array.prototype.div = function(number) {
  if (number instanceof Array) number = (this.length === number.length) ? number : 1;
  let div = this.map((val, i) => val / (number instanceof Array ? number[i] : number));
  div.forEach((val, i) => this[i] = val);
  return this;
}

Array.prototype.include = Array.prototype.includes;

const arrayIdentity = (dimensions, number = 1) => new Array(dimensions).fill(number);

Array.prototype.logicValueOfArray = function(logic) {
  if (logic == "&&") return !this.some(val => val == false);
  else if (logic == "||") return this.some(val => val == true);
}

Array.prototype.shuffle = function() {
  let list = [];
  let oldList = this.slice();
  while (oldList.length > 0) list.push(oldList.splice(Math.floor(Math.random() * oldList.length), 1)[0]);
  list.forEach((value, i) => this[i] = value);
  return this;
}

Array.prototype.max = function(index = false, p = '') {
  const t = (a, p) => p == '' ? a : a[p];
  let i1 = 0;
  this.reduce((s, e, i) => {
    t(e, p) > t(s, p) ? i1 = i : i;
    return t(e, p) > t(s, p) ? e : s;
  });
  return index ? i1 : t(this[i1], p);
}

Array.prototype.min = function(index = false, p) {
  let t = (a, p) => (p == '' || a == undefined) ? a : a[p];
  let i1 = 0;
  this.reduce((s, e, i) => {
    i1 = t(e, p) < t(s, p) ? i : i1;
    return t(e, p) < t(s, p) ? e : s;
  });
  return index ? i1 : t(this[i1], p);
}

Array.prototype.findMax = function() {
  return this.reduce((s, e) => e > s ? e : s);
}

Array.prototype.findMin = function() {
  return this.reduce((s, e) => e < s ? e : s);
};

Array.prototype.last = function() {
  return this[this.length - 1];
};

Array.prototype.swap = function(i1, i2) {
  let temp = this[i1];
  this[i1] = this[i2];
  this[i2] = temp;
  return this;
}

Array.prototype.valueOf = Array.prototype.slice;

const chunkArrays = function(arr, size) {
  let groups = [];
  while (arr.length > 0) groups.push(arr.splice(0, size));
  return groups;
}

Array.prototype.chunkArrays = function(size) {
  let groups = [];
  while (this.length > 0) groups.push(this.splice(0, size));
  return groups;
}

const removeFromArray = function(arr) {
  Array.prototype.slice.call(arguments).slice(1).forEach(remove => arr = arr.filter(elem => elem !== remove));
  return arr;
}

Array.prototype.remove = function() {
  let arr = this;
  Array.prototype.slice.call(arguments).forEach(remove => arr = arr.filter(elem => elem !== remove));
  this.splice();
  for (let i = 0; i < arr.length; i++) this[i] = arr[i];
  return arr;
};

const diffArray = (...args) => args.reduce((a, b) => a.concat(b)).filter(num => args.some(arg => arg.indexOf(num) === -1));

Array.prototype.copy = function() {
  return new Array(this.length).fill().map((x, i) => this[i]);
}

// }}}

//VECTOR {{{

const createVector = (x, y, z) => new Vector(x, y, z);

class Vector {

  constructor(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
  }

  static fromAngle(angle) {
    return createVector(Math.round(Math.cos(angle), 15), Math.round(Math.sin(angle), 15));
  }

  static polarToCartesian(r, angle, center = new Vector()) {
    return createVector(center.x + r * Math.cos(angle), center.y + r * Math.sin(angle));
  }

  static add(v1, v2) {
    return createVector(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
  }

  static subtract(v1, v2) {
    return createVector(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
  }

  static copy(v) {
    return createVector(v.x, v.y, v.z);
  }

  copy(v) {
    return createVector(this.x, this.y, this.z);
  }

  add(vec) {
    if (vec instanceof Vector) {
      this.x += vec.x;
      this.y += vec.y;
      this.z += vec.z;
    } else if (typeof vec == 'number') {
      this.x += vec;
      this.y += vec;
      this.z += vec;
    }
    return this;
  }

  static mult(v1, v2) {
    return v1.mag() * v2.mag() * Math.cos(v2.heading() - v1.heading());
  }

  mult(n = 1) {
    this.x *= n;
    this.y *= n;
    this.z *= n;
    return this;
  }

  div(n = 1) {
    this.x /= n;
    this.y /= n;
    this.z /= n;
    return this;
  }

  static random2D() {
    let angle = Math.random() * Math.PI * 2;
    return new Vector(Math.cos(angle), Math.sin(angle), 0);
  }

  static lerp(startV, endV, perc) {
    return createVector(startV.x + (endV.x - startV.x) * perc, startV.y + (endV.y - startV.y) * perc, startV.z + (endV.z - startV.z) * perc);
  }

  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  magSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }

  normalize() {
    return this.magSq() === 0 ? this : this.div(this.mag());
  };

  setMag(n = 1) {
    return this.normalize().mult(n);
  }

  heading(system = RADIANS) {
    let head = Math.atan2(this.y, this.x);
    if (system == DEGREES) head = Math.convertAngle(head, system);
    return head;
  };

  rotate(angle) {
    let head = this.heading();
    let mag = this.mag();
    this.x = mag * Math.cos(head + angle);
    this.y = mag * Math.sin(head + angle);
    return this;
  };

  constrain(max) {
    let mSq = this.magSq();
    if (mSq > max * max) 
      this.mult(max/Math.sqrt(mSq));
    return this;
  };

}

// }}}

// Canvas {{{

//Native functions backup
CanvasRenderingContext2D.prototype.ellipseNative = CanvasRenderingContext2D.prototype.ellipse;
CanvasRenderingContext2D.prototype.arcNative = CanvasRenderingContext2D.prototype.arc;

CanvasRenderingContext2D.prototype.line = function(x0, y0, xf, yf) {
  this.beginPath();
  this.moveTo(x0, y0);
  this.lineTo(xf, yf);
  this.stroke();
  this.closePath();
}


CanvasRenderingContext2D.prototype.ellipse = function(x, y, w, h, fill = true) {
  this.beginPath();
  this.ellipseNative(x, y, w / 2, (h || w) / 2, 0, 0, Math.PI * 2);
  fill ? this.fill() : this.stroke();
  this.closePath();
}

CanvasRenderingContext2D.prototype.arc = function(x, y, r, sAng, eAng, way = false, fill = false) {
  this.beginPath();
  this.arcNative(x, y, r, sAng, eAng, way);
  fill ? this.fill() : this.stroke();
  this.closePath();
}

HTMLCanvasElement.prototype.background = function(cor = 'white') {
  let context = this.getContext('2d');
  context.save();
  context.fillStyle = cor;
  context.fillRect(0, 0, this.width, this.height);
  context.restore();
};

const background = function(canvas) {
  let context = canvas.getContext('2d');
  let cor = arguments.length > 2 ? 'rgba(' + Array(4).fill().map((cor, i) => typeof arguments[i + 1] === 'number' ? arguments[i + 1] : i === 3 ? 1 : 255).toString() + ')' : arguments[1];
  context.save();
  context.fillStyle = cor;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.restore();
}

const graph = function(canvas, f, settings) {
  let context = canvas.getContext('2d');
  let def = {
    minX: -10,
    maxX: 10,
    minY: -10,
    maxY: 10,
    xC1: 0,
    xC2: canvas.width,
    yC1: canvas.height,
    yC2: 0,
    deltaX: 0.1,
    axesOn: true,
    axesColor: 'black',
    graphColor: 'black',
    gridOn: false,
    unitX: 1,
    unitY: 1
  };
  for (let p in def) settings[p] = (settings[p] != undefined) ? settings[p] : def[p];
  let transform = (x, y) => createVector(map(x, settings.minX, settings.maxX, settings.xC1, settings.xC2), map(y, settings.minY, settings.maxY, settings.yC1, settings.yC2));

  if (settings.axesOn) {
    context.strokeStyle = settings.axesColor;
    let origin = transform(0, 0);
    ctx.line(settings.xC1, origin.y, settings.xC2, origin.y);
    ctx.line(origin.x, settings.yC1, origin.x, settings.yC2);
    let info = {
      bounds: [
        [settings.minX, settings.maxX],
        [settings.minY, settings.maxY]
      ],
      units: [settings.unitX, settings.unitY],
      offsets: [settings.yC1 - settings.yC2, settings.xC1 - settings.xC2].map(x => x * 0.01),
      rows: 2,
      cols: 2
    };
    for (let i = 0; i < info.rows; i++) {
      for (let j = 0; j < info.cols; j++) {
        for (let c = info.units[i]; c < Math.abs(info.bounds[i][j]); c += info.units[i]) {
          let d = Math.pow(-1, !j);
          let pos = transform(d * c * Math.pow(-1, i + 1) * !i, d * c * Math.pow(-1, i + 1) * i);
          let p1 = createVector(pos.x * !i + (origin.x - info.offsets[1]) * i, (origin.y - info.offsets[0]) * !i + pos.y * i);
          let p2 = createVector(pos.x * !i + (origin.x + info.offsets[1]) * i, (origin.y + info.offsets[0]) * !i + pos.y * i);
          ctx.line(p1.x, p1.y, p2.x, p2.y);
        }
      }
    };
  }
  context.strokeStyle = settings.graphColor || 'black';
  context.beginPath();
  for (let x = settings.minX; x < settings.maxX; x += settings.deltaX) {
    let p1 = transform(x, f(x));
    let p2 = transform(x + settings.deltaX, f(x + settings.deltaX));
    if (x == settings.minX) {
      context.moveTo(p1.x, p1.y);
    } else {
      context.lineTo(p1.x, p1.y);
    };
    context.lineTo(p2.x, p2.y);
  };
  ctx.stroke();
  context.closePath();
}

// }}}

// Biology {{{

function cruzamento(p1, p2) {
  let pais = {
    p1: p1,
    p2: p2
  };
  let gametas = {
    p1: [],
    p2: []
  };
  for (let parent in gametas) {
    for (let i1 = 0; i1 < 2; i1++) {
      let s2 = '';
      for (let i2 = 2; i2 < pais[parent].length; i2++) {
        s2 = pais[parent].substr(i2, 1);
        gametas[parent].push(pais[parent].substr(i1, 1) + s2);
      }
      if (s2 == '') gametas[parent].push(pais[parent].substr(i1, 1) + s2);
    }
  };
  let filhos = new Matrix(gametas.p1.length, gametas.p2.length, '');
  for (let i = 0; i < gametas.p1.length; i++) {
    for (let j = 0; j < gametas.p2.length; j++) {
      filhos.data[i][j] = gametas.p1[i] + gametas.p2[j];
    }
  }
  filhos.map(e => e.split('').sort((a, b) => (a.toLowerCase() === b.toLowerCase()) ? (a > b ? 1 : -1) : (a.toLowerCase() > b.toLowerCase() ? 1 : -1)).toString().replace(/\,/g, ''));
  filhos.print();
};

// }}}

// Matrix {{{

class Matrix {
  constructor(rows = 1, cols = 1, value = 0) {
    this.rows = rows;
    this.cols = cols;
    this.data = Array(this.rows).fill().map(x => Array(this.cols).fill(value));
  }

  static copy() {
    let m = new Matrix(this.rows, this.cols);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        m.data[i][j] = this.data[i][j];
      }
    }
    return m;
  }

  copy() {
    let m = new Matrix(this.rows, this.cols);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        m.data[i][j] = this.data[i][j];
      }
    }
    return m;
  }

  static fromArray(arr) {
    return new Matrix(arr.length, 1).map((e, i) => arr[i]);
  }

  static subtract(a, b) {
    if (a.rows !== b.rows || a.cols !== b.cols) {
      console.log('Columns and Rows of A must match Columns and Rows of B.');
      return;
    }

    // Return a new Matrix a-b
    return new Matrix(a.rows, a.cols).map((_, i, j) => a.data[i][j] - b.data[i][j]);
  }

  static subMatrix(matrix, i1, j1) {
    if (matrix.rows !== matrix.cols) return console.error('Matrix is not square');
    let subM = new Matrix(matrix.rows - 1, matrix.cols - 1);
    let elems = [];
    matrix.forEach((e, i, j) => (i !== i1 && j !== j1) ? elems.push(e) : e);
    return subM.map((e, i, j) => elems[i * subM.rows + j]);
  }

  static det(M) {
    if (M.rows == 2) return (M.data[0][0] * M.data[1][1]) - (M.data[0][1] * M.data[1][0]);
    let deleteRowAndColumn = function(M, index) {
      let temp = [];
      for (let i = 0; i < M.rows; i++) temp.push(M.data[i].slice(0));
      temp.splice(0, 1);
      for (let i = 0; i < temp.length; i++) temp[i].splice(index, 1);
      return temp;
    }
    let answer = 0;
    for (let i = 0; i < M.rows; i++) {
      answer += Math.pow(-1, i) * M.data[0][i] * Matrix.det(deleteRowAndColumn(M, i));
    }
    return answer;
  }

  toArray() {
    return this.data.reduce((a, row) => a.concat(row));
  }

  static identity(n) {
    return new Matrix(n, n).map((e, i, j) => Number(i === j));
  }

  randomize(min = 0, max = 1) {
    return this.map(e => Math.random() * (max - min) + min);
  }

  randomInt(min = 0, max = 1) {
    return this.map(e => Math.floor(Math.random() * (max - min + 1) + min));
  }

  add(n) {
    if (n instanceof Matrix) {
      if (this.rows !== n.rows || this.cols !== n.cols)
        return console.error('Columns and Rows of A must match Columns and Rows of B.');
      return this.map((e, i, j) => e + n.data[i][j]);
    } else return this.map(e => e + n);
  }

  static transpose(matrix) {
    return new Matrix(matrix.cols, matrix.rows).map((_, i, j) => matrix.data[j][i]);
  }

  static multiply(a, b) {
    // Matrix product
    if (a.cols !== b.rows) return console.log('Columns of A must match rows of B.');

    return new Matrix(a.rows, b.cols).map((e, i, j) => {
      // Dot product of values in col
      let sum = 0;
      for (let k = 0; k < a.cols; k++) sum += a.data[i][k] * b.data[k][j];
      return sum;
    });
  }

  multiply(n) {
    if (n instanceof Matrix) {
      if (this.rows !== n.rows || this.cols !== n.cols) return console.log('Columns and Rows of A must match Columns and Rows of B.');
      // hadamard product
      return this.map((e, i, j) => e * n.data[i][j]);
    } else return this.map(e => e * n); // Scalar product
  }

  map(funk) {
    // Apply a function to every element of matrix
    for (let i = 0; i < this.rows; i++)
      for (let j = 0; j < this.cols; j++)
        this.data[i][j] = funk(this.data[i][j], i, j);
    return this;
  }

  static map(matrix, funk) {
    // Apply a function to every element of matrix
    return new Matrix(matrix.rows, matrix.cols)
      .map((e, i, j) => funk(matrix.data[i][j], i, j));
  }

  mutate(rate = 0.01, min = -0.1, max = 0.1) {
    return this.map(gene => gene + (Math.random() < rate) * (Math.random() * (max - min) + min));
  }

  forEach(funk) {
    this.data.forEach((row, i) => row.forEach((e, j) => funk(e, i, j)));
    return this;
  }

  print(log = undefined) {
    console.table(this.data);
    if (log !== undefined) console.log(log);
    return this;
  }

  serialize() {
    return JSON.stringify(this);
  }

  static deserialize(data) {
    if (typeof data == 'string') {
      data = JSON.parse(data);
    }
    let matrix = new Matrix(data.rows, data.cols);
    matrix.data = data.data;
    return matrix;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Matrix;
}

// }}}

class ActivationFunction {
  constructor(func, dfunc) {
    this.func = func;
    this.dfunc = dfunc;
  }
}

const SIGMOID = new ActivationFunction(x => 1 / (1 + Math.exp(-x)), y => y * (1 - y));

const TANH = new ActivationFunction(x => Math.tanh(x), y => 1 - (y * y));

// Neural Network {{{

class NeuralNetwork {

  constructor() {
    this.nodes = Array.prototype.slice.call(arguments);
    this.weights = [];
    this.bias = [];
    if (this.nodes[0] instanceof NeuralNetwork) {
      let clone = this.nodes[0];
      for (let i = 0; i < clone.weights.length; i++) {
        this.weights[i] = clone.weights[i].copy();
        this.bias[i] = clone.bias[i].copy();
        this.learning_rate = clone.learning_rate;
        this.activation_function = clone.activation_function;
      }
    } else {
      for (let i = 0; i < this.nodes.length - 1; i++) {
        this.weights[i] = new Matrix(this.nodes[i + 1], this.nodes[i]).randomize(-1, 1);
        this.bias[i] = new Matrix(this.nodes[i + 1], 1).randomize(-1, 1);
      };
      this.setActivationFunction();
      this.setLearningRate();
    }
  }

  feedforward(input_array, allInfo = false) {
    let layer = Matrix.fromArray(input_array);
    let info = [layer];
    for (let i = 0; i < this.weights.length; i++) {
      layer = Matrix.multiply(this.weights[i], layer);
      layer.add(this.bias[i]);
      layer.map(this.activation_function.func);
      info.push(layer);
    };
    return allInfo ? info : layer.toArray();
  }

  predict(input_array) {
    return this.feedforward(input_array, false);
  }

  train(inputs, targets) {
    let info = this.feedforward(inputs, true);

    let output = info[info.length - 1];
    let target = Matrix.fromArray(targets);

    //Calculate Error
    let error = Matrix.subtract(target, output);

    for (let i = this.weights.length - 1; i >= 0; i--) {
      //Calculate gradient
      let gradients = Matrix.map(info[i + 1], this.activation_function.dfunc);
      gradients.multiply(error);
      gradients.multiply(this.learning_rate);
      //Calculate Delta
      let deltas = Matrix.multiply(gradients, Matrix.transpose(info[i]));
      //Adjust Weights with deltas
      this.weights[i].add(deltas);
      //Adjust Bias with gradients
      this.bias[i].add(gradients);
      //calculte previous layer's error
      error = Matrix.multiply(Matrix.transpose(this.weights[i]), error);
    }
    return this;
  }

  mutate(funk = x => Math.random() < 0.1 ? Math.random() : x) {
    this.weights = this.weights.map(weight => weight.map(funk));
    this.bias = this.bias.map(bias => bias.map(funk));
    return this;
  }

  setLearningRate(lr = 0.1) {
    this.learning_rate = lr;
  }

  setActivationFunction(func = SIGMOID) {
    this.activation_function = func;
  }

  copy() {
    return new NeuralNetwork(this);
  }

  serialize() {
    return JSON.stringify(this);
  }

  static deserialize(data) {
    if (typeof data == 'string') data = JSON.parse(data);
    return new NeuralNetwork(data);
  }

};

class ToyNeuralNetwork {
  // TODO: document what a, b, c are
  constructor(a, b, c) {
    if (a instanceof ToyNeuralNetwork) {
      this.input_nodes = a.input_nodes;
      this.hidden_nodes = a.hidden_nodes;
      this.output_nodes = a.output_nodes;

      this.weights_ih = a.weights_ih.copy();
      this.weights_ho = a.weights_ho.copy();

      this.bias_h = a.bias_h.copy();
      this.bias_o = a.bias_o.copy();
    } else {
      this.input_nodes = a;
      this.hidden_nodes = b;
      this.output_nodes = c;

      this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
      this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes);
      this.weights_ih.randomize(-1, 1);
      this.weights_ho.randomize(-1, 1);

      this.bias_h = new Matrix(this.hidden_nodes, 1);
      this.bias_o = new Matrix(this.output_nodes, 1);
      this.bias_h.randomize(-1, 1);
      this.bias_o.randomize(-1, 1);
    }

    // TODO: copy these as well
    this.setLearningRate();
    this.setActivationFunction();


  }

  predict(input_array) {

    // Generating the Hidden Outputs
    let inputs = Matrix.fromArray(input_array);
    let hidden = Matrix.multiply(this.weights_ih, inputs);
    hidden.add(this.bias_h);
    // activation function!
    hidden.map(this.activation_function.func);

    // Generating the output's output!
    let output = Matrix.multiply(this.weights_ho, hidden);
    output.add(this.bias_o);
    output.map(this.activation_function.func);
    // Sending back to the caller!
    return output.toArray();
  }

  setLearningRate(learning_rate = 0.1) {
    this.learning_rate = learning_rate;
  }

  setActivationFunction(func = SIGMOID) {
    this.activation_function = func;
  }

  train(input_array, target_array) {
    // Generating the Hidden Outputs
    let inputs = Matrix.fromArray(input_array);
    let hidden = Matrix.multiply(this.weights_ih, inputs);
    hidden.add(this.bias_h);
    // activation function!
    hidden.map(this.activation_function.func);

    // Generating the output's output!
    let outputs = Matrix.multiply(this.weights_ho, hidden);
    outputs.add(this.bias_o);
    outputs.map(this.activation_function.func);

    // Convert array to matrix object
    let targets = Matrix.fromArray(target_array);

    // Calculate the error
    // ERROR = TARGETS - OUTPUTS
    let output_errors = Matrix.subtract(targets, outputs);

    // let gradient = outputs * (1 - outputs);
    // Calculate gradient
    let gradients = Matrix.map(outputs, this.activation_function.dfunc);
    gradients.multiply(output_errors);
    gradients.multiply(this.learning_rate);


    // Calculate deltas
    let hidden_T = Matrix.transpose(hidden);
    let weight_ho_deltas = Matrix.multiply(gradients, hidden_T);

    // Adjust the weights by deltas
    this.weights_ho.add(weight_ho_deltas);
    // Adjust the bias by its deltas (which is just the gradients)
    this.bias_o.add(gradients);

    // Calculate the hidden layer errors
    let who_t = Matrix.transpose(this.weights_ho);
    let hidden_errors = Matrix.multiply(who_t, output_errors);

    // Calculate hidden gradient
    let hidden_gradient = Matrix.map(hidden, this.activation_function.dfunc);
    hidden_gradient.multiply(hidden_errors);
    hidden_gradient.multiply(this.learning_rate);

    // Calcuate input->hidden deltas
    let inputs_T = Matrix.transpose(inputs);
    let weight_ih_deltas = Matrix.multiply(hidden_gradient, inputs_T);

    this.weights_ih.add(weight_ih_deltas);
    // Adjust the bias by its deltas (which is just the gradients)
    this.bias_h.add(hidden_gradient);

    // outputs.print();
    // targets.print();
    // error.print();
  }

  serialize() {
    return JSON.stringify(this);
  }

  static deserialize(data) {
    if (typeof data == 'string') {
      data = JSON.parse(data);
    }
    let nn = new ToyNeuralNetwork(data.input_nodes, data.hidden_nodes, data.output_nodes);
    nn.weights_ih = Matrix.deserialize(data.weights_ih);
    nn.weights_ho = Matrix.deserialize(data.weights_ho);
    nn.bias_h = Matrix.deserialize(data.bias_h);
    nn.bias_o = Matrix.deserialize(data.bias_o);
    nn.learning_rate = data.learning_rate;
    return nn;
  }


  // Adding function for neuro-evolution
  copy() {
    return new ToyNeuralNetwork(this);
  }

  // Accept an arbitrary function for mutation
  mutate(rate) {
    let mutate = val => val + (Math.random() * 0.2 - 0.1) * (Math.random() < rate);
    this.weights_ih.map(mutate);
    this.weights_ho.map(mutate);
    this.bias_h.map(mutate);
    this.bias_o.map(mutate);
  }
}

// }}}

// Data Structure {{{

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Boundary {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
}

class Rectangle extends Boundary {
  constructor(x, y, w, h) {
    super(x, y, w, h);
  }

  contains(point) {
    return point.x >= this.x - this.w &&
      point.x <= this.x + this.w &&
      point.y >= this.y - this.h &&
      point.y <= this.y + this.h;
  }

  intersects(range) {
    return !(
      range.x - range.w > this.x + this.w ||
      range.x + range.w < this.x - this.w ||
      range.y - range.h > this.y + this.h ||
      range.y + range.h < this.y - this.h
    );
  };

  show(context) {
    context.strokeRect(this.x - this.w, this.y - this.h, this.w * 2, this.h * 2);
  }
}

class Circle extends Boundary {
  constructor(x, y, r) {
    super(x, y);
    this.r = r;
  }

  contains(point) {
    return Math.distSq(this.x, this.y, point.x, point.y) <= this.r * this.r;
  }

  intersects(range) {
    return [
      [range.x - range.w, range.y - range.h],
      [range.x + range.w, range.y - range.h],
      [range.x - range.w, range.y + range.h],
      [range.x + range.w, range.y + range.h]
    ].map(p => Math.distSq(this.x, this.y, p[0], p[1]) <= this.r * this.r).some(a => a);
  }

  show(context) {
    ellipse(context, this.x, this.y, this.r, this.r, false);
  };
}

class QuadTree {
  constructor(boundary, n = 4) {
    this.boundary = boundary;
    this.capacity = n;
    this.points = [];
    this.subdivided = false;
    // this.rectangle = Rectangle;
    // this.circle = Circle;
  }

  subdivide() {
    let x = this.boundary.x;
    let y = this.boundary.y;
    let w = this.boundary.w;
    let h = this.boundary.h;
    let nw = new Rectangle(x - w / 2, y - h / 2, w / 2, h / 2);
    this.northWest = new QuadTree(nw, this.capacity);
    let ne = new Rectangle(x + w / 2, y - h / 2, w / 2, h / 2);
    this.northEast = new QuadTree(ne, this.capacity);
    let sw = new Rectangle(x - w / 2, y + h / 2, w / 2, h / 2);
    this.southWest = new QuadTree(sw, this.capacity);
    let se = new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2);
    this.southEast = new QuadTree(se, this.capacity);
    this.subdivided = true;
  }

  insert(point) {
    if (!this.boundary.contains(point)) return null;
    if (this.points.length < this.capacity) {
      this.points.push(point);
    } else {
      if (!this.subdivided) {
        this.subdivide();
      }
      this.northEast.insert(point);
      this.northWest.insert(point);
      this.southEast.insert(point);
      this.southWest.insert(point);
    }
  }

  show(context) {
    context.strokeStyle = 'white';
    this.boundary.show(context);
    if (this.subdivided) {
      this.northEast.show(context);
      this.northWest.show(context);
      this.southEast.show(context);
      this.southWest.show(context);
    }
  }

  query(range) {
    let found = [];
    if (!this.boundary.intersects(range)) return found;
    else {
      for (let p of this.points) {
        if (range.contains(p)) found.push(p);
      }
    }
    if (this.subdivided) found = found.concat(
      this.northEast.query(range),
      this.northWest.query(range),
      this.southEast.query(range),
      this.southWest.query(range));
    return found;
  }
}

// }}}

// Files {{{

const loadBytes = function(file, callback) {
  let data = {};
  let oReq = new XMLHttpRequest();
  oReq.open('GET', file, true);
  oReq.responseType = 'arraybuffer';
  oReq.onload = function(oEvent) {
    let arrayBuffer = oReq.response;
    if (arrayBuffer) {
      data.bytes = new Uint8Array(arrayBuffer);
      if (callback) callback(data);
    }
  }
  oReq.send(null);
  return data;
};

const loadTxt = function(file) {
  let txt = [];
  fetch(file).then(res => res.text()).then(text => txt.push(text));
  return txt;
}

const loadJSON = function(path, callback) {
  let jsonFile = {};
  fetch(path).then(res => res.json()).then(json => {
    for (let i = 0; i < json.length; i++) {
      jsonFile[i] = json[i];
    };
    if (!Array.isArray(json)) { //Object
      for (let prop in json) jsonFile[prop] = json[prop];
    }
    if (callback && typeof callback === 'function') callback(jsonFile, path);
  });
  return jsonFile;
};

const download = function(data, filename, type) {
  let file = new Blob([data], {
    type: type
  });
  if (window.navigator.msSaveOrOpenBlob) // IE10+
    window.navigator.msSaveOrOpenBlob(file, filename);
  else { // Others
    var a = document.createElement("a"),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
};
// }}}

// Inputs {{{

var keyPress = event => 1;

window.addEventListener('mousemove', function(event) {
  mouse.x = event.clientX;
  if (document.querySelector('canvas')) mouse.x -= document.querySelector('canvas').offsetLeft;
  mouse.y = event.clientY;
  if (document.querySelector('canvas')) mouse.y -= document.querySelector('canvas').offsetTop;
});

window.onkeypress = event => keyPress(event);

// }}}

// Images {{{

const createImage = function(width = 1, height = 1) {
  return new Imagem(width, height);
}

class Imagem {
  constructor(width, height) {
    let imgData = new ImageData(width, height);
    this.img = new Image(width, height);
    // this.pixels = context.getImageData(0, 0, this.img.width, this.img.height).data;
    this.pixels = imgData.data;
  }

  show(context, x, y, width, height) {
    context.drawImage(this.img, x, y, width, height);
  }


}

// const loadImg = path => new Promise(function(resolve, rejection) {
//   const img = new Image();
//   img.src = path;
//   img.onload = resolve({
//     img,
//     status: 'ok'
//   });
//   img.onerror = resolve({
//     path,
//     status: 'error'
//   });
// });

const loadImg = function(path, imageLoaded = function() {}) {
  let img = new Image();
  img.src = path;
  img.onload = function() {
    imageLoaded(img);
  };
  // if(failureCallBack) failureCallback();
  return img;
}

// const loadImg = path => new Promise(function(resolve, rejection) {
//   const img = new Image();
//   img.onload = x => resolve({
//     path,
//     status: 'ok'
//   });
//   img.onerror = x => resolve({
//     path,
//     status: 'error'
//   });
//   img.src = path;
// });

// const loadImg = function loadImg(src) {
//   'use strict';
//   const paths = Array.isArray(src) ? src : [src];
//   const promise = [];
//   paths.forEach((path) => {
//     promise.push(new Promise((resolve, reject) => {
//       const img = new Image();
//       img.onload = () => {
//         resolve({
//           path,
//           status: 'ok',
//         });
//       };
//       // Call `resolve` even if the image fails to load. If we were to
//       // call `reject`, the whole "system" would break
//       img.onerror = () => {
//         resolve({
//           path,
//           status: 'error',
//         });
//       };
//       img.src = path;
//     }));
//   });
//   return Promise.all(promise);
// };

const getPixels = function(img, x = 0, y = 0, sw = img.width, sh = img.height) {
  let canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  let context = canvas.getContext('2d');
  context.drawImage(img, 0, 0);
  return context.getImageData(x, y, sw, sh).data;
};

const getImageData = function(img, x = 0, y = 0, sw = img.width, sh = img.height) {
  let canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  let context = canvas.getContext('2d');
  context.drawImage(img, 0, 0);
  return context.getImageData(x, y, sw, sh);
};

const imageDataToImg = function(imageData) {
  let canvas = document.createElement('canvas');
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  let context = canvas.getContext('2d');
  context.putImageData(imageData, 0, 0, 0, 0, imageData.width, imageData.height);
  let img = new Image();
  img.src = canvas.toDataURL();
  return img;
};

function scaleImageData(canvas, imageData, scale) {
  let newCanvas = document.createElement('canvas');
  newCanvas.width = imageData.width;
  newCanvas.height = imageData.height;

  newCanvas.getContext("2d").putImageData(imageData, 0, 0);

  let scaleCanvas = document.createElement('canvas');
  scaleCanvas.width = canvas.width;
  scaleCanvas.height = canvas.height;
  // Second canvas, for scaling
  let scaleCtx = scaleCanvas.getContext('2d');

  scaleCtx.scale(scale, scale);
  scaleCtx.drawImage(newCanvas, 0, 0);

  let scaledImageData = scaleCtx.getImageData(0, 0, scaleCanvas.width, scaleCanvas.height);

  return scaledImageData;
};

const createVideo = (...args) => new Video(args);

const BLUR = 'blur';

class Video {
  constructor() {
    let doneC = arguments[0][0] || arguments[0];
    let errorC = arguments[0][1] || arguments[1];
    this.video = document.createElement('video');
    this.video.autoplay = true;
    this.mediaSettings = {
      video: true,
      audio: false
    };

    let videoStream = stream => {
      this.video.src = window.URL.createObjectURL(stream);
      this.video.onloadedmetadata = () => {
        this.width = this.video.videoWidth;
        this.height = this.video.videoHeight;
        if (doneC && typeof doneC === 'function') doneC(this);
      };
    };

    let errorCallback = function(error) {
      console.log(error.name);
      if (errorC && typeof errorC === 'function') errorC(error);
    }

    navigator.getUserMedia(this.mediaSettings, videoStream, errorCallback);
  };

  audioEnabled(state = true) {
    this.mediaSettings.audio = state;
  }

  videoEnabled(state = true) {
    this.mediaSettings.video = state;
  }

  getImageData(callback, x = 0, y = 0, sw = this.video.videoWidth, sh = this.video.videoHeight) {
    let canvas = document.createElement('canvas');
    canvas.width = sw;
    canvas.height = sh;
    let context = canvas.getContext('2d');
    context.drawImage(this.video, 0, 0);
    let data = context.getImageData(x, y, sw, sh);
    if (callback && typeof callback === 'function') callback(data);
    else return data;
  }

  getPixels(callback, x = 0, y = 0, sw = this.video.videoWidth, sh = this.video.videoHeight) {
    let canvas = document.createElement('canvas');
    canvas.width = sw;
    canvas.height = sh;
    let context = canvas.getContext('2d');
    context.drawImage(this.video, 0, 0);
    let pixels = context.getImageData(x, y, sw, sh).data;
    if (callback && typeof callback === 'function') callback(pixels);
    else return pixels;
  }

  draw(context = document.querySelector('canvas').getContext('2d'), x = 0, y = 0, sw = this.width, sh = this.height) {
    context.drawImage(this.video, x, y, sw, sh);
  }

  filter(mode) {
    let imageData = this.getImageData();
    let pixels2D = new Matrix(imageData.height, imageData.width);
    for (let i = 0; i < pixels2D.rows; i++) {
      for (let j = 0; j < pixels2D.cols; j++) {
        let index = i * pixels2D.rows + j;
        let pixel = {};
        pixel.r = imageData.data[4 * index + 0];
        pixel.g = imageData.data[4 * index + 1];
        pixel.b = imageData.data[4 * index + 2];
        pixel.a = imageData.data[4 * index + 3];
        pixels2D.data[i][j] = pixel;
      }
    }
    let pixelsFiltered = Matrix.copy(pixels2D);
    console.log(imageData, pixels2D);
    switch (mode) {
      case BLUR:
        for (let i = 0; i < pixelsFiltered.rows; i++) {
          for (let j = 0; j < pixelsFiltered.cols; j++) {
            let frameM = new Matrix(3, 3);
            for (let si = -1; si <= 1; si++) {
              for (let sj = -1; sj <= 1; sj++) {
                if (i + si >= 0 && i + si < pixels2D.rows && j + sj >= 0 && j + sj < pixels2D.cols) frameM.data[si + 1][sj + 1] = pixels2D.data[i + si][j + sj];
              }
            }
            pixelsFiltered.data[i][j] = frameM.mean();
            // frameM.print();
          }
        }
        break;
    }
    console.log(pixelsFiltered);
    imageData.data;
  }
}

// }}}

// Others {{{

function getUrlParams() {
  let params = {};
  let search = window.location.search.split(/\?|&/);
  search.shift();
  for (let i = 0; i < search.length; i++) {
    let s = search[i].split('=');
    params[s[0]] = s[1];
  };
  return params;
}

// }}}

console.warn('Library Version 1.0');

// vim: foldmethod=marker
