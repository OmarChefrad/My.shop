const tlLeave = gsap.timeline({
    defaults: { duration: 0.75, ease: "Power2.easeOut" },
})
const tlEnter = gsap.timeline({
    defaults: { duration: 0.75, ease: "Power2.easeOut" },
})
const tlA = gsap.timeline({
        defaults: { duration: 0.75, ease: "Power2.easeOut" },
    })
    //===============================
const leaveAnimation = (current, done) => {
    const product = current.querySelector(".image-container")
    const text = current.querySelector(".showcase-text")
    const circles = current.querySelectorAll(".circle")
    const arrow = current.querySelector(".showcase-arrow")

    return (
        tlLeave.fromTo(
            arrow, { opacity: 1, y: 0 }, {
                opacity: 0,
                y: 50,
            }
        ),
        tlLeave.fromTo(
            product, { y: 0, opacity: 1 }, { y: -100, opacity: 0, onComplete: done },
            "<"
        ),
        tlLeave.fromTo(
            text, { y: 0, opacity: 1 }, {
                y: 100,
                opacity: 0,
            },
            "<"
        ),
        tlLeave.fromTo(
            circles, { y: 0, opacity: 1 }, {
                y: -200,
                opacity: 0,
                stagger: 0.15,
                ease: "back.out(1.7);",
                duration: 1,
            },
            "<"
        )
    )
}

const EnterAnimation = (current, done, gradient) => {
    const product = current.querySelector(".image-container")
    const text = current.querySelector(".showcase-text")
    const circles = current.querySelectorAll(".circle")
    const arrow = current.querySelector(".showcase-arrow")

    return (
        tlEnter.fromTo(
            arrow, { opacity: 0, y: 50 }, {
                opacity: 1,
                y: 0,
            }
        ),
        tlEnter.fromTo(
            product, { y: -100, opacity: 0 }, { y: 0, opacity: 1, onComplete: done },
            "<"
        ),
        tlEnter.fromTo(
            text, { y: 100, opacity: 0 }, {
                y: 0,
                opacity: 1,
            },
            "<"
        ),
        tlEnter.fromTo(
            circles, { y: -200, opacity: 0 }, {
                y: 0,
                opacity: 1,
                stagger: 0.15,
                ease: "back.out(1.7);",
                duration: 1,
            },
            "<"
        ),
        tlEnter.to("body", { background: gradient }, "<")
    )
}

// Run animations
barba.init({
    preventRunning: true,
    transitions: [{
            name: "default-transition",
            once(data) {
                const done = this.async()
                let next = data.next.container
                let gradient = getGradient(data.next.namespace)
                gsap.set("body", { background: gradient })
                EnterAnimation(next, done, gradient)
            },
            leave(data) {
                const done = this.async()
                let current = data.current.container
                    //function
                leaveAnimation(current, done)
                    // create your stunning leave animation here
            },
            enter(data) {
                const done = this.async()
                let next = data.next.container
                let gradient = getGradient(data.next.namespace)
                EnterAnimation(next, done, gradient)
                    // create your amazing enter animation here
            },
        },
        //product page animation
        {
            name: "product-transition",
            sync: true,
            from: { namespace: ["handbag"] },
            to: {
                namespace: ["product"],
            },

            enter(data) {
                const done = this.async()
                let next = data.next.container
                    //function
                productEnterAnimation(next, done)
            },
            leave(data) {
                const done = this.async()
                let current = data.current.container
                productLeaveAnimation(current, done)
            },
        },
    ],
})

function productEnterAnimation(next, done) {
    tlA.fromTo(next, { opacity: 0, y: "100%" }, { opacity: 1, y: "0%" })
    tlA.fromTo(
        ".card", { opacity: 0, y: 50 }, {
            opacity: 1,
            y: 0,
            stagger: 0.3,
            onComplete: done,
        }
    )
}

function productLeaveAnimation(current, done) {
    tlA.fromTo(current, { opacity: 0.5 }, { opacity: 0, onComplete: done })
}

//changing gradient on showcase transition
function getGradient(name) {
    switch (name) {
        case "handbag":
            return "linear-gradient(260deg, #b75d62, #754d4f)"
        case "boot":
            return "linear-gradient(260deg, #5d8cb7, #4c4f70)"
        case "hat":
            return "linear-gradient(260deg, #b27a5c, #7f5450)"
    }
}