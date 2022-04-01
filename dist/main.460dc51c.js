// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"epB2":[function(require,module,exports) {
var $siteList = $('.siteList');
var x = localStorage.getItem('x');
//console.log(x)为null
var xObject = JSON.parse(x);
//console.log(xObject)为null
//第一次xObject等于空，不能直接等于
var hashMap = xObject || [{
    logo: 'A', url: 'https://www.acfun.cn'
}, {
    logo: 'B', url: 'https://www.bilibili.com'
}];
var $lastLi = $siteList.find('li.last');
var simplifyUrl = function simplifyUrl(url) {
    //replace产生一个新的字符串
    return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, ''); //正则表达式删掉/开头的内容
};
var render = function render() {
    //只需要维护hashMap再此构建DOM树
    $siteList.find('li:not(.last)').remove();
    //找到所有li对象数组，唯独不找.last
    hashMap.forEach(function (node, index) {
        //foreach会给两个参数，
        var $startLi = $('<li>\n\n            <div class="site">\n                <div class="logo">' + node.logo + '</div>\n                <div class="link">' + simplifyUrl(node.url) + '</div>\n                    <div class="close">\n                        <svg class="icon" >\n                            <use xlink:href="#icon-close"></use>\n                        </svg>\n                    </div>\n            </div>\n\n        </li>').insertBefore($lastLi);
        $startLi.on('click', function () {
            window.open(node.url, '_self');
        });
        $startLi.on('click', '.close', function (e) {
            e.stopPropagation(); //阻止冒泡
            hashMap.splice(index, 1);
            render();
        });
    });
};
render();
$('.addButton').on('click', function () {
    var url = window.prompt('请输入新增网址');
    if (url.indexOf('http') !== 0) {
        url = 'https://www.' + url;
    }
    hashMap.push({ logo: simplifyUrl(url)[0].toUpperCase(), url: url }); //也可以在css中用text-transform:uppercase
    render();
});
//跳转页面时存储hashmap
window.onbeforeunload = function () {
    var string = JSON.stringify(hashMap); //是string
    // console.log(string)
    // console.log(hashMap)
    window.localStorage.setItem('x', string); //本地存储x
};
//localStorage与cookie有关或用户硬盘满了，google恰好会删除ls
//3.用户使用无痕模式

// document.addEventListener()
$(document).on('keypress', function (e) {
    //console.log(e.key)
    var key = e.key;
    for (var i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url, '_self');
        }
    }
});
//no-minify不要压缩
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.460dc51c.map