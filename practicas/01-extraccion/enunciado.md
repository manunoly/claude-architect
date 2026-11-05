# 01 - Extracción con datos desconocidos y contradicciones

Antes de responder preguntas, revisar conceptos/01-prompts-estructura.md. Una carta ficticia tiene identificador `carta-1` y texto con una fecha ISO. Diseña una salida con título, fecha exacta que admite null, categoría, detalle y referencia a la fuente.

Tu tarea: separar JSON inválido, estructura inválida y dato que no está sustentado. Una categoría other requiere detalle. Una fecha inexistente en el calendario no es válida. Si la fuente no contiene fecha exacta, conservar null; no inventarla.

1. Escribe el contrato y dos ejemplos correctos.
2. Propón errores específicos que permitan una corrección útil.
3. Explica qué cambiaría si el documento tuviera una fecha en lenguaje natural.
4. Después compara con [solucion.ts](solucion.ts) y ejecuta sus comprobaciones.

La solución usa un subconjunto pedagógico de validación, con fechas ISO literales en los fixtures. No es un validador general de JSON Schema ni una demostración de structured outputs de la API.
