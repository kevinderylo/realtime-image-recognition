previous_result="";
function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();

  classifier=ml5.imageClassifier('MobileNet', modalloaded);
}
function draw(){
  image(video, 0, 0, 300, 300);
  classifier.classify(video, gotresult);
}
function modalloaded(){
  console.log("modal is loaded");
}
function gotresult(error,results){
  if(error){
    console.error(error);
  }
  else{
    if((results[0].confidence>0.5)&&(previous_result!=results[0].label)){
    console.log(results);
    previous_result=results[0].label;
    synth=window.speechSynthesis;
    speek_data="object detected is: "+ results[0].label;
    utter=new SpeechSynthesisUtterance(speek_data);
    synth.speak(utter)
    document.getElementById("result_object_name").innerHTML=results[0].label;
    document.getElementById("result_object_accuracy").innerHTML=results[0].confidence.toFixed(3);
    }
  }
}