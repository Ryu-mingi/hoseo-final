const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const imageCanvas = document.getElementById("jsImageCanvas");
const imageCtx = imageCanvas.getContext("2d");

const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const clear = document.getElementById("jsClear");

const INITIAL_COLOR = "#000000";
const CANVAS_WIDTH=900;
const CANVAS_HEIGHT=710;

const opacityButton = document.getElementById("myButton");
const opacitySlider = document.getElementById("jsOpacityRange");
const opacityRange = document.getElementById("jsOpacityRange");
const resetButton = document.getElementById("resetButton");
var opacityLabel = document.querySelector(".opacity-slider");

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

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else{
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

function handleSaveClick() {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[EXPORT]";
  link.click();
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
    // canvas.addEventListener("contextmenu", handleCM);

}

    
if (range) {
    range.addEventListener("input", handleRangeChange);
}
  
if (mode) {
    mode.addEventListener("click", handleModeClick);
}

if (saveBtn){
  saveBtn.addEventListener("click", handleSaveClick);
}

if (clear) {
  clear.addEventListener("click",clearCanvas);
}

imageCanvas.width = CANVAS_WIDTH;
imageCanvas.height = CANVAS_HEIGHT;

var img = new Image();

img.onload = function () {
  updateCanvas();
};

function handleImage(e) {
  var reader = new FileReader();
  reader.onload = function (event) {
    img.src = event.target.result;
    clearCanvas();
  };
  reader.readAsDataURL(e.target.files[0]);
}

document.getElementById("imageLoader").addEventListener("change", handleImage, false);
document.addEventListener("change", handleImage, false);

document.getElementById("resetButton").onclick = function () {
  opacityRange.value = 1;
  updateCanvas(1);
};

opacityButton.addEventListener("click", toggleOpacitySlider);

function toggleOpacitySlider() {
  opacitySlider.classList.toggle("hidden");
  opacityLabel.classList.toggle("hidden");
}

opacityRange.addEventListener("input", handleOpacityChange);

function handleOpacityChange(event) {
  const opacity = event.target.value;
  updateCanvas(opacity);
}

resetButton.addEventListener("click", handleOpacityReset);

function handleOpacityReset() {
  opacityRange.value = 1;
  updateCanvas(1);
}

function updateCanvas(opacity) {
  imageCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
  imageCtx.globalAlpha = opacity;
  imageCtx.drawImage(img, 0, 0, imageCanvas.width, imageCanvas.height);
  const aspectRatio = img.width / img.height;
  const canvasAspectRatio = imageCanvas.width / imageCanvas.height;

  let drawWidth, drawHeight;
  if (aspectRatio > canvasAspectRatio) {
      drawWidth = imageCanvas.width;
      drawHeight = imageCanvas.width / aspectRatio;
  } else {
      drawWidth = imageCanvas.height * aspectRatio;
      drawHeight = imageCanvas.height;
  }
}

const levelButtons = document.querySelectorAll(".levelBtn");

levelButtons.forEach((button) => {
    button.addEventListener("click", handleLevelButtonClick);
});

function handleLevelButtonClick(event) {
    const level = event.target.dataset.level;
    const imagePath = `level/level${level}.jpg`;
    loadLevelImage(imagePath);
}

function loadLevelImage(imagePath) {
    // Don't re-declare img here
    img.onload = function () {
        updateCanvas();
    };

    img.src = imagePath;
    clearCanvas();
}