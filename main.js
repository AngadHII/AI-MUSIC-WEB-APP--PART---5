closer = "";
heatwaves = "";
song_name = "";
scoreLeftWrist = 0;
scoreRightWrist = 0;
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;

function preload(){
closer = loadSound("closer.mp3");
heatwaves = loadSound("heatwaves.mp3");
}

function setup(){
canvas = createCanvas(600,550);
canvas.center();

video = createCapture(VIDEO);
video.hide();

poseNet = ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses);
}


function draw(){
image(video, 0, 0, 600, 550);
fill("#ff0000");
stroke("#ff0000");

song_name = closer.isPlaying();

if(scoreLeftWrist > 0.2){
    circle(leftWristX,leftWristY,20);
    heatwaves.stop();
    if(song_name == false){
        closer.play();
    }
    else{
        console.log("Song: Closer");
        document.getElementById("song_name_div").innerHTML = "SONG: Closer";
    }
}

song_name = heatwaves.isPlaying();

if(scoreRightWrist > 0.2){
    circle(rightWristX,rightWristY,20);
    closer.stop();
    if(song_name == false){
        heatwaves.play();
    }
    else{
        console.log("Song: Heatwaves");
        document.getElementById("song_name_div").innerHTML = "SONG: Heatwaves";
    }
}
}

function modelLoaded(){
    console.log('poseNet has been initialised.')
}


function gotPoses(results){
    if(results.length > 0){

        console.log(results);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX: "+leftWristX+" rightWristY: "+rightWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX: "+rightWristX+" rightWristY: "+rightWristY);
    }
}