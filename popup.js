function getLocalTree() {
  chrome.bookmarks.getTree(function(results){
    console.log(results);
  });
}

var bg = chrome.extension.getBackgroundPage();

$(function($){
  $("#getAll").click(function(){
    bg.getCurrentTab(function(data){
      console.log(data);
    });
  });
});
