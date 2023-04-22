//img="";
status="";
objects=[];
model="";

function preload(){
   // img = loadImage("dog_cat.jpg");
}

function setup(){
    canvas = createCanvas(700,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide()
    model = ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status").innerHTML="Status: Started detecting";
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
image(video, 0, 0, 700, 500);


    if(status!=""){
 r = random(255);
 g = random(255);
 b = random(255);
        model.detect(video, gotResult);

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
