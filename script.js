var width_box = 500; //초기가로길이
var height_box = 500; //초기세로길이
var boxsize = document.getElementsByClassName("boxsize"); 
var section = document.querySelectorAll("section");

var final_option = [0, 0, 0, 0];
var final_price;
var final_result = [];
var page = 0;

document.getElementById("prev").addEventListener("click", prev_click);
document.getElementById("next").addEventListener("click", next_click);

const option = document.querySelectorAll(".option");

option.forEach((number, index) => {
  option[index].addEventListener("click", function option_set() {
    if (index <= 1) {
      final_option[0] = index + 1;
      for (let i = 0; i <= 1; i++) {
       
        if (i == index) {
          option[i].style.scale = "1.05";
          option[i].style.border = "5px orange solid"; //선택된 박스효과
        } else {
          option[i].style.scale = "1"; //미선택 박스효과
          option[i].style.border = "0px orange solid";
        }
      }
      
    } else {
      final_option[1] = index - 1;
      for (let i = 2; i <= 3; i++) {
        
        if (i == index) {
          option[i].style.scale = "1.05"; //선택된 박스효과
          option[i].style.border = "5px orange solid"; 
        } else {
          option[i].style.scale = "1"; //미선택 박스효과
          option[i].style.border = "0px orange solid";
        }
      }
      
    }
    console.log(final_option);
  })
});


function all_reset() { //초기세팅
  for (let i = 0; i < section.length; i++) {//1페이지를 제외하고 전부 비활성화
    if (!(i == page)) {
      section[i].style.visibility = "hidden";
      section[i].style.opacity = "0";
    } else {
      section[i].style.visibility = "visible";
      section[i].style.opacity = "1";
    }
  }
}

all_reset(); //초기세팅
const input_width = document.getElementById("input_width");
const input_height = document.getElementById("input_height");

input_width.addEventListener("change", function size_change(e) {//인풋 값 바뀌면 실행
  width_box = parseInt(e.target.value);
  console.log(width_box);
  resize_box();
})
input_height.addEventListener("change", function size_change(e) {
  height_box = parseInt(e.target.value);
  console.log(height_box);
  resize_box();
})


function resize_box(){ //박스 사이즈 리셋
  for (let i = 0; i <= 1; i++) {
    document.getElementsByClassName("box_width")[i].innerText = width_box + "mm";
    document.getElementsByClassName("box_height")[i].innerText = height_box + "mm";
  }
    
 
  
  if(width_box >= height_box){
    for (let i = 0; i <= 1; i++) {
      boxsize[i].style.width = 300 + "px"; 
      boxsize[i].style.height = 300*(height_box/width_box) + "px"; 
    }
    
  } else if(width_box < height_box){
    for (let i = 0; i <= 1; i++) {
      boxsize[i].style.width = 300*(width_box/height_box) + "px"; 
      boxsize[i].style.height = 300 + "px"; 
    }
    
  } else {
    alert("숫자만 입력해주세요");
    console.log("사이즈 에러");
  }
    
}

function next_click() {
  if (page == 3) {
    console.log("마지막페이지");
  } else {
  page++;
  if (page == 3) {
    result();
  }
  for (let i = 0; i < section.length; i++) {
    if (!(i == page)) {
      section[i].style.visibility = "hidden";
      section[i].style.opacity = "0";
    } else {
      section[i].style.visibility = "visible";
      section[i].style.opacity = "1";
    }
  }
  }
} 

function prev_click() {
  if (page == 0) {
    console.log("첫페이지");
  } else {
  page--;
  for (let i = 0; i < section.length; i++) {
    if (!(i == page)) {
      section[i].style.visibility = "hidden";
      section[i].style.opacity = "0";
    } else {
      section[i].style.visibility = "visible";
      section[i].style.opacity = "1";
    }
  }
}
}

function result() {
  final_result[0] = "투명스티커 " + width_box + "*" + height_box + "mm " + calculatePrice(width_box, height_box) +"원";
  document.querySelectorAll(".result p")[0].innerText = final_result[0];
  if (final_option[0] == 1) {
    final_result[1] = "부착방법 : 실외부착";
  } else {
    final_result[1] = "부착방법 : 실내부착";
  }
  document.querySelectorAll(".result p")[1].innerText = final_result[1];

  if (final_option[1] == 1) {
    final_result[2] = "재단방법 : 사각재단";
    final_price = 4000 + calculatePrice(width_box, height_box);
  } else {
    final_result[2] = "재단방법 : 모양재단 +5000원";
    final_price = 4000 + 5000 + calculatePrice(width_box, height_box);
  }
  document.querySelectorAll(".result p")[2].innerText = final_result[2];

  final_result[3] = "배송료 : 4000원";
  final_result[4] = "합계 : " + final_price + "원";
  document.querySelectorAll(".result h3")[0].innerText = final_result[4];
  console.log(final_result);
}
function calculatePrice(width, height) {
  const area = width/10 * height/10;

  if (area <= 900) {
    return 32000;
  } else if (area <= 2500) {
    return 34000;
  } else if (area <= 3600) {
    return 36000;
  } else if (area <= 4900) {
    return 38000;
  } else if (area <= 8100) {
    return 42000;
  } else {
    return Math.round((area * 2.2 * 2.1) / 1000, 100)*1000;
  }
}
document.getElementById("copy").addEventListener("click", function () {
  navigator.clipboard.writeText(
    final_result[0] + "\n" +  final_result[1] + "\n" +  final_result[2] + "\n" +  final_result[3] + "\n" +  final_result[4]
  );

  setTimeout(function () {
      alert("클립보드에 복사되었습니다. 카카오톡채널로 붙여넣기해주세요");
      window.location = 'http://pf.kakao.com/_bxmFqxb/chat';
    }, 1000);
  
})