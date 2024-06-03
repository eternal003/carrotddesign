const input_width = document.getElementById("input_width"); //가로인풋
const input_height = document.getElementById("input_height"); //세로인풋
document.getElementById("add_button").addEventListener("click", add_button);
var width_box = 0; //투명스티커 최대사이즈 1200*2500mm
var height_box = 0;
var option1 = 0; //부착방법, 재단 기본값0
var option2 = 0;
var box_num = 0; //배열시작숫자 0부터

var box_option = []; //모든 데이터
// console.log(box_option.length);
const element = document.querySelector('.op-select-1');




input_width.addEventListener("change", function size_change(e) {//가로인풋 값 바뀌면 실행
    width_box = parseInt(e.target.value);
    size_chk();
})

input_height.addEventListener("change", function size_change(e) {//세로인풋 값 바뀌면 실행
    height_box = parseInt(e.target.value);
    size_chk();
})

function size_chk() { //최대사이즈 체크함수
    if (width_box > height_box) {
        if (width_box > 2500 || height_box > 1200) {
            alert("최대사이즈 초과 \n 최대사이즈:1200*2500mm");
            input_width.value = null;
            input_height.value = null;
            width_box = 0;
            height_box = 0;
            size_err();
            
        } else {
          document.getElementById('input_width').style.border = '0';
            document.getElementById('input_height').style.border = '0';
        }
    } else {
        if (height_box > 2500 || width_box > 1200) {
            alert("최대사이즈 초과 \n 최대사이즈:1200*2500mm");
            input_width.value = null;
            input_height.value = null;
            width_box = 0;
            height_box = 0;
            size_err();

        } else {
          document.getElementById('input_width').style.border = '0';
            document.getElementById('input_height').style.border = '0';
        }
    }
}

function size_err() {
            element.classList.add('animate__animated', 'animate__shakeX', 'animate__faster');
            element.addEventListener('animationend', () => {
              element.classList.remove('animate__animated', 'animate__shakeX', 'animate__faster');// do something
            });
            document.getElementById('input_width').style.border = '2px solid red';
            document.getElementById('input_height').style.border = '2px solid red';
}

function add_button() {
    var chk_radio_1 = document.getElementsByName('option1');
    var chk_radio_2 = document.getElementsByName('option2');
    var sel_type_1 = null;
    var sel_type_2 = null;
    for (var i = 0; i < chk_radio_1.length; i++) {
        if (chk_radio_1[i].checked == true) {
            sel_type_1 = chk_radio_1[i].value;
            
        }
        
    }
    for (var i = 0; i < chk_radio_2.length; i++) {
        if (chk_radio_2[i].checked == true) {
            sel_type_2 = chk_radio_2[i].value;
            
        }
        
    }

    if (sel_type_1 == null || sel_type_2 == null || width_box <= 0 || height_box <= 0) { //미선택시
        alert("제작옵션을 선택해주세요!");
    } else {//전부 맞게 선택 했을때 실행
        box_num = box_option.length;
        box_option[box_num] = []; //각 배열 배열선언
        box_option[box_num][0] = width_box;
        box_option[box_num][1] = height_box;
        box_option[box_num][2] = sel_type_1;
        box_option[box_num][3] = sel_type_2;
        box_option[box_num][4] = calculatePrice(box_option[box_num][0], box_option[box_num][1], box_option[box_num][3]);
        //console.log(box_num, box_option[box_num][0], box_option[box_num][1], box_option[box_num][2], box_option[box_num][3], box_option[box_num][4]);
        add_box();
      
        //console.log(box_option.length);
        

    }
  }


    function add_box() {

      document.querySelector('#table').innerHTML = ""; 
      for (let index = 0; index < box_option.length; index++) {
        var a = '<tr><th>' + (index+1) + '</th><th>' +
         box_option[index][0]+ '*' + box_option[index][1] +
          'mm</th><th>'+ option_1(index) + '</th><th>' + option_2(index) + '</th><th>' +
          box_option[index][4].toLocaleString() + '원</th><th><img class="delete-button" src="./SVG/check.svg" alt="삭제"></th></tr>';
        document.querySelector('#table').insertAdjacentHTML('beforeend', a);
        

      }
        
        document.querySelector('#final-price').innerText = final_price(box_option);
    }

    function option_1(index) {
        if(box_option[index][2] == 1) {
            return '실내부착';
          } else {
            return '실외부착';
          }
    }
    function option_2(index) {
        if(box_option[index][3] == 1) {
            return '사각재단';
          } else {
            return '모양재단';
          }
    }


    function calculatePrice(width, height, option) {
        const area = width/10 * height/10;
        var moyang = 0;
        if (option == 2) {
            moyang = 5000;
        }

        if (area <= 900) {
          return 32000+ moyang;
        } else if (area <= 2500) {
          return 34000+ moyang;
        } else if (area <= 3600) {
          return 36000+ moyang;
        } else if (area <= 4900) {
          return 38000+ moyang;
        } else if (area <= 8100) {
          return 42000+ moyang;
        } else {
          return Math.round((area * 2.2 * 2.25) / 1000, 100)*1000 + moyang;
        }
      }
    

function final_price(price) {
      var a = 4000;
      for (let index = 0; index < price.length; index++) {
        a = a + price[index][4];
        
      }

      return a.toLocaleString() + '원';
    }

    document.addEventListener('DOMContentLoaded', () => {
      const container = document.getElementById('table');
  
      container.addEventListener('click', (event) => {
          if (event.target && event.target.classList.contains('delete-button')) {
              const images = Array.from(container.getElementsByClassName('delete-button'));
              const index = images.indexOf(event.target);
              //console.log(`Image ${index + 1} clicked`); //지우기누르면 실행되는 index는 누른버튼의 인덱스값
              document.querySelectorAll(".delete-button").item(index).parentNode.parentNode.remove();
              box_option.splice(index, 1);
              add_box();
              
          }
      });
  });


  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("클립보드에 복사되었습니다!\n카카오톡 채널로 보내주세요!");
    }).catch(err => {
        console.error('클럽보드 복사 에러 : ', err);
    });
}

//   document.getElementById('copy_button').addEventListener("click", function copy_button(e) {//카피버튼
//     var str = '';

//     for (let index = 0; index < box_option.length; index++) {
//       str += '투명스티커 ';
//       str += box_option[index][0] + '*' + box_option[index][1] + 'mm ';
//       str += '(' + option_1(index) + ') ';
//       str += '(' + option_2(index) + ') ';
//       str += box_option[index][4].toLocaleString() + '원';

      


//       str += '\n';
//     }
//       // str += '배송료 4,000원\n';
//       str += '총' + box_option.length + '장\n' + '합계 : ' + final_price(box_option);

//     console.log(str);
//     copyToClipboard(str);
// })

document.getElementById('copy_button').addEventListener("click", function () { //복사버튼 클릭시

    var str = '';

    for (let index = 0; index < box_option.length; index++) {
      str += '투명스티커 ';
      str += box_option[index][0] + '*' + box_option[index][1] + 'mm ';
      str += '(' + option_1(index) + ', '+ option_2(index) + ') ';
      str += box_option[index][4].toLocaleString() + '원';

      


      str += '\n';
    }
    str += '배송료 4,000원\n';
      str += '총' + box_option.length + '장 ' + '합계 : ' + final_price(box_option);
      
  const textArea = document.createElement("textarea");
  document.body.appendChild(textArea);
  textArea.value = str;
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
  alert("클립보드에 복사되었습니다!\n카카오톡 채널로 보내주세요!");
});

