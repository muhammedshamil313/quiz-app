let questions = [];
let current = 0;
let answers = [];

// 🔁 Fetch questions from backend
fetch("https://your-backend-url.onrender.com/questions")
  .then(res => res.json())
  .then(data => {
    questions = shuffle(data).slice(0, 10); // take 10 random questions
    loadQ();
  })
  .catch(err => {
    document.getElementById("question").innerText = "Failed to load questions.";
    console.error(err);
  });

// 🔀 Shuffle questions
function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

// 📌 Load Question
function loadQ() {
  let q = questions[current];

  if (!q) return;

  document.getElementById("question").innerText = `Q${current + 1}. ${q.question}`;

  let optDiv = document.getElementById("options");
  optDiv.innerHTML = "";

  q.options.forEach(opt => {
    let btn = document.createElement("div");
    btn.innerText = opt;
    btn.classList.add("option");

    // Highlight selected option
    if (answers[current] === opt) {
      btn.classList.add("selected");
    }

    btn.onclick = () => {
      answers[current] = opt;
      loadQ(); // reload to update UI
    };

    optDiv.appendChild(btn);
  });

  // 📊 Update Progress Bar
  let progress = ((current + 1) / 10) * 100;
  document.getElementById("progress").style.width = progress + "%";

  // 🔁 Change button text on last question
  let nextBtn = document.getElementById("nextBtn");
  if (current === 9) {
    nextBtn.innerText = "Submit ✅";
  } else {
    nextBtn.innerText = "Next ➡";
  }
}

// ➡ Next Question
function nextQ() {
  // Prevent skipping without answer (optional but better UX)
  if (!answers[current]) {
    alert("Please select an option!");
    return;
  }

  if (current === 9) {
    submitQuiz();
    return;
  }

  current++;
  loadQ();
}

// ⬅ Previous Question
function prevQ() {
  if (current > 0) {
    current--;
    loadQ();
  }
}

// 🧮 Submit Quiz
function submitQuiz() {
  let score = 0;

  questions.forEach((q, i) => {
    if (q.answer === answers[i]) {
      score++;
    }
  });

  // Save score
  localStorage.setItem("score", score);

  // Go to result page
  window.location.href = "result.html";
}