let topZ = 1000;

function bringToFront(panel){
    topZ++;
    panel.style.zIndex = topZ;
}

const timer=document.getElementById("timer");
const mode=document.getElementById("mode");
const session=document.getElementById("session");

let focus = Number(localStorage.getItem("focusTime")) || 25*60;
let shortBreak = Number(localStorage.getItem("shortTime")) || 5*60;
let longBreak = Number(localStorage.getItem("longTime")) || 15*60;

let selectedMode = "focus";

let current=focus;

let interval=null;

let running=false;

let isFocus=true;

let completedSessions=0;

function updateTimer(){

    let min = Math.floor(current/60);
    let sec = current%60;

    let time =
        String(min).padStart(2,"0") +
        ":" +
        String(sec).padStart(2,"0");

    timer.innerHTML = time;

    document.title = `${time} - ${mode.innerHTML}`;

}

updateTimer();

const focusInput = document.getElementById("focusInput");
const shortInput = document.getElementById("shortInput");
const longInput = document.getElementById("longInput");
const saveTimer = document.getElementById("saveTimer");

focusInput.value = focus / 60;
shortInput.value = shortBreak / 60;
longInput.value = longBreak / 60;

function nextMode(){

    if(isFocus){

        completedSessions++;

        let total = Number(localStorage.getItem("totalSessions")) || 0;

        total++;

        localStorage.setItem("totalSessions", total);

        let minutes = Number(localStorage.getItem("focusMinutes")) || 0;

        minutes += focus / 60;

        localStorage.setItem("focusMinutes", minutes);

        updateEvolution();

        if(completedSessions==4){

            mode.innerHTML="Long Break";
            current=longBreak;

            completedSessions=0;

            updateEvolution();

            setActive(longBtn);

        }else{

            mode.innerHTML="Short Break";
            current=shortBreak;

            setActive(shortBtn);

        }

        isFocus=false;

    }else{

        mode.innerHTML="Focus Time";
        current=focus;

        isFocus=true;

        setActive(focusBtn);

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

    selectedMode = "focus";

    current=focus;
    isFocus=true;
    completedSessions=0;

    mode.innerHTML="Focus Time";

    session.innerHTML="1";

    setActive(focusBtn);

    updateTimer();

};

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

const settingsPanel = document.getElementById("settingsPanel");

const closeModal = document.getElementById("closeModal");

settingsBtn.addEventListener("click",()=>{

    settingsPanel.classList.add("open");
    bringToFront(settingsPanel);

});

closeModal.addEventListener("click",()=>{

    settingsPanel.classList.remove("open");

});

const themes = {

    light:{
        bg:"#d8c2c2",
        container:"#cbe2e7",
        text:"#222222",
        mode:"#d25532",
        li:"#e8e8e8",
        liText:"#222222",
        modal:"#ffffff"
    },

    red:{
        bg:"#e74747",
        container:"#f45b5b",
        text:"#ffffff",
        mode:"#ffffff",
        li:"#9d3c3c",
        liText:"#ffffff",
        modal:"#c15c5c"
    },

    blue:{
        bg:"#397097",
        container:"#5a94bd",
        text:"#ffffff",
        mode:"#ffffff",
        li:"#2f5f81",
        liText:"#ffffff",
        modal:"#4A7EA4"
    },

    green:{
        bg:"#2d933c",
        container:"#52c569",
        text:"#ffffff",
        mode:"#ffffff",
        li:"#3f7f82",
        liText:"#ffffff",
        modal:"#249c22"
    },

    black:{
        bg:"#484848",
        container:"#a9a9a9",
        text:"#ffffff",
        mode:"#4ade80",
        li:"#2d2d2d",
        liText:"#ffffff",
        modal:"#3b3434"
    }

};

document.getElementById("lightTheme").addEventListener("click", () => {
    applyTheme("light");
});

document.getElementById("redTheme").addEventListener("click", () => {
    applyTheme("red");
});

document.getElementById("blueTheme").addEventListener("click", () => {
    applyTheme("blue");
});

document.getElementById("greenTheme").addEventListener("click", () => {
    applyTheme("green");
});

document.getElementById("blackTheme").addEventListener("click", () => {
    applyTheme("black");
});

function applyTheme(name){

    const theme = themes[name];

    document.documentElement.style.setProperty("--bg", theme.bg);
    document.documentElement.style.setProperty("--container", theme.container);
    document.documentElement.style.setProperty("--text", theme.text);
    document.documentElement.style.setProperty("--mode", theme.mode);
    document.documentElement.style.setProperty("--li", theme.li);
    document.documentElement.style.setProperty("--li-text", theme.liText);
    document.documentElement.style.setProperty("--modal", theme.modal);

    document.querySelectorAll(".theme-btn").forEach(btn=>{
        btn.classList.remove("active");
    });

    document.getElementById(name+"Theme").classList.add("active");

    localStorage.setItem("theme", name);

}

const focusBtn = document.getElementById("focusBtn");
const shortBtn = document.getElementById("shortBtn");
const longBtn = document.getElementById("longBtn");

const savedTheme = localStorage.getItem("theme") || "light";
applyTheme(savedTheme);

setActive(focusBtn);

function setActive(button){

    document.querySelectorAll(".mode-btn").forEach(btn=>{

        btn.classList.remove("active");

    });

    button.classList.add("active");

};

focusBtn.addEventListener("click",()=>{

    pause();

    selectedMode="focus";

    current=focus;
    isFocus=true;

    mode.innerHTML="Focus Time";

    updateTimer();

    setActive(focusBtn);

});

shortBtn.addEventListener("click",()=>{

    pause();

    selectedMode="short";

    current=shortBreak;
    isFocus=false;

    mode.innerHTML="Short Break";

    updateTimer();

    setActive(shortBtn);

});

longBtn.addEventListener("click",()=>{

    pause();

    selectedMode="long";

    current=longBreak;
    isFocus=false;

    mode.innerHTML="Long Break";

    updateTimer();

    setActive(longBtn);

});


function updateEvolution(){

    const stages=document.querySelectorAll(".stage");

    stages.forEach(stage=>{
        stage.classList.remove("active");
    });

    stages[completedSessions].classList.add("active");

};

saveTimer.addEventListener("click",()=>{

    focus = Number(focusInput.value) * 60;
    shortBreak = Number(shortInput.value) * 60;
    longBreak = Number(longInput.value) * 60;

    localStorage.setItem("focusTime", focus);
    localStorage.setItem("shortTime", shortBreak);
    localStorage.setItem("longTime", longBreak);

    if(selectedMode=="focus"){

        current = focus;

    }

    else if(selectedMode=="short"){

        current = shortBreak;

    }

    else{

        current = longBreak;

    }

    updateTimer();

    settingsPanel.classList.remove("open");

});

const notesBtn = document.getElementById("notesBtn");
const notesPanel = document.getElementById("notesPanel")
const closeNotes = document.getElementById("closeNotes");

const notesText = document.getElementById("notesText");
const saveNotes = document.getElementById("saveNotes");
const clearNotes = document.getElementById("clearNotes");

notesBtn.addEventListener("click",()=>{

    notesPanel.classList.add("open");
    bringToFront(notesPanel);

});

closeNotes.addEventListener("click",()=>{
    notesPanel.classList.remove("open");

});

notesText.value = localStorage.getItem("notes") || "";

saveNotes.addEventListener("click",()=>{
    localStorage.setItem("notes",notesText.value);

});

clearNotes.addEventListener("click",()=>{
    notesText.value="";
    localStorage.removeItem("notes");

});

const statsMenu = document.getElementById("statsMenu");
const statsPanel = document.getElementById("statsPanel");
const closeStats = document.getElementById("closeStats");

statsMenu.addEventListener("click",()=>{

    statsPanel.classList.add("open");
    bringToFront(statsPanel);
    updateStatistics();

});

closeStats.addEventListener("click",()=>{
    statsPanel.classList.remove("open");

});

function updateStatistics(){

    document.getElementById("todaySessions").innerHTML = completedSessions;

    document.getElementById("totalSessions").innerHTML = localStorage.getItem("totalSessions") || 0;

    document.getElementById("focusTimeStat").innerHTML = (Number(localStorage.getItem("focusMinutes")) || 0) + " min";

    document.getElementById("completedTasks").innerHTML = document.querySelectorAll(".completed").length;

};

const todoBtn = document.getElementById("todoBtn");
const todoPanel = document.getElementById("todoPanel");
const closeTodo = document.getElementById("closeTodo");

todoBtn.addEventListener("click",()=>{

    todoPanel.classList.add("open");
    bringToFront(todoPanel);

});

closeTodo.addEventListener("click", () => {
    todoPanel.classList.remove("open");
});

const music = document.getElementById("bgMusic");

const songs = {

    lofi:"music/lofi.mp3",
    rain:"music/Rainy.mp3",
    forest:"music/Forest.mp3",
    cafe:"music/cafe.mp3"

};

const savedMusic = localStorage.getItem("music");

    if(savedMusic && savedMusic !== "off"){
        music.src = songs[savedMusic];
        music.play().catch(() => {});

}

document.querySelectorAll(".music-option").forEach(btn => {

    btn.addEventListener("click", () => {

        document.querySelectorAll(".music-option").forEach(b => {
            b.classList.remove("active");
        });

        btn.classList.add("active");

        const type = btn.dataset.music;

        localStorage.setItem("music", type);

        if(type == "off"){
            music.pause();
            return;
        }

        music.src = songs[type];
        music.play();

    });

});

document.getElementById("volume").addEventListener("input",(e)=>{
    music.volume = e.target.value;

});

const musicBtn = document.getElementById("musicBtn");
const musicPanel = document.getElementById("musicPanel");
const closeMusic = document.getElementById("closeMusic");

musicBtn.addEventListener("click",()=>{

    musicPanel.classList.add("open");
    bringToFront(musicPanel);

});

closeMusic.addEventListener("click", () => {
    musicPanel.classList.remove("open");

});

const fullscreenBtn = document.getElementById("fullscreenBtn");

fullscreenBtn.addEventListener("click",()=>{

    if(!document.fullscreenElement){

        document.documentElement.requestFullscreen();

    }else{

        document.exitFullscreen();

    }

});

document.addEventListener("fullscreenchange",()=>{

    if(document.fullscreenElement){

        document.body.classList.add("fullscreen");
        fullscreenBtn.textContent = "Exit Full Screen";

    }else{

        document.body.classList.remove("fullscreen");
        fullscreenBtn.textContent = "Full Screen";

    }

});