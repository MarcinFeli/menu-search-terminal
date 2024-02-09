const inputBox = document.getElementById('input-box');
const spinner = document.getElementById('spinner');
const result = document.getElementById('result');
const productList = document.getElementById('product-list');
const row = document.getElementById('row')

let typingTimer;

inputBox.addEventListener('input', function () {
	clearTimeout(typingTimer);
    row.classList.add('with-before')
	typingTimer = setTimeout(() => {
		const searchTerm = inputBox.value.trim();
		productList.innerHTML = '';

		if (searchTerm === '') {
            row.classList.remove('with-before')
			spinner.classList.remove('active');
			result.classList.remove('active');
			return;
		} else {
			spinner.classList.add('active');
			fetch(
				`https://dummyjson.com/products/search?q=${searchTerm}&limit=5`
			)
				.then((res) => res.json())
				.then((data) => {
					spinner.classList.remove('active');
					if (data && data.products.length > 0) {
						data.products.forEach((product) => {
							const li = document.createElement('li');
							li.innerHTML = `
                            <span>${product.title}</span>
                            <span style="font-weight: 500">$${product.price}</span>
                            `;
							li.style.display = 'flex';
							li.style.justifyContent = 'space-between';
							result.classList.add('active');
							productList.appendChild(li);
						});
					} else {
						result.classList.add('active');
						const li = document.createElement('li');
						li.textContent = 'Brak wyników';
						productList.appendChild(li);
					}
				})
				.catch((error) => {
					console.error('Wystąpił błąd podczas pobierania danych:', error);
					spinner.classList.remove('active');
					const li = document.createElement('li');
					li.textContent = 'Wystąpił błąd podczas pobierania danych.';
					productList.appendChild(li);
				});
		}
	}, 500);
});
