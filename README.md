Arena Piedra, Papel o Tijera (v2)
🚀 Esta es la segunda versión del proyecto, enfocada en pulir la experiencia multijugador y añadir controles en tiempo real para las salas.

SPA multijugador para desafiar a tus amigas (y a la CPU Nova) en partidas simultáneas de piedra, papel o tijera. Toda la interfaz se construyó con React, creando componentes reutilizables para botones, manos, resultados y marcadores. El enrutamiento y la orquestación de vistas se gestionan con React Router DOM, aprovechando su modo SPA y el sistema de rutas tipo file-based.

Novedades de la versión 2
🤖 Autorrevelado inteligente: cuando todas las personas listas marcan su jugada, la ronda se resuelve sola. Si los bots están activos, la arena completa los cupos con CPUs automáticas; si no, respeta el modo humano con mínimo dos participantes.
🕹️ Control total de bots: la persona que crea la sala puede activar o desactivar la participación de bots en cualquier momento desde la interfaz de la sala.
🚨 Alertas a pantalla completa: si intentas unirte a una sala llena o necesitas una contraseña, aparece un overlay que explica exactamente qué pasó y cómo continuar.
🧭 UX refinada: la sección “Tu alias principal” ahora es lo primero que ves, y al elegir una sala desde el directorio la interfaz te desplaza suavemente al formulario “Conectarme”..
Características principales
⚡️ Interfaz React responsiva con animaciones y persistencia en localStorage.
🧭 Navegación con React Router DOM (react-router y @react-router/dev).
🎨 Estilos con Tailwind CSS para una estética retro-futurista.
🧠 Bot CPU Nova integrado (y bots automáticos que completan la sala cuando lo habilitas).
📊 Marcadores editables y reseñas de ronda en un modal a pantalla completa.
🔥 Telemetría con Firebase Analytics para entender el uso de la arena.
Requisitos previos
Node.js 18+
npm (o pnpm/bun si prefieres adaptar los scripts).
Instalación
npm install
Desarrollo
npm run dev
Visita http://localhost:5173 y prueba la SPA con HMR.

Integración con Firebase
El proyecto está conectado a Firebase utilizando el SDK modular (firebase/app, firebase/analytics). La configuración vive en app/src/lib/firebase.client.ts y se inicializa desde app/root.tsx solo en el cliente, garantizando compatibilidad con SSR. Si necesitas usar otros productos (Auth, Firestore, Storage) puedes ampliar ese archivo importando los SDK correspondientes.

Build de producción
npm run build
El resultado se genera en build/client (estáticos) y build/server (SSR/híbrido). Para servirlo localmente puedes usar:

npm run start
Despliegue con Docker
Hay tres Dockerfiles listos (npm, pnpm, bun). Ejemplo con npm:

docker build -t rps-arena .
El contenedor funciona en AWS ECS, Cloud Run, Azure Container Apps, Fly.io, Railway, etc.

Estructura relevante
├── app/
│   ├── routes/            # Rutas manejadas por React Router DOM
│   └── src/
│       ├── components/    # Componentes React (UI arena, botones, scoreboard)
│       ├── controllers/   # Lógica del juego (evaluateRound, bot, etc.)
│       └── types/         # Tipos TypeScript compartidos
├── app.css                # Tailwind base
├── package.json           # Scripts y dependencias
└── README.md
Scripts útiles
npm run dev – entorno local con HMR.
npm run build – build optimizada.
npm run start – sirve la build.
npm run typecheck – genera tipos de React Router y ejecuta tsc.
Contribuciones
Haz fork o crea branch.
Ejecuta los scripts de test/typing.
Abre un PR con la descripción de los cambios.
Construido con ❤️ usando React + React Router DOM.
