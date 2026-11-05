# Microprácticas de ejemplos aplicados

Estudiar primero E02 y E07 de [ejemplos resueltos](../../conceptos/ejemplos-resueltos.md). Se incluyen dentro de los bloques ya asignados a hooks y lotes, sustituyendo lectura general; no agregan horas al roadmap.

Antes de abrir la solución: definir cómo conservar proveedor, dato original, unidad temporal, estado desconocido y resultado normalizado. Después resolver un SLA distinto y decidir qué documentos de un lote deben reintentarse y cuáles necesitan una fuente adicional.

La solución es TypeScript local y no conecta un hook, un servidor ni la API de lotes real. La ventana publicada no garantiza que toda solicitud termine con éxito. Las comprobaciones verifican transformaciones y planificación local.
