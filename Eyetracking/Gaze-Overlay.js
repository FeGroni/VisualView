import gazedata from './data.json' assert {type: 'json'}

function displayGaze() {
    const overlay = document.createElement('div');

    overlay.ID = 'gaze-overlay';

    overlay.style.position = 'absolute';
    overlay.style.top = '0px';
    overlay.style.left = '0px';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.pointerEvents = 'none';

    document.body.appendChild(overlay);

    return overlay
}
const gazeoverlay = displayGaze();

//generate starting point for noisegate
var dataPoints = [
    {x: window.innerWidth/2, y:window.innerHeight/2}
];
var index = 0;
var gazex, gazey;
var runthrough = 0;
var range = 25;

function updateGaze(){
    var previouspoint = dataPoints[dataPoints.length-1];
    if(index >= gazedata.length){
        index=0;
        runthrough += 1;
        console.log("runtrough: " + runtrough);
        return;
    }
    //get position
    if(parseFloat(gazedata[index].Lv) === 1 && parseFloat(gazedata[index].Rv) === 1) {
        gazex = (parseFloat(gazedata[index].Lx) + parseFloat(gazedata[index].Rx)) / 2.0;
        gazey = (parseFloat(gazedata[index].Ly) + parseFloat(gazedata[index].Ry)) / 2.0;

        var point = {
            x: gazex * window.innerWidth,
            y: gazey * window.innerHeight,
        }
        // Noisegate: cuts out / reduces overlaying points by range
        if(previouspoint.x >= point.x + range || previouspoint.x <= point.x - range || previouspoint.y >= point.y + range || previouspoint.y <= point.y - range ){
            dataPoints.push(point);
            index += 1;
        }
        else{
            index += 1;
        }
    }
    else {
        index += 1;
        updateGaze();
    }
}
updateGaze(); // run to get an Array of 2; otherwise Noisegate not possible

function setGaze(data){
    var dot = document.createElement("div");
    dot.classList.add("gaze-dot");

    dot.style.position = 'absolute';
    dot.style.width = '50px';
    dot.style.height = '50px';
    dot.style.backgroundColor = 'transparent';
    dot.style.border = '1px solid rgb(0,0,0,0.9)';
    dot.style.borderRadius = '50%';
    dot.style.transform = 'translate(-50%, -50%)';

    dot.style.top = data.y + "px";
    dot.style.left = data.x + "px";
    gazeoverlay.appendChild(dot);

    //remove old points: set timeout to a multiple of setInterval(timeout) to have the amount of visible points
    setTimeout(function(){
        dot.remove();
    }, 75);
};

setInterval(function(){
    updateGaze();
    setGaze(dataPoints[dataPoints.length - 1]);
}, 15);