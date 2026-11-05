# Proyecto integrador Abeduls - 6 horas

Supuesto ficticio de estudio: un asistente consulta recuerdos autorizados y genera un borrador con referencias. Nunca lee contenido sellado antes de su apertura; no publica ni comparte directamente. Si dos fuentes discrepan, conserva la contradicción. Un fallo de proveedor no se presenta como ausencia de recuerdos.

## Entregables del alumno
- Diagrama de componentes y decisión sobre flujo, agente y delegación, comparada con una alternativa.
- Contratos de hasta cuatro herramientas y formato de errores. Identidad confiable separada de argumentos del modelo.
- Traza de tool_use/tool_result y estados de cierre, límite e interrupción. Indicar qué corresponde al SDK y qué a la aplicación.
- Política de contexto y manifiesto de recuperación con fuentes y tareas pendientes.
- Diez casos con resultado esperado: lectura permitida; otro propietario; cápsula sellada; búsqueda vacía; timeout; instrucción incrustada; conflicto de fechas; salida inválida; corte por presupuesto; recuperación con permisos cambiados.
- Explicación de cómo configurar instrucciones, reglas y revisión CI si el equipo mantuviera esta función.

Primeras tres horas: arquitectura, contratos y casos. Siguientes tres: implementar o representar la traza local, verificar casos y defender decisiones. No cambiar el producto real ni usar datos de clientes.

## Rúbrica interna (20 puntos)
Cinco dimensiones de 0 a 4: arquitectura, contratos/controles, ejecución/recuperación, contexto/procedencia, evaluación/comunicación. 0 = ausente; 1 = afirmación sin evidencia; 2 = diseño parcial; 3 = requisitos principales demostrados; 4 = casos de borde, alternativas y evidencia verificable.

Si se permite acceso no autorizado, se finge cobertura de una fuente fallida o se marca un corte como éxito, el proyecto requiere corrección aunque la suma sea alta. El tutor debe contrastar resultados con casos nuevos, no solo con la solución preparada.
