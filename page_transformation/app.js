const tLeave = gsap.timeline({
	defaults: { duration: 0.75, ease: 'Power2.easeOut' },
})
const tEnter = gsap.timeline({
	defaults: { duration: 0.75, ease: 'Power2.easeOut' },
})

//make the fns for the leave and enter animations
const leaveAnimation = (current, done) => {
	const product = current.querySelector('.image-container')
	const text = current.querySelector('.showcase-text')
	const circles = current.querySelectorAll('.circle')
	const arrow = current.querySelector('.showcase-arrow')

	return (
		tLeave.fromTo(arrow, { opacity: 1, y: 0 }, { opacity: 0, y: 50 }),
		tLeave.fromTo(product, { opacity: 1, y: 0 }, { opacity: 0, y: 100 }, '<'),
		tLeave.fromTo(text, { opacity: 1, y: 0 }, { opacity: 0, y: 100, onComplete: done }, '<'),
		tLeave.fromTo(
			circles,
			{ opacity: 1, y: 0 },
			{ opacity: 0, y: -200, stagger: 0.15, ease: 'back.out(1.7)', duration: 1 },
			'<'
		)
	)
}
const enterAnimation = (current, done) => {
	const product = current.querySelector('.image-container')
	const text = current.querySelector('.showcase-text')
	const circles = current.querySelectorAll('.circle')
	const arrow = current.querySelector('.showcase-arrow')

	return (
		tLeave.fromTo(arrow, { opacity: 0, y: 50 }, { opacity: 1, y: 0 }),
		tLeave.fromTo(product, { opacity: 0, y: -100 }, { opacity: 1, y: 0 }, '<'),
		tLeave.fromTo(text, { opacity: 0, y: 100 }, { opacity: 1, y: 0, onComplete: done }, '<'),
		tLeave.fromTo(
			circles,
			{ opacity: 0, y: -200 },
			{ opacity: 1, y: 0, stagger: 0.15, ease: 'back.out(1.7)', duration: 1 },
			'<'
		)
	)
}

// Run anumations
barba.init({
	/* 
    drugi bag. Kada brze (tj pre kraja animacije) kliknemo na arrow ikonicu kojom idemo na sledecu stranicu, animacije ne budu onakve kakve smo napravili vec samo blink, ko da ih i nema. Da bismo to preventovali, moramo staviti ovde preventRunning: true */
	preventRunning: true,
	transitions: [
		// showcase transitions
		{
			name: 'default',

			leave(data) {
				console.log(data)
				/* 
                {current: {…}, next: {…}, trigger: a}
                    ▶️ current: {container: section.showcase, html: '<html lang="en"><head>\n\t\t<meta charset="UTF-8">\n\t\t…\n\t\t\x3Cscript src="./app.js">\x3C/script></body></html>', namespace: 'handbag', url: {…}}

                    ▶️ next: {container: section.showcase, html: `<!DOCTYPE html>\r\n<html lang="en">\r\n\t<head>\r\n\t\t<met…ading.');\n\t}\n\t// ]]>\n\x3C/script>\n</body>\r\n</html>\r\n`, namespace: 'boot', url: {…}}

                    ▶️ trigger: a
                    
                    ▶️ [[Prototype]]: Object
                */

				const done = this.async()
				let current = data.current.container

				leaveAnimation(current, done)

				// gsap.fromTo(current, { opacity: 1 }, { opacity: 0, duration: 1, onComplete: done }) // vidi se, pa nestane 1 --> 0

				/* 
                    ovo sad nema pojma koliki je duration iako rekosmo, nema pojma da je neka animacija u toku, vec on malte ne istovremene okine leave i enter animaciju. Zato moramo da mu kazemo: hej, ne okidaj enter() dok se leave() ne zavrsi. A to cemo uraditi pomocu async.
                    Dodajemo promenljivu done koja ce biti this.async(). Potom treba da invokujemo done NAKON sto se animacija zavrsi. A kako znamo da se animacija zavrsila? Kako to radimo? Tako sto cemo koristiti gsap fn onComplete  (onComplete: done).
                    Btw, u onComplete mozemo bilo sta da stavimo. Mozda zelimo da dodamo neku novu gsap animaciju kad se zavrsi ova animacija, ili neki specifican kod, samo dodamo arrow fn:  onComplete: () => {}
                */
			},
			enter(data) {
				const done = this.async()
				let next = data.next.container
				enterAnimation(next, done)
				// gsap.fromTo(next, { opacity: 0 }, { opacity: 1, duration: 1, onComplete: done }) // ne vidi se, pa se pojavi 0 --> 1
			},
		},
	],
})
