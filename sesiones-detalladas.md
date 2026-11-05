# Guion concreto de las 20 sesiones

Cada sesión dura 180 minutos. Orientación: 30 de lectura/curso selectivo, 30 de explicación en español, 20 de ejemplo resuelto, 60 de práctica, 20 de preguntas y 20 de cierre o repaso. En las sesiones 17-20 prevalece la distribución de evaluación del roadmap. Los ejemplos sustituyen lectura genérica; no añaden horas.

**Calendario de repasos.** Con cinco sesiones por semana, D+2 equivale a unas dos sesiones después del cierre y D+7 a unas cinco (se admite ±1). Cada repaso dura 5-10 min: una pregunta o variante nueva, sin releer antes la respuesta. Se registra en progreso.csv y errores.csv.

| Módulo (sesión de cierre) | D+2 | D+7 |
|---|---|---|
| M0 (1) | Sesión 3 | Sesión 6 |
| D4 (4) | Sesión 6 | Sesión 9 |
| D2 (8) | Sesión 10 | Sesión 13 |
| D1 (11) | Sesión 13 | Sesión 15 |
| D3 (14) | Sesión 16: reactivos 05-06 del minicontrol 2 | Sesión 19: reactivos D3 de la reserva nueva |
| D5 (16) | Sesión 18: reactivos D5 del control | Sesión 19-20: reserva nueva y reintento de errores |

Para cada fuente, leer solo el apartado indicado, no el corpus completo. Los títulos de apartado son guías temáticas; usar búsqueda dentro del documento cuando cambie la interfaz. Las preguntas se hacen después de la explicación y del ejemplo.

## Sesión 1 · semana 1

- **Conceptos:** M0 completo; D4: Del deseo al criterio observable.
- **Fuente:** [API](biblioteca/api/intro.md); tema o texto a localizar: intro y bloques de solicitud.
- **Ejemplo antes de preguntar:** M0: borrador autorizado de tres recuerdos; consultar [ejemplos resueltos](conceptos/ejemplos-resueltos.md).
- **Trabajo del alumno:** Mapa de entradas/salidas y validación.
- **Cierre o repaso:** M0 + glosario.

## Sesión 2 · semana 1

- **Conceptos:** D4: criterios y few-shot.
- **Fuente:** [PROMPTS](biblioteca/api/build-with-claude/prompt-engineering/overview.md); tema o texto a localizar: ejemplos y criterios.
- **Ejemplo antes de preguntar:** E05: exacto, aproximado y conflicto; consultar [ejemplos resueltos](conceptos/ejemplos-resueltos.md).
- **Trabajo del alumno:** Tres pares entrada/salida; una variante nueva.
- **Cierre o repaso:** Preguntas D4 adicionales (no hay repaso vencido).

## Sesión 3 · semana 1

- **Conceptos:** D4: esquema y validación.
- **Fuente:** [STRUCTURED](biblioteca/api/build-with-claude/structured-outputs.md); tema o texto a localizar: JSON outputs y strict tool use.
- **Ejemplo antes de preguntar:** E06: JSON Schema y tool_choice; consultar [ejemplos resueltos](conceptos/ejemplos-resueltos.md).
- **Trabajo del alumno:** Práctica 01 y errores de corrección.
- **Cierre o repaso:** Repaso D+2 de M0.

## Sesión 4 · semana 1

- **Conceptos:** D4: lotes y revisión independiente.
- **Fuente:** [BATCH](biblioteca/api/build-with-claude/batch-processing.md); tema o texto a localizar: processing window y resultados por custom_id.
- **Ejemplo antes de preguntar:** E07: SLA y muestra antes de escalar; consultar [ejemplos resueltos](conceptos/ejemplos-resueltos.md).
- **Trabajo del alumno:** Micropráctica 06: SLA y recuperación.
- **Cierre o repaso:** Cierre D4.

## Sesión 5 · semana 1

- **Conceptos:** D1: comparación flujo/agente y ciclo.
- **Fuente:** [TOOL-RESULTS](biblioteca/api/agents-and-tools/tool-use/handle-tool-calls.md); tema o texto a localizar: tool_result, IDs y continuación.
- **Ejemplo antes de preguntar:** Traza: tool_use -> resultados -> end_turn; consultar [ejemplos resueltos](conceptos/ejemplos-resueltos.md).
- **Trabajo del alumno:** Práctica 03: traza y estado incompleto.
- **Cierre o repaso:** Preguntas D1 adicionales (no hay repaso vencido).

## Sesión 6 · semana 2

- **Conceptos:** D2: contratos y errores.
- **Fuente:** [TOOLS](biblioteca/api/agents-and-tools/tool-use/define-tools.md); tema o texto a localizar: descriptions e input_schema.
- **Ejemplo antes de preguntar:** E03: buscar frente a recuperar por ID; consultar [ejemplos resueltos](conceptos/ejemplos-resueltos.md).
- **Trabajo del alumno:** Práctica 02; vacío frente a fallo.
- **Cierre o repaso:** Repaso D+2 de D4 y D+7 de M0.

## Sesión 7 · semana 2

- **Conceptos:** D2: MCP y herramientas de código; número de herramientas por agente (18 frente a 4-5), herramientas de todos los servidores disponibles a la vez, descripción MCP frente a Grep, y Read + Write cuando Edit falla.
- **Fuente:** [MCP](biblioteca/mcp/docs/2026-07-28/learn/architecture.md); tema o texto a localizar: host, client, server y primitivas.
- **Ejemplo antes de preguntar:** E10: aliases, Grep/Glob/Read y flujo entre archivos; consultar [ejemplos resueltos](conceptos/ejemplos-resueltos.md).
- **Trabajo del alumno:** Dibujar roles y seguir un wrapper.
- **Cierre o repaso:** Repaso de bucle.

## Sesión 8 · semana 2

- **Conceptos:** D2: ámbito y configuración.
- **Fuente:** [MCP-CODE](biblioteca/code/mcp.md); tema o texto a localizar: .mcp.json y environment variable expansion.
- **Ejemplo antes de preguntar:** E03: configuración compartida y secreto por entorno; consultar [ejemplos resueltos](conceptos/ejemplos-resueltos.md).
- **Trabajo del alumno:** Elegir servidor existente/personalizado y ámbito.
- **Cierre o repaso:** Cierre D2.

## Sesión 9 · semana 2

- **Conceptos:** D1: especialistas y hooks; Task en allowedTools (regla de examen); refinamiento iterativo del coordinador; petición con varios asuntos.
- **Fuente:** [SDK-SUBAGENTS](biblioteca/code/agent-sdk/subagents.md); tema o texto a localizar: AgentDefinition configuration. Alternativa en el mismo tiempo: vídeos del curso gratuito [Introduction to subagents](https://academy.claude.com/courses/introduction-to-subagents) (unos 45 min; elegir las lecciones de contexto aislado y herramientas limitadas).
- **Ejemplo antes de preguntar:** E01: delegación; E02: normalización posterior; consultar [ejemplos resueltos](conceptos/ejemplos-resueltos.md).
- **Trabajo del alumno:** Micropráctica 06 y diseño de coordinador.
- **Cierre o repaso:** Repaso D+7 de D4.

## Sesión 10 · semana 2

- **Conceptos:** D1: descomposición y sesiones.
- **Fuente:** [SESSIONS](biblioteca/code/sessions.md); tema o texto a localizar: resumption y branching.
- **Ejemplo antes de preguntar:** E01: rama, cambios y revalidación; consultar [ejemplos resueltos](conceptos/ejemplos-resueltos.md).
- **Trabajo del alumno:** Comparar pipeline fijo con investigación adaptativa (35 min de práctica).
- **Minicontrol 1 en inglés (45 min, en lugar de las preguntas y parte de la práctica):** reactivos 01-04, 07 y 08 del [diagnóstico archivado](archivo/diagnostico-inicial-2026-11-04.pdf), 15 min cronometrados, sin consultar fuentes; después, 20 min de corrección con la [clave](evaluacion/clave-diagnostico.md) y errores en errores.csv.
- **Cierre o repaso:** Repaso D+2 de D2.

## Sesión 11 · semana 3

- **Conceptos:** D1: handoff; D3: jerarquía.
- **Fuente:** [MEMORY](biblioteca/code/memory.md); tema o texto a localizar: CLAUDE.md y ámbitos.
- **Ejemplo antes de preguntar:** E01: handoff; E04: árbol de contexto; consultar [ejemplos resueltos](conceptos/ejemplos-resueltos.md).
- **Trabajo del alumno:** Entregar caso a un operador sin historial.
- **Cierre o repaso:** Cierre D1.

## Sesión 12 · semana 3

- **Conceptos:** D3: imports, reglas, comandos y skills; [tabla de mecanismos](conceptos/04-claude-code.md) y regla de examen para allowed-tools.
- **Fuente:** [SKILLS](biblioteca/code/skills.md); tema o texto a localizar: frontmatter y pre-approve tools. Alternativa en el mismo tiempo: vídeos del curso gratuito [Introduction to agent skills](https://academy.claude.com/courses/introduction-to-agent-skills) (1 h; elegir «Configuration and multi-file skills» y «Skills vs. other Claude Code features»).
- **Ejemplo antes de preguntar:** E04: compañero nuevo, @import y paths; consultar [ejemplos resueltos](conceptos/ejemplos-resueltos.md).
- **Trabajo del alumno:** Leer ejemplos inactivos y clasificar ámbitos. Al final, rellenar de memoria la columna «Ruta o forma» de la tabla de mecanismos y contrastarla.
- **Cierre o repaso:** Preguntas D3 adicionales (no hay repaso vencido).

## Sesión 13 · semana 3

- **Conceptos:** D3: hooks (PreToolUse y PostToolUse), plan mode frente a ejecución directa, subagente Explore e iteración.
- **Fuente:** [HOOKS](biblioteca/code/hooks.md); tema o texto a localizar: PreToolUse y PostToolUse. Además, [PERMISSION-MODES](biblioteca/code/permission-modes.md): «Analyze before you edit with plan mode»; y [SUB-AGENTS](biblioteca/code/sub-agents.md): pestaña Explore.
- **Ejemplo antes de preguntar:** E08: entrevista y null; E04: permisos; consultar [ejemplos resueltos](conceptos/ejemplos-resueltos.md).
- **Trabajo del alumno:** Práctica 05; no confundir preaprobación/restricción.
- **Cierre o repaso:** Repaso D+2 de D1 y D+7 de D2.

## Sesión 14 · semana 3

- **Conceptos:** D3: CI; D5: estado.
- **Fuente:** [CLI](biblioteca/code/cli-reference.md); tema o texto a localizar: -p, output-format y json-schema.
- **Ejemplo antes de preguntar:** E04: comando y contrato de hallazgos; consultar [ejemplos resueltos](conceptos/ejemplos-resueltos.md).
- **Trabajo del alumno:** Distinguir envoltura CLI y salida de negocio.
- **Cierre o repaso:** Cierre D3.

## Sesión 15 · semana 3

- **Conceptos:** D5: hechos, fallos y recuperación; «lost in the middle»; sentimiento y confianza autodeclarada como señales poco fiables; degradación del contexto, scratchpad y `/compact`.
- **Fuente:** [CONTEXT](biblioteca/engineering/effective-context-engineering.html); tema o texto a localizar: context retrieval y gestión de estado.
- **Ejemplo antes de preguntar:** E09: petición humana frente a frustración; consultar [ejemplos resueltos](conceptos/ejemplos-resueltos.md).
- **Trabajo del alumno:** Práctica 04; límites del filtrado de estado.
- **Cierre o repaso:** Repaso D+7 de D1.

## Sesión 16 · semana 4

- **Conceptos:** D5: calibración y procedencia.
- **Fuente:** [EVALS](biblioteca/engineering/demystifying-evals.html); tema o texto a localizar: criterios y tareas representativas.
- **Ejemplo antes de preguntar:** E09: segmentos, periodos y formatos; consultar [ejemplos resueltos](conceptos/ejemplos-resueltos.md).
- **Trabajo del alumno:** Muestra de alta confianza y conflicto anotado (40 min de práctica).
- **Minicontrol 2 en inglés (20 min, de la práctica):** reactivos 05, 06, 09 y 10 del [diagnóstico archivado](archivo/diagnostico-inicial-2026-11-04.pdf), 10 min cronometrados y 10 de corrección con la [clave](evaluacion/clave-diagnostico.md).
- **Cierre o repaso:** Cierre D5.

## Sesión 17 · semana 4

- **Muestras oficiales en inglés (45 min):** las 12 preguntas de muestra de la guía (sección 9), en 25 min cronometrados. El tutor presenta enunciado y opciones sin las líneas «Correct Answer»; si estudias solo, tapa cada explicación antes de responder. Después, 20 min con las explicaciones oficiales, justificando por escrito al menos 3 distractores descartados. Estas preguntas son de Anthropic: se estudian en la guía, no se copian al banco.
- **Conceptos:** Proyecto integrador: arquitectura y contratos (135 min).
- **Fuente:** [GUIA](biblioteca/examen/foundations-exam-guide.pdf); tema o texto a localizar: sección 9 y tareas relevantes del proyecto.
- **Ejemplo antes de preguntar:** Aplicar E01/E03/E06 a Abeduls; consultar [ejemplos resueltos](conceptos/ejemplos-resueltos.md).
- **Trabajo del alumno:** Diagrama, contratos y diez casos esperados, reutilizando las prácticas 02-04.
- **Cierre o repaso:** Registrar errores de las muestras en errores.csv.

## Sesión 18 · semana 4

- **Conceptos:** [Control integrador en inglés](evaluacion/control-60.md), 60 reactivos en 120 min, como en el examen.
- **Fuente:** sin lectura durante el control; solo se permite el [glosario](conceptos/glosario-es-en.md).
- **Ejemplo antes de preguntar:** Solo explicación del procedimiento antes de empezar.
- **Trabajo del alumno:** 120 min de control con confianza por reactivo y 60 min de corrección por tarea con la [clave explicada](evaluacion/soluciones-control-60.md).
- **Cierre o repaso:** Registrar el resultado de los 20 reforzados, de los 40 básicos y por dominio, y cada error por tarea.

## Sesión 19 · semana 4

- **Conceptos:** [Reserva nueva en inglés](evaluacion/reserva-nueva-en.md): 20 reactivos no derivados del banco, en 40 min cronometrados.
- **Fuente:** sin lectura durante la reserva; después, la [clave](evaluacion/soluciones-reserva-nueva.md).
- **Ejemplo antes de preguntar:** Ninguno; es la señal independiente.
- **Trabajo del alumno:** Reserva (40 min) y corrección (20 min); refuerzo dirigido a las tareas falladas en el control y en la reserva (30 min); proyecto: verificar los diez casos y comparar con la alternativa descartada (90 min).
- **Cierre o repaso:** Decidir con [evaluacion/LEEME.md](evaluacion/LEEME.md) si hace falta refuerzo adicional.

## Sesión 20 · semana 4

- **Conceptos:** Caso nuevo y defensa en inglés.
- **Fuente:** [GUIA](biblioteca/examen/foundations-exam-guide.pdf); tema o texto a localizar: consultar después de evaluar.
- **Ejemplo antes de preguntar:** Contrato de proveedor: transferir sin copiar Abeduls; consultar [ejemplos resueltos](conceptos/ejemplos-resueltos.md).
- **Trabajo del alumno:** 60 min caso, 60 min defensa y 60 min de reintento D+2 de los errores del control y de la reserva, con variantes nuevas.
- **Cierre o repaso:** Plan de refuerzo con casos nuevos.

