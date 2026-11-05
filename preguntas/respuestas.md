# Respuestas razonadas del banco

Estas respuestas explican la decisión y un error frecuente. Se pueden estudiar directamente cuando se necesite una explicación, pero una repetición memorizada no demuestra transferencia a un caso nuevo.

## Dominio 1

### A01 · tarea 1.1

**Pregunta:** ¿Qué mantiene en marcha un bucle de herramientas y cómo finaliza normalmente?

**Respuesta:** Inspeccionar stop_reason: tool_use exige ejecutar las llamadas autorizadas, devolver sus resultados y continuar; end_turn termina ese turno. Después se comprueba si el resultado de negocio solicitado quedó satisfecho. El texto narrativo no es el protocolo de control.

**Error frecuente:** Tomar «listo» o cualquier texto como prueba de que no quedan llamadas.

Fuentes: [TOOL-RESULTS](../biblioteca/api/agents-and-tools/tool-use/handle-tool-calls.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

### A02 · tarea 1.1

**Pregunta:** ¿Qué debe conservarse al devolver los resultados de varias herramientas?

**Respuesta:** Conservar los bloques del asistente que solicitaron las herramientas y devolver un tool_result por llamada, enlazado al tool_use_id correcto. Un fallo se representa explícitamente, sin perder la relación entre solicitud y observación. Las llamadas independientes pueden resolverse concurrentemente.

**Error frecuente:** Responder solo con un resumen sin identificadores o perder la llamada original.

Fuentes: [TOOL-RESULTS](../biblioteca/api/agents-and-tools/tool-use/handle-tool-calls.md).

### A03 · tarea 1.1

**Pregunta:** ¿Qué dos distinciones importan al añadir un límite de ejecución?

**Respuesta:** La terminación normal utiliza el estado de protocolo; el límite es una protección secundaria. Alcanzar un límite no prueba éxito: debe producir un resultado incompleto o un handoff con lo logrado y lo pendiente. Así se acota el trabajo sin falsificar su finalización.

**Error frecuente:** Usar un número fijo de vueltas como única definición de tarea completada.

Fuentes: [AGENTS](../biblioteca/engineering/building-effective-agents.html) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

### A04 · tarea 1.2

**Pregunta:** ¿Qué responsabilidad conserva un coordinador frente a sus especialistas?

**Respuesta:** Determina alcance, elige especialistas, distribuye trabajo, agrega resultados y detecta lagunas. Centraliza la coordinación y recuperación para mantener visibilidad. No necesita invocar a todos los especialistas para una solicitud simple ni realizar él mismo todo el trabajo especializado.

**Error frecuente:** Confundir coordinación con ejecutar siempre una cadena rígida de todos los agentes.

Fuentes: [AGENTS](../biblioteca/engineering/building-effective-agents.html) · [SDK-SUBAGENTS](../biblioteca/code/agent-sdk/subagents.md).

### A05 · tarea 1.2

**Pregunta:** ¿Cómo se evitan duplicación y lagunas en investigación multiagente?

**Respuesta:** Asignar alcances distinguibles, como subtemas o tipos de fuente, y exigir un resultado con evidencia y límites. El coordinador contrasta el conjunto con el objetivo y vuelve a delegar lagunas concretas. La ausencia de duplicados no demuestra por sí sola cobertura suficiente.

**Error frecuente:** Repartir por igual páginas sin comprobar qué preguntas quedaron sin investigar.

Fuentes: [AGENTS](../biblioteca/engineering/building-effective-agents.html) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

### A06 · tarea 1.3

**Pregunta:** ¿Qué contexto necesita recibir un subagente?

**Respuesta:** Objetivo, restricciones, información previa necesaria y contrato de devolución. No debe suponerse que hereda automáticamente la conversación o memoria del coordinador. Una síntesis necesita los hallazgos y sus fuentes, no solo la instrucción «continúa con lo anterior».

**Error frecuente:** Confiar en una memoria compartida implícita entre invocaciones.

Fuentes: [SDK-SUBAGENTS](../biblioteca/code/agent-sdk/subagents.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

### A07 · tarea 1.3

**Pregunta:** ¿Cómo se expresa una delegación que permita adaptación controlada?

**Respuesta:** Dar meta, alcance, criterios de calidad, capacidades permitidas y forma del resultado. El especialista puede adaptar su investigación dentro de esos límites. Una receta excesivamente detallada puede impedir seguir un hallazgo relevante; una meta sin límites puede ampliar demasiado el trabajo.

**Error frecuente:** Elegir entre libertad total y una lista rígida sin resultados verificables.

Fuentes: [SDK-SUBAGENTS](../biblioteca/code/agent-sdk/subagents.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

### A08 · tarea 1.3

**Pregunta:** ¿Qué dos condiciones hacen adecuada la ejecución paralela de subagentes?

**Respuesta:** Que sus tareas no dependan de resultados aún desconocidos de otro especialista y que el coordinador pueda reunir resultados atribuibles bajo límites de trabajo. Emitir varias invocaciones en el mismo turno evita rondas seriales innecesarias. El paralelismo no elimina dependencias reales.

**Error frecuente:** Paralelizar una síntesis que necesita resultados todavía no producidos.

Fuentes: [SDK-SUBAGENTS](../biblioteca/code/agent-sdk/subagents.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

### A09 · tarea 1.4

**Pregunta:** ¿Dónde se garantiza un prerrequisito de una acción con efectos?

**Respuesta:** En el control programático previo a su ejecución y, cuando corresponda, en el servicio que aplica la regla. El prompt comunica la política, pero no sustituye ese control. La autorización debe vincular identidad y alcance, no un booleano que el modelo pueda declarar.

**Error frecuente:** Confundir una instrucción clara con una garantía determinista.

Fuentes: [HOOKS](../biblioteca/code/hooks.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

### A10 · tarea 1.4

**Pregunta:** ¿Qué contiene un handoff que otro operador pueda utilizar?

**Respuesta:** Identidad y hechos verificados, motivo del traspaso, intentos, resultados, decisiones pendientes y recomendación con evidencia. El receptor puede no tener acceso al historial. Se deben conservar incertidumbres y evitar presentar como completado un paso que solo fue propuesto.

**Error frecuente:** Enviar únicamente el historial completo o una frase como «no pude».

Fuentes: [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

### A11 · tarea 1.5

**Pregunta:** ¿Cuándo usar un hook previo y cuándo uno posterior?

**Respuesta:** El previo inspecciona o bloquea una llamada antes de su efecto; el posterior trata su resultado, por ejemplo normalizando fechas. Un hook posterior no equivale a prevenir lo que ya ocurrió. Hay que comprobar el evento y la interfaz de la versión del SDK o cliente utilizada.

**Error frecuente:** Usar una auditoría posterior como barrera preventiva.

Fuentes: [HOOKS](../biblioteca/code/hooks.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

### A12 · tarea 1.5

**Pregunta:** ¿Qué demuestra que una política implementada en un hook funciona?

**Respuesta:** Casos permitidos y denegados con efectos observables, incluyendo argumentos que intenten saltarse el requisito. La prueba debe mostrar que la ejecución prohibida no ocurre. Ver una advertencia en el texto no basta, y un hook sobre una vía no demuestra cobertura de otras vías.

**Error frecuente:** Comprobar solo la explicación del modelo o un caso permitido.

Fuentes: [HOOKS](../biblioteca/code/hooks.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

### A13 · tarea 1.6

**Pregunta:** ¿Cómo se elige descomposición fija o adaptativa?

**Respuesta:** Usar pasos fijos cuando la tarea se descompone de manera predecible; adaptar cuando la siguiente investigación depende de los hallazgos. La elección responde a las dependencias y criterios de éxito. Un flujo puede contener una llamada LLM sin convertirse en un agente autónomo.

**Error frecuente:** Elegir autonomía porque el sistema usa IA, sin analizar el trabajo.

Fuentes: [AGENTS](../biblioteca/engineering/building-effective-agents.html) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

### A14 · tarea 1.6

**Pregunta:** ¿Por qué separar revisión local de revisión de integración?

**Respuesta:** La pasada local concentra atención en cada archivo; la de integración sigue contratos y flujos que cruzan archivos. Así se pueden detectar defectos que ninguna revisión aislada ve. Agregar comentarios locales no produce automáticamente un análisis del comportamiento conjunto.

**Error frecuente:** Suponer que revisar cada archivo elimina la necesidad de comprobar interacciones.

Fuentes: [AGENTS](../biblioteca/engineering/building-effective-agents.html) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

### A15 · tarea 1.7

**Pregunta:** ¿Cuándo reanudar y cuándo empezar con un resumen nuevo?

**Respuesta:** Reanudar si la mayor parte del estado sigue siendo válida y se comunican cambios relevantes. Si los resultados previos están ampliamente obsoletos, comenzar con un resumen estructurado y referencias verificadas puede ser más fiable. En ambos casos se distingue estado observado de intención.

**Error frecuente:** Reanudar sin advertir cambios y tratar herramientas antiguas como evidencia actual.

Fuentes: [SESSIONS](../biblioteca/code/sessions.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

### A16 · tarea 1.7

**Pregunta:** ¿Para qué sirve un fork de sesión y qué no demuestra?

**Respuesta:** Permite explorar alternativas desde una base compartida conservando ramas independientes. Cada rama necesita evidencias y sus decisiones no se fusionan por arte de magia. El fork no convierte una hipótesis en un cambio aplicado ni vuelve actuales los resultados heredados.

**Error frecuente:** Confundir explorar una alternativa con aplicarla al estado principal.

Fuentes: [SESSIONS](../biblioteca/code/sessions.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## Dominio 2

### T01 · tarea 2.1

**Pregunta:** ¿Qué información diferencia dos herramientas parecidas?

**Respuesta:** Su propósito, condiciones de uso, formato de entradas, identificadores, límites y resultado. Los ejemplos deben resolver confusiones reales. También hay que revisar instrucciones generales que asocien palabras a herramientas incorrectas. El nombre corto por sí solo no corrige un contrato ambiguo.

**Error frecuente:** Corregir fallos de selección solo con temperatura o reintentos.

Fuentes: [TOOLS](../biblioteca/api/agents-and-tools/tool-use/define-tools.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

### T02 · tarea 2.1

**Pregunta:** ¿Cómo decidir entre separar y consolidar herramientas?

**Respuesta:** Comparar claridad de selección, número de opciones, contratos y efectos. Separar capacidades con usos o permisos distintos puede aclarar el sistema; agrupar operaciones estrechamente relacionadas puede reducir opciones redundantes. No hay una regla de que siempre más o siempre menos sea mejor.

**Error frecuente:** Aplicar una regla universal sin observar ambigüedad ni permisos.

Fuentes: [TOOLS](../biblioteca/api/agents-and-tools/tool-use/define-tools.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

### T03 · tarea 2.2

**Pregunta:** ¿Qué diferencia hay entre resultado vacío y fallo de acceso?

**Respuesta:** Vacío significa que una consulta válida no encontró coincidencias. Un fallo de acceso significa que no se pudo obtener la evidencia. Preservar esta diferencia permite decidir si pedir permisos, recuperar el servicio o aceptar que no hubo resultados.

**Error frecuente:** Ocultar timeouts y permisos denegados como una lista vacía exitosa.

Fuentes: [TOOL-RESULTS](../biblioteca/api/agents-and-tools/tool-use/handle-tool-calls.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

### T04 · tarea 2.2

**Pregunta:** ¿Qué campos internos ayudan a recuperarse de un error?

**Respuesta:** Categoría, posibilidad de reintento, descripción, operación intentada y resultados parciales. El formato se normaliza para la aplicación. MCP isError y API is_error pertenecen a interfaces distintas; no se deben intercambiar ciegamente.

**Error frecuente:** Devolver solo «operación fallida» y repetir cualquier categoría.

Fuentes: [TOOL-RESULTS](../biblioteca/api/agents-and-tools/tool-use/handle-tool-calls.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

### T05 · tarea 2.2

**Pregunta:** ¿Qué dos principios rigen la recuperación en un especialista?

**Respuesta:** Intentar recuperación transitoria acotada cerca del fallo y elevar lo no resuelto con intentos y resultados parciales. La política o autorización denegada requiere otra decisión, no reintentos idénticos. El coordinador necesita información para elegir una alternativa.

**Error frecuente:** Terminar todo ante un primer timeout o esconder el fallo para seguir.

Fuentes: [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

### T06 · tarea 2.3

**Pregunta:** ¿Qué diferencia hay entre auto, any y forzar una herramienta?

**Respuesta:** auto permite decidir si usar herramientas; any exige usar alguna de las disponibles; una selección forzada identifica una herramienta específica. Estas opciones orientan el protocolo, pero no sustituyen autorización ni garantizan corrección semántica.

**Error frecuente:** Creer que any significa una herramienta concreta o permiso para cualquier acción.

Fuentes: [TOOLS](../biblioteca/api/agents-and-tools/tool-use/define-tools.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

### T07 · tarea 2.3

**Pregunta:** ¿Cómo acotar herramientas sin introducir rondas innecesarias?

**Respuesta:** Dar a cada rol las capacidades que necesita. Si un especialista requiere verificaciones simples muy frecuentes, una herramienta limitada puede resolverlas localmente; la investigación compleja sigue la coordinación prevista. La excepción debe justificarse por evidencia de uso y límites.

**Error frecuente:** Dar todo el arsenal al sintetizador o prohibir incluso una verificación acotada útil.

Fuentes: [TOOLS](../biblioteca/api/agents-and-tools/tool-use/define-tools.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

### T08 · tarea 2.4

**Pregunta:** ¿Dónde guardar configuración MCP compartida y credenciales?

**Respuesta:** El temario usa .mcp.json de proyecto para servidores compartidos y configuración personal para experimentos individuales. Referenciar secretos mediante variables del entorno, sin incorporarlos al repositorio ni al prompt. Validar el ámbito y comportamiento en la versión del cliente.

**Error frecuente:** Poner tokens en un archivo versionado o creer que la configuración personal se comparte.

Fuentes: [MCP-CODE](../biblioteca/code/mcp.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

### T09 · tarea 2.4

**Pregunta:** ¿Cuándo un catálogo es un recurso y qué no decide MCP?

**Respuesta:** Un catálogo direccionable puede exponerse como resource; búsquedas y operaciones pueden necesitar tools. El host coordina clientes y servidores. El protocolo facilita intercambio, pero la aplicación y servicios conservan la responsabilidad de permisos y del uso del modelo.

**Error frecuente:** Interpretar el descubrimiento de una capacidad como autorización automática.

Fuentes: [MCP](../biblioteca/mcp/docs/2026-07-28/learn/architecture.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

### T10 · tarea 2.5

**Pregunta:** ¿Cómo elegir Grep, Glob y Read?

**Respuesta:** Grep busca texto o patrones en el contenido, Glob selecciona rutas por nombre y Read obtiene contenido para inspección. Conviene orientar la búsqueda y después leer candidatos. En un proyecto con descubrimiento por grafo obligatorio se respeta primero esa regla y se usa texto como respaldo.

**Error frecuente:** Usar una herramienta de rutas para buscar semántica del contenido o leer todo primero.

Fuentes: [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

### T11 · tarea 2.5

**Pregunta:** ¿Qué hacer si una edición por ancla no encuentra una coincidencia única?

**Respuesta:** Volver a leer el estado actual, localizar un contexto inequívoco y editar sobre esa evidencia. Si se sustituye un archivo completo, preservar el contenido y cambios ajenos. No aplicar una modificación sobre líneas supuestas de una versión anterior.

**Error frecuente:** Reintentar sobre una posición inventada o sobrescribir sin leer.

Fuentes: [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## Dominio 3

### C01 · tarea 3.1

**Pregunta:** ¿Por qué un compañero nuevo no recibe las instrucciones del equipo?

**Respuesta:** Puede que estén en un ámbito personal en lugar del proyecto. Las instrucciones compartidas deben versionarse donde el cliente las cargue para ese proyecto. Después hay que verificar los archivos realmente cargados y posibles instrucciones de ámbito más específico.

**Error frecuente:** Suponer que el archivo personal de un desarrollador se distribuye al equipo.

Fuentes: [MEMORY](../biblioteca/code/memory.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

### C02 · tarea 3.1

**Pregunta:** ¿Cómo organizar instrucciones extensas y comprobar su carga?

**Respuesta:** Mantener un núcleo breve y separar reglas o importaciones relevantes por ámbito. Inspeccionar memoria/contexto cargado mediante la interfaz de la versión usada. Que un archivo exista no prueba que esa sesión lo haya leído, ni que sus instrucciones se impongan como un permiso técnico.

**Error frecuente:** Verificar solo la existencia del archivo y asumir que siempre tiene efecto.

Fuentes: [MEMORY](../biblioteca/code/memory.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

### C03 · tarea 3.2

**Pregunta:** ¿Cuándo una instrucción pertenece a CLAUDE.md y cuándo a una skill?

**Respuesta:** Una regla que debe acompañar el trabajo habitual encaja en instrucciones de proyecto. Un procedimiento específico invocable bajo demanda encaja en una skill. El ámbito determina si es personal o compartido. La guía también incluye comandos personalizados; contrastar su relación con skills en la versión actual.

**Error frecuente:** Cargar todos los procedimientos extensos siempre o confiar en un comando privado para un flujo de equipo.

Fuentes: [SKILLS](../biblioteca/code/skills.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

### C04 · tarea 3.2

**Pregunta:** ¿Cómo distinguir aislamiento de contexto, preaprobación y restricción de herramientas?

**Respuesta:** context: fork separa el contexto de ejecución. En la documentación de skills de noviembre, allowed-tools preaprueba llamadas y no restringe el conjunto disponible; disallowed-tools y reglas deny sirven para restricciones. Los subagentes usan campos distintos, como tools y disallowedTools. La guía de julio describe la opción de otra manera: hay que conservar esa diferencia de versión. Ningún frontmatter sustituye autorización del servicio.

**Error frecuente:** Tomar el frontmatter como garantía completa de autorización externa.

Fuentes: [SKILLS](../biblioteca/code/skills.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

### C05 · tarea 3.3

**Pregunta:** ¿Cuándo usar reglas condicionadas por rutas?

**Respuesta:** Cuando una convención se aplica a un conjunto de archivos identificable por patrón, incluso si están en carpetas distintas. El frontmatter paths debe expresar ese alcance. Una regla sin condición adecuada puede cargar donde no corresponde o no aplicarse a los archivos esperados.

**Error frecuente:** Copiar instrucciones en muchas carpetas para una convención transversal.

Fuentes: [MEMORY](../biblioteca/code/memory.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

### C06 · tarea 3.3

**Pregunta:** ¿Cómo comprobar una regla de rutas?

**Respuesta:** Probar archivos que deben coincidir y archivos que deben quedar fuera, e inspeccionar la carga real. Un patrón plausible no prueba la intención. Las reglas heredadas por carpeta y los patrones transversales tienen alcances distintos y se eligen según la distribución del código.

**Error frecuente:** Comprobar un caso positivo y asumir que no hay coincidencias excesivas.

Fuentes: [MEMORY](../biblioteca/code/memory.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

### C07 · tarea 3.4

**Pregunta:** ¿Qué indica que conviene planificar antes de ejecutar?

**Respuesta:** Decisiones arquitectónicas, alcance amplio, dependencias desconocidas o alternativas con efectos distintos. La planificación busca evidencia y produce una secuencia comprobable. Una corrección clara y pequeña puede ejecutarse directamente; el modo no se elige solo por contar archivos.

**Error frecuente:** Planificar toda acción trivial o ejecutar una migración amplia sin investigar.

Fuentes: [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

### C08 · tarea 3.4

**Pregunta:** ¿Cómo preservar contexto durante una fase de descubrimiento?

**Respuesta:** Investigar preguntas delimitadas, usar resultados estructurados y resumir hallazgos antes de la siguiente fase. Un especialista de exploración puede aislar salidas voluminosas. El coordinador conserva las decisiones y referencias; no necesita todas las trazas crudas en cada turno.

**Error frecuente:** Volcar todo el repositorio en la conversación principal.

Fuentes: [SUBAGENTS](../biblioteca/code/sub-agents.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

### C09 · tarea 3.5

**Pregunta:** ¿Qué información permite mejorar una transformación inconsistente?

**Respuesta:** Ejemplos concretos de entrada y salida esperada que aclaren la distinción problemática, más casos de borde. Un fallo reproducible permite contrastar el cambio. Los ejemplos deben enseñar el criterio, no solo una apariencia que se pueda copiar sin comprender.

**Error frecuente:** Repetir «hazlo mejor» sin evidencia de qué está fallando.

Fuentes: [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

### C10 · tarea 3.5

**Pregunta:** ¿Cómo tratar varios problemas que interactúan?

**Respuesta:** Explicar los síntomas, su relación y los criterios conjuntos ayuda a evitar arreglos incompatibles. Para problemas independientes conviene separar cambios y verificación. Conservar pruebas valiosas y compartir fallos específicos resulta más informativo que una afirmación genérica de que nada funciona.

**Error frecuente:** Resolver síntomas relacionados con instrucciones aisladas que se contradicen.

Fuentes: [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

### C11 · tarea 3.6

**Pregunta:** ¿Qué necesita una ejecución de Claude Code en CI?

**Respuesta:** Modo no interactivo como -p/--print y un contrato de salida procesable, con contexto y permisos adecuados. La guía incluye --output-format json y --json-schema. Una salida JSON requiere además comprobar sus campos y el resultado del proceso; no se omiten permisos por automatizar.

**Error frecuente:** Usar el modo interactivo o asumir que cualquier texto puede publicarse como hallazgo.

Fuentes: [CLI](../biblioteca/code/cli-reference.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

### C12 · tarea 3.6

**Pregunta:** ¿Cómo reducir duplicados en revisiones y tests generados?

**Respuesta:** Aportar hallazgos previos, commits nuevos y estado de resolución para reportar lo nuevo o aún pendiente. Para tests, dar casos y fixtures existentes y criterios de valor. Filtrar por coincidencia de texto no basta si el mismo problema cambia de redacción o ubicación.

**Error frecuente:** Reiniciar cada revisión sin contexto y publicar todo otra vez.

Fuentes: [CLI](../biblioteca/code/cli-reference.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## Dominio 4

### P01 · tarea 4.1

**Pregunta:** ¿Qué hace precisos los criterios de una revisión?

**Respuesta:** Definir problemas reportables, condiciones de severidad, evidencia necesaria y qué queda fuera. Un umbral subjetivo de confianza no reemplaza una definición del defecto. Los hallazgos deben indicar comportamiento afectado y una acción concreta, con lugar comprobable.

**Error frecuente:** Pedir solo «problemas importantes» o filtrar toda incertidumbre sin criterio.

Fuentes: [PROMPTS](../biblioteca/api/build-with-claude/prompt-engineering/overview.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

### P02 · tarea 4.1

**Pregunta:** ¿Cómo recuperar confianza ante una categoría con muchos falsos positivos?

**Respuesta:** Medir los patrones de error y mejorar criterios y ejemplos para esa categoría. Puede desactivarse temporalmente su publicación mientras se corrige, con evaluación antes de reintroducirla. Esto no equivale a ocultar defectos de otras categorías ni a debilitar pruebas para aparentar calidad.

**Error frecuente:** Reducir todos los controles o mantener ruido sin investigar su causa.

Fuentes: [PROMPTS](../biblioteca/api/build-with-claude/prompt-engineering/overview.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

### P03 · tarea 4.2

**Pregunta:** ¿Cómo seleccionar ejemplos few-shot?

**Respuesta:** Elegir casos que enseñen distinciones difíciles, formato esperado y decisiones frente a alternativas plausibles. Incluir un patrón aceptable que suele confundirse con un defecto puede reducir ruido. Verificar luego transferencia a casos distintos, sin limitarse a repetir ejemplos.

**Error frecuente:** Añadir muchos ejemplos redundantes que no atacan la ambigüedad.

Fuentes: [PROMPTS](../biblioteca/api/build-with-claude/prompt-engineering/overview.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

### P04 · tarea 4.2

**Pregunta:** ¿Qué dos comprobaciones evitan aprender solo el formato de los ejemplos?

**Respuesta:** Mostrar la distinción relevante y evaluar casos nuevos que cambien datos o estructura conservando el criterio. Los ejemplos deben cubrir formatos representativos. Obtener el mismo JSON en los ejemplos entrenados no prueba que el modelo extraiga bien un documento distinto.

**Error frecuente:** Medir consistencia solo sobre los mismos ejemplos usados para ajustar.

Fuentes: [PROMPTS](../biblioteca/api/build-with-claude/prompt-engineering/overview.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

### P05 · tarea 4.3

**Pregunta:** ¿Qué diferencia un campo opcional de uno obligatorio que admite null?

**Respuesta:** El opcional puede no estar presente; el obligatorio debe aparecer, pero puede aceptar null como valor desconocido si el esquema lo permite. Elegirlo según el contrato y la evidencia disponible evita forzar datos inventados para completar una estructura.

**Error frecuente:** Confundir ausencia de clave, null y un valor ficticio de relleno.

Fuentes: [STRUCTURED](../biblioteca/api/build-with-claude/structured-outputs.md) · [TOOLS](../biblioteca/api/agents-and-tools/tool-use/define-tools.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

### P06 · tarea 4.3

**Pregunta:** ¿Qué garantizan y qué no garantizan los esquemas de salida?

**Respuesta:** Restringen estructura y tipos bajo la interfaz y sus limitaciones. No prueban que los valores estén sustentados ni que la operación esté autorizada. Contrastar fuente y reglas semánticas, y manejar rechazos y salidas incompletas antes de consumir el objeto.

**Error frecuente:** Convertir validez de JSON en sinónimo de verdad o aprobación de negocio.

Fuentes: [STRUCTURED](../biblioteca/api/build-with-claude/structured-outputs.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

### P07 · tarea 4.4

**Pregunta:** ¿Qué debe contener un intento de autocorrección útil?

**Respuesta:** El documento original, la salida que falló y errores de validación concretos. Si el dato existe pero su formato es incorrecto, la corrección puede servir. Si falta la fuente necesaria, se debe obtener evidencia o reconocer desconocimiento; repetir no recupera información inexistente.

**Error frecuente:** Reintentar sin señalar el fallo o esperar que aparezca un dato ausente.

Fuentes: [STRUCTURED](../biblioteca/api/build-with-claude/structured-outputs.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

### P08 · tarea 4.4

**Pregunta:** ¿Cómo preservar una contradicción detectada?

**Respuesta:** Conservar valores originales, cálculo o evidencia alternativa y una marca de conflicto con procedencia. Esto permite revisar la causa. Corregir silenciosamente un valor puede borrar información relevante y confundir al consumidor sobre qué decía realmente el documento.

**Error frecuente:** Sustituir el valor declarado por el calculado sin registrar el desacuerdo.

Fuentes: [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

### P09 · tarea 4.5

**Pregunta:** ¿Cuándo es apropiado procesar en lotes?

**Respuesta:** Cuando el trabajo tolera la ventana asíncrona de procesamiento y no bloquea una acción inmediata. Comparar esa tolerancia con el SLA, no con la rapidez de una ejecución de muestra. Los lotes son útiles para informes diferidos y extracción masiva preparada sobre una muestra.

**Error frecuente:** Migrar procesos interactivos a lotes solo por una ventaja económica.

Fuentes: [BATCH](../biblioteca/api/build-with-claude/batch-processing.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

### P10 · tarea 4.5

**Pregunta:** ¿Cómo recuperar un lote parcialmente fallido?

**Respuesta:** Correlacionar solicitudes y resultados mediante custom_id, conservar éxitos y modificar o reintentar solo los fallos recuperables. Si un documento excedió contexto, adaptar su tratamiento antes de reenviarlo. El orden de llegada no sustituye la identidad del documento.

**Error frecuente:** Reenviar todo el lote o correlacionar resultados solo por posición.

Fuentes: [BATCH](../biblioteca/api/build-with-claude/batch-processing.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

### P11 · tarea 4.6

**Pregunta:** ¿Por qué separar el contexto del revisor del del generador?

**Respuesta:** Un revisor independiente puede contrastar requisitos y artefacto sin heredar la justificación persuasiva del generador. Debe recibir evidencia suficiente, no empezar a ciegas. La independencia reduce un sesgo posible, pero no garantiza detección completa ni elimina comprobaciones.

**Error frecuente:** Dar al revisor toda la defensa del generador como criterio de corrección.

Fuentes: [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

### P12 · tarea 4.6

**Pregunta:** ¿Cómo se usa confianza en una revisión de varias pasadas?

**Respuesta:** Puede ayudar a priorizar verificación si se contrasta con datos etiquetados y evidencia. Las pasadas locales e integración cubren problemas distintos. La coincidencia literal entre revisores no es una prueba general de corrección y puede suprimir hallazgos reales poco frecuentes.

**Error frecuente:** Aceptar automáticamente un hallazgo por confianza alta o unanimidad de redacción.

Fuentes: [EVALS](../biblioteca/engineering/demystifying-evals.html) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## Dominio 5

### R01 · tarea 5.1

**Pregunta:** ¿Qué información debe sobrevivir a un resumen de una conversación larga?

**Respuesta:** Objetivo, restricciones, hechos críticos, decisiones, fuentes, estado comprobado y trabajo pendiente. Datos como identificadores, cantidades y fechas pueden conservarse en un bloque estructurado separado. El resumen debe mantener incertidumbres y permitir recuperar la evidencia original.

**Error frecuente:** Reducir todo a la última respuesta o convertir acciones intentadas en completadas.

Fuentes: [CONTEXT](../biblioteca/engineering/effective-context-engineering.html) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

### R02 · tarea 5.1

**Pregunta:** ¿Cómo reducir resultados de herramientas sin perder utilidad?

**Respuesta:** Seleccionar campos relevantes y conservar referencias estables, fuente y fecha cuando importen. Un resumen inicial y secciones claras orientan la síntesis. El detalle puede recuperarse bajo demanda; no se deben eliminar conflictos o límites para que la salida parezca completa.

**Error frecuente:** Recortar por posición sin mirar qué hechos necesita la siguiente decisión.

Fuentes: [CONTEXT](../biblioteca/engineering/effective-context-engineering.html) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

### R03 · tarea 5.2

**Pregunta:** ¿Cómo responder a una petición explícita de atención humana?

**Respuesta:** Respetar la preferencia y realizar el handoff previsto sin obligar al usuario a agotar una investigación automática. Esto se distingue de una expresión de frustración sin esa petición, donde se puede ofrecer ayuda dentro de capacidad y política. El criterio debe ser explícito.

**Error frecuente:** Confundir frustración con una solicitud inequívoca o ignorar esta última para mejorar una métrica.

Fuentes: [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

### R04 · tarea 5.2

**Pregunta:** ¿Qué hacer si hay varias identidades posibles o una política no cubre el caso?

**Respuesta:** Pedir un identificador adicional para resolver coincidencias ambiguas y escalar lagunas de política según el procedimiento. No escoger a una persona por probabilidad ni inventar una regla. La siguiente acción depende del tipo de incertidumbre, no de una instrucción genérica de ser autónomo.

**Error frecuente:** Usar la primera coincidencia o extender una política por analogía sin autorización.

Fuentes: [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

### R05 · tarea 5.3

**Pregunta:** ¿Cómo informar una síntesis con una fuente inaccesible?

**Respuesta:** Conservar resultados verificados y declarar la laguna, causa e intentos realizados. El coordinador puede elegir una alternativa o presentar un resultado parcial. Una fuente que no pudo consultarse no demuestra que no exista información en ella.

**Error frecuente:** Afirmar cobertura exhaustiva o inventar lo que habría dicho la fuente.

Fuentes: [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

### R06 · tarea 5.4

**Pregunta:** ¿Qué hace recuperable una exploración tras una interrupción?

**Respuesta:** Un estado estructurado con objetivo, hallazgos, referencias, tareas completadas y pendientes, además de la revalidación del estado real al continuar. Un archivo de progreso ayuda, pero no prueba que un proceso siga ejecutándose. Los especialistas necesitan el contexto explícito al reanudarse.

**Error frecuente:** Confiar en la intención anterior o en un archivo que diga running.

Fuentes: [CONTEXT](../biblioteca/engineering/effective-context-engineering.html) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

### R07 · tarea 5.5

**Pregunta:** ¿Qué significa calibrar confianza y por qué hacerlo por segmentos?

**Respuesta:** Comparar la confianza declarada con aciertos observados en ejemplos etiquetados. Separar tipos de documento y campos revela errores ocultos en una media global. Un número alto emitido por el modelo no prueba una probabilidad real ni justifica por sí solo reducir revisión.

**Error frecuente:** Tratar confianza declarada como precisión medida.

Fuentes: [EVALS](../biblioteca/engineering/demystifying-evals.html) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

### R08 · tarea 5.5

**Pregunta:** ¿Por qué revisar también muestras de alta confianza?

**Respuesta:** Porque pueden contener errores sistemáticos no detectados por el propio modelo. Muestrear por estratos relevantes permite estimar error y encontrar patrones nuevos, mientras se prioriza revisión completa de casos de baja confianza o contradicción. No debe inferirse precisión de los casos que se eligieron por conveniencia.

**Error frecuente:** Medir solo lo que ya se enviaba a revisión y extrapolar a todo.

Fuentes: [EVALS](../biblioteca/engineering/demystifying-evals.html) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

### R09 · tarea 5.6

**Pregunta:** ¿Cómo preservar procedencia cuando fuentes y fechas discrepan?

**Respuesta:** Mantener relaciones entre afirmaciones y fuentes, ubicación, fecha del hecho y fecha de publicación cuando difieran. Conservar valores en conflicto y explicar su alcance metodológico o temporal. El coordinador puede reconciliar con una regla explícita; no promediar ni elegir el último resultado recuperado sin fundamento.

**Error frecuente:** Confundir fecha de recuperación con actualidad del hecho o borrar el desacuerdo.

Fuentes: [CONTEXT](../biblioteca/engineering/effective-context-engineering.html) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

