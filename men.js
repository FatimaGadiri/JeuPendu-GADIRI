var lives = 10, pathFromx, pathFromy, pathTox, pathToy;
var drawArray = [];

  
function classCanvas(){
  $("<p>").attr("id", "mylives").appendTo($('#divMen'));
  $("<div>").attr("class", "men").html("Pendu <br>").appendTo($('#divMen'));
  $("<canvas>").attr("id", "myCanvas").appendTo($('.men'));
}

classCanvas();

function men(lives) {

  comments();

  var c = $("#myCanvas").get(0).getContext("2d")

  function draw(pathFromx, pathFromy, pathTox, pathToy) {
    c.beginPath();
    c.moveTo(pathFromx, pathFromy);
    c.lineTo(pathTox, pathToy);
    c.stroke();
  }
  // Hangman
  function canvas() {
    var gradient = c.createLinearGradient(0, 0, 170, 0);
    gradient.addColorStop("0", "magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "red");


    c.beginPath();
    c.strokeStyle = gradient;
    c.lineWidth = 5;
    c.strokeRect(20, 20, 150, 100);
  };
  mylives
  var head = function () {
    c.beginPath();
    c.arc(60, 25, 10, 0, Math.PI * 2, true);
    c.stroke();
  }

  var frame1 = function () {
    draw(0, 150, 150, 150);
  };

  var frame2 = function () {
    draw(10, 0, 10, 600);
  };

  var frame3 = function () {
    draw(0, 5, 70, 5);
  };

  var frame4 = function () {
    draw(60, 5, 60, 15);
  };

  var torso = function () {
    draw(60, 36, 60, 70);
  };

  var rightArm = function () {
    draw(60, 46, 100, 50);
  };

  var leftArm = function () {
    draw(60, 46, 20, 50);
  };

  var rightLeg = function () {
    draw(60, 70, 100, 100);
  };

  var leftLeg = function () {
    draw(60, 70, 20, 100);
  };


  drawArray = [rightLeg, leftLeg, rightArm, leftArm, torso, head, frame4, frame3, frame2, frame1];

  return drawArray[lives]();
}


function comments() {
  $('#mylives').text("il vous reste " + lives + " lives");
  if(lives <= 1){
    $("#myCanvas").css("background-color", "red");
  }
  
  if (lives == 0) {
    $("#divLetterButton").prop('disabled', true);
    $("#mylives").html(" <br> Game Over");
    askQuestion();
  }
}