// Initial data
let currentColor = "black";
let canDraw = false;
let mouseX = 0;
let mouseY = 0;

let screen = document.querySelector("#tela");
let context = screen.getContext("2d");

// Events
document.querySelectorAll(".colorArea .color").forEach((item) => {
  item.addEventListener("click", colorClickEvent);
});
screen.addEventListener("mousedown", mouseDownEvent);
screen.addEventListener("mousemove", mouseMoveEvent);
screen.addEventListener("mouseup", mouseUpEvent);
document.querySelector(".clear").addEventListener("click", clearScreen);

// Functions
function colorClickEvent(e) {
  let color = e.target.getAttribute("data-color");
  currentColor = color;

  document.querySelector(".color.active").classList.remove("active");
  e.target.classList.add("active");
}

function mouseDownEvent(e) {
  canDraw = true;
  mouseX = e.pageX - screen.offsetLeft;
  mouseY = e.pageY - screen.offsetTop;
}

function mouseMoveEvent(e) {
  if (canDraw) {
    draw(e.pageX, e.pageY);
  }
}

function mouseUpEvent() {
  canDraw = false;
}

function draw(x, y) {
  //pegar a posição
  let pointX = x - screen.offsetLeft;
  let pointY = y - screen.offsetTop;
  //desenhar a linha
  context.beginPath();
  context.lineWidth = 5;
  context.lineJoin = "round";
  context.moveTo(mouseX, mouseY);
  context.lineTo(pointX, pointY);
  context.closePath();
  context.strokeStyle = currentColor;
  context.stroke();
  // salvar a posição do mouse
  mouseX = pointX;
  mouseY = pointY;
}

function clearScreen() {
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}
