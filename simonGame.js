$(document).ready(function() {
const errorBuzz = $("#errorBuzz")[0];
const greenButton = $("#greenAudio")[0];
const redButton = $("#redAudio")[0];
const blueButton = $("#blueAudio")[0];
const yellowButton = $("#yellowAudio")[0];
const simonButtons = [("#greenButton"), ("#redButton"), ("#blueButton"), ("#yellowButton")];
var count = 0;
$("#displayCount").text(count);
var buttonPressValidate = [] // compares user click to button id.
var buttonPress = []; // used for computer to read series of clicks;
var strict = false;
var gameOn = false;
var onBut = false; // only allows start game when set to true.

$("#displayCount").css("visibility", "hidden"); // hides count until on button is pressed.
  $(".onButton").on("click", function() {
    $(".onButton").css("background-color", "#ecd9c6");
    onBut = true;
    $("#displayCount").css("visibility", "visible");
    $("#displayCount").text(count);   
      $(".start").on("click", function() {
        if(onBut == true) {
        gameOn = true
        $(".start").css("visibility", "hidden");
        highLightSquare($(simonButtons));
        }
      });
    $(".strict").on("click", function() {
      if(strict == false) {
        strict = true;
      } else {
        strict= false;
      }
    });
  });
  
  $(".offButton").on("click", function() {
    $(".onButton").css("background-color", "tan");
    onBut = false;
    gameOn = false;
    clickNum = 0;
    buttonPressValidate = [];
    buttonPress = [];
    count = 0;
    $("#displayCount").text(count);
    $("#displayCount").css("visibility", "hidden");  
    $(".start").css("visibility", "visible");
  });
  
function pickRandomButton(buttons) {
  var spot = Math.floor(Math.random() * simonButtons.length);
  buttonPressValidate.push(buttons[spot].replace(/[#]/g, ""));
  console.log(buttonPressValidate);
  buttonPress.push(buttons[spot]);
    return $(buttons[spot]);
}

function highLightSquare(buttons) {
  var selectedButton = pickRandomButton(buttons);
  setTimeout(function() {
    var highLight = selectedButton.addClass("lit");
     if(selectedButton.attr("id") === "greenButton" && gameOn === true) {
     greenButton.play();
     } else if(selectedButton.attr("id") === "redButton" && gameOn === true) {
        redButton.play();
     } else if(selectedButton.attr("id") === "blueButton" && gameOn === true) {
        blueButton.play();
     } else if(selectedButton.attr("id") === "yellowButton" && gameOn === true) {
        yellowButton.play();
     }
    setTimeout(function() {
      var removeHighLight = selectedButton.removeClass("lit");
    }, 1000);
    count += 1;
    $("#displayCount").text(count); 
    clearTimeout(removeHighLight);
  }, 1000);
  clearTimeout(highLight);
}
   
function soundClick() {
  $(".button").on("click", function() {
    if($(this).attr("id") === "greenButton" && gameOn === true) {
      greenButton.play();   
    } else if ($(this).attr("id") === "redButton" && gameOn === true) {
        redButton.play();         
    } else if($(this).attr("id") === "blueButton" && gameOn === true) {
        blueButton.play();
    } else if($(this).attr("id") === "yellowButton" && gameOn === true) {
        yellowButton.play();
    }
  });
}

soundClick();
  
var clickNum = 0;
function correctClick(buttons) {
  var displayCount = $("#display").text();
  $(".button").on("click", function() {
    var thisClick = $(this).attr("id");
    var matchBut = buttonPressValidate[clickNum];
    if(thisClick == matchBut && gameOn === true) 
      clickNum++;
      if(thisClick == matchBut && count == 20 && gameOn === true) {
         win();
      }
      if(clickNum === buttonPressValidate.length && gameOn === true) {
        clickNum = 0;
        setTimeout(function() {
          replayFlash(buttonPress);
          setTimeout(function() {
            highLightSquare(buttons);
          }, buttonPress.length * 1000);
        }, 1000);
      } else if(thisClick != matchBut && strict == true && gameOn === true) {
          errorBuzz.play();
          reset();
          highLightSquare(buttons);
      } else if(thisClick != matchBut && strict == false && gameOn === true) {
          errorBuzz.play();
          clickNum = 0;
          replayFlash(buttonPress);
      } 
    });  
}

correctClick($(simonButtons));

function replayFlash(butPressArr) {
  function eachColor(i) {
    var litColor = $(butPressArr[i]);
    setTimeout(function() {
      litColor.addClass("lit");
      if(litColor.attr("id") === "greenButton") {
         greenButton.play();
      } else if(litColor.attr("id") === "redButton") {
          redButton.play();        
      } else if(litColor.attr("id") === "blueButton") {
          blueButton.play();      
      } else if(litColor.attr("id") === "yellowButton") {
          yellowButton.play();      
      }
      setTimeout(function() {
        litColor.removeClass("lit");
      }, 1000 - (1000 / 3));
    }, 1000 * (i + 1));
  }
  for(var i = 0; i < butPressArr.length; i++) {
    eachColor(i);
  }
}
  
function reset() {
  count = 0;
  $("#displayCount").text(count);
  clickNum = 0;
  buttonPress = [];
  buttonPressValidate = [];
} 

function win() {
  gameOn = false;
  $("#modal").show();
  reset();
  $("#modalClose").on("click", function() {
    $("#modal").hide();
    $(".start").css("visibility","visible")
  });
}
  
});