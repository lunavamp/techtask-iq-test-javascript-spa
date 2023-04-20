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

// expand footer
function expandCard() {
  const card = document.querySelector(".card");
  const btn = document.querySelector(".banner-text-btn");
  btn.addEventListener("click", () => {
    card.classList.toggle("expand");
  });
}
expandCard();

//quiz
const quizContainer = document.querySelector(".quiz-container");
const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const progressBar = document.getElementById("progress");
let currentQuestion = 0;
const colors = [
  "#A8A8A8",
  "#0000A9",
  "#00A701",
  "#F60100",
  "#FDFF19",
  "#A95403",
  "#000000",
  "#850068",
  "#46B3AC",
];
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
    choices: colors,
  },
  {
    question:
      "Отдохните пару секунд, еще раз Выберите цвет, который сейчас наиболее Вам приятен:",
    choices: colors,
  },
  {
    question: "Какой из городов лишний?",
    choices: ["Вашингтон", "Лондон", "Париж", "Нью-Йорк", "Москва", "Оттава"],
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
    const newDiv = document.createElement("div");
    newDiv.classList.add("choices-container");
    label.innerHTML += choice;
    newDiv.appendChild(label);
    newDiv.appendChild(checkbox);
    choicesElement.appendChild(newDiv);
    if (q.question.includes("Выберите цвет")) {
      label.style.display = "none";
      checkbox.classList.add("color-square");
      checkbox.style.backgroundColor = colors[i];
      choicesElement.classList.add("color-grid");
      newDiv.classList.add("choices-container-color");
    } else {
      choicesElement.classList.remove("color-grid");
    }
  }
  if (q.question.includes("Вставьте подходящее")) {
    const img = document.createElement("img");
    img.src = "./img/image1.png";
    const imgDiv = document.createElement("div");
    imgDiv.classList.add("image-container");
    imgDiv.appendChild(img);
    quizContainer.insertBefore(imgDiv, choicesElement);
  }
  updateProgressBar();
}
nextQuestion();

const nextButton = document.createElement("button");
nextButton.innerHTML = "Далее";
nextButton.addEventListener("click", function () {
  checkAnswer();
});
quizContainer.appendChild(nextButton);

function checkAnswer() {
  const q = questions[currentQuestion];
  currentQuestion++;
  if (currentQuestion === questions.length) {
    showLoader();
    quizContainer.style.display = "none";
  } else {
    nextQuestion();
  }
}

function updateProgressBar() {
  const percent = (currentQuestion / questions.length) * 100;
  progressBar.style.width = `${percent}%`;
}

const buttons = document.querySelectorAll(".test-btn");
document;
buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    document.getElementById("banner").style.display = "none";
    document.getElementById("card").style.display = "none";
    document.getElementById("test").style.display = "block";
    document.getElementById("quiz-brain").style.display = "block";
    document.getElementById("menu-title").style.display = "block";
  });
});

// loader

function showLoader() {
  const loaderContainer = document.getElementById("loader-container");
  loaderContainer.style.display = "flex";
  setTimeout(() => {
    loaderContainer.style.display = "none";
    showTimerContainer();
  }, 2000);
}

function showTimerContainer() {
  const timerContainer = document.getElementById("timer-container");
  timerContainer.style.display = "block";
  callButton.style.display = "block";
  document.getElementById("menu-title").innerText = "Готово!";
}

// timer

const timerContainer = document.getElementById("timer-container");
const timerDisplay = document.getElementById("timer");
const callButton = document.getElementById("call-now-button");
let timeLeft = 600;

function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const minutesDisplay = minutes < 10 ? "0" + minutes : minutes;
  const secondsDisplay = seconds < 10 ? "0" + seconds : seconds;
  timerDisplay.innerHTML = `
  <p class="timer-text">Звоните скорее, запись доступна всего <span class="timer-minutes">${minutesDisplay}:${secondsDisplay}</span> минут
  </p>
`;
}

function startTimer() {
  updateTimer();
  const timerInterval = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      timerContainer.style.display = "none";
      callButton.style.display = "block";
    }
  }, 1000);
}
startTimer();

// get API data

const output = document.getElementById("output");

callButton.addEventListener("click", () => {
  fetch("https://swapi.dev/api/people/1/")
    .then((response) => response.json())
    .then((data) => {
      const formattedData = `
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Height:</strong> ${data.height} cm</p>
        <p><strong>Weight:</strong> ${data.mass} kg</p>
        <p><strong>Hair color:</strong> ${data.hair_color}</p>
        <p><strong>Skin color:</strong> ${data.skin_color}</p>
        <p><strong>Eye color:</strong> ${data.eye_color}</p>
        <p><strong>Birth year:</strong> ${data.birth_year}</p>
        <p><strong>Gender:</strong> ${data.gender}</p>
      `;
      output.innerHTML = formattedData;
    })
    .catch((error) => console.error(error));
  document.getElementById("output").style.display = "block";
});
