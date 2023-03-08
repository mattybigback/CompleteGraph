var canvas = document.getElementById('canvas');
var pointCount;
var numPoints;
var ctx = canvas.getContext('2d');
var parent = document.getElementById("canvasContainer");
var points = [];
var pointsAngle;
var radius;
var lineWidth;
var minWidth;
var maxWidth;
var form = document.getElementById("inputs")

window.addEventListener('resize', calcPoints, false);

form.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("draw").click();
  }
});



function canvasResize() {
  if (parent.offsetHeight <= parent.offsetWidth) {
    canvas.width = parent.offsetHeight -30;
    canvas.height = parent.offsetHeight -30;
  } else {
    canvas.width = parent.offsetWidth; -30;
    canvas.height = parent.offsetWidth; -30;
  }
  radius = (canvas.height / 2) - 10;
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function parseForm() {
  numPoints = Number(document.getElementById("inputs").elements.namedItem("numPoints").value);
  minPoints = document.getElementById("inputs").elements.namedItem("numPoints").min;
  maxPoints = document.getElementById("inputs").elements.namedItem("numPoints").max;
  lineWidth = document.getElementById("inputs").elements.namedItem("lineWidth").value;
  minWidth = document.getElementById("inputs").elements.namedItem("lineWidth").min;
  maxWidth = document.getElementById("inputs").elements.namedItem("lineWidth").max;

  if (numPoints % 1 != 0) {
    alert("Invalid number of points. Must be a whole number");
    document.getElementById("inputs").reset();
    return;
  }


  if (numPoints < minPoints || numPoints > maxPoints) {
    alert("Line width must be between " + minPoints + " and " + maxPoints);
    document.getElementById("inputs").reset();
    return;
  }

  if (lineWidth < minWidth || lineWidth > maxWidth) {
    alert("Must be between " + minWidth + " and " + maxWidth);
    document.getElementById("inputs").reset();
    return;
  }
  calcPoints();
}
function calcPoints(){
  pointsAngle = 360 / numPoints;
  canvasResize()
  clearCanvas();

  points = new Array(2); // create an empty array of length n
  for (var i = 0; i < numPoints; i++) {
    points[i] = new Array(2); // make each element an array
  }

  angle = 270
  for (var i = 0; i < numPoints; i++) {
    var xc = Math.round(Math.cos(degrees_to_radians(angle)) * radius);
    var yc = Math.round(Math.sin(degrees_to_radians(angle)) * radius);
    points[i][0] = xc + (canvas.height / 2);
    points[i][1] = yc + (canvas.height / 2);
    angle = angle + pointsAngle

  }
  draw()
}

function degrees_to_radians(degrees) {
  return degrees * (Math.PI / 180);
}



function draw() {
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.beginPath();
  for (var i = 0; i < numPoints; i++) {
    for (var j = 1; j < numPoints; j++) {
      ctx.moveTo(points[i][0], points[i][1]);
      //console.log(points[i][0], points[i][1])
      ctx.lineTo(points[j][0], points[j][1]);
    }
  }
  ctx.stroke();

}

