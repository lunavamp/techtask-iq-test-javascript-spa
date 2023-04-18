//menu

const headerNav = document.querySelector(".header-nav");
const menuLinks = document.querySelectorAll(".menu-item");
const burgerMenu = document.querySelector(".burger-menu");
const burgerIcon = document.querySelector(".burger-icon");

burgerMenu.addEventListener("click", () => {
  burgerIcon.classList.toggle("_active");
  headerNav.classList.toggle("_active");
});

menuLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const targetSelector = link.dataset.goto;
    const targetSection = document.querySelector(targetSelector);

    targetSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    headerNav.classList.remove("_active");
    burgerIcon.classList.remove("_active");
  });
});

//quiz
const quizContainer = document.querySelector(".quiz-container");
const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const progressBar = document.getElementById("progress");
let currentQuestion = 0;
let score = 0;

const questions = [
  {
    question: "Ваш пол:",
    choices: ["Мужчина", "Женщина"],
  },
  {
    question: "Укажите ваш возраст: ",
    choices: ["До 18", "От 18 до 28", "От 29 до 35", "От 36"],
  },
  {
    question: "Выберите лишнее:",
    choices: ["Дом", "Шалаш", "Бунгало", "Скамейка", "Хижина"],
  },
  {
    question: "Продолжите числовой ряд: 18  20  24  32",
    choices: ["62", "48", "74", "57", "60", "77"],
  },
  {
    question: "Выберите цвет, который сейчас наиболее Вам приятен:",
    choices: ["", "", "", "", "", "", "", "", ""],
  },
  {
    question:
      "Отдохните пару секунд, еще раз Выберите цвет, который сейчас наиболее Вам приятен:",
    choices: ["", "", "", "", "", "", "", "", ""],
  },
  {
    question: "Какой из городов лишний?",
    choices: ["Вашингтон", "Лондон", "Париж", "Нью-Йорк", "Москва", "Оттава"],
  },
  {
    question: "Выберите правильную фигуру из четырёх пронумерованных.",
    choices: ["1", "2", "3", "4"],
  },
  {
    question: "Вам привычнее и важнее:",
    choices: [
      "Наслаждаться каждой минутой проведенного времени",
      "Быть устремленными мыслями в будущее",
      "Учитывать в ежедневной практике прошлый опыт",
    ],
  },
  {
    question: "Вставьте подходящее число",
    choices: ["34", "36", "53", "44", "66", "42"],
  },
];

function nextQuestion() {
  quizContainer.style.display = "block";
  const q = questions[currentQuestion];
  questionElement.innerHTML = q.question;
  choicesElement.innerHTML = "";
  for (let i = 0; i < q.choices.length; i++) {
    const choice = q.choices[i];
    const checkbox = document.createElement("input");
    checkbox.type = "radio";
    checkbox.value = i;
    const label = document.createElement("label");
    label.innerHTML = choice;
    label.appendChild(checkbox);
    choicesElement.appendChild(label);
  }
  const nextButton = document.createElement("button");
  nextButton.innerHTML = "Далее";
  nextButton.addEventListener("click", function () {
    checkAnswer();
  });
  choicesElement.appendChild(nextButton);
  updateProgressBar();
}
nextQuestion();

function checkAnswer() {
  const q = questions[currentQuestion];
  currentQuestion++;
  if (currentQuestion === questions.length) {
    showResults();
  } else {
    nextQuestion();
  }
}

function showResults() {
  quizContainer.style.display = "none";
  const resultContainer = document.createElement("div");
  resultContainer.innerHTML = `You scored ${score} out of ${questions.length} questions.`;
  document.body.appendChild(resultContainer);
}

function updateProgressBar() {
  const percent = (currentQuestion / questions.length) * 100;
  progressBar.style.width = `${percent}%`;
}

const card = document.querySelector(".card");
const btn = document.querySelector(".banner-text-more");

btn.addEventListener("click", () => {
  card.classList.toggle("expand");
});

document.getElementById("test-btn").addEventListener("click", function (event) {
  event.preventDefault();
  document.getElementById("banner").style.display = "none";
  document.getElementById("card").style.display = "none";
  document.getElementById("test").style.display = "block";
});
