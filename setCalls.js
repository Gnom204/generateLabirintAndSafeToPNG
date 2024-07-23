function drawCells(canvas, cellSize) {
  const ctx = canvas.getContext("2d");

  const width = canvas.width;
  const height = canvas.height;
  for (var x = 0; x <= width; x += 40) {
    ctx.moveTo(0.5 + x + cellSize, cellSize);
    ctx.lineTo(0.5 + x + cellSize, height + cellSize);
  }

  for (var x = 0; x <= height; x += 40) {
    ctx.moveTo(cellSize, 0.5 + x + cellSize);
    ctx.lineTo(width + cellSize, 0.5 + x + cellSize);
  }
  ctx.strokeStyle = "black";
  ctx.stroke();
}
