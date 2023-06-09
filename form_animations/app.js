const containers = document.querySelectorAll('.input-container')
const form = document.querySelector('form')

const tl = gsap.timeline({ defaults: { duration: 1 } })

// Line
/* 
Napravio je svg path u figmi, jedan straight, a drugi kao zakrivljen na dole, i exportovao oba. A ustv se ta dva u kodu razlikuje ono sto ide u d="...." <svg> atribut 

pravi (start):
    'M0 0.999512C0 0.999512 60.5 0.999512 150 0.999512C239.5 0.999512 300 0.999512 300 0.999512'

zakrivljeni (end): 
    'M1 0.999512C1 0.999512 61.5 7.5 151 7.5C240.5 7.5 301 0.999512 301 0.999512'
*/
const start = 'M0 0.999512C0 0.999512 60.5 0.999512 150 0.999512C239.5 0.999512 300 0.999512 300 0.999512'
const end = 'M1 0.999512C1 0.999512 61.5 7.5 151 7.5C240.5 7.5 301 0.999512 301 0.999512'

// Elastic Effect
// lupujemo kroz svaki .input-container i cekiramo da li je input fokusiran, ako je fokusiran, odradi bounce effect
containers.forEach((container) => {
	const input = container.querySelector('input')
	const line = container.querySelector('.elastic-line')
	const placeholder = container.querySelector('.placeholder')

	input.addEventListener('focus', () => {
		// cekiramo da li input vec ima neku vrednost. Ako ima, ne zelimo da ga animiramo sa bounce, vec samo ako je input empty
		if (!input.value) {
			tl.fromTo(line, { attr: { d: start } }, { attr: { d: end }, ease: 'power2.out', duration: 0.65 })

			tl.to(line, { attr: { d: start }, ease: 'elastic.out(3, 0.5)' }, '<50%') // run this anim kada prethodna bude na pola

			// Placeholder Shift
			tl.to(placeholder, { top: -15, left: 0, scale: 0.7, duration: 0.5, ease: 'power2.out' }, '<5%')
		}
	})
})

// Revert back if it is not focused
form.addEventListener('click', () => {
	containers.forEach((container) => {
		const input = container.querySelector('input')
		const line = container.querySelector('.elastic-line')
		const placeholder = container.querySelector('.placeholder')

		// ako imamo input selektovan, sve je ok, ali ako nemam, tj ako input nije selektovan, onda revertujemo nazad???
		if (document.activeElement !== input) {
			// takodje zelimo da proverimo da li u input postoji value, ako je empty, onda revert back, ako nije onda nemoj
			if (!input.value) {
				gsap.to(placeholder, { top: 0, left: 0, scale: 1, duration: 0.5, ease: 'power2.out' })
			}
		}

		// FORM VALIRATION
		input.addEventListener('input', (e) => {
			// Name validation
			if (e.target.type === 'text') {
				let inputText = e.target.value.trim()

				if (inputText.length > 2) {
					colorize('#6391e8', line, placeholder)
				} else {
					colorize('#FE8C99', line, placeholder)
				}
			}

			// Email validation
			if (e.target.type === 'email') {
				let isEmailValid = validateEmail(e.target.value.trim())

				if (isEmailValid) {
					colorize('#6391e8', line, placeholder)
				} else {
					colorize('#FE8C99', line, placeholder)
				}
			}

			// Phone validation
			if (e.target.type === 'tel') {
				let isPhoneValid = validatePhone(e.target.value.trim())

				if (isPhoneValid) {
					colorize('#6391e8', line, placeholder)
				} else {
					colorize('#FE8C99', line, placeholder)
				}
			}
		})
	})
})

function validateEmail(email) {
	let re = /\S+@\S+\.\S+/
	return re.test(email)
}
function validatePhone(phone) {
	let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
	return re.test(phone)
}

// COLORIZE FN
function colorize(color, line, placeholder) {
	gsap.to(line, { stroke: color, duration: 0.75 })
	gsap.to(placeholder, { color: color, duration: 0.75 })
}

// Checkbox animation fill
const checkbox = document.querySelector('.checkbox')
const tl2 = gsap.timeline({ defaults: { duration: 0.4, ease: 'power2.out' } })
const tickMarkPath = document.querySelector('.tick-mark path')
const pathLength = tickMarkPath.getTotalLength()
console.log({ pathLength })

gsap.set(tickMarkPath, { strokeDashoffset: pathLength, strokeDasharray: pathLength })

checkbox.addEventListener('click', () => {
	if (checkbox.checked) {
		tl2.to('.checkbox-fill', { top: '0%' }) // plavi square se pojavljuje od dole, kao da se filluje
		tl2.fromTo(tickMarkPath, { strokeDashoffset: pathLength }, { strokeDashoffset: 0 }, '<50%')
		tl2.to('.checkbox-label', { color: '#6391e8' }, '<')
	} else {
		tl2.fromTo(tickMarkPath, { strokeDashoffset: 0 }, { strokeDashoffset: pathLength })
		tl2.to('.checkbox-fill', { top: '100%' }, '<50%')
		tl2.to('.checkbox-label', { color: '#c5c5c5' }, '<')
	}
})

// ANIMATING CHARACTER
gsap.set('#eye', { transformOrigin: 'center' })
gsap.fromTo('#eye', { scaleY: 1 }, { scaleY: 0.3, repeat: -1, yoyo: true, repeatDelay: 0.5, ease: 'power2.out' })
gsap.fromTo('#eyebrow', { y: 0 }, { y: -1, repeat: -1, yoyo: true, repeatDelay: 0.5, ease: 'power2.out' })

// SUBMIT BUTTON
const button = document.querySelector('button')
const tl3 = gsap.timeline({ defaults: { duration: 0.75, ease: 'power2.out' } })

button.addEventListener('click', (e) => {
	e.preventDefault()
	tl3.to('.contact-right, .contact-left', { y: 30, opacity: 0, pointerEvents: 'none' })
	tl3.to('form', { scale: 0.8 }, '<')
	tl3.fromTo('.submitted', { opacity: 0, y: 30 }, { opacity: 1, y: 0 })

	// Hand wave
	gsap.set('#hand', { transformOrigin: 'left' })
	gsap.fromTo(
		'#hand',
		{ rotation: 0, y: 0 },
		{ rotation: -10, y: 1, ease: 'elastic.out(3, 0.3)', duration: 2, delay: 1 }
	)
})
