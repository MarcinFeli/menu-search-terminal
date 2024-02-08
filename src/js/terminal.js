const CUSTOM_COMMANDS = {
	hello: {
		msg: 'Hello :)',
	},
};

class Terminal {
	constructor() {
		this.history = [];
		this.currentIndex = -1;
		this.commands = {
			clear: () => this.clear(),
			help: () => this.help(),
			quote: () => this.fetchQuote(),
			double: (arg) => this.double(arg),
			...CUSTOM_COMMANDS,
		};
		this.input = document.getElementById('terminal-input');
		this.output = document.getElementById('terminal-output');
		this.input.addEventListener('keydown', this.handleInput.bind(this));
		this.input.focus();

		this.outputMessage('Last login: Tue, 30 Jan 2024 10:43:20 GMT');
	}

	handleInput(event) {
		if (event.key === 'Enter') {
			const command = this.input.value.trim();
			this.history.push(command);
			this.currentIndex = this.history.length;
			this.processCommand(command);
			this.input.value = '';
		} else if (event.key === 'ArrowUp') {
			this.navigateHistory('up');
		} else if (event.key === 'ArrowDown') {
			this.navigateHistory('down');
		}
	}

	navigateHistory(direction) {
		if (direction === 'up' && this.currentIndex > 0) {
			this.currentIndex--;
		} else if (
			direction === 'down' &&
			this.currentIndex < this.history.length - 1
		) {
			this.currentIndex++;
		}
		this.input.value = this.history[this.currentIndex] || '';
	}

	processCommand(command) {
		const [cmd, arg] = command.split(' ');
		const lowerCaseCmd = cmd.toLowerCase(); // Convert command to lowercase
		if (lowerCaseCmd in this.commands) {
			const commandFunction = this.commands[lowerCaseCmd];
			if (typeof commandFunction === 'function') {
				commandFunction(arg);
			} else {
				this.outputMessage(
					'Command not found. Type "help" for a list of available commands.'
				);
			}
		} else {
			this.outputCommandNotFound();
		}
	}

	clear() {
		this.output.innerHTML = '';
	}

	help() {
		const commandsList = Object.keys(this.commands).join(', ');
		this.outputMessage(`Available commands: ${commandsList}`);
	}

	fetchQuote() {
		fetch('https://api.quotable.io/random')
			.then((response) => response.json())
			.then((data) => this.outputMessage(data.content))
			.catch(() =>
				this.outputMessage('Failed to fetch quote. Please try again later.')
			);
	}

	double(arg) {
		const num = parseFloat(arg);
		if (!isNaN(num)) {
			this.outputMessage(`${num} * 2 = ${num * 2}`);
		} else {
			this.outputMessage('Invalid argument for double command.');
		}
	}

	outputMessage(message) {
		this.output.innerHTML += `<div>you: ${message}</div>`;
	}

	outputCommandNotFound() {
		this.outputMessage(
			'Command not found. Type "help" for a list of available commands.'
		);
	}
}

const terminal = new Terminal();
