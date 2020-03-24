var bg = chrome.extension.getBackgroundPage();

function renderBkList(list, listr) {
  $.each(list, function(i, e){
    if(!e.children) {
      listr += '<li><a herf="'+ e.url +'">' + e.title + '</a></li>';
    }else {
      listr += '<li>' + e.title + '</li>&nbsp;&nbsp;&nbsp;&nbsp;';
      renderBkList(e.children, listr);
    }
  });
  return listr;
}

$(function($){
  bg.getAllBookmarks(function(list){
    var listr = "";
    listr = renderBkList(list[0].children, listr);
    $("#app>ul").html(listr);
  });
});
