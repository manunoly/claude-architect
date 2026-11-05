# Clave del minicontrol en inglés (diagnóstico archivado)

El [diagnóstico inicial](../archivo/diagnostico-inicial-2026-11-04.pdf) tiene 10 reactivos originales en inglés, dos por dominio. Ahora se usa como minicontrol de formato **después** de la enseñanza:

- **Sesión 10:** reactivos 01-04, 07 y 08 (D1, D2 y D4). 15 minutos cronometrados y 20 de corrección.
- **Sesión 16:** reactivos 05, 06, 09 y 10 (D3 y D5). 10 minutos y 10 de corrección.

Abrir esta clave solo después de responder. Anotar la opción, la confianza (alta, media o baja) y, en 01, 06, 07 y 09, una justificación breve. Los errores van a [errores.csv](../seguimiento/errores.csv).

**Límite.** Con dos reactivos por dominio, el minicontrol ensaya el formato (inglés, opción múltiple, tiempo); no mide dominio. Además, en varios reactivos la correcta es la opción más larga: no la elijas por longitud. La señal principal de preparación está en [evaluacion/LEEME.md](LEEME.md).

| # | Dominio | Correcta | Por qué | Por qué no las otras |
|---|---|---|---|---|
| 01 | D1 | B | El recorrido es fijo y las reglas, deterministas: un flujo orquestado con el LLM para el lenguaje y la decisión de reembolso en la aplicación. | A delega autorización y pago en una sola llamada. C crea agentes sin necesidad de descomposición. D da autonomía y un pago sin límites a un caso predecible. |
| 02 | D1 | A + C | Búsquedas independientes en paralelo con timeouts y evidencia (latencia y trazabilidad), y trabajadores con tarea, herramientas y contrato acotados (presupuesto y validación). | B da todo el historial y herramientas de escritura sin necesidad. D elimina el presupuesto fijo. |
| 03 | D2 | D | La confusión nace de descripciones solapadas: primero se aclaran operación, cuándo usar cada herramienta, semántica del ID, entradas y salida. | A y B no tocan la causa. C acorta nombres sin resolver el solapamiento. |
| 04 | D2 | C | La aplicación es el host, con un cliente por servidor; los permisos siguen siendo cosa de la aplicación y del servidor. | A confunde servidor con host. B impone un cliente único que el protocolo no exige. D atribuye a MCP autorización y prompts que no gestiona. |
| 05 | D3 | B | Las instrucciones compartidas van en un CLAUDE.md de proyecto versionado; las notas personales, en un ámbito local. | A no se comparte de forma fiable. C depende de cada persona y cada sesión. D llena el contexto con salida irrelevante. |
| 06 | D3 | A | PreToolUse inspecciona la herramienta y sus argumentos antes de ejecutar y puede devolver una denegación determinista. | B llega tarde: el despliegue ya ocurrió. C es un recordatorio, no un control. D pregunta al modelo después del efecto. |
| 07 | D4 | D | El esquema garantiza formato, no verdad: siguen haciendo falta fundamentación en la fuente y validación de negocio. | A y B confunden validez de tipos con exactitud. C cambia un nombre sin añadir evidencia. |
| 08 | D4 | A + C | El contenido recuperado se trata como dato no confiable y los permisos se aplican en la aplicación antes de la herramienta sensible. | B eleva texto no confiable a instrucción de sistema. D concede el permiso que la inyección busca. |
| 09 | D5 | B | El estado compactado conserva objetivo, restricciones, decisiones, referencias estables, estado verificado y trabajo pendiente, con la evidencia recuperable. | A pierde el estado. C no deja sitio para continuar. D oculta incertidumbres y fallos. |
| 10 | D5 | C | Tareas representativas reservadas, con comprobaciones de resultado y fallo, varias ejecuciones donde haga falta, y coste y latencia medidos. | A juzga por impresión. B mide solo coste. D exige igualdad literal en tres demostraciones elegidas a mano. |

Fuentes de contraste: [Building effective agents](../biblioteca/engineering/building-effective-agents.txt), [define-tools](../biblioteca/api/agents-and-tools/tool-use/define-tools.md), [MCP architecture](../biblioteca/mcp/docs/2026-07-28/learn/architecture.md), [memory](../biblioteca/code/memory.md), [hooks](../biblioteca/code/hooks.md), [structured outputs](../biblioteca/api/build-with-claude/structured-outputs.md), [mitigate jailbreaks](../biblioteca/api/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks.md), [context engineering](../biblioteca/engineering/effective-context-engineering.txt), [demystifying evals](../biblioteca/engineering/demystifying-evals.txt).
