const items = [
  {
    name: "ペットボトル",
    type: "pet",
    explanation: "ペットボトルはキャップとラベルを外して、軽くすすぐと資源になります。"
  },
  {
    name: "アルミ缶",
    type: "can",
    explanation: "アルミ缶は資源としてリサイクルできます。中身を空にして出しましょう。"
  },
  {
    name: "新聞紙",
    type: "paper",
    explanation: "新聞紙は古紙としてリサイクルできます。濡らさないことが大切です。"
  },
  {
    name: "汚れた弁当容器",
    type: "burnable",
    explanation: "汚れがひどい容器は資源化が難しく、燃えるごみになる場合があります。"
  },
  {
    name: "段ボール",
    type: "paper",
    explanation: "段ボールは古紙として再利用されます。雨で濡れると品質が下がります。"
  },
  {
    name: "スチール缶",
    type: "can",
    explanation: "スチール缶は金属資源としてリサイクルできます。"
  }
];

let currentItem = null;
let score = 0;
let correct = 0;
let miss = 0;
let timeLeft = 30;
let timer = null;
let isPlaying = false;

const itemElement = document.getElementById("item");
const scoreElement = document.getElementById("score");
const correctElement = document.getElementById("correct");
const missElement = document.getElementById("miss");
const timeElement = document.getElementById("time");
const messageElement = document.getElementById("message");
const startButton = document.getElementById("startButton");
const bins = document.querySelectorAll(".bin");

function startGame() {
  score = 0;
  correct = 0;
  miss = 0;
  timeLeft = 30;
  isPlaying = true;

  updateStatus();
  startButton.disabled = true;
  messageElement.textContent = "正しい回収ボックスにドラッグしよう！";

  showRandomItem();

  timer = setInterval(() => {
    timeLeft--;
    updateStatus();

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

function endGame() {
  isPlaying = false;
  clearInterval(timer);

  const total = correct + miss;
  const recycleRate = total === 0 ? 0 : Math.round((correct / total) * 100);

  itemElement.textContent = "終了！";
  itemElement.draggable = false;

  messageElement.textContent =
    `結果：スコア ${score}点 / 資源化率 ${recycleRate}% / 正解 ${correct} / ミス ${miss}`;

  startButton.disabled = false;
  startButton.textContent = "もう一度遊ぶ";
}

function showRandomItem() {
  const randomIndex = Math.floor(Math.random() * items.length);
  currentItem = items[randomIndex];

  itemElement.textContent = currentItem.name;
  itemElement.draggable = true;
}

function updateStatus() {
  scoreElement.textContent = score;
  correctElement.textContent = correct;
  missElement.textContent = miss;
  timeElement.textContent = timeLeft;
}

itemElement.addEventListener("dragstart", (event) => {
  if (!isPlaying) return;
  event.dataTransfer.setData("text/plain", currentItem.type);
});

bins.forEach((bin) => {
  bin.addEventListener("dragover", (event) => {
    event.preventDefault();
    bin.classList.add("drag-over");
  });

  bin.addEventListener("dragleave", () => {
    bin.classList.remove("drag-over");
  });

  bin.addEventListener("drop", (event) => {
    event.preventDefault();
    bin.classList.remove("drag-over");

    if (!isPlaying) return;

    const selectedType = bin.dataset.type;

    if (selectedType === currentItem.type) {
      score += 10;
      correct++;
      messageElement.textContent = `正解！ ${currentItem.explanation}`;
    } else {
      miss++;
      score = Math.max(0, score - 5);
      messageElement.textContent = `惜しい！ ${currentItem.explanation}`;
    }

    updateStatus();
    showRandomItem();
  });
});

startButton.addEventListener("click", startGame);
