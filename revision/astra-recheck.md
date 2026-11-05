# Verificación de cierre de Astra

Fecha: 5 de noviembre de 2026. Alcance: correcciones R1–R5 del informe histórico `astra-review.md`, más las mejoras opcionales relacionadas. El informe original permanece intacto.

**Veredicto: R1–R5 cerrados; no quedan asuntos Required dentro del alcance de esta pasada.** El paquete es adecuado para comenzar la preparación guiada y offline prevista. Este veredicto evalúa el material entregado, no la preparación actual del alumno ni la probabilidad de aprobar el examen.

## Resultado por hallazgo

| Hallazgo | Estado | Evidencia de cierre |
|---|---|---|
| R1 — clave predecible | Cerrado | Recalculé las claves de los 60 reactivos desde sus opciones originales y permutaciones. Coinciden con control, JSON de clave y encabezados de soluciones. La regla anterior acierta 10/60, frente a 60/60. Los simples se distribuyen A14/B14/C13/D13 y los seis reactivos múltiples usan los seis pares distintos. |
| R2 — allowed-tools | Cerrado | Conceptos D3, C04, respuesta del banco, control 38, VERSIONES y ejemplos distinguen preaprobación de restricción. La diferencia julio/noviembre queda explícita. El ejemplo inactivo advierte que su lista de exclusiones no cubre todas las vías de escritura. |
| R3 — ejemplos y cobertura | Cerrado | E01–E10 aportan los ejemplos concretos que faltaban; las 20 sesiones asignan lectura selectiva, explicación, ejemplo y trabajo del alumno. La matriz tiene 30 tareas con evidencia diferenciada y pendientes específicos, sin equiparar una simulación a integración real. La micropráctica 06 verifica normalización, presupuesto temporal y recuperación por custom_id. |
| R4 — errores del bucle | Cerrado | Repetí el probe entre práctica 02 y práctica 03: un permiso denegado produce is_error=true y conserva category=permission/retryable=false. Una TypeError produce internal/no retry; un resultado vacío válido produce is_error=false. |
| R5 — separación y nivel del control | Cerrado | El banco de aprendizaje ya no contiene campos exam_*. La reserva está en evaluación. Revisé los 20 reactivos reforzados y sus explicaciones, y comprobé la correspondencia de las 58 razones de distractor con las letras permutadas. El control declara qué parte profundiza en aplicación y qué parte comprueba fundamentos, sin prometer dificultad calibrada. |

## Comprobaciones realizadas

Ejecuté `node scripts/ejecutar-practicas.mjs`: las seis prácticas terminaron correctamente. Además del runner, ejecuté tres probes independientes mediante importación de las funciones existentes, sin modificar fuentes:

| Entrada | Resultado observado |
|---|---|
| `readMemory('u1', {id:'m3'})` devuelto al controlador | `is_error:true`, `ok:false`, `category:'permission'`, `retryable:false` |
| Excepción `TypeError('Invalid arguments')` | `is_error:true`, `category:'internal'`, `retryable:false` |
| Resultado `{ok:true, data:[]}` | `is_error:false` y lista vacía conservada |

La verificación programática del control confirmó:

- 60 reactivos y 60 claves, con cantidad de selecciones correcta.
- 60 enunciados y conjuntos ordenados de opciones coincidentes con la reserva.
- 60 claves recalculadas coincidentes con `clave-control.json` y las soluciones.
- 20 reactivos reforzados; sus 58 explicaciones de distractores están asociadas a las letras correctas tras la permutación.
- Ningún campo `exam_*` en `preguntas/banco.json`.
- Desaparición del patrón anterior, con las distribuciones indicadas en la tabla de cierre.

Leí completos los nuevos ejemplos E01–E10, las sesiones detalladas, la matriz y la micropráctica 06. Contrasté en las fuentes locales el uso de `resume`/`forkSession`, `allowedTools` del coordinador frente a `tools` del especialista, y la necesidad de `type` en una entrada MCP remota con `url`. Los ejemplos distinguen configuración representada, validación local y ejecución externa. La aritmética del SLA incluye espera previa y recogida/validación, y aclara que reservar una ventana no garantiza éxito del servicio.

Las respuestas de los 18 cierres en inglés están ahora en otro archivo. El archivo de preguntas enlaza el glosario y ofrece estructuras de frase. La limitación de procedencia de `facts`, `pending` y `errors` en el fixture de contexto también queda explícita; valores distintos se tratan como candidatos a conflicto, no como prueba automática de contradicción temporal.

## Mejoras opcionales y límites

1. **Variar los números del reactivo 59 en una futura reserva.** Utiliza los mismos 18/20 formularios y 5/10 cartas del ejemplo E09. La respuesta es correcta y la interpretación por segmentos es apropiada, pero el reactivo mide más reconocimiento de ese ejemplo que transferencia numérica. Cambiar tamaños y resultados conservaría el concepto. No invalida el conjunto ni reabre R5.
2. **Seguir elevando algunos distractores durante la tutoría.** Parte del control sigue siendo deliberadamente básica. Resulta útil para detectar confusiones, pero su porcentaje no debe interpretarse como equivalente al de un examen con alternativas más próximas. El caso nuevo, las explicaciones del alumno y los cierres ayudan a completar esa evidencia.
3. **Mantener la reserva como material de evaluación, sin atribuirle secreto.** Todos los archivos siguen accesibles si el alumno decide estudiarlos. Si ya vio sus respuestas, una repetición no es una prueba nueva; el siguiente control debe usar variantes no estudiadas.

No ejecuté `tsc`, llamadas pagadas, Claude Code, transporte MCP, SDK externo ni procesos reales de CI, reanudación o subagentes. No se ha evaluado al alumno ni calibrado la prueba con candidatos. Tampoco repetí la auditoría de las 407 descargas: la integridad de esa biblioteca sigue respaldada por la verificación del agente principal, no por esta pasada acotada.

Se conserva el presupuesto de 60 horas y la enseñanza en español antes de preguntar. Los ejemplos adicionales sustituyen lectura general; no autorizan instalaciones, consumo de API, cambios en Abeduls ni trámites de inscripción. La matriz mantiene al alumno como «no evaluado» y registra las experiencias externas todavía pendientes.

## Evidencia de descubrimiento

Se mantuvo el nivel Verify y la evidencia previa de Codebase Memory del proyecto `C-Users-manue-Documents-Codex-2026-11-04-t`. Una nueva comprobación de cobertura de 23 rutas y tres scopes confirmó la generación `2026-11-04T21:13:09Z`: los archivos existentes siguen `not_tracked`, los scopes no tienen entradas y `has_more:false`. No se interpretó esto como cobertura completa. La revisión se apoyó en lectura exacta de los archivos y búsquedas textuales acotadas; no se inventaron relaciones de llamadas del grafo.

La versión revisada resuelve los errores materiales identificados y deja visibles las limitaciones que corresponden a una preparación local sin servicios externos.
