# Revisión independiente de Astra

Fecha: 5 de noviembre de 2026. Alcance: paquete local `claude-architect-foundations`, con la guía CCAR-F v1.0 de julio de 2026 como referencia del temario y la documentación archivada en noviembre como referencia de interfaces. Revisión solicitada con Astra y esfuerzo xhigh.

Estado del informe: conserva los hallazgos de la versión base revisada. Durante su cierre, el agente principal comunicó que había corregido R2 y R4 y ejecutado las comprobaciones correspondientes. Esas correcciones requieren una pasada posterior de verificación; este informe no las presenta como fallos necesariamente vigentes ni como correcciones ya verificadas por Astra.

**Veredicto: cambios necesarios antes de presentar el paquete como preparación finalizada.** La biblioteca y el roadmap constituyen una base útil y proporcionada para este alumno. La suma de horas, los pesos, la enseñanza principal en español y el reconocimiento de los límites de las simulaciones están bien planteados. Sin embargo, hay una clave de examen totalmente predecible, una explicación incorrecta de permisos en la documentación de noviembre, un fallo de propagación de errores y lagunas de enseñanza aplicada que una matriz de 30 etiquetas no descubre.

No encontré un problema que requiera la categoría **Critical** en este paquete offline. Los siguientes **Required** sí deben resolverse; las mejoras **Optional** pueden aplazarse. Las rutas y líneas describen la versión revisada y pueden desplazarse al incorporar cambios.

## Required R1 — P1: eliminar el patrón que permite acertar todo el control sin saber el temario

**Archivos:** `evaluacion/clave-control.json`, `evaluacion/control-60.md`, `evaluacion/soluciones-control-60.md`.

Las **60 de 60** claves obedecen a la misma regla: para el reactivo de número `n`, seleccionar `ABCD[n % 4]`; si pide dos respuestas, añadir la letra siguiente. Así, los reactivos simples siguen B, C, D, A y los múltiples mantienen pares contiguos. Ejemplos: 01=B, 02=C+D, 03=D, 04=A, 05=B; 52=A+B y 60=A+B. Lo comprobé por programa contra la clave completa. La regla obtiene 100%, incluidas todas las respuestas múltiples.

Esto invalida el control como evidencia de conocimientos aunque sus respuestas conceptuales sean correctas. No basta con mover unas pocas preguntas: hay que permutar las opciones de forma independiente, recalcular la clave y comprobar su correspondencia con las explicaciones. Una distribución aproximadamente equilibrada puede lograrse sin un ciclo visible. No hace falta una dependencia ni una aplicación nueva.

**Criterio de cierre:** los 60 reactivos conservan claves correctas después de la permutación y desaparecen la secuencia periódica y los pares siempre adyacentes. Verificar también que las explicaciones identifican las opciones correctas por contenido, no por su posición anterior.

## Required R2 — P1: distinguir `allowed-tools` de una restricción real de herramientas

**Archivos:** `conceptos/04-claude-code.md:15`, `preguntas/banco.json` (C04), `preguntas/respuestas.md:315`, `evaluacion/soluciones-control-60.md:303`, `biblioteca/VERSIONES.md`, `practicas/05-claude-code/ejemplos/revision-skill.example.md`.

El material enseña que `allowed-tools` «acota las herramientas» o «acota capacidades durante ese uso». La copia oficial de noviembre dice algo diferente en `biblioteca/code/skills.md:617`: ese campo **preaprueba** las herramientas enumeradas, pero **no elimina las demás del conjunto disponible**; las otras siguen sujetas a los permisos. En la línea 632 identifica `disallowed-tools` y las reglas de denegación como mecanismos de restricción. La configuración de agente de una skill con `context: fork` también determina su entorno; véanse las líneas 847–855.

La guía de julio, tarea 3.2, sí presenta `allowed-tools` como restricción. Por ello, la corrección debe registrar una **diferencia explícita entre versiones**, no borrar el término del temario ni enseñar que el campo es una barrera de seguridad actual. La advertencia sobre permisos del servicio externo no resuelve el error sobre herramientas locales.

**Corrección proporcionada:** explicar la interpretación de la guía de julio y la semántica de la captura de noviembre, actualizar C04 y su solución, y anotar que el ejemplo con `allowed-tools: Read, Grep, Glob` por sí solo no demuestra que escribir sea imposible. Si se ilustra restricción actual, usar el mecanismo documentado y dejarlo como ejemplo inactivo.

## Required R3 — P2: completar ejemplos anteriores a las preguntas y mostrar las lagunas reales de cobertura

**Archivos:** `conceptos/01-prompts-estructura.md:10–25`, `conceptos/02-herramientas-mcp.md:19`, `conceptos/03-agentes-orquestacion.md:18–30`, `conceptos/04-claude-code.md`, `seguimiento/cobertura-blueprint.csv` y los enunciados correspondientes.

Las seis introducciones tienen aproximadamente 619–702 palabras cada una, incluidos enlaces y instrucciones de cierre. Su brevedad no es un defecto por sí misma, pero en varias tareas la única enseñanza propia es una regla general. Los documentos oficiales están disponibles, aunque el roadmap no asigna sus secciones concretas ni demuestra que se hayan explicado en español antes de evaluar. Para el método pedido por el alumno, una referencia al documento completo no sustituye el ejemplo resuelto.

Lagunas concretas respecto de la guía:

| Tarea | Falta en la enseñanza y práctica propias revisadas | Adición pequeña que lo resolvería |
|---|---|---|
| 1.3 | No hay ejemplo de `AgentDefinition`, sus campos y la configuración del coordinador que permite invocar al especialista. Se menciona Task/Agent sin mostrar su uso. | Definición TypeScript de lectura y dos invocaciones independientes representadas, señalando versión e interfaz; sin ejecutar un SDK. |
| 1.5 | Se describe un hook posterior, pero no se demuestra normalización de Unix/ISO/códigos de estado. La práctica 03 no contiene hooks. | Tabla de entradas heterogéneas, normalizador local, salida y explicación de conservación de procedencia. |
| 2.4 | `.mcp.json` se menciona, pero no hay configuración de ejemplo, expansión de entorno ni ubicación personal `~/.claude.json`; tampoco se practica la elección servidor existente/personalizado. | Ejemplo de configuración con variable ficticia y comparación de ámbito; un caso corto de reutilización frente a desarrollo propio. |
| 3.1 / 3.2 | No se muestra un árbol de jerarquía, un `@import` ni la comprobación `/memory`; la skill tiene frontmatter, pero falta contrastar ámbito personal y compartido con rutas concretas. | Un árbol de archivos y una resolución comentada de «mi compañero no carga esta regla». |
| 4.2 | Se recomienda few-shot, pero no se entrega un conjunto real de 2–4 pares entrada/salida con una decisión fronteriza explicada. | Tres ejemplos contrastados, seguidos de una variante sin solución visible. |
| 4.3 | La práctica valida un tipo TypeScript a mano; no muestra el JSON Schema de una herramienta de extracción ni la forma de `tool_choice`. | Un esquema mínimo con required, null, enum y other/detail, más el objeto de selección forzada. Explicar qué exige `strict` en la interfaz actual y qué sigue siendo validación semántica. |
| 4.5 | No se enseñan la ventana de hasta 24 h, la limitación de herramientas de varias vueltas dentro de una solicitud de lote ni el cálculo de frecuencia de envío para un SLA. | Un ejemplo distinto al de la guía: SLA de 29 h, espera máxima antes de enviar de 5 h si se presupuesta una ventana de proceso de 24 h, con margen operativo y distinción entre ventana documentada y garantía de éxito. |
| 3.5 / 4.4 | No se explican el patrón de entrevista en un escenario de desarrollo ni `detected_pattern` para analizar falsos positivos. | Dos ejemplos breves. Enseñar el patrón de entrevista no obliga a interrogar nuevamente al alumno. |

La matriz asigna **todas** las tareas de D1 a práctica 03 y todas las de D4 a práctica 01. La primera ejecuta un bucle, pero no implementa coordinación, hooks, handoff ni reanudación; la segunda valida una extracción, pero no ejecuta lotes ni revisiones múltiples. La advertencia uniforme «no todos los subobjetivos ejecutados con SDK real» deja la impresión de que la única falta es la conectividad real. También faltan demostraciones locales o ejercicios en papel de varias subhabilidades.

**Corrección proporcionada:** añadir los ejemplos indicados dentro de las sesiones ya asignadas y sustituir parte de la lectura genérica; distinguir en la matriz `explicación`, `ejemplo resuelto`, `práctica local`, `pregunta`, `pendiente`, con evidencia específica por tarea. No ampliar esto a una integración de producción ni contratar API. Cuando algo siga pendiente, declararlo de manera concreta.

## Required R4 — P2: conservar errores estructurados al incorporarlos al bucle

**Archivo:** `practicas/03-bucle-agente/solucion.ts:20–21`.

`run()` pone `is_error:false` en cualquier resultado que no lance excepción. La práctica anterior devuelve sus errores como `{ok:false, category, retryable, message}`. Conecté ambas funciones en memoria, sin modificar archivos: `readMemory('u1', {id:'m3'})` produce un fallo de permiso no reintentable, pero el mensaje añadido al historial contiene `is_error:false`. El contenido conserva el fallo, mientras su indicador de protocolo dice éxito.

Además, lanzar `TypeError('Invalid arguments')` produce `category:'transient'`. No toda excepción es transitoria: el ejemplo contradice la distinción que enseña D2 y puede inducir reintentos de validación o permisos.

**Corrección proporcionada:** definir el contrato de devolución de `Tool` o un adaptador explícito; conservar categoría y posibilidad de reintento y derivar `is_error` del resultado. Una excepción de causa desconocida no debe etiquetarse automáticamente como transitoria. Añadir dos comprobaciones de comportamiento: permiso estructurado e input inválido. No hace falta implementar MCP ni un SDK.

## Required R5 — P2: fortalecer y separar el control final de los ejemplos de aprendizaje

**Archivos:** `preguntas/banco.json`, `evaluacion/control-60.md:3`, `evaluacion/clave-control.json` y `evaluacion/soluciones-control-60.md`.

Los **60 enunciados y 60 juegos de opciones** del control son copias exactas de los campos `exam_stem_es` y `exam_options` del banco JSON. Las 60 explicaciones también son exactamente las respuestas del banco. El Markdown del banco contiene preguntas abiertas distintas, de modo que no afirmo que alguien que solo lea ese Markdown ya haya visto el control. Pero el banco entregado contiene toda la prueba y no constituye una reserva separada.

La mayoría de los distractores son manifiestamente absurdos: cambiar `stop_reason` a voluntad (01), «acortar ambos nombres hasta que parezcan equivalentes» (07), sumar porcentajes de confianza (27), o eliminar casos de prueba que fallan (49). Es útil para una primera comprobación, pero exige menos criterio que elegir entre alternativas técnicamente plausibles. Elegir la opción más larga acierta **37 de los 54** reactivos simples. Las etiquetas «transferencia» no prueban mayor dificultad. Los cuatro contextos tienen un párrafo introductorio y apenas condicionan las decisiones de cada pregunta.

**Corrección proporcionada:** reservar el contenido final en archivos de evaluación, sin incrustarlo en el banco de aprendizaje; reemplazar una parte sustancial —por ejemplo, 15–20 reactivos— por problemas nuevos con dos alternativas plausibles, restricciones que cambien la decisión, pequeñas trazas/configuraciones y algún cálculo de SLA. Mantener los 60 reactivos y los pesos. Para cada distractor, explicar qué requisito incumple. El resto puede seguir siendo comprobación de fundamentos. No se requiere inventar una calibración psicométrica ni prometer dificultad oficial.

## Cobertura de las 30 tareas

Esta tabla evalúa evidencia disponible, no conocimientos del alumno. «Conceptual» significa que hay una explicación o pregunta útil; «local» indica comportamiento ejecutable; «parcial» identifica una habilidad material todavía insuficientemente demostrada. No representa una auditoría exhaustiva de todas las frases de cada fuente descargada.

| Tarea | Evidencia revisada y valoración |
|---|---|
| 1.1 | D1, A01–A03, práctica 03: bucle, IDs, estados y límite bien representados; corregir R4. |
| 1.2 | D1, A04–A05: coordinación y cobertura conceptuales; falta ejemplo de ciclo de refinamiento con redelegación. |
| 1.3 | D1, A06–A08: contexto y paralelismo conceptuales; configuración de especialista parcial, R3. |
| 1.4 | D1, A09–A10 y gate de práctica 05: garantías y handoff conceptuales; 03 no demuestra gate ni handoff. |
| 1.5 | D1, A11–A12, práctica 05: control previo local; normalización posterior pendiente, R3. |
| 1.6 | D1, A13–A14: fija/adaptativa y revisión por pasadas explicadas; aplicación principalmente discursiva. |
| 1.7 | D1, A15–A16: decisión resume/fork conceptual; falta ejemplo de comando/opción y estado de rama. |
| 2.1 | D2, T01–T02: contratos y solapamiento; el alumno debe diseñar las descripciones, sin ejemplo contrastado completo. |
| 2.2 | D2, T03–T05 y práctica 02: errores y vacío bien diferenciados localmente; integración con 03 falla, R4. |
| 2.3 | D2/D4, T06–T07: selección y privilegios conceptuales; falta representación concreta de opciones en el ejemplo. |
| 2.4 | D2, T08–T09: tool/resource y ámbitos conceptuales; configuración aplicada parcial, R3. |
| 2.5 | D2, T10–T11: búsqueda y edición conceptuales; no cubre de forma aplicada Bash ni rastreo a través de wrappers/exportaciones. |
| 3.1 | D3, C01–C02 y CLAUDE.example: propósito correcto; jerarquía/importación/diagnóstico concretos parciales, R3. |
| 3.2 | D3, C03–C04 y skill.example: ejemplo de frontmatter; semántica de permisos requiere R2. |
| 3.3 | D3, C05–C06 y regla-tests.example: patrón transversal ilustrado; carga real expresamente no verificada. |
| 3.4 | D3, C07–C08: elección de plan y exploración bien explicada conceptualmente. |
| 3.5 | D3, C09–C10: ejemplos y problemas interdependientes; entrevista no enseñada y falta una iteración resuelta. |
| 3.6 | D3, C11–C12: flags, deduplicación y contexto de tests; falta un comando y una salida estructurada ejemplificados. |
| 4.1 | D4, P01–P02: criterios y categorías ruidosas; P02 introduce desactivar una categoría sin ejemplo previo en conceptos. |
| 4.2 | D4, P03–P04: propósito explicado; faltan pares few-shot resueltos, R3. |
| 4.3 | D4, P05–P06 y práctica 01: null/tipos/evidencia locales; esquema de herramienta y configuración concreta parciales. |
| 4.4 | D4, P07–P08 y práctica 01: errores específicos; no ejecuta un ciclo de autocorrección ni muestra detected_pattern. |
| 4.5 | D4, P09–P10: elección general y custom_id; ventana, SLA y límite multivuelta pendientes, R3. |
| 4.6 | D4/D1, P11–P12: independencia y pasadas conceptuales, con criterios razonables. |
| 5.1 | D5, R01–R02 y práctica 04: hechos, referencias y filtrado local; atención posicional explicada de forma breve. |
| 5.2 | D5, R03–R04: identidad/política/humano en el banco; distinguir petición explícita y frustración debería aparecer antes en conceptos. |
| 5.3 | D5, R05 y práctica 04: fallos parciales preservados; faltan intentos y alternativas en el ejemplo de estado. |
| 5.4 | D5, R06 y práctica 04: manifiesto y revalidación; no hay crash/resume real, limitación reconocida. |
| 5.5 | D5, R07–R08 y práctica 04: tasas por segmento y muestra de alta confianza locales; no estima todavía un umbral calibrado. |
| 5.6 | D5, R09 y práctica 04: fechas, fuentes y conflictos; representación por tipo de contenido y reconciliación metodológica poco desarrolladas. |

Los seis contextos oficiales están presentes en el banco: soporte, código, investigación, productividad, CI y extracción. La mayor continuidad práctica corresponde a recuerdos/extracción y autorización. Los otros contextos necesitan algunos ejemplos con datos o artefactos propios; el caso final de contratos contribuye a la transferencia, pero no reemplaza la enseñanza anterior.

## Roadmap y método

El reparto suma **60 h**, en **20 sesiones de 3 h**, con **15 h por semana**. Las 46 h asignadas a D1–D5 guardan proporciones próximas a 27/18/20/20/15. El orden fundamentos → extracción → herramientas → orquestación/configuración → fiabilidad es defendible para alguien que ya construyó aplicaciones con Claude. Introducir primero patrones y bucles de D1 y volver después de D2 es razonable, aunque conviene indicar qué apartados de D1 leer en cada visita.

Las 60 h son factibles como preparación focalizada con tutor y lectura selectiva; no como consumo completo de la biblioteca o de todos los cursos. El roadmap lo reconoce. Falta concretar para cada sesión dos o tres secciones de lectura, el ejemplo resuelto y el ejercicio que ocupa el bloque: esto evita que el alumno tenga que escoger entre cientos de páginas o que el tutor improvise lo que R3 detecta. Los ejemplos adicionales deben reemplazar parte de la lectura genérica, manteniendo el presupuesto. Conservar los márgenes de refuerzo y no rebajar umbrales para terminar en cuatro semanas.

El método español → ejemplo → práctica → preguntas → inglés está expresamente protegido en LEEME, AGENTS y roadmap. Los 18 cierres cubren M0 y los cinco dominios. La exigencia de explicar sin perfección gramatical es apropiada. La principal brecha no es la intención del método, sino la falta de ejemplos aplicados en varias lecciones antes de llegar a las preguntas.

## Optional

- **O1 — Facilitar el inglés inicial y evitar respuestas visibles por accidente.** `preguntas/cierre-ingles.md` sitúa cada respuesta inmediatamente debajo de la pregunta, aunque pide no abrirla. Separarlas en otro archivo o usar secciones plegables, enlazar el glosario desde el inicio y añadir 2–3 estructuras de frase por dominio ayudaría sin asumir dominio previo del inglés. El tutor puede retirar esas ayudas gradualmente. La evaluación completa en inglés sigue pendiente; el paquete lo declara y no debe presentarla como ya practicada.
- **O2 — Hacer legibles las soluciones para aprender.** Los ejemplos contienen numerosas declaraciones y condiciones en una sola línea, con pocos comentarios. Separar etapas y explicar una decisión importante por función haría más fácil estudiar validación, errores y estado. No hace falta abstraer ni añadir librerías.
- **O3 — Delimitar qué datos puede filtrar el recuperador.** `buildContext` filtra `claims` por fuente, pero copia `facts`, `pending` y `errors` sin procedencia. Es correcto para el fixture donde facts solo contiene caseId; no demuestra eliminación de todos los hechos derivados de fuentes cuyo permiso cambió. Declarar ese supuesto o añadir procedencia si se amplía el ejercicio. Del mismo modo, valores distintos agrupados por `field` son candidatos a conflicto, no prueba de contradicción cuando se refieren a periodos diferentes.

## Aspectos bien sustentados

- La separación entre identidad confiable y argumentos del modelo, el rechazo de `approved:true` como autorización y las pruebas de lectura ajena/sellada son buenas decisiones educativas.
- Se distingue `isError` de MCP de `is_error` de Messages API, así como validación TypeScript de validación en ejecución, estructura de verdad y corte de éxito.
- Se explica que Agent SDK puede administrar su propio bucle; práctica 03 se etiqueta como patrón conceptual de Messages API. No se finge una conexión a esos servicios.
- Las prácticas son locales, sin dependencias añadidas, claves ni peticiones de API. Los ejemplos de configuración están inactivos y las cifras de pruebas no se presentan como dominio del alumno.
- La biblioteca distingue corpus publicado, páginas individuales y páginas públicas de cursos. No promete vídeos o quizzes offline ni acceso universal a contenidos autenticados. Los límites de la captura y la atribución están documentados.
- Las metas 80/85% se identifican como pedagógicas. No se convierten a 720/1000 ni se garantiza certificación. El proyecto integrador incluye controles críticos que no se compensan con una media alta.
- Se respetan TypeScript, presupuesto limitado, Foundations primero e inscripción diferida. No es necesario añadir trámites de partner para cerrar estos hallazgos.

## Verificación y límites de esta revisión

Ejecuté `node scripts/ejecutar-practicas.mjs`: **46 comprobaciones pasaron** (10/11/9/10/6). Leí la versión corregida de práctica 01, que ya rechaza una categoría array; no repito ese defecto como pendiente. No ejecuté `tsc` ni una integración externa. Los dos probes de R4 se ejecutaron en memoria mediante importación de las funciones existentes y reprodujeron los resultados descritos sin modificar sus fuentes.

Comprobé por programa los 60 reactivos: **60 claves coherentes** con las opciones del banco, **60 claves predecibles** por el patrón descrito, **60 enunciados idénticos** al campo de examen del banco y **60 juegos de opciones idénticos** después de ignorar el orden. Revisé el contenido de los 60 Q&A, 18 cierres, cinco prácticas, lecciones, roadmap, reglas, matriz y documentos de evaluación. La guía y sus 30 tareas se utilizaron para contrastar subhabilidades; no se copiaron sus preguntas de muestra al informe.

La evidencia de Codebase Memory se trató como **Verify**. Confirmé el proyecto `C-Users-manue-Documents-Codex-2026-11-04-t`, estado ready, 2 nodos/1 arista y generación `2026-11-04T21:13:09Z`. La búsqueda suministrada por el padre no había encontrado símbolos del paquete. Mi `check_index_coverage` de 44 rutas y cuatro scopes devolvió los archivos existentes como `not_tracked`, sin entradas en los scopes y `has_more:false`; no implica cobertura completa. Usé lectura directa de fuentes y búsquedas de texto acotadas para esta revisión. No inventé relaciones de llamadas ni usé el grafo vacío como prueba de ausencia.

No repetí la comprobación de los 407 hashes ni audité semánticamente las 407 fuentes: el padre aportó la verificación de integridad y descargas. Contrasté las fuentes locales pertinentes, incluida la discrepancia de skills, pero no certifico que todos los enlaces externos o servicios permanezcan iguales. Tampoco se ha evaluado al alumno, calibrado la dificultad con candidatos, ejecutado Claude Code, medido un modelo real o probado un servidor MCP. Estas limitaciones no impiden corregir los problemas locales identificados.

**Orden recomendado de corrección:** R1 y R2; después R4; completar R3 con ejemplos y mapa honesto; finalmente fortalecer R5 y comprobar de nuevo claves, explicaciones y enlaces afectados. No es necesario reconstruir la biblioteca ni cambiar la duración del plan.
