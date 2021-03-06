### 重绘与回流

- css，UI渲染引擎
- js，JS解析引擎

当元素布局和几何属性改变时就发生回流，当元素的外观、风格属性改变时就发生重绘

将频繁重绘回流的DOM元素单独作为一个独立图层，那么这个DOM元素的重绘回流的影响只会在这个图层中

回流比重绘的代价要高，回流的花销跟渲染树有多少个节点需要重新构建有关系，现代浏览器会帮助我们优化这些操作，浏览器会维护1个队列，把所有会引起回流、重绘的操作放入这个队列，等队列中的操作到了一定的数量或者到了一定的时间间隔，浏览器就会flush队列，进行一个批处理，这样就会让多次的回流、重绘变成一次回流、重绘。

创建新层的最佳方式是使用will-change CSS属性，并且通过transform的值创建一个新的合成器层
```
will-change: transform;
```
对于不支持will-change的浏览器，需要使用（滥用）3D变形来强制创建一个新层
```
tranform: translateZ(0);
```

不要害怕试验各压缩程序的参数。 调低质量，看看效果如何，然后取消重来。 找到一组合适的设置后，您可以对网站上的其他类似图像应用这组设置，但不要认为所有图像都必须使用相同的设置进行压缩