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
  }
};
