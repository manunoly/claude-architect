# Guion concreto de las 20 sesiones

Cada sesión dura 180 minutos. Orientación: 30 de lectura/curso selectivo, 30 de explicación en español, 20 de ejemplo resuelto, 60 de práctica, 20 de preguntas y 20 de cierre o repaso. En sesiones 19-20 prevalece la distribución de evaluación del roadmap. Los ejemplos sustituyen lectura genérica; no añaden horas.

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
- **Cierre o repaso:** Repaso D+2.

## Sesión 3 · semana 1

- **Conceptos:** D4: esquema y validación.
- **Fuente:** [STRUCTURED](biblioteca/api/build-with-claude/structured-outputs.md); tema o texto a localizar: JSON outputs y strict tool use.
- **Ejemplo antes de preguntar:** E06: JSON Schema y tool_choice; consultar [ejemplos resueltos](conceptos/ejemplos-resueltos.md).
- **Trabajo del alumno:** Práctica 01 y errores de corrección.
- **Cierre o repaso:** Repaso de M0.

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
- **Cierre o repaso:** Repaso D+7 de M0.

## Sesión 6 · semana 2

- **Conceptos:** D2: contratos y errores.
- **Fuente:** [TOOLS](biblioteca/api/agents-and-tools/tool-use/define-tools.md); tema o texto a localizar: descriptions e input_schema.
- **Ejemplo antes de preguntar:** E03: buscar frente a recuperar por ID; consultar [ejemplos resueltos](conceptos/ejemplos-resueltos.md).
- **Trabajo del alumno:** Práctica 02; vacío frente a fallo.
- **Cierre o repaso:** Repaso D4.

## Sesión 7 · semana 2

- **Conceptos:** D2: MCP y herramientas de código.
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

- **Conceptos:** D1: especialistas y hooks.
- **Fuente:** [SDK-SUBAGENTS](biblioteca/code/agent-sdk/subagents.md); tema o texto a localizar: AgentDefinition configuration.
- **Ejemplo antes de preguntar:** E01: delegación; E02: normalización posterior; consultar [ejemplos resueltos](conceptos/ejemplos-resueltos.md).
- **Trabajo del alumno:** Micropráctica 06 y diseño de coordinador.
- **Cierre o repaso:** Repaso D2.

## Sesión 10 · semana 2

- **Conceptos:** D1: descomposición y sesiones.
- **Fuente:** [SESSIONS](biblioteca/code/sessions.md); tema o texto a localizar: resumption y branching.
- **Ejemplo antes de preguntar:** E01: rama, cambios y revalidación; consultar [ejemplos resueltos](conceptos/ejemplos-resueltos.md).
- **Trabajo del alumno:** Comparar pipeline fijo con investigación adaptativa.
- **Cierre o repaso:** Repaso de fuentes.

## Sesión 11 · semana 3

- **Conceptos:** D1: handoff; D3: jerarquía.
- **Fuente:** [MEMORY](biblioteca/code/memory.md); tema o texto a localizar: CLAUDE.md y ámbitos.
- **Ejemplo antes de preguntar:** E01: handoff; E04: árbol de contexto; consultar [ejemplos resueltos](conceptos/ejemplos-resueltos.md).
- **Trabajo del alumno:** Entregar caso a un operador sin historial.
- **Cierre o repaso:** Cierre D1.

## Sesión 12 · semana 3

- **Conceptos:** D3: imports, reglas y skills.
- **Fuente:** [SKILLS](biblioteca/code/skills.md); tema o texto a localizar: frontmatter y pre-approve tools.
- **Ejemplo antes de preguntar:** E04: compañero nuevo, @import y paths; consultar [ejemplos resueltos](conceptos/ejemplos-resueltos.md).
- **Trabajo del alumno:** Leer ejemplos inactivos y clasificar ámbitos.
- **Cierre o repaso:** Repaso D+7 de D2.

## Sesión 13 · semana 3

- **Conceptos:** D3: hooks, plan e iteración.
- **Fuente:** [HOOKS](biblioteca/code/hooks.md); tema o texto a localizar: PreToolUse y PostToolUse.
- **Ejemplo antes de preguntar:** E08: entrevista y null; E04: permisos; consultar [ejemplos resueltos](conceptos/ejemplos-resueltos.md).
- **Trabajo del alumno:** Práctica 05; no confundir preaprobación/restricción.
- **Cierre o repaso:** Repaso D1.

## Sesión 14 · semana 3

- **Conceptos:** D3: CI; D5: estado.
- **Fuente:** [CLI](biblioteca/code/cli-reference.md); tema o texto a localizar: -p, output-format y json-schema.
- **Ejemplo antes de preguntar:** E04: comando y contrato de hallazgos; consultar [ejemplos resueltos](conceptos/ejemplos-resueltos.md).
- **Trabajo del alumno:** Distinguir envoltura CLI y salida de negocio.
- **Cierre o repaso:** Cierre D3.

## Sesión 15 · semana 3

- **Conceptos:** D5: hechos, fallos y recuperación.
- **Fuente:** [CONTEXT](biblioteca/engineering/effective-context-engineering.html); tema o texto a localizar: context retrieval y gestión de estado.
- **Ejemplo antes de preguntar:** E09: petición humana frente a frustración; consultar [ejemplos resueltos](conceptos/ejemplos-resueltos.md).
- **Trabajo del alumno:** Práctica 04; límites del filtrado de estado.
- **Cierre o repaso:** Repaso D3.

## Sesión 16 · semana 4

- **Conceptos:** D5: calibración y procedencia.
- **Fuente:** [EVALS](biblioteca/engineering/demystifying-evals.html); tema o texto a localizar: criterios y tareas representativas.
- **Ejemplo antes de preguntar:** E09: segmentos, periodos y formatos; consultar [ejemplos resueltos](conceptos/ejemplos-resueltos.md).
- **Trabajo del alumno:** Muestra de alta confianza y conflicto anotado.
- **Cierre o repaso:** Cierre D5.

## Sesión 17 · semana 4

- **Conceptos:** Proyecto integrador: arquitectura y contratos.
- **Fuente:** [GUIA](biblioteca/examen/foundations-exam-guide.pdf); tema o texto a localizar: tareas relevantes del proyecto.
- **Ejemplo antes de preguntar:** Aplicar E01/E03/E06 a Abeduls; consultar [ejemplos resueltos](conceptos/ejemplos-resueltos.md).
- **Trabajo del alumno:** Diagrama, contratos y diez casos esperados.
- **Cierre o repaso:** Repaso de errores.

## Sesión 18 · semana 4

- **Conceptos:** Proyecto integrador: verificación y defensa.
- **Fuente:** [GUIA](biblioteca/examen/foundations-exam-guide.pdf); tema o texto a localizar: límites y objetivos del blueprint.
- **Ejemplo antes de preguntar:** Ejemplo de fallo parcial y recuperación; consultar [ejemplos resueltos](conceptos/ejemplos-resueltos.md).
- **Trabajo del alumno:** Evidencia de los diez casos y comparación de alternativa.
- **Cierre o repaso:** Cierre de proyecto.

## Sesión 19 · semana 4

- **Conceptos:** Control integrador de 60 reactivos.
- **Fuente:** [GUIA](biblioteca/examen/foundations-exam-guide.pdf); tema o texto a localizar: sin lectura durante el control.
- **Ejemplo antes de preguntar:** Solo explicación del procedimiento antes de empezar; consultar [ejemplos resueltos](conceptos/ejemplos-resueltos.md).
- **Trabajo del alumno:** 120 min de control y 60 min de corrección.
- **Cierre o repaso:** Registrar error por tarea.

## Sesión 20 · semana 4

- **Conceptos:** Caso nuevo y defensa en inglés.
- **Fuente:** [GUIA](biblioteca/examen/foundations-exam-guide.pdf); tema o texto a localizar: consultar después de evaluar.
- **Ejemplo antes de preguntar:** Contrato de proveedor: transferir sin copiar Abeduls; consultar [ejemplos resueltos](conceptos/ejemplos-resueltos.md).
- **Trabajo del alumno:** 60 min caso, 60 min defensa y 60 min revisión.
- **Cierre o repaso:** Plan de refuerzo con casos nuevos.

