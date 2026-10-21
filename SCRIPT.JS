// ===== 1. Las secciones aparecen suavemente al hacer scroll =====
const elementos = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visible");
        observador.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.15 });

  elementos.forEach((el) => observador.observe(el));
} else {
  // Navegadores muy antiguos: mostrar todo directamente
  elementos.forEach((el) => el.classList.add("visible"));
}

// ===== 2. Botón "Abrir mi detalle": bajada suave =====
// Funciona también en iPhone/Safari antiguos, donde el scroll suave de CSS puede fallar.
const botonAbrir = document.getElementById("btn-abrir");
const seccionPrincipal = document.getElementById("principal");

if (botonAbrir && seccionPrincipal) {
  botonAbrir.addEventListener("click", (evento) => {
    evento.preventDefault();
    const sinAnimacion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    seccionPrincipal.scrollIntoView({
      behavior: sinAnimacion ? "auto" : "smooth",
      block: "start"
    });
  });
}

// ===== 3. Aviso si el video de TikTok no carga =====
// Muestra un mensaje que invita a usar el botón "Abrir en TikTok" cuando:
//   - no pusiste todavía el enlace real (sigue el texto PEGA_AQUI...), o
//   - el reproductor no apareció después de unos segundos.
// Si el reproductor carga tarde, el aviso se