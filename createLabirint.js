const columnInput = document.querySelector(".column-input");
const rowInput = document.querySelector(".row-input");
const generateButton = document.querySelector(".generate-button");
const resetCanvasButton = document.querySelector(".clear-button");
const saveButton = document.querySelector(".save-button");

// переменные сдвига
var shiftX = 0;
var shiftY = 0;

// количество колонок в лабиринте
let columnsSize = 51;
// количество строк в лабиринте
let rowsSize = 51;
// размер клетки в лабиринте
const fieldSize = 19;
// рамка (внешняя граница лабиринта)
const padding = 19;

// находим холст на странице по имени элемента

// создаём новую карту лабиринта, которую будем отрисовывать
let map;

// рисуем рамку и готовимся к отрисовке лабиринта
function init() {
  const canvas = document.querySelector("canvas");
  // создаём переменную, через которую будем работать с холстом
  const context = canvas.getContext("2d");
  // устанавливаем размеры холста
  canvas.width = padding * 2 + columnsSize * fieldSize;
  canvas.height = padding * 2 + rowsSize * fieldSize;

  // цвет заливки
  context.fillStyle = "black";
  // рисуем прямоугольник на весь холст с координатами левого верхнего и правого нижнего углов
  context.rect(0, 0, canvas.width, canvas.height);
  // закрашиваем его выбранным цветом
  context.fill();

  // делаем белое поле внутри рамки, чтобы потом нарисовать на нём стены
  context.fillStyle = "white";
  // сообщаем скрипту, что сейчас будем рисовать новую фигуру
  context.beginPath();
  // рисуем прямоугольник, отступив от границ холста на толщину рамки
  context.rect(
    padding,
    padding,
    canvas.width - padding * 2,
    canvas.height - padding * 2
  );
  // закрашиваем его белым
  context.fill();
}

// получаем значение ячейки из лабиринта
function getField(x, y) {
  // если хотя бы одна из координат не находится в границах карты
  if (x < 0 || x >= columnsSize || y < 0 || y >= rowsSize) {
    // выходим из функции и говорим, что такой ячейки нет
    return null;
  }
  // если дошли досюда, значит, координата верная, и мы возвращаем её значение из карты лабиринта
  return map[y][x];
}

// отрисовываем карту
function drawMap() {
  const canvas = document.querySelector("canvas");
  // создаём переменную, через которую будем работать с холстом
  const context = canvas.getContext("2d");
  // обрабатываем по очереди все ячейки в каждом столбце и строке
  for (let x = 0; x < columnsSize; x++) {
    for (let y = 0; y < rowsSize; y++) {
      // если на карте лабиринта эта ячейка помечена как стена
      if (getField(x, y) === "▉") {
        // берём чёрный цвет
        context.fillStyle = "#f0f0f0";
        context.lineCap = "round";

        // начинаем рисовать новую фигуру
        context.beginPath();
        // делаем прямоугольник на месте этой ячейки
        context.rect(
          padding + x * fieldSize,
          padding + y * fieldSize,
          fieldSize,
          fieldSize
        );
        // закрашиваем его чёрным
        context.fill();
      }
    }
  }
}

// рисуем рамку и готовимся к отрисовке лабиринта

columnInput.addEventListener("input", () => {
  columnsSize = columnInput.value;
});
rowInput.addEventListener("input", () => {
  rowsSize = rowInput.value;
});

generateButton.addEventListener("click", () => {
  const canvas = document.createElement("canvas");
  document.body.insertAdjacentElement("afterbegin", canvas);
  map = generateMaze(columnsSize, rowsSize);
  init();
  drawMap();
  drawExit();
});
resetCanvasButton.addEventListener("click", () => {
  document.querySelector("canvas").remove();
});

saveButton.addEventListener("click", () => {
  const canvas = document.querySelector("canvas");
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "maze.png";
  link.click();
});

function drawExit() {
  const canvas = document.querySelector("canvas");
  // создаём переменную, через которую будем работать с холстом
  const context = canvas.getContext("2d");
  // берём белый цвет
  context.fillStyle = "white";
  // начинаем рисовать новую фигуру
  context.beginPath();
  // рисуем белый прямоугольник над первой ячейкой лабиринта
  context.rect(padding, 0, fieldSize, padding);
  // закрашиваем его белым
  context.fill();

  context.beginPath();

  if (columnsSize % 2 == 0) {
    shiftX = fieldSize;
  }
  if (rowsSize % 2 == 0) {
    shiftY = fieldSize;
  }
  context.rect(
    (columnsSize - 1) * fieldSize + padding - shiftX,
    rowsSize * fieldSize + padding - shiftY,
    fieldSize,
    padding + shiftY
  );

  // рисуем белый прямоугольник под последней ячейкой лабиринта
  context.rect(
    (columnsSize - 1) * fieldSize + padding,
    rowsSize * fieldSize + padding,
    fieldSize,
    padding
  );
  context.fill();
}
