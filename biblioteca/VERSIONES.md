# Versiones y alcance

Fecha de captura: 5 de noviembre de 2026. Guía oficial: CCAR-F, versión 1.0, efectiva julio de 2026. Se guarda el PDF y su extracción textual; el contenido de la guía es la referencia del temario, no una promesa de que todas sus interfaces o políticas sigan iguales meses después.

| Punto | Guía / concepto | Documentación más reciente | Tratamiento de estudio |
|---|---|---|---|
| Invocación de subagentes | La guía nombra Task y allowedTools. | Algunas interfaces actuales usan Agent o conservan alias. | Aprender rol, contexto explícito y herramientas permitidas; contrastar nombres con la versión real. |
| Comandos y skills | Incluye .claude/commands y .claude/skills. | La documentación integra comandos personalizados con skills. | Comprender ámbito, frontmatter e invocación; no declarar obsoleto lo que siga soportado. |
| Permisos de skills | La guía asocia allowed-tools con restricción. | skills.md explica que allowed-tools preaprueba, sin restringir el pool; disallowed-tools quita herramientas y deny bloquea permisos. | Diferenciar preaprobación, conjunto disponible y autorización. En subagentes son otros campos: tools/disallowedTools. |
| Salida estructurada | Incluye tool_use, tool_choice y JSON Schema. | También existe output_config.format y strict tool use. | Dominar el patrón evaluado y distinguir interfaces; formato no garantiza verdad. |
| MCP | Evalúa roles, herramientas, recursos, configuración y errores. | El índice descargado apunta a la versión 2026-07-28; algunos flujos y primitivas cambian entre versiones. | Estudiar contratos estables y negociación de versión; no mezclar mensajes de protocolos distintos. |
| Memoria e instrucciones | Guía: /memory, CLAUDE.md y reglas. | Cambian herramientas de inspección de contexto y compatibilidad con AGENTS.md. | Verificar carga observada y alcance; no suponer que todos los clientes cargan igual. |
| Políticas de examen | El PDF contiene datos de registro. | Las políticas públicas pueden actualizar plazos o requisitos. | Fuera del trabajo actual; volver a verificar cuando se decida presentar el examen. |

Las prácticas son simulaciones de comportamiento en TypeScript, no implementaciones completas del transporte MCP o del Agent SDK. No afirman demostrar conectividad con Claude. Las páginas fuente se conservan sin ejecutar su código.
