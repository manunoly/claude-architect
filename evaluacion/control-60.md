# Control integrador original - 60 reactivos / 120 minutos

Reserva separada del banco de aprendizaje. Veinte reactivos profundizan en trazas, configuraciones, restricciones y SLA; el resto comprueba fundamentos. No es material oficial ni un predictor calibrado de aprobación.

Responder sin consultar soluciones. Cada reactivo indica cuántas opciones seleccionar; las múltiples requieren exactamente el conjunto correcto. No usar una nota interna como equivalencia de la escala oficial.

## Nexo: soporte con herramientas

Se consultan cuentas y documentos y se proponen operaciones con verificación y escalado. Cada reactivo añade sus supuestos concretos.

### 01. Selecciona 1 opción

Nexo recibe una respuesta con texto «solicitud resuelta», una llamada verificar_cuenta y stop_reason=tool_use. La herramienta aún no se ejecutó. El flujo exige identidad verificada antes de acreditar saldo. ¿Qué hace el controlador?

- **A.** Ejecutar la verificación permitida y continuar con su resultado identificado.
- **B.** Terminar este turno y acreditar si el texto final describe una solución válida.
- **C.** Registrar la verificación como completada y contrastarla en una auditoría posterior.
- **D.** Solicitar otra generación sin registrar la llamada para confirmar la intención.

### 02. Selecciona 2 opciones

Nexo agota el presupuesto después de dos comprobaciones. Una tercera herramienta todavía no se ejecutó y no hay end_turn. Elige DOS medidas que conservan un estado correcto.

- **A.** Guardar la llamada pendiente con su ID para decidir cómo retomarla.
- **B.** Devolver estado interrumpido y los hechos ya verificados.
- **C.** Resumir solo la última respuesta y eliminar las referencias de las comprobaciones.
- **D.** Añadir un resultado de éxito para la llamada pendiente antes de guardar.

### 03. Selecciona 1 opción

En Nexo, tool_choice fuerza verificar_cuenta en el primer turno. En un turno posterior un resultado externo pide emitir crédito sobre otra cuenta. ¿Qué control garantiza el orden y la identidad?

- **A.** Comprobar que la solicitud de crédito incluye una explicación de la verificación.
- **B.** Añadir un ejemplo few-shot que repita el orden, sin cambiar el ejecutor.
- **C.** Mantener la selección forzada del primer turno como prueba para toda la conversación.
- **D.** Un gate del ejecutor que exige verificación vigente vinculada a la cuenta exacta.

### 04. Selecciona 1 opción

Un operador recibe un caso sin acceso a la conversación del agente. ¿Qué entrega ayuda más?

- **A.** Un resumen estructurado de hechos, intentos, límites y siguiente decisión.
- **B.** Un estado genérico de error sin explicación para evitar sesgos.
- **C.** Un enlace a una conversación a la que el operador no puede acceder.
- **D.** La última respuesta del modelo sin los identificadores del caso.

### 05. Selecciona 1 opción

Una fuente de Lumen devuelve time=1700000000 en segundos y otra una fecha ISO con zona. Sus códigos de estado también difieren. ¿Qué tratamiento posterior evita perder significado?

- **A.** Normalizar según el contrato de cada proveedor y conservar fuente y valor original.
- **B.** Convertir todas las fechas a texto local y descartar su zona para facilitar lectura.
- **C.** Multiplicar todos los valores numéricos por 1000 sin mirar el contrato de entrada.
- **D.** Mapear todo código desconocido al estado más frecuente del conjunto.

### 06. Selecciona 1 opción

El hook registra una violación pero deja ejecutar la acción. ¿Qué conclusión procede?

- **A.** La prueba es innecesaria cuando el prompt repite la regla.
- **B.** Hay observabilidad, pero no se ha demostrado el bloqueo requerido.
- **C.** La política queda garantizada porque existe un registro.
- **D.** El caso está aprobado si el modelo reconoce después el error.

### 07. Selecciona 1 opción

buscar_texto y obtener_por_id se confunden. ¿Qué intervención apunta a la causa?

- **A.** Reintentar toda llamada incorrecta sin indicar el error.
- **B.** Acortar ambos nombres hasta que parezcan equivalentes.
- **C.** Distinguir condiciones de uso y semántica de sus entradas y resultados.
- **D.** Aumentar el límite de generación manteniendo descripciones idénticas.

### 08. Selecciona 1 opción

Un servidor no responde y el informe concluye que no hay documentos. ¿Qué debe cambiar?

- **A.** Conservar el vacío para simplificar todas las respuestas.
- **B.** Propagar la indisponibilidad y marcar la laguna de cobertura.
- **C.** Convertir el timeout en un resultado negativo definitivo.
- **D.** Completar el informe con documentos que el modelo recuerde.

### 09. Selecciona 1 opción

Una herramienta MCP de Nexo deniega acceso y devuelve isError=true con category=permission y retryable=false. Un adaptador la incorpora a Messages API. ¿Qué salida mantiene el significado?

- **A.** tool_result con is_error=false porque la llamada HTTP llegó correctamente.
- **B.** tool_result con isError=true, usando el mismo nombre de campo de MCP.
- **C.** Una lista vacía exitosa para que el agente busque coincidencias alternativas.
- **D.** tool_result con is_error=true y el contexto de permiso no reintentable.

### 10. Selecciona 2 opciones

Falla temporalmente una de tres fuentes de un especialista. Elige DOS medidas.

- **A.** Intentar recuperación local dentro del presupuesto acordado.
- **B.** Repetir indefinidamente mientras el resto del sistema espera.
- **C.** Si persiste, devolver lo conseguido, el fallo y sus intentos.
- **D.** Declarar cobertura completa porque dos fuentes respondieron.

### 11. Selecciona 1 opción

Un revisor mezcla cambios de estilo con errores que rompen el flujo. ¿Qué conviene ajustar primero?

- **A.** El número máximo de comentarios sin aclarar su significado.
- **B.** La temperatura como único control de falsos positivos.
- **C.** Un requisito de que todo comentario suene muy seguro.
- **D.** Criterios de inclusión y severidad con ejemplos contrastados.

### 12. Selecciona 1 opción

La compresión omite el importe acordado y el identificador del caso. ¿Qué diseño reduce ese riesgo?

- **A.** Un resumen que conserve solo las frases más recientes.
- **B.** Un bloque persistente de hechos críticos separado del resumen narrativo.
- **C.** Un modelo más seguro de sí mismo sin cambiar el contexto.
- **D.** Eliminar los resultados de herramientas al terminar cada vuelta.

### 13. Selecciona 1 opción

Cada consulta añade miles de campos irrelevantes al caso. ¿Qué intervención mejora el contexto?

- **A.** Suprimir todas las fechas porque ocupan espacio.
- **B.** Duplicar las respuestas completas al principio y al final de cada turno.
- **C.** Normalizar a hechos pertinentes con identificadores y evidencia recuperable.
- **D.** Guardar solo una conclusión sin permitir volver a la fuente.

### 14. Selecciona 1 opción

La persona dice «quiero hablar con una persona ahora». ¿Qué debe priorizar el flujo?

- **A.** Investigar primero todos los problemas aunque no lo solicite.
- **B.** El traspaso previsto con contexto suficiente para el operador.
- **C.** Cerrar el caso porque la solicitud no contiene un error técnico.
- **D.** Repetir que el agente automatizado también puede ayudar hasta convencerla.

### 15. Selecciona 1 opción

Dos cuentas tienen el mismo nombre y la operación afecta su saldo. ¿Cuál es el siguiente paso?

- **A.** Usar la cuenta más antigua porque parece más probable.
- **B.** Actuar sobre ambas y corregir después si alguien reclama.
- **C.** Solicitar un identificador que distinga la cuenta antes de actuar.
- **D.** Elegir la de mayor saldo para poder completar el flujo.

## Lumen: investigación y productividad

Especialistas consultan fuentes y repositorios para producir informes atribuibles y recuperables. Cada reactivo añade sus supuestos concretos.

### 16. Selecciona 1 opción

Dos búsquedas independientes terminan en orden inverso al solicitado. ¿Cómo se agregan?

- **A.** Descartando la respuesta lenta para mantener el orden original.
- **B.** Asociando cada resultado a su tool_use_id y preservando ambas llamadas.
- **C.** Uniendo todo en un texto sin identificar qué herramienta respondió.
- **D.** Asociando por el orden en que llegaron las respuestas.

### 17. Selecciona 1 opción

Una consulta necesita solo revisar un documento y citarlo. Hay cuatro especialistas disponibles. ¿Qué conviene?

- **A.** Invocar solo los necesarios y comprobar si su cobertura basta.
- **B.** Enviar el trabajo al azar y aceptar la primera respuesta.
- **C.** Pedir a cada especialista que rediseñe el sistema completo.
- **D.** Ejecutar siempre los cuatro para mantener una arquitectura uniforme.

### 18. Selecciona 1 opción

Tres agentes cubren la misma región y omiten otras dos. ¿Cuál es la corrección principal?

- **A.** Repartir alcances explícitos y revisar cobertura frente a la pregunta completa.
- **B.** Aumentar la longitud máxima de sus informes manteniendo las tareas.
- **C.** Solicitar a los tres que vuelvan a buscar exactamente lo mismo.
- **D.** Elegir el informe más detallado y descartar los demás.

### 19. Selecciona 1 opción

Lumen pide a un sintetizador nuevo combinar dos informes. El coordinador dispone de hallazgos con fuente y fecha, pero el sintetizador no comparte su historial. ¿Qué entrada es suficiente y proporcionada?

- **A.** Todos los logs crudos, sin distinguir qué fuente respalda cada afirmación.
- **B.** El identificador de sesión del coordinador y una orden de continuar su memoria.
- **C.** Hallazgos necesarios, fuentes, fechas, lagunas y contrato de síntesis.
- **D.** Las conclusiones finales propuestas, para que el sintetizador las redacte con seguridad.

### 20. Selecciona 1 opción

Un especialista debe investigar causas que aún se desconocen. ¿Qué instrucción es mejor?

- **A.** Pedirle que haga lo que considere útil sin fijar alcance.
- **B.** Obligarlo a leer siempre los mismos cinco archivos aunque no estén relacionados.
- **C.** Definir resultado, límites y evidencia, dejando adaptar los pasos a los hallazgos.
- **D.** Exigir una respuesta final antes de consultar herramientas.

### 21. Selecciona 2 opciones

Se quiere investigar dos normativas independientes antes de compararlas. Elige DOS decisiones.

- **A.** Compartir todas las herramientas de escritura con cada investigador.
- **B.** Esperar sus evidencias antes de elaborar la comparación final.
- **C.** Lanzar ambas investigaciones con contratos de devolución claros.
- **D.** Iniciar la comparación sin resultados y tratarla como definitiva.

### 22. Selecciona 1 opción

Lumen reanuda una investigación: dos archivos cambiaron y los demás siguen iguales. ¿Qué opción reutiliza contexto sin tratar observaciones antiguas como actuales?

- **A.** Informar los cambios, reanalizar esas dependencias y conservar lo revalidado.
- **B.** Descartar siempre todo el trabajo previo aunque se pueda verificar qué sigue vigente.
- **C.** Reusar todos los resultados porque el ID de sesión coincide con la investigación.
- **D.** Crear un fork y asumir que eso actualiza los resultados de herramientas heredados.

### 23. Selecciona 1 opción

Un servicio de Lumen tiene consultar_documento(id) y publicar_documento(id, destino), pero una herramienta genérica los mezcla con parámetros opcionales y las mismas credenciales. ¿Qué rediseño conviene validar primero?

- **A.** Conservar la interfaz y hacer obligatorio que el modelo declare mode=read o write.
- **B.** Una herramienta por cada campo de documento, todas con permisos de publicación.
- **C.** Contratos distinguibles y permisos adecuados para lectura y publicación.
- **D.** Reemplazar ambos por un acceso HTTP general para que el modelo elija el endpoint.

### 24. Selecciona 1 opción

El redactor necesita confirmar fechas sencillas, pero no investigar temas nuevos. ¿Qué opción equilibra alcance y latencia?

- **A.** Todas las herramientas de investigación y escritura sin restricciones.
- **B.** Una verificación de datos limitada y delegación para casos complejos.
- **C.** Permitirle inventar la fecha más probable para evitar rondas.
- **D.** Rehacer toda la investigación para cada fecha citada.

### 25. Selecciona 1 opción

El agente debe conocer qué manuales hay antes de buscar dentro de ellos. ¿Qué puede ayudar?

- **A.** Forzar una modificación de cada manual para poder descubrirlo.
- **B.** Exponer un catálogo de contenido como recurso con metadatos útiles.
- **C.** Crear un servidor distinto por cada título de documento.
- **D.** Sustituir permisos por el hecho de anunciar una herramienta.

### 26. Selecciona 1 opción

El análisis de una migración agota contexto antes de llegar a las decisiones. ¿Qué cambio ayuda?

- **A.** Delegar preguntas concretas y traer resúmenes verificables con referencias.
- **B.** Omitir las referencias para que los resúmenes sean más cortos.
- **C.** Aumentar el detalle narrativo de cada búsqueda sin cambiar el alcance.
- **D.** Dar por terminada la investigación cuando se llena la ventana.

### 27. Selecciona 1 opción

Dos revisores coinciden en una alerta sin ejemplo que la reproduzca. ¿Qué falta para actuar con fundamento?

- **A.** Exigir que sus mensajes sean idénticos palabra por palabra.
- **B.** Comprobar evidencia y efecto del defecto con un caso concreto.
- **C.** Considerar la coincidencia una prueba suficiente de severidad.
- **D.** Sumar sus porcentajes de confianza para superar un umbral.

### 28. Selecciona 1 opción

Una revisión encuentra evidencia en dos repositorios y no pudo consultar un tercero. ¿Qué informe es correcto?

- **A.** Una mezcla de hechos verificados y conjeturas sin distinguirlos.
- **B.** Conclusión de que el tercero no contiene nada relevante.
- **C.** Un informe sin límites para que el lector no pierda confianza.
- **D.** Hallazgos atribuidos y una limitación explícita sobre el repositorio no consultado.

### 29. Selecciona 1 opción

Un manifiesto guardado ayer dice que una tarea sigue activa. ¿Qué debe verificarse antes de continuar?

- **A.** Que el modelo recuerde el nombre del especialista.
- **B.** El estado actual de archivos y procesos, conservando lo comprobado y pendiente.
- **C.** Nada: el estado escrito debe considerarse autoritativo para siempre.
- **D.** Que el resumen tenga suficiente longitud narrativa.

### 30. Selecciona 1 opción

Lumen compara una publicación de hoy con datos de 2020 y otra de ayer con mediciones de 2026. Los métodos difieren. ¿Cómo evitar una síntesis engañosa?

- **A.** Conservar periodo, método y fuente de cada cifra antes de decidir comparabilidad.
- **B.** Elegir la que llegó al final de la búsqueda para mantener un orden reproducible.
- **C.** Calcular una media única y conservar solo las referencias bibliográficas al final.
- **D.** Elegir la publicada hoy por ser la publicación más reciente de las dos.

## Orion: desarrollo y CI

El equipo mantiene convenciones, revisiones y flujos automatizados con resultados verificables. Cada reactivo añade sus supuestos concretos.

### 31. Selecciona 1 opción

Una conversión documental siempre valida, extrae y presenta el mismo contrato. ¿Cuál es una base razonable?

- **A.** Un coordinador que inventa las etapas de nuevo en cada documento.
- **B.** Una búsqueda abierta hasta que el modelo se sienta satisfecho.
- **C.** Una secuencia explícita con comprobaciones entre etapas.
- **D.** Varios agentes que compiten por definir el contrato final.

### 32. Selecciona 1 opción

Cada archivo parece correcto, pero un cambio de unidades rompe el consumidor. ¿Qué falta?

- **A.** Renombrar los archivos para agruparlos visualmente.
- **B.** Un informe local más largo sin entradas de otros módulos.
- **C.** Más comentarios de estilo en cada archivo de forma independiente.
- **D.** Una pasada que siga el contrato y flujo entre productor y consumidor.

### 33. Selecciona 1 opción

Sin un índice estructural disponible, se buscan archivos terminados en .spec.ts. ¿Qué operación corresponde?

- **A.** Una lectura completa de todos los documentos del repositorio.
- **B.** Una escritura de nombres candidatos en un archivo nuevo.
- **C.** Una búsqueda del texto literal .spec.ts dentro de cada archivo.
- **D.** Una búsqueda de rutas con un patrón como **/*.spec.ts.

### 34. Selecciona 1 opción

El ancla se repite en tres funciones y el archivo cambió. ¿Cuál es el siguiente paso?

- **A.** Sustituir la primera aparición sin revisar a qué función pertenece.
- **B.** Reescribir desde memoria descartando el contenido actual.
- **C.** Dar por aplicada la edición porque la intención era correcta.
- **D.** Leer el archivo actual y elegir contexto único antes de modificar.

### 35. Selecciona 1 opción

Solo la autora del repositorio recibe una convención que guardó en su perfil. ¿Cómo compartirla?

- **A.** Guardar el texto en un archivo personal con un nombre más corto.
- **B.** Pedir a los demás que recuerden preguntar en cada sesión.
- **C.** Aumentar el límite de contexto sin cambiar el ámbito.
- **D.** Mover la convención compartida a instrucciones versionadas de proyecto.

### 36. Selecciona 1 opción

Orion tiene una regla importada en el CLAUDE.md de proyecto y otra versión en un paquete. Un compañero observa conducta distinta. ¿Qué diagnóstico produce evidencia útil?

- **A.** Copiar todo al perfil personal del compañero y asumir que se resolvió el ámbito.
- **B.** Inspeccionar archivos cargados, ámbito, imports y rutas realmente editadas.
- **C.** Comparar solo el texto del CLAUDE.md raíz sin mirar las reglas del paquete.
- **D.** Pedir al modelo que confirme que conoce todas las convenciones del repositorio.

### 37. Selecciona 1 opción

El equipo quiere invocar una revisión de accesibilidad específica sin cargar todo su procedimiento en cada sesión. ¿Qué encaja?

- **A.** Copiar el procedimiento completo a cada prompt de cualquier tarea.
- **B.** Convertir todos los documentos del proyecto en instrucciones universales.
- **C.** Guardarlo solo en el historial privado del autor.
- **D.** Una skill de proyecto con instrucciones y herramientas apropiadas.

### 38. Selecciona 2 opciones

Una skill de Orion usa context: fork y allowed-tools: Read, Grep, Glob. Según la documentación archivada en noviembre, elige DOS afirmaciones correctas.

- **A.** allowed-tools elimina automáticamente todas las herramientas no enumeradas.
- **B.** La ausencia de Write en allowed-tools bloquea también toda vía indirecta de modificación.
- **C.** El fork separa contexto; no demuestra por sí solo un entorno sin escritura.
- **D.** allowed-tools preaprueba; hay que aplicar restricciones reales si se deben quitar capacidades.

### 39. Selecciona 1 opción

La misma regla debe aplicarse a archivos *.test.ts dispersos en varios paquetes. ¿Qué conviene?

- **A.** Una regla de despliegue global para cualquier archivo.
- **B.** Duplicar toda la documentación en cada archivo de prueba.
- **C.** Una regla por paths que cubra **/*.test.ts.
- **D.** Un archivo personal que mencione solo el primer paquete.

### 40. Selecciona 1 opción

Una regla de tests termina cargando al editar configuración de producción. ¿Qué se revisa?

- **A.** El historial de una sesión que no tocó esos archivos.
- **B.** El número de veces que se repite la palabra test.
- **C.** El patrón y ámbito, usando casos incluidos y excluidos.
- **D.** Solo la severidad del texto de la regla.

### 41. Selecciona 1 opción

Orion debe cambiar seis líneas de un contrato compartido por muchos consumidores, con dos estrategias de compatibilidad. ¿Qué justifica investigar antes de ejecutar?

- **A.** Solo el número de líneas; seis líneas siempre requieren ejecución directa.
- **B.** Que una de las estrategias tenga menos código, sin revisar consumidores.
- **C.** Las dependencias y la decisión de compatibilidad, aunque el diff sea pequeño.
- **D.** Planificar únicamente después de aplicar el cambio para documentar lo ocurrido.

### 42. Selecciona 1 opción

Orion necesita un job no interactivo y hallazgos que otro proceso interprete. ¿Qué combinación de decisiones corresponde al patrón estudiado?

- **A.** Usar -p, contrato estructurado y comprobar envoltura, errores y resultado del proceso.
- **B.** Usar modo interactivo con un prompt que pida no hacer preguntas nunca.
- **C.** Usar -p y publicar el primer texto que aparezca sin validar su tipo de resultado.
- **D.** Usar --output-format json como prueba suficiente de que no hubo fallos ni rechazos.

### 43. Selecciona 1 opción

Tras cada commit se publican los mismos problemas ya corregidos. ¿Qué contexto falta?

- **A.** Todos los repositorios de la organización sin seleccionar cambios.
- **B.** Un prompt más largo sobre el estilo de los comentarios.
- **C.** Hallazgos previos, su estado y los cambios que se están reevaluando.
- **D.** Una instrucción de ocultar cualquier hallazgo repetido aunque siga abierto.

### 44. Selecciona 1 opción

Una regla de estilo reporta errores falsos y los desarrolladores ignoran el informe completo. ¿Qué enfoque ayuda?

- **A.** Publicar más comentarios para que alguno sea útil.
- **B.** Aprobar la categoría solo porque el modelo declara alta confianza.
- **C.** Aislar esa categoría, refinarla y validar antes de reactivarla.
- **D.** Eliminar también las comprobaciones de errores funcionales reales.

### 45. Selecciona 1 opción

Se quiere una segunda opinión sobre código generado. ¿Qué entrada favorece una revisión independiente?

- **A.** Solo el texto que explica por qué el generador cree tener razón.
- **B.** Requisitos, cambio y pruebas relevantes, sin la defensa del generador.
- **C.** Una lista de conclusiones que el revisor debe repetir.
- **D.** Una afirmación de que el cambio ya fue aprobado.

## Archivo: extracción y mantenimiento

Se procesan documentos ambiguos y lotes, se mantiene código y se organiza revisión humana. Cada reactivo añade sus supuestos concretos.

### 46. Selecciona 1 opción

Dos ramas comparan estrategias de migración desde el mismo análisis. ¿Cómo debe decidir el coordinador?

- **A.** Preferir automáticamente la rama que terminó primero.
- **B.** Contrastar evidencias y seleccionar o combinar decisiones explícitamente.
- **C.** Suponer que las memorias de ambas ramas se fusionaron.
- **D.** Tratar ambas propuestas como ya aplicadas por compartir origen.

### 47. Selecciona 1 opción

Archivo tiene dos extractores con esquemas distintos. No se sabe de antemano qué tipo de documento llega y se necesita que el modelo elija uno, no texto libre. ¿Qué configuración es apropiada para ese turno?

- **A.** tool_choice=any con descripciones y esquemas diferenciados.
- **B.** Dar ambos esquemas como prosa y eliminar sus definiciones de herramientas.
- **C.** tool_choice=auto y asumir que siempre elegirá una herramienta.
- **D.** Forzar siempre el extractor de cartas aunque puedan llegar facturas.

### 48. Selecciona 1 opción

Archivo comparte un servidor MCP HTTP entre desarrolladores, cada uno con su token de entorno. ¿Qué entrada de proyecto es coherente con el cliente actual?

- **A.** url sin type y el token personal del mantenedor escrito en el repositorio.
- **B.** type=sdk dentro de .mcp.json como sustituto de un servidor HTTP remoto.
- **C.** Configuración solo en el perfil del mantenedor y una instrucción para que otros la hereden.
- **D.** type=http, url del servidor y referencia ${TOKEN} en el encabezado.

### 49. Selecciona 1 opción

Una migración trata null y cadena vacía como lo mismo, pero el producto los distingue. ¿Qué aporta más?

- **A.** Eliminar los datos vacíos de las pruebas para evitar fallos.
- **B.** Pedir más creatividad al modelo para resolver la ambigüedad.
- **C.** Ejemplos y comprobaciones con ambos valores y sus salidas esperadas.
- **D.** Cambiar solo el nombre de la función sin definir comportamiento.

### 50. Selecciona 1 opción

Una corrección de caché arregla datos antiguos pero rompe invalidación. ¿Qué debe incluir la siguiente iteración?

- **A.** Ambos comportamientos, su relación y pruebas de la invariancia requerida.
- **B.** Cambios de estilo para hacer más legible el informe del error.
- **C.** Una solicitud de hacer pasar pruebas reduciendo su cobertura.
- **D.** Solo el último síntoma, omitiendo la corrección previa.

### 51. Selecciona 1 opción

Archivo extrae fechas exactas. Falla con estaciones del año y documentos contradictorios, aunque acierta fechas ISO explícitas. ¿Qué conjunto few-shot aporta más?

- **A.** Fecha exacta, periodo aproximado y conflicto, con salida y razón de cada decisión.
- **B.** Una lista exhaustiva de años posibles sin mostrar cómo decidir ante falta de evidencia.
- **C.** Los documentos que ya pasaron, sin incluir la salida esperada para evitar sesgo.
- **D.** Tres fechas ISO de meses distintos, todas con el mismo resultado correcto.

### 52. Selecciona 2 opciones

La extracción funciona en los dos documentos de demostración. Elige DOS pasos útiles.

- **A.** Evaluar documentos de estructura distinta no usados al ajustar.
- **B.** Dar por concluida la validación con los documentos de demostración.
- **C.** Exigir la misma redacción aunque cambie el contenido de origen.
- **D.** Incluir ejemplos que expliquen el caso ambiguo relevante.

### 53. Selecciona 1 opción

El consumidor de Archivo exige siempre la clave exactDate, pero puede ser desconocida. ¿Qué fragmento expresa mejor ese contrato?

- **A.** required incluye exactDate y su type admite string y null.
- **B.** Se elimina exactDate del esquema y se pide su presencia solo en el prompt.
- **C.** exactDate es opcional con type string; el consumidor supone que siempre existe.
- **D.** required incluye exactDate de type string y se usa una fecha por defecto si falta evidencia.

### 54. Selecciona 1 opción

El JSON de una factura es válido, pero el importe no está en la fuente. ¿Qué procede?

- **A.** Aceptar el importe porque el parser no falló.
- **B.** Rechazar o revisar ese dato mediante validación de evidencia y negocio.
- **C.** Cambiar el nombre del campo a importe_verificado.
- **D.** Repetir el mismo esquema esperando que eso pruebe el dato.

### 55. Selecciona 1 opción

El validador exige normalizar una fecha que sí aparece en el documento. ¿Qué entrada ayuda al siguiente intento?

- **A.** Fuente, extracción anterior y explicación precisa del formato inválido.
- **B.** Solo «respuesta incorrecta», sin el documento ni el valor fallido.
- **C.** La misma salida anterior tratada como ejemplo correcto.
- **D.** Un documento inventado que ya cumpla el esquema.

### 56. Selecciona 1 opción

La suma de partidas y el total impreso difieren. ¿Qué salida sirve para revisión?

- **A.** Un promedio de ambos como si fuera el total declarado.
- **B.** Ambos valores, indicador de conflicto y referencias a la evidencia.
- **C.** Solo el valor que el modelo considera más razonable.
- **D.** Un total nulo sin explicar la contradicción encontrada.

### 57. Selecciona 1 opción

Archivo recibe documentos continuamente. SLA: 27 h desde llegada; se reservan 24 h de ventana de lote y 0.5 h de recogida/validación. ¿Qué frecuencia cabe en ese presupuesto de peor espera?

- **A.** Cada 4 h; basta con que la mediana observada sea inferior a 24 h.
- **B.** Cada 3 h; la reserva total máxima sería 27.5 h.
- **C.** Cada 5 h; se puede excluir del SLA la espera antes del envío.
- **D.** Cada 2 h; la reserva total máxima sería 26.5 h.

### 58. Selecciona 1 opción

Archivo conserva 93 éxitos; tres fallos excedieron contexto, dos fueron transitorios y dos carecen de una fuente externa necesaria. ¿Qué recuperación respeta evidencia y evita trabajo inútil?

- **A.** Reenviar los siete fallos idénticos hasta que todos produzcan una respuesta válida.
- **B.** Reenviar los cien documentos con un esquema más permisivo para reducir errores.
- **C.** Marcar los dos sin fuente como null correcto y cerrar su revisión sin señalar la ausencia.
- **D.** Conservar éxitos, adaptar los tres grandes, reintentar transitorios y obtener las dos fuentes ausentes.

### 59. Selecciona 1 opción

En Archivo, la alta confianza acierta 20/24 formularios y 4/8 cartas. ¿Qué conclusión guía mejor la revisión?

- **A.** Tomar la confianza emitida como probabilidad calibrada y omitir los resultados etiquetados.
- **B.** Usar solo 24/32 global para reducir revisión de ambos segmentos por igual.
- **C.** Eliminar las cartas de la evaluación para comparar solo formatos homogéneos.
- **D.** Medir y ajustar por segmento; las cartas requieren atención aunque el promedio parezca aceptable.

### 60. Selecciona 2 opciones

La cola humana contiene solo baja confianza. Elige DOS mejoras para medir la parte automatizada.

- **A.** Asumir que los no revisados son correctos por definición.
- **B.** Muestrear aleatoriamente alta confianza dentro de segmentos relevantes.
- **C.** Seleccionar solo los documentos de formato más limpio.
- **D.** Comparar precisión por tipo de documento y campo.

