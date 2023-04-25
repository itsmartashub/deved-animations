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
	})
})
