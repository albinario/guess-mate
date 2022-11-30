const imgEl = document.querySelector('#img-mate');
const optionsEl = document.querySelector('#options');
const resultsEl = document.querySelector('#results');
const btnNextEl = document.querySelector('#btn-next');

const roundCounterEl = document.querySelector('#round-counter');
const roundsEl = document.querySelector('#rounds');
const roundEl = document.querySelector('#round')

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

// Pass a student id, return same id shuffled along with three other unique id's, as an array
const getOptions = id => {
	let options = [id]; 
	while (options.length < 4) {
		let anotherId = getRandomNumber(students.length);
		if (!options.includes(anotherId)) {
			options.push(anotherId);
		}
	}
	shuffleArray(options);
	return options;
}

// pass a student id, return name of student, as a string
const getName = id => students.find(student => student.id === id).name;

const showEl = el => el.classList.remove('hide');
const hideEl = el => el.classList.add('hide');

const rounds = 3;
let round = 0;
let score = 0;

roundsEl.innerText = rounds;
btnNextEl.innerText = "Next mate";

shuffleArray(students);

const playRound = student => {
	round++;
	btnNextEl.disabled = true;
	roundEl.innerText = round;

	const correctId = student.id;

	imgEl.setAttribute('src', student.image);

	const options = getOptions(correctId);

	optionsEl.innerHTML = '';
	options.forEach(id => {
		optionsEl.innerHTML += `<button class="option btn btn-warning" data-student-id="${id}">${getName(id)}</button>`;
	});

	optionsEl.addEventListener('click', e => {
		if (e.target.tagName === "BUTTON") {
			document.querySelectorAll('.option').forEach(option => {
				option.disabled = true;
			});

			const answer = Number(e.target.dataset.studentId);
			// console.log("Correct id:", correctId);
			// console.log("Registered answer:", answer);
			e.target.classList.remove('btn-warning');
			if (answer === correctId) {
				e.target.classList.add('btn-success');
				score++;
			} else {
				e.target.classList.add('btn-danger');
			}
			// console.log("Score:", score);

			btnNextEl.disabled = false;
		}
	}, { once: true });

	if (round === rounds) { // show different message in button if last round
		btnNextEl.innerText = 'See result';
	}
}

btnNextEl.addEventListener('click', () => {
	if (round !== rounds) {
		playRound(students[round]);
	} else {
		hideEl(roundCounterEl);
		hideEl(imgEl);
		optionsEl.innerText = '';
		showEl(resultsEl);
		resultsEl.innerHTML = `
			<div>Max score <span class="badge text-bg-primary">${rounds}</span></div>
			<div>Your score <span class="badge text-bg-${(score > rounds/2) ? 'success' : 'danger'}">${score}</span></div>
		`;
		btnNextEl.classList.add('hide');
	}
});

playRound(students[round]);