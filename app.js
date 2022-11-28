const studentsPlay = [...students];

const imgEl = document.querySelector('#img-mate');
const optionsEl = document.querySelector('#options');
const btnNextEl = document.querySelector('#btn-next');

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

// Pass an id, return id along with three OTHER id's, as an array
const getOptions = id => {
	let options = [id]; 
	while (options.length < 4) {
		let anotherId = getRandomNumber(studentsPlay.length);
		if (!options.includes(anotherId)) {
			options.push(anotherId);
		}
	}
	shuffleArray(options);
	return options;
}

// pass an id, return name of student, as a string
const getName = id => {
	return studentsPlay.find(student => student.id === id).name;
}

const playGuessMate = () => {
	const rounds = 3;
	let round = 0;
	let score = 0;

	roundsEl.innerText = rounds;

	shuffleArray(studentsPlay);

	const playRound = student => {
		round++;
		btnNextEl.disabled = true;
		roundEl.innerText = round;

		const correctId = student.id;
		const correctName = student.name;

		imgEl.setAttribute('src', student.image);

		const options = getOptions(correctId);

		if (round === rounds) { // show different message in button if last round
			btnNextEl.innerText = 'See result';
		}

		optionsEl.innerHTML = '';
		options.forEach(id => {
			optionsEl.innerHTML += `<button class="option btn btn-warning" data-student-id="${id}">${getName(id)}</button>`;
		});

		optionsEl.addEventListener('click', e => {
			document.querySelectorAll('.option').forEach(option => {
				option.disabled = true;
			});

			const answer = Number(e.target.dataset.studentId);
			console.log("Correct id:", correctId);
			console.log("Registered answer:", answer);

			e.target.classList.remove('btn-warning');
			if (answer === correctId) {
				e.target.classList.add('btn-success');
				score++;
				console.log("New score:", score);
			} else {
				e.target.classList.add('btn-danger');
			}
			btnNextEl.disabled = false;
		}, {once: true });
	}

	btnNextEl.addEventListener('click', () => {
		if (round !== rounds) {
			playRound(studentsPlay[round]);
		} else {
			optionsEl.innerHTML = `<span>${score}</span>`;
			btnNextEl.innerText = 'Play again';
			btnNextEl.addEventListener('click', () => {
				playGuessMate();
			}, { once: true });
		}
	});

	playRound(studentsPlay[round]);

}

playGuessMate();