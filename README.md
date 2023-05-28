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

## 更多
* `自定义主题`：开发中
