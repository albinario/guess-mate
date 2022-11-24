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