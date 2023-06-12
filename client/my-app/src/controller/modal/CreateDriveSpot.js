import $ from 'jquery';

function onSave(data) {
    debugger;
    console.log(data);
    
    $.ajax({
        url: 'http://localhost:3100/user/spot',
        method: 'POST',
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(data),
        dataType : 'json',
        success: function(response) {
          console.log('성공:', response);
        },
        error: function(xhr, status, error) {
          console.log('실패:', error);
        }
    });
    
}

function handleClick() {
  // Ajax 요청 보내기
  $.ajax({
    url: 'http://localhost:3100/user/test',
    method: 'GET',
    success: function(response) {
      console.log('성공:', response);
    },
    error: function(xhr, status, error) {
      console.log('실패:', error);
    }
  });
}
  
export default {
    onSave,
    handleClick
}