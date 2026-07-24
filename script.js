const timer=document.getElementById("timer");
const mode=document.getElementById("mode");
const session=document.getElementById("session");

let focus=25*60;
let shortBreak=5*60;
let longBreak=15*60;

let current=focus;

let interval=null;

let running=false;

let isFocus=true;

let completedSessions=0;

function updateTimer(){

let min=Math.floor(current/60);

let sec=current%60;

timer.innerHTML=
String(min).padStart(2,"0")
+":"
+
String(sec).padStart(2,"0");

}

updateTimer();

function nextMode(){

if(isFocus){

completedSessions++;

if(completedSessions==4){

mode.innerHTML="🌴 Long Break";

current=longBreak;

completedSessions=0;

}else{

mode.innerHTML="☕ Short Break";

current=shortBreak;

}

isFocus=false;

}else{

mode.innerHTML="🍅 Focus Time";

current=focus;

isFocus=true;

}

session.innerHTML=completedSessions+1;

updateTimer();

}

function start(){

if(running)return;

running=true;

interval=setInterval(()=>{

current--;

updateTimer();

if(current<=0){

clearInterval(interval);

running=false;

nextMode();

start();

}

},1000);

}

function pause(){

clearInterval(interval);

running=false;

}

function reset(){

pause();

current=focus;

isFocus=true;

completedSessions=0;

mode.innerHTML="Focus Time";

session.innerHTML="1";

updateTimer();

}

document.getElementById("start").onclick=start;

document.getElementById("pause").onclick=pause;

document.getElementById("reset").onclick=reset;

const input = document.getElementById("todoInput");
const list = document.getElementById("todoList");
const addBtn = document.getElementById("addTask");

function addTask() {
    const text = input.value.trim();

    if (text === "") return;

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = text;
    span.style.flex = "1";

    span.addEventListener("click", () => {
        span.classList.toggle("completed");
    });

    const del = document.createElement("button");
    del.textContent = "❌";
    del.className = "delete";

    del.addEventListener("click", () => {
        li.remove();
    });

    li.appendChild(span);
    li.appendChild(del);

    list.appendChild(li);

    input.value = "";
}

addBtn.addEventListener("click", addTask);

input.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});


const settingsBtn = document.getElementById("settingsBtn");

const settingsModal = document.getElementById("settingsModal");

const closeModal = document.getElementById("closeModal");

const themeToggle = document.getElementById("themeToggle");



settingsBtn.addEventListener("click",()=>{

    settingsModal.style.display="flex";

});



closeModal.addEventListener("click",()=>{
    
    settingsModal.style.display="none";

});



window.addEventListener("click",(e)=>{

    if(e.target===settingsModal){

        settingsModal.style.display="none";

    }

});



if(localStorage.getItem("theme")==="dark"){

    document.body.classList.add("dark");

    themeToggle.checked=true;

}



themeToggle.addEventListener("change",()=>{

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        localStorage.setItem("theme","dark");

    }

    else{

        localStorage.setItem("theme","light");

    }

});