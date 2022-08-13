const canvas = document.getElementById('canvas');
const app = new PIXI.Application({
	width: window.innerWidth,
	height: window.innerHeight,
	view: canvas
});

const rainWidthInput = document.getElementById('rainWidth');
const rainHeightInput = document.getElementById('rainHeight');
const rainVelocityInput = document.getElementById('rainVelocity');
const rainPerFrameInput = document.getElementById('rainPerFrame');
const tailEffectToggle = document.getElementById('tailEffect');
const resetButton = document.getElementById('reset');

let rainWidth = rainWidthInput.value;
let rainHeight = rainHeightInput.value;
let rainVelocity = rainVelocityInput.value;
let rainPerFrame = rainPerFrameInput.value;
let tailEffect = tailEffectToggle.checked;

resetButton.addEventListener('click', () => {
	rainWidth = 3;
	rainHeight = 30;
	rainVelocity = 25;
	rainPerFrame = 2;
	tailEffect = true;

	rainWidthInput.value = 3;
	rainHeightInput.value = 30;
	rainVelocityInput.value = 25;
	rainPerFrameInput.value = 2;
	tailEffectToggle.checked = true;
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

tailEffectToggle.addEventListener('change', () => {
	tailEffect = tailEffectToggle.checked;
});

const g = new PIXI.Graphics();
app.stage.addChild(g);

class Rain {
	constructor(x, y, width, height, color) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color;
		this.velocity = 0;
	}

	draw() {
		for (let i = 5; i > (tailEffect ? 0 : 4); i--) {
			g.beginFill(this.color, i / 5);
			g.drawRect(
				this.x,
				this.y + i * this.velocity,
				this.width,
				i === 5 ? this.height : this.height * (this.velocity / 15)
			);
			g.endFill();
		}
	}

	update() {
		this.velocity = rainVelocity * ((this.y + 250) / 600);
		this.y += this.velocity;
	}
}

const rains = [];

const animate = () => {
	g.clear();

	for (let i = 0; i < rainPerFrame; i++) {
		rains.push(
			new Rain(
				Math.floor(Math.random() * app.renderer.width),
				-200,
				rainWidth,
				rainHeight,
				Math.floor(Math.random() * 0xffffff)
			)
		);
	}

	for (let rain of rains) {
		rain.draw();
		rain.update();

		if (rain.y > app.renderer.height + 200) {
			rains.splice(rains.indexOf(rain), 1);
		}
	}
};

app.ticker.add(animate);

window.addEventListener('resize', () => app.renderer.resize(window.innerWidth, window.innerHeight));
