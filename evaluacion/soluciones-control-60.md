# Clave explicada del control integrador

Abrir después de responder. La clave se deriva de las opciones de cada reactivo y no sigue una secuencia de letras. Un punto por conjunto correcto, sin puntuación negativa.

## 01 · A · D1 / tarea 1.1

tool_use requiere procesar la llamada y devolver su observación; el texto no confirma una verificación. La acreditación sigue bloqueada hasta contar con el estado exigido.

**Por qué no las otras opciones:**

- B: Confunde la narración con evidencia del prerrequisito.
- C: Un registro sin ejecutar la verificación no satisface la condición previa.
- D: Pierde la llamada original y no aporta su observación.

Fuentes: [TOOL-RESULTS](../biblioteca/api/agents-and-tools/tool-use/handle-tool-calls.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 02 · A + B · D1 / tarea 1.1

El límite es un guardarraíl, no finalización exitosa. Se conservan resultados observados y la solicitud pendiente, sin inventar una respuesta de herramienta.

**Por qué no las otras opciones:**

- C: Borra la información necesaria para revalidar y recuperar el trabajo.
- D: Fabrica una observación y puede habilitar acciones que dependen de ella.

Fuentes: [AGENTS](../biblioteca/engineering/building-effective-agents.html) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 03 · D · D1 / tarea 1.4

Forzar una llamada ayuda a ordenar un turno, pero no prueba una verificación válida para otra identidad o acción. El gate debe comprobar el estado y alcance en el punto de ejecución.

**Por qué no las otras opciones:**

- A: Una explicación del modelo no es el resultado verificado del servicio.
- B: Un ejemplo guía comportamiento, pero no aplica un prerrequisito determinista.
- C: La cuenta o el estado pueden cambiar; la primera llamada no autoriza todo lo posterior.

Fuentes: [HOOKS](../biblioteca/code/hooks.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 04 · A · D1 / tarea 1.4

Identidad y hechos verificados, motivo del traspaso, intentos, resultados, decisiones pendientes y recomendación con evidencia. El receptor puede no tener acceso al historial. Se deben conservar incertidumbres y evitar presentar como completado un paso que solo fue propuesto.

**Error principal a evitar:** Enviar únicamente el historial completo o una frase como «no pude».

Fuentes: [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 05 · A · D1 / tarea 1.5

La conversión necesita unidades y semántica del proveedor. Conservar origen y valor original hace auditable la transformación; un código desconocido debe seguir siendo desconocido.

**Por qué no las otras opciones:**

- B: Eliminar zona o referencia temporal puede alterar el instante interpretado.
- C: No todos los números representan segundos; la unidad no se adivina por el tipo.
- D: La frecuencia no prueba equivalencia de un código que no está definido.

Fuentes: [HOOKS](../biblioteca/code/hooks.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 06 · B · D1 / tarea 1.5

Casos permitidos y denegados con efectos observables, incluyendo argumentos que intenten saltarse el requisito. La prueba debe mostrar que la ejecución prohibida no ocurre. Ver una advertencia en el texto no basta, y un hook sobre una vía no demuestra cobertura de otras vías.

**Error principal a evitar:** Comprobar solo la explicación del modelo o un caso permitido.

Fuentes: [HOOKS](../biblioteca/code/hooks.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 07 · C · D2 / tarea 2.1

Su propósito, condiciones de uso, formato de entradas, identificadores, límites y resultado. Los ejemplos deben resolver confusiones reales. También hay que revisar instrucciones generales que asocien palabras a herramientas incorrectas. El nombre corto por sí solo no corrige un contrato ambiguo.

**Error principal a evitar:** Corregir fallos de selección solo con temperatura o reintentos.

Fuentes: [TOOLS](../biblioteca/api/agents-and-tools/tool-use/define-tools.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 08 · B · D2 / tarea 2.2

Vacío significa que una consulta válida no encontró coincidencias. Un fallo de acceso significa que no se pudo obtener la evidencia. Preservar esta diferencia permite decidir si pedir permisos, recuperar el servicio o aceptar que no hubo resultados.

**Error principal a evitar:** Ocultar timeouts y permisos denegados como una lista vacía exitosa.

Fuentes: [TOOL-RESULTS](../biblioteca/api/agents-and-tools/tool-use/handle-tool-calls.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 09 · D · D2 / tarea 2.2

Éxito del transporte no equivale a éxito de la herramienta. El adaptador transforma la interfaz y conserva la categoría de fallo; MCP isError no se copia como campo de Messages API.

**Por qué no las otras opciones:**

- A: Marca éxito pese a la denegación de negocio.
- B: Confunde campos de dos interfaces y puede perder el indicador esperado.
- C: Una denegación no demuestra ausencia de coincidencias.

Fuentes: [TOOL-RESULTS](../biblioteca/api/agents-and-tools/tool-use/handle-tool-calls.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 10 · A + C · D2 / tarea 2.2

Intentar recuperación transitoria acotada cerca del fallo y elevar lo no resuelto con intentos y resultados parciales. La política o autorización denegada requiere otra decisión, no reintentos idénticos. El coordinador necesita información para elegir una alternativa.

**Error principal a evitar:** Terminar todo ante un primer timeout o esconder el fallo para seguir.

Fuentes: [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 11 · D · D4 / tarea 4.1

Definir problemas reportables, condiciones de severidad, evidencia necesaria y qué queda fuera. Un umbral subjetivo de confianza no reemplaza una definición del defecto. Los hallazgos deben indicar comportamiento afectado y una acción concreta, con lugar comprobable.

**Error principal a evitar:** Pedir solo «problemas importantes» o filtrar toda incertidumbre sin criterio.

Fuentes: [PROMPTS](../biblioteca/api/build-with-claude/prompt-engineering/overview.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 12 · B · D5 / tarea 5.1

Objetivo, restricciones, hechos críticos, decisiones, fuentes, estado comprobado y trabajo pendiente. Datos como identificadores, cantidades y fechas pueden conservarse en un bloque estructurado separado. El resumen debe mantener incertidumbres y permitir recuperar la evidencia original.

**Error principal a evitar:** Reducir todo a la última respuesta o convertir acciones intentadas en completadas.

Fuentes: [CONTEXT](../biblioteca/engineering/effective-context-engineering.html) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 13 · C · D5 / tarea 5.1

Seleccionar campos relevantes y conservar referencias estables, fuente y fecha cuando importen. Un resumen inicial y secciones claras orientan la síntesis. El detalle puede recuperarse bajo demanda; no se deben eliminar conflictos o límites para que la salida parezca completa.

**Error principal a evitar:** Recortar por posición sin mirar qué hechos necesita la siguiente decisión.

Fuentes: [CONTEXT](../biblioteca/engineering/effective-context-engineering.html) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 14 · B · D5 / tarea 5.2

Respetar la preferencia y realizar el handoff previsto sin obligar al usuario a agotar una investigación automática. Esto se distingue de una expresión de frustración sin esa petición, donde se puede ofrecer ayuda dentro de capacidad y política. El criterio debe ser explícito.

**Error principal a evitar:** Confundir frustración con una solicitud inequívoca o ignorar esta última para mejorar una métrica.

Fuentes: [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 15 · C · D5 / tarea 5.2

Pedir un identificador adicional para resolver coincidencias ambiguas y escalar lagunas de política según el procedimiento. No escoger a una persona por probabilidad ni inventar una regla. La siguiente acción depende del tipo de incertidumbre, no de una instrucción genérica de ser autónomo.

**Error principal a evitar:** Usar la primera coincidencia o extender una política por analogía sin autorización.

Fuentes: [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 16 · B · D1 / tarea 1.1

Conservar los bloques del asistente que solicitaron las herramientas y devolver un tool_result por llamada, enlazado al tool_use_id correcto. Un fallo se representa explícitamente, sin perder la relación entre solicitud y observación. Las llamadas independientes pueden resolverse concurrentemente.

**Error principal a evitar:** Responder solo con un resumen sin identificadores o perder la llamada original.

Fuentes: [TOOL-RESULTS](../biblioteca/api/agents-and-tools/tool-use/handle-tool-calls.md).

## 17 · A · D1 / tarea 1.2

Determina alcance, elige especialistas, distribuye trabajo, agrega resultados y detecta lagunas. Centraliza la coordinación y recuperación para mantener visibilidad. No necesita invocar a todos los especialistas para una solicitud simple ni realizar él mismo todo el trabajo especializado.

**Error principal a evitar:** Confundir coordinación con ejecutar siempre una cadena rígida de todos los agentes.

Fuentes: [AGENTS](../biblioteca/engineering/building-effective-agents.html) · [SDK-SUBAGENTS](../biblioteca/code/agent-sdk/subagents.md).

## 18 · A · D1 / tarea 1.2

Asignar alcances distinguibles, como subtemas o tipos de fuente, y exigir un resultado con evidencia y límites. El coordinador contrasta el conjunto con el objetivo y vuelve a delegar lagunas concretas. La ausencia de duplicados no demuestra por sí sola cobertura suficiente.

**Error principal a evitar:** Repartir por igual páginas sin comprobar qué preguntas quedaron sin investigar.

Fuentes: [AGENTS](../biblioteca/engineering/building-effective-agents.html) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 19 · C · D1 / tarea 1.3

El contexto debe pasarse explícitamente y preservar procedencia. No se necesita trasladar todo el historial ni reemplazar evidencia por conclusiones persuasivas.

**Por qué no las otras opciones:**

- A: Más texto sin atribución no conserva la relación entre afirmación y fuente.
- B: Un ID no implica herencia automática del contexto del padre.
- D: Predetermina la conclusión y omite la evidencia para contrastarla.

Fuentes: [SDK-SUBAGENTS](../biblioteca/code/agent-sdk/subagents.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 20 · C · D1 / tarea 1.3

Dar meta, alcance, criterios de calidad, capacidades permitidas y forma del resultado. El especialista puede adaptar su investigación dentro de esos límites. Una receta excesivamente detallada puede impedir seguir un hallazgo relevante; una meta sin límites puede ampliar demasiado el trabajo.

**Error principal a evitar:** Elegir entre libertad total y una lista rígida sin resultados verificables.

Fuentes: [SDK-SUBAGENTS](../biblioteca/code/agent-sdk/subagents.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 21 · B + C · D1 / tarea 1.3

Que sus tareas no dependan de resultados aún desconocidos de otro especialista y que el coordinador pueda reunir resultados atribuibles bajo límites de trabajo. Emitir varias invocaciones en el mismo turno evita rondas seriales innecesarias. El paralelismo no elimina dependencias reales.

**Error principal a evitar:** Paralelizar una síntesis que necesita resultados todavía no producidos.

Fuentes: [SDK-SUBAGENTS](../biblioteca/code/agent-sdk/subagents.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 22 · A · D1 / tarea 1.7

La decisión depende de vigencia de la evidencia. Una reanudación informada puede ahorrar trabajo; un fork no actualiza observaciones por sí mismo ni exige desechar todo.

**Por qué no las otras opciones:**

- B: Pierde trabajo válido sin atender a la evidencia de cambios acotados.
- C: La identidad de sesión no prueba frescura de los archivos.
- D: La ramificación conserva una base, no vuelve a ejecutar sus observaciones.

Fuentes: [SESSIONS](../biblioteca/code/sessions.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 23 · C · D2 / tarea 2.1

La separación debe aclarar selección y efectos y permitir aplicar permisos distintos. Añadir un campo declarativo no sustituye controles; tampoco conviene multiplicar opciones redundantes.

**Por qué no las otras opciones:**

- A: El modelo puede declarar un modo; el servicio todavía debe comprobar el derecho a ejecutarlo.
- B: Aumenta complejidad y no separa el permiso con efectos.
- D: Amplía capacidades y oculta los contratos que se querían aclarar.

Fuentes: [TOOLS](../biblioteca/api/agents-and-tools/tool-use/define-tools.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 24 · B · D2 / tarea 2.3

Dar a cada rol las capacidades que necesita. Si un especialista requiere verificaciones simples muy frecuentes, una herramienta limitada puede resolverlas localmente; la investigación compleja sigue la coordinación prevista. La excepción debe justificarse por evidencia de uso y límites.

**Error principal a evitar:** Dar todo el arsenal al sintetizador o prohibir incluso una verificación acotada útil.

Fuentes: [TOOLS](../biblioteca/api/agents-and-tools/tool-use/define-tools.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 25 · B · D2 / tarea 2.4

Un catálogo direccionable puede exponerse como resource; búsquedas y operaciones pueden necesitar tools. El host coordina clientes y servidores. El protocolo facilita intercambio, pero la aplicación y servicios conservan la responsabilidad de permisos y del uso del modelo.

**Error principal a evitar:** Interpretar el descubrimiento de una capacidad como autorización automática.

Fuentes: [MCP](../biblioteca/mcp/docs/2026-07-28/learn/architecture.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 26 · A · D3 / tarea 3.4

Investigar preguntas delimitadas, usar resultados estructurados y resumir hallazgos antes de la siguiente fase. Un especialista de exploración puede aislar salidas voluminosas. El coordinador conserva las decisiones y referencias; no necesita todas las trazas crudas en cada turno.

**Error principal a evitar:** Volcar todo el repositorio en la conversación principal.

Fuentes: [SUBAGENTS](../biblioteca/code/sub-agents.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 27 · B · D4 / tarea 4.6

Puede ayudar a priorizar verificación si se contrasta con datos etiquetados y evidencia. Las pasadas locales e integración cubren problemas distintos. La coincidencia literal entre revisores no es una prueba general de corrección y puede suprimir hallazgos reales poco frecuentes.

**Error principal a evitar:** Aceptar automáticamente un hallazgo por confianza alta o unanimidad de redacción.

Fuentes: [EVALS](../biblioteca/engineering/demystifying-evals.html) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 28 · D · D5 / tarea 5.3

Conservar resultados verificados y declarar la laguna, causa e intentos realizados. El coordinador puede elegir una alternativa o presentar un resultado parcial. Una fuente que no pudo consultarse no demuestra que no exista información en ella.

**Error principal a evitar:** Afirmar cobertura exhaustiva o inventar lo que habría dicho la fuente.

Fuentes: [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 29 · B · D5 / tarea 5.4

Un estado estructurado con objetivo, hallazgos, referencias, tareas completadas y pendientes, además de la revalidación del estado real al continuar. Un archivo de progreso ayuda, pero no prueba que un proceso siga ejecutándose. Los especialistas necesitan el contexto explícito al reanudarse.

**Error principal a evitar:** Confiar en la intención anterior o en un archivo que diga running.

Fuentes: [CONTEXT](../biblioteca/engineering/effective-context-engineering.html) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 30 · A · D5 / tarea 5.6

Publicación, medición y recuperación tienen fechas distintas. Una síntesis útil preserva esas dimensiones y la metodología, y explica cuándo los valores no son comparables.

**Por qué no las otras opciones:**

- B: El orden de recuperación no aporta autoridad sobre el hecho.
- C: Una media puede mezclar medidas incompatibles y borrar su relación con fuentes concretas.
- D: La fecha de publicación no identifica el periodo medido.

Fuentes: [CONTEXT](../biblioteca/engineering/effective-context-engineering.html) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 31 · C · D1 / tarea 1.6

Usar pasos fijos cuando la tarea se descompone de manera predecible; adaptar cuando la siguiente investigación depende de los hallazgos. La elección responde a las dependencias y criterios de éxito. Un flujo puede contener una llamada LLM sin convertirse en un agente autónomo.

**Error principal a evitar:** Elegir autonomía porque el sistema usa IA, sin analizar el trabajo.

Fuentes: [AGENTS](../biblioteca/engineering/building-effective-agents.html) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 32 · D · D1 / tarea 1.6

La pasada local concentra atención en cada archivo; la de integración sigue contratos y flujos que cruzan archivos. Así se pueden detectar defectos que ninguna revisión aislada ve. Agregar comentarios locales no produce automáticamente un análisis del comportamiento conjunto.

**Error principal a evitar:** Suponer que revisar cada archivo elimina la necesidad de comprobar interacciones.

Fuentes: [AGENTS](../biblioteca/engineering/building-effective-agents.html) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 33 · D · D2 / tarea 2.5

Grep busca texto o patrones en el contenido, Glob selecciona rutas por nombre y Read obtiene contenido para inspección. Conviene orientar la búsqueda y después leer candidatos.

**Error principal a evitar:** Usar una herramienta de rutas para buscar semántica del contenido o leer todo primero.

Fuentes: [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 34 · D · D2 / tarea 2.5

Volver a leer el estado actual, localizar un contexto inequívoco y editar sobre esa evidencia. Si se sustituye un archivo completo, preservar el contenido y cambios ajenos. No aplicar una modificación sobre líneas supuestas de una versión anterior.

**Error principal a evitar:** Reintentar sobre una posición inventada o sobrescribir sin leer.

Fuentes: [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 35 · D · D3 / tarea 3.1

Puede que estén en un ámbito personal en lugar del proyecto. Las instrucciones compartidas deben versionarse donde el cliente las cargue para ese proyecto. Después hay que verificar los archivos realmente cargados y posibles instrucciones de ámbito más específico.

**Error principal a evitar:** Suponer que el archivo personal de un desarrollador se distribuye al equipo.

Fuentes: [MEMORY](../biblioteca/code/memory.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 36 · B · D3 / tarea 3.1

La conducta puede depender de qué archivos se cargaron y dónde se trabajó. La existencia o el contenido de un archivo aislado no demuestran la composición de contexto de la sesión.

**Por qué no las otras opciones:**

- A: Puede ocultar la causa y no deja una solución compartida reproducible.
- C: Omite capas más específicas y carga real.
- D: La autodeclaración del modelo no sustituye la observación del contexto.

Fuentes: [MEMORY](../biblioteca/code/memory.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 37 · D · D3 / tarea 3.2

Una regla que debe acompañar el trabajo habitual encaja en instrucciones de proyecto. Un procedimiento específico invocable bajo demanda encaja en una skill. El ámbito determina si es personal o compartido. La guía también incluye comandos personalizados; contrastar su relación con skills en la versión actual.

**Error principal a evitar:** Cargar todos los procedimientos extensos siempre o confiar en un comando privado para un flujo de equipo.

Fuentes: [SKILLS](../biblioteca/code/skills.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 38 · C + D · D3 / tarea 3.2

La captura de noviembre distingue preaprobación de disponibilidad. La guía de julio usa otra descripción, que se conserva como diferencia de versión. Restricción de herramientas y autorización externa deben verificarse con mecanismos adecuados.

**Por qué no las otras opciones:**

- A: La documentación actual dice explícitamente que no restringe el pool.
- B: No demuestra el bloqueo de otras herramientas o acciones indirectas.

Fuentes: [SKILLS](../biblioteca/code/skills.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 39 · C · D3 / tarea 3.3

Cuando una convención se aplica a un conjunto de archivos identificable por patrón, incluso si están en carpetas distintas. El frontmatter paths debe expresar ese alcance. Una regla sin condición adecuada puede cargar donde no corresponde o no aplicarse a los archivos esperados.

**Error principal a evitar:** Copiar instrucciones en muchas carpetas para una convención transversal.

Fuentes: [MEMORY](../biblioteca/code/memory.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 40 · C · D3 / tarea 3.3

Probar archivos que deben coincidir y archivos que deben quedar fuera, e inspeccionar la carga real. Un patrón plausible no prueba la intención. Las reglas heredadas por carpeta y los patrones transversales tienen alcances distintos y se eligen según la distribución del código.

**Error principal a evitar:** Comprobar un caso positivo y asumir que no hay coincidencias excesivas.

Fuentes: [MEMORY](../biblioteca/code/memory.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 41 · C · D3 / tarea 3.4

La necesidad de plan depende de incertidumbre, contratos y efectos, no del tamaño del diff. Primero contrastar alternativas y consumidores permite una secuencia verificable.

**Por qué no las otras opciones:**

- A: El tamaño no mide el alcance semántico de un contrato.
- B: Menos código no garantiza compatibilidad con requisitos y consumidores.
- D: Documentar después no sustituye decidir antes de un cambio con dependencias.

Fuentes: [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 42 · A · D3 / tarea 3.6

El modo no interactivo resuelve la espera de interacción; la salida estructurada facilita consumo, pero el consumidor debe verificar también la envoltura y estados de error. Ninguna bandera prueba por sí sola corrección del hallazgo.

**Por qué no las otras opciones:**

- B: Una instrucción no sustituye el modo de ejecución apropiado.
- C: Aparición de texto no prueba finalización ni contrato correcto.
- D: JSON puede describir un error o un resultado incompleto.

Fuentes: [CLI](../biblioteca/code/cli-reference.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 43 · C · D3 / tarea 3.6

Aportar hallazgos previos, commits nuevos y estado de resolución para reportar lo nuevo o aún pendiente. Para tests, dar casos y fixtures existentes y criterios de valor. Filtrar por coincidencia de texto no basta si el mismo problema cambia de redacción o ubicación.

**Error principal a evitar:** Reiniciar cada revisión sin contexto y publicar todo otra vez.

Fuentes: [CLI](../biblioteca/code/cli-reference.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 44 · C · D4 / tarea 4.1

Medir los patrones de error y mejorar criterios y ejemplos para esa categoría. Puede desactivarse temporalmente su publicación mientras se corrige, con evaluación antes de reintroducirla. Esto no equivale a ocultar defectos de otras categorías ni a debilitar pruebas para aparentar calidad.

**Error principal a evitar:** Reducir todos los controles o mantener ruido sin investigar su causa.

Fuentes: [PROMPTS](../biblioteca/api/build-with-claude/prompt-engineering/overview.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 45 · B · D4 / tarea 4.6

Un revisor independiente puede contrastar requisitos y artefacto sin heredar la justificación persuasiva del generador. Debe recibir evidencia suficiente, no empezar a ciegas. La independencia reduce un sesgo posible, pero no garantiza detección completa ni elimina comprobaciones.

**Error principal a evitar:** Dar al revisor toda la defensa del generador como criterio de corrección.

Fuentes: [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 46 · B · D1 / tarea 1.7

Permite explorar alternativas desde una base compartida conservando ramas independientes. Cada rama necesita evidencias y sus decisiones no se fusionan por arte de magia. El fork no convierte una hipótesis en un cambio aplicado ni vuelve actuales los resultados heredados.

**Error principal a evitar:** Confundir explorar una alternativa con aplicarla al estado principal.

Fuentes: [SESSIONS](../biblioteca/code/sessions.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 47 · A · D2 / tarea 2.3

any exige alguna herramienta y deja elegir entre las disponibles. Sigue siendo necesario validar la selección y el contenido; no fuerza un extractor específico ni una secuencia completa.

**Por qué no las otras opciones:**

- B: Pierde la interfaz de extracción y su contrato ejecutable.
- C: auto también puede devolver texto sin llamada.
- D: Impone un contrato que puede no corresponder al documento.

Fuentes: [TOOLS](../biblioteca/api/agents-and-tools/tool-use/define-tools.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 48 · D · D2 / tarea 2.4

El ámbito compartido contiene la estructura, no el secreto literal. Un endpoint remoto necesita el tipo apropiado; sdk en ese archivo no registra por sí solo un servidor en proceso. La conexión y aprobación se verifican aparte.

**Por qué no las otras opciones:**

- A: Mezcla un tipo ausente con una credencial personal expuesta.
- B: Ese tipo requiere el host SDK correspondiente y no convierte el endpoint en un servidor en proceso.
- C: La configuración privada no se distribuye automáticamente al equipo.

Fuentes: [MCP-CODE](../biblioteca/code/mcp.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 49 · C · D3 / tarea 3.5

Ejemplos concretos de entrada y salida esperada que aclaren la distinción problemática, más casos de borde. Un fallo reproducible permite contrastar el cambio. Los ejemplos deben enseñar el criterio, no solo una apariencia que se pueda copiar sin comprender.

**Error principal a evitar:** Repetir «hazlo mejor» sin evidencia de qué está fallando.

Fuentes: [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 50 · A · D3 / tarea 3.5

Explicar los síntomas, su relación y los criterios conjuntos ayuda a evitar arreglos incompatibles. Para problemas independientes conviene separar cambios y verificación. Conservar pruebas valiosas y compartir fallos específicos resulta más informativo que una afirmación genérica de que nada funciona.

**Error principal a evitar:** Resolver síntomas relacionados con instrucciones aisladas que se contradicen.

Fuentes: [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 51 · A · D4 / tarea 4.2

Los ejemplos deben enseñar las fronteras que producen errores. Cambiar solo valores de un caso ya resuelto no demuestra la diferencia entre exactitud, aproximación y contradicción.

**Por qué no las otras opciones:**

- B: Una lista de valores no resuelve la evidencia ni el formato de decisión.
- C: Sin salida y criterio no enseña la distinción requerida.
- D: No cubre los casos que motivan el cambio.

Fuentes: [PROMPTS](../biblioteca/api/build-with-claude/prompt-engineering/overview.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 52 · A + D · D4 / tarea 4.2

Mostrar la distinción relevante y evaluar casos nuevos que cambien datos o estructura conservando el criterio. Los ejemplos deben cubrir formatos representativos. Obtener el mismo JSON en los ejemplos entrenados no prueba que el modelo extraiga bien un documento distinto.

**Error principal a evitar:** Medir consistencia solo sobre los mismos ejemplos usados para ajustar.

Fuentes: [PROMPTS](../biblioteca/api/build-with-claude/prompt-engineering/overview.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 53 · A · D4 / tarea 4.3

La presencia de la clave y el conocimiento de su valor son dimensiones distintas. Required más nullable conserva la estructura sin exigir un dato fabricado; después se valida evidencia y formato.

**Por qué no las otras opciones:**

- B: La instrucción no reemplaza el contrato que se quiere validar.
- C: Una propiedad opcional no satisface la presencia obligatoria del consumidor.
- D: Un valor por defecto no representa la fecha de la fuente.

Fuentes: [STRUCTURED](../biblioteca/api/build-with-claude/structured-outputs.md) · [TOOLS](../biblioteca/api/agents-and-tools/tool-use/define-tools.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 54 · B · D4 / tarea 4.3

Restringen estructura y tipos bajo la interfaz y sus limitaciones. No prueban que los valores estén sustentados ni que la operación esté autorizada. Contrastar fuente y reglas semánticas, y manejar rechazos y salidas incompletas antes de consumir el objeto.

**Error principal a evitar:** Convertir validez de JSON en sinónimo de verdad o aprobación de negocio.

Fuentes: [STRUCTURED](../biblioteca/api/build-with-claude/structured-outputs.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 55 · A · D4 / tarea 4.4

El documento original, la salida que falló y errores de validación concretos. Si el dato existe pero su formato es incorrecto, la corrección puede servir. Si falta la fuente necesaria, se debe obtener evidencia o reconocer desconocimiento; repetir no recupera información inexistente.

**Error principal a evitar:** Reintentar sin señalar el fallo o esperar que aparezca un dato ausente.

Fuentes: [STRUCTURED](../biblioteca/api/build-with-claude/structured-outputs.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 56 · B · D4 / tarea 4.4

Conservar valores originales, cálculo o evidencia alternativa y una marca de conflicto con procedencia. Esto permite revisar la causa. Corregir silenciosamente un valor puede borrar información relevante y confundir al consumidor sobre qué decía realmente el documento.

**Error principal a evitar:** Sustituir el valor declarado por el calculado sin registrar el desacuerdo.

Fuentes: [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 57 · D · D4 / tarea 4.5

La espera máxima presupuestada es 27 - 24 - 0.5 = 2.5 h. Un intervalo de 2 h cabe; los otros superan la reserva o cambian el requisito. La aritmética reserva una ventana, no garantiza éxito del servicio.

**Por qué no las otras opciones:**

- A: Una mediana no sustituye la ventana que el caso exige presupuestar.
- B: 27.5 h supera el SLA fijado.
- C: El SLA empieza en la llegada, no solo al enviar el lote.

Fuentes: [BATCH](../biblioteca/api/build-with-claude/batch-processing.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 58 · D · D4 / tarea 4.5

No todos los fallos comparten causa. custom_id permite conservar éxitos y decidir por documento. Una fuente ausente requiere evidencia nueva; un esquema permisivo no la sustituye.

**Por qué no las otras opciones:**

- A: No cambia la causa de tamaño o evidencia ausente.
- B: Reprocesa éxitos y debilita el contrato sin resolver las causas.
- C: Un desconocido puede ser válido según contrato, pero debe conservarse la laguna y seguir el procedimiento requerido.

Fuentes: [BATCH](../biblioteca/api/build-with-claude/batch-processing.md) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 59 · D · D5 / tarea 5.5

La precisión observada es aproximadamente 83.3% en formularios y 50% en cartas; el promedio oculta esa diferencia. Los umbrales necesitan datos etiquetados y cobertura del segmento real, con muestreo de alta confianza.

**Por qué no las otras opciones:**

- A: Confianza declarada y precisión empírica son conceptos distintos.
- B: La media no demuestra calidad uniforme.
- C: Excluye parte del uso que la evaluación debe representar.

Fuentes: [EVALS](../biblioteca/engineering/demystifying-evals.html) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

## 60 · B + D · D5 / tarea 5.5

Porque pueden contener errores sistemáticos no detectados por el propio modelo. Muestrear por estratos relevantes permite estimar error y encontrar patrones nuevos, mientras se prioriza revisión completa de casos de baja confianza o contradicción. No debe inferirse precisión de los casos que se eligieron por conveniencia.

**Error principal a evitar:** Medir solo lo que ya se enviaba a revisión y extrapolar a todo.

Fuentes: [EVALS](../biblioteca/engineering/demystifying-evals.html) · [GUIA](../biblioteca/examen/foundations-exam-guide.pdf).

