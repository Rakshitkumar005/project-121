

Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
})
function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
    });
}
camera=document.getElementById("camera");
Webcam.attach('#camera');

console.log('ml5 version',ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/5g82hIwRq/model.json',modelLoaded)


function modelLoaded(){
    console.log('Model Loaded!');
}


function speak(){
    var synth=window.speechSynthesis
    speak_data="The prediction is"+prediction;
   var utterThis=new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis)
}

function check(){
    img=document.getElementById('captured_image');
    classifier.classify(img,gotResult)
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
     document.getElementById("result_gesture_name").innerHTML=results[0].label;
     prediction =results[0].label;
        speak();
    
    if(results[0].label=="Amazing"){
document.getElementById("result_emoji").innerHTML="&#128076;";
document.getElementById("quote").innerHTML="";
    }
    else if(results[0].label=="Best"){
        document.getElementById("result_emoji").innerHTML="&#128077;";
        document.getElementById("quote").innerHTML="";
            }
            else{
                document.getElementById("result_emoji").innerHTML="&#9996;";
        document.getElementById("quote").innerHTML=""; 
            }
    }

    }  
