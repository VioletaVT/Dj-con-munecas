sonido= "";
wristIzquierdaX= 0;
wristIzquierdaY= 0;
wristDerechaX= 0;
wristDerechaY= 0;
puntajemuñecaIzquierda= 0;
puntajemuñecaDerecha= 0;

function preload(){
 sonido= loadSound("Holdawn.mp3");

}


function setup(){
canvas= createCanvas(600,500);
canvas.center();

video= createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video, modelLoaded);
poseNet.on('pose',gotPoses);

}


function draw(){
image(video, 0, 0, 600, 500);
fill("#f205a7");
stroke("#8c0160");



if (puntajemuñecaIzquierda> 0.2){
    circle(wristIzquierdaX,wristIzquierdaY,20);
    numerowristIzquierdaY= Number(wristIzquierdaY);
    removerdecimales= floor(numerowristIzquierdaY);
    volumen= removerdecimales/500;
    document.getElementById("volumen").innerHTML="volumen= " + volumen;
    sonido.setVolume(volumen);
}

if (puntajemuñecaDerecha > 0.2){
    circle(wristDerechaX,wristDerechaY,20);
    if (wristDerechaY > 0 && wristDerechaY <= 100){
        document.getElementById("velocidad").innerHTML= "Velocidad= 0.5x";
        sonido.rate(0.5);
    }
    else if (wristDerechaY > 100 && wristDerechaY <= 200){
        document.getElementById("velocidad").innerHTML= "Velocidad= 1x";
        sonido.rate(1)
    }
    else if(wristDerechaY > 200 && wristDerechaY <= 300){
        document.getElementById("velocidad").innerHTML= "Velocidad= 1.5x";
        sonido.rate(1.5);
    }
    else if(wristDerechaY > 300 && wristDerechaY <= 400){
        document.getElementById("velocidad").innerHTML= "Velocidad= 2x";
        sonido.rate(2);
    }
    else if (wristDerechaY < 400){
        document.getElementById("velocidad").innerHTML= "Velocidad= 2.5x";
        sonido.rate(2.5);
    }
}


}

function play(){
    sonido.play();
    sonido.setVolume(1);
    sonido.rate(1);
}

function modelLoaded(){
    console.log("El modelo ha iniciado");

}

function gotPoses(results){
    if (results.length > 0){
        console.log(results);
        puntajemuñecaIzquierda= results[0].pose.keypoints[9].score;
        puntajemuñecaDerecha= results[0].pose.keypoints[10].score;
        console.log("puntaje muñeca Izquierda= " + puntajemuñecaIzquierda + "puntaje muñeca Derecha= " + puntajemuñecaDerecha);
     wristIzquierdaX= results[0].pose.leftWrist.x;
     wristIzquierdaY= results[0].pose.leftWrist.y;
     console.log("wristIzquierdaX: "+ wristIzquierdaX + "wristIzquierdaY: " + wristIzquierdaY);
     wristDerechaX= results[0].pose.rightWrist.x;
     wristDerechaY= results[0].pose.rightWrist.y;
     console.log("wristDerechaX: "+ wristDerechaX + "wristDrechaY: " + wristDerechaY);
    }
    
}