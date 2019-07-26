/* ==========================================================
 * v20161024
 * ==========================================================
 * Copyright shihua
 *
 * rem字体大小设定模块
 * ========================================================== */
(function(){
  var pxUnit = 100;     // 在px2rem中预设rem的值 即 1rem = ? px
  var designWid = 750;  // 设计稿宽度
  // var designHei = 389; // 设计稿高度

  var $el = document.documentElement;
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';

  var fAdapt = function() {
    // 适用于某些webview有bug的游戏客户端内嵌活动页(表现为IOS下页面自带宽度，默认有滚动条)
    var winWid = window.innerWidth;
    var winHei = window.innerHeight;

    // var ratio = winHei / winWid < (designHei / designWid) ? (winHei / designHei) : (winWid / designWid);
    var ratio = (winWid / designWid);
    $el.style.fontSize = (ratio * pxUnit) + 'px';
  }

  window.addEventListener(resizeEvt, fAdapt, false);
  document.addEventListener('DOMContentLoaded', fAdapt, false);
})();