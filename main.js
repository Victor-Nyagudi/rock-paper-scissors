const body = document.querySelector('body');

const openRulesButton = document.querySelector('.rules');
const rulesMenu = document.querySelector('.all-rules');
const closeRulesButton = document.querySelector('.close-rules');

const stepOne = document.querySelector('.step-one');
const stepOneOptions = document.querySelectorAll('.step-one-option');

const stepTwo = document.querySelector('.step-two');

const playerPick = document.querySelector('.pick--player');
const housePickDOM = document.querySelector('.pick--house');
const housePickEmpty = document.querySelector('.house-pick-empty');

const wholeResult = document.querySelector('.outcome__title');
const resultOptions = document.querySelector('.outcome');

const scoreDOM = document.querySelector('.score__number');
let score = parseInt(document.querySelector('.score__number').textContent);
const playAgainButton = document.querySelector('.outcome__play-again');


if (localStorage.getItem('score')) {
    scoreDOM.textContent = `${localStorage.getItem('score')}`;
    score = localStorage.getItem('score');
}


const paper = `
    <div class="options__container">
        <div class="options__outer-circle paper">
            <button class="options__inner-circle">
                <img src="./images/icon-paper.svg" alt="paper" class="options__icon">
            </button>
        </div>
    </div>
    `;  

const scissors = `
    <div class="options__container">
        <div class="options__outer-circle scissors">
            <button class="options__inner-circle">
                <img src="./images/icon-scissors.svg" alt="scissor" class="options__icon">
            </button>
        </div>
    </div>
    `;

const rock = `
    <div class="options__container">
        <div class="options__outer-circle rock">
            <button class="options__inner-circle">
                <img src="./images/icon-rock.svg" alt="scissor" class="options__icon">
            </button>
        </div>
    </div>
    `;


const getResult = (opponentPick) => {
    const winLose = document.querySelector('.result');

    const houseChoice = Math.floor(Math.random() * 3);

    if (houseChoice === opponentPick + 1 || houseChoice === opponentPick - 2) {
        winLose.textContent = 'lose';
        
        if (score >= 1)
            score--;

        scoreDOM.textContent = score;
    }

    else if (houseChoice === opponentPick - 1 || houseChoice === opponentPick + 2) {
        winLose.textContent = 'win';

        score ++;

        scoreDOM.textContent = score;
    }

    else 
        wholeResult.textContent = 'tie';

    localStorage.setItem('score', `${score}`);

    return houseChoice;
};


const showHousePick = (opponentDecision) => {
    body.classList.add('result-shown');
    resultOptions.style.display = 'block';

    const houseDecision = getResult(opponentDecision);

    switch (houseDecision) {
        case 0:
            housePickDOM.innerHTML += paper;
            break;
        
        case 1:
            housePickDOM.innerHTML += scissors;
            break;
        
        case 2:
            housePickDOM.innerHTML += rock;
            break;
    
        default:
            console.log('No criteria met to show house pick.');
            break;
    }
};

openRulesButton.onclick = function() {
    body.classList.add('menu-open');

    if (body.offsetWidth < 500)
        rulesMenu.style.display = 'flex';

    else
        rulesMenu.style.display = 'grid';

    stepOneOptions.forEach(option => {
        if (option.getAttribute('disabled') === null) 
            option.toggleAttribute('disabled');
    });

    if (playAgainButton.getAttribute('disabled') === null) 
        playAgainButton.toggleAttribute('disabled');
}

closeRulesButton.onclick = function() {
    body.classList.remove('menu-open');

    rulesMenu.style.display = 'none';

    stepOneOptions.forEach(option => option.removeAttribute('disabled'));
    playAgainButton.removeAttribute('disabled');
}

for (let i = 0; i < stepOneOptions.length; i++) {
    const element = stepOneOptions[i];

    element.onclick = function() {
        stepOne.style.display = 'none';
        
        if (body.offsetWidth < 900)
            stepTwo.style.display = 'grid';
        else
            stepTwo.style.display = 'flex';
        
            
        if (i === 0) {
            playerPick.innerHTML += paper;

            setTimeout(() => showHousePick(0), 2000);
        }

        else if (i === 1) {
            playerPick.innerHTML += scissors;

            setTimeout(() => showHousePick(1), 2000);
        }

        else {
            playerPick.innerHTML += rock;

            setTimeout(() => showHousePick(2), 2000);
        }
    }
}

playAgainButton.onclick = function() {
    stepTwo.style.display = 'none';
    stepOne.style.display = 'flex';
    resultOptions.style.display = 'none';

    body.classList.remove('result-shown');
    housePickEmpty.remove();

    playerPick.children[1].remove();
    housePickDOM.children[2].remove();
    
    wholeResult.innerHTML = `You <span class="result"></span>`;
}