// PRIMER SAMO
// const tlIntro = gsap.timeline({
// 	scrollTrigger: {
// 		/*
//         kada zelimo da aktiviramo ovaj scrollTrigger. Cim krenemo da skrolujemo, zelimo da trigerujemo ovu animaciju.

//         Potom dodajemo starting position i ending position, tj koliko dugo zelimo da ova animacija traje:
//         start: '0%' - znaci da krecemo da animiramo na pocetku nase .first-page
//         end: '50%' - zavrsicemo animaciju na pola .first-page stranice, tj kad skrolujemo na 50% prvog section-a tj. .first-pagea.

// 		kada imamo duration na animaciji (tipa duration: 1 na ovoj tlIntro.fromTo), onda nam ovo end: '100%' nista ne znaci. Zato cemo obrisati taj duration, i staviti ovde scrub, a scrub ce da mejkuje animaciju da traje sve do end, tj sve dok ne skrolujemo do '100%' tj kraja prvog sectiona .first-page, dakle postepeno kako skrolujemo tako nestaje nav, i kako se vracamo nazad, tako se i nav pojavljuje

// 		*/
// 		trigger: '.first-page',
// 		start: '0%',
// 		end: '25%',
// 		markers: true,
// 		scrub: true, //
// 		// start: '0%',
// 		// end: '50%',
// 	},
// })

// tlIntro.fromTo('nav', { opacity: 1 }, { opacity: 0 })

// PIN THE FIRST PAGE
/* Cim krenemo da skolamo na .first-page, sajt se skroluje, ali .first-page ostaje pinovan, tj kao da je fixiran, to postizmeo sa pin: true

Elem, mi sad zelimo i da neki drugi sadrzaj tj section ide preko njega, to postizem sa pinSpacing: false */
const tlIntro = gsap.timeline({
	scrollTrigger: {
		trigger: '.first-page',
		start: '0%',
		end: '100%',
		pin: true,
		pinSpacing: false,
	},
})

// HIGHLIGHT
const tlH = gsap.timeline({
	scrollTrigger: {
		trigger: '.second-page',
		start: '-40%',
		end: '40%',
		scrub: true,
		markers: { startColor: 'blue', endColor: 'blue' },
	},
})
tlH.fromTo('.highlight', { color: 'rgba(255,255,255, 0.4)' }, { color: 'rgba(255,255,255, 1)', stagger: 1 })

// da ne bude highlight
const tlHRemove = gsap.timeline({
	scrollTrigger: {
		trigger: '.second-page',
		start: '-20%', // dodali 20% u odnosu na gore
		end: '60%', // dodali 20% u odnosu na gore
		scrub: true,
		markers: { startColor: 'pink', endColor: 'pink' },
	},
})
tlHRemove.to('.highlight', { color: 'rgba(255,255,255, 0.4)', stagger: 1 })

// PAGE #3
const tlSplit = gsap.timeline({
	scrollTrigger: {
		trigger: '.third-page',
		start: '-25%',
		end: '30%',
		scrub: 1,
	},
})
tlSplit.fromTo('.large-phone', { x: '40%' }, { x: '20%' }) // ovo from x je 40% kao i u css-u default
tlSplit.fromTo('.small-phone', { x: '-40%' }, { x: '-20%' }, '<') // ovo from x je -40% kao i u css-u default. Ovo '<' je da krenu istovremeno
tlSplit.fromTo('.product-text-left', { x: 50, opacity: 0 }, { x: 0, opacity: 1 }, '<')
tlSplit.fromTo('.product-text-right', { x: -50, opacity: 0 }, { x: 0, opacity: 1 }, '<')

const tlSplitPin = gsap.timeline({
	scrollTrigger: {
		trigger: '.third-page',
		pin: true,
		pinSpacing: false,
		start: '0%',
		end: '100%',
	},
})

// CAROUSEL
const swatches = document.querySelectorAll('.swatches img')
const gallery = document.querySelector('.phone-gallery')
const slides = document.querySelectorAll('.phone-gallery-container')

let currentSwatch = 'blue'
let topIndex = 2

swatches.forEach((swatch, index) => {
	const coord = slides[index].getBoundingClientRect().left
	console.log(slides[index], coord)

	swatch.addEventListener('click', () => {
		let swatchName = swatch.getAttribute('swatch')
		let closeUp = document.querySelector(`.${swatchName}`)
		console.log({ swatchName, closeUp })

		// Check if we are on the same swatch
		if (currentSwatch === swatchName) return // ako kliknemo na isti swatch, da ne trigeruje ovu dole animaciju

		gsap.set(closeUp, { zIndex: topIndex }) // na swatch koji kliknemo da slika te boje ima najveci index
		gsap.fromTo(closeUp, { opacity: 0 }, { opacity: 1, duration: 1 })

		// Gallery
		gsap.to(gallery, { x: -coord, duration: 1, ease: 'back.out(1)' })

		// Increment zIndex
		topIndex++
		currentSwatch = swatchName
	})
})

// #5 PAGE - VIDEO ON SCROLL
const tlVideo = gsap.timeline({
	scrollTrigger: {
		trigger: '.fifth-page',
		start: '0%',
		end: '150%',
		scrub: true,
		pin: true,
	},
})
tlVideo.fromTo('.product-video', { currentTime: 0 }, { currentTime: 3, duration: 1 }) // 3 je jer video traje 3 sekunde
tlVideo.fromTo('.product-info-container h3', { opacity: 0 }, { opacity: 1, stagger: 0.25, duration: 0.5 }, '<')

// #6 PAGE
const tlParallax = gsap.timeline({
	scrollTrigger: {
		trigger: '.sixth-page',
		start: '-25%',
		end: '50%',
		scrub: true,
	},
})
tlParallax.fromTo('.photo-description', { y: 0 }, { y: -80 })
tlParallax.fromTo('.portrait-container', { y: 0 }, { y: -80 }, '<')
tlParallax.fromTo('.phone-video', { y: 0 }, { y: -400 }, '<')
