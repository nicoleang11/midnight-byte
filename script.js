const app = document.getElementById("app");

const archive =
JSON.parse(localStorage.getItem("midnightArchive")) || [];

const cookieMessages = [
"Requesting Chicken...",
"Monitoring Snack Activity...",
"Waiting For Food Drop...",
"Searching For Snacks..."
];

const cookieStatus = document.getElementById("cookieStatus");

if(cookieStatus){
cookieStatus.textContent =
cookieMessages[Math.floor(Math.random()*cookieMessages.length)];
}

document.getElementById("startBtn")
.addEventListener("click", startScan);

document.getElementById("archiveBtn")
.addEventListener("click", showArchive);

window.q1 = q1;
window.q2 = q2;
window.q3 = q3;
window.showResult = showResult;
window.acceptMission = acceptMission;

let answers = {};

function startScan(){

app.innerHTML = `
<div class="dashboard">

<h1>SYSTEM SCAN</h1>

<p class="subtitle">
Question 01 / 03
</p>

<div class="action-panel">

<button class="cyber-btn" onclick="q1('tired')">
😵 快死了
</button>

<button class="cyber-btn" onclick="q1('normal')">
😐 還好
</button>

<button class="cyber-btn" onclick="q1('good')">
😎 很有精神
</button>

</div>

</div>
`;

}

function q1(value){

answers.energy = value;

app.innerHTML = `
<div class="dashboard">

<h1>QUESTION 02</h1>

<div class="action-panel">

<button class="cyber-btn" onclick="q2('movie')">
🎬 看電影
</button>

<button class="cyber-btn" onclick="q2('game')">
🎮 打遊戲
</button>

<button class="cyber-btn" onclick="q2('phone')">
📱 滑手機
</button>

</div>

</div>
`;

}

function q2(value){

answers.activity = value;

app.innerHTML = `
<div class="dashboard">

<h1>QUESTION 03</h1>

<div class="action-panel">

<button class="cyber-btn" onclick="q3('delivery')">
🛵 外送
</button>

<button class="cyber-btn" onclick="q3('drive')">
🚗 開車
</button>

</div>

</div>
`;

}

function q3(value){

answers.transport = value;

showResult();

}

function showResult(){

const foods = [

"🍗 炸雞",
"🍕 披薩",
"🍔 漢堡",
"🍜 泡麵",
"🍣 生魚片",
"🥟 水餃",
"🥘 火鍋"

];

const top1 =
foods[Math.floor(Math.random()*foods.length)];

app.innerHTML = `
<div class="dashboard">

<h1>MISSION RESULT</h1>

<div class="status-item">

<h2>TOP 1</h2>

<br>

${top1}

<br><br>

推薦原因：

今晚很適合吃這個

<br><br>

<button
class="cyber-btn"
onclick="acceptMission('${top1}')">

ACCEPT MISSION

</button>

</div>

<br>

<button
class="cyber-btn secondary"
onclick="location.reload()">

BACK HOME

</button>

</div>
`;

}

function acceptMission(food){

archive.unshift({

date:new Date().toLocaleDateString(),

food:food

});

localStorage.setItem(
"midnightArchive",
JSON.stringify(archive)
);

alert("Mission Saved");

}

function showArchive(){

app.innerHTML = `
<div class="dashboard">

<h1>MISSION ARCHIVE</h1>

${
archive.length===0
?
"<p>尚無紀錄</p>"
:
archive.map(item=>`

<div class="status-item">

📅 ${item.date}

<br><br>

🍴 ${item.food}

</div>

<br>

`).join("")
}

<button
class="cyber-btn secondary"
onclick="location.reload()">

BACK

</button>

</div>
`;

}
