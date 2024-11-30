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
    },
    {
        question: "Qu'est-ce que le matérialisme dialectique ?",
        answers: ["Une théorie de Marx et Engels", "Une idée de Kant", "Une pensée empiriste", "Une notion de Descartes"],
        correctAnswer: 0
    },
    {
        question: "Quel philosophe a popularisé le concept de surhomme ?",
        answers: ["Hegel", "Kierkegaard", "Nietzsche", "Marx"],
        correctAnswer: 2
    },
    {
        question: "Qu'est-ce que le cogito selon Descartes ?",
        answers: ["Je pense, donc je suis", "Je doute, donc je suis", "Je vis, donc je suis", "Je veux, donc je suis"],
        correctAnswer: 0
    },
    {
        question: "Quel philosophe a développé la théorie du contrat social ?",
        answers: ["Platon", "Rousseau", "Hobbes", "Locke"],
        correctAnswer: 1
    },
    {
        question: "Qu'est-ce que le scepticisme ?",
        answers: ["La recherche de la vérité par la science", "La pensée qu'il est impossible de connaître quoi que ce soit avec certitude", "L'idée que tout est déterminé", "La croyance en une vérité absolue"],
        correctAnswer: 1
    },
    {
        question: "Quel est le principe fondamental de l'éthique de Kant ?",
        answers: ["Le bonheur comme objectif suprême", "Agir de manière à ce que ta maxime puisse être universellement légiférée", "La recherche du plaisir", "La vertu comme but ultime"],
        correctAnswer: 1
    },
    {
        question: "Qui a écrit 'L'être et le néant' ?",
        answers: ["Sartre", "Heidegger", "Camus", "Nietzsche"],
        correctAnswer: 0
    },
    {
        question: "Quel philosophe a introduit le concept de 'l'ataraxie' ?",
        answers: ["Épicure", "Zénon", "Socrate", "Platon"],
        correctAnswer: 0
    },
    {
        question: "Quel est le thème principal de la philosophie de Spinoza ?",
        answers: ["La liberté individuelle", "Le dualisme de l'âme et du corps", "Le panthéisme", "Le relativisme moral"],
        correctAnswer: 2
    },
    {
        question: "Qu'est-ce que le nihilisme ?",
        answers: ["La croyance en un sens de la vie", "L'absence de sens et de valeur universelle", "L'optimisme radical", "La croyance en un Dieu omnipotent"],
        correctAnswer: 1
    },
    {
        question: "Qui a théorisé l'idée de la 'main invisible' ?",
        answers: ["Marx", "Smith", "Keynes", "Ricardo"],
        correctAnswer: 1
    },
    {
        question: "Quelle est la théorie principale de John Rawls sur la justice ?",
        answers: ["La justice comme équité", "La justice comme égalité absolue", "La justice comme utilitarisme", "La justice comme libre marché"],
        correctAnswer: 0
    },
    {
        question: "Quel philosophe a dit 'L'homme est condamné à être libre' ?",
        answers: ["Sartre", "Nietzsche", "Kierkegaard", "Camus"],
        correctAnswer: 0
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
