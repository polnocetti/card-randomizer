let array = [];

init();

let suits = ['Previa', 'Accion'];
let suitType;

randomize = () => {
	suitType = Math.floor(Math.random() * 2);
	let suitResult = suits[suitType];
	console.log(suitResult);
}

let cardAmount = ($('.card').length) + 1;

for (i = 1; i < cardAmount; i++) {
	var randomRot = -43 + Math.ceil(Math.random() * 3);
	var card = document.querySelector(`.card:nth-child(${i})`);
	card.style.transform = `rotateX(60deg) rotateY(0deg) rotateZ(${randomRot}deg) translateZ(${i * 2}px)`;
	card.style.webkitTransform = `rotateX(60deg) rotateY(0deg) rotateZ(${randomRot}deg) translateZ(${i * 2}px)`;
}

$('.card').click(function () {
	if ($(this).hasClass('down')) {
		$(this).removeClass('down');
		$(this).addClass('opened');
	}
	else if ($(this).hasClass('opened')) {
		$(this).addClass('is-removed');
	}
	randomize();
});

function init() {
	var deck = document.getElementsByClassName('cards')[0];

	for (let index = 0; index < 59; index++) {
		array.push('g' + (index + 1));
	}
	shuffle();

	var div, divback, divfront;
	for (let index = 0; index < 59; index++) {
		div = document.createElement("div");
		div.id = array[index];
		div.className = 'card down ';

		divback = document.createElement("div");
		divback.className = 'card-face back';
		divback.style = 'background:url("cards/g' + (index + 1) + '.png");background-size: cover;';
		div.appendChild(divback);

		divfront = document.createElement("div");
		divfront.className = 'card-face front';
		divfront.style = 'background:url("card-back.png");background-size: cover;';
		div.appendChild(divfront);

		deck.appendChild(div);
	}
}

function shuffle() {
	//   set the index to the arrays length
	let i = array.length, j, temp;
	//   create a loop that subtracts everytime it iterates through
	while (--i > 0) {
		//  create a random number and store it in a variable
		j = Math.floor(Math.random() * (i + 1));
		// create a temporary position from the item of the random number    
		temp = array[j];
		// swap the temp with the position of the last item in the array    
		array[j] = array[i];
		// swap the last item with the position of the random number 
		array[i] = temp;
	}
	// return[execute] the array when it completes::don't really need the console.log but helps to check
	console.log(array);
}