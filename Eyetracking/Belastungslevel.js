import gazedata from './datapm.json' assert {type: 'json'}
function displayBarometer() {
    // HTML-Elemente generieren
    const container = document.createElement('section');
    const barometerContainer = document.createElement('div');
    const barometer = document.createElement('div');
    const circle = document.createElement('div');
    const innercircle = document.createElement('div');
    const barSocket = document.createElement('div');
    const barBackground = document.createElement('div');
    const bar = document.createElement('div');
    const text = document.createElement('p');

    // Klassen addieren
    container.className = 'container';
    barometerContainer.className = 'barometer-container';
    barometerContainer.ID = 'barometercontainer';
    barometer.className = 'Barometer';
    circle.className = 'circle';
    innercircle.className ='innercircle';
    barSocket.className = 'barsocket';
    barBackground.className = 'barbackground';
    bar.id = 'bar';
    bar.className = 'bar';
    text.className = 'text';

    //styles definieren
    barometerContainer.style.position ='fixed';
    barometerContainer.style.top = '200px';
    barometerContainer.style.right = '200px';
    barometerContainer.style.zIndex = '1';

    container.style.position = 'relative';
    container.style.height ='100%';
    container.style.display = 'flex';
    container.style.alignItems='center';
    container.style.justifyContent= 'center';

    barometer.style.content='BPM';
    barometer.style.position='absolute';
    barometer.style.height='450px';
    barometer.style.width='100px';

    circle.style.position='absolute';
    circle.style.height='100px';
    circle.style.width='100px';
    circle.style.bottom='0%';
    circle.style.backgroundColor='black';
    circle.style.borderRadius='50%';

    innercircle.style.display ='block';
    innercircle.style.width='60px';
    innercircle.style.height='60px';
    innercircle.style.borderRadius='50%';
    innercircle.style.backgroundColor='blue';
    innercircle.style.position='absolute';
    innercircle.style.top='50%';
    innercircle.style.left='50%';
    innercircle.style.transform = 'translate(-50%,-50%)';

    barSocket.style.position='absolute';
    barSocket.style.display='block';
    barSocket.style.zIndex='1';
    barSocket.style.height='30px';
    barSocket.style.width='20px';
    barSocket.style.top='0%';
    barSocket.style.left='40%';
    barSocket.style.backgroundColor='blue';

    barBackground.style.position='absolute';
    barBackground.style.height ='350px';
    barBackground.style.width='40px';
    barBackground.style.backgroundColor='black';
    barBackground.style.borderRadius='25px 25px 0 0';
    barBackground.style.bottom='90px';
    barBackground.style.right='30%';
    barBackground.style.transform='translateY(0%)';
    barBackground.style.overflow = 'hidden';

    bar.style.position='absolute';
    bar.style.height='320px';
    bar.style.width='20px';
    bar.style.bottom='10px';
    bar.style.left='25%';
    bar.style.transformOrigin='bottom-center';
    bar.style.borderRadius='10px 10px 0 0';
    bar.style.backgroundColor='blue';
    bar.style.transition='height 0.5s ease-out';

    text.textContent = 'Belastungslevel';
    text.style.position = 'absolute';
    text.style.bottom = '-40px';
    text.style.left = '-3px';
    text.style.backgroundColor = 'transparent';
    text.style.color = 'black';

    // dem Container hinzufügen
    document.body.appendChild(container);
    container.appendChild(barometerContainer)
    barometerContainer.appendChild(barometer);
    barometer.appendChild(circle);
    circle.appendChild(barSocket);
    circle.appendChild(innercircle);
    barometer.appendChild(text);
    barometer.appendChild(barBackground);
    barBackground.appendChild(bar);

    return bar
}
// Barometer anzeigen
const bar = displayBarometer();
var baseline =  1;
function getBaseline() {
    while(ind<= gazedata.length) {
        var baseline = 0;
        var ind = 0;
        baseline = baseline + (parseFloat(gazedata[ind].Lpm) + parseFloat(gazedata[ind].Rpm) / 2);
        index += 1;
    }
    console.log('Baseline: ' + baseline);
    return baseline / gazedata.length - 2; // remove -1 later
}

//baseline = getBaseline();
var maxrandompupildm = 7;
var index = 0;
//Methode um die aktuelle Höhe des Barometers zu bestimmen
function setBarometerHeight(){
    if(parseFloat(gazedata[index].Lpmv) == 1 && parseFloat(gazedata[index].Rpmv) ==1 ){
        var pupildm = (parseFloat(gazedata[index].Lpm) + parseFloat(gazedata[index].Rpm)/2);
        var percentage = (pupildm-baseline) / (maxrandompupildm - baseline);
        var barHeight = percentage * 320;    //Prozentsatz auf Höhe des Barometers umrechnen
        var element = bar;
        if(barHeight<= 320) {
            element.style.height = barHeight + 'px';
        }
        else{
            element.style.height = 320 + 'px';
        }
        index += 1;
    }
    else{
        index += 1;
        setBarometerHeight();
    }
}
//Aktualisierung der Höhe alle 1000ms (1s)
setInterval(function() {               //function aufruf hier wichtig sonst .getElementbyID == null
    setBarometerHeight();
}, 15);
