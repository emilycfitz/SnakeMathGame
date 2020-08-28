
var timer = null;
var gamestatus = false;
var time = 120;
var score = 0;
var scoreElement,timeElement,startElement,gameElement;
var questions = (new Question()).getQuestion();
var question = null;

window.addEventListener("load",function(){
    scoreElement = document.getElementById('score');
    timeElement = document.getElementById('time');
    startElement = document.getElementById('startButton');
    gameElement = document.getElementById('gamecontent');
    reset();

    startElement.addEventListener("click",start);
    document.addEventListener("keydown",function(ev){
        if(ev.keyCode === 13 && gamestatus){
            var input = document.getElementById('answer').value;
            if(input == ""){
                return;
            }       
            if(question.a == input){
                score += 100;           
                scoreElement.innerHTML = score;
            }     
            changeQuestion();
        }
    });
});

function start(){
   window.setInterval(function(){  
        time = time - 1;
        timeElement.innerHTML = time;
        if(time <= 0){
            window.clearInterval(timer);
            alert("Game Over！Your Score："+score);
            reset();
        }
    },1000);
    startElement.style.display = 'none';
    gameElement.style.display = 'block';
    changeQuestion();
    gamestatus = true;
}
function changeQuestion(){
    var index = parseInt(Math.random()*questions.length);
    question = questions[index];
    var inputHTML = '<input type="text" align="absmiddle" id="answer">';
    question.q = question.q.replace(/\(/ig,inputHTML).replace(/\)/ig,'');
    gamecontent.innerHTML = question.q;
}

function reset(){
    scoreElement.innerHTML = 0 ;
    timeElement.innerHTML = time;
    gamestatus = false;
    window.clearInterval(timer);
    startElement.style.display = 'block';
    gameElement.style.display = 'none';
}