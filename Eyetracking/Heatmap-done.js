import gazedata from './data.json' assert {type: 'json'}
function displayHeatmap() {
    //HTML-Elemente generieren
    const heatmapWrapper = document.createElement('div');
    const heatmap = document.createElement('div');
    const canvas = document.createElement('canvas');
    const button = document.createElement('button');
    const buttonText = document.createTextNode('Toggle Heatmap');

    heatmap.ID = 'heatmap';
    canvas.ID = 'heatmap canvas';
    button.ID = 'toggleButton';

    //CSS-Styles definieren
    button.title = 'Toggle Heatmap';
    button.style.position = 'fixed';
    button.style.top = '10px';
    button.style.right = '10px';
    button.style.zIndex = '9999';

    //Wrapper der Heatmap
    heatmapWrapper.style.position = 'absolute'; // als fixiertes Overlay: 'fixed'
    heatmapWrapper.style.top = '0';
    heatmapWrapper.style.left = '0';
    heatmapWrapper.style.width = '100%';
    heatmapWrapper.style.height = '100%';
    heatmapWrapper.style.zIndex = '9999';
    heatmapWrapper.style.pointerEvents = 'none';

    heatmap.style.zIndex = '9998';
    heatmap.style.position = 'relative';
    heatmap.style.top = '0';
    heatmap.style.left = '0';
    heatmap.style.width = '100%';
    heatmap.style.height = '100%';
    heatmap.style.pointerEvents = 'none';
    heatmap.style.display = 'block';

    canvas.style.zIndex = '9997';
    canvas.style.position = 'relative';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';

    document.body.appendChild(heatmapWrapper);
    heatmapWrapper.appendChild(heatmap);
    heatmapWrapper.appendChild(canvas);
    document.body.appendChild(button);

    button.appendChild(buttonText);

    return [button, canvas, heatmap];
}

const elements = displayHeatmap();
// neue Heatmap generieren

var index = 0;
var runtrough = 0;
var gazex, gazey;

//Initialisierung des Arrays mit den Datenpunkten
var heatmapData = {
        max: 1,
        data: [{
            x: 100,
            y: 200,
            value: 1,
        }],
};

//Initalisierung der Heatmap (h337 aus Heatmap.js Library)
var heatmapInstance = h337.create({
    container: elements[2],
    data: heatmapData,
    radius: 25,
});

//Funktion um Heatmap neue Punkte hinzuzfügen
function updateHeatmap() {
    if(index >= gazedata.length){
        index=0;
        runtrough += 1;
        console.log("runtrough: " + runtrough);
        return;
    }
    if(parseFloat(gazedata[index].Lv) === 1 && parseFloat(gazedata[index].Rv) === 1){   //Berechnung erfolgt nur bei validen Daten
        gazex = (parseFloat(gazedata[index].Lx) + parseFloat(gazedata[index].Rx))/2.0; //Berechnung des Mittelwerts aus linkem und rechtem Auge
        gazey = (parseFloat(gazedata[index].Ly) + parseFloat(gazedata[index].Ry))/2.0; //-''-
        index += 1;
        var point = {
            x: gazex * window.innerWidth, //Umrechnung auf HTML-Position
            y: gazey * window.innerHeight,
            value: 1,
        }
        heatmapData.data.push(point);
        console.log(heatmapData);
        heatmapInstance.addData(heatmapData);
        heatmapInstance.setData(heatmapData);
    }
    else {
        index += 1;
        updateHeatmap();
    }
}

setInterval(updateHeatmap, 15);

// Button um Heatmap anzuzeigen
const toggleButton = elements[0];
toggleButton.addEventListener("click", function () {
    if(elements[2].style.display === 'block') { // display bestimmt die Sichtbarkeit
        elements[2].style.display = 'none'; // 'block'= sichtbar; 'none'= unsichtbar
    }
    else {
        elements[2].style.display = 'block';
    }
});
