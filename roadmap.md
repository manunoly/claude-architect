# Roadmap Foundations - 4 semanas / 60 horas

## Resultado buscado
Prepararte para interpretar escenarios y justificar decisiones en los cinco dominios de Foundations. Trabajaremos en TypeScript y en español; cada tema se cierra parcialmente en inglés. No se fija una fecha de examen ni se equipara completar 60 horas con aprobar.

La guía oficial descargada es versión 1.0, efectiva en julio de 2026, con 30 tareas en cinco dominios. El mapa de cobertura relaciona cada tarea con material, preguntas y ejercicios. La documentación técnica es una captura del 5 de noviembre de 2026; las diferencias de versión están registradas.

## Reparto del tiempo
| Bloque | Horas | Propósito |
|---|---:|---|
| M0: fundamentos y orientación TypeScript | 2 | Contexto, bloques y validación en ejecución |
| D4: prompts y salida estructurada | 9.25 | Criterios, few-shot, esquemas, validación, lotes y revisión |
| D2: herramientas y MCP | 8.25 | Contratos, errores, ámbitos y selección de herramientas |
| D1: agentes y orquestación | 12.5 | Bucles, delegación, hooks, sesiones y handoffs |
| D3: Claude Code | 9.25 | Jerarquía, reglas, skills, planificación y CI |
| D5: contexto y fiabilidad | 6.75 | Hechos, recuperación, escalado, calibración y procedencia |
| Proyecto integrador | 6 | Diseño y verificación de un caso completo |
| Evaluación final | 4 | Control de 60 reactivos, caso nuevo y defensa en inglés |
| Revisión y refuerzo final | 2 | Corregir y transferir lo aprendido |
| **Total** | **60** | **15 por semana** |

Las horas de dominio se aproximan a sus pesos oficiales; no son una predicción de cuántas preguntas saldrán. D1 se inicia con patrones y bucles antes de D2; su implementación y coordinación continúan después de aprender herramientas. Esta dependencia se respeta en las sesiones.

Cada sesión de tres horas combina lectura selectiva, explicación, ejemplo resuelto y trabajo del alumno. Los cierres en inglés y repasos están incluidos en esos bloques, no se suman a las 60 horas. Reservar aproximadamente 15-30 minutos de las sesiones 4, 8, 11, 14 y 16 para el cierre EN, y un cierre breve de M0 dentro de la sesión 1.

## Sesiones

Cada sesión tiene lecturas y ejemplos concretos en [sesiones-detalladas.md](sesiones-detalladas.md). Los [ejemplos aplicados](conceptos/ejemplos-resueltos.md) cubren configuraciones y subhabilidades señaladas en la revisión, dentro de las horas ya asignadas.
Cinco sesiones de tres horas por semana. Los números indican orden, no fechas obligatorias.

| Semana | Sesión | Trabajo | Evidencia al terminar |
|---:|---:|---|---|
| 1 | 1 | M0: fundamentos (2 h) + D4: criterios de prompts (1 h) | Mapa de componentes y contrato de salida |
| 1 | 2 | D4: ejemplos, ambigüedad y esquemas (3 h) | Contrato con null, unclear y procedencia |
| 1 | 3 | D4: validación y corrección (3 h) | Práctica 01 con casos de error |
| 1 | 4 | D4: lotes/revisión/cierre EN (2.25 h) + D1: patrones (0.75 h) | Selección síncrono/lote y cierre en inglés |
| 1 | 5 | D1: bucles y estados de terminación (3 h) | Traza tool_use/tool_result/end_turn |
| 2 | 6 | D2: herramientas, contratos y errores (3 h) | Práctica 02 y taxonomía de fallos |
| 2 | 7 | D2: MCP y herramientas de desarrollo (3 h) | Mapa host/cliente/servidor y tool/resource |
| 2 | 8 | D2: configuración/cierre EN (2.25 h) + D1: delegación (0.75 h) | Contrato de especialista y cierre en inglés |
| 2 | 9 | D1: coordinación, contexto y hooks (3 h) | Práctica 03, resultados parciales y controles |
| 2 | 10 | D1: sesiones y descomposición (3 h) | Reanudar, fork y revisión en varias pasadas |
| 3 | 11 | D1: handoff/cierre EN (2 h) + D3: jerarquía (1 h) | Transferencia completa y cierre en inglés |
| 3 | 12 | D3: reglas, comandos y skills (3 h) | Configuración por ámbito y rutas |
| 3 | 13 | D3: hooks, planificación e iteración (3 h) | Práctica 05 con denegaciones observables |
| 3 | 14 | D3: CI/cierre EN (2.25 h) + D5: contexto (0.75 h) | Hallazgos CI estructurados y cierre en inglés |
| 3 | 15 | D5: compresión, recuperación y escalado (3 h) | Práctica 04 y manifiesto recuperable |
| 4 | 16 | D5: calibración, procedencia/cierre EN (3 h) | Muestreo, conflictos y cierre en inglés |
| 4 | 17 | Proyecto integrador Abeduls (3 h) | Arquitectura, contratos y conjunto de casos |
| 4 | 18 | Proyecto integrador Abeduls (3 h) | Comprobaciones, errores y defensa de decisiones |
| 4 | 19 | Control de 60 reactivos (2 h) + revisión (1 h) | Resultado bruto y registro de errores |
| 4 | 20 | Caso nuevo (1 h) + defensa EN (1 h) + revisión (1 h) | Transferencia a otro sector y plan de refuerzo |

## Cursos y documentación
- [Building with the Claude API](biblioteca/cursos/building-with-the-claude-api.txt): seleccionar secciones de prompting, tool use, agents/workflows y evaluación; no es necesario estudiar todas las ampliaciones.
- [Introduction to MCP](biblioteca/cursos/introduction-to-model-context-protocol.txt): curso base del dominio 2.
- [Claude Code in Action](biblioteca/cursos/claude-code-in-action.txt): acompañar configuración y flujos del dominio 3.
- [Introduction to evals](biblioteca/cursos/introduction-to-evals.txt): apoyo a evaluación y fiabilidad.
- [Guía oficial local](biblioteca/examen/foundations-exam-guide.pdf), [biblioteca priorizada](biblioteca/LEEME.md) y [matriz de cobertura](seguimiento/cobertura-blueprint.csv).

Los cursos pueden contener ejemplos Python y temas fuera de examen. Se traducen sus ideas a TypeScript; no se invierte el núcleo de estas cuatro semanas en visión, embeddings, infraestructura MCP, OAuth, streaming, precios o entrenamiento de modelos. No confundir ver un vídeo con haber practicado una habilidad.

## Cómo enseñaremos cada tema
1. Explicación en español con glosario de 5-10 términos y un diagrama o ejemplo cuando aclare la decisión.
2. Ejemplo resuelto que compara opciones plausibles y muestra dónde verificar el resultado.
3. Práctica guiada; después variación que resuelve el alumno con datos ficticios.
4. Preguntas en español solo después de los conceptos; corrección con razones y evidencia.
5. Cierre en inglés: interpretar un caso nuevo, responder tres preguntas y explicar la arquitectura brevemente. Se permite consultar el glosario durante el primer cierre.
6. Repaso a los dos y siete días: nueva pregunta o variante, sin releer primero las respuestas.

## Criterios pedagógicos de avance
- Explicar el concepto, compararlo con una alternativa y decidir con los requisitos del caso.
- En práctica, demostrar resultados esperados y fallos relevantes; los controles de autorización y la preservación de evidencia deben funcionar.
- Al menos 80% en un conjunto formativo nuevo y justificación de los errores. Es un objetivo interno, no la nota oficial.
- Completar el cierre en inglés entendiendo la pregunta y sosteniendo la decisión; los errores de idioma que no cambian el sentido se corrigen sin confundirlos con fallos técnicos.
- Si un control crítico falla, el tema sigue abierto aunque la nota global sea alta.

## Evaluación final y límites
El control usa 60 reactivos originales con distribución 16/11/12/12/9 por dominio, en 120 minutos. No se presenta como examen oficial ni como predictor validado. Objetivo interno: 85% global y 75% en cada dominio, más caso de transferencia y defensa en inglés. El control final se separa del banco de aprendizaje; no abrir su clave antes de responder.

Una sola prueba no basta para prometer preparación. Si el resultado no sostiene el dominio, se registra una fase adicional de refuerzo con casos nuevos, sin rebajar los criterios para terminar en la cuarta semana. Cualquier simulacro posterior deberá usar reactivos no vistos.

El proyecto Abeduls es el hilo conductor. También se practican los seis contextos de la guía: soporte, generación de código, investigación multiagente, productividad del desarrollador, CI y extracción. Así se evita aprender respuestas que solo funcionan en un producto.

## Presupuesto
Los ejercicios preparados no llaman a la API. La cuenta, vídeos y evaluaciones de cursos oficiales siguen online. La integración real con un modelo y SDK queda como extensión cuando se decida un presupuesto; su ausencia se registra como experiencia aún no demostrada, no se oculta bajo pruebas simuladas.
