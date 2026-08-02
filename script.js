const button = document.getElementById("listen");
const status = document.getElementById("status");
const chat = document.getElementById("chat");


// hlas JARVISe
function speak(text){

const speech = new SpeechSynthesisUtterance(text);

speech.lang = "cs-CZ";
speech.rate = 1;
speech.pitch = 0.8;

window.speechSynthesis.speak(speech);

}


// odpovědi
function jarvisResponse(command){

command = command.toLowerCase();


if(command.includes("ahoj")){

return "Dobrý den. Jsem JARVIS. Jsem připraven pomáhat.";

}


if(command.includes("jak se máš")){

return "Všechny systémy fungují správně.";

}


if(command.includes("čas")){

let time = new Date().toLocaleTimeString("cs-CZ");

return "Aktuální čas je " + time;

}


if(command.includes("datum")){

let date = new Date().toLocaleDateString("cs-CZ");

return "Dnes je " + date;

}


if(command.includes("kdo jsi")){

return "Jsem JARVIS, váš osobní AI asistent.";

}


return "Tomuto příkazu zatím nerozumím. Moje funkce se stále rozšiřují.";

}


// rozpoznávání hlasu

const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;


if(SpeechRecognition){

const recognition = new SpeechRecognition();

recognition.lang="cs-CZ";


button.onclick = ()=>{

status.innerHTML="Poslouchám...";

recognition.start();

};


recognition.onresult=(event)=>{

let command =
event.results[0][0].transcript;


status.innerHTML="Řekl jste: "+command;


let answer =
jarvisResponse(command);


chat.innerHTML=answer;


speak(answer);


};

}


else{

status.innerHTML=
"Toto zařízení nepodporuje hlasové ovládání.";

}
