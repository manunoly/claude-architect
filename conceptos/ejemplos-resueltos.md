# Ejemplos aplicados antes de evaluar

Estos ejemplos complementan las lecciones y sustituyen parte de la lectura general de las sesiones. No añaden horas al roadmap. Se estudian **antes** de las preguntas asociadas. Las configuraciones son ilustraciones inactivas y las invocaciones representadas no hacen llamadas a servicios.

## E01 - Especialistas, coordinación, handoff y sesiones

Tareas: 1.2, 1.3, 1.4 y 1.7. Sesiones 8-11.

Un equipo necesita contrastar dos fuentes independientes antes de redactar un informe. El coordinador conserva el objetivo y asigna un ámbito a cada lector; no pide a ambos «investiga todo». Una representación TypeScript de la definición actual del especialista es:

```ts
const sourceReader = {
  description: 'Consulta las fuentes asignadas y devuelve hechos con procedencia.',
  prompt: 'Respeta el alcance recibido. Devuelve afirmación, fuente, ubicación, fecha y lagunas.',
  tools: ['Read', 'Grep', 'Glob'],
};
const coordinatorOptions = {
  // Preaprobación, no una lista que elimine por sí sola todo lo demás:
  allowedTools: ['Read', 'Grep', 'Glob', 'Agent'],
  agents: { 'source-reader': sourceReader },
};
```

`description` ayuda a decidir cuándo delegar; `prompt` especifica conducta; `tools` delimita el conjunto del especialista. En una integración se pasan estas opciones a `query` del Agent SDK, según su versión. El coordinador debe tener disponible la capacidad de invocación y permisos adecuados. La guía de julio llama `Task` a la herramienta; la captura actual usa `Agent`. No intercambiar `allowedTools` de opciones, `tools` de una definición y `allowed-tools` del frontmatter de una skill.

Traza representada, no una llamada real:

| Paso | Entrada o resultado | Decisión |
|---|---|---|
| 1 | Lector A: fuentes legales; lector B: informes técnicos; mismo objetivo y contratos explícitos | Invocar en paralelo porque no dependen entre sí. |
| 2 | A aporta una cláusula; B aporta una medida sin fecha | Conservar ambos resultados y marcar la fecha ausente. |
| 3 | La síntesis necesita saber el periodo de medición | Redelegar solo esa laguna al lector B. |
| 4 | B devuelve la fecha y ubicación | Integrar el dato con su fuente, sin rehacer toda la investigación. |

Una llamada al sintetizador recibe explícitamente `findings`, `sources`, `gaps` y `requiredOutput`; no la frase «usa lo que ya sabes del lector». Si el proceso debe pasar a una persona, un handoff puede contener:

```json
{"caseId":"case-17","verifiedFacts":{"documentId":"doc-4"},"attempted":["leer fuente A","consultar periodo en B"],"partialResults":["cláusula identificada"],"unresolved":["confirmar vigencia"],"reason":"política no cubre la excepción","recommendedNextStep":"revisión por responsable"}
```

Ejemplo de sesión: se guardó `sessionId` de un resultado del SDK. Para continuar, las opciones TypeScript incluyen `resume: sessionId`; para una rama independiente, `resume: sessionId, forkSession: true`. No son decisiones ya aplicadas al proyecto original. Si los archivos han cambiado, comunicar el diff o iniciar una sesión con un resumen actual. En CLI la guía estudia `--resume`; el argumento y la selección de sesiones se contrastan con la versión. No ejecutar estos ejemplos durante la práctica offline.

Fuentes: [subagentes SDK](../biblioteca/code/agent-sdk/subagents.md), [sesiones SDK](../biblioteca/code/agent-sdk/sessions.md), [guía](../biblioteca/examen/foundations-exam-guide.pdf).

## E02 - Hook posterior que normaliza sin borrar procedencia

Tarea 1.5. Sesión 9.

Dos herramientas describen el mismo instante con formatos distintos. El hook posterior transforma el resultado antes de que el agente lo interprete. No cambia el dato original ni decide que dos eventos distintos son el mismo.

| Proveedor | Entrada | Salida normalizada |
|---|---|---|
| A | `unixSeconds: 0, statusCode: 1` | `time: "1970-01-01T00:00:00.000Z", status: "open"` |
| B | `isoTime: "1970-01-01T00:00:00Z", status: "OPEN"` | El mismo formato ISO y estado `open`. |
| C | `statusCode: 99` | Estado `unknown` y código original 99; no inventar equivalencia. |

La [micropráctica 06](../practicas/06-ejemplos-aplicados/solucion.ts) ejecuta esta conversión conservando proveedor y entrada original. Segundos y milisegundos son unidades distintas: no adivinar cuál utiliza una cifra. Un hook previo bloquea una acción; uno posterior normaliza una observación y no previene retroactivamente su efecto.

Fuente: [hooks](../biblioteca/code/hooks.md).

## E03 - Configuración MCP y elección de integración

Tarea 2.4. Sesión 8.

Una configuración compartida ilustrativa de `.mcp.json` es:

```json
{
  "mcpServers": {
    "memories": {
      "type": "http",
      "url": "https://mcp.example.test/memories",
      "headers": {"Authorization": "Bearer ${MEMORIES_API_TOKEN}"}
    }
  }
}
```

`example.test` es un dominio de ejemplo, no un servicio que debas conectar. `${MEMORIES_API_TOKEN}` representa expansión del entorno; no es una credencial literal ni una instrucción para crear una. El archivo compartido conserva la forma de la integración, mientras cada entorno aporta su valor. Sin `type`, una entrada con `url` puede interpretarse como configuración stdio y fallar en el cliente actual.

Ámbito de proyecto: configuración común versionada en `.mcp.json`. Ámbito personal/experimental: la configuración de usuario de Claude Code, que la guía sitúa en `~/.claude.json`. Que el archivo exista no prueba aprobación ni conexión; la aplicación debe verificar estado y permisos. No se ha activado este ejemplo.

Elección resuelta: para un servicio estándar, primero evaluar un servidor existente por capacidades, mantenimiento y permisos; para las reglas específicas de apertura de cápsulas de Abeduls, una interfaz propia puede ser necesaria. Reutilizar no equivale a confiar sin revisar y construir uno propio no garantiza mayor seguridad.

Contraste de descripciones: «gestiona recuerdos» deja ambiguo si busca o lee. `search_memory(query)` busca texto en recuerdos autorizados y abiertos y devuelve identificadores con fragmentos. `get_memory(id)` requiere un identificador estable y devuelve un documento concreto después de comprobar acceso. El primero descubre candidatos; el segundo recupera el contenido elegido. Si el prompt dice «usa get_memory para cualquier palabra relacionada con recuerdos», hay que corregir también esa instrucción que contradice los contratos.

Fuente: [MCP en Claude Code](../biblioteca/code/mcp.md).

## E04 - Jerarquía, imports, reglas, skill y CI

Tareas 3.1-3.3 y 3.6. Sesiones 12 y 14.

```text
~/.claude/CLAUDE.md                preferencias personales
proyecto/CLAUDE.md                 estándares compartidos
proyecto/.claude/rules/tests.md    regla para **/*.test.ts
proyecto/paquete/CLAUDE.md          contexto específico del paquete
proyecto/.claude/skills/review/SKILL.md  procedimiento de revisión
```

Dentro de un CLAUDE.md se puede importar un estándar mediante `@docs/estandar-tests.md`. La importación conserva organización; no convierte datos externos en órdenes confiables. Si el compañero no recibe la regla porque solo estaba en `~/.claude/CLAUDE.md`, mover la convención compartida al proyecto y comprobar qué archivos carga la sesión. La guía usa `/memory`; la versión actual dispone además de inspección de contexto. El diagnóstico requiere observar la carga, no solo encontrar el archivo en el disco.

Una regla transversal con `paths: ["**/*.test.ts"]` cubre archivos de pruebas en varios paquetes. Un archivo dentro de una sola subcarpeta no expresa necesariamente ese mismo alcance. Comprobar coincidencias y exclusiones.

Casos resueltos del patrón: `packages/a/cart.test.ts` coincide; `packages/b/cart.test.ts` también; `packages/a/cart.ts` y `packages/a/test_utils.ts` no coinciden. Esta comprobación de intención no afirma haber observado la carga real de Claude Code en esas rutas.

Una skill de proyecto comparte un procedimiento por control de versiones; una personal no se distribuye automáticamente. En la captura de noviembre, `allowed-tools` preaprueba, `disallowed-tools` excluye capacidades mientras está activa y las reglas deny gobiernan restricciones más generales. Revisar también herramientas MCP y vías indirectas antes de afirmar «solo lectura».

Comando de CI ilustrativo, **no ejecutado en estas prácticas**:

```sh
claude -p "Revisa el cambio según los criterios del proyecto" --output-format json --json-schema '{"type":"object","properties":{"findings":{"type":"array","items":{"type":"object","properties":{"file":{"type":"string"},"line":{"type":"integer"},"severity":{"type":"string"},"evidence":{"type":"string"}},"required":["file","line","severity","evidence"],"additionalProperties":false}}},"required":["findings"],"additionalProperties":false}'
```

El esquema de ejemplo ilustra hallazgos, no garantiza que toda salida o error de CLI tenga la misma envoltura: el consumidor debe inspeccionar el resultado y el objeto estructurado documentado para su versión. Una salida de negocio sería `{"findings":[{"file":"billing.ts","line":28,"severity":"high","evidence":"el consumidor recibe céntimos como euros"}]}`. Al repetir la revisión, aportar hallazgos previos, resolución y nuevo diff para evitar duplicados sin ocultar asuntos aún abiertos.

Fuentes: [memoria](../biblioteca/code/memory.md), [skills](../biblioteca/code/skills.md), [CLI](../biblioteca/code/cli-reference.md).

## E05 - Tres ejemplos few-shot que enseñan una frontera

Tareas 4.1 y 4.2. Sesión 2.

Objetivo: clasificar si un recuerdo ofrece una fecha exacta. Un ejemplo debe mostrar entrada, salida y razón; no solo una etiqueta.

| Entrada ficticia | Salida | Razón |
|---|---|---|
| «La visita fue el 2012-05-09» | `exactDate: "2012-05-09", status: "exact"` | La fecha aparece literalmente y es válida. |
| «Fue en la primavera de 2012» | `exactDate: null, status: "approximate"` | Hay un periodo, pero no un día exacto. |
| «Una nota dice 2012-05-09 y otra 2013-05-09» | `exactDate: null, status: "conflict"` | Elegir una fecha borraría un desacuerdo. |

Variante para el alumno después de explicar: una carta sin fecha menciona el «segundo cumpleaños» y no se dispone de fecha de nacimiento. Aplicar el criterio a esa evidencia nueva; no rellenar a partir de suposiciones.

En revisión de código, usar el mismo método para contrastar patrón permitido y defecto reproducible. Si una categoría produce ruido, aislarla temporalmente, medir el patrón y mejorar sus ejemplos antes de reactivarla; no rebajar todos los controles ni ocultar fallos reales de otras categorías.

Fuentes: [prompts](../biblioteca/api/build-with-claude/prompt-engineering/overview.md), [guía](../biblioteca/examen/foundations-exam-guide.pdf).

## E06 - JSON Schema de extracción y selección explícita

Tareas 2.3 y 4.3-4.4. Sesión 3.

```json
{
  "name": "record_memory",
  "description": "Estructura un recuerdo aportado. Usa null si falta fecha exacta y conserva el identificador de fuente.",
  "strict": true,
  "input_schema": {
    "type": "object",
    "properties": {
      "title": {"type": "string"},
      "exactDate": {"type": ["string", "null"]},
      "category": {"type": "string", "enum": ["family", "travel", "other", "unclear"]},
      "detail": {"type": ["string", "null"]},
      "sourceId": {"type": "string"}
    },
    "required": ["title", "exactDate", "category", "detail", "sourceId"],
    "additionalProperties": false
  }
}
```

Todas las claves son requeridas en este ejemplo; `exactDate` y `detail` admiten null. La regla «other requiere detalle» se valida además en el servicio: el esquema mínimo mostrado no la expresa. El modo estricto de la interfaz actual trabaja con el subconjunto de esquemas admitido; no prueba que una fecha sea verdadera o que una operación esté autorizada.

Para pedir esa herramienta concreta: `{"type":"tool","name":"record_memory"}` como `tool_choice`. Si hay varios extractores y se permite elegir uno, `{"type":"any"}` exige alguna herramienta, pero no elige por sí mismo cuál ni garantiza el orden de varios pasos. `auto` puede producir texto sin herramienta. Si hay un prerrequisito de negocio, se aplica también en el ejecutor.

Corrección resuelta: si la salida contiene `exactDate: "2012/05/09"` y la fuente sí tiene el dato, devolver el valor fallido, documento y error preciso de normalización. Si falta el dato, reintentar no crea la evidencia. La [práctica 01](../practicas/01-extraccion/solucion.ts) verifica estructura y algunos aspectos semánticos con datos locales.

Fuentes: [definición de herramientas](../biblioteca/api/agents-and-tools/tool-use/define-tools.md), [salida estructurada](../biblioteca/api/build-with-claude/structured-outputs.md).

## E07 - Ventana de lotes y cálculo de SLA

Tarea 4.5. Sesión 4.

El patrón de lotes documentado contempla una ventana de procesamiento de hasta 24 horas. No interpretar una ejecución que tardó pocos minutos como garantía de latencia. Cada solicitud del lote es independiente: el servicio no ejecuta tus herramientas y sus siguientes vueltas automáticamente dentro de un elemento. Si hay tool_use, la aplicación necesita orquestar los resultados y las nuevas solicitudes por fuera.

Ejemplo: una obligación operativa exige disponer del resultado dentro de 29 horas desde que llega el documento. Presupuestando 24 horas para el lote y sin otros costes, la espera máxima antes de enviarlo es `29 - 24 = 5 h`. Con 30 minutos reservados para recoger y validar resultados, queda `4.5 h`. Un envío cada 4 horas cabe en ese presupuesto teórico; uno cada 6 no.

Este cálculo reserva tiempo, no garantiza éxito del procesamiento. Hay que tratar expiración, errores y margen operativo. Antes de escalar un lote, refinar la extracción sobre muestras. Correlacionar por custom_id y conservar éxitos; ante fallos por contexto, modificar los documentos afectados en vez de reenviar todo idéntico.

Fuente: [batch processing](../biblioteca/api/build-with-claude/batch-processing.md). La micropráctica 06 comprueba la aritmética y qué lotes deben volver a intentarse.

## E08 - Entrevista de diseño, iteración y patrones de falsos positivos

Tareas 3.5 y 4.4. Sesión 13.

El patrón de entrevista aclara decisiones antes de implementar un dominio desconocido. Ejemplo resuelto, sin formular nuevas preguntas al alumno ahora: para una caché, el arquitecto aclara cuánto retraso de datos se tolera, qué evento invalida una entrada y qué sucede al fallar el proveedor. Las respuestas ficticias son «hasta cinco minutos», «cambio del documento» y «mostrar estado no disponible, sin inventar datos». De ahí salen criterios de prueba; la implementación se itera con fallos concretos.

Una primera prueba descubre que null se transformó en cadena vacía. La corrección recibe entrada, salida obtenida y salida esperada. Si invalidación y lectura interactúan, explicar ambas en una sola especificación evita que un arreglo rompa el otro.

Hallazgo estructurado interno de revisión:

```json
{"file":"cache.ts","line":18,"issue":"dato obsoleto tras actualización","severity":"high","detected_pattern":"missing_invalidation_after_update","evidence":"update no cambia la revisión de la entrada"}
```

`detected_pattern` es un campo diseñado por la aplicación, no una propiedad universal de la API. Si muchos hallazgos con el mismo patrón son descartados como falsos positivos, examinar los casos y mejorar criterios o ejemplos. No usar una etiqueta para dar automáticamente por verdadero un defecto.

## E09 - Escalado, calibración y síntesis temporal

Tareas 5.2, 5.3, 5.5 y 5.6. Sesiones 15-16.

| Entrada o evidencia | Decisión resuelta |
|---|---|
| «Estoy frustrado con este problema», sin petición de persona | Reconocer frustración y ofrecer resolver si hay capacidad y política. |
| «Quiero hablar con una persona» | Honrar la petición explícita y hacer handoff sin exigir investigación automática previa. |
| Dos cuentas con mismo nombre | Pedir un identificador adicional antes de una operación con efectos. |
| Fuente B no respondió tras un intento acotado | Conservar hechos de A, motivo e intento de B y alternativa; indicar cobertura parcial. |

En un conjunto etiquetado, 18 de 20 formularios de alta confianza son correctos, pero solo 5 de 10 cartas lo son. El promedio `23/30` oculta un segmento de 50% de precisión. El criterio de revisión se ajusta por documento/campo, y se muestrea también alta confianza de cada estrato para detectar error real. Esto no calibra un modelo solo porque se haya calculado una media sobre datos sintéticos.

Si una fuente publicada hoy describe datos de 2020 y otra publicada ayer mide 2026, «publicación más reciente» no resuelve actualidad del hecho. Mantener ambos periodos, método y fuentes. Diferentes valores son candidatos a conflicto, no siempre contradicciones: pueden medir poblaciones o periodos distintos. Elegir formato según la información: una tabla para cifras comparables, prosa para secuencia de hechos y un registro estructurado para hallazgos técnicos.

En la práctica 04, solo claims tiene procedencia por fuente. facts contiene exclusivamente el caseId confiable del fixture, y pending/errors no contienen datos privados. La función no demuestra saneamiento de cualquier estado arbitrario; si esas capas incorporan hechos derivados, necesitan su propia procedencia y revalidación.

## E10 - Descubrir código y seguir exportaciones

Tareas 1.6, 2.5 y 3.4. Sesión 7.

Glob encuentra `**/*.test.ts`, Grep localiza `refundCustomer`, Read permite seguir la implementación y sus imports. Si un módulo exporta ese símbolo también como `issueCredit`, buscar solo el primer nombre no encuentra todos los consumidores. Registrar aliases y seguirlos antes de concluir alcance.

Ejemplo de wrapper: `billing.ts` exporta `refundCustomer`; `index.ts` contiene `export { refundCustomer as issueCredit } from './billing'`; `app.ts` importa `issueCredit`. Buscar solo `refundCustomer` encuentra la definición y el wrapper, pero no necesariamente el uso final. La segunda búsqueda sigue `issueCredit` y la lectura comprueba que es el mismo flujo.

Bash o PowerShell ejecuta un comando de comprobación conocido; no se elige para todo si existe una herramienta de lectura más precisa. Edit necesita un ancla inequívoca; si cambia el archivo, volver a leer antes de sustituir. Write no autoriza a perder cambios ajenos.

Una revisión resuelta puede tener dos pasadas: analizar cada archivo modificado contra sus requisitos y después seguir el dato desde `parseAmount` hasta `chargeCustomer`. Que ambos archivos pasen pruebas aisladas no demuestra que concuerden sobre céntimos y euros. Una migración de pocas líneas puede requerir planificación si cambia ese contrato; el conteo de líneas no decide por sí solo.

Fuentes generales: [guía oficial](../biblioteca/examen/foundations-exam-guide.pdf), [configuración de versiones](../biblioteca/VERSIONES.md).
