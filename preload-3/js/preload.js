;(function($){
  function PreLoad(imgs, options){
    this.imgs = (typeof imgs === 'string') ? [imgs] : imgs;
    this.opts = $.extend({}, PreLoad.DEFAULTS, options);

    if(this.opts.order === 'ordered'){
      this._ordered();
    }else{
      this._unordered();
    }
  }

  PreLoad.DEFAULTS = {
    order: 'unordered',//无序预加载
    each: null,
    all: null
  };

  PreLoad.prototype._ordered = function(){
    let opts = this.opts,
      imgs = this.imgs,
      len = imgs.length,
      count = 0;

    function load(){
      let imgObj = new Image();

      $(imgObj).on('load error', function(){
        opts.each && opts.each(count);

        if(count >= len){
          opts.all && opts.all();
        }else{
          load();
        }

        count++;
      });

      imgObj.src = imgs[count];
    }

    load();
  };

  PreLoad.prototype._unordered = function(){
    let imgs = this.imgs,
      opts = this.opts,
      count = 0,
      len = imgs.length;

    $.each(imgs, function(index, src){
      if(typeof src !== 'string') return;

      let imgObj = new Image();
      $(imgObj).on('load error', function(){
        opts.each && opts.each(count);

        if(count >= len - 1){
          opts.all && opts.all();
        }

        count++;
      });
      imgObj.src = src;
    });
  };

  $.extend({
    preload: function(imgs, opts){
      new PreLoad(imgs, opts);
    }
  });
})(jQuery);