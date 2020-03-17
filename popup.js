$(function($){
  $("#syncBK").click(function(){
    chrome.bookmarks.getTree(function(results){
      alert(JSON.stringify(results));
    });
  });
});
