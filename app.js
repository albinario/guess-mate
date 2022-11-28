const studentsPlay = [...students];

const imgEl = document.querySelector('#img-mate');
const optionsEl = document.querySelector('#options');
const btnNextEl = document.querySelector('#btn-next');

const roundsEl = document.querySelector('#rounds');

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
	// let correctIds = [];

	roundsEl.innerText = rounds;

	shuffleArray(studentsPlay);

	const playRound = student => {
		round++;
		btnNextEl.disabled = true;
		const correctId = student.id;
		const correctName = student.name;

		imgEl.setAttribute('src', student.image);

		const options = getOptions(correctId);
		console.log(round, rounds);

		if (round === rounds) { // last round: show different message in button
			btnNextEl.innerText = 'See result';
		}

		document.querySelector('#round').innerText = round;

		optionsEl.innerHTML = '';

		options.forEach(id => {
			optionsEl.innerHTML += `<button class="option btn btn-warning" data-student-id="${id}">${getName(id)}</button>`;
		});

		optionsEl.addEventListener('click', e => {
			// console.log(correctIds);
			// if (!correctIds.includes(correctId)) {
				document.querySelectorAll('.option').forEach(option => {
					option.disabled = true;
				});
				// const answer = Number(e.target.dataset.studentId);
				const answer = e.target.innerText;
				console.log("Correct id:", correctId);
				console.log("Correct name:", correctName);
				console.log("Registered answer:", answer);

				e.target.classList.remove('btn-warning');
				if (answer === correctName) {
					console.log('correct');
					e.target.classList.add('btn-success');
					score++;
				} else {
					console.log('incorrect');
					e.target.classList.add('btn-danger');
				}
				// correctIds.push(correctId);
				btnNextEl.disabled = false;
			// }
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
			});
		}
	});

	playRound(studentsPlay[round]);

}

playGuessMate();