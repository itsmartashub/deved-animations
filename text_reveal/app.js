const tl = gsap.timeline({ defaults: { duration: 0.75, ease: 'power3.out' } })

tl.fromTo(
	'.hero-img',
	{ scale: 1.3, borderRadius: '0rem' },
	{ scale: 1, borderRadius: '2rem', delay: 0.35, duration: 2.5, ease: 'elastic.out(1.5,1)' }
)

tl.fromTo('.cta1', { x: '100%', opacity: 0.5 }, { x: 0, opacity: 1 }, '<20%') // "<20%" kada prethodna animacija bude na 20%, ova animacija cta1 ce krenuti
tl.fromTo('.cta3', { x: '-100%', opacity: 0.5 }, { x: 0, opacity: 1 }, '<20%')
tl.fromTo('.cta2', { y: '100%', opacity: 0.5 }, { y: 0, opacity: 1 }, '<20%')
tl.fromTo('.cta4', { x: '100%', opacity: 0.5 }, { x: 0, opacity: 1 }, '<20%')
tl.fromTo('.cta6', { x: '-100%', opacity: 0.5 }, { x: 0, opacity: 1 }, '<20%')
tl.fromTo('.cta5', { y: '100%', opacity: 0.5 }, { y: 0, opacity: 1 }, '<20%')
tl.fromTo('.cta-btn', { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, '<') // '<' znaci da ce se pretposlednja i ova animacija zavrsiti istovremeno, tj sinhronizovane su

// Split text alternative
const logo = document.querySelector('.logo')
const logoLetters = logo.textContent.split('')

logo.textContent = ''

logoLetters.forEach((letter) => {
	logo.innerHTML += `<span class="letter">${letter}</span>`
})

gsap.set('.letter', { display: 'inline-block' }) // ovo moramo jer span-u po defaultu ne mozemo da animiramo height, da se pokrece gore dole.
gsap.fromTo('.letter', { y: '100%' }, { y: '0%', delay: 2, stagger: 0.05, ease: 'back.out(3)' })

// splitText('.logo')
// function splitText(selector) {
// 	let textEl = document.querySelector(selector)
// 	let lettersArray = textEl.textContent.split('')

// 	textEl.innerHTML = ''

// 	lettersArray.forEach((letter) => {
// 		textEl.innerHTML += `<span class="letter">${letter}</span>`
// 	})
// }
