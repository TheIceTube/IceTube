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
})({"state.ts":[function(require,module,exports) {
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
},{}],"utils.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.randomFromArray = exports.shuffle = exports.convertRange = exports.randomInteger = exports.insertionSort = exports.preloadImage = exports.loadImage = exports.lerp = void 0;
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
 * Sort objects by field
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
},{}],"content.json":[function(require,module,exports) {
module.exports = {
  "news": [{
    "title": "U.S. Elections!",
    "content": "In a week we will know who will be the new president of the United States",
    "gaming": 1,
    "music": 1,
    "films": 3,
    "sport": 2,
    "news": 10,
    "educational": 6
  }]
};
},{}],"input.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var state_1 = require("./state"); // Get game state


var GAME = state_1.State(); // On window resize

window.addEventListener('resize', function () {
  GAME.stage.width = window.innerWidth * window.devicePixelRatio;
  GAME.stage.height = window.innerHeight * window.devicePixelRatio;
  GAME.skyline = GAME.stage.height / 5;
}); // Mouse position calculation

GAME.stage.addEventListener('mousemove', function (event) {
  var rect = GAME.stage.getBoundingClientRect();
  GAME.mouseX = (event.clientX - rect.left) / (rect.right - rect.left) * GAME.stage.width;
  GAME.mouseY = (event.clientY - rect.top) / (rect.bottom - rect.top) * GAME.stage.height;
}); // On mouse down

GAME.stage.addEventListener('mousedown', function () {
  GAME.mouseDown = true;
}); // On mouse up

GAME.stage.addEventListener('mouseup', function () {
  GAME.mouseDown = false;
});
},{"./state":"state.ts"}],"ui.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var state_1 = require("./state"); // Get state


var GAME = state_1.State();
var news = document.getElementById('news');
var newPost = document.getElementById('newPost');
var overlay = document.getElementById('overlay');
var modal = document.getElementById('modal');
var menu = document.getElementById("menu");
var pause = document.getElementById("pauseMenu"); // UI

newPost.addEventListener('click', function () {
  modal.style.top = '45%';
  overlay.style.opacity = '1';
  overlay.style.pointerEvents = 'auto';
  GAME.stage.style.transform = 'scale(2) translateY(64px)';
});
overlay.addEventListener('click', function () {
  menu.style.left = '-150%';
  modal.style.top = '150%';
  overlay.style.opacity = '0';
  overlay.style.pointerEvents = 'none';
  GAME.stage.style.transform = 'scale(1)';
});
pause.addEventListener('click', function () {
  menu.style.left = '50%';
  overlay.style.opacity = '1';
  overlay.style.pointerEvents = 'auto';
});
setInterval(function () {
  news.classList.add('updating');
  setTimeout(function () {
    news.classList.remove('updating');
  }, 1000);
}, 20000);
},{"./state":"state.ts"}],"../node_modules/stats.js/build/stats.min.js":[function(require,module,exports) {
var define;
// stats.js - http://github.com/mrdoob/stats.js
(function(f,e){"object"===typeof exports&&"undefined"!==typeof module?module.exports=e():"function"===typeof define&&define.amd?define(e):f.Stats=e()})(this,function(){var f=function(){function e(a){c.appendChild(a.dom);return a}function u(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?"block":"none";l=a}var l=0,c=document.createElement("div");c.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000";c.addEventListener("click",function(a){a.preventDefault();
u(++l%c.children.length)},!1);var k=(performance||Date).now(),g=k,a=0,r=e(new f.Panel("FPS","#0ff","#002")),h=e(new f.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var t=e(new f.Panel("MB","#f08","#201"));u(0);return{REVISION:16,dom:c,addPanel:e,showPanel:u,begin:function(){k=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();h.update(c-k,200);if(c>g+1E3&&(r.update(1E3*a/(c-g),100),g=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/
1048576,d.jsHeapSizeLimit/1048576)}return c},update:function(){k=this.end()},domElement:c,setMode:u}};f.Panel=function(e,f,l){var c=Infinity,k=0,g=Math.round,a=g(window.devicePixelRatio||1),r=80*a,h=48*a,t=3*a,v=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement("canvas");q.width=r;q.height=h;q.style.cssText="width:80px;height:48px";var b=q.getContext("2d");b.font="bold "+9*a+"px Helvetica,Arial,sans-serif";b.textBaseline="top";b.fillStyle=l;b.fillRect(0,0,r,h);b.fillStyle=f;b.fillText(e,t,v);
b.fillRect(d,m,n,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d,m,n,p);return{dom:q,update:function(h,w){c=Math.min(c,h);k=Math.max(k,h);b.fillStyle=l;b.globalAlpha=1;b.fillRect(0,0,r,m);b.fillStyle=f;b.fillText(g(h)+" "+e+" ("+g(c)+"-"+g(k)+")",t,v);b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p);b.fillRect(d+n-a,m,a,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d+n-a,m,a,g((1-h/w)*p))}}};return f});

},{}],"sprites/penguin-left.png":[function(require,module,exports) {
module.exports = "/penguin-left.1f426071.png";
},{}],"sprites/penguin-right.png":[function(require,module,exports) {
module.exports = "/penguin-right.cc96b153.png";
},{}],"entities/penguin.ts":[function(require,module,exports) {
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

var state_1 = require("../state");

var utils_1 = require("../utils"); // Sprites


var penguin_left_png_1 = __importDefault(require("../sprites/penguin-left.png"));

var penguin_right_png_1 = __importDefault(require("../sprites/penguin-right.png")); // Preload images


var penguinLeft = utils_1.loadImage(penguin_left_png_1.default);
var penguinRight = utils_1.loadImage(penguin_right_png_1.default); // Global game state

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
    this.width = this.spriteWidth;
    this.height = 0;
  }
  /**
   * Draw penguin
   */


  Penguin.prototype.draw = function () {
    var sprite = this.direction === 'left' ? penguinLeft : penguinRight;
    var size = utils_1.convertRange(this.y, {
      min: 0,
      max: GAME.stage.height
    }, {
      min: 0,
      max: 2
    });
    var posY = utils_1.convertRange(this.y, {
      min: 0,
      max: GAME.stage.height
    }, {
      min: GAME.skyline,
      max: GAME.stage.height
    }); // Skip drawing if its reversed

    if (size < 0) return;
    GAME.ctx.save();
    GAME.ctx.translate(this.x, posY);
    GAME.ctx.scale(size, size);
    GAME.ctx.drawImage(sprite, -(this.width / 2), -this.height + 18, this.width, this.height);
    GAME.ctx.restore();
  };
  /**
   * Update penguin state
   */


  Penguin.prototype.update = function () {
    var width = GAME.stage.width;
    var height = GAME.stage.height; // Update frame

    this.frame += 1;
    if (this.frame > 20) this.frame = 0; // If fixed to mouse

    if (this.state === 'fixed') {
      this.height = this.spriteHeight;
      this.x = GAME.mouseX;
      this.y = utils_1.convertRange(GAME.mouseY, {
        min: GAME.skyline,
        max: height
      }, {
        min: 0,
        max: height
      });
      return;
    } // If walking


    if (this.state === 'walking') {
      this.height = this.frame >= 10 ? utils_1.lerp(this.height, this.spriteHeight - 24, 0.3) : utils_1.lerp(this.height, this.spriteHeight + 4, 0.3);

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

      if (this.x <= -100) this.x = width;
    } // Spawning penguin


    if (this.state === 'spawning') {
      this.height = utils_1.lerp(this.height, this.spriteHeight, 0.1) + 0.1;
      if (this.height >= this.spriteHeight) this.state = 'walking';
    } // Removing penguin


    if (this.state === 'leaving') {
      this.height = utils_1.lerp(this.height, 0, 0.1) - 0.05;
    }
  };

  return Penguin;
}();

exports.Penguin = Penguin;
},{"../state":"state.ts","../utils":"utils.ts","../sprites/penguin-left.png":"sprites/penguin-left.png","../sprites/penguin-right.png":"sprites/penguin-right.png"}],"sprites/billboard.png":[function(require,module,exports) {
module.exports = "/billboard.17fd01cd.png";
},{}],"entities/billboard.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Billboard = void 0;

var state_1 = require("../state");

var utils_1 = require("../utils"); // Sprites


var billboard_png_1 = __importDefault(require("../sprites/billboard.png")); // Preload images


var billboard = utils_1.loadImage(billboard_png_1.default); // Global game state

var GAME = state_1.State();

var Billboard =
/** @class */
function () {
  /**
   * Billboard initialization
   */
  function Billboard() {
    this.views = 0;
    this.x = GAME.stage.width / 2;
    this.y = GAME.stage.height / 1.5;
    this.width = 400;
    this.height = 400;
  }
  /**
   * Draw sprite on canvas
   */


  Billboard.prototype.draw = function () {
    var ctx = GAME.ctx;
    var size = utils_1.convertRange(this.y, {
      min: 0,
      max: GAME.stage.height
    }, {
      min: 0,
      max: 2
    });
    var posY = utils_1.convertRange(this.y, {
      min: 0,
      max: GAME.stage.height
    }, {
      min: GAME.skyline,
      max: GAME.stage.height
    });
    ctx.save();
    ctx.translate(this.x, posY);
    ctx.scale(size, size);
    ctx.drawImage(billboard, -(this.width / 2), -this.height + 32, this.width, this.height);
    ctx.restore();
    ctx.font = 'italic 24px Segoe UI';
    ctx.textAlign = 'center';
    ctx.fillText("Views: " + this.views, this.x, this.y - 270);
  };
  /**
   * Update billboard state
   */


  Billboard.prototype.update = function () {
    this.x = GAME.stage.width / 2;
    this.y = GAME.stage.height / 1.5;
    this.views += 1;
  };

  return Billboard;
}();

exports.Billboard = Billboard;
},{"../state":"state.ts","../utils":"utils.ts","../sprites/billboard.png":"sprites/billboard.png"}],"game.ts":[function(require,module,exports) {
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

var utils_1 = require("./utils"); // Entities


var penguin_1 = require("./entities/penguin");

var billboard_1 = require("./entities/billboard"); // Stats setup


var stats = new stats_js_1.default();
stats.showPanel(0);
document.body.appendChild(stats.dom); // Get state

var GAME = state_1.State(); // Spawn penguins

for (var i = 0; i < 50; i++) {
  var x = utils_1.randomInteger(0, GAME.stage.width);
  var y = utils_1.randomInteger(GAME.stage.height / 3, GAME.stage.height - 64);
  var penguin = new penguin_1.Penguin(x, y); // Fixed penguin

  if (i === 0) penguin.state = 'fixed';
  GAME.entities.push(penguin);
} // Spawn billboard


var billboard = new billboard_1.Billboard();
GAME.entities.push(billboard); // Main loop

function loop() {
  stats.begin(); // Sort entities for 3d effect

  utils_1.insertionSort(GAME.entities, 'y'); // Update entities

  for (var i = 0; i < GAME.entities.length; i++) {
    GAME.entities[i].update();
  } // Clean screen


  GAME.ctx.clearRect(0, 0, GAME.stage.width, GAME.stage.height); // Draw entities

  for (var i = 0; i < GAME.entities.length; i++) {
    GAME.entities[i].draw();
  } // Remove entities that height 


  GAME.entities = GAME.entities.filter(function (entity) {
    if (entity.type === 'penguin') return entity.height > 0;
    return true;
  });
  stats.end();
  requestAnimationFrame(loop);
} // Remove penguin from array each seccond


setInterval(function () {
  var index = utils_1.randomFromArray(GAME.entities);
  var entity = GAME.entities[index];

  if (entity.type === 'penguin') {
    entity.state = 'leaving';
  }
}, 1000); // Start game

loop();
},{"stats.js":"../node_modules/stats.js/build/stats.min.js","./state":"state.ts","./utils":"utils.ts","./entities/penguin":"entities/penguin.ts","./entities/billboard":"entities/billboard.ts"}],"index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var state_1 = require("./state");

var utils_1 = require("./utils"); // Array of news


var content_json_1 = require("./content.json"); // Setup canvas element


var stage = document.getElementById('stage');
stage.width = window.innerWidth * window.devicePixelRatio;
stage.height = window.innerHeight * window.devicePixelRatio; // Setup canvas context

var ctx = stage.getContext('2d');
ctx.imageSmoothingEnabled = false; // State initialization

var GAME = state_1.State({
  stage: stage,
  ctx: ctx,
  mouseX: 0,
  mouseY: 0,
  mouseDown: false,
  skyline: stage.height / 5,
  allNews: utils_1.shuffle(content_json_1.news),
  entities: []
}); // Input module

require("./input"); // Game UI


require("./ui"); // Main game code


require("./game");
},{"./state":"state.ts","./utils":"utils.ts","./content.json":"content.json","./input":"input.ts","./ui":"ui.ts","./game":"game.ts"}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61964" + '/');

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
//# sourceMappingURL=/src.77de5100.js.map