const items = [
  {
    name: "ペットボトル",
    icon: "🧴",
    type: "pet",
    explanation: "ペットボトルはキャップとラベルを外して、軽くすすぐと資源になります。"
  },
  {
    name: "ペットボトルのキャップ",
    icon: "🔵",
    type: "plastic",
    explanation: "ペットボトルのキャップは本体から外して、プラスチック資源として分けることが大切です。"
  },
  {
    name: "ペットボトルのラベル",
    icon: "🏷️",
    type: "plastic",
    explanation: "ラベルはペットボトル本体から外し、プラスチック資源として分けます。"
  },
  {
    name: "アルミ缶",
    icon: "🥫",
    type: "can",
    explanation: "アルミ缶は資源としてリサイクルできます。中身を空にして出しましょう。"
  },
  {
    name: "スチール缶",
    icon: "🥫",
    type: "can",
    explanation: "スチール缶は金属資源としてリサイクルできます。アルミ缶と同じく中身を空にして出しましょう。"
  },
  {
    name: "びん",
    icon: "🍾",
    type: "bottle",
    explanation: "びんは色ごとに分けてリサイクルされることがあります。中身を空にして出しましょう。"
  },
  {
    name: "牛乳パック",
    icon: "🥛",
    type: "paper",
    explanation: "牛乳パックは洗って、開いて、乾かすことで紙資源としてリサイクルしやすくなります。"
  },
  {
    name: "新聞紙",
    icon: "📰",
    type: "paper",
    explanation: "新聞紙は古紙としてリサイクルできます。濡らさないことが大切です。"
  },
  {
    name: "雑誌",
    icon: "📚",
    type: "paper",
    explanation: "雑誌は古紙としてリサイクルできます。紙以外の付録やビニールは外しましょう。"
  },
  {
    name: "段ボール",
    icon: "📦",
    type: "paper",
    explanation: "段ボールは古紙として再利用されます。雨で濡れると品質が下がります。"
  },
  {
    name: "紙コップ",
    icon: "🥤",
    type: "burnable",
    explanation: "紙コップは内側に防水加工があるため、古紙として出せない場合があります。地域のルールを確認しましょう。"
  },
  {
    name: "きれいなプラスチック容器",
    icon: "🍱",
    type: "plastic",
    explanation: "汚れを落としたプラスチック容器は、プラスチック資源として出せる場合があります。"
  },
  {
    name: "汚れたプラスチック容器",
    icon: "🍛",
    type: "burnable",
    explanation: "汚れがひどいプラスチック容器は資源化が難しく、燃えるごみになる場合があります。"
  },
  {
    name: "乾電池",
    icon: "🔋",
    type: "hazardous",
    explanation: "乾電池は発火や有害物質の原因になることがあるため、危険ごみ・有害ごみとして分けます。"
  },
  {
    name: "小型家電",
    icon: "📱",
    type: "electronics",
    explanation: "小型家電には金属などの資源が含まれます。専用回収ボックスなどに出すのが望ましいです。"
  },
  {
    name: "生ごみ",
    icon: "🥬",
    type: "food",
    explanation: "生ごみはコンポストや堆肥化により、地域の資源として循環させることができます。"
  },
  {
    name: "廃食油",
    icon: "🛢️",
    type: "oil",
    explanation: "廃食油は回収することで、せっけんや燃料などに再利用できる場合があります。流しに捨てないことが大切です。"
  },
  {
    name: "割れたびん",
    icon: "🧩",
    type: "hazardous",
    explanation: "割れたびんはけがの危険があるため、新聞紙などで包み、地域のルールに従って出しましょう。"
  },
  {
    name: "汚れた弁当容器",
    icon: "🍱",
    type: "burnable",
    explanation: "汚れがひどい弁当容器は資源化が難しく、燃えるごみになる場合があります。"
  }
];

let currentItem = null;
let score = 0;
let correct = 0;
let miss = 0;
let timeLeft = 30;
let timer = null;
let isPlaying = false;

// スマホ用：アイテムが選択されているかどうか
let isItemSelected = false;

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
  isItemSelected = false;

  updateStatus();

  startButton.disabled = true;
  startButton.textContent = "プレイ中";
  messageElement.textContent = "PCはドラッグ、スマホは資源物をタップしてから回収ボックスをタップ！";

  itemElement.classList.remove("selected");
  showRandomItem();

  timer = setInterval(() => {
    timeLeft--;
    updateStatus();

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

function getRank(recycleRate) {
  if (recycleRate >= 90) {
    return {
      rank: "S",
      title: "資源循環マスター",
      message: "すばらしい分別力です！資源を正しく分けることで、まちの循環を大きく前進させることができます。"
    };
  }

  if (recycleRate >= 75) {
    return {
      rank: "A",
      title: "分別リーダー",
      message: "かなり良い結果です！きれいに分けることで、資源はもう一度まちに戻ります。"
    };
  }

  if (recycleRate >= 50) {
    return {
      rank: "B",
      title: "リサイクル見習い",
      message: "基本はできています！迷いやすい資源物を覚えると、さらに資源化率を上げられます。"
    };
  }

  return {
    rank: "C",
    title: "もう一度チャレンジ",
    message: "分別は少しずつ覚えれば大丈夫です。今日から「洗う・分ける・確認する」を意識してみましょう。"
  };
}

function endGame() {
  isPlaying = false;
  isItemSelected = false;
  clearInterval(timer);

  const total = correct + miss;
  const recycleRate = total === 0 ? 0 : Math.round((correct / total) * 100);
  const rankResult = getRank(recycleRate);

  itemElement.innerHTML = `
    <div class="item-icon">🏁</div>
    <div class="item-name">終了！</div>
  `;

  itemElement.draggable = false;
  itemElement.classList.remove("selected");

  bins.forEach((bin) => {
    bin.classList.remove("selected-target");
    bin.classList.remove("drag-over");
  });

  messageElement.innerHTML = `
    <div class="result-card">
      <div class="result-title">結果発表</div>

      <div class="result-main">
        <div class="result-rate">あなたの資源化率：${recycleRate}%</div>
        <div class="result-rank">ランク：${rankResult.rank}　${rankResult.title}</div>
      </div>

      <div class="result-detail">
        スコア：${score}点 ／ 正解：${correct} ／ ミス：${miss}
      </div>

      <div class="result-message">
        ${rankResult.message}<br>
        今日から「洗う・分ける・確認する」を意識してみましょう。
      </div>
    </div>
  `;

  startButton.disabled = false;
  startButton.textContent = "もう一度遊ぶ";
}

function showRandomItem() {
  const randomIndex = Math.floor(Math.random() * items.length);
  currentItem = items[randomIndex];

  itemElement.innerHTML = `
    <div class="item-icon">${currentItem.icon}</div>
    <div class="item-name">${currentItem.name}</div>
  `;

  itemElement.draggable = true;

  isItemSelected = false;
  itemElement.classList.remove("selected");

  bins.forEach((bin) => {
    bin.classList.remove("selected-target");
  });
}

function updateStatus() {
  scoreElement.textContent = score;
  correctElement.textContent = correct;
  missElement.textContent = miss;
  timeElement.textContent = timeLeft;
}

function judgeAnswer(selectedType) {
  if (!isPlaying || !currentItem) return;

  const isCorrect = selectedType === currentItem.type;

  // 前回のアニメーションをリセット
  itemElement.classList.remove("correct-flash");
  itemElement.classList.remove("wrong-shake");

  if (isCorrect) {
    score += 10;
    correct++;
    messageElement.textContent = `正解！ ${currentItem.explanation}`;
    itemElement.classList.add("correct-flash");
  } else {
    miss++;
    score = Math.max(0, score - 5);
    messageElement.textContent = `惜しい！ ${currentItem.explanation}`;
    itemElement.classList.add("wrong-shake");
  }

  updateStatus();

  // アニメーションを見せてから、次の資源物に切り替える
  setTimeout(() => {
    itemElement.classList.remove("correct-flash");
    itemElement.classList.remove("wrong-shake");

    if (isPlaying) {
      showRandomItem();
    }
  }, 550);
}

// PC向け：ドラッグ開始
itemElement.addEventListener("dragstart", (event) => {
  if (!isPlaying) return;
  event.dataTransfer.setData("text/plain", currentItem.type);
});

// スマホ向け：資源物をタップして選択
itemElement.addEventListener("click", () => {
  if (!isPlaying) return;

  isItemSelected = !isItemSelected;

  if (isItemSelected) {
    itemElement.classList.add("selected");
    messageElement.textContent = "入れたい回収ボックスをタップしてください。";

    bins.forEach((bin) => {
      bin.classList.add("selected-target");
    });
  } else {
    itemElement.classList.remove("selected");
    messageElement.textContent = "資源物をタップして選択してください。";

    bins.forEach((bin) => {
      bin.classList.remove("selected-target");
    });
  }
});

bins.forEach((bin) => {
  // PC向け：ドラッグ中
  bin.addEventListener("dragover", (event) => {
    event.preventDefault();
    bin.classList.add("drag-over");
  });

  bin.addEventListener("dragleave", () => {
    bin.classList.remove("drag-over");
  });

  // PC向け：ドロップ判定
  bin.addEventListener("drop", (event) => {
    event.preventDefault();
    bin.classList.remove("drag-over");

    if (!isPlaying) return;

    const selectedType = bin.dataset.type;
    judgeAnswer(selectedType);
  });

  // スマホ向け：回収ボックスをタップして判定
  bin.addEventListener("click", () => {
    if (!isPlaying) return;

    if (!isItemSelected) {
      messageElement.textContent = "先に資源物をタップして選択してください。";
      return;
    }

    const selectedType = bin.dataset.type;
    judgeAnswer(selectedType);
  });
});

startButton.addEventListener("click", startGame);
