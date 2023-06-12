import $ from 'jquery';

function handleSubmit(data) {
    // data를 가공하고 처리하는 로직을 구현합니다.
    // console.log(`입력받은 데이터: ${data}`);
    alert("clicked");
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
  handleSubmit,
  handleClick
}