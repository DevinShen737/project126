Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
});

    camera = document.getElementById("camera");

Webcam.attach( '#camera' );


function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="capture_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/amGQZmvEE/model.json',modelLoaded);

function modelLoaded() {
    console.log('Model Loaded!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
}

function speak(){
    var snyth = window.speechSynthesis;
    speak_data_1 = "The first predication is " +predication_1;
    speak_data_1 = "and the second predication is " +predication_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    snyth.speak(utterThis);
}

function check()
{
    img = document.getElementById('capture_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, result) {
    if (error) {
        console.error(error)
    } else {
      console.log(result);
      document.getElementById("result_emotion_name").innerHTML = result[0].label;
      document.getElementById("result_emotion_name2").innerHTML = result[1].label;
      predication_1 = result[0].label;
      predication_2 = result[1].label;
      speak();
      if(result[0].label == "proper mask")
      {
        document.getElementById("update_emoji").innerHTML = "&#128077;";
      }
      if(result[0].label == "no mask")
      {
        document.getElementById("update_emoji").innerHTML = "&#128078;";
      }
      if(result[0].label == "improper mask")
      {
        document.getElementById("update_emoji").innerHTML = "&#128076;";
      }

      if(result[1].label == "proper mask")
      {
        document.getElementById("update_emoji2").innerHTML = "&#128077;";
      }
      if(result[1].label == "no mask")
      {
        document.getElementById("update_emoji2").innerHTML = "&#128078;";
      }
      if(result[1].label == "improper mask")
      {
        document.getElementById("update_emoji2").innerHTML = "&#128076;";
      }
    }
}