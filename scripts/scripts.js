// Scroll

const lenis = new Lenis({
  duration: 0.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

window.addEventListener("scroll", function () {
  var elemento = document.getElementById("navegacion");

  // Obtener 100vh en píxeles
  var vh = window.innerHeight;

  if (window.scrollY > vh) {
    // scroll mayor que 100vh
    elemento.classList.add("visible");
  } else {
    elemento.classList.remove("visible");
  }
});
//Menú
