(function () {

  $('.weui_dialog_alert').on('click', function () {
    $(this).hide();
  })

  if (obj.iswx == 1) {
    var system = {
      win: false,
      mac: false,
      xll: false
    };
    var p = navigator.platform;
    system.win = p.indexOf("Win") == 0;
    system.mac = p.indexOf("Mac") == 0;
    system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
    if (system.win || system.mac) {
      //location.href = obj.errurl;
    }
  }
  window['typeId'] = $('#root').text() || ''
  window['M'] = window['M'] || {};
  // 瑙ｇ爜
  M.decode = function (str) {
    return decodeURIComponent(atob(str).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

  };
  // 闅愯棌鍒嗕韩鎸夐挳
  M.hideShare = function () {
    function hide() {
      try {
        wx.hideOptionMenu();
        wx.hideAllNonBaseMenuItem();
      } catch (e) {

      }
    }
    try {
      wx.config({
        jsApiList: [
          'hideOptionMenu',
          'hideAllNonBaseMenuItem'
        ]
      });
      wx.ready(function () {
        console.log('ready');
        hide();
      })
    } catch (e) {

    }
  };
  M.resetFont = function () {
    function setFont() {
      var clientWidth = document.documentElement.clientWidth;
      document.documentElement.style.fontSize = parseFloat(clientWidth / 3.75) + 'px';
    }
    window.addEventListener('orientationchange' in window ? 'orientationchange' : 'resize', setFont, false);
    document.addEventListener('DOMContentLoaded', setFont, false);

    setTimeout(setFont, 100)
  };

}());

var hasInsetCSS = false;
var g_js_dialogCb = null;
var g_js_cancel_dialogCb = null;
window.gConfig = window['data'] || {};
if (!Array.prototype.shuffle) {
  Array.prototype.shuffle = function () {
    for (var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[
        j] = x);
    return this;
  };
}
$(function () {
  String.prototype.jstpl_format = function (ns) {
    function fn(w, g) {
      if (g in ns) {
        return ns[g];
      } else {
        return '';
      }
    }
    return this.replace(/%\(([A-Za-z0-9_|.]+)\)/g, fn);
  };

  var config = {
    tpl: {
      body: '',
      // body: (M.decode(window['pagebody']).replace(/{oss}/, obj.oss)).replace(/{tou}/, obj.tou),
      // body: window['pagebody'],
      userItem: M.decode(
        "PGxpIGNsYXNzPSJhbmltYXRlZCIgc3R5bGU9ImRpc3BsYXk6IG5vbmU7Ij48ZGl2IGNsYXNzPSJsaXN0LWl0ZW0tbGVmdCI+PGltZyBzcmM9IiUoYXZhdGFyKSI+PGRpdiBjbGFzcz0iaXRlbS1pbmZvIj48cCBjbGFzcz0iaXRlbS1pbmZvLW5hbWUiPiUobmFtZSk8L3A+PHAgY2xhc3M9Iml0ZW0taW5mby10aW1lIj4lKHRpbWUpPC9wPiA8L2Rpdj4gPC9kaXY+IDxkaXYgY2xhc3M9Imxpc3QtaXRlbS1yaWdodCI+6aKG5Y+WIDxzcGFuPiUobW9uZXkp5YWDPC9zcGFuPiA8L2Rpdj48L2xpPg=="
      ),
      _alerttpl: [
        '<div id="js_mod_dialog" class="mod-popup %(popupClass)">',
        '  <div class="popup-body">',
        '    <h3 class="popup-title">%(title)</h3>',
        '    <div class="popup-cont">%(message)</div>',
        '    <div class="popup-btn">%(btnhtml)</div>',
        '  </div>',
        '</div>',
      ].join('')
    }

  };

  function confirm(p) {
    if (!hasInsetCSS) {
      __insetCss();
    }
    close();
    g_js_dialogCb = null;
    g_js_cancel_dialogCb = null;
    var opt = {
      title: '娓╅Θ鎻愮ず',
      message: '',
      btn: ['鍙栨秷', '纭畾'],
      cb: null,
      cancelCb: null,
      href: ''
    };

    if (typeof p === 'string') {
      opt.message = p;
    } else if (typeof p === 'object') {
      opt = $.extend(opt, p);
    } else {
      return;
    }

    opt.btnhtml = '<a class="js_global_dialog_cancel_btn" href="javascript:;"><span>' + opt.btn[0] +
      '</span></a>';
    opt.btnhtml += '<a class="' + (opt.href ? '' : 'js_global_dialog_submit_btn') + '" href="' + (opt.href ?
      opt.href : 'javascript:;') + '" data-value="1"><span>' + (opt.btn[1]) + '</span></a>';

    opt.popupClass = makePopupType(opt);
    var html = config.tpl._alerttpl.jstpl_format(opt);
    g_js_dialogCb = opt.cb;
    g_js_cancel_dialogCb = opt.cancelCb;

    setTimeout(function () {
      document.body.insertAdjacentHTML("beforeEnd", html);
    }, 200);
  }

  function makePopupType(opt) {
    var type = 'single-btn-popup';
    if (opt && opt.btn && typeof opt.btn !== 'string' && opt.btn.length > 1 && typeof opt.btn.push ===
      'function') {
      type = 'double-btn-popup';
    }
    return type;
  }

  function __insetCss() {
    hasInsetCSS = true;
    var text =
      '.mod-popup{z-index:10000;width:100%;position:absolute;top:0;left:0;height:100%;background:rgba(0,0,0,.5)}.popup-body{position:absolute;width:3rem;margin-top:1.25rem;border-radius:6px;background:#fff;left:50%;margin-left:-1.5rem}.popup-body .popup-title{color:#000;font-size:.2rem;margin-top:.2rem;text-align:center}.popup-body .popup-cont{padding:.12rem .24rem .2rem;font-size:.16rem;color:rgba(0,0,0,.54);text-align:center}.popup-body .popup-btn{width:100%;border-top:1px solid rgba(0,0,0,.08);font-size:0}.double-btn-popup .popup-btn a{display:inline-block;width:50%;color:#009688;font-weight:700;text-align:center;font-size:.18rem;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:.16rem 0}.double-btn-popup .popup-btn a+a{border-left:1px solid rgba(0,0,0,.08)}.single-btn-popup a{display:block;width:100%;color:#009688;font-weight:700;text-align:center;font-size:.18rem;padding:.16rem 0}';
    var s = document.createElement('style');
    s.innerHTML = text;
    document.head.appendChild(s);
    s = null;
  }

  var userList = JSON.parse(M.decode(window['userlist']));
  userList.shuffle();
  var userTimer = 0;
  var showIndex = 0;
  var itemWidth = '';
  var actionTimer = 2500;

  function addUser() {
    if (showIndex === userList.length) {
      showIndex = 0;
    }
    var $item = $(config.tpl.userItem.jstpl_format(userList[showIndex++]));
    $('.index-show-more-body .list').prepend($item);
    $item.slideDown(1000);

    $('.index-show-more-body .list li').each(function (index, item) {
      if (index > 6) {
        $(item).slideUp(1000);
        setTimeout(function () {
          $(item).remove();
        }, 1000);
      }
    });
  }

  function startTimer() {
    clearTimeout(userTimer);
    userTimer = setTimeout(function () {
      addUser();
      startTimer();
    }, actionTimer);
  }

  function initUser() {
    var now = +new Date();
    $(userList).each(function (index, item) {
      var temp = new Date((now - Math.random() * 600000));
      var minutes = temp.getMinutes();
      if (minutes < 10) {
        minutes = '0' + minutes;
      }
      var timeStr = temp.getHours() + ':' + minutes;
      item.time = timeStr;
    });
    for (showIndex = 0; showIndex < 6; showIndex++) {
      var item = config.tpl.userItem.jstpl_format(userList[showIndex]);
      $('.index-show-more-body .list').prepend($(item).show());
    }
    itemWidth = $('.index-show-more-body .list li').eq(0).width() + 'px';
    addUser();
    startTimer();
  }

  function initPage() {
    gConfig.money = parseInt((parseFloat(Math.random() * 10) + 30) * 100);
    M.resetFont();
    // $(document.body).append(config.tpl.body.jstpl_format({
    //   head: gConfig.headimg ? gConfig.headimg : obj.oss + '/hb/bck.jpg'

    //     ,
    //   huodongname: unescape(gConfig.actname ? gConfig.actname :
    //     '%u53CC12%u5168%u6C11%u7EA2%u5305%u8282'),
    //   lingqunum: gConfig.lingqunum,
    //   fafangnum: gConfig.fafangnum
    // }));
    $('.index-show-more-body').show();
    $('.js_money').text(window.name);
    $('.lingqunum').text(window.lingqunum);
    $('.fafangnum').text(window.fafangnum);
    initUser();
  }

  function bindEvent() {
    $(document.body).on('click', '.btn-open-red-packet', function () {
      var $this = $('.btn-open-red-packet');
      if ($this.hasClass('open')) {
        return false;
      }
      $this.addClass('open');
      setTimeout(function () {
        $('.index-show-more-body').fadeOut(700);
        $('.award-body').fadeIn(700);
      }, 1500);
      //record('play', site);
      //evkey && record('play', evkey);
    });
    $('.charge-btn').on('click', function () {
      // $.getJSON(obj.apic+obj.id,function (e) {
      //     //console.log(obj.apic+obj.id+'/num/'+11);
      //     if(obj.tui){
      //         location.href = e.v+'/money/'+window.name+'/tui/ok';
      //     }else{
      //         location.href = e.v+'/money/'+window.name;
      //     }
      // });
      openPacket();
      //confirm({
      //title: '寤哄晢閾惰鎴愮珛骞翠唤鏄紵',
      // message: '绛斿鏈鑾峰緱<span style="color: #f5294c">棰濆濂栧姳</span>',
      //btn: ['2013骞�', '2014骞�'],
      //cb: openPacket,
      // cancelCb: openPacket,
      //});

    });
  }

  function openPacket() {
  	var reqUrl = obj.jumpapi +'/' +window.typeId.split('_')[0] +'/'+ window.typeId.split('_')[1]+window.location.search
    $.get(reqUrl, function(data, status){
    	
      if (data) {
      	$.get(data['2'], function(e, status){
      		window.location.href = e;
      	})
      } else {
        alert('鏁版嵁寮傚父.....');
      }
    });
  }

  $(function () {
    $(document.body).on('click', '.js_global_dialog_cancel_btn', function (event) {
      openPacket();
      return false;
    });

    $(document.body).on('click', '.js_global_dialog_submit_btn', function (event) {
      openPacket();
      return false;
    });
  });

  function init() {
    initPage();
    bindEvent();
  }
  init();
});
$(function () {
  M.hideShare();
});