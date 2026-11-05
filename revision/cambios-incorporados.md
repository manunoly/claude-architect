# Cambios incorporados tras la revisión de Astra

El informe original se conserva como evidencia de la revisión inicial; describe una versión anterior y no debe interpretarse como lista automática de fallos vigentes. La [comprobación de cierre](astra-recheck.md) cerró R1-R5 sin Required pendientes en esa pasada. Después se varió la aritmética del reactivo 59, como mejora opcional, y se verificó localmente.

| Hallazgo | Corrección | Evidencia |
|---|---|---|
| R1: patrón mecánico de claves | Permutación independiente de opciones y clave recalculada por contenido; distribución de simples A14/B14/C13/D13 y seis pares distintos en múltiples. | seguimiento/verificacion-control-v2.json. La regla anterior acierta 10/60, frente a 60/60. |
| R2: allowed-tools enseñado como restricción | Se distingue preaprobación, pool disponible, disallowed-tools/deny, tools de subagentes y autorización del servicio. Se documenta la diferencia julio/noviembre. | conceptos/04, VERSIONES, C04 y ejemplo inactivo de skill. |
| R3: ejemplos y cobertura demasiado generales | Diez ejemplos aplicados; micropráctica 06; guion de lecturas y ejercicios para las 20 sesiones. Matriz con evidencia y pendientes específicos por tarea. | conceptos/ejemplos-resueltos.md, sesiones-detalladas.md y cobertura-blueprint.csv. |
| R4: error estructurado marcado como éxito | Contrato normalizado de devolución; is_error derivado de ok, categoría preservada, excepción inesperada como internal/no retry. | práctica 03 y comprobaciones de permiso, TypeError y formato no reconocido. |
| R5: reserva incrustada y distractores débiles | Se eliminan campos exam_* del banco de aprendizaje. Reserva y soluciones separadas en evaluación. Veinte reactivos con restricciones/trazas/configuración/SLA y razones específicas de sus distractores. | evaluacion/reserva-control.json, control-60.md y soluciones-control-60.md. |
| O1: respuestas EN visibles por accidente | Preguntas y modelos de respuesta en archivos diferentes, con glosario y estructuras de frase para cierres iniciales. | preguntas/cierre-ingles.md y respuestas-cierre-ingles.md. |
| O3: alcance del filtrado y conflictos | Se aclara que solo claims tiene procedencia en el fixture y que valores distintos son candidatos a conflicto, no contradicción probada. | práctica 04 y ejemplo E09. |

Además, la comprobación de validación de práctica 01 exige que category sea una cadena; un array que se convierte a «family» no debe aceptarse. Se añadió su caso de regresión. Una mutación que elimina la comprobación de propietario hace fallar las pruebas en una copia fuera de la entrega.

## Límites conservados

- Los 40 reactivos no reforzados siguen siendo comprobaciones de fundamentos. La prueba no tiene calibración psicométrica ni permite prometer aprobación.
- La reserva no es secreta: el alumno tiene sus soluciones para estudio; se solicita abrirlas después del intento.
- Los ejemplos de SDK, MCP y configuración son representaciones o simulaciones offline; no prueban conectividad ni carga real de Claude Code.
- El control completo está en español. Los cierres por tema y la defensa final son en inglés; un simulacro íntegro en inglés con reactivos nuevos se podrá preparar en la fase de refuerzo.
- Se ejecuta TypeScript mediante eliminación de tipos en Node 24.22.1; no se ha afirmado una ejecución de tsc ni validación contra paquetes SDK instalados.
- La biblioteca mantiene originales y corpus textuales oficiales; vídeos, quizzes y algunos enlaces o imágenes de origen siguen online.
- Se ha creado un proyecto en carpeta local. No se registró como proyecto de la barra lateral de la aplicación.

Estas limitaciones son del material y de las comprobaciones realizadas, no notas del alumno. Su progreso permanece sin evaluar.
