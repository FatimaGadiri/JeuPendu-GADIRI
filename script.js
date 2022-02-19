
var randomWord, randomWordMapping, nameOfPlayer, numberPlayers = Number.MAX_SAFE_INTEGER;
var alphabet = [], players = [];


$('<p>').attr("id", "msg").appendTo($('#divBadChoice'));
$('<ul>').attr("id", "ul_div").appendTo($('#divBadChoice'));

$(function () {
  $(document).ready(function () {
    $("#initButton").click(function () {

      getStart();
    });
  });
});



function getStart() {


  randomWord = getRandomWord(0, words.length - 1);

  randomWordMapping = getRandomWordMapping(randomWord);


  // affichage de '_' pour le mot choisi
  getDisplaySymbol(randomWordMapping);


  $("<p>").attr("id", "msgLetter").html("Tentez de deviner le mot secret en proposant des lettres <br> si trop de vos choix sont erronés vous tuerez le pendu et vous perdrez la partie").appendTo($('#divGame'));
  $("<input>").attr("id", "inputLetter").attr("placeholder", "[A, B]").appendTo($('#divGame'));
  $("<button>").attr("id", "divLetterButton").text('Valider').appendTo($('#divGame')).click(getGame);
}


// pour avoir le mot il faut récupérer sa position dans le tableau words
function getRandomWord(min, max) {
  var position = Math.floor(Math.random() * (max - min + 1)) + min;
  return words[position];
}

// pour avoir une liste ordonnée de sous-chaînes
function getRandomWordMapping(randomWord) {
  return randomWord.split('');
}


function getDisplaySymbol(randomWordMapping) {
  $("#div_Start").html(" ");
  $('<ul>').attr("id", "ulDivGame").appendTo($('#divGame'));
  for (var index = 0; index < randomWordMapping.length; index++) {
    $('<li>').attr("id", "ilDivGame" + index).text('_').appendTo('#ulDivGame');
  }
}


function getGame() {

  var letterProposedByPlayer = $("#inputLetter").val();
  $("#inputLetter").val('');
  getLetterProposedByPlayer(letterProposedByPlayer);
  var incopmlet = false;
  for (var index = 0; index < randomWordMapping.length; index++) {
    if ($("#ilDivGame" + index).html() == '_') {
      incopmlet = true;
    }
  }
  if (incopmlet == false) {
    $("#ulDivGame").text(randomWord);
    DivName();
    $("#divLetterButton").prop('disabled', true);
  }
}

function getLetterProposedByPlayer(letterProposedByPlayer) {
  var isExist = false;

  for (var index = 0; index < randomWordMapping.length; index++) {
    if (letterProposedByPlayer.toLowerCase() == randomWordMapping[index].toLowerCase()) {
      isExist = true;
      $("#ilDivGame" + index).html(letterProposedByPlayer.toUpperCase());
      if ($("#ulDivGame").text() == randomWord) {
        DivName();
      }
    }
  }

  if (isExist == false) {
    $("#msg").html("Mauvais choix :  <br>");
    $('<li>').text(letterProposedByPlayer.toUpperCase()).appendTo($('#ul_div'));
    var position = randomWordMapping.indexOf(letterProposedByPlayer);
    if (position === -1);
    lives -= 1;
    men(lives);
    drawArray.length -= 1;

  }
}

function askQuestion() {
  $("<p>").attr('id', 'divNewGame').text('Nouvelle partie ?').appendTo($("#divGame"))
  $("<button>").attr('id', 'divNoButton').text('Non').appendTo($("#divGame")).click(msgNo);
  $("<button>").attr('id', 'divYesButton').text('Oui').appendTo($("#divGame")).click(msgYes);
}

function msgNo() {
  $("#divGame").html(" ");
  $("#divBadChoice").html(" ");
  $("#divMen").html(" ");
  $("<p>").attr('id', 'divNotNewGameButton').text('Merci pour votre participation. A Bientôt!').appendTo($("#divGame"));
  table_htlm();
}


function msgYes() {
  lives = 10;
  $("#divGame").html(" ");
  $("#divBadChoice").html(" ");
  $('<p>').attr("id", "msg").appendTo($('#divBadChoice'));
  $('<ul>').attr("id", "ul_div").appendTo($('#divBadChoice'));
  $("#divMen").html(" ");
  classCanvas();
  getStart();
}


function DivName() {
  $("#divGame").html(" ");
  $("<p>").attr('id', 'msgName').html("Bravo! vous avez découvert le mot secret !<br>" + randomWord.toUpperCase() + "<br> Entrez votre nom s'il vous plais").appendTo($("#divGame"))
  $("<input>").attr("id", "inputName").attr("placeholder", "name").appendTo($('#divGame'));
  $("<button>").attr('id', 'divNameButton').text('Entrer').appendTo($("#divGame")).click(getNameofPlayer);

}


function getNameofPlayer() {

  var player = { nameOfPlayer: $("#inputName").val(), lives: lives };

  if (players.length  < numberPlayers - 1) {
    players.push(player);
    players.sort(function (a, b) { return b.lives - a.lives });
    $("#divGame").html("");
    askQuestion();
  }




  // sauvegarder un objet
  
  localStorage['mydata'] = JSON.stringify(players);
  // récupérer la valeur après rechargement
  if ('mydata' in localStorage) {
  players = jQuery.parseJSON(localStorage[key]);
  }
  // lister le contenu de localStorage
  for (key in localStorage) {
  console.log(localStorage[key]);
  }

}


function table_htlm() {

  $("#head").html("");
  $("<th>").attr('id', "range").html("Rang").appendTo($("#head"));
  $("<th>").attr('id', "nom").html("Nom").appendTo($("#head"));
  $("<th>").attr('id', "score").html("Score").appendTo($("#head"));

  $("#body").html(" ")
  for (var index = 0; index < players.length; index++) {
    $("<tr>").attr('id', "tr" + index).appendTo($("#body"));
    $("<td>").attr('id', "th" + index + "1").appendTo($("#tr" + index));
    $("<h3>").text((index + 1)).appendTo($("#th" + index + "1"));
    $("<td>").attr('id', "th" + index + "2").text(players[index].nameOfPlayer).appendTo($("#tr" + index));
    $("<td>").attr('id', "th" + index + "3").text(players[index].lives).appendTo($("#tr" + index));
  }
}
