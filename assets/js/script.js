var timeEl = document.getElementById("timer")
var footerEl = $("#bottom")
var timeLeft = 0;
var i = 0;
var score = 0;

var viewHS = document.querySelector("#view-hs")
var header = $('#header')
var pageContentEl = $("#page-content")
var startButtonEl = $(".start-btn")
var titleEl = $("<h1></h2>");
var paragraphEl = $("<p></p>");
var buttonDivEl = $("<div></div>");
var questionText = $("<h2></h2>").addClass("questions-titles")
var questionOlEl = $("<ol></ol>").addClass("choices")
var choiceOne = $("<li></li>")
.addClass("choice")
.attr( 'id', 'choice1')
var choiceTwo = $("<li></li>")
.addClass("choice")
.attr( 'id', 'choice2')
var choiceThree = $("<li></li>")
.addClass("choice")
.attr( 'id', 'choice3')
var choiceFour = $("<li></li>")
.addClass("choice")
.attr( 'id', 'choice4')

var questions = [
    {
    question: "Commonly used data types DO Not Include:",
    a: "strings",
    b: "booleans",
    c: "alerts",
    d: "numbers",
    answer: $(choiceThree).attr('id')
    },
    {
    question: "The condition in an if/ else statement is enclosed with _________.",
    a: "quotes",
    b: "parenthesis",
    c: "curly brackets",
    d: "square brackets",
    answer: $(choiceTwo).attr('id')
    },
    {
    question: "Arrays in Javascript can be used to store __________.",
    a: "numbers and strings",
    b: "other arrays",
    c: "booleans",
    d: "all of the above",
    answer: $(choiceFour).attr('id')
    },
    {
    question: "String values must be enclosed with ______ when being assigned to variables",
    a: "quotes",
    b: "curly brackets",
    c: "commas",
    d: "parenthesis",
    answer: $(choiceOne).attr('id')
    },
    {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    a: "JavaScript",
    b: "terminal/bash",
    c: "for loops",
    d: "console.log",
    answer: $(choiceFour).attr('id')
    }
]


function startTimer() {
    timeLeft =+ 76;
    var countDown = setInterval(function() {
        timeLeft -= 1;
        timeEl.textContent = 'Time: ' + timeLeft;
        if (timeLeft <= 0 || i >= questions.length) {
            clearInterval(countDown);
            endGame();
        } 
    }, 1000)
    loadQuestions();
};

function loadQuestions(){
    removeAllChildNodes(pageContentEl);
    if (i < questions.length){
        questionsDivEl = $("<div></div>").addClass("questions-container");
        $(questionOlEl).append(choiceOne, choiceTwo, choiceThree, choiceFour);
        $(questionText).text(questions[i].question);
        $(choiceOne).text('1. ' + questions[i].a)
        $(choiceTwo).text("2. " + questions[i].b)
        $(choiceThree).text("3. " + questions[i].c)
        $(choiceFour).text("4. " + questions[i].d)
        $(questionsDivEl).append(questionText);
        $(questionsDivEl).append(questionOlEl);
        $(pageContentEl).append(questionsDivEl);
    }
    choiceOne.on("click", checkAnswer);
    choiceTwo.on("click", checkAnswer);  
    choiceThree.on("click", checkAnswer);  
    choiceFour.on("click", checkAnswer);   
};

function checkAnswer() {
    if (this.id === questions[i].answer){
        timeLeft += 10;
        timeEl.textContent = "Time: " + timeLeft;
        score += 10;
        footerRight();
    }
    else if (this.id != questions[i].answer) {
        timeLeft -= 10;
        footerWrong();
    }
    i++
    removeAllChildNodes(questionsDivEl);
    loadQuestions();  
}  

var footerRight = function(){
    var rightEl = $("<h2></h2>").addClass("answer").text("Right!")
    footerEl.append(rightEl);
    setTimeout(clearFooter, 3000);
}

var footerWrong = function(){
    var wrongEl = $("<h2></h2>").addClass("answer").text("Wrong!")
    footerEl.append(wrongEl);
    setTimeout(clearFooter, 2000); 
};

function clearFooter(){
    removeAllChildNodes(footerEl)
};

function endGame(){
    removeAllChildNodes(header)
    var h2El = $("<h2></h2>").addClass("endgame-h2").text("All done!");
    var pEl = $("<p></p>").addClass("endgame-p").text("Your final score is " + score);
    var inputFormEl = $("<div></div>").addClass("input-form")
    var initialsEl = $("<p></p>").addClass("endgame-p").text("Enter initials: ");

    var inputEl = $("<input></input>")
    .addClass("input")
    .attr("type", "text")
    .attr("value", "");

    var subBtnEl = $("<button></button>").addClass('submit-btn').text("Submit");
    $(subBtnEl).on("click", submitScore)

    inputFormEl.append(initialsEl);
    inputFormEl.append(inputEl);
    inputFormEl.append(subBtnEl);
    pageContentEl.append(h2El)
    pageContentEl.append(pEl)
    pageContentEl.append(inputFormEl)

 
    function submitScore(){
        var input = inputEl.val()
        if (input === "" || input.length > 2 || input.length < 1){
            alert("Enter valid initials")
            removeAllChildNodes(pageContentEl)
            endGame();
        }
        else {
            input = input.toUpperCase() 
            saveHighScores(input, score);
        }
    }
};

function saveHighScores(INP, SCR){
    var highscores = JSON.parse(localStorage.getItem('highscores'));
    if(!highscores){
        highscores = {
        dataArr:[]
        }
        var data = [INP, SCR]
        var dataArr = highscores.dataArr
        dataArr.push(data)
    }
    else {
        var data = [INP, SCR]
        highscores.dataArr.push(data)
        highscores.dataArr.sort((a,b)=>b[1]-a[1])
    } 
    localStorage.setItem('highscores', JSON.stringify(highscores))
    loadHighScores();
}

function loadHighScores(){
    removeAllChildNodes(pageContentEl)
    var highscores = JSON.parse(localStorage.getItem('highscores'));
    var hsDiv = document.createElement('div')
    var hsHeader = document.createElement('h2')
    hsHeader.setAttribute('class', 'hs-header')
    hsHeader.textContent = 'High Scores'
    hsDiv.appendChild(hsHeader)
    var hsUl = document.createElement('ul')
    hsUl.setAttribute('class', 'hs-ul')

    for (var i=0; i < highscores.dataArr.length && i < 10; i++) {
        var scores = document.createElement('li');
        scores.setAttribute('class', 'hs-li')
        var initials = highscores.dataArr[i][0];
        var hscore = highscores.dataArr[i][1];
        scores.innerHTML = initials + ' - ' + hscore;
        (hsUl.appendChild(scores));
    }
    hsDiv.appendChild(hsUl)
    var btnDiv = document.createElement('div')
    btnDiv.setAttribute('class', 'btn-div')

    var goBackBtn = document.createElement('button')
    goBackBtn.textContent = 'Go Back'
    goBackBtn.setAttribute('class', 'start-btn go-back-btn')

    btnDiv.appendChild(goBackBtn)

    var clearScoresBtn = document.createElement('button')
    clearScoresBtn.textContent = 'Clear Highscores'
    clearScoresBtn.setAttribute('class', 'start-btn clear-scores-btn')

    btnDiv.appendChild(clearScoresBtn)
    hsDiv.appendChild(btnDiv)

    pageContentEl.append(hsDiv)
    
    goBackBtn.addEventListener('click', function(){
        document.location.reload()
    })

    clearScoresBtn.addEventListener('click', function(){
        highscores = {
            dataArr:[]
        }
        localStorage.setItem('highscores', JSON.stringify(highscores))
        document.location.reload()
    })
};

function removeAllChildNodes(parent) {
        (parent).empty();
};

startButtonEl.on("click", startTimer);
viewHS.addEventListener('click', function(){
   var highscores = JSON.parse(localStorage.getItem('highscores'))
   if (!highscores) {
       highscores = {
           dataArr: []
       }
   }
   localStorage.setItem('highscores', JSON.stringify(highscores))
   loadHighScores();
})
