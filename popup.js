function pushMarks(param, callback) {
  $.post("http://localhost:8080/push", {}, function(data){
    callback && callback(data);
  });
}
