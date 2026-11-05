# Arquitectura y orquestación de agentes

[Glosario español-inglés](glosario-es-en.md) · [Ejemplos resueltos antes de preguntar](ejemplos-resueltos.md) · [Sesiones concretas](../sesiones-detalladas.md).

Dominio: D1. Presupuesto: 12.5 horas. Dependencias: 00-fundamentos, 02-herramientas-mcp.

**Orden de la sesión:** explicación en español -> ejemplo resuelto -> práctica guiada -> preguntas de aplicación -> cierre en inglés.

## Cuánta autonomía necesita el problema
En un flujo, el código fija el recorrido; en un agente, el modelo decide acciones a partir del contexto y los resultados. Un recorrido predecible admite un flujo claro. Una investigación cuyo siguiente paso depende de hallazgos puede necesitar un agente. Añadir agentes especializados solo se justifica por una necesidad de descomposición, aislamiento o trabajo paralelo verificable.

La secuencia de enseñanza empieza comparando patrones, pero el dominio también exige construir y explicar un bucle real de herramientas; saber elegir un flujo sencillo no sustituye esa destreza.

## Ciclo de herramientas
En el patrón de Messages API del temario, enviar solicitud, inspeccionar stop_reason, ejecutar las llamadas permitidas y devolver tool_result con sus identificadores. Si stop_reason es tool_use, los resultados se incorporan al historial para la siguiente iteración. Cuando es end_turn, ese turno termina. Preservar el contenido del asistente que originó las llamadas y asociar cada resultado al tool_use_id correcto.

El texto «he terminado» no es un protocolo de control. Tampoco lo es comprobar que haya texto, porque una respuesta puede mezclar texto y solicitudes de herramienta. Un tope de tiempo, iteraciones o gasto es un guardarraíl secundario: alcanzarlo significa interrupción, fallo acotado o escalado, no éxito de negocio. La finalización normal se decide por el protocolo y por el resultado requerido.

## Coordinador y especialistas
Un coordinador descompone, selecciona especialistas, reúne evidencia y decide si quedan lagunas. No debe ejecutar siempre todos los especialistas ni recortar tanto el alcance que pierda partes de la pregunta. Asignar subtemas o fuentes distintos evita duplicación.

El contexto del subagente se pasa explícitamente: objetivo, datos necesarios, restricciones, resultados previos y contrato de devolución. No suponer que conoce toda la conversación. Para tareas independientes pueden emitirse varias llamadas en un turno; para tareas dependientes hay que esperar sus entradas. Mantener la atribución con registros de afirmación, fuente, fecha y ubicación.

La guía de julio de 2026 usa Task y allowedTools para invocar subagentes; documentación más reciente puede usar Agent o alias. Aprender la función y comprobar la interfaz de la versión utilizada; consultar VERSIONES.md. No activar subagentes en esta tutoría sin petición o autorización aplicable.

## Garantías y escalado
Una regla de orden obligatoria debe tener un control programático: no procesar un reembolso antes de verificar el cliente, o no compartir antes de una aprobación válida. El prompt explica la política, pero el punto de ejecución la hace cumplir. Un hook previo puede rechazar una acción; uno posterior puede normalizar un resultado, pero no deshacer automáticamente lo ya ejecutado.

Un handoff útil incluye identidad verificada, hechos, acciones intentadas, resultados, importe o alcance, motivo del escalado y siguiente decisión. El humano puede no ver el historial completo. Si el usuario solicita explícitamente una persona, respetar esa preferencia según el caso y política aplicable.

## Descomposición y sesiones
Usar pasos fijos para transformaciones conocidas; descomposición adaptativa cuando el trabajo emerge de la investigación. En código, revisar archivos por separado y después sus interacciones. Reanudar una sesión sirve si el contexto sigue siendo válido; tras cambios importantes puede ser más fiable una sesión nueva con resumen y referencias verificadas. Un fork explora una alternativa sin confundir sus decisiones con las de la rama original.

## Práctica
Práctica 03: ejecutar un bucle con respuestas simuladas, múltiples tool_use y estados de corte; conservar evidencia y distinguir éxito de límite alcanzado. Después diseñar delegación para un caso de investigación ajeno a Abeduls y resolver D1. Objetivos: 1.1-1.7. Cierre en inglés obligatorio.

## Fuentes locales de contraste

- [AGENTS](../biblioteca/engineering/building-effective-agents.html) - [original](https://www.anthropic.com/engineering/building-effective-agents)
- [SDK-AGENT](../biblioteca/code/agent-sdk/overview.md) - [original](https://code.claude.com/docs/en/agent-sdk/overview.md)
- [SDK-SUBAGENTS](../biblioteca/code/agent-sdk/subagents.md) - [original](https://code.claude.com/docs/en/agent-sdk/subagents.md)
- [SUBAGENTS](../biblioteca/code/sub-agents.md) - [original](https://code.claude.com/docs/en/sub-agents.md)
- [HOOKS](../biblioteca/code/hooks.md) - [original](https://code.claude.com/docs/en/hooks.md)
- [SESSIONS](../biblioteca/code/sessions.md) - [original](https://code.claude.com/docs/en/sessions.md)
- [TOOL-RESULTS](../biblioteca/api/agents-and-tools/tool-use/handle-tool-calls.md) - [original](https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls.md)
- [GUIA](../biblioteca/examen/foundations-exam-guide.pdf) - [original](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F6nizmqk8tpzpfjvt6qmmav7rh%2Fpublic%2F1783542750%2FClaude+Certified+Architect+%E2%80%93+Foundations+Exam+Guide.pdf)

## Evidencia para cerrar el tema

- Explicar la decisión con tus palabras y aplicarla a un caso distinto.
- Resolver la práctica y justificar un fallo o alternativa.
- Realizar las preguntas de cierre y la defensa en inglés.
- Registrar errores y repaso D+2/D+7. El tutor no marcará dominio por mera lectura.
