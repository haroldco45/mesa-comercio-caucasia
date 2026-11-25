# Mesa del Comercio al Día · Caucasia

App ciudadana (PWA) de **Vibras Positivas HM** para hacer seguimiento a la mesa de trabajo de la Alcaldía de Caucasia con más de 20 comerciantes y empresarios (noviembre de 2026): espacio público, obras en la vía, alumbrado público e impuestos.

**Que no sean solo palabras: necesitamos hechos.**

- URL: https://mesa-comercio-caucasia.netlify.app/
- Español e inglés.
- Sección **Hoy** que se refresca cada vez que se entra, botón **Actualizar** y búsqueda en vivo al abrir.
- Robot de GitHub Actions (`.github/workflows/robot.yml`) que cada 30 minutos trae noticias, fotos y videos reales y rehace la imagen de vista previa (`portada.jpg`).
- Tablero de compromisos (pendiente / en marcha / cumplido / incumplido).
- Derecho de petición que se envía de una sola vez a Alcaldía, Hacienda, Planeación, Gobierno, Concejo y Personería.
- Formulario "Su voz" que manda las propuestas de los comerciantes por WhatsApp.

## Cómo actualizar un compromiso

Edite `data/mesa.json` en GitHub. En la lista `compromisos`, cambie:

- `estado`: `pendiente`, `en_marcha`, `cumplido` o `incumplido`
- `fecha_meta`: la fecha prometida, `AAAA-MM-DD`
- `prueba`: enlace al acta, al contrato en SECOP, a una foto o a la noticia

Guarde (commit) y la app se actualiza sola.
