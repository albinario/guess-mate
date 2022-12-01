const levelEl = document.querySelector('#level');
const progressEl = document.querySelector('.progress');
const progressBarEl = document.querySelector('.progress-bar');
const imgEl = document.querySelector('#img-mate');
const contentEl = document.querySelector('#content');
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

// Pass a student id, return same id shuffled along with three other unique id's, as an array
const getOptions = id => {
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

// pass a student id, return name of student, as a string
const getName = id => students.find(student => student.id === id).name;

const showEl = el => el.classList.remove('hide');
const hideEl = el => el.classList.add('hide');

const highScores = [{score: 5, dt: '23:45:32'}, {score: 1, dt: '12:00:54'}]; // two mock ghosts who played before

const levels = [2, 10, 15, 20, 25, 30, 35, students.length];
levels.forEach(level => {
	levelEl.innerHTML += `<button class="btn btn-sm btn-primary my-3">${level}</button>`;
})
levelEl.addEventListener('click', e => {
	if (e.target.tagName === "BUTTON") {
		levelEl.setAttribute('style', 'display: none;');
		showEl(progressEl);
		showEl(imgEl);
		playGame(Number(e.target.innerText));
	}
})

const playGame = level => {
	let round = 0;
	let score = 0;	
	const fails = [];

	btnNextEl.innerText = "Next mate";

	shuffleArray(students);

	const playRound = student => {
		progressBarEl.setAttribute('style', `width: ${(round / level) * 100}%`);
		round++;
		btnNextEl.disabled = true;

		const correctId = student.id;
		imgEl.setAttribute('src', student.image);
		
		optionsEl.innerHTML = '';
		getOptions(correctId).forEach(id => {
			optionsEl.innerHTML += `<button class="option btn btn-warning" data-student-id="${id}">${getName(id)}</button>`;
		});

		optionsEl.addEventListener('click', e => {
			if (e.target.tagName === "BUTTON") {
				document.querySelectorAll('.option').forEach(option => option.disabled = true);

				const answer = Number(e.target.dataset.studentId);
				e.target.classList.remove('btn-warning');
				if (answer === correctId) {
					e.target.classList.add('btn-success');
					score++;
				} else {
					e.target.classList.add('btn-danger');
					fails.push(student);
				}

				btnNextEl.disabled = false;
			}
		}, { once: true });

		if (round === level) { // show different message in btn-next if last round
			btnNextEl.innerText = "See result";
		}
	}

	btnNextEl.addEventListener('click', e => {
		if (btnNextEl.innerText === "Next mate") { // game is still on
			playRound(students[round]);
		} else if (btnNextEl.innerText === "See result") { // game is over
			progressBarEl.setAttribute('style', 'width: 100%');
			progressBarEl.classList.remove('progress-bar-animated');

			hideEl(imgEl);
			optionsEl.innerText = '';

			contentEl.innerHTML += `
				<div class="col-xs-12 col-sm-12 card card-body bg-dark mb-1">
					<div>Your score <span class="badge text-bg-${(score > level/2) ? 'success' : 'danger'}">${score}</span></div>
					<div class="small">Max score <span class="badge text-bg-primary">${level}</span></div>
					<div class="mt-3">💥 ⇩ Highscore ⇩ 💥
						<ol id="high-score"></ol>
					</div>
				</div>
				<div class="col-xs-12 col-sm-12 card card-body bg-dark">You need to have a 🍺 with:
					<div id="fails" class="row"></div>
				</div>
			`;
			btnNextEl.innerText = "Play again (coming soon...)";

			highScores.push({score: score, time: new Date().toLocaleTimeString()});
			if (highScores.length) {
				highScores.sort((a, b) => b.score - a.score);
				for (i = 0; i < 10; i++) { // only show top 10
					if (highScores[i]) {
						document.querySelector('#high-score').innerHTML += `<li class="ml-auto"><span class="badge text-bg-${(highScores[i].score > level/2) ? 'success' : 'danger'}">${highScores[i].score}</span> <span class="small">${highScores[i].time}</span></li>`;
					}
				}
			}

			if (fails.length) {
				console.log('yes');
				fails.forEach(fail => {
					document.querySelector('#fails').innerHTML += `
						<div class="col-6">
							<img src="${fail.image}" class="img-fluid rounded p-2 m-1" alt="${fail.name}">
							<p class="small">${fail.name}</p>
						</div>
					`;
				});
			} else {
				document.querySelector('#fails').innerHTML = '<p class="mt-3"><em>No one, seems you already had 🍻 with all.</em></p>'
			}
		} else if (btnNextEl.innerText === "Play again") { // TBD - game should restart
			// contentEl.innerHTML = '';
			// showEl(roundCounterEl);
			// showEl(imgEl);
			// playGame();
		} else { // fallback
			btnNextEl.innerText = "Apologies, requested action is not yet developed";
			btnNextEl.disabled = true;
		}
	});

	playRound(students[round]);
}