# Soluciones de la reserva nueva en inglés

Abrir después de responder. Un punto por conjunto correcto.

## 01 · B · D1 / tarea 1.4 · Customer Support Resolution Agent

El mensaje contiene tres preocupaciones distintas que comparten la identidad y el contexto del cliente. Lo adecuado es descomponerlas en elementos separados, investigarlos en paralelo con ese contexto compartido y sintetizar una única resolución. Así se evita la respuesta parcial y se mantiene la resolución en el primer contacto.

**Por qué no las otras opciones:**

- A: Traslada el trabajo al cliente, pierde la identidad verificada y el contexto compartido, y empeora la resolución en el primer contacto.
- C: Es secuencial y deja dos preocupaciones sin resolver; priorizar por riesgo no sustituye investigar cada elemento.
- D: Paralelizar es correcto, pero aislar los contextos duplica búsquedas y fragmenta la respuesta; la guía pide contexto compartido y una resolución unificada.

Fuentes: guía l.188-204.

## 02 · D · D1 / tarea 1.5 · Customer Support Resolution Agent

El fallo nace de datos heterogéneos que llegan al modelo sin tratar. Un hook PostToolUse intercepta cada resultado y lo transforma de forma determinista antes de que el modelo razone sobre él, de modo que la ventana de devolución se calcula con un formato único.

Documentación vigente (nov-2026): hooks.md l.2243-2248 describe `updatedToolOutput`, que sustituye el resultado de la herramienta antes de enviarlo a Claude; coincide con la guía.

**Por qué no las otras opciones:**

- A: Las instrucciones del prompt son guía probabilística: el modelo sigue haciendo la conversión y conserva una tasa de fallo distinta de cero.
- B: PreToolUse intercepta llamadas salientes para bloquearlas; aquí el fallo está en los datos entrantes, y bloquear reembolsos detendría casos legítimos sin corregir la lectura.
- C: Depende de que el modelo reconozca cada fecha numérica y decida llamar a la herramienta; añade una herramienta y un paso sin garantía.

Fuentes: guía l.205-220 · [hooks](../biblioteca/code/hooks.md) (l.1176, l.2243-2248).

## 03 · A · D2 / tarea 2.2 · Customer Support Resolution Agent

La respuesta uniforme impide distinguir un resultado vacío válido (consulta correcta sin coincidencias) de fallos de acceso con recuperación distinta: el timeout es transitorio y reintentable, y la credencial vencida es un error de permisos que no se resuelve reintentando. Devolver el vacío como éxito y los fallos con categoría, indicador de reintento y descripción legible permite decidir si reintentar, corregir o escalar.

**Por qué no las otras opciones:**

- B: Un tope en el prompt es probabilístico y no distingue las causas: seguiría tratando «sin pedidos» como fallo y reintentando credenciales vencidas.
- C: Marca como reintentables tres situaciones distintas: «sin pedidos» no es un fallo y una credencial vencida no se resuelve reintentando. Mantiene el bucle que se quería evitar.
- D: El agente no sabe de antemano qué fallo ocurrirá; el problema está en la respuesta, que debe distinguir vacío válido, fallo transitorio y fallo de permisos, no en el número de herramientas.

Fuentes: guía l.283-304 · [mcp](../biblioteca/code/mcp.md) (l.1514).

## 04 · A + C · D5 / tarea 5.2 · Customer Support Resolution Agent

El sentimiento mide el tono, no la complejidad del caso, y la confianza autodeclarada está mal calibrada: aquí fue 9/10 en los casos mal resueltos. La señal fiable son criterios explícitos de escalado: petición de un humano, excepción o laguna de política y falta de progreso significativo.

**Por qué no las otras opciones:**

- B: Sigue usando el sentimiento como proxy; subir el umbral reduce volumen, pero los casos corteses con laguna de política siguen sin escalarse.
- D: Cambia un indicador indirecto por otro: la longitud de la conversación tampoco mide la complejidad. Las peticiones de igualar precios de la competencia pueden ser breves y seguir siendo una laguna de política.

Fuentes: guía l.655-678.

## 05 · C · D3 / tarea 3.2 · Code Generation with Claude Code

Las variantes personales viven en `~/.claude/skills/` con un nombre distinto: los compañeros siguen recibiendo la skill del proyecto sin cambios y la variante nunca se versiona por accidente. Además la skill se invoca bajo demanda, a diferencia de CLAUDE.md, que se carga siempre.

Documentación vigente (nov-2026): skills.md l.17 y l.172 indican que `.claude/commands/` sigue funcionando y se fusionó con las skills; con el mismo nombre, la skill personal prevalecería sobre la de proyecto (l.211). La clave sigue la guía v1.0: nombre distinto.

**Por qué no las otras opciones:**

- A: Modifica el archivo compartido: un pull, un stash o un commit accidental puede alterar o pisar lo que reciben los compañeros.
- B: Duplica el repositorio y mantiene una copia divergente; es desproporcionado para un cambio personal.
- D: El CLAUDE.md de proyecto se comparte por control de versiones y se carga siempre: cambiaría el comportamiento de todo el equipo y de todas las sesiones.

Fuentes: guía l.395-415 · [skills](../biblioteca/code/skills.md) (l.17, l.172, l.209-211).

## 06 · A · D3 / tarea 3.4 · Code Generation with Claude Code

La migración afecta a 47 archivos y admite dos enfoques válidos con compromisos distintos: es el caso típico del modo plan, que permite explorar los usos, comparar opciones y fijar un plan sin editar. Una vez acordado, la ejecución directa implementa el plan aprobado.

**Por qué no las otras opciones:**

- B: Dejar que el modelo elija sobre la marcha arriesga rehacer trabajo si el enfoque no encaja con las zonas horarias o el soporte de navegadores, algo que solo se descubre al avanzar.
- C: El modo plan investiga y propone sin editar el código fuente; no sirve para aplicar las 47 ediciones.
- D: Ejecutar dos migraciones completas solo para compararlas multiplica el coste; el análisis previo en modo plan es la forma proporcionada.

Fuentes: guía l.434-453 · [permission-modes](../biblioteca/code/permission-modes.md) (l.293-295).

## 07 · D · D3 / tarea 3.4 · Code Generation with Claude Code

El descubrimiento verboso consume la ventana del hilo principal. El subagente Explore trabaja en un contexto aislado y de solo lectura, y devuelve un resumen; así la sesión principal conserva espacio y requisitos para las fases siguientes.

**Por qué no las otras opciones:**

- A: `/clear` descarta tanto los hallazgos como los requisitos; habría que repetir la exploración.
- B: El modo plan hace segura la exploración (solo lectura), pero la salida voluminosa sigue entrando en la conversación principal.
- C: Reduce la salida a costa del recall: en una tarea que exige cubrir todos los endpoints, omitir alguno es un fallo funcional.

Fuentes: guía l.434-453 · [sub-agents](../biblioteca/code/sub-agents.md) (l.35-47).

## 08 · B · D3 / tarea 3.1 · Code Generation with Claude Code

Cuando el comportamiento difiere entre sesiones con el mismo commit, el primer paso es comprobar qué archivos de memoria se cargan realmente en cada sesión: `/memory` lo muestra y permite compararlo. Reformular, resumir o preguntar al modelo no diagnostica la causa.

Documentación vigente (nov-2026): memory.md l.72 indica `/context all` para ver la lista «Memory files», y commands.md l.112 describe `/memory` como editor de CLAUDE.md y de auto memory. La clave sigue la guía v1.0: `/memory`.

**Por qué no las otras opciones:**

- A: Adivina en lugar de diagnosticar: si el archivo no se carga en esa sesión, el énfasis no cambia nada.
- C: `/compact` reduce el contexto resumiéndolo; no recarga ni inspecciona archivos de memoria.
- D: Lo que el modelo recita no es un inventario fiable de archivos cargados y puede ser incompleto o inventado.

Fuentes: guía l.372-394 · [memory](../biblioteca/code/memory.md) (l.60-72) · [commands](../biblioteca/code/commands.md) (l.112).

## 09 · C · D1 / tarea 1.3 · Multi-Agent Research System

Para que un coordinador invoque subagentes, su `allowedTools` debe incluir "Task", la herramienta con la que se crean. Sin ella no puede delegar y responde con su propio conocimiento aunque las definiciones y descripciones sean correctas.

Documentación vigente (nov-2026): sub-agents.md l.507 indica que desde v2.1.63 la herramienta Task se llama Agent y que `Task(...)` sigue funcionando como alias; agent-sdk/subagents.md l.100 y l.330 usan "Agent". La clave sigue la guía v1.0 ("Task").

**Por qué no las otras opciones:**

- A: Las descripciones orientan qué subagente elegir, pero no sirven si la herramienta de creación no está permitida; cero invocaciones en 40 ejecuciones apunta a una causa de configuración.
- B: Una instrucción de prompt no puede conceder una capacidad que la configuración no permite.
- D: Haría que el coordinador ejecute él mismo el trabajo especializado, rompiendo el reparto de roles del patrón hub-and-spoke.

Fuentes: guía l.166-184 · [sub-agents](../biblioteca/code/sub-agents.md) (l.507) · [subagents (SDK)](../biblioteca/code/agent-sdk/subagents.md) (l.100, l.330).

## 10 · A · D1 / tarea 1.2 · Multi-Agent Research System

El bucle de refinamiento iterativo hace que el coordinador evalúe la síntesis, detecte la laguna, redelegue consultas dirigidas a los subagentes de búsqueda y análisis, y vuelva a invocar la síntesis hasta lograr cobertura suficiente. Es la respuesta proporcionada cuando el requisito exige cubrir los cinco subtemas.

**Por qué no las otras opciones:**

- B: Da herramientas de búsqueda al sintetizador, que se especializa en combinar y no en buscar, y saca la comunicación de la ruta del coordinador.
- C: Repite trabajo ya cubierto y no dirige la consulta a la laguna; es costoso y no garantiza resolverla.
- D: Anotar la laguna es adecuado cuando las fuentes no están disponibles; aquí el requisito exige cobertura completa y la fuente aún puede buscarse.

Fuentes: guía l.142-164.

## 11 · D · D5 / tarea 5.1 · Multi-Agent Research System

En entradas largas el modelo procesa con más fiabilidad el principio y el final, y puede omitir hallazgos de las secciones intermedias («lost in the middle»). Un resumen de hallazgos clave al inicio y secciones con encabezados explícitos mitigan el efecto de posición.

**Por qué no las otras opciones:**

- A: Es una instrucción probabilística: el sesgo de posición persiste aunque se pida leer todo.
- B: La entrada ya cabe; el fallo es de atención a la parte media, no de capacidad, y un contexto mayor no lo corrige.
- C: Descartar contenido pierde hallazgos, citas y metadatos que la síntesis necesita.

Fuentes: guía l.627-653.

## 12 · B · D2 / tarea 2.3 · Developer Productivity with Claude

Con 15 herramientas en un solo agente, la selección se complica y la fiabilidad baja; la guía da como ejemplo 18 frente a 4-5. Repartir las herramientas por rol en subagentes acotados reduce el conjunto de decisión de cada agente y evita usos fuera de especialidad.

**Por qué no las otras opciones:**

- A: Sigue siendo una decisión entre 15 opciones; más texto añade complejidad sin reducir el conjunto.
- C: `tool_choice` "any" garantiza que se llame a alguna herramienta, no a la correcta; no mejora la selección.
- D: Nombres más homogéneos ayudan algo, pero la causa es el número de herramientas por agente.

Fuentes: guía l.305-329 · [sub-agents](../biblioteca/code/sub-agents.md) (l.300, campo `tools`).

## 13 · C · D2 / tarea 2.4 · Developer Productivity with Claude

Las herramientas de todos los servidores MCP configurados están disponibles a la vez: el agente ya usa las del gestor de incidencias en la misma sesión. Si prefiere Grep es porque la descripción de `find_references` es mínima; detallar qué hace, sus entradas y salidas y cuándo preferirla corrige la causa.

Documentación vigente (nov-2026): mcp.md l.1724-1726 indica que con tool search (por defecto) solo se cargan los nombres de las herramientas MCP al iniciar y sus definiciones se difieren; las descripciones detalladas siguen siendo la base para elegirlas, así que la clave no cambia.

**Por qué no las otras opciones:**

- A: Quitar Grep elimina una herramienta necesaria para la búsqueda textual y trata el síntoma, no la descripción deficiente.
- B: Parte de un supuesto falso: las herramientas de varios servidores conviven; desactivar el servidor de incidencias no mejora la descripción.
- D: Una regla en CLAUDE.md es una guía probabilística y frágil que además deja intacta la descripción mínima, que es la causa.

Fuentes: guía l.330-349 · [mcp](../biblioteca/code/mcp.md) (l.1724-1726).

## 14 · A · D2 / tarea 2.5 · Developer Productivity with Claude

Edit necesita un texto único; con cuatro entradas idénticas ningún contexto adicional distingue la tercera. El respaldo fiable es leer el archivo completo con Read y reescribirlo con Write cambiando solo esa entrada.

Documentación vigente (nov-2026): tools-reference.md l.257 indica que, si `old_string` aparece más de una vez, Claude puede aportar más contexto o usar `replace_all: true`; aquí las cuatro entradas son idénticas y ningún contexto las distingue, así que el respaldo Read + Write de la guía sigue siendo el camino.

**Por qué no las otras opciones:**

- B: Revertir las otras tres entradas tendría el mismo problema de coincidencias múltiples, y además se modifican entradas que no debían tocarse.
- C: Edit localiza por texto, no por número de línea.
- D: Un texto más corto coincide aún más veces; la unicidad exige más contexto, no menos.

Fuentes: guía l.350-370 · [tools-reference](../biblioteca/code/tools-reference.md) (l.257).

## 15 · D · D1 / tarea 1.7 · Developer Productivity with Claude

`fork_session` crea ramas independientes a partir de una base de análisis compartida: cada enfoque se explora sin contaminar al otro y sin rehacer el análisis. Reanudar la misma sesión acumularía ambos enfoques en un único contexto.

**Por qué no las otras opciones:**

- A: Mantiene en el contexto la primera implementación y su historial, lo que sesga el segundo intento.
- B: Descarta el análisis ya hecho y lo repite en dos sesiones; es costoso y no aprovecha la base compartida.
- C: Una sola conversación mezcla ambos diseños: el segundo queda influido por el primero.

Fuentes: guía l.240-259 · [sessions](../biblioteca/code/agent-sdk/sessions.md) (l.36-41).

## 16 · B + D · D5 / tarea 5.4 · Developer Productivity with Claude

La degradación del contexto en exploraciones largas hace que el agente hable de «patrones típicos» en vez de las clases concretas halladas. Un archivo scratchpad con los hallazgos clave, consultado en las preguntas posteriores, y un `/compact` con instrucciones antes de la siguiente fase conservan lo importante y liberan contexto.

**Por qué no las otras opciones:**

- A: Más coincidencias por búsqueda aumentan la salida verbosa y aceleran la degradación en lugar de frenarla.
- C: Releer todos los archivos consume aún más contexto y reproduce el problema que se quiere evitar.

Fuentes: guía l.697-719 · [commands](../biblioteca/code/commands.md) (l.73) · [context-window](../biblioteca/code/context-window.md) (l.52).

## 17 · C · D4 / tarea 4.1 · Claude Code for Continuous Integration

Las categorías con altas tasas de descarte (62% y 54%) minan la confianza del equipo incluso en las categorías precisas. Se desactivan temporalmente mientras se redactan criterios explícitos sobre qué reportar, y se mantienen seguridad y errores lógicos, que sí funcionan.

**Por qué no las otras opciones:**

- A: Pedir más certeza o fijar un umbral de confianza no mejora la precisión frente a criterios categóricos específicos.
- B: Etiquetar la severidad traslada el filtrado a los desarrolladores y deja el ruido: la confianza no se restaura.
- D: Limitar a cinco por confianza autodeclarada puede descartar errores reales y no define qué debe reportarse.

Fuentes: guía l.501-516.

## 18 · A + D · D4 / tarea 4.5 · Claude Code for Continuous Integration

Un lote no puede ejecutar una herramienta a mitad de solicitud y devolverle el resultado, de modo que el bucle con `run_tests` debe salir del lote; el trabajo nocturno y sin espera sí encaja con lotes. Los 28 fallos (21 errored y 7 expired) se reenvían identificados por `custom_id`, troceando los módulos que superaron el contexto.

Documentación vigente (nov-2026): batch-processing.md l.83-89 admite tool use y conversaciones multi-turn como contenido de una solicitud, pero cada solicitud se procesa de forma independiente, sin ciclo de resultados de herramienta dentro del lote; coincide con la guía.

**Por qué no las otras opciones:**

- B: Reenviar los 400 repite 372 resultados que ya eran correctos y su coste, sin beneficio.
- C: Volver a la API síncrona pierde el ahorro del 50% en un trabajo que tolera latencia; el problema se resuelve rediseñando la solicitud.

Fuentes: guía l.589-610 · [batch-processing](../biblioteca/api/build-with-claude/batch-processing.md) (l.83-89, l.733-735).

## 19 · B · D4 / tarea 4.3 · Structured Data Extraction

Un `tool_choice` forzado con el nombre de la herramienta garantiza que la primera llamada sea `extract_metadata`; los pasos de enriquecimiento se procesan después, en turnos posteriores. "any" solo garantiza que se llame a alguna herramienta, no cuál.

Documentación vigente (nov-2026): define-tools.md l.588-593 indica que `any` y `tool` devuelven un error 400 en Claude Opus 5.5, Sonnet 5.5, Fable 5.1 y Mythos 5.1, donde se usa `auto` con strict tool use o structured outputs. La clave sigue la guía v1.0 (selección forzada).

**Por qué no las otras opciones:**

- A: "any" obliga a llamar a una herramienta, pero el modelo elige cuál y podría empezar por `extract_invoice_fields`.
- C: Es una instrucción probabilística que reproduce el fallo actual (una de cada seis ejecuciones).
- D: Fusionar los esquemas elimina contratos específicos y no garantiza el orden ni que los campos opcionales correspondan al tipo de documento.

Fuentes: guía l.542-568 · [define-tools](../biblioteca/api/agents-and-tools/tool-use/define-tools.md) (l.588-593).

## 20 · B + C · D4 / tarea 4.4 · Structured Data Extraction

Extraer `calculated_total` junto a `stated_total` y añadir `conflict_detected` hace visible la inconsistencia del documento para su revisión. Cuando el dato no figura en la fuente, reintentar con retroalimentación no puede producirlo: el campo pasa a ser nullable y el caso se deriva a revisión o a la fuente que sí lo contiene.

**Por qué no las otras opciones:**

- A: El reintento con retroalimentación sirve para errores de formato o de estructura; aquí la fuente es inconsistente o carece del dato, y reintentar gasta llamadas o invita a inventar.
- D: Inferir el dato a partir del nombre del proveedor fomenta la fabricación de valores.

Fuentes: guía l.569-588.
