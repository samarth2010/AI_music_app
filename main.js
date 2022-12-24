song = "";
song1 = "";
right_wrist_y = 0;
right_wrist_x = 0;
left_wrist_x = 0;
left_wrist_y = 0;
score_left_wrist = 0;
score_right_wrist = 0;

function preload() {
    song = loadSound("Tmmc.mp3");
    song1 = loadSound("Ch.mp3");


}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.position(350, 250);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelReady);
    poseNet.on('pose', getPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("#fcbd35");
    stroke("#fcbd35");
    if (score_left_wrist > .2) {
        playing_status = song1.isPlaying();
        circle(left_wrist_x, left_wrist_y, 20);
        if (playing_status == "true") {
            song1.stop();
        }
        if (playing_status == "false") {
            song.play();
            document.getElementById("song_name").innerHTML="The Misty Mountains Cold";
        }
    }
}
    if (score_right_wrist > .2) {
        playing_status = song.isPlaying();
        circle(right_wrist_x, right_wrist_y, 20);
        if (playing_status == "true") {
            song.stop();
        }
        if (playing_status == "false") {
            song1.play();
            document.getElementById("song_name").innerHTML="Concerning Hobbits";
        }
    }


    function play_song() {

    }

    function modelReady() {
        console.log("poseNet has been initalized!")
    }

    function getPoses(results) {
        if (results.length > 0) {
            console.log(results);
            left_wrist_x = results[0].pose.leftWrist.x;
            left_wrist_y = results[0].pose.leftWrist.y;
            right_wrist_x = results[0].pose.rightWrist.x;
            right_wrist_y = results[0].pose.rightWrist.y;
            console.log(" Left_Wrist_X = " + left_wrist_x + " Left_Wrist_Y = " + left_wrist_y);
            console.log(" Right_Wrist_X = " + right_wrist_x + " Right_Wrist_Y = " + right_wrist_y);
        }
    }