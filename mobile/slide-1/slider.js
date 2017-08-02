//构造函数
function Slider(opts){
  //构造函数需要的参数
  this.wrap = opts.wrap;
  this.transFn = opts.transFn || 'linear';
  this.transTime = opts.transTime || '400ms';
  this.data = opts.data;
  //构造三步奏
  this.init();
  this.renderDOM();
  this.bindDOM();
}

//第一步 -- 初始化
Slider.prototype.init = function(){
  //设定窗口比率
  this.radio = window.innerHeight / window.innerWidth;
  //设定一页的宽度
  this.scaleW = window.innerWidth;
  //设定初始的索引值
  this.idx = 0;
};

//第二步 -- 根据数据渲染DOM
Slider.prototype.renderDOM = function(){
  let wrap = this.wrap,
    data = this.data,
    len = this.data.length;

  this.outer = document.createElement('ul');
  for(let i = 0; i < len; i++){
    let item = data[i];
    let li = document.createElement('li');

    li.style.width = `${this.scaleW}px`;
    li.style.webkitTransform = `translateX(${this.scaleW * i}px)`;
    if(item){
      //根据窗口的比例与图片的比例来确定
      //图片是根据宽度来等比缩放还是根据高度来等比缩放
      if(item['height'] / item['width'] > this.radio){
        li.innerHTML = `<img height="${window.innerHeight}" src="${item['src']}" />`;
      }else{
        li.innerHTML = `<img width="${window.innerWidth}" src="${item['src']}" />`;
      }
    }
    this.outer.appendChild(li);
  }

  //ul的宽度和画布宽度一致
  this.outer.style.width = `${this.scaleW}px`;

  wrap.style.height = `${window.innerHeight}px`;
  wrap.appendChild(this.outer);
};

//第三步 -- 绑定 DOM 事件
Slider.prototype.bindDOM = function(){
  let self = this,
    scaleW = this.scaleW,
    outer = this.outer;

  //手指按下的处理事件
  let startHandler = function(event){
    //记录刚刚开始按下的时间戳
    self.startTime = new Date().getTime();
    //记录手指按下的坐标
    self.startX = event.touches[0].pageX;
    //清除偏移量
    self.offsetX = 0;

    // let target = event.target;
    // while(target.nodeName !== 'LI' && target.nodeName !== 'BODY'){
    //   target = target.parentNode;
    // }
    // self.target = target;
  };

  //手指移动的处理事件
  let moveHandler = function(event){
    event.preventDefault();
    //计算手指的偏移量
    self.offsetX = event.targetTouches[0].pageX - self.startX;

    let lis = outer.getElementsByTagName('li');
    //起始索引
    let startIdx = self.idx - 1;
    //结束索引
    let endIdx = self.idx + 1;
    //最小化改变DOM属性
    for(let i = startIdx; i <= endIdx; i++){
      lis[i] && (lis[i].style.webkitTransition = `-webkit-transform 0s ${self.transFn}`);
      lis[i] && (lis[i].style.webkitTransform = `translateX(${(i - self.idx) * self.scaleW + self.offsetX}px)`);
    }
  };

  //手指抬起的处理事件
  let endHandler = function(event){
    event.preventDefault();
    //边界翻页值
    let boundary = self.scaleW / 3;
    //手指抬起的时间戳
    let endTime = new Date().getTime();

    //当手指移动时间超过300ms 的时候，按位移算
    if(endTime - self.startTime > 300){
      if(self.offsetX >= boundary){
        self.goIndex('-1');
      }else if(self.offsetX < 0 && self.offsetX < -boundary){
        self.goIndex('+1');
      }else{
        self.goIndex('0');
      }
    }else{
      //优化
      //快速移动也能使得翻页
      if(self.offsetX > 50){
        self.goIndex('-1');
      }else if(self.offsetX < -50){
        self.goIndex('+1');
      }else{
        self.goIndex('0');
      }
    }
  };

  //绑定事件
  outer.addEventListener('touchstart', startHandler, false);
  outer.addEventListener('touchmove', moveHandler, false);
  outer.addEventListener('touchend', endHandler, false);
};

Slider.prototype.goIndex = function(n){
  let self = this;
  let idx = this.idx;
  let lis = this.outer.getElementsByTagName('li');
  let len = lis.length;
  let cidx;

  if(typeof n === 'number'){
    //如果传数字 2,3 之类可以使得直接滑动到该索引
    cidx = idx;
  }else if(typeof n === 'string'){
    //如果是传字符则为索引的变化
    cidx = idx + n * 1;
  }

  if(cidx > len - 1){
    cidx = len - 1;
  }else if(cidx < 0){
    cidx = 0;
  }

  //保留当前索引值
  this.idx = cidx;

  //改变过渡的方式，从无动画变为有动画
  lis[cidx].style.webkitTransition = `-webkit-transform ${self.transTime} ${self.transFn}`;
  lis[cidx - 1] && (lis[cidx - 1].style.webkitTransition = `-webkit-transform ${self.transTime} ${self.transFn}`);
  lis[cidx + 1] && (lis[cidx + 1].style.webkitTransition = `-webkit-transform ${self.transTime} ${self.transFn}`);

  //改变动画后所应该的位移值
  lis[cidx].style.webkitTransform = 'translateX(0)';
  lis[cidx - 1] && (lis[cidx - 1].style.webkitTransform = `translateX(-${this.scaleW}px)`);
  lis[cidx + 1] && (lis[cidx + 1].style.webkitTransform = `translateX(${this.scaleW}px)`);
};