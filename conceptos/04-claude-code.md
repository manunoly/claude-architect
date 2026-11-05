# Configuración y flujos de Claude Code

[Glosario español-inglés](glosario-es-en.md) · [Ejemplos resueltos antes de preguntar](ejemplos-resueltos.md) · [Sesiones concretas](../sesiones-detalladas.md).

Dominio: D3. Presupuesto: 9.25 horas. Dependencias: 00-fundamentos, 02-herramientas-mcp.

**Orden de la sesión:** explicación en español -> ejemplo resuelto -> práctica guiada -> preguntas de aplicación -> cierre en inglés.

## Instrucciones compartidas y alcance
Un CLAUDE.md de proyecto conserva instrucciones que el equipo necesita en cada sesión: comandos reales, convenciones y límites. Una instrucción que vive solo en la configuración personal de alguien no se comparte automáticamente al incorporar a un compañero. Separar las preferencias privadas de los estándares versionados.

Organizar contexto por necesidad. Un archivo raíz corto puede importar materiales relevantes; .claude/rules permite separar reglas por tema y, mediante paths en frontmatter, cargarlas para rutas concretas. Si una convención aplica a todos los archivos de prueba dispersos, un patrón de rutas expresa esa intención mejor que copiar la regla en muchas carpetas. Verificar lo que se carga con las herramientas de memoria/contexto disponibles en la versión.

## Procedimientos reutilizables
Una skill contiene un procedimiento específico; CLAUDE.md conserva reglas universales. La guía también incluye comandos de .claude/commands y documentación actual unifica parte de esa experiencia con skills. El propósito y el alcance importan más que memorizar una ruta sin versión.

context: fork aísla el trabajo en un contexto separado; argument-hint describe los argumentos esperados. Atención a la versión: la guía de julio presenta allowed-tools como restricción, pero la documentación de skills descargada en noviembre explica que **preaprueba** herramientas durante el turno y **no elimina** las demás del conjunto disponible. Para quitar herramientas de una skill, la documentación actual usa disallowed-tools; las reglas deny aplican a permisos más generales. Los subagentes tienen otros campos, tools y disallowedTools. No intercambiar estos nombres ni confundir preaprobación, disponibilidad y autorización del servicio externo. En el proyecto se proporcionan configuraciones de ejemplo, sin activar hooks ni modificar tu configuración personal.

## Planificar y ejecutar
La planificación aporta valor cuando hay decisiones de arquitectura, dependencias desconocidas o un cambio amplio. Una corrección pequeña y bien comprendida puede ejecutarse directamente. Descubrir el repositorio con preguntas concretas y resumir evidencia preserva contexto; una exploración indiscriminada consume atención sin resolver la decisión.

La mejora iterativa utiliza ejemplos de entrada/salida, criterios observables y fallos reproducibles. Si dos problemas interactúan, explicar su relación ayuda a evitar arreglos incompatibles. Si son independientes, aislarlos hace más clara la verificación. No generar tests que repitan el código ni ocultar comprobaciones para obtener verde.

## Hooks y CI
Un hook previo se utiliza para inspeccionar o impedir una llamada antes de su efecto. Los posteriores sirven para tratamiento de resultados u observabilidad. En la práctica de política de despliegue se asume una herramienta dedicada; una regla sobre esa herramienta no prueba que todas las vías de un sistema real estén cubiertas.

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
