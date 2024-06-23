// let choices = ["Rock", "Paper", "Scissors"];

// let userScore = 0;
// let computerScore = 0;

// function playRound() {
// 	let userChoice = () => {
// 		let getUserChoice = prompt(
// 			"Choose from: [1] Rock, [2] Paper or [3] Scissors"
// 		);
// 		if (getUserChoice === "1" || getUserChoice.toLowerCase() === "rock") {
// 			return (userChoice = 0);
// 		} else if (
// 			getUserChoice === "2" ||
// 			getUserChoice.toLowerCase() === "paper"
// 		) {
// 			return (userChoice = 1);
// 		} else if (
// 			getUserChoice === "3" ||
// 			getUserChoice.toLowerCase() === "scissor" ||
// 			getUserChoice.toLowerCase() === "scissors"
// 		) {
// 			return (userChoice = 2);
// 		} else {
// 			alert(
// 				`Invalid input, pick from the three choices.\nYou can type your answer or\nyou can enter 1, 2, 3 respectively`
// 			);
// 			userChoice();
// 		}
// 	};

// 	let computerChoice = () => {
// 		computerChoice = Math.floor(Math.random() * choices.length);
// 	};

// 	function msgScore() {
// 		console.log(`User score: ${userScore}\nComputer score: ${computerScore}`);
// 	}

// 	userChoice();
// 	computerChoice();

// 	if (userChoice == computerChoice) {
// 		console.log(`It's a tie!\nYou both chose ${choices[userChoice]}`);
// 	} else if (
// 		(userChoice == 2 && computerChoice == 0) ||
// 		(userChoice == 0 && computerChoice == 2)
// 	) {
// 		if (userChoice == 2) {
// 			console.log(
// 				`You lose this round.\nComputer Choice: ${choices[computerChoice]}\nYour choice: ${choices[userChoice]}`
// 			);
// 			computerScore++;
// 			msgScore();
// 		} else if (computerChoice == 2) {
// 			console.log(
// 				`You win this round!\nComputer Choice: ${choices[computerChoice]}\nYour choice: ${choices[userChoice]}`
// 			);
// 			userScore++;
// 			msgScore();
// 		}
// 	} else if (userChoice > computerChoice) {
// 		console.log(
// 			`You win this round!\nComputer Choice: ${choices[computerChoice]}\nYour choice: ${choices[userChoice]}`
// 		);
// 		userScore++;
// 		msgScore();
// 	} else {
// 		console.log(
// 			`You lose this round.\nComputer Choice: ${choices[computerChoice]}\nYour choice: ${choices[userChoice]}`
// 		);
// 		computerScore++;
// 		msgScore();
// 	}
// }

// function initialize() {
// 	let round = alert(`Let's play 5 rounds of Rock, Paper, Scissors!`);
// 	for (let i = 0; i < 5; i++) {
// 		playRound();
// 	}
// 	if (userScore > computerScore) {
// 		if (confirm("You WON!!!\nPlay again?")) {
// 			userScore = 0;
// 			computerScore = 0;
// 			initialize();
// 		} else {
// 			return;
// 		}
// 	} else if (userScore < computerScore) {
// 		if (confirm("You lost :(\nPlay again?")) {
// 			userScore = 0;
// 			computerScore = 0;
// 			initialize();
// 		} else {
// 			return;
// 		}
// 	} else {
// 		if (confirm("It's a tie, go again?")) {
// 			userScore = 0;
// 			computerScore = 0;
// 			initialize();
// 		} else {
// 			return;
// 		}
// 	}
// }

// initialize();

const playerChoiceDisplay = document.querySelector('#playerChoiceDisplay');
const cpuChoiceDisplay = document.querySelector('#cpuChoiceDisplay');
const playerScore = document.querySelector('#playerScore');
const cpuScore = document.querySelector('#cpuScore');
const cpuChoiceEmoji = document.querySelector('#cpuChoiceEmoji');
const result = document.querySelector('#thisRoundResult');
const dialog = document.querySelector('dialog');

document.addEventListener('click', (e) => {
	if (e.target.className === 'choice') {
		playRound(e.target.title);
	}
});
document.addEventListener('click', (e) => {
	if (e.target.id === 'no') {
		dialog.close();
	}
});
document.addEventListener('click', (e) => {
	if (e.target.id === 'yes') {
		playerScore.textContent = 0;
		cpuScore.textContent = 0;
		playerChoiceDisplay.textContent = 'First to five rounds wins!';
		cpuChoiceDisplay.textContent = 'Computers choice';
		result.style.removeProperty('background-color');
		result.textContent = 'Result';
		dialog.close();
	}
});

function getCpuChoice() {
	const choices = ['Rock', 'Paper', 'Scissors'];
	return choices[Math.floor(Math.random() * choices.length)];
}

function getCpuChoiceEmoji(choice) {
	return choice === 'Rock'
		? (cpuChoiceEmoji.textContent = '✊')
		: choice === 'Scissors'
		? (cpuChoiceEmoji.textContent = '✌️')
		: (cpuChoiceEmoji.textContent = '🫲');
}

function compareChoices(playerChoice, cpuChoice) {
	return playerChoice === cpuChoice
		? 'tie'
		: (playerChoice === 'Rock' && cpuChoice === 'Scissors') ||
		  (playerChoice === 'Paper' && cpuChoice === 'Rock') ||
		  (playerChoice === 'Scissors' && cpuChoice === 'Paper')
		? 'win'
		: 'loss';
}

function roundResult(round) {
	switch (round) {
		case 'tie':
			result.style.backgroundColor = 'blue';
			result.textContent = "It's a tie. 🤷";
			break;
		case 'win':
			result.style.backgroundColor = 'green';
			result.textContent = 'You win this round! 🥳';
			playerScore.textContent = +playerScore.textContent + 1;
			if (playerScore.textContent == 5) {
				finalResultModal();
			}
			break;
		case 'loss':
			result.style.backgroundColor = 'red';
			result.textContent = 'You lose this round. 😞';
			cpuScore.textContent = +cpuScore.textContent + 1;
			if (cpuScore.textContent == 5) {
				finalResultModal();
			}
			break;
	}
}

function playRound(playerChoice) {
	if (+playerScore.textContent == 5 || +cpuScore.textContent == 5) {
		dialog.showModal();
	} else {
		result.style.color = 'white';
		result.style.border = '1px solid transparent';
		let cpuChoice = getCpuChoice();
		let getResult = compareChoices(playerChoice, cpuChoice);
		cpuChoiceDisplay.textContent = `Computer chose: ${cpuChoice}`;
		playerChoiceDisplay.textContent = `You chose: ${playerChoice}`;
		getCpuChoiceEmoji(cpuChoice);
		roundResult(getResult);
	}
}

function finalResultModal() {
	const playAgain = `
		<h2>Play again?</h2>
		<div class="playAgain">
			<button id="yes">Yes</button><button id="no">No</button>
		</div>`;

	if (playerScore.textContent == 5) {
		dialog.style.border = '3px solid green';
		dialog.innerHTML = `
		<h1>Congratulations</h1>
		<h1>You Won!</h1>${playAgain}`;
		dialog.showModal();
	} else {
		dialog.style.border = '3px solid red';
		dialog.innerHTML = `
		<h1>It looks like...</h1>
		<h1>You lost.</h1>${playAgain}`;
		dialog.showModal();
	}
}
