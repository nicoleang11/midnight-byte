```javascript
const app = document.getElementById("app");

const cookieMessages = [
  "Requesting Chicken...",
  "Monitoring Snack Activity...",
  "Waiting For Food Drop...",
  "Searching For Snacks...",
  "Sleeping..."
];

const cookieElement = document.getElementById("cookieStatus");

if (cookieElement) {
  cookieElement.textContent =
    cookieMessages[Math.floor(Math.random() * cookieMessages.length)];
}

let answers = {};

const archive =
  JSON.parse(localStorage.getItem("midnightArchive")) || [];

/* 首頁按鈕 */

const startBtn = document.getElementById("startBtn");
const archiveBtn = document.getElementById("archiveBtn");

if (startBtn) {
  startBtn.addEventListener("click", startScan);
}

if (archiveBtn) {
  archiveBtn.addEventListener("click", showArchive);
}

/* 讓 HTML onclick 可以找到 */

window.startScan = startScan;
window.q2 = q2;
window.q3 = q3;
window.q4 = q4;
window.showResult = showResult;
window.acceptMission = acceptMission;
window.showArchive = showArchive;

/* Q1 */

function startScan() {

  app.innerHTML = `
  <div class="dashboard">

    <h1>SYSTEM SCAN</h1>

    <p class="subtitle">
      Question 01 / 04
    </p>

    <br>

    <h2>今天有多累？</h2>

    <br>

    <div class="action-panel">

      <button class="cyber-btn" onclick="q2('dead')">
        😵 快死了
      </button>

      <button class="cyber-btn" onclick="q2('normal')">
        😐 還好
      </button>

      <button class="cyber-btn" onclick="q2('good')">
        😎 很有精神
      </button>

    </div>

  </div>
  `;

}

/* Q2 */

function q2(value) {

  answers.energy = value;

  app.innerHTML = `
  <div class="dashboard">

    <h1>SYSTEM SCAN</h1>

    <p class="subtitle">
      Question 02 / 04
    </p>

    <br>

    <h2>現在在做什麼？</h2>

    <br>

    <div class="action-panel">

      <button class="cyber-btn" onclick="q3('movie')">
        🎬 看電影
      </button>

      <button class="cyber-btn" onclick="q3('game')">
        🎮 打遊戲
      </button>

      <button class="cyber-btn" onclick="q3('phone')">
        📱 滑手機
      </button>

      <button class="cyber-btn" onclick="q3('work')">
        💻 工作
      </button>

      <button class="cyber-btn" onclick="q3('youtube')">
        📺 YouTube
      </button>

    </div>

  </div>
  `;

}

/* Q3 */

function q3(value) {

  answers.activity = value;

  app.innerHTML = `
  <div class="dashboard">

    <h1>SYSTEM SCAN</h1>

    <p class="subtitle">
      Question 03 / 04
    </p>

    <br>

    <h2>今晚模式？</h2>

    <br>

    <div class="action-panel">

      <button class="cyber-btn" onclick="q4('diet')">
        😇 克制一下
      </button>

      <button class="cyber-btn" onclick="q4('normal')">
        😎 正常
      </button>

      <button class="cyber-btn" onclick="q4('free')">
        😈 放飛自我
      </button>

    </div>

  </div>
  `;

}

/* Q4 */

function q4(value) {

  answers.mode = value;

  app.innerHTML = `
  <div class="dashboard">

    <h1>SYSTEM SCAN</h1>

    <p class="subtitle">
      Question 04 / 04
    </p>

    <br>

    <h2>行動模式？</h2>

    <br>

    <div class="action-panel">

      <button class="cyber-btn" onclick="showResult('home')">
        🏠 不想出門
      </button>

      <button class="cyber-btn" onclick="showResult('delivery')">
        🛵 外送
      </button>

      <button class="cyber-btn" onclick="showResult('drive')">
        🚗 可以開車
      </button>

    </div>

  </div>
  `;

}

/* 結果 */

function showResult(value) {

  answers.transport = value;

  const results = [
    {
      food: "🍗 炸雞",
      drink: "🧋 珍珠奶茶",
      dessert: "🍰 卡士達泡芙",
      reason: "適合今晚放鬆模式",
      score: 96
    },
    {
      food: "🍕 披薩",
      drink: "🥤 飲料",
      dessert: "🍪 零食",
      reason: "適合共享",
      score: 89
    },
    {
      food: "🍔 漢堡",
      drink: "🧋 珍奶",
      dessert: "🍰 泡芙",
      reason: "快速滿足",
      score: 84
    }
  ];

  app.innerHTML = `
  <div class="dashboard">

    <h1>MISSION RESULT</h1>

    <p class="subtitle">
      Top Recommendations
    </p>

    ${results.map((item,index)=>`

      <div class="status-item">

        <h2>TOP ${index+1}</h2>

        <br>

        主餐：${item.food}

        <br><br>

        飲料：${item.drink}

        <br><br>

        第二胃：${item.dessert}

        <br><br>

        推薦原因：${item.reason}

        <br><br>

        MISSION SCORE：${item.score}

        ${
          index === 0
          ?
          `<br><br>
          <button class="cyber-btn"
          onclick="acceptMission('${item.food}')">
          ACCEPT MISSION
          </button>`
          :
          ""
        }

      </div>

      <br>

    `).join("")}

    <button class="cyber-btn secondary"
    onclick="location.reload()">
      BACK TO HOME
    </button>

  </div>
  `;

}

/* 儲存 */

function acceptMission(food) {

  archive.unshift({
    date: new Date().toLocaleDateString(),
    food: food,
    activity: answers.activity,
    mode: answers.mode
  });

  localStorage.setItem(
    "midnightArchive",
    JSON.stringify(archive)
  );

  alert("Mission Saved");

}

/* Archive */

function showArchive() {

  app.innerHTML = `
  <div class="dashboard">

    <h1>MISSION ARCHIVE</h1>

    <br>

    ${
      archive.length === 0
      ?
      "<p>尚無紀錄</p>"
      :
      archive.map(item => `
        <div class="status-item">

          📅 ${item.date}

          <br><br>

          🍴 ${item.food}

          <br><br>

          🎮 ${item.activity}

          <br><br>

          ⚡ ${item.mode}

        </div>

        <br>
      `).join("")
    }

    <button class="cyber-btn secondary"
    onclick="location.reload()">
      BACK
    </button>

  </div>
  `;

}
```
