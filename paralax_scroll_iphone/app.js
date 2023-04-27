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
