var BASE_URL = "http://localhost:8080";

function postToAddBookmark(bookmark) {
  console.log(JSON.stringify(bookmark));
  $.post({
    url: BASE_URL + "/add",
    contentType: "application/json",
    type: "POST",
    data: JSON.stringify(bookmark),
    success: function(data){
      console.log(data);
    }
  });
}

function addBookmarkOrDirectory(id, bookmark){
  console.log("add id:", id);
  console.log(bookmark)
  // dateGroupModified字段只有新增文件夹时才存在
  if(bookmark.dateGroupModified) {
    bookmark.isDir = true;
  }
  getCurrentTab(function(tab){
    if (tab) {
      console.log(tab.favIconUrl);
      getIconImage(tab.favIconUrl, function(imgData){
        console.log(imgData);
        bookmark.icon = imgData;
        bookmark.iconUrl = tab.favIconUrl;
        postToAddBookmark(bookmark);
      });
    }else {
      postToAddBookmark(bookmark);
    }
  });
}

function delBookmark(id, bookmark) {
  console.log("Del id:{}", id);
  $.get(BASE_URL + "/delete/" + id, {}, function(data){
    console.log(data);
  });
}

function changeBookmark(id, bookmark) {
  console.log(JSON.stringify(bookmark));
  $.ajax({
    url: BASE_URL + "/change/" + id,
    contentType: "application/json",
    type: "POST",
    data: JSON.stringify(bookmark),
    success: function(data){
      console.log(data);
    }
  });
}

function getBookmarkBy(id) {
  console.log("QueryId:"+id);
  $.get(BASE_URL + "/find/" + id, {}, function(data){
    console.log(data);
  });
}
// 获取服务端书签列表
function getAllBookmarksFromServer() {
  $.get(BASE_URL + "/find/all", {}, function(data){
    console.log(data);
  });
}
// 获取本地书签列表并推送到服务器
function pushAllBookmarks(){
  chrome.bookmarks.getTree(function(results){
    $.ajax({
      url: BASE_URL + "/push/all",
      contentType: "application/json",
      type: "POST",
      data: JSON.stringify(results),
      success: function(data){
        console.log(data);
      }
    });
  });
}

// 获取当前选项卡
function getCurrentTab(callback){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    console.log(tabs[0]);
		callback && callback(tabs.length ? tabs[0] : null);
	});
}
// 将图片转换成canvas
function imageToCanvas(img) {
  var canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, img.width, img.height);
  return canvas;
}
// 根据URL获取图片，返回base64图片数据
function getIconImage(url, callback) {
  var img = document.createElement('img');
  img.src = url;
  img.onload = function(){
    var canvas = imageToCanvas(img);
    var imgData = canvas.toDataURL('image/png');
    callback && callback(imgData);
  };
}

function listenToInstalled() {
  console.log("the extension is installed");
}

// function sendMessageToContentScript(message, callback){
// 	getCurrentTabId((tabId) =>{
// 		chrome.tabs.sendMessage(tabId, message, function(response){
// 			callback && callback(response);
// 		});
// 	});
// }

//Fired when a bookmark or folder is created.
chrome.bookmarks.onCreated.addListener(addBookmark);
//Fired when a bookmark or folder is removed. When a folder is removed recursively,
//a single notification is fired for the folder, and none for its contents.
//example: {"index":9,"node":{"dateAdded":1584626908207,"id": "396","title": "title","url": ""},"parentId":"1"}
chrome.bookmarks.onRemoved.addListener(delBookmark);
//Fired when a bookmark or folder changes. Note: Currently, only title and url changes trigger this.
//example: {"title":"","url":""}
chrome.bookmarks.onChanged.addListener(changeBookmark);
//Fired when a bookmark or folder is moved to a different parent folder.
//example: {"index":8,"oldIndex":9,"oldParentId":"1","parentId":"1"}
chrome.bookmarks.onMoved.addListener(changeBookmark);

chrome.runtime.onInstalled.addListener(listenToInstalled);
