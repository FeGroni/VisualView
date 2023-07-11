import users from './data.json' assert {type: 'json'}

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

    topleft.style.backgroundColor = 'transparent';
    topright.style.backgroundColor = 'transparent';
    bottomright.style.backgroundColor = 'transparent';
    bottomleft.style.backgroundColor = 'transparent';

    topleft.style.width = '49.5vw';
    topleft.style.height = '49.5vh';
    topleft.style.left = '0px';
    topleft.style.top = '0px';
    topleft.style.position = 'absolute';
    topleft.style.transition = 'box-shadow 0.01s ease-in-out';
    topleft.style.zIndex = '9999';

    topright.style.width = '49.5vw';
    topright.style.height = '49.5vh';
    topright.style.right = '0px';
    topright.style.top = '0px';
    topright.style.position = 'absolute';
    topright.style.transition = 'box-shadow 0.01s ease-in-out';
    topright.style.zIndex = '9999';

    bottomright.style.width = '49.5vw';
    bottomright.style.height = '49.5vh';
    bottomright.style.right = '0px';
    bottomright.style.bottom = '0px';
    bottomright.style.position = 'absolute';
    bottomright.style.transition = 'box-shadow 0.01s ease-in-out';
    bottomright.style.zIndex = '9999'

    bottomleft.style.width = '49.5vw';
    bottomleft.style.height = '49.5vh';
    bottomleft.style.left = '0px';
    bottomleft.style.bottom = '0px';
    bottomleft.style.position = 'absolute';
    bottomleft.style.transition = 'box-shadow 0.01s ease-in-out';
    bottomleft.style.zIndex = '9999';

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
var index = 0;
var runtrough = 0;

function gaze(){
    let gazex, gazey;
    if(index >= users.length){
        index = 0;
        runtrough += 1;
        console.log("runtrough: " + runtrough);
        return;
    }
    if(parseFloat(users[index].Lv) === 1 && parseFloat(users[index].Rv) === 1){
    gazex = (parseFloat(users[index].Lx) + parseFloat(users[index].Rx))/2.0;
    gazey = (parseFloat(users[index].Ly) + parseFloat(users[index].Ry))/2.0;
    index += 1;
    }
    else {
        index += 1;
        gaze();
    }
    x = gazex * window.innerWidth;
    y = gazey * window.innerHeight;
}

function setGaze() {
  Array.from(targetElements).forEach((element) => {
    const rect = element.getBoundingClientRect();

    if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
      element.style.boxShadow = 'inset 0 0 0 2px yellowgreen';
    } else {
      element.style.boxShadow = 'none';
    }
  });
}


function updateGaze() {
  gaze();
  setGaze();
}

gaze();
setInterval(updateGaze, 14);