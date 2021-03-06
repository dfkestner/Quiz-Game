var main = document.getElementById("main");

var header = document.getElementById("header");

var content = document.getElementById("content");

var startButton = document.getElementById("startButton");

var timer = document.getElementById("timer");

var score = document.getElementById("score");

var result = document.getElementById("result");

var enterInfo = document.getElementById("hs-text").style.visibility = "hidden";

var highscores = document.getElementById("hScores");

var scoreList = [];

var currentScore = 0;

var timeLeft = 120;

var Questions = [
    {title: "What ancient cilization built the Machu Picchu complex in Peru?",
    choices: ["A: The Mayans", "B: The Incas", "C: The Olmecs", "D: The Aztecs"],
    correctAnswer: "B: The Incas",
    },
    {title: "What type of word is 'truthfully'?",
    choices: ["A: Adverb", "B: Adjective", "C: Interjection", "D: Article"],
    correctAnswer: "A: Adverb",
    },
    {title: "What is the longest river in the world?",
    choices: ["A: Yangtze", "B: Mississippi", "C: Amazon", "D: Nile"],
    correctAnswer: "D: Nile",
    },
    {title: "What planet is nicknamed the 'Red Planet'?",
    choices: ["A: Mercury", "B: Venus", "C: Mars", "D: Jupiter"],
    correctAnswer: "C: Mars",
    },
    {title: "The interior angles of a triangle always sum up to ____ :",
    choices: ["A: 90 degrees", "B: 60 degrees", "C: 75 degrees", "D: 180 degrees"],
    correctAnswer: "D: 180 degrees",
    }]

var currentQuestionIndex = 0;

function getQuestion() {
    content.textContent = "";
    result.textContent = "";
    var currentQuestion = Questions[currentQuestionIndex];
    header.textContent = currentQuestion.title;
    score.textContent = currentScore;
    timer.textContent = timeLeft;

    for (var i = 0; i < currentQuestion.choices.length; i++) {
        var choiceButton = document.createElement("button");
        choiceButton.setAttribute("value", currentQuestion.choices[i]);
        choiceButton.textContent = currentQuestion.choices[i];
        choiceButton.onclick = choiceSelect;
        content.appendChild(choiceButton);
    }
}

function choiceSelect() {
    if(this.value !== Questions[currentQuestionIndex].correctAnswer) {
        timeLeft -= 10;
        result.textContent = "Incorrect :(";
    }
    else {
        currentScore += 10;
        result.textContent = "You got it right!";
    }
    currentQuestionIndex ++;
    if(currentQuestionIndex === Questions.length) {
        gameOver();
    }
    else {
        getQuestion();
    }
};

function startTimer() {
    var timeInterval = setInterval(function() {
        timer.textContent = timeLeft + " seconds remaining";
        timeLeft--;

        if (timeLeft === 0) {
            timer.textContent = "TIME'S UP!";
            clearInterval(timeInterval);
            gameOver();
        }
        else if (currentQuestionIndex === Questions.length) {
            timer.content = "";
            clearInterval(timeInterval);
            gameOver();
        }
    }, 1000);
};

function gameOver() {
    result.textContent = "";
    timer.textContent = "";
    header.textContent = "GAME OVER!";
    content.textContent = "Submit your score and initials! ";
    score.textContent = "Your score: " + currentScore;
    showform()
};

function renderscores() {
    for (var i=0; i < scoreList.length; i++) {
        var newScore = scoreList[i];

        var li = document.createElement("li");
        li.textContent = newScore;
        li.setAttribute("data-index", i);
        highscores.appendChild(li);
    };
};

function showform() {
    document.getElementById("hs-text").style.visibility = "visible";
    
    var sbutton = document.createElement("button");
    sbutton.textContent = "Submit";
    highscores.appendChild(sbutton);
    sbutton.addEventListener("submit", function(event) {
        event.preventDefault();

        var highscoretext = highscores.value.trim();

        if (highscoretext === "") {
            return;
        };

        scoreList.push(highscoretext);
        enterInfo.value = "";
    });
};

startButton.addEventListener("click", function() {
    content.textContent = "";
    getQuestion();
    startTimer();    
});