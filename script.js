emailjs.init("4zanQFmxEnyPYZ_Wj"); // 🔴 replace

const questions = [
  {
    q: "1. What’s something about us that feels like home to you?",
    options: ["Our comfort", "Our laughs", "Being close", "Feeling safe"],
    anyCorrect: true
  },
  {
    q: "2. When did I first fall for you?",
    options: ["Nov 20", "Dec 16", "Dec 20", "I don’t remember"],
    answer: 1
  },
  {
    q: "3. Where did we click this photo?",
    image: "q3-photo.jpg",
    options: ["Plan B", "Toit", "21st Amendment Gastrobar", "No idea"],
    answer: 2
  },
  {
    q: "4. What is my favorite thing about you?",
    options: ["Your smile", "The way you care", "Your sense of humor", "Everything"],
    answer: 3
  },
  {
    q: "5. What do you think I overthink the most?",
    options: ["You 😌", "My future", "Small details", "Everything 😅"],
    answer: 3
  },
  {
    q: "6. What do you think I need most from you?",
    options: ["Reassurance 🤍", "Time ⏳", "Honesty 💬", "Your presence 🫶"],
    anyCorrect: true
  },
  {
    q: "7. What do I bring into your life?",
    options: ["Someone who truly understands you", "A shoulder to lean on", "Trust 🔐", "Unconditional love ❤️"],
    anyCorrect: true
  },
  {
    q: "8. What do I bring that no one else does?",
    options: ["Emotional safety", "Consistencyn", "Deep understanding", "A love that stays"],
    anyCorrect: true
  },
  {
    q: "9. Will you be my Valentine?",
    final: true
  }
];

let index = 0;
let score = 0;
let answers = [];

const box = document.getElementById("question-box");
const scoreText = document.getElementById("score");
const popup = document.getElementById("popup");

function showQuestion() {
  const q = questions[index];
  box.innerHTML = `<h3>${q.q}</h3>`;

  if (q.image) {
    box.innerHTML += `<img src="${q.image}" class="q-image" />`;
  }

  if (q.final) {
    box.innerHTML += `
      <div class="valentine-area">
        <button id="yes">YES 💖</button>
        <button id="no">NO 💔</button>
      </div>
    `;
    handleValentine();
    return;
  }

  q.options.forEach((opt, i) => {
    const div = document.createElement("div");
    div.className = "option";
    div.textContent = opt;
    div.onclick = () => selectOption(i);
    box.appendChild(div);
  });
}

function selectOption(i) {
  const q = questions[index];
  answers.push(q.options[i]);

  let isCorrect = q.anyCorrect || i === q.answer;

  if (isCorrect) {
    score++;
  } else {
    showPopup();
  }

  scoreText.textContent = `Score: ${score}/5`;

  setTimeout(() => {
    index++;
    showQuestion();
  }, 900);
}

function showPopup() {
  popup.textContent = "😈 Kill you after the test 😡🔪";
  popup.style.display = "block";
  setTimeout(() => popup.style.display = "none", 800);
}

function handleValentine() {
  const yes = document.getElementById("yes");
  const no = document.getElementById("no");

  let scale = 1;
  let noActivated = false; // 👈 key fix

  yes.onclick = () => {
    answers.push("YES 💖");
    sendEmail();
    box.innerHTML = `
      <h2>🎉 Yay! You're My Valentine! 🎉</h2>
      <p>Thank you for making my day special! ❤️</p>
      <p><strong>I Love you ❤️💋</strong></p>
    `;
  };

  no.onmouseover = () => {
    // make NO absolute ONLY when hovered
    if (!noActivated) {
      noActivated = true;
      no.style.position = "absolute";
    }

    no.style.left = Math.random() * 220 + "px";
    no.style.top = Math.random() * 80 + "px";

    scale += 0.18;
    yes.style.transform = `scale(${scale})`;
  };
}


function sendEmail() {
  emailjs.send("service_7iiwuyq", "template_w4ijpp9", {
    answers: answers.join(" | "),
    score: `${score}/4`
  });
}

showQuestion();
