const divLocation = document.getElementById('location');
const myPossibilities = document.getElementById('possibilities');
const myInput = document.getElementById('myInput');
const feedback = document.getElementById('feedback');
const imageLocation = document.getElementById('imageLocation');
const myDescription = document.getElementById('description');
const myInventory = document.getElementById('inventory');

const treasure = document.getElementById('treasure');



//------------------------------------------------------
//Treasure got
treasureGot = [];


//treasureGot[0] = "inventory is leeg";
//treasureGot[1] = "sleutel";
//treasureGot[2] = "corona";
//treasureGot[3] = "schatkist";


var treasureList = ["Speciale commando's", "-pak", "-open"]

var i = 0;
var len = treasureList.length;
var text = "";

for (; i < len; ) {
  text += treasureList[i] + "<br>";
  i++;
}
document.getElementById("treasureList").innerHTML = text;

let keyGot = 0;

let coronaGot = 0;

let gemGot = 0;

let coinGot = 0;

let deurOpen = 0;

//update
setInterval(update, 1)
//-------------------------------------------------------

var treasureGevonden = false;

let currentLocation = 7;

let locations = [];
locations[0] = "tweede verdieping: bar";
locations[1] = "tweede verdieping: gang";
locations[2] = "tweede verdieping: schatkamer";
locations[3] = "eerste verdieping: opbergplaats";
locations[4] = "eerste verdieping: gang";
locations[5] = "eerste verdieping: eetruimte";
locations[6] = "buiten: linker gevel";
locations[7] = "buiten: voordeur";
locations[8] = "buiten: rechter gevel";

images = [];
images[0] = "room0.png";
images[1] = "room1.png";
images[2] = "room2.png";
images[3] = "room3.png";
images[4] = "room4.png";
images[5] = "room5.png";
images[6] = "room6.png";
images[7] = "room7.png";
images[8] = "room8.png";

directions = [];
directions[0] = ["oost"];
directions[1] = ["west", "zuid", "oost"];
directions[2] = ["west"];
directions[3] = ["oost"];
directions[4] = ["noord", "west", "zuid", "oost"];
directions[5] = ["west"];
directions[6] = ["oost"];
directions[7] = ["noord", "west", "oost"];
directions[8] = ["west"];

descriptions = [];
descriptions[0] = "U bevind zich in een kamer met een aantal stoelen";
descriptions[1] = "U bevind zich in de tweede verdieping. U ziet rechts van u een dichte deur.";
descriptions[2] = "U ziet allemaal geld, u hebt gewonnen";
descriptions[3] = "U ziet een grote kast staan in de kamer";
descriptions[4] = "U bevindt zich in het mysterieuse huis. U ziet een trap naar boven en twee kamers aan beide zijkanten.";
descriptions[5] = "U bevind zich in een eetruimte.";
descriptions[6] = "U kijkt om de hoek van het huis.";
descriptions[7] = "U staat voor een grote huis, de voordeur is open. Mischien staat er wat aan de zijkanten van het huis.";
descriptions[8] = "U kijkt om de hoek van het huis.";

//---------------treasures----------
treasures = [];
treasures[0] = "coin";
treasures[8] = "sleutel";
treasures[5] = "corona";
treasures[3] = "gem";

treasuresImages = [];
treasuresImages[0] = "Coin.png";
treasuresImages[8] = "Sleutel.png";
treasuresImages[5] = "Corona.png";
treasuresImages[3] = "Gem.png";

treasureInventory = [];
treasureInventory[0] = "Coin";
treasureInventory[8] = "Sleutel";
treasureInventory[5] = "Corona";
treasureInventory[3] = "Gemkist";

//----------------------------------------
myInput.addEventListener('keydown', getInput, false);

function getInput(evt) {
  if (evt.key == "Enter") {
    let inputArray = myInput.value.split(" ");

    if (inputArray[0] == "ga") {
      if (directions[currentLocation].indexOf(inputArray[1]) != -1) {
        switch (inputArray[1]) {
          case "noord":
            currentLocation -= 3;
            break;
          case "zuid":
            currentLocation += 3;
            break;
          case "oost":
            if(currentLocation == 1 && deurOpen == 1){
            currentLocation += 1;
            }
            else if(currentLocation == 1 && deurOpen == 0){
            feedback.innerHTML = "Deur is op slot";
            setTimeout(removeFeedback, 2000);
            }else{
            currentLocation += 1;
			}
            break;
          case "west":
            currentLocation -= 1;
            break;

            //-------------------------------
            case "open":
            if(currentLocation == 1 && keyGot == 1){
                    feedback.innerHTML = "Je opent de deur";
        setTimeout(removeFeedback, 2000);
        deurOpen = 1;
        }
            break;
            //-------------------------------

            //Pak object
            case "pak":
            //controleer schat
            if(treasureGevonden){
                                    console.log('treasureGevonden');
            //schatpakken naar inventory
            treasureInventory[currentLocation] = treasures[currentLocation]; //schat zit in inventory
            treasures[currentLocation] = "";
            treasureGevonden = false;
            }
        }
      } else {
        feedback.innerHTML = "dat mag niet";
        setTimeout(removeFeedback, 2000);

      }
      giveLocation();
      myInput.value = "";
    }

    if (inputArray[0] == "pak") {
      console.log('ga wat pakken');
      myInput.value = "";
      //Sleutel
      if (locations[8] && currentLocation == 8 && keyGot != 1){
            treasureGevonden = true;
            feedback.innerHTML = "U pakt de sleutel";
            setTimeout(removeFeedback, 4000);
            treasureInventory[currentLocation] = treasures[currentLocation]; //schat zit in inventory
            treasures[currentLocation] = "";
            treasureGot.push("Sleutel");
            keyGot = 1;
            treasuresImages[8] = "";
            treasureGevonden = false;
            }
            //Munt
            else if (locations[0] && currentLocation == 0 && coinGot != 1){
            treasureGevonden = true;
            coinGot = 1;
            feedback.innerHTML = "U pakt de munt";
            setTimeout(removeFeedback, 4000);
            treasuresImages[0] = "";
            treasureGot.push("Munt");
            treasureGevonden = false;
            }
            //Gem
            else if (locations[3] && currentLocation == 3 && gemGot != 1){
            treasureGevonden = true;
            gemGot = 1;
            feedback.innerHTML = "U pakt het diamant";
            setTimeout(removeFeedback, 4000);
            treasuresImages[3] = "";
            treasureGot.push("Diamant");
            treasureGevonden = false;
            }
            //Corona
            else if (locations[5] && currentLocation == 5 && coronaGot != 1){
            treasureGevonden = true;
            coronaGot = 1;
            feedback.innerHTML = "U pakt het Coronabier";
            setTimeout(removeFeedback, 4000);
            treasuresImages[5] = "";
            treasureGot.push("Corona");
            treasureGevonden = false;
            }else{
            feedback.innerHTML = "U kunt niks pakken.";
            setTimeout(removeFeedback, 4000);
            console.log('Hier is geen item');
			}

    }

    if (inputArray[0] == "gebruik"){
      console.log('ga wat gebruiken');
      myInput.value = "";
    }

    //---------------------------------------------------
        if (inputArray[0] == "open"){
      console.log('open');

                  if(currentLocation == 1 && keyGot == 1){
            console.log('Deur open');
                        //currentLocation += 1;
                        //locations += 1;
                        deurOpen = 1;
                        feedback.innerHTML = "U opent de deur.";
                        setTimeout(removeFeedback, 4000);
                        }
            else if(keyGot == 0){
            console.log('Je hebt geen sleutel');
			feedback.innerHTML = "De deur is op slot.";
            setTimeout(removeFeedback, 4000);
			}else{
            feedback.innerHTML = "Er is niks om te openen.";
            setTimeout(removeFeedback, 4000);
            console.log('Er is geen deur');   
			}
                  myInput.value = "";
    }
    //---------------------------------------------------

    if (inputArray[0] != "ga" && inputArray[0] != "pak" && inputArray[0] != "gebruik" && inputArray[0] != "open"){
      feedback.innerHTML = "mogelijke commando's zijn: ga, pak, gebruik en help";
      myInput.value = "";
      setTimeout(removeFeedback, 4000);
    }

  }
}

    // update inventory




//Grid verwijderen-->>(  + " =>| grid " + currentLocation)
function giveLocation() {
  divLocation.innerHTML = locations[currentLocation];
  //verandert beschrijving naar huidige locatie
  myDescription.innerHTML = descriptions[currentLocation];
  //imageLocation weergeven met huidige locatie
  imageLocation.src = "media/" + images[currentLocation];
  myDirections = "mogelijke richtingen zijn: ";
  for (let i = 0; i < directions[currentLocation].length; i++) {
    myDirections += "<li>" + directions[currentLocation][i] + "</li>";
  }
  myDirections += checkTreasure(currentLocation);
  myPossibilities.innerHTML = myDirections;
  }
  //------------------------------
  function update(){
  //inventory
  Treasureroom();
  myInventory.innerHTML = treasureGot;

  showTreasure(currentLocation);



  

  //-------------------------------------
}


function removeFeedback() {
  feedback.innerHTML = "";
}

giveLocation();

function showTreasure(currentLocation){
    if(typeof treasures[currentLocation] != "undefined"){
     console.log(treasures[currentLocation]);
     treasure.src = "treasures/" + treasuresImages[currentLocation];
	}
}

  function checkTreasure(){
 
  }

      function Treasureroom(){
      if (currentLocation == 2){
              feedback.innerHTML = "U HEBT GEWONNEN!!!";
	  }}

