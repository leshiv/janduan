//var BGPage = chrome.extension.getBackgroundPage();

$(document).ready(function() {
  restore_options();

  $("#topvalue").text(topvalue);
  $("#oovalue").text(oovalue);
  $("#ratiovalue").text(ratiovalue);

  $("input").on("input", function(){
    $("#"+this.id+"value").html(this.value);
  });
  $("input").on("change",function(){
    save_options();
  });

  function save_options() {
    var top = parseInt($("#topvalue").text());
    var oo = parseInt($("#oovalue").text());
    var ratio = parseInt($("#ratiovalue").text());
    chrome.storage.sync.set({
      top:top,
      oo:oo,
      ratio:ratio
    }, function() {
      var status =$("#status");
      status.html('Options saved.');
      setTimeout(function() {
        status.html('&nbsp');
      }, 3000);
    });
  }

  function restore_options() {
    chrome.storage.sync.get({
      top:3,
      oo:100,
      ratio:10
    }, function(items) {
      $("#topvalue").text(items.top);
      $("#oovalue").text(items.oo);
      $("#ratiovalue").text(items.ratio);
      $("#top").val(items.top);
      $("#oo").val(items.oo);
      $("#ratio").val(items.ratio);
    });
  }
});
