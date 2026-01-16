let array = [];
let max = 0;
let currentSeed = null;

init();


function applyCardTransforms() {
	let cardAmount = ($('.card').length) + 1;
	for (i = 1; i < cardAmount; i++) {
		var randomRot = -43 + Math.ceil(Math.random() * 3);
		var card = document.querySelector(`.card:nth-child(${i})`);
		/*if (card) {
			var transformValue = `rotateX(60deg) rotateY(0deg) rotateZ(${randomRot}deg) translateZ(${i * 2}px)`;
			card.style.transform = transformValue;
			card.style.webkitTransform = transformValue;
		}*/
	}
}

function bindCardEvents() {
	$('.card').off('click').on('click', function () {
		if ($(this).hasClass('down')) {
			$(this).removeClass('down');
			$(this).addClass('opened');
		}
		else if ($(this).hasClass('opened')) {
			$(this).addClass('is-removed');
		}
	});
}

// Botón de recarga
$('#reload-btn').click(function () {
	reloadCards();
});

// También recargar al presionar Enter en el input
$('#seed-input').keypress(function (e) {
	if (e.which === 13) {
		reloadCards();
	}
});

function reloadCards() {
	const seedValue = $('#seed-input').val().trim();
	currentSeed = seedValue || null;

	// Limpiar el deck
	$('.cards').empty();

	// Reiniciar el array
	array = [];

	max = (document.getElementById('check').checked) ? 56 : 59;
	var nombre = (document.getElementById('check').checked) ? 'a' : 'g';

	for (let index = 0; index < max; index++) {
		array.push(nombre + (index + 1));
	}

	// Hacer shuffle con o sin semilla
	if (currentSeed) {
		shuffleWithSeed(currentSeed);
	} else {
		shuffleWithSeed(generateRandomString(10));
	}

	// Crear las cartas
	createCards();

	// Aplicar transformaciones y eventos
	applyCardTransforms();
	bindCardEvents();
}

function init() {
	if (document.getElementById('check').checked) {
		max = 56;
		for (let index = 0; index < max; index++) {
			array.push('a' + (index + 1));
		}
	} else {
		max = 59;
		for (let index = 0; index < max; index++) {
			array.push('g' + (index + 1));
		}
	}
	createCards();
	applyCardTransforms();
	bindCardEvents();
}

function createCards() {
	var deck = document.getElementsByClassName('cards')[0];
	var div, divback, divfront, imgBack, imgFront;

	for (let index = 0; index < max; index++) {
		div = document.createElement("div");
		div.id = array[index];
		div.className = 'card down';

		// Back (la cara de la carta - se ve cuando está abierta)
		divback = document.createElement("div");
		divback.className = 'card-face back';
		imgBack = document.createElement("img");
		imgBack.src = 'cards/' + array[index] + '.png';
		imgBack.className = 'card-img';
		divback.appendChild(imgBack);
		div.appendChild(divback);

		// Front (el dorso - se ve cuando está boca abajo)
		divfront = document.createElement("div");
		divfront.className = 'card-face front';
		imgFront = document.createElement("img");
		imgFront.src = 'card-back.png';
		imgFront.className = 'card-img';
		divfront.appendChild(imgFront);
		div.appendChild(divfront);

		deck.appendChild(div);
	}
}

// Generador de números aleatorios con semilla
function seededRandom(seed) {
	if (typeof seed === 'string') {
		seed = [...seed].reduce((acc, char) => acc + char.charCodeAt(0), 0);
	}

	return function () {
		seed = (seed * 1103515245 + 12345) & 0x7fffffff;
		return seed / 0x7fffffff;
	};
}

// Shuffle con semilla
function shuffleWithSeed(seed) {
	const random = seededRandom(seed);

	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

function generateRandomString(length) {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let result = '';
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return result;
}