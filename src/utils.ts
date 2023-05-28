export const initCanvas = (canvas?: string | HTMLCanvasElement) => {
  if (!canvas) {
    const cvs = document.createElement('canvas');
    document.body.appendChild(cvs);
    return cvs;
  }
  if (typeof canvas === 'string') {
    return document.querySelector(`#${canvas}`);
  }
  if (canvas instanceof HTMLCanvasElement) {
    return canvas;
  }
  throw '参数错误';
};
