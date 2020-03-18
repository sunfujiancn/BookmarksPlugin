// function getData(urlPath, params) {
//   $.get("http://localhost:8080/"+urlPath, params, function(data){
//     console.log(data);
//   });
// }

function pushData(urlPath, params) {
  console.log(JSON.stringify(params));
  // if(urlPath === "delete") {
  //   params = {"params": JSON.stringify(params)};
  // }
  $.ajax({
    "url": "http://localhost:8080/"+urlPath,
    "contentType": "application/json",
    "type": "POST",
    "success": function(data){
      console.log(data);
    }
  });
  // $.post("http://localhost:8080/"+urlPath, params, function(data){
  //   console.log(data);
  // });
}
//
// function putData(urlPath, params) {
//   $.post("http://localhost:8080/"+urlPath, params, function(data){
//     console.log(data);
//   });
// }
//
// function deleteData(urlPath, params) {
//   $.post("http://localhost:8080/"+urlPath, params, function(data){
//     console.log(data);
//   });
// }

//Fired when a bookmark or folder is created.
chrome.bookmarks.onCreated.addListener(function(id, bookmark){
  pushData("add", bookmark);
});
//Fired when a bookmark or folder is removed. When a folder is removed recursively,
//a single notification is fired for the folder, and none for its contents.
chrome.bookmarks.onRemoved.addListener(function(id, bookmark){
  pushData("delete", bookmark);
});
//Fired when a bookmark or folder changes. Note: Currently, only title and url changes trigger this.
chrome.bookmarks.onChanged.addListener(function(id, bookmark){
  pushData("change", bookmark);
});
//Fired when a bookmark or folder is moved to a different parent folder.
chrome.bookmarks.onMoved.addListener(function(id, bookmark){
  pushData("move", bookmark);
});
