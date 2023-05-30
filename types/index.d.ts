declare namespace IClock {
  interface IOption {
    theme?: 'apple-dark' | 'apple-light' | 'mi';
    width?: number;
    height?: number;
    dpi?: number;
    showNumber?: boolean;
    userTheme?: IUserTheme;
  };

  type IColor = string | CanvasGradient | CanvasPattern;

  interface ICenter {
    x: number;
    y: number;
    radius: number;
  };

  interface ITheme {
    backgroundColor: IColor;
    faceColor: IColor;
    hourScaleColor: IColor;
    minuteScaleColor: IColor;
    textColor: IColor;
    hourPointerColor: IColor;
    minutePointerColor: IColor;
    milliPointerColor: IColor;
    centerCircleColor: IColor;
  };

  type IUserTheme = Partial<ITheme>;
}
