import gazedata from './data.json' assert {type: 'json'}

function displayAOI() {

    //HTML-Elemente generieren
    const topleft = document.createElement('div');
    const topright = document.createElement('div');
    const bottomleft = document.createElement('div');
    const bottomright = document.createElement('div');

    //Klassen hinzufügen
    topleft.className = 'element-to-highlight';
    topleft.ID = 'topleft';
    topright.className = 'element-to-highlight';
    topright.ID = 'topright';
    bottomleft.className = 'element-to-highlight';
    bottomleft.ID = 'bottomleft';
    bottomright.className = 'element-to-highlight';
    bottomright.ID = 'bottomright';

    //CSS Styles hinzufügen
    topleft.style.backgroundColor = 'transparent';
    topright.style.backgroundColor = 'transparent';
    bottomright.style.backgroundColor = 'transparent';
    bottomleft.style.backgroundColor = 'transparent';

    topleft.style.width = '49.5vw'; //Hier Breite ändern
    topleft.style.height = '49.5vh'; //Hier Höhe ändern
    topleft.style.left = '0px'; //Hier Abstand von links ändern
    topleft.style.top = '0px';  //Hier Abstand von oben ändern
    topleft.style.position = 'absolute';
    topleft.style.transition = 'box-shadow 0.01s ease-in-out';
    topleft.style.zIndex = '9999';
    topleft.style.pointerEvents = 'none';

    topright.style.width = '49.5vw'; //Hier Breite ändern
    topright.style.height = '49.5vh';   //Hier Höhe ändern
    topright.style.right = '0px';   //Hier Abstand von rechts ändern
    topright.style.top = '0px'; //Hier Abstand von oben ändern
    topright.style.position = 'absolute';
    topright.style.transition = 'box-shadow 0.01s ease-in-out';
    topright.style.zIndex = '9999';
    topright.style.pointerEvents = 'none';

    bottomright.style.width = '49.5vw'; //Hier Breite ändern
    bottomright.style.height = '49.5vh';    //Hier Höhe ändern
    bottomright.style.right = '0px';    //Hier Abstand von rechts ändern
    bottomright.style.bottom = '0px';   //Hier Abstand von unten ändern
    bottomright.style.position = 'absolute';
    bottomright.style.transition = 'box-shadow 0.01s ease-in-out';
    bottomright.style.zIndex = '9999'
    bottomright.style.pointerEvents = 'none';

    bottomleft.style.width = '49.5vw'; //Hier Breite ändern
    bottomleft.style.height = '49.5vh'; //Hier Höhe ändern
    bottomleft.style.left = '0px';  //Hier Abstand von links ändern
    bottomleft.style.bottom = '0px';    //Hier Abstand von unten ändern
    bottomleft.style.position = 'absolute';
    bottomleft.style.transition = 'box-shadow 0.01s ease-in-out';
    bottomleft.style.zIndex = '9999';
    bottomleft.style.pointerEvents = 'none';

    document.body.appendChild(topleft);
    document.body.appendChild(topright);
    document.body.appendChild(bottomright);
    document.body.appendChild(bottomleft);

    return [topleft,topright,bottomleft,bottomright];
}
displayAOI();
const targetElements = displayAOI();

var x=0;
var y = 0;
var index = 0;  //Index der JSON-Datei
var runtrough = 0; //# Durchläufe

//Berechnung des aktuellen Blickpunkts
function gaze(){
    let gazex, gazey;
    if(index >= gazedata.length){
        index = 0;
        runtrough += 1;
        console.log("runtrough: " + runtrough);
        return;
    }
    if(parseFloat(gazedata[index].Lv) === 1 && parseFloat(gazedata[index].Rv) === 1){ //Berechnung erfolgt nur wenn Daten an dieser Stelle valide
    gazex = (parseFloat(gazedata[index].Lx) + parseFloat(gazedata[index].Rx))/2.0; //Mittelwert aus linkem und rechtem Auge
    gazey = (parseFloat(gazedata[index].Ly) + parseFloat(gazedata[index].Ry))/2.0; //Mittelwert aus linkem und rechtem Auge
    index += 1;
    }
    else {
        index += 1;
        gaze();
    }
    x = gazex * window.innerWidth; //genaue Koordinaten auf HTML-Position umrechnen
    y = gazey * window.innerHeight;
}

//Check ob Blickpunkt innerhalb des Elements für alle HTML Elemente
function setGaze() {
  Array.from(targetElements).forEach((element) => {
    const rect = element.getBoundingClientRect();

    if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
      element.style.boxShadow = 'inset 0 0 0 2px yellowgreen'; //Hier Rahmen Element ändern
    } else {
      element.style.boxShadow = 'none';
    }
  });
}

function updateGaze() {
  gaze();
  setGaze();
}

gaze(); //ein Startelement generieren
setInterval(updateGaze, 15); //Aktualisierungsrate