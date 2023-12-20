const quiz = [
    {
      question: "What is the output of the following code?\n\nconsole.log(2 + '2');",
      options: ["22", "4", "NaN", "TypeError"],
      answer: 0
    },
    {
      question: "Which of the following is not a JavaScript framework?",
      options: ["React", "Angular", "Vue", "Java"],
      answer: 3
    },
    {
      question: "What does the 'DOM' stand for in web development?",
      options: ["Document Object Model", "Data Object Model", "Document Oriented Model", "Design Object Model"],
      answer: 0
    },
    {
      question: "Which method is used to add a new element to an array in JavaScript?",
      options: ["push()", "add()", "append()", "insert()"],
      answer: 0
    },
    {
      question: "What is the correct way to comment a single line in JavaScript?",
      options: ["// This is a comment", "/* This is a comment */", "<!-- This is a comment -->", "# This is a comment"],
      answer: 0
    }
  ];
  // Add more questions here...

  let currentQuestionIndex = 0;
  let score = 0;
  let timer = 60;
  
  const startButton = document.getElementById("start-button");
  const questionContainer = document.getElementById("question-container");
  const questionElement = document.getElementById("question");
  const option1 = document.getElementById("option1");
  const option2 = document.getElementById("option2");
  const option3 = document.getElementById("option3");
  const option4 = document.getElementById("option4");
  const scoreContainer = document.getElementById("score-container");
  const scoreElement = document.getElementById("score");
  const timerElement = document.getElementById("timer");
  const endContainer = document.getElementById("end-container");
  const initialsInput = document.getElementById("initials");
  const submitButton = document.getElementById("submit");
  const leaderboardContainer = document.getElementById("leaderboard-container");
  const leaderboardList = document.getElementById("leaderboard-list");
  
  let interval;
  
  function startQuiz() {
    startButton.style.display = "none";
    questionContainer.style.display = "block";
    scoreContainer.style.display = "none";
    endContainer.style.display = "none";
    leaderboardContainer.style.display = "none";
  
    showQuestion();
    startTimer();
  }
  
  function showQuestion() {
    const currentQuestion = quiz[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    option1.textContent = currentQuestion.options[0];
    option2.textContent = currentQuestion.options[1];
    option3.textContent = currentQuestion.options[2];
    option4.textContent = currentQuestion.options[3];
  }
  
  function checkAnswer(answer) {
    const currentQuestion = quiz[currentQuestionIndex];
    if (answer === currentQuestion.answer) {
      score++;
    } else {
      timer -= 10;
      if (timer < 0) {
        timer = 0;
      }
    }
  
    currentQuestionIndex++;
  
    if (currentQuestionIndex === quiz.length || timer === 0) {
      endGame();
    } else {
      showQuestion();
    }
  }
  
  function startTimer() {
    timerElement.textContent = timer;
    interval = setInterval(() => {
      timer--;
      if (timer < 0) {
        timer = 0;
      }
      timerElement.textContent = timer;
  
      if (timer === 0 || currentQuestionIndex === quiz.length) {
        clearInterval(interval);
        endGame();
      }
    }, 1000);
  }
  
  function endGame() {
    questionContainer.style.display = "none";
    scoreContainer.style.display = "block";
    endContainer.style.display = "block";
    leaderboardContainer.style.display = "block";
    scoreElement.textContent = score;
  
    displayLeaderboard();
  }
  
  function saveScore() {
    const initials = initialsInput.value;
    if (initials !== "") {
      const highScores = getHighScores();
      highScores.push({ initials, score });
      setHighScores(highScores);
      displayLeaderboard();
    }
  }
  
  function getHighScores() {
    const highScoresString = localStorage.getItem("highScores");
    if (highScoresString) {
      return JSON.parse(highScoresString);
    } else {
      return [];
    }
  }
  
  function setHighScores(highScores) {
    localStorage.setItem("highScores", JSON.stringify(highScores));
  }
  
  function displayLeaderboard() {
    leaderboardList.innerHTML = "";
    const highScores = getHighScores();
    highScores.sort((a, b) => b.score - a.score);
    highScores.forEach((entry, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${index + 1}. ${entry.initials} - ${entry.score}`;
      leaderboardList.appendChild(listItem);
    });
  }
  
  startButton.addEventListener("click", startQuiz);
  submitButton.addEventListener("click", saveScore);
  option1.addEventListener("click", checkAnswer);
  option2.addEventListener("click", checkAnswer);
  option3.addEventListener("click", checkAnswer);
  option4.addEventListener("click", checkAnswer);