# web-clock

## 使用示例
* umd script方式
```js
<canvas id="web-clock"></canvas>
<script src="./dist/webclock.umd.production.min.js"></script>
<script>
(() => {
  const clock = new WebClock.default('web-clock', {
    width: 480,
    height: 480,
    dpi: devicePixelRatio || 2,
    showNumber: true
  });
})();
</script>
```
* ES Module
```js
import WebClock from '@mailzwj/web-clock';

// ...
```

## 参数说明
* `theme`: 可选`apple-dark`,`apple-light`和`mi`，默认`apple-dark`。
* `width`: 宽度，默认240
* `height`: 高度，默认240
* `dpi`: 像素比，默认2
* `showNumber`: 是否显示小时数字，默认false
* `userTheme`: 自定义主题配置（详见下节）

## 自定义主题
可定制范围如下：
```ts
Partial<{
  // 背景色
  backgroundColor: IColor;
  // 表面颜色
  faceColor: IColor;
  // 整点刻度颜色
  hourScaleColor: IColor;
  // 分钟刻度颜色
  minuteScaleColor: IColor;
  // 小时数字颜色
  textColor: IColor;
  // 时针颜色
  hourPointerColor: IColor;
  // 分针颜色
  minutePointerColor: IColor;
  // [毫]秒针颜色
  milliPointerColor: IColor;
  // 中心小圆颜色
  centerCircleColor: IColor;
}>;
```
**注意：** 未指定参数将继承`theme`主题的配置。

## 在线DEMO
* [Web Clock](https://mailzwj.github.io/web-clock/example.html)
