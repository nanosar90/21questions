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
        question : 'Eat my ass?',
        imgSrc : './img/css.png',
        choiceA : 'John Resig',
        choiceB : 'Bill Gates',
        choiceC : 'Donald Trump',
        correct : 'B'
    },{
        question : 'I would fuck?',
        imgSrc : './img/html.png',
        choiceA : 'John Resig',
        choiceB : 'Bill Gates',
        choiceC : 'Donald Trump',
        correct : 'C'
    }
];

const lastQuestion = questions.length -1;
let runningQuestion = 0;

let answerIsCorrect = () => {
    document.getElementById(runningQuestion).style.backgroundColor = "0f0";
}

let answerIsWrong = () => {
    document.getElementById(runningQuestion).style.backgroundColor = "f00";
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
    if(answer == questions[runningQuestion].correct) {
        score++;
        answerIsCorrect();
    } else {
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
    } else {
        clearInterval(TIMER);

    }
}

let renderProgress = () => {
    for (let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class = 'prog' id=" + qIndex + "></div>";
    }
}

let score = 0;

answer => { if (questions[runningQuestionIndex].correct == answer) {
    score++;
    answerIsCorrect();
    } else {
    answerIsWrong();
    }
    if(runningQuestionIndex < lastQuestionIndex) {
    count = 0;
    runningQuestionIndex++;
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




