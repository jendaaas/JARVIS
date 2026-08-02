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
getAIResponse(command);


chat.innerHTML=answer;


speak(answer);


};

}


else{

status.innerHTML=
"Toto zařízení nepodporuje hlasové ovládání.";

}
// spuštění JARVIS aplikace
if ("serviceWorker" in navigator) {

navigator.serviceWorker.register("service-worker.js")
.then(() => {

console.log("JARVIS systém aktivní");

});

}
const input = document.getElementById("input");
const send = document.getElementById("send");
const messages = document.getElementById("messages");


function addMessage(author,text){

let msg=document.createElement("p");

msg.innerHTML="<b>"+author+":</b> "+text;

messages.appendChild(msg);

}


send.onclick=function(){

let text=input.value;

if(text=="") return;


addMessage("Vy",text);


let answer=jarvisResponse(text);


addMessage("JARVIS",answer);

speak(answer);


input.value="";

};
async function getAIResponse(message){

try{

let response = await fetch(
"https://TVUJ_SERVER/adresa",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
message:message
})
}
);


let data = await response.json();


chat.innerHTML=data.reply;

speak(data.reply);


}

catch(error){

let fallback =
"Nemohu se spojit s mým AI systémem.";

chat.innerHTML=fallback;

speak(fallback);

}

}
// JARVIS systémové informace

function updateClock(){

let now = new Date();

document.getElementById("clock").innerHTML =
now.toLocaleTimeString("cs-CZ")
+
" | "
+
now.toLocaleDateString("cs-CZ");

}


setInterval(updateClock,1000);

updateClock();


// baterie

if(navigator.getBattery){

navigator.getBattery()
.then(function(battery){

document.getElementById("battery").innerHTML =
"🔋 Baterie: "
+
Math.round(battery.level*100)
+
"%";

});

}


// pozdrav

setTimeout(()=>{

let hour = new Date().getHours();

let greeting;

if(hour < 12){

greeting="Dobré ráno. JARVIS je připraven.";

}
else if(hour < 18){

greeting="Dobrý den. JARVIS je online.";

}
else{

greeting="Dobrý večer. JARVIS je připraven.";

}


chat.innerHTML=greeting;

speak(greeting);


},1500);
