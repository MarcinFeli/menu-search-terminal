document.addEventListener('DOMContentLoaded', function () {
	const submenuToggles = document.querySelectorAll('.submenu-toggle');

	function handleToggleEnter(toggle, iconClass, submenuDisplay) {
		const icon = toggle.querySelector(iconClass);
		const submenu = toggle.querySelector('.submenu');

		if (submenu) {
			submenu.style.display = submenuDisplay;
			if (icon) {
				icon.style.transition = '0.2s';
				icon.style.transform = 'rotate(180deg)';
			}
		}
	}

	function handleToggleLeave(toggle, iconClass) {
		const rect = toggle.getBoundingClientRect();
		const isInBounds =
			event.clientX >= rect.left &&
			event.clientX <= rect.right &&
			event.clientY >= rect.top &&
			event.clientY <= rect.bottom + 40;

		const icon = toggle.querySelector(iconClass);

		if (!isInBounds) {
			const submenu = toggle.querySelector('.submenu');
			if (submenu) submenu.style.display = 'none';
			if (icon) icon.style.transform = 'rotate(0deg)';
		}
	}

	submenuToggles.forEach(function (toggle) {
		toggle.addEventListener('mouseenter', function () {
			if (toggle.classList.contains('makeup')) {
				handleToggleEnter(toggle, '.make-icon', 'block');
			} else if (toggle.classList.contains('face')) {
				handleToggleEnter(toggle, '.face-icon', 'flex');
			}
		});

		toggle.addEventListener('mouseleave', function (event) {
			if (toggle.classList.contains('makeup')) {
				handleToggleLeave(toggle, '.make-icon');
			} else if (toggle.classList.contains('face')) {
				handleToggleLeave(toggle, '.face-icon');
			}
		});
	});
});
