# Configuración y flujos de Claude Code

[Glosario español-inglés](glosario-es-en.md) · [Ejemplos resueltos antes de preguntar](ejemplos-resueltos.md) · [Sesiones concretas](../sesiones-detalladas.md).

Dominio: D3. Presupuesto: 9.25 horas. Dependencias: 00-fundamentos, 02-herramientas-mcp.

**Orden de la sesión:** explicación en español -> ejemplo resuelto -> práctica guiada -> preguntas de aplicación -> cierre en inglés.

## Instrucciones compartidas y alcance
Un CLAUDE.md de proyecto conserva instrucciones que el equipo necesita en cada sesión: comandos reales, convenciones y límites. Una instrucción que vive solo en la configuración personal de alguien no se comparte automáticamente al incorporar a un compañero. Separar las preferencias privadas de los estándares versionados.

Organizar contexto por necesidad. Un archivo raíz corto puede importar materiales relevantes; .claude/rules permite separar reglas por tema y, mediante paths en frontmatter, cargarlas para rutas concretas. Si una convención aplica a todos los archivos de prueba dispersos, un patrón de rutas expresa esa intención mejor que copiar la regla en muchas carpetas. Para comprobar qué archivos de memoria se cargaron, la guía usa `/memory`; la versión actual lo muestra con `/context all` (ver la tabla de abajo).

## Procedimientos reutilizables
Una skill contiene un procedimiento específico; CLAUDE.md conserva reglas universales. La guía examina los comandos de `.claude/commands/` (proyecto, compartidos por control de versiones) frente a `~/.claude/commands/` (personales). La documentación actual integra esos comandos en las skills, pero los archivos de `.claude/commands/` siguen funcionando. **Aprende las rutas y su ámbito:** el examen las pregunta literalmente.

context: fork aísla el trabajo en un contexto separado; argument-hint describe los argumentos esperados. Atención a la versión: la guía de julio presenta allowed-tools como restricción, pero la documentación de skills descargada en noviembre explica que **preaprueba** herramientas durante el turno y **no elimina** las demás del conjunto disponible. Para quitar herramientas de una skill, la documentación actual usa disallowed-tools; las reglas deny aplican a permisos más generales. Los subagentes tienen otros campos, tools y disallowedTools. No intercambiar estos nombres ni confundir preaprobación, disponibilidad y autorización del servicio externo. En el proyecto se proporcionan configuraciones de ejemplo, sin activar hooks ni modificar tu configuración personal.

**Regla de examen:** los reactivos de CCAR-F se redactan contra la guía v1.0 (guía l.124). Si un reactivo pregunta cómo limitar las herramientas de una skill y ofrece allowed-tools, esa es la respuesta esperada según la guía. En un proyecto real con la versión actual, usa disallowed-tools o reglas deny. La lista completa de diferencias está en [VERSIONES.md](../biblioteca/VERSIONES.md).

## Mecanismos que la guía nombra: ruta, ámbito y cuándo usarlos

| Mecanismo | Ruta o forma | Ámbito | Cuándo usarlo |
|---|---|---|---|
| CLAUDE.md de usuario | `~/.claude/CLAUDE.md` | Solo tú, en todos los proyectos; no llega a compañeros | Preferencias personales. Si un compañero nuevo no recibe una instrucción, comprobar si estaba aquí y no en el proyecto. |
| CLAUDE.md de proyecto | `CLAUDE.md` o `.claude/CLAUDE.md` | Equipo, por control de versiones | Comandos de build y test, convenciones, decisiones de arquitectura. |
| CLAUDE.md de directorio | `subcarpeta/CLAUDE.md` | Se carga al trabajar en esa carpeta | Convenciones de un paquete concreto. |
| Instrucciones locales | `CLAUDE.local.md` (en .gitignore) | Solo tú, en este proyecto | URLs de prueba o datos personales del proyecto. |
| Importar archivos | `@ruta/archivo.md` dentro de CLAUDE.md | El del archivo que importa | Mantener CLAUDE.md modular: cada paquete importa solo sus estándares. |
| Reglas por tema o ruta | `.claude/rules/*.md`, con `paths: ["**/*.test.tsx"]` en el frontmatter | Proyecto; con paths, solo al editar archivos que coinciden | Convenciones repartidas por todo el repositorio, mejor que un CLAUDE.md por carpeta. |
| Comprobar la memoria cargada | Guía: `/memory`. Versión actual: `/context all`, sección Memory files (`/memory` edita CLAUDE.md) | Sesión actual | Comportamiento distinto entre sesiones o personas. |
| Comandos personalizados | `.claude/commands/` frente a `~/.claude/commands/` | Equipo frente a personal | Un comando del equipo va en el proyecto; uno personal, en el directorio de usuario. |
| Skills | `.claude/skills/<nombre>/SKILL.md` frente a `~/.claude/skills/` | Equipo frente a personal | Procedimientos bajo demanda. Una variante personal lleva otro nombre para no afectar al equipo. |
| Frontmatter de skill | `context: fork`, `allowed-tools`, `argument-hint` | La skill | Aislar salida verbosa, limitar herramientas (según la guía) y pedir argumentos. |
| Plan mode | `Shift+Tab` hasta «plan mode on», o `--permission-mode plan` | Sesión | Cambios amplios, varias alternativas válidas o decisiones de arquitectura. Explora y propone sin editar. |
| Ejecución directa | Modo normal | Sesión | Cambios simples y acotados: un bug con traza clara o una validación en una función. |
| Plan y después ejecución | Plan mode para investigar y luego modo normal para aplicar | Sesión | Migraciones: planificar el enfoque y ejecutarlo después. |
| Subagente Explore | Subagente integrado, de solo lectura | Su propio contexto; devuelve un resumen | Fases de descubrimiento verbosas que agotarían el contexto principal. |
| Hook PreToolUse | Evento en settings, antes de ejecutar la herramienta | Configuración de hooks | Bloquear o pedir aprobación antes del efecto: regla determinista. |
| Hook PostToolUse | Evento en settings, después de ejecutar la herramienta | Configuración de hooks | Normalizar o sustituir el resultado (`updatedToolOutput`) antes de que lo lea el modelo. No deshace lo ejecutado. |
| Compactar contexto | `/compact [instrucciones]` | Sesión | Exploración larga con el contexto lleno de salida de descubrimiento. |
| CI no interactivo | `claude -p "…" --output-format json --json-schema …` | Pipeline | Evitar bloqueos por interacción y producir hallazgos procesables. |

Fuentes: guía l.371-499; [memory.md](../biblioteca/code/memory.md) l.60-72; [commands.md](../biblioteca/code/commands.md) l.73 y l.112; [skills.md](../biblioteca/code/skills.md) l.17 y l.172; [permission-modes.md](../biblioteca/code/permission-modes.md) l.174 y l.293-295; [sub-agents.md](../biblioteca/code/sub-agents.md) l.35-47; [hooks.md](../biblioteca/code/hooks.md) l.1176 y l.2243-2248.

## Planificar y ejecutar
La planificación aporta valor cuando hay decisiones de arquitectura, dependencias desconocidas o un cambio amplio. En Claude Code, eso es plan mode. Una corrección pequeña y bien comprendida puede ejecutarse directamente. Descubrir el repositorio con preguntas concretas y resumir evidencia preserva contexto: el subagente Explore aísla esa salida verbosa y devuelve un resumen. Una exploración indiscriminada consume atención sin resolver la decisión.

La mejora iterativa utiliza ejemplos de entrada/salida, criterios observables y fallos reproducibles. Si dos problemas interactúan, explicar su relación ayuda a evitar arreglos incompatibles. Si son independientes, aislarlos hace más clara la verificación. No generar tests que repitan el código ni ocultar comprobaciones para obtener verde.

## Hooks y CI
Un hook previo (PreToolUse) se utiliza para inspeccionar o impedir una llamada antes de su efecto. Los posteriores (PostToolUse) sirven para tratar el resultado, por ejemplo normalizar formatos distintos antes de que los lea el modelo, o para observabilidad. En la práctica de política de despliegue se asume una herramienta dedicada; una regla sobre esa herramienta no prueba que todas las vías de un sistema real estén cubiertas.

En CI, -p o --print evita esperar interacción. La guía incluye --output-format json y --json-schema para resultados procesables. No activar un modo que omita permisos por comodidad. La automatización debe producir hallazgos con archivo, ubicación, severidad, evidencia y acción, y mantener permisos adecuados al propósito.

Al repetir una revisión tras nuevos commits, dar al revisor los hallazgos previos y el estado de cambios para reportar solo lo nuevo o pendiente. Al generar tests, aportar pruebas y fixtures existentes reduce duplicados. La configuración debe registrar qué constituye una prueba valiosa.

## Ejemplo y práctica
Práctica 05: leer una configuración compartida, reglas por rutas y una skill de revisión. Evaluar entradas de un hook de herramienta dedicada. Comparar el contenido con el diff y las pruebas, sin ejecutar Claude Code ni una API. Esto verifica comprensión de configuración y lógica local, no una integración real con la aplicación.

Objetivos: 3.1-3.6. Explicar después en inglés dónde colocarías una convención, un procedimiento y una prohibición ejecutable.

## Fuentes locales de contraste

- [MEMORY](../biblioteca/code/memory.md) - [original](https://code.claude.com/docs/en/memory.md)
- [SKILLS](../biblioteca/code/skills.md) - [original](https://code.claude.com/docs/en/skills.md)
- [SETTINGS](../biblioteca/code/settings.md) - [original](https://code.claude.com/docs/en/settings.md)
- [HOOKS](../biblioteca/code/hooks.md) - [original](https://code.claude.com/docs/en/hooks.md)
- [CLI](../biblioteca/code/cli-reference.md) - [original](https://code.claude.com/docs/en/cli-reference.md)
- [MCP-CODE](../biblioteca/code/mcp.md) - [original](https://code.claude.com/docs/en/mcp.md)
- [GUIA](../biblioteca/examen/foundations-exam-guide.pdf) - [original](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F6nizmqk8tpzpfjvt6qmmav7rh%2Fpublic%2F1783542750%2FClaude+Certified+Architect+%E2%80%93+Foundations+Exam+Guide.pdf)

## Evidencia para cerrar el tema

- Explicar la decisión con tus palabras y aplicarla a un caso distinto.
- Resolver la práctica y justificar un fallo o alternativa.
- Realizar las preguntas de cierre y la defensa en inglés.
- Registrar errores y repaso D+2/D+7. El tutor no marcará dominio por mera lectura.
