const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const rainWidthInput = document.getElementById('rainWidth');
const rainHeightInput = document.getElementById('rainHeight');
const rainVelocityInput = document.getElementById('rainVelocity');
const rainPerFrameInput = document.getElementById('rainPerFrame');
const trailEffectToggle = document.getElementById('trailEffect');
const resetButton = document.getElementById('reset');

let rainWidth = parseInt(rainWidthInput.value);
let rainHeight = parseInt(rainHeightInput.value);
let rainVelocity = parseInt(rainVelocityInput.value);
let rainPerFrame = parseInt(rainPerFrameInput.value);
let trailEffect = trailEffectToggle.checked;

resetButton.addEventListener('click', () => {
	rainWidth = 3;
	rainHeight = 30;
	rainVelocity = 15;
	rainPerFrame = 2;
	trailEffect = true;

	rainWidthInput.value = 3;
	rainHeightInput.value = 30;
	rainVelocityInput.value = 15;
	rainPerFrameInput.value = 2;
	trailEffectToggle.checked = true;
});

rainWidthInput.addEventListener('change', () => {
	rainWidth = parseInt(rainWidthInput.value);
});

rainHeightInput.addEventListener('change', () => {
	rainHeight = parseInt(rainHeightInput.value);
});

rainVelocityInput.addEventListener('change', () => {
	rainVelocity = parseInt(rainVelocityInput.value);
});

rainPerFrameInput.addEventListener('change', () => {
	rainPerFrame = parseInt(rainPerFrameInput.value);
});

trailEffectToggle.addEventListener('change', () => {
	trailEffect = trailEffectToggle.checked;
});

class Rain {
	constructor(x, y, width, height, color) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color;
		this.velocity = rainVelocity;
	}

	draw() {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}

	update() {
		this.velocity += 0.4;
		this.y += this.velocity;
	}
}

const rains = [];
let handle;

function animate() {
	if (trailEffect) {
		ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	} else {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}

	for (let i = 0; i < rainPerFrame; i++) {
		rains.push(
			new Rain(
				Math.floor(Math.random() * canvas.width),
				-rainHeight,
				rainWidth,
				rainHeight,
				`rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(
					Math.random() * 255
				)})`
			)
		);
	}

	for (let rain of rains) {
		rain.draw();
		rain.update();

		if (rain.y > canvas.height + 100) {
			rains.splice(rains.indexOf(rain), 1);
		}
	}

	handle = window.requestAnimationFrame(animate);
}

handle = window.requestAnimationFrame(animate);

window.addEventListener('resize', () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});
