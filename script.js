//select all elements
const start = document.getElementById('start');
const quiz = document.getElementById('quiz');
/* const qImg = document.getElementById('questionImage'); */
const question = document.getElementById('question');
const counter = document.getElementById('counter');
const timeGauge = document.getElementById('timeGauge')

const choiceA = document.getElementById('A');
const choiceB = document.getElementById('B');
const choiceC = document.getElementById('C');

const progress = document.getElementById('progress');

const scoreContainer = document.getElementById('scoreContainer');

let count = 0;
const questionTime = 10;
const gaugeWidth = 150;
const gaugeUnit = gaugeWidth/ questionTime;
//create questions 
let questions = [
    {
        question : 'Who created jQuery?',
        imgSrc : './img/js.png',
        choiceA : 'John Resig',
        choiceB : 'Bill Gates',
        choiceC : 'Donald Trump',
        correct : 'A'

    },{
        question : 'What does CSS stand for?',
        imgSrc : './img/css.png',
        choiceA : 'Central Standard Styles',
        choiceB : 'Cascading Style Sheets',
        choiceC : 'Circus Super Squirrels',
        correct : 'B'
    },{
        question : 'What does HTML stand for?',
        imgSrc : './img/html.png',
        choiceA : 'Hyper Technical Markup Language',
        choiceB : 'Hyper Transparent Markup Language',
        choiceC : 'Hyper Text Markup Language',
        correct : 'C'
    }
];

const lastQuestion = questions.length -1;
let runningQuestion = 0;

let answerIsCorrect = () => {
    document.querySelectorAll('.prog')[runningQuestion].setAttribute('style', "background-color: #0f0;");
    console.log("correct")
}


let answerIsWrong = () => {
    document.querySelectorAll('.prog')[runningQuestion].setAttribute('style', "background-color: #f00;");
    console.log("wrong")
}



//render a question 
let renderQuestion = () => {
    let q = questions[runningQuestion];
    
    question.innerHTML = '<p>'+ q.question + '</p>';
    qImg.innerHTML = '<img src=' + q.imgSrc +'>';
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    
}

function checkAnswer (answer) {
    if(questions[runningQuestion].correct == answer) {
        score++;
        answerIsCorrect();
    } else {
        answerIsWrong();
    }
    
    if(runningQuestion < lastQuestion) {
        count = 0;
        runningQuestion++;
        renderQuestion();
    } else {
        clearInterval(TIMER);
        scoreRender();
    }
}

let renderProgress = () => {
    for (let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class = 'prog' id=" + qIndex + "></div>";
    }
}

let score = 0;

answer => { if (questions[runningQuestion].correct == answer) {
    score++;
    answerIsCorrect();
    } else {
    answerIsWrong();
    }
    if(runningQuestion < lastQuestion) {
    count = 0;
    runningQuestion++;
    renderQuestion();

    } else {
        clearInterval(TIMER);
        scoreRender();
    } 
}

let TIMER;
let startQuiz = () => {
    start.style.display = 'none';
    renderCounter();
    TIMER = setInterval(renderCounter, 1000);
    renderProgress();
    renderQuestion();
    quiz.style.display = 'block';
}
start.addEventListener('click', startQuiz);

/* x = (Y == 'one') ? 1 : (Y == 'zero') ? 0 : 2 */

let scoreRender = () => {
    scoreContainer.style.display = 'block';
    let scorePerCent = Math.round(100 * score / questions.length);
    let img = (scorePerCent >= 80) ? './img/5.png' :
                (scorePerCent >= 60) ? './img/4.png' :
                (scorePerCent >= 40) ? './img/3.png' :
                (scorePerCent >= 20) ? './img/2.png' :
                './img/1.png'
    scoreContainer.innerHTML = "<img src=" + img + ">";
    scoreContainer.innerHTML +=  "+<p>" + scorePerCent + '%</p>';
}


let renderCounter = () => {
    if(count <= questionTime) {
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px" ;
        count++
    } else {
        count = 0;
        answerIsWrong();
        if(runningQuestion < lastQuestion) {
            runningQuestion++;
            renderQuestion();
        }
    } 
}




