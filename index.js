// строим карту нового лабиринта
function generateMaze(columnsNumber, rowsNumber) {
  // карта лабиринта, на старте пустая
  const map = [];

  // сначала заполняем все ячейки карты стенами
  for (let y = 0; y < rowsNumber; y++) {
    // в цикле создаём сначала пустой массив — строку
    const row = [];
    // и заполняем её ячейками с пометкой «стена» столько раз, сколько у нас столбцов
    for (let x = 0; x < columnsNumber; x++) {
      row.push("▉");
    }
    // как только собрали очередную строку, отправляем её в массив с картой
    map.push(row);
  }

  // функция проверяет чётное число или нет, и если чётное — возвращает true
  function isEven(n) {
    return n % 2 === 0;
  }

  // функция возвращает случайный элемент из переданного ей массива
  function getRandomFrom(array) {
    // получаем случайным образом индекс элемента массива
    // число будет в диапазоне от 0 до количества элементов в массиве минус 1
    const index = Math.floor(Math.random() * array.length);
    // возвращаем элемент массива с полученным случайным индексом
    return array[index];
  }

  // выбираем случайным образом чётные координаты на карте с лабиринтом
  const startX = getRandomFrom(
    Array(columnsNumber)
      .fill(0)
      .map((item, index) => index)
      .filter((x) => isEven(x))
  );
  const startY = getRandomFrom(
    Array(rowsNumber)
      .fill(0)
      .map((item, index) => index)
      .filter((x) => isEven(x))
  );

  // трактор, который будет очищать дорожки в лабиринте
  var tractor = {};
  // ставим его на чётную клетку
  tractor.x = startX;
  tractor.y = startY;

  // функция — записать значение ячейки в карту по координатам
  function setField(x, y, value) {
    // если координаты выходят за границы карты с лабиринтом
    if (x < 0 || x >= columnsNumber || y < 0 || y >= rowsNumber) {
      // прекращаем работу функции и возвращаем пустое значение
      return null;
    }
    // если дошли досюда, значит, с координатами всё в порядке, и мы записываем значение ячейки по нашим координатам
    map[y][x] = value;
  }

  // сделаем ячейку, в которой стоит трактор, пустой
  setField(startX, startY, " ");

  // функция проверяет, готов лабиринт или ещё нет
  // возвращает true, если лабиринт готов; false, если ещё нет
  function isMaze() {
    // во вложенном цикле проверяем по очереди все ячейки карты
    for (let x = 0; x < columnsNumber; x++) {
      for (let y = 0; y < rowsNumber; y++) {
        // если на чётных местах ещё можно встретить стену,
        if (isEven(x) && isEven(y) && getField(x, y) === "▉") {
          // то карта с лабиринтом не готова
          return false;
        }
      }
    }
    // а если мы дошли досюда и функция не прервалась на предыдущей проверке, то лабиринт готов

    // рисуем лабиринт в консоли
    // переменные для отрисовки строк и границ
    var s,
      d = "";
    // рисуем верхнюю границу лабиринта
    for (var i = 0; i < columnsNumber; i++) {
      d = d + "▉";
    }
    console.log("▉" + d + "▉");
    // рисуем каждую строку
    for (var i = 0; i < rowsNumber; i++) {
      s = "";
      for (var j = 0; j < columnsNumber; j++) {
        s = s + map[i][j];
      }
      console.log("▉" + s + "▉");
    }
    // рисуем нижнюю границу лабиринта
    console.log("▉" + d + "▉");
    // сообщаем, что всё готово и выходим из функции
    return true;
  }

  // пока лабиринт не готов, отправляем трактор двигаться дальше
  while (!isMaze()) {
    moveTractor();
  }

  // если предыдущий цикл закончился, то заканчиваем общую работу скрипта и возвращаем готовую карту
  return map;

  // получить значение ячейки из карты по координатам
  function getField(x, y) {
    // если координаты выходят за границы карты с лабиринтом
    if (x < 0 || x >= columnsNumber || y < 0 || y >= rowsNumber) {
      // прекращаем работу функции и возвращаем пустое значение
      return null;
    }
    // если дошли досюда, значит, с координатами всё в порядке, и мы возвращаем значение ячейки по нашим координатам
    return map[y][x];
  }

  // двигаем трактор, который расчищает лабиринт
  // трактор двигается на 2 клетки, и если вторая клетка — это стена, то очищаем обе
  function moveTractor() {
    // массив с возможными направлениями трактора
    const directs = [];
    // если есть место слева
    if (tractor.x > 0) {
      // помечаем, что можно идти налево
      directs.push("left");
    }

    // если есть место справа
    if (tractor.x < columnsNumber - 2) {
      // помечаем, что можно идти направо
      directs.push("right");
    }

    // если есть место сверху
    if (tractor.y > 0) {
      // помечаем, что можно идти наверх
      directs.push("up");
    }

    // если есть место внизу
    if (tractor.y < rowsNumber - 2) {
      // помечаем, что можно идти вниз
      directs.push("down");
    }

    // случайным образом выбираем направление, в котором можно пойти
    const direct = getRandomFrom(directs);

    //  в зависимости от выбранного направления, обрабатываем клетки
    switch (direct) {
      case "left":
        // если через 2 ячейки стена, то очищаем обе
        if (getField(tractor.x - 2, tractor.y) === "▉") {
          setField(tractor.x - 1, tractor.y, " ");
          setField(tractor.x - 2, tractor.y, " ");
        }
        // меняем координату трактора
        tractor.x -= 2;
        break;
      case "right":
        // если через 2 ячейки стена, то очищаем обе
        if (getField(tractor.x + 2, tractor.y) === "▉") {
          setField(tractor.x + 1, tractor.y, " ");
          setField(tractor.x + 2, tractor.y, " ");
        }
        // меняем координату трактора
        tractor.x += 2;
        break;
      case "up":
        // если через 2 ячейки стена, то очищаем обе
        if (getField(tractor.x, tractor.y - 2) === "▉") {
          setField(tractor.x, tractor.y - 1, " ");
          setField(tractor.x, tractor.y - 2, " ");
        }
        // меняем координату трактора
        tractor.y -= 2;
        break;
      case "down":
        // если через 2 ячейки стена, то очищаем обе
        if (getField(tractor.x, tractor.y + 2) === "▉") {
          setField(tractor.x, tractor.y + 1, " ");
          setField(tractor.x, tractor.y + 2, " ");
        }
        // меняем координату трактора
        tractor.y += 2;
        break;
    }
  }
}
