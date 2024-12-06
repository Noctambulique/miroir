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
        answers: ["Le plus grand bien pour le plus grand nombre", "La vie est souffrance", "L'homme a des passions inutiles", "Cogito ergo sum"],
        correctAnswer: 0
    },
    {
        question: "Que signifie le terme 'solipsisme' ?",
        answers: ["La croyance que l'on est la seule réalité existante", "La négation de toute existence", "Le libre arbitre de l'individu", "La recherche du bonheur personnel"],
        correctAnswer: 0
    },
    {
        question: "Qu'est-ce que la volonté de puissance ?",
        answers: ["Une volonté d'emprise", "Un concept de Nietzsche", "Un concept kantien", "Une notion d'hégélianisme"],
        correctAnswer: 1
    },
    {
        question: "Quel est le concept central de la philosophie de Jean-Paul Sartre ?",
        answers: ["L'existence précède l'essence", "La volonté de puissance", "Le surhomme", "Le nihilisme"],
        correctAnswer: 0
    },
    {
        question: "Qui a dit 'L'homme est la mesure de toutes choses' ?",
        answers: ["Protagoras", "Platon", "Socrate", "Aristote"],
        correctAnswer: 0
    },
    {
        question: "Qui est l'auteur de 'Le deuxième sexe' ?",
        answers: ["Simone de Beauvoir", "Marie Curie", "Hannah Arendt", "Simone Weil"],
        correctAnswer: 0
    },
    {
        question: "Qu'est-ce que le cogito selon Descartes ?",
        answers: ["Je veux, donc je suis", "Je doute, donc je suis", "Je vis, donc je suis", "Je pense, donc je suis"],
        correctAnswer: 3
    },
        {
        question: "Qui est le philosophe le plus ancien : Friedrich Nietzsche ou Arthur Schopenhauer ?",
        answers: ["Friedrich Nietzsche", "Arthur Schopenhauer"],
        correctAnswer: 1
    },
    {
        question: "Quel philosophe a développé la théorie du contrat social ?",
        answers: ["Platon", "Rousseau", "Hobbes", "Locke"],
        correctAnswer: 1
    },
    {
        question: "Quel est le principe fondamental de l'éthique de Kant ?",
        answers: ["Le bonheur comme objectif suprême", "Agir de manière à ce que ta maxime puisse être universellement légiférée", "La recherche du plaisir", "La vertu comme but ultime"],
        correctAnswer: 1
    },
    {
        question: "Qui a écrit 'L'être et le néant' ?",
        answers: ["Camus", "Heidegger", "Sartre", "Nietzsche"],
        correctAnswer: 2
    },
    {
        question: "Qu'est-ce que le nihilisme ?",
        answers: ["La croyance en un sens à la vie", "L'absence de sens et de valeur universelle", "L'optimisme radical", "La croyance en un Dieu omnipotent"],
        correctAnswer: 1
    },
        {
        question: "Vrai ou faux : Selon Platon, la réalité sensible est la seule réalité qui existe.",
        answers: ["Faux", "Vrai"],
        correctAnswer: 0
    },
        {
        question: "Qui est le philosophe le plus ancien : René Descartes ou Thomas Hobbes ?",
        answers: ["René Descartes", "Thomas Hobbes"],
        correctAnswer: 1
    },
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
