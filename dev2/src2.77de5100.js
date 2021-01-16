// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"core/state.ts":[function(require,module,exports) {
var global = arguments[3];
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.State = void 0;
/**
 * Global state manager
 * @param initial Initial state. Will be used if state initialized for the first time.
 */

function State(initial) {
  var global = window;

  if (_typeof(global.__GameState__) !== 'object') {
    global.__GameState__ = initial ? initial : {};
  }

  return global.__GameState__;
}

exports.State = State;
},{}],"core/utils.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.average = exports.numberWithCommas = exports.randomFromArray = exports.shuffle = exports.convertRange = exports.randomInteger = exports.insertionSort = exports.preloadImage = exports.loadImage = exports.loadAudio = exports.lerp = void 0;
/**
 * Linear interpolation function
 * @param v0 Range start
 * @param v1 Range end
 * @param t Position in range ( from 0 to 1 )
 */

function lerp(v0, v1, t) {
  return v0 * (1 - t) + v1 * t;
}

exports.lerp = lerp;
/**
 * Load audio file
 * @param src Audio path
 */

function loadAudio(src) {
  var audio = new Audio(src);
  return audio;
}

exports.loadAudio = loadAudio;
/**
 * Load image
 * @param src Image path
 */

function loadImage(src) {
  var image = new Image();
  image.src = src;
  return image;
}

exports.loadImage = loadImage;
/**
 * Preload image
 * @param src Image path
 */

function preloadImage(src) {
  return new Promise(function (resolve, reject) {
    var image = new Image();

    image.onload = function () {
      return resolve(image);
    };

    image.src = src;
  });
}

exports.preloadImage = preloadImage;
/**
 * Sort objects by field.
 * @param array Array to sort
 * @param field To sort by
 */

function insertionSort(array, field) {
  for (var i = 0; i < array.length; i++) {
    var value = array[i];

    for (var j = i - 1; j > -1 && array[j][field] > value[field]; j--) {
      array[j + 1] = array[j];
    }

    array[j + 1] = value;
  }

  return array;
}

exports.insertionSort = insertionSort;
/**
 * Generate random integer
 * @param min Minimal
 * @param max Maximal
 */

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.randomInteger = randomInteger;
/**
 * Convert value from one range to another
 * @param {Number} value value to convert
 * @param {Object} oldRange min, max of values range
 * @param {Object} newRange min, max of desired range
 * @return {Number} value converted to other range
 */

function convertRange(value, oldRange, newRange) {
  return (value - oldRange.min) * (newRange.max - newRange.min) / (oldRange.max - oldRange.min) + newRange.min;
}

exports.convertRange = convertRange;
/**
 * Shuffle array
 * Taken from https://stackoverflow.com/a/2450976/7442791
 * @param array Array to shuffle
 */

function shuffle(array) {
  var currentIndex = array.length;
  var temporaryValue;
  var randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

exports.shuffle = shuffle;
/**
 * Get index of random value from array.
 * @param array Array to take from.
 */

function randomFromArray(array) {
  return Math.floor(Math.random() * array.length);
}

exports.randomFromArray = randomFromArray;
/**
 * Add commas to number
 * @param number Number to add commas to
 */

function numberWithCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

exports.numberWithCommas = numberWithCommas;
/**
 * Calculate average value of all numbers
 * @param nums Array of number
 * @param floor Round returned value
 */

function average(nums, floor) {
  if (floor === void 0) {
    floor = true;
  }

  var result = nums.reduce(function (a, b) {
    return a + b;
  }, 0) / nums.length;
  return floor ? Math.floor(result) : result;
}

exports.average = average;
},{}],"content.json":[function(require,module,exports) {
module.exports = {
  "real_news": [{
    "title": "U.S. Elections!",
    "content": "In a week we will know who will be the new president of the United States!",
    "theme": "politics",
    "fake": false
  }, {
    "title": "President elected",
    "content": "After recent president election, the winner take position",
    "theme": "politics",
    "fake": false
  }, {
    "title": "New President rules",
    "content": "New Statement from president came out!",
    "theme": "politics",
    "fake": false
  }, {
    "title": "Britain post Brexit",
    "content": "What has been effected by it?",
    "theme": "politics",
    "fake": false
  }, {
    "title": "Migrant stuck in Bosnia",
    "content": "What created such incident?",
    "theme": "politics",
    "fake": false
  }, {
    "title": "President - Vaccines have arrive!",
    "content": "What you should know about them?",
    "theme": "politics",
    "fake": false
  }, {
    "title": "Cyberpunk 2077 released!",
    "content": "One of the best upcoming games has been finaly released.",
    "theme": "gaming",
    "fake": false
  }, {
    "title": "Steam winter sale ends soon",
    "content": "Quick grab some game on cheap price!",
    "theme": "gaming",
    "fake": false
  }, {
    "title": "Minecraft 2 confirmed!",
    "content": "Markus Person confirmed that Minecraft 2 already in development",
    "theme": "gaming",
    "fake": false
  }, {
    "title": "New Fallout game to be released!",
    "content": "Will franchise rise again after the 76 massive fail?",
    "theme": "gaming",
    "fake": false
  }, {
    "title": "Club Penguin 2 in making! ",
    "content": "Creators confirm, its real!",
    "theme": "gaming",
    "fake": false
  }, {
    "title": "New Minecraft update soon.",
    "content": "What changes will there be?",
    "theme": "gaming",
    "fake": false
  }, {
    "title": "Lil Pump has made new song!",
    "content": "The new song is titled Adidas Gang",
    "theme": "music",
    "fake": false
  }, {
    "title": "Grammys delayed due Covid-19",
    "content": "Due to Covid-19 pandemic, grammy awards are delayed!",
    "theme": "music",
    "fake": false
  }, {
    "title": "New James Bond music is top  class.",
    "content": "Song titled NO.TIME.TO.DIE brings new light into Jame bond films!.",
    "theme": "music",
    "fake": false
  }, {
    "title": "All I want for christmas - best song of generation?",
    "content": "Will there ever be end to it?",
    "theme": "music",
    "fake": false
  }, {
    "title": "Dr. Dre in Hospital!",
    "content": "What happened and should you be woried?",
    "theme": "music",
    "fake": false
  }, {
    "title": "New Ed Sheeran album released",
    "content": "What now he has to offer?",
    "theme": "music",
    "fake": false
  }, {
    "title": "New Avengers movies to come soon!",
    "content": "Marvel announced that Avengers cast will return soon",
    "theme": "films",
    "fake": false
  }, {
    "title": "New Star Wars movies announced!",
    "content": "Will they be as bad as last 3?",
    "theme": "films",
    "fake": false
  }, {
    "title": "Petions made to ban Musicals in movies",
    "content": "More then 100 000 000 sigantures have been colected",
    "theme": ["films"],
    "fake": false
  }, {
    "title": "New DC movies annouced!",
    "content": "Will it ever be as popular as Marvels films?",
    "theme": "films",
    "fake": false
  }, {
    "title": "New documentary about WW2, has been released!",
    "content": "What new insights to be found?",
    "theme": "films",
    "fake": false
  }, {
    "title": "Latvian movie recieves oscar!!",
    "content": "Shock? What? How?",
    "theme": "films",
    "fake": false
  }, {
    "title": "Scientist found new large Meteor.",
    "content": "What can we learn about it?",
    "theme": "educational",
    "fake": false
  }, {
    "title": "How to study and concentrate better in School",
    "content": "Tip and Tricks!",
    "theme": "educational",
    "fake": false
  }, {
    "title": "DIY Hacks for Daily life",
    "content": "Top 10 Hacks that you ...",
    "theme": "educational",
    "fake": false
  }, {
    "title": "Maximum speed of human?",
    "content": "Scientist doing reasearch of how fast can human run.",
    "theme": "educational",
    "fake": false
  }],
  "fake_news": [{
    "title": "Fake",
    "content": "FakeNews",
    "theme": "FakeNews",
    "fake": true
  }, {
    "title": "Fake",
    "content": "FakeNews",
    "theme": "FakeNews",
    "fake": true
  }, {
    "title": "Fake",
    "content": "FakeNews",
    "theme": "FakeNews",
    "fake": true
  }, {
    "title": "Fake",
    "content": "FakeNews",
    "theme": "FakeNews",
    "fake": true
  }, {
    "title": "Fake",
    "content": "FakeNews",
    "theme": "FakeNews",
    "fake": true
  }, {
    "title": "Fake",
    "content": "FakeNews",
    "theme": "FakeNews",
    "fake": true
  }, {
    "title": "Fake",
    "content": "FakeNews",
    "theme": "FakeNews",
    "fake": true
  }, {
    "title": "Fake",
    "content": "FakeNews",
    "theme": "FakeNews",
    "fake": true
  }, {
    "title": "Fake",
    "content": "FakeNews",
    "theme": "FakeNews",
    "fake": true
  }, {
    "title": "Fake",
    "content": "FakeNews",
    "theme": "FakeNews",
    "fake": true
  }, {
    "title": "Fake",
    "content": "FakeNews",
    "theme": "FakeNews",
    "fake": true
  }, {
    "title": "Fake",
    "content": "FakeNews",
    "theme": "FakeNews",
    "fake": true
  }, {
    "title": "Fake",
    "content": "FakeNews",
    "theme": "FakeNews",
    "fake": true
  }, {
    "title": "Fake",
    "content": "FakeNews",
    "theme": "FakeNews",
    "fake": true
  }, {
    "title": "Fake",
    "content": "FakeNews",
    "theme": "FakeNews",
    "fake": true
  }, {
    "title": "Fake",
    "content": "FakeNews",
    "theme": "FakeNews",
    "fake": true
  }, {
    "title": "Fake",
    "content": "FakeNews",
    "theme": "FakeNews",
    "fake": true
  }, {
    "title": "Fake",
    "content": "FakeNews",
    "theme": "FakeNews",
    "fake": true
  }, {
    "title": "Fake",
    "content": "FakeNews",
    "theme": "FakeNews",
    "fake": true
  }, {
    "title": "Fake",
    "content": "FakeNews",
    "theme": "FakeNews",
    "fake": true
  }, {
    "title": "Fake",
    "content": "FakeNews",
    "theme": "FakeNews",
    "fake": true
  }, {
    "title": "Fake",
    "content": "FakeNews",
    "theme": "FakeNews",
    "fake": true
  }, {
    "title": "Fake",
    "content": "FakeNews",
    "theme": "FakeNews",
    "fake": true
  }, {
    "title": "Fake",
    "content": "FakeNews",
    "theme": "FakeNews",
    "fake": true
  }]
};
},{}],"coefficents.json":[function(require,module,exports) {
module.exports = {
  "moods": {
    "music": 11,
    "sport": 9,
    "gaming": 7,
    "films": 5,
    "politics": 3,
    "educational": 1
  },
  "levels": [{
    "level": 0,
    "score": 0,
    "relevanceDeduction": 0,
    "relevanceAddition": 0.5,
    "maximumPenguins": 20,
    "penguinsMultiplier": 0.1,
    "penguinsInvolvment": 0.01,
    "newsUpadateDelay": 10000,
    "fishDespawnFrames": 200
  }, {
    "level": 1,
    "score": 0.01,
    "relevanceDeduction": 0.02,
    "relevanceAddition": 0.4,
    "maximumPenguins": 20,
    "penguinsMultiplier": 0.1,
    "penguinsInvolvment": 0.05,
    "newsUpadateDelay": 9000,
    "fishDespawnFrames": 175
  }, {
    "level": 2,
    "score": 2,
    "relevanceDeduction": 0.025,
    "relevanceAddition": 0.35,
    "maximumPenguins": 40,
    "penguinsMultiplier": 0.11,
    "penguinsInvolvment": 0.05,
    "newsUpadateDelay": 8000,
    "fishDespawnFrames": 150
  }, {
    "level": 3,
    "score": 4,
    "relevanceDeduction": 0.04,
    "relevanceAddition": 0.3,
    "maximumPenguins": 80,
    "penguinsMultiplier": 0.12,
    "penguinsInvolvment": 0.1,
    "newsUpadateDelay": 7000,
    "fishDespawnFrames": 125
  }, {
    "level": 4,
    "score": 6,
    "relevanceDeduction": 0.06,
    "relevanceAddition": 0.3,
    "maximumPenguins": 160,
    "penguinsMultiplier": 0.14,
    "penguinsInvolvment": 0.2,
    "newsUpadateDelay": 6000,
    "fishDespawnFrames": 100
  }, {
    "level": 5,
    "score": 8,
    "relevanceDeduction": 0.1,
    "relevanceAddition": 0.3,
    "maximumPenguins": 320,
    "penguinsMultiplier": 0.15,
    "penguinsInvolvment": 0.3,
    "newsUpadateDelay": 5000,
    "fishDespawnFrames": 75
  }]
};
},{}],"core/input.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var state_1 = require("./state"); // Get game state


var GAME = state_1.State(); // On window resize

window.addEventListener('resize', function () {
  GAME.element.width = window.innerWidth * window.devicePixelRatio;
  GAME.element.height = window.innerHeight * window.devicePixelRatio;
}); // Mouse position calculation

GAME.element.addEventListener('mousemove', function (event) {
  var rect = GAME.element.getBoundingClientRect();
  GAME.mouseX = (event.clientX - rect.left) / (rect.right - rect.left) * GAME.element.width;
  GAME.mouseY = (event.clientY - rect.top) / (rect.bottom - rect.top) * GAME.element.height;
}); // On mouse down

GAME.element.addEventListener('mousedown', function () {
  GAME.mouseDown = true;
}); // On mouse up

GAME.element.addEventListener('mouseup', function () {
  GAME.mouseDown = false;
});
},{"./state":"core/state.ts"}],"core/timers.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestTimeout = exports.requestInterval = void 0;

var state_1 = require("./state"); // Get state


var GAME = state_1.State();
/**
 * Alternative to `setInterval`, but using request animation frame
 * @param callback Callback that will be executed after delay
 * @param delay Delay before executing
 */

function requestInterval(callback, delay) {
  if (delay === void 0) {
    delay = 0;
  }

  var start = Date.now();
  var passed = 0;
  var canceled = false;

  var loop = function loop() {
    var current = Date.now(); // Stop interval if its canceled

    if (canceled) return; // If game paused

    if (GAME.paused) {
      start = current;
      window.requestAnimationFrame(loop);
      return;
    }

    ;
    passed += current - start;
    start = current;

    if (passed >= delay) {
      callback();
      passed = 0;
    }

    window.requestAnimationFrame(loop);
  };

  loop();
  return function (newDelay) {
    if (newDelay) {
      delay = newDelay;
    } else {
      canceled = true;
    }
  };
}

exports.requestInterval = requestInterval;
/**
 * Alternative to `setTimeout`, but using request animation frame
 * @param callback Callback that will be executed after delay
 * @param delay Delay before executing
 */

function requestTimeout(callback, delay) {
  if (delay === void 0) {
    delay = 0;
  }

  var start = Date.now();
  var passed = 0;
  var canceled = false;

  var loop = function loop() {
    var current = Date.now(); // Stop interval if its canceled

    if (canceled) return; // If game paused

    if (GAME.paused) {
      start = current;
      window.requestAnimationFrame(loop);
      return;
    }

    ;
    passed += current - start;
    start = current;

    if (passed >= delay) {
      callback();
      return;
    }

    window.requestAnimationFrame(loop);
  };

  loop();
  return function () {
    canceled = true;
  };
}

exports.requestTimeout = requestTimeout;
},{"./state":"core/state.ts"}],"sounds/music.mp3":[function(require,module,exports) {
module.exports = "/music.24e8fb6f.mp3";
},{}],"sounds/pop.mp3":[function(require,module,exports) {
module.exports = "/pop.95702eb6.mp3";
},{}],"sounds/move.mp3":[function(require,module,exports) {
module.exports = "/move.e9e27334.mp3";
},{}],"sounds/paper.mp3":[function(require,module,exports) {
module.exports = "/paper.8c2eaac7.mp3";
},{}],"sounds/click.mp3":[function(require,module,exports) {
module.exports = "/click.80d31260.mp3";
},{}],"sounds/click2.mp3":[function(require,module,exports) {
module.exports = "/click2.5458956f.mp3";
},{}],"sounds/speach.mp3":[function(require,module,exports) {
module.exports = "/speach.5aefe5be.mp3";
},{}],"sounds/siren.mp3":[function(require,module,exports) {
module.exports = "/siren.b5bd2e53.mp3";
},{}],"core/audio.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startMusic = exports.playSirenSound = exports.playPaperSound = exports.playMoveSound = exports.playSpeachSound = exports.playClick2Sound = exports.playClickSound = exports.playPopSound = void 0;

var timers_1 = require("./timers"); // Sounds


var music_mp3_1 = __importDefault(require("../sounds/music.mp3"));

var pop_mp3_1 = __importDefault(require("../sounds/pop.mp3"));

var move_mp3_1 = __importDefault(require("../sounds/move.mp3"));

var paper_mp3_1 = __importDefault(require("../sounds/paper.mp3"));

var click_mp3_1 = __importDefault(require("../sounds/click.mp3"));

var click2_mp3_1 = __importDefault(require("../sounds/click2.mp3"));

var speach_mp3_1 = __importDefault(require("../sounds/speach.mp3"));

var siren_mp3_1 = __importDefault(require("../sounds/siren.mp3")); // Pop sound


var popIndex = 0;
var pops = [];

for (var i = 0; i < 5; i++) {
  pops.push(new Audio(pop_mp3_1.default));
}
/**
 * Pop sound
 */


function playPopSound() {
  var sound = pops[popIndex];
  timers_1.requestTimeout(function () {
    sound.volume = 0.1;
    sound.play();
    popIndex += 1;
    if (popIndex >= pops.length) popIndex = 0;
  }, 20);
}

exports.playPopSound = playPopSound;
/**
 * Click sound
 */

function playClickSound() {
  var audio = new Audio(click_mp3_1.default);
  audio.volume = 0.1;
  audio.play();
}

exports.playClickSound = playClickSound;
/**
 * Click sound
 */

function playClick2Sound() {
  var audio = new Audio(click2_mp3_1.default);
  audio.volume = 0.1;
  audio.play();
}

exports.playClick2Sound = playClick2Sound;
/**
 * Speach sound
 */

function playSpeachSound() {
  var audio = new Audio(speach_mp3_1.default);
  audio.volume = 0.05;
  audio.play();
}

exports.playSpeachSound = playSpeachSound;
/**
 * Move sound
 */

function playMoveSound() {
  var audio = new Audio(move_mp3_1.default);
  audio.volume = 0.1;
  audio.play();
}

exports.playMoveSound = playMoveSound;
/**
 * Paper sound
 */

function playPaperSound() {
  var audio = new Audio(paper_mp3_1.default);
  audio.volume = 0.5;
  audio.play();
}

exports.playPaperSound = playPaperSound;
/**
 * Paper sound
 */

function playSirenSound() {
  var audio = new Audio(siren_mp3_1.default);
  audio.volume = 0.1;
  audio.play();
}

exports.playSirenSound = playSirenSound;
/**
 * Paper sound
 */

function startMusic() {
  var audio = new Audio(music_mp3_1.default);
  audio.volume = 0.5;
  audio.loop = true;
  audio.play();
}

exports.startMusic = startMusic;
},{"./timers":"core/timers.ts","../sounds/music.mp3":"sounds/music.mp3","../sounds/pop.mp3":"sounds/pop.mp3","../sounds/move.mp3":"sounds/move.mp3","../sounds/paper.mp3":"sounds/paper.mp3","../sounds/click.mp3":"sounds/click.mp3","../sounds/click2.mp3":"sounds/click2.mp3","../sounds/speach.mp3":"sounds/speach.mp3","../sounds/siren.mp3":"sounds/siren.mp3"}],"core/gui.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var state_1 = require("./state");

var timers_1 = require("./timers");

var utils_1 = require("./utils");

var audio_1 = require("./audio"); // Get state


var GAME = state_1.State(); // Elements

var news = document.getElementById('news');
var overlay = document.getElementById('overlay');
var counter = document.getElementById('counter');
var pauseMenu = document.getElementById('pause-menu');
var postModal = document.getElementById('post-modal');
var mood = document.getElementById('mood');
var selectedNews = document.getElementById('selected');
var relevanceBar = document.getElementById('relevance-bar'); // Buttons

var gamingButton = document.getElementById('gaming');
var educationalButton = document.getElementById('educational');
var politicsButton = document.getElementById('politics');
var filmsButton = document.getElementById('films');
var musicButton = document.getElementById('music');
var sportButton = document.getElementById('sport');
var postButton = document.getElementById('post'); // Update GUI elements

timers_1.requestInterval(function () {
  // Fish counter
  counter.innerText = utils_1.numberWithCommas(GAME.fish); // Bar width

  var revelance = Math.floor(GAME.relevance * 50);
  if (revelance > 100) revelance = 100;
  relevanceBar.style.width = revelance + "%"; // Bar color

  if (revelance < 33) {
    relevanceBar.style.backgroundColor = '#f35858';
  } else if (revelance > 66) {
    relevanceBar.style.backgroundColor = '#5ef358';
  } else {
    relevanceBar.style.backgroundColor = '#5893f3';
  }
}, 100); // Request news block

timers_1.requestInterval(function () {
  audio_1.playMoveSound();
  nextNewsBlock();
}, 2000); // New post creating

postButton.addEventListener('click', function () {
  audio_1.playPaperSound();
  audio_1.playClickSound();
  createPost();
  hideModals();
}); // Hide modals in overlay click

overlay.addEventListener('click', function () {
  audio_1.playClick2Sound();
  hideModals();
}); // Pause menu on Escape press

window.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    if (GAME.paused) {
      GAME.paused = false;
      hideModals();
    } else {
      GAME.paused = true;
      pauseMenu.style.display = 'block';
      overlay.style.opacity = '1';
      overlay.style.pointerEvents = 'auto';
    }
  }
}); //Buttons for the new post thingy

gamingButton.addEventListener('click', function () {
  unpressButtons();
  audio_1.playClickSound();
  postButton.disabled = false;
  gamingButton.classList.contains('active') ? gamingButton.classList.remove('active') : gamingButton.classList.add('active');
});
educationalButton.addEventListener('click', function () {
  unpressButtons();
  audio_1.playClickSound();
  postButton.disabled = false;
  educationalButton.classList.contains('active') ? educationalButton.classList.remove('active') : educationalButton.classList.add('active');
}); // Film theme selection

filmsButton.addEventListener('click', function () {
  unpressButtons();
  audio_1.playClickSound();
  postButton.disabled = false;
  filmsButton.classList.contains('active') ? filmsButton.classList.remove('active') : filmsButton.classList.add('active');
}); // Politics theme selection

politicsButton.addEventListener('click', function () {
  unpressButtons();
  audio_1.playClickSound();
  postButton.disabled = false;
  politicsButton.classList.contains('active') ? politicsButton.classList.remove('active') : politicsButton.classList.add('active');
}); // Music theme selection

musicButton.addEventListener('click', function () {
  unpressButtons();
  audio_1.playClickSound();
  postButton.disabled = false;
  musicButton.classList.contains('active') ? musicButton.classList.remove('active') : musicButton.classList.add('active');
}); // Sports theme selection

sportButton.addEventListener('click', function () {
  unpressButtons();
  audio_1.playClickSound();
  postButton.disabled = false;
  sportButton.classList.contains('active') ? sportButton.classList.remove('active') : sportButton.classList.add('active');
});
/**
 * Unpress all theme buttons
 */

function unpressButtons() {
  gamingButton.classList.remove('active');
  educationalButton.classList.remove('active');
  filmsButton.classList.remove('active');
  politicsButton.classList.remove('active');
  musicButton.classList.remove('active');
  sportButton.classList.remove('active');
}
/**
 * Create new post
 */


function createPost() {
  var index = GAME.selectedNewsIndex;
  var current = GAME.news[index];
  GAME.started = true;
  var selectedTheme = document.querySelector('button.active');
  if (selectedTheme === null) return;
  var selectedNewsBlock = news.querySelector("[news-index=\"" + index + "\"]");
  if (selectedNewsBlock) selectedNewsBlock.classList.add('posted'); // Penguin Animation

  var player = GAME.penguins.find(function (entity) {
    return entity.type === 'player';
  });
  player.state = 'speaking';
  player.speakFrame = 0; // Fake content check

  if (current.fake) {
    audio_1.playSirenSound(); // Make penguins angry

    GAME.penguins.forEach(function (penguin) {
      if (penguin.type !== 'penguin') return;
      if (penguin.state !== 'walking') return;
      penguin.mood = 'angry';
    });
    GAME.relevance -= GAME.coefficents.relevanceDeduction * 10;
    return;
  } // If theme is incorrect


  if (current.theme !== selectedTheme.id) return; // Validate mood

  var addition = GAME.coefficents.relevanceAddition;
  var moods = GAME.moods;
  var moodValue = parseInt(mood.value);
  var maxBoundary = moods[current.theme] + 1;
  var minBoundary = moods[current.theme] - 1; // Lower addition if invalid mood

  if (moodValue >= minBoundary && moodValue <= maxBoundary) {
    addition *= 0.75;
  } // Add score


  GAME.relevance += addition;
  GAME.score += addition;
}
/**
 * Next news block
 */


function nextNewsBlock() {
  var index = GAME.newsIndex;
  var current = GAME.news[index];
  var blockOld = news.querySelector('.old');
  if (blockOld) blockOld.remove();
  var blockOne = news.querySelector('.block.one');

  if (blockOne) {
    blockOne.classList.remove('one');
    blockOne.classList.add('old');
  }

  var blockTwo = news.querySelector('.block.two');

  if (blockTwo) {
    blockTwo.classList.add('one');
    blockTwo.classList.remove('two');
  }

  var blockThree = news.querySelector('.block.three');

  if (blockThree) {
    blockThree.classList.add('two');
    blockThree.classList.remove('three');
  } // Create next post


  var blockNew = document.createElement('div');
  blockNew.className = 'block new';
  blockNew.setAttribute('news-index', "" + index);
  var title = document.createElement('h3');
  title.innerText = current.title;
  var content = document.createElement('p');
  content.innerText = current.content; // Build element

  blockNew.appendChild(title);
  blockNew.appendChild(content);
  news.appendChild(blockNew); // Make new block

  window.requestAnimationFrame(function () {
    blockNew.className = 'block three';

    blockNew.onclick = function () {
      GAME.selectedNewsIndex = index;
      showPostModal();
      audio_1.playClickSound();
    };
  });
  GAME.newsIndex += 1;
  if (GAME.newsIndex >= GAME.news.length) GAME.newsIndex = 0;
}
/**
 * Show post creating modal
 */


function showPostModal() {
  var index = GAME.selectedNewsIndex;
  var current = GAME.news[index]; // Create post element

  var blockNew = document.createElement('div');
  blockNew.className = 'block new';
  var title = document.createElement('h3');
  title.innerText = current.title;
  var content = document.createElement('p');
  content.innerText = current.content;
  blockNew.appendChild(title);
  blockNew.appendChild(content);
  selectedNews.innerHTML = '';
  selectedNews.appendChild(blockNew);
  postButton.disabled = true;
  postModal.style.top = '32px';
  overlay.style.opacity = '1';
  overlay.style.pointerEvents = 'auto';
  GAME.paused = true;
}
/**
 * Hide post creating modal
 */


function hideModals() {
  postButton.disabled = true;
  postModal.style.top = '100%';
  overlay.style.opacity = '0';
  pauseMenu.style.display = 'none';
  overlay.style.pointerEvents = 'none';
  GAME.paused = false;
  unpressButtons();
}
},{"./state":"core/state.ts","./timers":"core/timers.ts","./utils":"core/utils.ts","./audio":"core/audio.ts"}],"../node_modules/stats.js/build/stats.min.js":[function(require,module,exports) {
var define;
// stats.js - http://github.com/mrdoob/stats.js
(function(f,e){"object"===typeof exports&&"undefined"!==typeof module?module.exports=e():"function"===typeof define&&define.amd?define(e):f.Stats=e()})(this,function(){var f=function(){function e(a){c.appendChild(a.dom);return a}function u(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?"block":"none";l=a}var l=0,c=document.createElement("div");c.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000";c.addEventListener("click",function(a){a.preventDefault();
u(++l%c.children.length)},!1);var k=(performance||Date).now(),g=k,a=0,r=e(new f.Panel("FPS","#0ff","#002")),h=e(new f.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var t=e(new f.Panel("MB","#f08","#201"));u(0);return{REVISION:16,dom:c,addPanel:e,showPanel:u,begin:function(){k=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();h.update(c-k,200);if(c>g+1E3&&(r.update(1E3*a/(c-g),100),g=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/
1048576,d.jsHeapSizeLimit/1048576)}return c},update:function(){k=this.end()},domElement:c,setMode:u}};f.Panel=function(e,f,l){var c=Infinity,k=0,g=Math.round,a=g(window.devicePixelRatio||1),r=80*a,h=48*a,t=3*a,v=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement("canvas");q.width=r;q.height=h;q.style.cssText="width:80px;height:48px";var b=q.getContext("2d");b.font="bold "+9*a+"px Helvetica,Arial,sans-serif";b.textBaseline="top";b.fillStyle=l;b.fillRect(0,0,r,h);b.fillStyle=f;b.fillText(e,t,v);
b.fillRect(d,m,n,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d,m,n,p);return{dom:q,update:function(h,w){c=Math.min(c,h);k=Math.max(k,h);b.fillStyle=l;b.globalAlpha=1;b.fillRect(0,0,r,m);b.fillStyle=f;b.fillText(g(h)+" "+e+" ("+g(c)+"-"+g(k)+")",t,v);b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p);b.fillRect(d+n-a,m,a,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d+n-a,m,a,g((1-h/w)*p))}}};return f});

},{}],"sprites/fish-shadow.png":[function(require,module,exports) {
module.exports = "/fish-shadow.b927e0a1.png";
},{}],"core/entities/fish.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Fish = void 0;

var state_1 = require("../state");

var timers_1 = require("../timers");

var utils_1 = require("../utils"); // Sprites


var fish_shadow_png_1 = __importDefault(require("../../sprites/fish-shadow.png")); // Sounds


var audio_1 = require("../audio"); // Preload images


var fish = utils_1.loadImage(fish_shadow_png_1.default); // Global game state

var GAME = state_1.State(); // Element

var fishCounter = document.getElementById('fish');

var Fish =
/** @class */
function () {
  /**
   * Billboard initialization
   */
  function Fish(x, y) {
    this.type = 'fish';
    this.spriteHeight = 92;
    this.spriteWidth = 92;
    this.x = x;
    this.y = y;
    this.spawnY = y;
    this.frame = 0;
    this.exists = true;
    this.collected = false;
    this.width = this.spriteWidth;
    this.height = this.spriteHeight;
    if (this.x < 128) this.x = 128;
    if (this.x > GAME.element.width - 128) this.x = GAME.element.width - 128;
  }
  /**
   * Draw sprite on canvas
   */


  Fish.prototype.draw = function () {
    var ctx = GAME.ctx;
    if (this.exists === false) return;
    var size = utils_1.convertRange(this.spawnY, {
      min: 0,
      max: GAME.element.height
    }, {
      min: 0,
      max: 2
    });
    var posY = utils_1.convertRange(this.y, {
      min: 0,
      max: GAME.element.height
    }, {
      min: GAME.element.height / 5,
      max: GAME.element.height
    });
    ctx.save();
    ctx.translate(this.x, posY);
    ctx.scale(size, size);
    ctx.drawImage(fish, -(this.width / 2), -(this.height / 2), this.width, this.height);
    ctx.restore();
  };
  /**
   * Update billboard state
   */


  Fish.prototype.update = function () {
    if (this.exists === false) return; // Next frame

    this.frame += 1; // If not collected

    if (!this.collected) {
      // Spawn animation
      if (this.frame < 50) {
        var posY_1 = utils_1.convertRange(this.spawnY - 512, {
          min: 0,
          max: GAME.element.height
        }, {
          min: GAME.element.height / 5,
          max: GAME.element.height
        });
        this.y = utils_1.lerp(this.y, posY_1, 0.05);
      } // Despawn


      if (this.frame > GAME.coefficents.fishDespawnFrames) {
        this.width = utils_1.lerp(this.width, 0, 0.2);
        this.height = utils_1.lerp(this.height, 0, 0.2);
        if (this.width < 16) this.exists = false;
        return;
      } // Check mouse collision


      if (GAME.mouseX <= this.x + 48 && GAME.mouseX >= this.x - 48) {
        this.collected = true;
        audio_1.playPopSound();
      } else {
        return;
      }
    } // Size animation


    if (this.y < 64) {
      this.width = utils_1.lerp(this.width, 0, 0.1);
      this.height = utils_1.lerp(this.height, 0, 0.1);
    } // Change position


    var posX = GAME.element.width / 2;
    var posY = 0 - GAME.element.height / 5;
    this.x = utils_1.lerp(this.x, posX, 0.1);
    this.y = utils_1.lerp(this.y, posY, 0.1);

    if (this.width < 16) {
      this.exists = false;
      GAME.fish += 1; // Counter animation

      fishCounter.className = 'added';
      timers_1.requestTimeout(function () {
        fishCounter.className = '';
      }, 10);
    }
  };

  return Fish;
}();

exports.Fish = Fish;
},{"../state":"core/state.ts","../timers":"core/timers.ts","../utils":"core/utils.ts","../../sprites/fish-shadow.png":"sprites/fish-shadow.png","../audio":"core/audio.ts"}],"sprites/penguin-left.png":[function(require,module,exports) {
module.exports = "/penguin-left.1f426071.png";
},{}],"sprites/penguin-right.png":[function(require,module,exports) {
module.exports = "/penguin-right.cc96b153.png";
},{}],"sprites/penguin-left-angry.png":[function(require,module,exports) {
module.exports = "/penguin-left-angry.ebdcc90b.png";
},{}],"sprites/penguin-right-angry.png":[function(require,module,exports) {
module.exports = "/penguin-right-angry.ea809049.png";
},{}],"sprites/penguin-left-bored.png":[function(require,module,exports) {
module.exports = "/penguin-left-bored.ec5f8a93.png";
},{}],"sprites/penguin-right-bored.png":[function(require,module,exports) {
module.exports = "/penguin-right-bored.8e310b81.png";
},{}],"core/entities/penguin.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Penguin = void 0;

var fish_1 = require("./fish");

var state_1 = require("../state");

var utils_1 = require("../utils"); // Sprites


var penguin_left_png_1 = __importDefault(require("../../sprites/penguin-left.png"));

var penguin_right_png_1 = __importDefault(require("../../sprites/penguin-right.png"));

var penguin_left_angry_png_1 = __importDefault(require("../../sprites/penguin-left-angry.png"));

var penguin_right_angry_png_1 = __importDefault(require("../../sprites/penguin-right-angry.png"));

var penguin_left_bored_png_1 = __importDefault(require("../../sprites/penguin-left-bored.png"));

var penguin_right_bored_png_1 = __importDefault(require("../../sprites/penguin-right-bored.png")); // Preload images


var penguinLeft = utils_1.loadImage(penguin_left_png_1.default);
var penguinRight = utils_1.loadImage(penguin_right_png_1.default);
var angryPenguinLeft = utils_1.loadImage(penguin_left_angry_png_1.default);
var angryPenguinRight = utils_1.loadImage(penguin_right_angry_png_1.default);
var boredPenguinLeft = utils_1.loadImage(penguin_left_bored_png_1.default);
var boredPenguinRight = utils_1.loadImage(penguin_right_bored_png_1.default); // Global game state

var GAME = state_1.State();

var Penguin =
/** @class */
function () {
  function Penguin(x, y) {
    this.type = 'penguin';
    this.spriteHeight = 92;
    this.spriteWidth = 92;
    this.x = x;
    this.y = y;
    this.state = 'spawning';
    this.frame = utils_1.randomInteger(0, 20);
    this.direction = utils_1.randomInteger(0, 1) ? 'left' : 'right';
    this.mood = 'normal';
    this.width = this.spriteWidth / 2;
    this.height = 0;
    this.exists = true;
    this.involvment = utils_1.randomInteger(75, 125);
    this.spawnFrame = utils_1.randomInteger(0, 200);
  }
  /**
   * Draw penguin
   */


  Penguin.prototype.draw = function () {
    var ctx = GAME.ctx;
    if (!GAME.started) return; // Remove if its unmounted

    if (!this.exists) return;
    var sprite = this.direction === 'left' ? penguinLeft : penguinRight;
    var size = utils_1.convertRange(this.y, {
      min: 0,
      max: GAME.element.height
    }, {
      min: 0,
      max: 2
    });
    var posY = utils_1.convertRange(this.y, {
      min: 0,
      max: GAME.element.height
    }, {
      min: GAME.element.height / 5,
      max: GAME.element.height
    }); // Bored sprite

    if (this.mood === 'bored') {
      sprite = this.direction === 'left' ? boredPenguinLeft : boredPenguinRight;
    } // Angry sprite


    if (this.mood === 'angry') {
      sprite = this.direction === 'left' ? angryPenguinLeft : angryPenguinRight;
    } // Skip drawing if its reversed


    if (size < 0) return;
    ctx.save();
    ctx.translate(this.x, posY);
    ctx.scale(size, size);
    ctx.drawImage(sprite, -(this.width / 2), -this.height + 18, this.width, this.height);
    ctx.restore();
  };
  /**
   * Update penguin state
   */


  Penguin.prototype.update = function () {
    var width = GAME.element.width;
    var height = GAME.element.height;
    if (!GAME.started) return; // Remove if its unmounted

    if (!this.exists) return; // Lower involvement

    this.involvment -= GAME.coefficents.penguinsInvolvment; // Lower involvement one more time

    if (this.mood === 'angry') this.involvment -= 1; // If penguin is not involved

    if (this.involvment <= 0) this.state = 'leaving'; // Spawn fish

    if (this.spawnFrame === 100 && this.state === 'walking' && this.mood === 'normal') {
      var fish = new fish_1.Fish(this.x, this.y - 1);
      GAME.entities.push(fish);
    } // Update frame


    this.frame += 1;
    if (this.frame > 20) this.frame = 0; // Update spawn frame

    this.spawnFrame += 1;

    if (this.spawnFrame > 100) {
      this.spawnFrame = 0;
      this.mood = 'normal';
    }

    this.angryFrame += 1;

    if (this.angryFrame > 100) {} // Change mood to border


    if (this.involvment < 20 && this.mood === 'normal') this.mood = 'bored'; // If walking

    if (this.state === 'walking') {
      this.height = this.frame >= 10 ? utils_1.lerp(this.height, this.spriteHeight - 24, 0.3) : utils_1.lerp(this.height, this.spriteHeight + 4, 0.3);
      this.width = this.frame >= 10 ? utils_1.lerp(this.width, this.spriteWidth + 16, 0.2) : utils_1.lerp(this.width, this.spriteWidth - 4, 0.2);

      if (this.direction === 'left') {
        this.x -= utils_1.convertRange(this.y, {
          min: 0,
          max: height
        }, {
          min: 0,
          max: 2
        });
        if (this.x <= -this.width) this.x = width + this.width;
      } else {
        this.x += utils_1.convertRange(this.y, {
          min: 0,
          max: height
        }, {
          min: 0,
          max: 2
        });
        if (this.x >= width + this.width) this.x = -this.width;
      }
    } // Spawning penguin


    if (this.state === 'spawning') {
      this.width = utils_1.lerp(this.width, this.spriteWidth, 0.1);
      this.height = utils_1.lerp(this.height, this.spriteHeight, 0.1) + 0.1;

      if (this.height >= this.spriteHeight) {
        this.state = 'walking';
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
      }
    } // Removing penguin


    if (this.state === 'leaving') {
      this.width = utils_1.lerp(this.width, 0, 0.05);
      this.height = utils_1.lerp(this.height, 0, 0.1) - 0.05;
      if (this.height <= 10) this.exists = false;
    }
  };

  return Penguin;
}();

exports.Penguin = Penguin;
},{"./fish":"core/entities/fish.ts","../state":"core/state.ts","../utils":"core/utils.ts","../../sprites/penguin-left.png":"sprites/penguin-left.png","../../sprites/penguin-right.png":"sprites/penguin-right.png","../../sprites/penguin-left-angry.png":"sprites/penguin-left-angry.png","../../sprites/penguin-right-angry.png":"sprites/penguin-right-angry.png","../../sprites/penguin-left-bored.png":"sprites/penguin-left-bored.png","../../sprites/penguin-right-bored.png":"sprites/penguin-right-bored.png"}],"sprites/stone.png":[function(require,module,exports) {
module.exports = "/stone.4bd862cc.png";
},{}],"sprites/penguin-anthena.png":[function(require,module,exports) {
module.exports = "/penguin-anthena.fb829907.png";
},{}],"sprites/main-penguin.png":[function(require,module,exports) {
module.exports = "/main-penguin.5c99e3b8.png";
},{}],"sprites/main-penguin-loudspeaker.png":[function(require,module,exports) {
module.exports = "/main-penguin-loudspeaker.7b7c1725.png";
},{}],"core/entities/player.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Player = void 0;

var state_1 = require("../state");

var utils_1 = require("../utils"); // Sprites


var stone_png_1 = __importDefault(require("../../sprites/stone.png"));

var penguin_anthena_png_1 = __importDefault(require("../../sprites/penguin-anthena.png"));

var main_penguin_png_1 = __importDefault(require("../../sprites/main-penguin.png"));

var main_penguin_loudspeaker_png_1 = __importDefault(require("../../sprites/main-penguin-loudspeaker.png")); // Sounds


var audio_1 = require("../audio"); // Preload images


var stone = utils_1.loadImage(stone_png_1.default);
var anthenaPenguin = utils_1.loadImage(penguin_anthena_png_1.default);
var mainPenguin = utils_1.loadImage(main_penguin_png_1.default);
var mainPenguinLoudspeaker = utils_1.loadImage(main_penguin_loudspeaker_png_1.default); // Global game state

var GAME = state_1.State();

var Player =
/** @class */
function () {
  /**
   * Player initialization
   */
  function Player() {
    this.type = 'player';
    this.stoneSpriteHeight = 400;
    this.stoneSpriteWidth = 400;
    this.penguinSpriteHeight = 98;
    this.penguinSpriteWidth = 98;
    this.penguinOffsetX = 48;
    this.penguinOffsetY = -50;
    this.anthenaPenguinSpriteHeight = 98;
    this.anthenaPenguinSpriteWidth = 98;
    this.anthenaPenguinOffsetX = 85;
    this.anthenaPenguinOffsetY = -232;
    this.x = GAME.element.width / 2;
    this.y = GAME.element.height / 1.75;
    this.width = this.penguinSpriteWidth;
    this.height = this.penguinSpriteHeight;
    this.exists = true;
    this.frame = 0;
    this.speakFrame = 0;
    this.state = 'idle';
    this.anthenaFrame = 0;
    this.anthenaWidth = this.anthenaPenguinSpriteWidth;
    this.anthenaHeight = this.anthenaPenguinSpriteHeight;
  }
  /**
   * Draw sprite on canvas
   */


  Player.prototype.draw = function () {
    var ctx = GAME.ctx;
    var size = utils_1.convertRange(this.y, {
      min: 0,
      max: GAME.element.height
    }, {
      min: 0,
      max: 2
    });
    var posY = utils_1.convertRange(this.y, {
      min: 0,
      max: GAME.element.height
    }, {
      min: GAME.element.height / 5,
      max: GAME.element.height
    });
    var sprite = this.state === 'speaking' ? mainPenguinLoudspeaker : mainPenguin;
    ctx.save();
    ctx.translate(this.x, posY);
    ctx.scale(size, size);
    ctx.drawImage(stone, -(this.stoneSpriteWidth / 2), -this.stoneSpriteHeight + 48, this.stoneSpriteWidth, this.stoneSpriteHeight);
    ctx.drawImage(anthenaPenguin, -(this.anthenaWidth / 2) + this.anthenaPenguinOffsetX, -(this.anthenaHeight + 16) + this.anthenaPenguinOffsetY, this.anthenaWidth, this.anthenaHeight);
    ctx.drawImage(sprite, -(this.width / 2) + this.penguinOffsetX, -(this.height + 16) + this.penguinOffsetY, this.width, this.height);
    ctx.restore();
  };
  /**
   * Update player state
   */


  Player.prototype.update = function () {
    this.x = Math.floor(GAME.element.width / 2);
    this.y = Math.floor(GAME.element.height / 1.75); // Frame update

    this.frame += 1;

    if (this.frame > 100) {
      this.frame = 0;
    } // Athena character frame update


    this.anthenaFrame += 1;

    if (this.anthenaFrame > 60) {
      this.anthenaFrame = 0;
    } // Anthena character


    if (this.anthenaFrame > 30) {
      this.anthenaHeight = utils_1.lerp(this.anthenaHeight, this.anthenaPenguinSpriteHeight - 16, 0.1);
      this.anthenaWidth = utils_1.lerp(this.anthenaWidth, this.anthenaPenguinSpriteWidth + 16, 0.1);
    } else {
      this.anthenaHeight = utils_1.lerp(this.anthenaHeight, this.anthenaPenguinSpriteHeight, 0.1);
      this.anthenaWidth = utils_1.lerp(this.anthenaWidth, this.anthenaPenguinSpriteWidth, 0.1);
    } // Idle state


    if (this.state === 'idle') {
      if (this.frame > 50) {
        this.height = utils_1.lerp(this.height, this.penguinSpriteHeight, 0.05);
        this.width = utils_1.lerp(this.width, this.penguinSpriteWidth, 0.05);
      } else {
        this.height = utils_1.lerp(this.height, this.penguinSpriteHeight - 16, 0.05);
        this.width = utils_1.lerp(this.width, this.penguinSpriteWidth + 8, 0.05);
      }
    } // Speaking animation


    if (this.state === 'speaking') {
      this.frame += 8;
      this.speakFrame += 1;
      if (this.speakFrame === 1) audio_1.playSpeachSound();

      if (this.frame > 50) {
        this.height = utils_1.lerp(this.height, this.penguinSpriteHeight + 16, 0.1);
        this.width = utils_1.lerp(this.width, this.penguinSpriteWidth - 8, 0.1);
      } else {
        this.height = utils_1.lerp(this.height, this.penguinSpriteHeight - 32, 0.1);
        this.width = utils_1.lerp(this.width, this.penguinSpriteWidth + 16, 0.1);
      }
    } // Stop speaking after some frames


    if (this.speakFrame > 100) {
      this.speakFrame = 0;
      this.state = 'idle';
    }
  };

  return Player;
}();

exports.Player = Player;
},{"../state":"core/state.ts","../utils":"core/utils.ts","../../sprites/stone.png":"sprites/stone.png","../../sprites/penguin-anthena.png":"sprites/penguin-anthena.png","../../sprites/main-penguin.png":"sprites/main-penguin.png","../../sprites/main-penguin-loudspeaker.png":"sprites/main-penguin-loudspeaker.png","../audio":"core/audio.ts"}],"core/main.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var stats_js_1 = __importDefault(require("stats.js"));

var state_1 = require("./state");

var timers_1 = require("./timers");

var utils_1 = require("./utils");

var audio_1 = require("./audio");

var coefficents_json_1 = require("../coefficents.json"); // Entities


var penguin_1 = require("./entities/penguin");

var player_1 = require("./entities/player"); // Stats setup


var stats = new stats_js_1.default();
stats.showPanel(0);
if ("development" === 'development') document.body.appendChild(stats.dom); // Get state

var GAME = state_1.State(); // Spawn main penguin player

var player = new player_1.Player();
GAME.penguins.push(player); // Spawn penguins

for (var i = 0; i < 10; i++) {
  var x = utils_1.randomInteger(0, GAME.element.width);
  var y = utils_1.randomInteger(GAME.element.height / 3, GAME.element.height - 64);
  var penguin = new penguin_1.Penguin(x, y);
  GAME.penguins.push(penguin);
} // Sort penguins


utils_1.insertionSort(GAME.penguins, 'y'); // Main loop

function loop() {
  // If game paused
  if (GAME.paused) {
    window.requestAnimationFrame(loop);
    return;
  } //Game ends


  if (checkEnd()) {
    GAME.paused = true;
    document.getElementById('final-fish-count').innerText = "" + GAME.fish;
    document.getElementById('end-screen').style.transform = 'translate( -50%, -50%)';
    overlay.style.opacity = '1';
    overlay.style.pointerEvents = 'auto';
    return;
  }

  stats.begin(); // Update entities

  for (var i = 0; i < GAME.penguins.length; i++) {
    GAME.penguins[i].update();
  }

  for (var i = 0; i < GAME.entities.length; i++) {
    GAME.entities[i].update();
  } // Remove all deleted entities


  GAME.penguins = GAME.penguins.filter(function (entity) {
    return entity.exists;
  });
  GAME.entities = GAME.entities.filter(function (entity) {
    return entity.exists;
  }); // Clean screen

  GAME.ctx.clearRect(0, 0, GAME.element.width, GAME.element.height); // Draw entities

  for (var i = 0; i < GAME.penguins.length; i++) {
    GAME.penguins[i].draw();
  }

  for (var i = 0; i < GAME.entities.length; i++) {
    GAME.entities[i].draw();
  }

  stats.end();
  window.requestAnimationFrame(loop);
} // Relevance update


timers_1.requestInterval(function () {
  if (!GAME.started) return;
  GAME.relevance -= GAME.coefficents.relevanceDeduction;
  if (GAME.relevance > 1.5) GAME.relevance -= GAME.coefficents.relevanceDeduction;
  if (GAME.relevance < 0) GAME.relevance = 0;
  if (GAME.relevance > 2) GAME.relevance = 2;
}, 1000); // Spawn penguins

timers_1.requestInterval(function () {
  if (!GAME.started) return;
  var penguinsAmount = GAME.penguins.length - 1; // Calculate amount of penguins to spawn

  var toSpawn = Math.ceil(penguinsAmount * GAME.coefficents.penguinsMultiplier);
  if (GAME.relevance > 1.5) toSpawn += 1; // Skip spawning if too much penguins

  if (penguinsAmount > GAME.coefficents.maximumPenguins) return; // Spawn penguins

  for (var i = 0; i < toSpawn; i++) {
    var x = utils_1.randomInteger(0, GAME.element.width);
    var y = utils_1.randomInteger(GAME.element.height / 4, GAME.element.height - 64);
    var penguin = new penguin_1.Penguin(x, y);
    GAME.penguins.push(penguin);
  } // Depth sort


  utils_1.insertionSort(GAME.penguins, 'y');
}, 1000); // Update coefficents

timers_1.requestInterval(function () {
  var score = GAME.score;

  for (var i = 0; i < coefficents_json_1.levels.length; i++) {
    var level = coefficents_json_1.levels[i];

    if (level.score <= score) {
      GAME.level = level.level;
      GAME.coefficents.relevanceDeduction = level.relevanceDeduction;
      GAME.coefficents.relevanceAddition = level.relevanceAddition;
      GAME.coefficents.maximumPenguins = level.maximumPenguins;
      GAME.coefficents.penguinsMultiplier = level.penguinsMultiplier;
      GAME.coefficents.penguinsInvolvment = level.penguinsInvolvment;
      GAME.coefficents.newsUpadateDelay = level.newsUpadateDelay;
      GAME.coefficents.fishDespawnFrames = level.fishDespawnFrames;
      continue;
    }

    break;
  }

  console.log(GAME.level, GAME.score);
}, 1000);
var overlay = document.getElementById('overlay');
overlay.style.opacity = '1'; //starts the game

document.getElementById('start-button').onclick = function () {
  loop();
  audio_1.startMusic();
  GAME.paused = false;
  overlay.style.opacity = '0';
  document.getElementById('start-menu').remove();
}; //reload button on screen


document.getElementById('end-button').onclick = function () {
  location.reload();
};

function checkEnd() {
  if (GAME.penguins.length - 1 === 0 || GAME.relevance === 0) {
    return true;
  }
}
},{"stats.js":"../node_modules/stats.js/build/stats.min.js","./state":"core/state.ts","./timers":"core/timers.ts","./utils":"core/utils.ts","./audio":"core/audio.ts","../coefficents.json":"coefficents.json","./entities/penguin":"core/entities/penguin.ts","./entities/player":"core/entities/player.ts"}],"sprites/gaming.png":[function(require,module,exports) {
module.exports = "/gaming.f5fc4fcc.png";
},{}],"sprites/Educational.png":[function(require,module,exports) {
module.exports = "/Educational.220ec149.png";
},{}],"sprites/films.png":[function(require,module,exports) {
module.exports = "/films.2bb78905.png";
},{}],"sprites/Music.png":[function(require,module,exports) {
module.exports = "/Music.46ba91ca.png";
},{}],"sprites/politics.png":[function(require,module,exports) {
module.exports = "/politics.bccde534.png";
},{}],"sprites/sport.png":[function(require,module,exports) {
module.exports = "/sport.ffb2f0da.png";
},{}],"core/FallersRain.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var utils_1 = require("./utils"); // Images


var gaming_png_1 = __importDefault(require("../sprites/gaming.png"));

var Educational_png_1 = __importDefault(require("../sprites/Educational.png"));

var films_png_1 = __importDefault(require("../sprites/films.png"));

var Music_png_1 = __importDefault(require("../sprites/Music.png"));

var politics_png_1 = __importDefault(require("../sprites/politics.png"));

var sport_png_1 = __importDefault(require("../sprites/sport.png"));

var FALLER_CFG;

(function (FALLER_CFG) {
  FALLER_CFG[FALLER_CFG["FrontSpeed"] = 2] = "FrontSpeed";
  FALLER_CFG[FALLER_CFG["BackSpeed"] = 1] = "BackSpeed";
  FALLER_CFG[FALLER_CFG["FrontScale"] = 0.8] = "FrontScale";
  FALLER_CFG[FALLER_CFG["BackScale"] = 0.4] = "BackScale";
  FALLER_CFG[FALLER_CFG["TopDownScaleDiff"] = 0.3] = "TopDownScaleDiff";
  FALLER_CFG[FALLER_CFG["MaxRotSpeed"] = 0.01] = "MaxRotSpeed";
  FALLER_CFG[FALLER_CFG["MinRotSpeed"] = 0.004] = "MinRotSpeed";
  FALLER_CFG[FALLER_CFG["TotalFallers"] = 25] = "TotalFallers";
})(FALLER_CFG || (FALLER_CFG = {}));

function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function unitRangeToRange(value, min, max) {
  return utils_1.convertRange(value, {
    min: 0,
    max: 1
  }, {
    min: min,
    max: max
  });
}

var FallersRain =
/** @class */
function () {
  function FallersRain(canvas) {
    var _this = this;

    this.fallers = [];
    this.images = [];

    this.loop = function () {
      console.log('loop()'); // Finish the loop if `this.finished == true`. ADDED: also auto-finishes when canvas is removed from the DOM

      if (_this.finished || _this.ctx.canvas.id !== '' && !document.getElementById(_this.ctx.canvas.id)) {
        return;
      }

      _this.update();

      requestAnimationFrame(_this.loop);
    };

    requestAnimationFrame(this.loop); // If this.loop (from requestAnimationFrame) will run when `finished=true`, the animation will be finished (loop won't loop anymore)

    this.finished = false; // Resize canvas, get ctx

    canvas = canvas;
    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;
    this.ctx = canvas.getContext('2d'); // Load images

    this.imagesToLoad = 0;
    this.loadImages(gaming_png_1.default, Educational_png_1.default, films_png_1.default, Music_png_1.default, politics_png_1.default, sport_png_1.default);
  }

  FallersRain.prototype.spawnFallers = function () {
    for (var i = 0; i < FALLER_CFG.TotalFallers; i++) {
      var faller = this.createFaller(false, i);
      this.fallers.push(faller);
    }

    utils_1.insertionSort(this.fallers, 'depth');
    this.fallers.reverse();
  };

  FallersRain.prototype.loadImages = function () {
    var _this = this;

    var imagePaths = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      imagePaths[_i] = arguments[_i];
    }

    imagePaths.forEach(function (path) {
      _this.imagesToLoad++;
      var img = utils_1.loadImage(path);

      _this.images.push(img);

      console.log("New image starts loading. " + _this.imagesToLoad + " images to be load.");
      img.addEventListener('load', function () {
        _this.imagesToLoad--;
        console.log("Image loaded. " + _this.imagesToLoad + " images remain.");
      });
    });
  };

  FallersRain.prototype.createFaller = function (fromTop, index) {
    if (fromTop === void 0) {
      fromTop = false;
    }

    var randomImageIndex = utils_1.randomInteger(0, this.images.length - 1);
    var imageWidth = this.images[randomImageIndex].width;
    var imageHeight = this.images[randomImageIndex].height;
    var canvas = this.ctx.canvas;
    var maxX = canvas.width - imageWidth - 1;
    var minX = 0;
    var maxY = canvas.height - imageHeight - 1;
    var minY = -imageHeight;
    var total1D = Math.floor(Math.sqrt(FALLER_CFG.TotalFallers));
    var x = (maxX - minX) / total1D * (index % total1D + randomFloat(0, 1)) + minX;
    var y = (maxY - minY) / total1D * (index / total1D + randomFloat(0, 1)) + minY;
    y = fromTop ? minY : y;
    var initialRot = utils_1.randomInteger(0, Math.PI * 2);
    var faller = {
      x: x,
      y: y,
      depth: Math.random(),
      imageIndex: randomImageIndex,
      rot: initialRot,
      rotSpeed: randomFloat(FALLER_CFG.MinRotSpeed, FALLER_CFG.MaxRotSpeed),
      width: imageWidth,
      height: imageHeight
    };
    return faller;
  };

  FallersRain.prototype.update = function () {
    var _this = this; // Spawn fallers when all images are loaded


    if (this.imagesToLoad <= 0 && this.fallers.length === 0) {
      this.spawnFallers();
    } // console.log('update()');


    var ctx = this.ctx;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    this.fallers.forEach(function (faller, index) {
      var speed = unitRangeToRange(faller.depth, FALLER_CFG.FrontSpeed, FALLER_CFG.BackSpeed);
      var scale = unitRangeToRange(faller.depth, FALLER_CFG.FrontScale, FALLER_CFG.BackScale) + utils_1.convertRange(faller.y, {
        min: 0,
        max: ctx.canvas.height
      }, {
        min: FALLER_CFG.TopDownScaleDiff / 2,
        max: -FALLER_CFG.TopDownScaleDiff / 2
      });
      faller.y += speed;

      if (faller.y > _this.ctx.canvas.height) {
        _this.fallers[index] = _this.createFaller(true, index);
        _this.fallers[index].depth = faller.depth;
      }

      faller.rot += faller.rotSpeed;
      ctx.save();
      ctx.translate(faller.x + faller.width / 2, faller.y + faller.height / 2);
      ctx.rotate(faller.rot);
      ctx.scale(scale, scale);
      ctx.drawImage(_this.images[faller.imageIndex], -faller.width / 2, -faller.height / 2);
      ctx.restore();
    });
  };

  FallersRain.prototype.finish = function () {
    this.finished = true;
  };

  return FallersRain;
}();

exports.default = FallersRain;
},{"./utils":"core/utils.ts","../sprites/gaming.png":"sprites/gaming.png","../sprites/Educational.png":"sprites/Educational.png","../sprites/films.png":"sprites/films.png","../sprites/Music.png":"sprites/Music.png","../sprites/politics.png":"sprites/politics.png","../sprites/sport.png":"sprites/sport.png"}],"index.ts":[function(require,module,exports) {
"use strict";

var __spreadArrays = this && this.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var state_1 = require("./core/state");

var utils_1 = require("./core/utils"); // Array of news


var content_json_1 = require("./content.json");

var coefficents_json_1 = require("./coefficents.json"); // Setup canvas element


var stage = document.getElementById('stage');
stage.width = window.innerWidth * window.devicePixelRatio;
stage.height = window.innerHeight * window.devicePixelRatio; // Setup canvas context

var ctx = stage.getContext('2d'); // Sort levels by their score

utils_1.insertionSort(coefficents_json_1.levels, 'score'); // State initialization

state_1.State({
  paused: true,
  element: stage,
  ctx: ctx,
  mouseX: 0,
  mouseY: 0,
  mouseDown: false,
  entities: [],
  penguins: [],
  started: false,
  fish: 0,
  relevance: 1,
  score: 0,
  level: 0,
  moods: coefficents_json_1.moods,
  coefficents: {
    relevanceDeduction: coefficents_json_1.levels[0].relevanceDeduction,
    relevanceAddition: coefficents_json_1.levels[0].relevanceAddition,
    maximumPenguins: coefficents_json_1.levels[0].maximumPenguins,
    penguinsMultiplier: coefficents_json_1.levels[0].penguinsMultiplier,
    penguinsInvolvment: coefficents_json_1.levels[0].penguinsInvolvment,
    newsUpadateDelay: coefficents_json_1.levels[0].newsUpadateDelay,
    fishDespawnFrames: coefficents_json_1.levels[0].fishDespawnFrames
  },
  news: utils_1.shuffle(__spreadArrays(content_json_1.real_news)),
  newsIndex: 0,
  selectedNewsIndex: 0
}); // Input module

require("./core/input"); // Game UI


require("./core/gui"); // Main game code


require("./core/main"); // TO BE MOVED SOMEWHERE


var FallersRain_1 = __importDefault(require("./core/FallersRain"));

new FallersRain_1.default(document.getElementById('start-menu-canvas'));
},{"./core/state":"core/state.ts","./core/utils":"core/utils.ts","./content.json":"content.json","./coefficents.json":"coefficents.json","./core/input":"core/input.ts","./core/gui":"core/gui.ts","./core/main":"core/main.ts","./core/FallersRain":"core/FallersRain.ts"}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "65298" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/src2.77de5100.js.map