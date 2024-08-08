const buttonColours = new Array("red", "blue", "green", "yellow");

var randomChosenColour = buttonColours[nextSequence()];

console.log(randomChosenColour);

function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    return randomNumber;
}