# Prompts y salida estructurada

[Glosario español-inglés](glosario-es-en.md) · [Ejemplos resueltos antes de preguntar](ejemplos-resueltos.md) · [Sesiones concretas](../sesiones-detalladas.md).

Dominio: D4. Presupuesto: 9.25 horas. Dependencias: 00-fundamentos.

**Orden de la sesión:** explicación en español -> ejemplo resuelto -> práctica guiada -> preguntas de aplicación -> cierre en inglés.

## Del deseo al criterio observable
Un prompt útil define tarea, contexto, restricciones y formato, con criterios que distinguen éxito de error. «Revisa bien este código» deja abierto qué reportar. Una instrucción mejor delimita defectos que cambian comportamiento, explica severidad y pide evidencia concreta. Esto reduce falsos positivos y hace revisables las decisiones.

Los ejemplos few-shot enseñan distinciones difíciles. Conviene elegir pocos ejemplos representativos: un patrón correcto que suele confundirse con un bug, un error real y un caso ambiguo. Cada uno muestra la decisión y una explicación breve. Copiar muchos casos triviales consume contexto y no demuestra que el modelo generalice.

## Formato, estructura y verdad son cosas distintas
El temario incluye extracción mediante tool_use y JSON Schema: la herramienta de extracción define campos, tipos y valores admitidos; el modelo proporciona argumentos que se pueden validar. tool_choice puede permitir selección automática, exigir alguna herramienta o forzar una específica. Exigir «alguna» no selecciona por sí mismo la herramienta adecuada.

La documentación actual también ofrece salidas JSON restringidas por esquema. Hay que distinguir esa interfaz de los patrones de tool_use de la guía. En ambos casos, un objeto que cumple el esquema puede contener un hecho falso. Las reglas de negocio y la fidelidad a la fuente requieren comprobaciones adicionales.

Un campo puede ser obligatorio y aceptar null: la clave aparece siempre, pero su valor puede ser desconocido. Esto es diferente de que el campo sea opcional y no aparezca. Si el documento no da una fecha, pedir siempre una fecha concreta incentiva una fabricación. Para clasificaciones abiertas se puede reservar other junto a un detalle; para ambigüedad real, un estado explícito como unclear.

## Validación y corrección
Separar error de sintaxis, incumplimiento del esquema y contradicción semántica. Si el total declarado no coincide con el calculado, conservar ambos y señalar el conflicto. Un reintento útil incluye documento original, salida fallida y errores precisos. Si la información no está en ninguna fuente disponible, repetir no la crea: hace falta otra fuente, un valor desconocido o revisión humana.

Los rechazos y salidas incompletas deben tener una ruta explícita. No asumir que todo resultado de la API contiene el objeto esperado. Limitar la corrección automática evita una secuencia costosa de intentos sin evidencia nueva.

## Lotes y revisión independiente
Elegir procesamiento síncrono cuando alguien espera un resultado para continuar; los lotes sirven para trabajo que tolera su ventana de procesamiento. Correlacionar cada documento con custom_id, conservar estado y reintentar solo fallos que puedan resolverse. Refinar la extracción sobre una muestra antes de procesar todo el archivo.

En revisión de código, separar análisis por archivo de una pasada de integración que sigue datos entre archivos. Un revisor independiente debe recibir requisitos y evidencias, sin heredar la justificación persuasiva del generador. Su independencia no elimina la necesidad de verificar el hallazgo.

## Ejemplo resuelto
Una carta ficticia menciona «el verano de 2004», pero no un día exacto. Un contrato útil conserva date_text, admite exact_date: null y registra la fuente. La solución no rellena 2004-07-01 por comodidad. Si otro recuerdo afirma 2005, se conserva el conflicto para revisión.

## Práctica y comprobación
Práctica 01: validar una extracción y producir errores específicos, sin llamadas a modelo. Practicar D4 del banco después de explicar estos conceptos. Resolver un caso nuevo y cerrar en inglés. Objetivos de guía: 4.1-4.6.

## Fuentes locales de contraste

- [PROMPTS](../biblioteca/api/build-with-claude/prompt-engineering/overview.md) - [original](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview.md)
- [STRUCTURED](../biblioteca/api/build-with-claude/structured-outputs.md) - [original](https://platform.claude.com/docs/en/build-with-claude/structured-outputs.md)
- [TOOLS](../biblioteca/api/agents-and-tools/tool-use/define-tools.md) - [original](https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools.md)
- [BATCH](../biblioteca/api/build-with-claude/batch-processing.md) - [original](https://platform.claude.com/docs/en/build-with-claude/batch-processing.md)
- [GUIA](../biblioteca/examen/foundations-exam-guide.pdf) - [original](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F6nizmqk8tpzpfjvt6qmmav7rh%2Fpublic%2F1783542750%2FClaude+Certified+Architect+%E2%80%93+Foundations+Exam+Guide.pdf)

## Evidencia para cerrar el tema

- Explicar la decisión con tus palabras y aplicarla a un caso distinto.
- Resolver la práctica y justificar un fallo o alternativa.
- Realizar las preguntas de cierre y la defensa en inglés.
- Registrar errores y repaso D+2/D+7. El tutor no marcará dominio por mera lectura.
