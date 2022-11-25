const imgEl = document.querySelector('#img-mate');
const optionsEl = document.querySelector('#options');
const btnNextEl = document.querySelector('#btn-next');

const getRandomNumber = max => {
	return Math.ceil( Math.random() * max );
}

const shuffleArray = array => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
}

// Pass an id, return id along with three OTHER id's, as an array
const getOptions = id => {
    options = [id];
    while (options.length < 4) {
        let anotherId = getRandomNumber(students.length);
        if (!options.includes(anotherId)) {
            options.push(anotherId);
        }
    }
    shuffleArray(options);
    return options;
}

// pass an id, return name of student, as a string
const getName = id => {
    return students.find(student => student.id === id).name;
}

const playGuessMate = () => { 
    const rounds = 3;
    let round = 0;
    let score = 0;
    
    shuffleArray(students);
    
    const playRound = student => {
        imgEl.setAttribute('src', student.image);
        optionsEl.innerHTML = '';
        const options = getOptions(student.id);
        
        if (round === rounds) {
            btnNextEl.innerText = 'See result';
        }
        round++;

        options.forEach(id => {
            optionsEl.innerHTML += `<button class="option btn btn-warning" id="${id}">${getName(id)}</button>`;
        });
        
        optionsEl.addEventListener('click', e => {
            document.querySelectorAll('.option').forEach(option => {
                option.disabled = true;
            });
            e.target.classList.remove('btn-warning');
            if (Number(e.target.id) === student.id) {
                e.target.classList.add('btn-success');
                score++;
            } else {
                e.target.classList.add('btn-danger')
            }
            btnNextEl.disabled = false;
        });

        btnNextEl.addEventListener('click', e => {
            if (round <= rounds) {
                playRound(students[round]);
            } else {
                optionsEl.innerHTML = `<p>${score}</p>`;
            }
        });
    }
    playRound(students[round]);
}
playGuessMate();

/**
 * Guess the number
 *
 * Skriv om ”gissa talet” till att ta emot och visa utfall i DOM. Använd
 * formulär-fält för att ta emot input från användaren, och när formuläret
 * skickas (submits) så jämför det gissade talet mot svaret och visa utfallet
 * i DOM istället för alert()-rutor.
 *
 * STEG 1
 * En input-box där man kan gissa på ett tal. En knapp för att gissa.
 *
 * STEG 1.1
 * Visa resultatet i en alert.
 *
 * STEG 1.2
 * Visa om resultatet var rätt eller inte i ett HTML-element.
 *
 * STEG 2
 * Visa antalet gissningar hittills i ett HTML-element.
 *
 * STEG 3
 * Visa om det gissade talet var för högt eller lågt i ett HTML-element.
 *
 * STEG 4
 * Skapa en knapp för att starta om spelet (ett nytt tal ska slumpas fram och
 * antalet gissningar ska nollställas).
 *
 */

// const cheatEl = document.querySelector('#cheat');
// const formGuessEl = document.querySelector('#formGuess');
// const inputGuessEl = document.querySelector('#inputGuess');
// const turnoutEl = document.querySelector('#turnout');
// const guessesEl = document.querySelector('#guesses');
// const btnSubmit = formGuessEl.querySelector('button[type=submit]');
// const btnReset = formGuessEl.querySelector('button[type=reset]');

// // Get a random number between 1-10
// const getRandomNumber = function(max = 10) {
// 	return Math.ceil( Math.random() * max );
// }

// const play = () => {
// 	let correctNumber = getRandomNumber();
// 	let guesses = 0;
// 	cheatEl.innerText = correctNumber;
	
// 	formGuessEl.addEventListener('submit', e => {
// 		e.preventDefault();
// 		const guess = Number(inputGuessEl.value); // eller formGuessEl.inputGuess.value
// 		guesses++;
// 		guessesEl.innerText = guesses;
		
// 		if (guess === correctNumber) {
// 			turnoutEl.innerText = `🙋🏻‍♂️ Found in ${guesses} guess${guesses != 1 ? 'es' : ''}`;
// 			btnSubmit.setAttribute('disabled', 'disabled');
// 			btnReset.innerText = "New game";
// 		} else {
// 			turnoutEl.innerText = `🤦🏻‍♂️ Too ${guess > correctNumber ? 'high' : 'low'}`;
// 		}
// 	})
// }

// formGuessEl.addEventListener('reset', () => {
// 	guessesEl.innerText = '0';
// 	turnoutEl.innerText = '⬆️ New game';
// 	btnSubmit.removeAttribute('disabled');
// 	btnReset.innerText = "Give up";
// 	play();
// })

// play();