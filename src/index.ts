import { defaultOption, themes } from "./constants";
import { initCanvas } from "./utils";

const draw = (canvas: HTMLCanvasElement, render: (ctx: CanvasRenderingContext2D) => void) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.save();
  ctx.beginPath();
  render(ctx);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
};

const sceneInit = (canvas: HTMLCanvasElement, option: IClock.IOption) => {
  const { width, height, dpi } = option;
  // @ts-ignore
  canvas.style.width = `${width}px`;
  // @ts-ignore
  canvas.style.width = `${height}px`;
  // @ts-ignore
  canvas.width = width * dpi;
  // @ts-ignore
  canvas.height = height * dpi;
};

const clearScene = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext('2d');
  ctx?.clearRect(0, 0, canvas.width, canvas.height);
};

const drawBg = (canvas: HTMLCanvasElement, color: IClock.IColor) => {
  draw(canvas, (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = color;
    // @ts-ignore
    ctx.roundRect(0, 0, canvas.width, canvas.height, canvas.width * 20 / 240);
  });
};

const drawFace = (canvas: HTMLCanvasElement, color: string, center: IClock.ICenter) => {
  draw(canvas, (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = color;
    ctx.arc(center.x, center.y, center.radius, 0, 2 * Math.PI);
  });
};

const drawScale = (canvas: HTMLCanvasElement, cfg: Record<string, any>) => {
  // const ctx = canvas.getContext('2d');
  const { hourAngle, minuteAngle, center, hourScaleColor: mainColor, minuteScaleColor: subColor } = cfg;
  // Draw hour scale
  draw(canvas, (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = mainColor;
    ctx.translate(center.x, center.y);
    for (let h = 0; h < 12; h++) {
      // @ts-ignore
      ctx.roundRect(-2 * cfg.dpi, -center.radius + 2 * cfg.dpi, 4 * cfg.dpi, center.radius * 0.12, 2 * cfg.dpi);
      ctx.rotate(hourAngle);
    }
  });
  // Draw minute scale
  draw(canvas, (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = subColor;
    ctx.translate(center.x, center.y);
    for (let m = 0; m < 60; m++) {
      if (m % 5 > 0) {
        // @ts-ignore
        ctx.roundRect(-cfg.dpi, -center.radius + 2 * cfg.dpi, 2 * cfg.dpi, center.radius * 0.09, cfg.dpi);
      }
      ctx.rotate(minuteAngle);
    }
  });
};

const drawNumber = (canvas: HTMLCanvasElement, cfg: Record<string, any>) => {
  const { hourAngle, textColor, center } = cfg;
  const textRadius = center.radius * 0.75;
  draw(canvas, (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${center.radius * 0.2}px sans-serif`;
    ctx.translate(center.x, center.y);
    for (let h = 0; h < 12; h++) {
      // @ts-ignore
      ctx.fillText(h === 0 ? 12: h, Math.sin(h * hourAngle) * textRadius, -Math.cos(h * hourAngle) * textRadius);
    }
  });
};

const renderHour = (canvas: HTMLCanvasElement, num: number, cfg: Record<string, any>) => {
  const { hourAngle, center } = cfg;
  const hAngle = num * hourAngle / 3600000;
  draw(canvas, (ctx: CanvasRenderingContext2D) => {
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

const renderMinute = (canvas: HTMLCanvasElement, num: number, cfg: Record<string, any>) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const { minuteAngle, center } = cfg;
  const mAngle = num * minuteAngle / 60000;
  draw(canvas, (ctx: CanvasRenderingContext2D) => {
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

const renderMillSecond = (canvas: HTMLCanvasElement, num: number, cfg: Record<string, any>) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const { milliAngle, center } = cfg;
  const smAngle = num * milliAngle;
  draw(canvas, (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = cfg.milliPointerColor;
    ctx.translate(center.x, center.y);
    ctx.arc(0, 0, 6 * cfg.dpi, 0, 2 * Math.PI);
    ctx.rotate(smAngle);
    // @ts-ignore
    ctx.roundRect(-2 * cfg.dpi, -center.radius * 0.88, 4 * cfg.dpi, center.radius, 4 * cfg.dpi);
  });

  draw(canvas, (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = cfg.centerCircleColor;
    ctx.translate(center.x, center.y);
    ctx.arc(0, 0, 3 * cfg.dpi, 0, 2 * Math.PI);
  });
};

export default class WebClock {
  cvs: HTMLCanvasElement;

  option: IClock.IOption;

  afId: any;

  constructor(canvas: string | HTMLCanvasElement, option: IClock.IOption = {}) {
    this.cvs = initCanvas(canvas) as HTMLCanvasElement;

    this.option = { ...defaultOption, ...option };

    this.draw();
  }

  draw() {
    const circle = 2 * Math.PI;
    const cfg: Record<string, any> = {
      ...this.option,
      ...themes[this.option.theme || 'apple-dark'],
      ...(this.option.userTheme || {}),
      hourAngle: circle / 12,
      minuteAngle: circle / 60,
      secondAngle: circle / 3600,
      milliAngle: circle / 60000
    };
    const d = new Date();
    const hour = d.getHours();
    const minute = d.getMinutes();
    const second = d.getSeconds();
    const millisecond = d.getMilliseconds();
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

    this.afId = requestAnimationFrame(() => {
      this.draw();
    });
  }

  destroy() {
    if (this.afId) {
      cancelAnimationFrame(this.afId);
    }
    this.cvs.parentNode?.removeChild(this.cvs);
  }
}
