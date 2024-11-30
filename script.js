const startButton = document.getElementById("startButton");
const questionContainer = document.getElementById("questionContainer");
const answersContainer = document.getElementById("answers");
const timerElement = document.getElementById("time");
const scoreElement = document.getElementById("score");
const gameOverElement = document.getElementById("gameOver");
const finalScoreElement = document.getElementById("finalScore");
const restartButton = document.getElementById("restartButton");

let score = 0;
let time = 60;
let timerInterval;
let currentQuestionIndex = 0;

const questions = [
    {
        question: "Qui a écrit 'Critique de la raison pure' ?",
        answers: ["Descartes", "Kant", "Hume", "Sartre"],
        correctAnswer: 1
    },
    {
        question: "Quelle est la maxime de l'utilitarisme ?",
        answers: ["Le plus grand bien pour le plus grand nombre", "La vie est souffrance", "L'homme est une passion inutile", "Cogito ergo sum"],
        correctAnswer: 0
    },
    {
        question: "Qui est le philosophe de l'absurde ?",
        answers: ["Camus", "Nietzsche", "Platon", "Spinoza"],
        correctAnswer: 0
    },
    {
        question: "Qu'est-ce que la volonté de puissance ?",
        answers: ["Une volonté d'emprise", "Un concept de Nietzsche", "Un concept kantien", "Une notion d'hegelianisme"],
        correctAnswer: 1
    },
    {
        question: "Que signifie 'l'existence précède l'essence' ?",
        answers: ["Cela signifie que nous sommes définis par notre essence", "Cela signifie que nous existons avant de donner un sens à notre vie", "Cela signifie que l'homme n'a pas de liberté", "Cela signifie que l'essence est une illusion"],
        correctAnswer: 1
    }
];

function startGame() {
    score = 0;
    time = 60;
    currentQuestionIndex = 0;
    scoreElement.textContent = `Score : ${score}`;
    timerElement.textContent = time;
    gameOverElement.style.display = "none";
    questionContainer.style.display = "block";
    startButton.style.display = "none";
    startTimer();
    showQuestion();
}

function startTimer() {
    timerInterval = setInterval(() => {
        time--;
        timerElement.textContent = time;
        if (time <= 0) {
            clearInterval(timerInterval);
            gameOver();
        }
    }, 1000);
}

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    const questionText = document.getElementById("question");
    questionText.textContent = currentQuestion.question;

    answersContainer.innerHTML = "";
    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.onclick = () => checkAnswer(index);
        answersContainer.appendChild(button);
    });
}

function checkAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedIndex === currentQuestion.correctAnswer) {
        score++;
    } else {
        time -= 5; // Pénalité de 5 secondes pour une mauvaise réponse
    }
    scoreElement.textContent = `Score : ${score}`;
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        clearInterval(timerInterval);
        gameOver();
    }
}

function gameOver() {
    questionContainer.style.display = "none";
    gameOverElement.style.display = "block";
    finalScoreElement.textContent = score;
    restartButton.onclick = startGame;
}

startButton.onclick = startGame;
