//img="";
status="";
objects=[];
model="";
capture="";
width=screen.width;
videeo="";

/*
let capture;

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture({
    audio: false,
    video: {
      facingMode: {
        exact: "environment"
      }
    }
  });
  capture.elt.setAttribute('playsinline', '');
  capture.hide();
}

function draw() {
  background(0);
  image(capture, 0, 0, width, height);
}


*/

function preload(){
   // img = loadImage("dog_cat.jpg");
}

function setup(){
    if(width>992){

        createCanvas(700, 500);
        capture = createCapture({
          audio: false,
          videeo: {
            facingMode: {
              exact: "environment"
            }
          }
        });
        capture.elt.setAttribute('playsinline', '');
        capture.hide();

        model = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status: Started detecting";


    }
    else{

        canvas = createCanvas(700,500);
        canvas.center();
        video = createCapture(VIDEO);
        video.hide()
        model = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status: Started detecting";

    }
    
}


function modelLoaded(){
    console.log("Model loaded!!!!");
    status = true;
   
}

function gotResult(error, results){
    if(error){
        console.error(error);

    }
    else{
        console.log(results);
        objects=results;


    }
}

function draw(){
 //   image(img,0,0,700,500);
 if(width > 992){
    image(videeo, 0, 0, 700, 500);
 }
 else{
    image(video, 0, 0, 700, 500);
 }



    if(status!=""){
 r = random(255);
 g = random(255);
 b = random(255);
 if(width > 992){
    model.detect(videeo, gotResult);
 }
 else{
    model.detect(video, gotResult);
 }
     

    for(i = 0; i < objects.length; i++){
        document.getElementById("status").innerHTML="Detection complete";

       
        fill(r,g,b);
        stroke(r,g,b);
percent = Math.floor(objects[i].confidence * 100);

        text(objects[i].label+" "+percent+" %",objects[i].x+10, objects[i].y+20);
        noFill();
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        
    }
       
    
        }
   
}
