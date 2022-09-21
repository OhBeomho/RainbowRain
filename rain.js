const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const rainWidthInput = document.getElementById('rainWidth')
const rainHeightInput = document.getElementById('rainHeight')
const rainVelocityInput = document.getElementById('rainVelocity')
const rainPerFrameInput = document.getElementById('rainPerFrame')
const trailEffectToggle = document.getElementById('trailEffect')
const mouseEffectToggle = document.getElementById('mouseEffect')
const resetButton = document.getElementById('reset')

let rainWidth = parseInt(rainWidthInput.value)
let rainHeight = parseInt(rainHeightInput.value)
let rainVelocity = parseInt(rainVelocityInput.value)
let rainPerFrame = parseInt(rainPerFrameInput.value)
let trailEffect = trailEffectToggle.checked
let mouseEffect = mouseEffectToggle.checked

let mouseX = 0,
	mouseY = 0
const mouseEffectSize = 200

resetButton.addEventListener('click', () => {
	rainWidth = 3
	rainHeight = 30
	rainVelocity = 15
	rainPerFrame = 2
	trailEffect = true
	mouseEffect = false

	rainWidthInput.value = 3
	rainHeightInput.value = 30
	rainVelocityInput.value = 15
	rainPerFrameInput.value = 2
	trailEffectToggle.checked = true
	mouseEffectToggle.checked = false
})

rainWidthInput.addEventListener('change', () => {
	rainWidth = parseInt(rainWidthInput.value)
})

rainHeightInput.addEventListener('change', () => {
	rainHeight = parseInt(rainHeightInput.value)
})

rainVelocityInput.addEventListener('change', () => {
	rainVelocity = parseInt(rainVelocityInput.value)
})

rainPerFrameInput.addEventListener('change', () => {
	rainPerFrame = parseInt(rainPerFrameInput.value)
})

trailEffectToggle.addEventListener('change', () => {
	trailEffect = trailEffectToggle.checked
})

mouseEffectToggle.addEventListener('change', () => {
	mouseEffect = mouseEffectToggle.checked
})

window.addEventListener('mousemove', (e) => {
	mouseX = e.clientX
	mouseY = e.clientY
})

class Rain {
	constructor(x, y, width, height, color) {
		this.x = x
		this.y = y
		this.width = width
		this.height = height
		this.color = color
		this.velocity = rainVelocity
	}

	draw() {
		ctx.fillStyle = this.color
		ctx.fillRect(this.x, this.y, this.width, this.height)
	}

	update() {
		this.velocity += 0.2
		this.y += this.velocity

		if (mouseEffect) {
			const realX = mouseX - mouseEffectSize / 2,
				realY = mouseY - mouseEffectSize / 2

			if (
				this.x + this.width > realX &&
				realX + mouseEffectSize > this.x &&
				this.y + this.height > realY &&
				realY + mouseEffectSize > this.y
			) {
				this.velocity -= 5

				if (this.x < mouseX) this.x -= 6
				else this.x += 6
			}
		}
	}
}

const rains = []

function animate() {
	if (trailEffect) {
		ctx.fillStyle = 'rgba(0, 0, 0, 0.4)'
		ctx.fillRect(0, 0, canvas.width, canvas.height)
	} else {
		ctx.clearRect(0, 0, canvas.width, canvas.height)
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
		)
	}

	for (let rain of rains) {
		rain.draw()
		rain.update()

		if (rain.y > canvas.height + 100) {
			rains.splice(rains.indexOf(rain), 1)
		}
	}

	if (mouseEffect) {
		const realX = mouseX - mouseEffectSize / 2,
			realY = mouseY - mouseEffectSize / 2

		ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
		ctx.fillRect(realX, realY, mouseEffectSize, mouseEffectSize)
	}

	requestAnimationFrame(animate)
}

animate()

window.addEventListener('resize', () => {
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight
})
