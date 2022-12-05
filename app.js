const levelEl = document.querySelector('#level');
const btnLevelEl = document.querySelector('#btn-level');
const progressEl = document.querySelector('.progress');
const progressBarEl = document.querySelector('.progress-bar');
const imgEl = document.querySelector('#img-mate');
const contentEl = document.querySelector('#content');
const optionsEl = document.querySelector('#options');
const resultsEl = document.querySelector('#results');
const btnNextEl = document.querySelector('#btn-next');

let level = 0;
let round = 0;
let correctStudent = null;
let score = 0;
let scoreLastRound = -1;
let fails = [];
const highScore = [];

const getRandomNumber = max => {
	return Math.ceil(Math.random() * max);
}

const shuffleArray = array => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
}

const getOptions = id => { // pass a student id, return same id shuffled along with three other unique id's, as an array
	let options = [id];
	while (options.length < 4) {
		let randomId = getRandomNumber(students.length);
		if (!options.includes(randomId)) {
			options.push(randomId);
		}
	}
	shuffleArray(options);
	return options;
}

const getName = id => students.find(student => student.id === id).name; // pass a student id, return name of student, as a string

const showEl = el => el.classList.remove('hide');
const hideEl = el => el.classList.add('hide');

const getColor = (value, max, rev = 0) => {
	if (value / max > 0.67) {
		return (!rev) ? 'success' : 'danger';
	} else if (value / max < 0.33) {
		return (rev) ? 'success' : 'danger';
	} else {
		return 'warning';
	}
}

const clockify = num => { // pass a number, return a number suited for a clock, as a string (8 => "08", 23 => "23")
	const str = "0"+getRandomNumber(num);
	return str.slice(-2);
}

const levels = [2, 10, 15, 20, 25, 30, 35, students.length];
btnLevelEl.innerHTML += levels.map(level => `<button class="btn btn-sm btn-${getColor(level, students.length, 1)} my-3">${level}</button>`).join('');

btnLevelEl.addEventListener('click', e => {
	if (e.target.tagName === "BUTTON") {
		hideEl(levelEl);
		level = Number(e.target.innerText);

		// add to highscore some mock ghost players that have scored random points at random times of the day
		highScore.push({score: getRandomNumber(level), time: `${clockify(23)}:${clockify(59)}:${clockify(59)}`});
		highScore.push({score: getRandomNumber(level), time: `${clockify(23)}:${clockify(59)}:${clockify(59)}`});
		highScore.push({score: getRandomNumber(level), time: `${clockify(23)}:${clockify(59)}:${clockify(59)}`});
		highScore.push({score: getRandomNumber(level), time: `${clockify(23)}:${clockify(59)}:${clockify(59)}`});
		highScore.push({score: getRandomNumber(level), time: `${clockify(23)}:${clockify(59)}:${clockify(59)}`});

		showEl(progressEl);
		showEl(imgEl);
		playGame(level);
	}
})

const resetGame = () => {
	round = 0;
	score = 0;
	fails = [];
	correctStudent = null;
	progressBarEl.classList.add('progress-bar-animated');
}

const optionEventListener = e => {
	document.querySelectorAll('.option').forEach(option => option.disabled = true);

	const answer = Number(e.target.dataset.studentId);
	e.target.classList.remove('btn-warning');
	if (answer === correctStudent.id) {
		e.target.classList.add('btn-success');
		score++;
	} else {
		e.target.classList.add('btn-danger');
		fails.push(correctStudent);
	}
	progressBarEl.setAttribute('style', `width: ${(round / level) * 100}%`);
	btnNextEl.disabled = false;
}

const btnNextEventListener = () => {
	if (btnNextEl.innerText === "Next mate") { // game is still on
		playRound(students[round], level);

	} else if (btnNextEl.innerText === "See result") { // game is over
		progressBarEl.setAttribute('style', 'width: 100%');
		progressBarEl.classList.remove('progress-bar-animated');

		hideEl(imgEl);
		optionsEl.innerText = '';

		resultsEl.innerHTML += `
			<div class="col-xs-12 col-sm-12 card card-body bg-dark">
				<p class="fs-1">Your score <span class="badge text-bg-${getColor(score, level)}">${score}</span></p>
				<p class="fs-3">Max score <span class="badge text-bg-primary">${level}</span></p>
				<p id="comparison" class="alert hide"></p>
				<div class="mt-3 m-auto">💥 ⇩ Highscore ⇩ 💥
					<ol id="high-score"></ol>
				</div>
			</div>
			<div class="col-xs-12 col-sm-12 card card-body bg-dark">You need to have a 🍺 with:
				<div id="fails" class="row"></div>
			</div>
		`;

		if (scoreLastRound >= 0) {
			const comparisonEl = document.querySelector('#comparison');
			showEl(comparisonEl);
			let diff = score-scoreLastRound;
			if (diff > 0) {
				comparisonEl.classList.add('alert-success');
				comparisonEl.innerText = `You improved your score by ${diff} point${(diff === 1) ? '' : 's'}`;
			} else if (diff < 0) {
				diff = Math.abs(diff);
				comparisonEl.classList.add('alert-danger');
				comparisonEl.innerText = `You worsened your score by ${diff} point${(diff === 1) ? '' : 's'}`;
			} else {
				comparisonEl.classList.add('alert-warning');
				comparisonEl.innerText = 'You scored the same again';
			}
		}		
		scoreLastRound = score;

		const now = new Date().toLocaleTimeString();
		highScore.push({score: score, time: now});
		document.querySelector('#high-score').innerHTML = highScore.sort((a, b) => b.score - a.score).slice(0, 10).map(score => `<li class="ml-auto"><span class="badge text-bg-${getColor(score.score, level)}">${score.score}</span> <span class="small">${score.time}</span>${(score.time === now) ? ' ⇦' : ''}</li>`).join('');

		document.querySelector('#fails').innerHTML = (fails.length) ? fails.map(fail => `<figure class="col-6 figure mt-3 mb-1"><img src="${fail.image}" class="figure-img img-fluid rounded" alt="${fail.name}"><figcaption class="figure-caption">${fail.name}</figcaption></figure>`).join('') : '<p class="mt-3"><em>No one, seems you already had 🍻 with all.</em></p>';

		btnNextEl.innerText = "Play again";

	} else if (btnNextEl.innerText === "Play again") {
		resetGame();
		progressBarEl.setAttribute('style', `width: 0%`);
		resultsEl.innerText = '';
		showEl(imgEl);
		playGame(level);

	} else { // fallback
		btnNextEl.innerText = "Apologies, requested action is not yet developed 🤷🏻‍♂️";
		btnNextEl.disabled = true;
		console.error("Something went wrong with btn-next");
	}
}

const playRound = (student, level) => {
	round++;
	btnNextEl.disabled = true;
	correctStudent = student;
	imgEl.setAttribute('src', correctStudent.image);
	optionsEl.innerHTML = getOptions(correctStudent.id).map(id => `<button class="option btn btn-warning" data-student-id="${id}">${getName(id)}</button>`).join('');

	document.querySelectorAll('.option').forEach(option => {
		option.addEventListener('click', optionEventListener);
	})

	if (round === level) { // show different message in btn-next if last round
		btnNextEl.innerText = "See result";
	}
}

const playGame = level => {
	btnNextEl.innerText = "Next mate";
	shuffleArray(students);
	btnNextEl.addEventListener('click', btnNextEventListener);
	playRound(students[round], level);
}