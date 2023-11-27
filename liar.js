const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const clear = document.getElementById("jsClear");

const INITIAL_COLOR = "#000000";
const CANVAS_WIDTH=900;
const CANVAS_HEIGHT=710;

ctx.strokeStyle = "#2c2c2c";

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

var modal = document.getElementById("modal");
var saveButton = document.getElementById("save-button");
var btn = document.getElementById("settingButton");
var playerCount, timerCount, selectedTopic;
var wordBox = document.getElementsByClassName('wordBox')[0];

var statusBox = document.querySelector('.statusBox');
var statusText = statusBox.querySelector('h1');

var topics = {
  "나라": ["네덜란드", "과테말라", "그리스", "대한민국", "독일", "러시아", "미국", "멕시코", "일본", "캐나다"],
  "동물": ["라쿤", "수달", "하늘다람쥐", "캥거루", "북극여우", "알파카", "낙타", "말", "앵무새", "거북이"],
  "스포츠": ["마라톤", "장대높이뛰기", "배영", "루지", "컬링", "서핑", "허들", "해머던지기", "리듬체조", "쇼트트랙"],
  "음식": ["나시고랭", "스시", "똠양꿍", "팟타이", "딤섬", "라멘", "베이징덕", "라자냐", "케밥", "피쉬앤칩스"],
  "직업": ["초등교사", "고고학자", "택배기사", "만화가", "작사가", "큐레이터", "마술사", "코미디언", "성우", "코치"],
  "한국가수": ["Ash Island", "Zior Park", "구창모", "로이킴", "이창섭", "박재범", "배철수", "나훈아", "싸이", "이찬혁"],
  "한국영화": ["기생충", "극한직업", "범죄도시", "7번방의 선물", "부산행", "택시운전사", "신과함께", "베테랑", "타짜", "명량"],
};

var currentPerson = 1;
var timerId;
var selectedWord;
var liar;
var totalPerson = parseInt(document.getElementById('player-count').textContent.replace('명', ''));
var gameStarted = false;

document.addEventListener("DOMContentLoaded", function() {
  const header1 = document.getElementById("header1");
  const originalText = header1.textContent;

  function changeText() {
    header1.textContent = "Back";
  }

  function restoreText() {
    header1.textContent = originalText;
  }

  header1.addEventListener("mouseover", changeText);
  header1.addEventListener("mouseout", restoreText);

  document.getElementById('increase-player-button').addEventListener('click', function() {
    var count = document.getElementById('player-count');
    count.textContent = Math.min(parseInt(count.textContent) + 1, 8) + '명';
  });

  document.getElementById('decrease-player-button').addEventListener('click', function() {
    var count = document.getElementById('player-count');
    count.textContent = Math.max(parseInt(count.textContent) - 1, 3) + '명';
  });

  document.getElementById('increase-timer-button').addEventListener('click', function() {
    var count = document.getElementById('timer-count');
    count.textContent = Math.min(parseInt(count.textContent) + 1, 30) + '분';
  });

  document.getElementById('decrease-timer-button').addEventListener('click', function() {
    var count = document.getElementById('timer-count');
    count.textContent = Math.max(parseInt(count.textContent) - 1, 0) + '분';
  });

  saveButton.addEventListener("click", function(event) {
    event.stopPropagation();
    modal.style.display = "none";
    playerCount = document.getElementById('player-count').textContent;
    timerCount = document.getElementById('timer-count').textContent;
    selectedTopic = document.getElementById('dropbtn').textContent;

    console.log("Player Count: " + playerCount);
    console.log("Timer Count: " + timerCount);
    console.log("Selected Topic: " + selectedTopic);

    document.getElementById('info-player-count').textContent = playerCount;
    document.getElementById('info-topic').textContent = selectedTopic;
    document.getElementById('info-timer').textContent = timerCount;
  });

});

btn.onclick = function() {
  modal.style.display = "block";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function toggleDropdown() {
  var dropdownContent = document.getElementById("dropdown-content");
  dropdownContent.classList.toggle("show");
}

function selectOption(element) {
  var dropdownButton = document.getElementById("dropbtn");
  dropdownButton.textContent = element.textContent;
  toggleDropdown();
}

function beforeGameStarts() {
  statusText.textContent = '게임 진행 전입니다.';
  statusBox.removeEventListener('click', showResult);
}

function gameInProgress() {
  statusText.textContent = '게임이 진행중입니다.';
  statusBox.removeEventListener('click', showResult);
}

function afterGameEnds() {
  statusText.textContent = '결과보기';
  statusBox.addEventListener('click', showResult);
}

function showResult() {
  alert(`제시어는 ${selectedWord}이었고, 라이어는 ${liar}번이었습니다.`);
  beforeGameStarts();
}

beforeGameStarts();

document.getElementById('startButton').addEventListener('click', function() {
  var selectedTopic = document.getElementById('dropbtn').textContent;

  if (selectedTopic === '주제') {
    alert("주제를 선택해주세요.");
    return;
  }

  var wordList = topics[selectedTopic];
  var randomIndex = Math.floor(Math.random() * wordList.length);
  selectedWord = wordList[randomIndex];

  clearInterval(timerId);
  currentPerson = 1;

  var totalPerson = parseInt(document.getElementById('player-count').textContent.replace('명', ''));
  liar = Math.floor(Math.random() * totalPerson) + 1;

  wordBox.textContent = "1번째 사람이 클릭해서 제시어를 확인하세요.";

  wordBox.addEventListener('click', wordBoxClickHandler);
  gameStarted = true;
  gameInProgress();

  clearCanvas();
});

var wordBoxClickHandler = function() {
  if (!gameStarted) {
    return;
  }

  var text = wordBox.textContent;

  if (text.includes("사람이 클릭해서 제시어를 확인하세요")) {
    wordBox.textContent = currentPerson === liar ? "당신은 라이어입니다." : selectedWord;
  } else if (text.includes("클릭해서 타이머를 작동시키세요")) {
    wordBox.removeEventListener('click', wordBoxClickHandler);

    var timerCount = parseInt(document.getElementById('timer-count').textContent.replace('분', '')) * 60;
    timerId = setInterval(function() {
      if (timerCount <= 0) {
        clearInterval(timerId);
        wordBox.textContent = "시간이 다 되었습니다.";
        gameStarted = false;
        afterGameEnds();
      } else {
        var minutes = Math.floor(timerCount / 60);
        var seconds = timerCount % 60;
        wordBox.textContent = "남은 시간: " + minutes + "분 " + seconds + "초";
        timerCount--;
      }
    }, 1000);
  } else {
    currentPerson++;
    var totalPerson = parseInt(document.getElementById('player-count').textContent.replace('명', ''));

    if (currentPerson <= totalPerson) {
      wordBox.textContent = currentPerson + "번째 사람이 클릭해서 제시어를 확인하세요.";
    } else {
      wordBox.textContent = "클릭해서 타이머를 작동시키세요.";
    }
  }
};

wordBox.addEventListener('click', wordBoxClickHandler);


function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;
  
  if (!painting) {
      ctx.beginPath();
      ctx.moveTo(x, y);
  } else {
      ctx.lineTo(x, y);
      ctx.stroke();
  }
}


function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick() {
 if (filling === true) {
   filling = false;
   mode.innerText = "Fill";
 } else {
  filling = true;
  mode.innerText = "Paint";  
 }
}

function handleCanvasClick() {
    if (filling) {
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

function clearCanvas() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.beginPath();
}


function handleColorClick(event) {
  const color = event.target.value;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

const colorInput = document.getElementById("jsColors");

colorInput.addEventListener("input", handleColorClick);

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
}

if (range) {
    range.addEventListener("input", handleRangeChange);
}
  
if (mode) {
    mode.addEventListener("click", handleModeClick);
}


if (clear) {
  clear.addEventListener("click",clearCanvas);
}

