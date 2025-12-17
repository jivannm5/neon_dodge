# Neon Dodge - Propuesta de Desarrollo Indie

Descripción de la Propuesta
**Neon Dodge** es una propuesta de videojuego web minimalista del género "Endless Runner Vertical". El concepto central es la **simplicidad y la reacción rápida**. Se busca eliminar distracciones visuales complejas para centrarse puramente en la habilidad del jugador (skill-based).

El juego está diseñado para ser ejecutado directamente en el navegador sin instalaciones, utilizando tecnologías web estándar.

Mecánicas de Juego
* **Core Loop:** El jugador controla un avatar de luz que debe esquivar obstáculos que caen a velocidades variables.
* **Controles:** Movimiento lateral simple (Flechas / A-D).
* **Progresión:** La dificultad es infinita; el objetivo es superar la puntuación máxima (High Score).
* **Feedback:** * *Visual:* Efectos de brillo (Glow) utilizando del Canvas API.

Ficha Técnica
* **Lenguaje:** JavaScript (ES6 Vanilla).
* **Renderizado:** HTML5 Canvas API.
* **Audio:** Web Audio API (Osciladores sintetizados, sin archivos externos).
* **Estilo:** CSS3 Flexbox para UI minimalista.

Jugar en Línea (Demo)
El proyecto está desplegado y jugable en GitHub Pages:
https://jivannm5.github.io/neon_dodge/


### Estructura del Proyecto
* `index.html`: Estructura del DOM y Canvas.
* `style.css`: Estilos visuales dark/neon.
* `script.js`: Lógica del Game Loop, detección de colisiones y sintetizador de audio.

