;(function($){
  function PreLoad(imgs, options){
    this.imgs = (typeof imgs === 'string') ? [imgs] : imgs;
    this.opts = $.extend({}, PreLoad.DEFAULTS, options);

    this._unordered();
  }

  PreLoad.DEFAULTS = {
    each: null,
    all: null
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