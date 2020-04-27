class CopyrightWebpackPlugin {
  constructor(options) {
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin', (compilation, cb) => {
      compilation.assets['copyright.txt'] = {
        source: function () {
          return 'copyright by mufeng';
        },
        size: function () {
          return 19;
        }
      }
      cb();
    })
  }
}

module.exports = CopyrightWebpackPlugin;