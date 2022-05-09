song = "";
leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

leftWristscore = 0;
rightWristscore = 0;

function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotPoses);
}
function draw(){
    image(video,0,0,600,500);
    if(rightWristscore > 0.2){
        stroke("#0000ff");
        fill("#0000ff");
        circle(rightWristX,rightWristY,20);
        if(rightWristY>0 && rightWristY<=100){
            document.getElementById("speed_label").innerHTML = "Speed: 0.5X";
            song.rate(0.5);
        }
        if(rightWristY>100 && rightWristY<=200){
            document.getElementById("speed_label").innerHTML = "Speed: 1X";
            song.rate(1);
        }
        if(rightWristY>200 && rightWristY<=300){
            document.getElementById("speed_label").innerHTML = "Speed: 1.5X";
            song.rate(1.5);
        }
        if(rightWristY>300 && rightWristY<=400){
            document.getElementById("speed_label").innerHTML = "Speed: 2X";
            song.rate(2);
        }
        if(rightWristY>400 && rightWristY<=500){
            document.getElementById("speed_label").innerHTML = "Speed: 2.5X";
            song.rate(2.5);
        }
    }
    if(leftWristscore > 0.2){
        fill("#ff0000");
        stroke("#ff0000");
        circle(leftWristX,leftWristY,20);
        number_leftWristY = Number(leftWristY);
        floor_leftWristY = Math.floor(number_leftWristY);
        volume = floor_leftWristY/500;
        document.getElementById("volume_label").innerHTML = "Volume : " + volume;
        song.setVolume(volume);
        
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded(){
    console.log("poseNet is initialized");
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        console.log("leftWristX = " + leftWristX + ", leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("rightWristX = " + rightWristX + ", rightWristY = " + rightWristY);

        leftWristscore = results[0].pose.keypoints[9].score;
        console.log("leftWristscore = "+leftWristscore);

        rightWristscore = results[0].pose.keypoints[10].score;
        console.log("rightWristscore = "+rightWristscore);
    }
}