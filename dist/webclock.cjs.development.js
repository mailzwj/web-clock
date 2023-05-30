'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

var defaultOption = {
  theme: 'apple-dark',
  width: 240,
  height: 240,
  dpi: 2
};
var themes = {
  'apple-dark': {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    faceColor: '#fff',
    hourScaleColor: 'rgba(0, 0, 0, 0.6)',
    minuteScaleColor: 'rgba(0, 0, 0, 0.3)',
    textColor: 'rgba(0, 0, 0, 0.6)',
    hourPointerColor: 'rgba(0, 0, 0, 0.85)',
    minutePointerColor: 'rgba(0, 0, 0, 0.85)',
    milliPointerColor: 'rgba(242, 162, 60, 1)',
    centerCircleColor: '#fff'
  },
  'apple-light': {
    backgroundColor: '#fff',
    faceColor: 'rgba(0, 0, 0, 1)',
    hourScaleColor: 'rgba(255, 255, 255, 0.6)',
    minuteScaleColor: 'rgba(255, 255, 255, 0.3)',
    textColor: 'rgba(255, 255, 255, 0.6)',
    hourPointerColor: 'rgba(255, 255, 255, 0.85)',
    minutePointerColor: 'rgba(255, 255, 255, 0.85)',
    milliPointerColor: 'rgba(242, 162, 60, 1)',
    centerCircleColor: '#fff'
  },
  'mi': {
    backgroundColor: 'rgba(238, 113, 46, 1)',
    faceColor: '#fff',
    hourScaleColor: 'rgba(238, 113, 46, 0.6)',
    minuteScaleColor: 'rgba(238, 113, 46, 0.3)',
    textColor: 'rgba(238, 113, 46, 1)',
    hourPointerColor: 'rgba(238, 113, 46, 1)',
    minutePointerColor: 'rgba(238, 113, 46, 1)',
    milliPointerColor: 'rgba(242, 162, 60, 1)',
    centerCircleColor: '#fff'
  }
};

var initCanvas = function initCanvas(canvas) {
  if (!canvas) {
    var cvs = document.createElement('canvas');
    document.body.appendChild(cvs);
    return cvs;
  }
  if (typeof canvas === 'string') {
    return document.querySelector("#" + canvas);
  }
  if (canvas instanceof HTMLCanvasElement) {
    return canvas;
  }
  throw '参数错误';
};

var draw = function draw(canvas, render) {
  var ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.save();
  ctx.beginPath();
  render(ctx);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
};
var sceneInit = function sceneInit(canvas, option) {
  var width = option.width,
    height = option.height,
    dpi = option.dpi;
  // @ts-ignore
  canvas.style.width = width + "px";
  // @ts-ignore
  canvas.style.width = height + "px";
  // @ts-ignore
  canvas.width = width * dpi;
  // @ts-ignore
  canvas.height = height * dpi;
};
var clearScene = function clearScene(canvas) {
  var ctx = canvas.getContext('2d');
  ctx == null ? void 0 : ctx.clearRect(0, 0, canvas.width, canvas.height);
};
var drawBg = function drawBg(canvas, color) {
  draw(canvas, function (ctx) {
    ctx.fillStyle = color;
    // @ts-ignore
    ctx.roundRect(0, 0, canvas.width, canvas.height, canvas.width * 20 / 240);
  });
};
var drawFace = function drawFace(canvas, color, center) {
  draw(canvas, function (ctx) {
    ctx.fillStyle = color;
    ctx.arc(center.x, center.y, center.radius, 0, 2 * Math.PI);
  });
};
var drawScale = function drawScale(canvas, cfg) {
  // const ctx = canvas.getContext('2d');
  var hourAngle = cfg.hourAngle,
    minuteAngle = cfg.minuteAngle,
    center = cfg.center,
    mainColor = cfg.hourScaleColor,
    subColor = cfg.minuteScaleColor;
  // Draw hour scale
  draw(canvas, function (ctx) {
    ctx.fillStyle = mainColor;
    ctx.translate(center.x, center.y);
    for (var h = 0; h < 12; h++) {
      // @ts-ignore
      ctx.roundRect(-2 * cfg.dpi, -center.radius + 2 * cfg.dpi, 4 * cfg.dpi, center.radius * 0.12, 2 * cfg.dpi);
      ctx.rotate(hourAngle);
    }
  });
  // Draw minute scale
  draw(canvas, function (ctx) {
    ctx.fillStyle = subColor;
    ctx.translate(center.x, center.y);
    for (var m = 0; m < 60; m++) {
      if (m % 5 > 0) {
        // @ts-ignore
        ctx.roundRect(-cfg.dpi, -center.radius + 2 * cfg.dpi, 2 * cfg.dpi, center.radius * 0.09, cfg.dpi);
      }
      ctx.rotate(minuteAngle);
    }
  });
};
var drawNumber = function drawNumber(canvas, cfg) {
  var hourAngle = cfg.hourAngle,
    textColor = cfg.textColor,
    center = cfg.center;
  var textRadius = center.radius * 0.75;
  draw(canvas, function (ctx) {
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = "bold " + center.radius * 0.2 + "px sans-serif";
    ctx.translate(center.x, center.y);
    for (var h = 0; h < 12; h++) {
      // @ts-ignore
      ctx.fillText(h === 0 ? 12 : h, Math.sin(h * hourAngle) * textRadius, -Math.cos(h * hourAngle) * textRadius);
    }
  });
};
var renderHour = function renderHour(canvas, num, cfg) {
  var hourAngle = cfg.hourAngle,
    center = cfg.center;
  var hAngle = num * hourAngle / 3600000;
  draw(canvas, function (ctx) {
    ctx.fillStyle = cfg.hourPointerColor;
    ctx.translate(center.x, center.y);
    ctx.arc(0, 0, 6 * cfg.dpi, 0, 2 * Math.PI);
    ctx.rotate(hAngle);
    // @ts-ignore
    ctx.roundRect(-2 * cfg.dpi, -center.radius * 0.15, 4 * cfg.dpi, center.radius * 0.15, 4 * cfg.dpi);
    // @ts-ignore
    ctx.roundRect(-5 * cfg.dpi, -center.radius * 0.5, 10 * cfg.dpi, center.radius * 0.37, 10 * cfg.dpi);
  });
};
var renderMinute = function renderMinute(canvas, num, cfg) {
  var ctx = canvas.getContext('2d');
  if (!ctx) return;
  var minuteAngle = cfg.minuteAngle,
    center = cfg.center;
  var mAngle = num * minuteAngle / 60000;
  draw(canvas, function (ctx) {
    ctx.fillStyle = cfg.hourPointerColor;
    ctx.translate(center.x, center.y);
    ctx.arc(0, 0, 6 * cfg.dpi, 0, 2 * Math.PI);
    ctx.rotate(mAngle);
    // @ts-ignore
    ctx.roundRect(-2 * cfg.dpi, -center.radius * 0.15, 4 * cfg.dpi, center.radius * 0.15, 4 * cfg.dpi);
    // @ts-ignore
    ctx.roundRect(-4 * cfg.dpi, -center.radius * 0.8, 8 * cfg.dpi, center.radius * 0.67, 8 * cfg.dpi);
  });
};
var renderMillSecond = function renderMillSecond(canvas, num, cfg) {
  var ctx = canvas.getContext('2d');
  if (!ctx) return;
  var milliAngle = cfg.milliAngle,
    center = cfg.center;
  var smAngle = num * milliAngle;
  draw(canvas, function (ctx) {
    ctx.fillStyle = cfg.milliPointerColor;
    ctx.translate(center.x, center.y);
    ctx.arc(0, 0, 6 * cfg.dpi, 0, 2 * Math.PI);
    ctx.rotate(smAngle);
    // @ts-ignore
    ctx.roundRect(-2 * cfg.dpi, -center.radius * 0.88, 4 * cfg.dpi, center.radius, 4 * cfg.dpi);
  });
  draw(canvas, function (ctx) {
    ctx.fillStyle = cfg.centerCircleColor;
    ctx.translate(center.x, center.y);
    ctx.arc(0, 0, 3 * cfg.dpi, 0, 2 * Math.PI);
  });
};
var WebClock = /*#__PURE__*/function () {
  function WebClock(canvas, option) {
    if (option === void 0) {
      option = {};
    }
    this.cvs = initCanvas(canvas);
    this.option = _extends({}, defaultOption, option);
    this.draw();
  }
  var _proto = WebClock.prototype;
  _proto.draw = function draw() {
    var _this = this;
    var circle = 2 * Math.PI;
    var cfg = _extends({}, this.option, themes[this.option.theme || 'apple-dark'], this.option.userTheme || {}, {
      hourAngle: circle / 12,
      minuteAngle: circle / 60,
      secondAngle: circle / 3600,
      milliAngle: circle / 60000
    });
    var d = new Date();
    var hour = d.getHours();
    var minute = d.getMinutes();
    var second = d.getSeconds();
    var millisecond = d.getMilliseconds();
    sceneInit(this.cvs, this.option);
    cfg.center = {
      x: this.cvs.width / 2,
      y: this.cvs.height / 2,
      radius: Math.min(this.cvs.width, this.cvs.height) * 0.45
    };
    clearScene(this.cvs);
    drawBg(this.cvs, cfg.backgroundColor);
    drawFace(this.cvs, cfg.faceColor, cfg.center);
    drawScale(this.cvs, cfg);
    if (cfg.showNumber) {
      drawNumber(this.cvs, cfg);
    }
    renderHour(this.cvs, hour * (3600 * 1000) + minute * 60 * 1000 + second * 1000 + millisecond, cfg);
    renderMinute(this.cvs, minute * 60 * 1000 + second * 1000 + millisecond, cfg);
    renderMillSecond(this.cvs, second * 1000 + millisecond, cfg);
    this.afId = requestAnimationFrame(function () {
      _this.draw();
    });
  };
  _proto.destroy = function destroy() {
    var _this$cvs$parentNode;
    if (this.afId) {
      cancelAnimationFrame(this.afId);
    }
    (_this$cvs$parentNode = this.cvs.parentNode) == null ? void 0 : _this$cvs$parentNode.removeChild(this.cvs);
  };
  return WebClock;
}();

exports.default = WebClock;
//# sourceMappingURL=webclock.cjs.development.js.map
