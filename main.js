song1="";
song2="";
leftwristx=0;
leftwristy=0;
rightwristx=0;
rightwristy=0;
scoreleftwrist=0;
status_song1="";
scorerightwrist=0;
status_song2="";
function preload(){
    song1=loadSound("music2.mp3");
    song2=loadSound("music.mp3");
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    posenet=ml5.poseNet(video,modelloaded);
    posenet.on("pose",gotposes);
}
function modelloaded(){
    console.log("Model Loaded");
}
function gotposes(results){
    if(results.length>0){
        console.log(results);
        leftwristx=results[0].pose.leftWrist.x;
        leftwristy=results[0].pose.leftWrist.y;
        console.log("LeftWristX: "+leftwristx+" LeftWristY: "+leftwristy);
        rightwristx=results[0].pose.rightWrist.x;
        rightwristy=results[0].pose.rightWrist.y;
        console.log("RightWristX: "+rightwristx+" RightWristY: "+rightwristy);
        scoreleftwrist=results[0].pose.keypoints[9].score;
        console.log("ScoreLeftWrist: "+scoreleftwrist);
        scorerightwrist=results[0].pose.keypoints[10].score;
        console.log("ScoreRightWrist: "+scorerightwrist);
    }
}
function draw(){
    image(video,0,0,600,500);
    fill("red");
    stroke("red");
    status_song1=song1.isPlaying();
    if(scoreleftwrist>0.2){
        circle(leftwristx,leftwristy,20);
        song2.stop();
        if(status_song1==false){
            song1.play();
            document.getElementById("song_changer").innerHTML="Playing Peter Pan Song";
        }
    }
    status_song2=song2.isPlaying();
    if(scorerightwrist>0.2){
        circle(rightwristx,rightwristy,20);
        song1.stop();
        if(status_song2==false){
            song2.play();
            document.getElementById("song_changer").innerHTML="Playing Harry Potter Song";
        }
    }
}