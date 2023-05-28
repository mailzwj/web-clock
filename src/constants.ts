export const defaultOption: IClock.IOption = {
  theme: 'apple-dark',
  width: 240,
  height: 240,
  dpi: 2
};

export const themes: Record<string, IClock.ITheme> = {
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
