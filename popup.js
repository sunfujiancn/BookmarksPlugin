$(function($){
  $("#syncBK").click(function(){
    chrome.bookmarks.getTree(function(results){
      $.post("http://localhost:8080/save", {"params": results[0].children}, function (data) {
        console.log(JSON.stringify(results));
      });
    });
  });
});
