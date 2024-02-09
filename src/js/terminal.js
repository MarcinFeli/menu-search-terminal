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
		};
		this.input = document.getElementById('terminal-input');
		this.output = document.getElementById('terminal-output');
		this.input.addEventListener('keydown', this.handleInput.bind(this));
		this.input.focus();

		this.outputMessage(`Last login: ${new Date().toUTCString()}`);
	}

	handleInput(event) {
		if (event.key === 'Enter' && this.input.value != '') {
			const command = this.input.value.trim();
			this.outputMessage(`you: ${command}`);
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
		const lowerCaseCmd = cmd.toLowerCase();
		if (lowerCaseCmd in this.commands) {
			const commandFunction = this.commands[lowerCaseCmd];
			if (typeof commandFunction === 'function') {
				commandFunction(arg);
			} else {
				return this.outputCommandNotFound()
			}
		} else if (lowerCaseCmd in CUSTOM_COMMANDS) {
			this.handleCustomCommand(lowerCaseCmd, arg);
		} else {
			this.outputCommandNotFound();
		}
	}

	clear() {
		this.output.innerHTML = '';
	}

	help() {
		const commandsList = Object.keys(this.commands).join(', ');
		const customCommands = Object.keys(CUSTOM_COMMANDS).join(', ');
		this.outputMessage(
			`Available commands: ${commandsList}, ${customCommands}`
		);
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

	handleCustomCommand(command, arg) {
		this.outputMessage(`terminal: ${CUSTOM_COMMANDS[command].msg}`);
	}

	outputMessage(message) {
		this.output.innerHTML += `<div>${message}</div>`;
	}

	outputCommandNotFound() {
		this.outputMessage(
			'terminal: Command not found. Type "help" for a list of available commands.'
		);
	}
}

const terminal = new Terminal();
