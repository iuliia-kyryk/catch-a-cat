var pillows = document.getElementsByClassName('pillow');
var myScore = document.querySelector('.score');
var cats = document.querySelectorAll('.cat');
var lastPillow;
var timeUp = false;
var score = 0;

function randomTime(min, max){
    return Math.round(Math.random() * (max - min) + min);
} 

function randomPillow(pillows){
    var idx = Math.floor(Math.random() * pillows.length);
    var pillow = pillows[idx];
    
    if (pillow === lastPillow){
        console.log('ah, the same pillow');
        return randomPillow(pillows);
    }
    
    lastPillow = pillow;
    return pillow;
}
function peep(){
    var time = randomTime(200, 1000);
    var pillow = randomPillow(pillows);
    pillow.classList.add('up');
    setTimeout(() => {
        pillow.classList.remove('up');
        if(!timeUp) peep();
    }, time);
}

function startGame(){
    myScore.textContent = 0;
    timeUp = false;
    peep();
    setTimeout(() => timeUp = true, 15000);
    score = 0;
}

function bank(e){
    if(!e.isTrusted) return // cheater!
    score++;
    this.classList.remove('up');
    myScore.textContent = score;
}

cats.forEach(cat => cat.addEventListener("click", bank));
