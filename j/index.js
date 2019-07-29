$(function(){
  var mousePos = {};
  var curObj = null;
  var inX = 0;//px
  var inY = 0;//px
  var o_xl = 7.25,//棋盘坐标（rem）
      o_xs = 0.25,
      o_yl = 9,
      o_ys = 2;
  var leftCube = [];//剩余需要放置的元素
  var cubeW = 0.7,//小方块的边长
      misW = 0.35;//误差二分之一边长

  document.body.addEventListener('touchmove', function (e) {
    e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
  }, {passive: false}); 

  var oPage = {
    init: function(){
      this.render('init'); 
      this.listen();
      var str = '';
      for(var i = 0; i < 100; i++){
        str += '<div class="cube"></div>'
      }
      $('#gameBox').html(str);
      $('#score').html(0);
    },
    render: function(type){
      var self = this;
      var str = '';
      aType.sort( function(){ return 0.5 - Math.random() } );
      for( var i = 0; i < 3; i++){
        $('#selectBox .selectBox').eq(i).html(type_html[aType[i]])
        leftCube.push(aType[i]);
      }
      if(type != 'init'){
        setTimeout(function(){
          self.check();
        },0)
      }
    },
    listen: function(){
      var self = this;
      $('#selectBox').on('touchstart', '.item', function(event) {
        if(curObj) return false;
        curObj = $(this);
        inX = event.originalEvent.changedTouches[0].pageX - $(this).offset().left
        inY = event.originalEvent.changedTouches[0].pageY - $(this).offset().top
        // var x = event.originalEvent.changedTouches[0].pageX - inX;
        // var y = event.originalEvent.changedTouches[0].pageY - inY;
        var x = event.originalEvent.changedTouches[0].pageX - parseFloat($(this).css('width'))*0.8;
        var y = event.originalEvent.changedTouches[0].pageY - parseFloat($(this).css('height'))*0.8;
        curObj.css({
          'position': 'absolute',
          'transform': 'scale(1)',
          'top': self.getRem(y) + 'rem',
          'left': self.getRem(x) + 'rem',
          'min-height': 'auto',
          'min-width': 'auto',
        });
      });
      $('#wrapper').on('touchmove', function(event) {
        if(curObj){
          var x1 = event.originalEvent.changedTouches[0].pageX;
          var y1 = event.originalEvent.changedTouches[0].pageY;
          // var x = x1 - inX;
          // var y = y1 - inY;
          var x = event.originalEvent.changedTouches[0].pageX - parseFloat(curObj.css('width'))*0.8;
          var y = event.originalEvent.changedTouches[0].pageY - parseFloat(curObj.css('height'))*0.8;
          curObj.css({
            'top': self.getRem(y) + 'rem',
            'left': self.getRem(x) + 'rem'
          });
        }
      });
      $('#selectBox').on('touchend', function(event) {
        self.mouseEnd(event);
      });
      $('#restart').on('click', function(event) {
        self.init();
        $('#mask').hide();
      });
    },
    getRem: function(num){
      return 7.5*num / window.innerWidth;
    },
    mouseEnd: function(ev){
      var self = this;
      if(!curObj) return;
      var xs = self.getRem(parseFloat(curObj.css('left')));
      var ys = self.getRem(parseFloat(curObj.css('top')));
      var w = self.getRem(parseFloat(curObj.css('width')));
      var h = self.getRem(parseFloat(curObj.css('height')));
      if( (ys < o_ys-misW || ys + h > o_yl + misW*0.5) || 
          (xs < o_xs-misW || xs + w > o_xl + misW*0.5)) {
        self.failHandle();
      } else{
        // 获取当前放置位置左上角小方块的横纵序号，由0开始
        var i = Math.floor((xs - (o_xs - misW))/cubeW);
        var j = Math.floor((ys - (o_ys - misW))/cubeW);
        var number = j * 10 + i;
        var arr = type_info[curObj.data('type')].point;
        // console.log(arr)
        for(var k = 0; k < arr.length; k++){
          if($('#gameBox .cube').eq(number + arr[k]).hasClass('active')){
            self.failHandle();
            return false;
          }
        }
        self.successHandle(number);
      }
    },
    failHandle: function(){ //不在正确位置回退到展示栏，反之放置，curObj,inX,inY清空
      curObj.css({
        'position': 'unset',
        'transform': 'scale(0.5)',
        'top': 0,
        'left': 0,
        'min-height': '1.5rem',
        'min-width': '1.38rem',
      });
      inX = 0;
      inY = 0;
      curObj = null;
    },
    successHandle: function(number){
      var self = this;
      // 放置
      var color = type_info[curObj.data('type')].color;
      var arr = type_info[curObj.data('type')].point;
      for(var k = 0; k < arr.length; k++){
        var index = number + arr[k];
        $('#gameBox .cube').eq(index).addClass('active').css({
          'transition-duration': '0s',
          'transition-delay': '0s',
          'background-color': color
        });
      }
      leftCube.splice($.inArray(curObj.data('type'), leftCube), 1);
      curObj.css('display', 'none');
      inX = 0;
      inY = 0;
      curObj = null;
      // 结算
      var clearCubes = [];
      // 横向
      for(var nx = 0; nx < 10; nx++){
        var a = [];
        for(var ny = 0; ny < 10; ny++){
          var ind = ny * 10 + nx;
          a.push(ind)
          if(!$('#gameBox .cube').eq(ind).hasClass('active')){
            a = [];
            break;
          }
        }
        clearCubes = clearCubes.concat(a);
      }
      // 纵向
      for(var my = 0; my < 10; my++){
        var a = [];
        for(var mx = 0; mx < 10; mx++){
          var ind = my * 10 + mx;
          a.push(ind)
          if(!$('#gameBox .cube').eq(ind).hasClass('active')){
            a = [];
            break;
          }
        }
        clearCubes = clearCubes.concat(a);
      }
      if(clearCubes.length > 0){
        var time = 0.02;
        $('#score').html(parseInt($('#score').html()) + clearCubes.length);
        for(var k = 0; k < clearCubes.length; k++){
          $('#gameBox .cube').eq(clearCubes[k]).removeClass('active').css({
            'transition-duration': '0.28s',
            'transition-delay': time + 's',
            'background-color': '#e2e2e2'
          });
          time = time + 0.02;
        }
      }
      // 下一轮
      if(leftCube.length == 0){
        setTimeout(function(){
          self.render();
        }, 100)
      } else{
        setTimeout(function(){
          self.check();
        }, 10)
      }
    },
    check: function(){
      var unactive = 100 - $('#gameBox .active').length;
      var falseNum = 0;
      for(var j = 0; j < leftCube.length; j++){
        var key = leftCube[j];
        if(type_info[key].point.length > unactive){
          falseNum++;
        } else{
          var flg = false;
          for(var i = 0; i < 100; i ++){
            var i_col = i % 10;
            var i_row = Math.floor(i/10);
            if(!flg){
              var arr = type_info[key].point;
              if( !$('#gameBox .cube').eq(i).hasClass('active') 
                  && !flg
                  && i + arr[arr.length-1] < 100
                  && i_col + type_info[key].col <= 10
                  && i_row + type_info[key].row <= 10){
                var p = 0;
                for(var k = 0; k < arr.length; k++){
                  if(!$('#gameBox .cube').eq(i + arr[k]).hasClass('active')){
                    p++
                  }
                }
                console.log(9999, arr.length, p, i)
                flg = p == arr.length ? true : false;
              }
            }
          }
          if(!flg){
            falseNum++;
          }
        }
      }
      console.log(88888,falseNum)
      if(falseNum == leftCube.length){
        $('#mask h4').html($('#score').html())
        $('#mask').fadeIn('800');
        console.log('失败')
      }
    }     
  }
  oPage.init();
});