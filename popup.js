function getLocalTree() {
  chrome.bookmarks.getTree(function(results){
    console.log(results);
  });
}

var bg = chrome.extension.getBackgroundPage();

$(function($){
  $("#syncBK").click(function(){
    
  });
  $("#getAll").click(function(){
    bg.getAllBookmarksFromLocal();
  });
});
