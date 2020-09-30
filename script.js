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
    {title: "Q0",
    choices: ["a0", "a1", "c", "a3"],
    answer: "c",
    },
    {title: "Q1",
    choices: ["b0", "c", "b2", "b3"],
    answer: "c",
    },
    {title: "Q2",
    choices: ["c0", "c1", "c2", "c"],
    answer: "c",
    },
    {title: "Q3",
    choices: ["c", "d1", "d2", "d3"],
    answer: "c",
    },
    {title: "Q4",
    choices: ["e0", "e1", "c", "e3"],
    answer: "c",
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
    if(this.value !== Questions[currentQuestionIndex].answer) {
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