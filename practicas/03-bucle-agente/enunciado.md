# 03 - Bucle, observaciones y terminación

Leer conceptos/03-agentes-orquestacion.md antes de preguntar. Se dispone de respuestas de modelo simuladas: una pide dos lecturas, otra usa sus resultados y termina. Hay que conservar bloques y enlazar cada observación con su llamada.

Diseña qué ocurre con `tool_use`, `end_turn`, respuesta incompleta y límite de herramientas. Un límite no debe producir un estado de éxito. En el fixture todas las herramientas son lecturas independientes; justificar qué cambiaría con acciones dependientes o con efectos.

Después revisar [solucion.ts](solucion.ts). Dibujar una traza y explicar por qué la frase «ya está» no termina el bucle. Explicar qué estado faltaría para reanudar llamadas pendientes tras un corte.

La lógica reproduce un patrón conceptual de Messages API. El Agent SDK puede administrar su propio bucle y expone otras interfaces. Esta simulación no demuestra una integración real con ninguno de los dos servicios.

El controlador exige un resultado interno normalizado: éxito con data o fallo con category, retryable y message. No convierte ok:false en éxito ni considera toda excepción transitoria. Una excepción imprevista se registra como error interno no reintentable por defecto. Adaptar resultados MCP/API a este contrato antes de invocarlo.
