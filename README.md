# FSistema de Telemetría GPS

Prototipo funcional de un sistema de monitoreo de flotas GPS en tiempo real. Recibe coordenadas de vehículos, determina su estado (En movimiento / Detenido / Sin señal) y los muestra en un panel web con mapa interactivo.

---

## Arquitectura

El proyecto se divide en tres piezas independientes: backend, frontend y simulador. Esta separación refleja responsabilidades distintas: el backend expone la API y maneja la lógica de negocio, el frontend muestra los datos, y el simulador genera tráfico de prueba. Cada uno tiene su propio `package.json` y puede correrse por separado.

Dentro del backend y el frontend, el código está organizado por módulo (feature), no por tipo de archivo. Esto significa que todo lo relacionado a GPS está en `src/modules/gps/`, y todo lo del mapa está en `src/modules/map/`. Si alguien nuevo llega al proyecto y quiere entender cómo funciona el cálculo de estados, va directo a `vehicles.service.js` sin buscar entre carpetas sueltas.

El almacenamiento en memoria (JavaScript `Map`) fue una decisión deliberada para esta prueba: elimina la fricción de configurar una base de datos, es suficiente para demostrar la lógica de negocio, y es lo que el enunciado permite. En producción, esto se reemplazaría por Redis para cache y PostgreSQL/Mongo para persistencia.

---
## Video de Sustentación

[![Video de Sustentación](https://img.youtube.com/vi/vReZvNm1X20/0.jpg)](https://youtu.be/vReZvNm1X20)

## Cómo correr el proyecto

### Backend
```bash
cd backend
npm install
npm start
```
Corre en `http://localhost:3001`

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Corre en `http://localhost:3000`

### Simulador
```bash
cd simulator
npm install
node simulator.js
```

> El backend debe estar corriendo antes de iniciar el simulador.

---

## Decisiones técnicas

**Estructura modular por feature:** Cada módulo agrupa rutas, controlador, servicio y validaciones juntas. Facilita navegar el código sin saltar entre carpetas. Es el mismo patrón que usa NestJS o feature-based React.

**Storage en memoria:** Para una prueba técnica sin infraestructura externa es la opción más directa. El `Map` de JavaScript permite operaciones O(1) de lectura y escritura. La lógica de negocio (estados, historial) está desacoplada del storage, así que cambiarlo por una BD real solo requiere tocar el archivo `vehicles.store.js`.

**Polling en lugar de WebSockets:** Polling cada 5 segundos es simple de implementar, no requiere infraestructura adicional (no hay servidor de sockets), y es suficiente para este caso de uso donde la latencia de segundos es aceptable. WebSockets agregaría complejidad (manejo de conexiones, reconexión) que no aporta valor visible en una prueba técnica.

---

## Pregunta de reflexión — DELETE /vehicles/:id

Si existiera un Redis y una base de datos persistente, al eliminar un vehículo habría que garantizar que la eliminación ocurra en ambos de forma consistente. El riesgo concreto es este: si elimino el registro de la base de datos pero no del caché, el sistema podría seguir mostrando el vehículo durante el tiempo que tarde en expirar la entrada en Redis. Y al revés, si borro del caché pero falla la base de datos, el vehículo desaparece del panel temporalmente pero vuelve a aparecer en el próximo ciclo de lectura.

La forma más simple de manejarlo es usar una transacción o un patrón de "write-through": primero eliminar de la base de datos, y solo si eso tiene éxito, eliminar del caché. Si la operación en el caché falla, lo peor que pasa es que el dato aparece un poco más de tiempo hasta que expira, que es generalmente aceptable. Lo que no es aceptable es el orden inverso (borrar del caché primero), porque eso puede dejar datos huérfanos en la BD que el caché ya no cubre.

En sistemas de alta disponibilidad esto se maneja con herramientas como sagas o eventos de dominio, pero para la mayoría de los casos el orden correcto (BD primero, caché después) y una expiración razonable en Redis son suficientes.

---

## Reporte de IA

**1. ¿Qué herramientas de IA usaste?**
Claude (Anthropic) como asistente principal durante todo el desarrollo.

**2. ¿Para qué tareas específicas te apoyaste en la IA?**
La IA generó la estructura inicial de archivos y el scaffolding de cada módulo. También ayudó a redactar la lógica de cálculo de estados (`determineStatus`) y los tipos de payloads inválidos en el simulador. Fue útil para no perder tiempo en boilerplate y enfocarse en la lógica de negocio.

**3. ¿Qué error de la IA encontraste y cómo lo corregiste?**
La IA generó inicialmente el componente `VehicleMap` sin el import dinámico de Next.js (`dynamic`), lo que causaba un error en el servidor porque Leaflet intenta acceder a `window` en tiempo de renderizado SSR. Lo corregí envolviendo el import en `dynamic(() => import(...), { ssr: false })` desde el Dashboard, que es el patrón correcto para librerías que no soportan renderizado en servidor.

---

## Video de sustentación

[Enlace de YouTube aquí]
