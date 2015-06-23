var duanList = new Array();
duanList=[];

var rule = Object();
rule.top = 2;
rule.oo = 100;
rule.ratio = 8.0;

//var views = chrome.extension.getViews({type: "popup"});
//for (var i = 0; i < views.length; i++) {
//    views[i].document.getElementById('x').innerHTML="My Custom Value";
//}

var restore_options = function () {
  chrome.storage.sync.get({
    top:3,
    oo:100,
    ratio:10
  }, function(items) {
    setRule(items);
    renderComments();
  });
}

function setRule(items){
  rule.top = items.top;
  rule.oo = items.oo;
  rule.ratio = items.ratio;
}

function renderComments(){
  $("span[id^='cos_support']").each(function(){
    var duan = Object();
    var duanId = this.id.substr(12);
    var oo = parseInt($(this).text());
    var xx = parseInt($("span[id^='cos_unsupport-"+duanId+"']").text());
    if(oo <= 0){
      duan.ratio = 0;
    }else if(xx <= 0){
      duan.ratio = oo;
    }else {
      duan.ratio = oo/xx;
    }
    duan.oo = oo;
    duan.xx = xx;
    duan.highlight = false;
    duan.id = duanId;
    duanList.push(duan);

  });

  //$("li[id^='comment']").css({"background":"#ffcfc0"});

  duanList.sort(function(a,b){return a.oo>b.oo?-1:1});

  for (idx in duanList){
    var aduan = duanList[idx];
    if(aduan.oo>rule.oo || aduan.ratio > rule.ratio){
      $('#comment-'+duanList[idx].id).find("p").css({"background":"#ffe9e3"});
    }
  }

  for (var i=0 ;i < rule.top; i++){
    $('#comment-'+duanList[i].id).find("p").css({"background":"#dfffe7"});
  }
}

restore_options();
