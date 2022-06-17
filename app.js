const tl = gsap.timeline({ defaults: { duration: 0.75, ease: "SlowMo" } })
tl.fromTo(".container", { scale: 0.2 }, { scale: 1 })
tl.fromTo(
    ".cookie", { opacity: 0, x: -50, }, { opacity: 1, x: 0, }
)
tl.fromTo(".text", { x: 100, opacity: 0 }, { x: 0, opacity: 1 }, "<50%"), "<"

tl.fromTo(
    ".cookie", { y: 0, rotation: "0deg" }, { y: -10, yoyo: true, repeat: -1, rotation: "-10deg" },
    "<"
)
tl.fromTo(
    "#parts", { y: 0, rotation: "-8deg" }, { y: -10, yoyo: true, repeat: -1, rotation: "-10deg" }
)

const button = document.querySelector("button")

button.addEventListener("click", () => {
    gsap.to(".container", {
        opacity: 0,
        x: -500,
        duration: 0.75,
        ease: "SlowMo",
    })
})