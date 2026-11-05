# Auditoría independiente (Claude) — 5 de noviembre de 2026

**Alcance.** El proyecto de preparación de Claude Certified Architect – Foundations (CCAR-F v1.0), revisado en sus siete ejes: temario, exactitud técnica, pedagogía, preguntas, prácticas, viabilidad en 60 h y uso/costes. Quedan fuera la inscripción y el acceso al examen.

**Método.** La auditoría fue de solo lectura, sin cambios en el material ni instalaciones. Participaron diez agentes, Opus y Fable, con esfuerzo xhigh:

- Siete auditores, uno por eje.
- Verificación cruzada adversarial entre modelos: Opus verificó lo de Fable y Fable lo de Opus. Se verificaron 62 hallazgos de severidad media o mayor: 42 quedaron confirmados, 20 parciales (corregidos o redimensionados) y ninguno refutado. Los 30 de severidad baja no se verificaron.
- Contraste con la revisión de Astra solo **después** de formar criterio propio.

Fuentes: la biblioteca local (captura del 5-nov-2026) y una lectura en vivo de las páginas oficiales de Anthropic. El orquestador comprobó a mano los hallazgos principales.

**Comprobaciones ejecutadas.**

- `node scripts/ejecutar-practicas.mjs` termina con EXIT 0 en las 6 prácticas.
- `node scripts/verificar-biblioteca.mjs` verifica 407 fuentes con 0 fallos (Node 22.23.3).
- El PDF de la guía descargado hoy tiene el mismo sha256 que la copia local, y 20 páginas técnicas críticas son idénticas byte a byte a su versión en vivo.

Que todo esto funcione demuestra que el paquete está íntegro. **No** demuestra que el alumno esté preparado: todavía no hay respuestas suyas (`seguimiento/progreso.csv`, `seguimiento/bitacora.md`).

---

## 1. Veredicto

**Base sólida y exacta, pero todavía no es un instrumento de preparación completo.** Hay tres carencias que afectan directamente al examen. Se corrigen sin añadir horas al alumno.

1. **Exactitud y estructura: bien.** No se encontró ninguna afirmación técnica que contradiga a la vez la guía y la documentación. Las horas se ajustan a los pesos oficiales, las 30 tareas tienen preguntas y la clave del control es correcta: un auditor resolvió los 60 ítems sin verla y coincidió en 60/60.
2. **La evaluación final no da una señal independiente.** El control repite los mismos 60 conceptos del banco, con 40 explicaciones copiadas literalmente, y tiene pistas de forma que permiten acertar sin saber. Un 85 % en él puede sobrestimar la preparación.
3. **Nunca se ensaya el formato real.** El examen es solo en inglés, con 60 ítems en 120 minutos. El control está en español, el banco no tiene ningún ítem de opción múltiple y las 12 preguntas de muestra oficiales no están programadas.
4. **Faltan unos 15 mecanismos que la guía nombra de forma literal.** Entre ellos: plan mode, Explore subagent, `.claude/commands` frente a `~/.claude/commands` (muestra oficial Q4), `/compact`, PostToolUse, «lost in the middle» y el 50 % de ahorro de Batches. Además, cuando la guía v1.0 y la documentación de noviembre discrepan, no hay una regla de qué responder.

No se puede predecir el resultado del examen. Corregir estos puntos mejora la validez de la preparación, no la garantiza.

## 2. Fortalezas principales

- **Horas proporcionales a los pesos.** D1–D5 reciben 12,5/8,25/9,25/9,25/6,75 h, que son 27,2/17,9/20,1/20,1/14,7 % de las 46 h de dominio (`roadmap.md:11-20`; guía `foundations-exam-guide.txt:65-71`). Suman 60 h con 15 h por semana.
- **Cobertura nominal completa.** Las 30 tareas oficiales tienen ítems en `preguntas/banco.json` y en `evaluacion/control-60.md`, con un reparto de 16/11/12/12/9.
- **Exactitud técnica alta.** Están bien, entre otros: el bucle `stop_reason` (`practicas/03-bucle-agente/solucion.ts:25-36`), `isError` de MCP frente a `is_error` de la API (`conceptos/02-herramientas-mcp.md:17,26`), `Agent` en `allowedTools` (`conceptos/ejemplos-resueltos.md:19`), que un `url` sin `type` se interprete como stdio (`:79`, con `biblioteca/code/mcp.md:83`), la forma real de la salida de PreToolUse (`practicas/05-claude-code/solucion.ts:5,13`) y los datos de Batches.
- **Las diferencias de versión están registradas.** Task→Agent, allowed-tools, commands/skills y `output_config` aparecen en `biblioteca/VERSIONES.md:7-12`.
- **Biblioteca al día.** La guía local es la vigente, CCAR-F no está en la actualización del 7-dic-2026 y la especificación MCP 2026-07-28 sigue vigente. Consulta en vivo del 2026-11-05 en anthropic-partners.skilljar.com y pearsonvue.com.
- **Honestidad.** El proyecto no inventa progreso (`progreso.csv`: M0 en curso, el resto sin iniciar), separa lo simulado de lo real (`practicas/LEEME.md:15`, columna `pendiente_integracion_o_medicion`) y no presenta umbrales internos como si fueran oficiales.
- **Orden pedagógico declarado y aplicado.** El orden es concepto → ejemplo → práctica → preguntas → cierre (línea 7 de cada `conceptos/0*.md`; sesión 1 en la bitácora). Las respuestas modelo están separadas de las preguntas.
- **Coste cero.** Todo funciona offline con Node, sin claves, paquetes ni suscripciones.

## 3. Carencias y errores

Severidad tras la verificación cruzada. «Exam.» indica un requisito del examen; «Prof.» indica una recomendación profesional.

| # | Sev. | Tipo | Carencia | Evidencia |
|---|---|---|---|---|
| C1 | Alta | Exam. | **El control final no es independiente del banco.** Sus 60 `concept_id` coinciden 1:1 con los ids del banco y 40/60 `explanation_es` son literalmente `answer_es` (verificado con node). Contradice «se separa del banco» y «material independiente». | `evaluacion/reserva-control.json`; `roadmap.md:79`; `evaluacion/LEEME.md:8` |
| C2 | Alta | Exam. | **Se puede acertar por pistas de forma.** La correcta es la opción más larga en 28–29 de 54 ítems de respuesta única (25 % esperado); en los 40 básicos, 25–26/36. Una regla sin conocimiento (descartar absolutos y elegir la más larga) acierta 36/60, y 30/40 en los básicos. | `evaluacion/control-60.md` + `clave-control.json` (cálculo de dos auditores) |
| C3 | Alta | Exam. | **No hay ensayo del formato real.** El examen es en inglés, 60 ítems y 120 min (`biblioteca/examen/foundations-scope.html`, «Language: English»). El control está en español y la simulación en inglés se aplaza a «después». El banco tiene 0 ítems de opción múltiple. Las 12 muestras oficiales (guía ~l.883-1110) no están en el roadmap. El único material en inglés de opción múltiple, el diagnóstico inicial, está archivado. | `evaluacion/LEEME.md:8`; `preguntas/banco.json`; `archivo/LEEME.md` |
| C4 | Alta | Exam. | **Mecanismos nombrados por la guía que no se enseñan ni se evalúan.** Búsqueda de plan mode, Explore, `/compact` y «lost in the middle» en conceptos/, preguntas/, evaluacion/, practicas/, roadmap y sesiones: 0 resultados. `conceptos/04` además resta importancia a memorizar la ruta de commands, que es justo lo que pregunta la muestra Q4. También faltan: peticiones con varios asuntos (1.4), 18 frente a 4-5 herramientas (2.3), Read+Write cuando Edit falla (2.5), 50 % de ahorro de Batches (4.5), sentimiento y confianza autodeclarada como señales poco fiables (5.2), contexto de error estructurado (5.3, solo en papel) y PostToolUse. El glosario tiene 31 términos y ninguno de D3. | Guía :201, :308, :397-405, :436-450, :635, :648-649, :679-696, Q4 :944, Q5 :960; `conceptos/04-claude-code.md:15`; `conceptos/glosario-es-en.md` |
| C5 | Media | Exam. | **Falta una regla de respuesta cuando la guía v1.0 y la documentación discrepan.** Los ítems se redactan contra la guía (guía :124), pero el material enseña la versión de noviembre sin decir qué responder. Casos: allowed-tools «restringe» frente a «preaprueba» (guía :410-411 frente a `skills.md:617`; ítem #38 limitado a noviembre); `Task` frente a `Agent` (guía :168 frente a `sub-agents.md:507`); `/memory` frente a `/context all` (`memory.md:72`). Además hay un desfase **no registrado**: forzar herramienta con `tool_choice` `any`/`tool` devuelve 400 en Opus 5.5, Sonnet 5.5, Fable 5.1 y Mythos 5.1, y `ejemplos-resueltos.md:163` lo enseña sin advertirlo. | `biblioteca/api/agents-and-tools/tool-use/define-tools.md:588-593`; `biblioteca/VERSIONES.md`; `evaluacion/control-60.md:352-359` |
| C6 | Media | Pedag. | **El banco y los cierres en inglés no entrenan el diagnóstico en escenario.** Ninguna de las 60 preguntas trae síntomas, cifras u opciones. Los 18 cierres repiten la misma tarea («Change one requirement…»), sin un caso distinto y sin rúbrica para la defensa. Las preguntas abiertas no tienen criterios mínimos, así que el «80 % en un conjunto formativo nuevo» no se puede calcular. | `preguntas/banco.json`; `preguntas/cierre-ingles.md`; `roadmap.md:74` |
| C7 | Media | Pedag. | **Las prácticas se ejecutan, no se escriben.** El runner solo ejecuta `solucion.ts` y no hay archivo de partida. D3 no tiene ninguna práctica observada: la 05 es un gate de despliegue y los ejemplos están inactivos. Coordinador y subagentes (1.2, 1.3, 1.6; escenario 3) y CI (escenario 5) solo existen en papel. Algunas comprobaciones son triviales: la 01 solo comprueba `ok:false` y en la 02 `providerUnavailable` es inalcanzable. | `scripts/ejecutar-practicas.mjs:5-7`; `seguimiento/cobertura-blueprint.csv:3-4,7`; `practicas/01-extraccion/solucion.ts:32-39`; `practicas/02-herramientas/solucion.ts:23` |
| C8 | Media | Viab. | **Repasos y colchón insuficientes.** Faltan 5 de 12 repasos (los D+7 de D4, D1, D3 y D5, y el D+2 de D5), mientras M0 recibe 3. No hay ningún control intermedio. El control llega en S19 con 2 h de revisión y el refuerzo queda fuera de las 60 h (el plan lo declara). | `sesiones-detalladas.md:21-133`; `roadmap.md:20,81` |
| C9 | Media | Uso | **Seguimiento sin campos de resultado y sin una entrada de «hoy».** `progreso.csv` no tiene aciertos/total, horas reales, ayuda usada en inglés ni resultado del control. «Empieza aquí» lista 9 materiales: el índice de 73 KB de la biblioteca es el paso 3 y la bitácora (dónde se va) no está enlazada. | `seguimiento/progreso.csv:1`; `LEEME.md:5-14` |
| C10 | Media | Uso | **`cobertura-blueprint.csv` sobrestima la práctica.** Llama «ejercicio en papel» a ejemplos ya resueltos y tiene referencias erróneas: 1.4→E04, que trata otra cosa; 2.1; 3.5; 5.1. | `seguimiento/cobertura-blueprint.csv:5` y otras |
| C11 | Media | Exact. | **Una regla del entorno de autoría se coló en el material.** «AGENTS.md exige preferir el grafo», pero AGENTS.md no contiene esa regla (verificado), y la clave de T10 la incorpora. Confunde al alumno en la tarea 2.5. | `conceptos/02-herramientas-mcp.md:31`; `conceptos/ejemplos-resueltos.md:222`; `preguntas/banco.json` (T10) |
| C12 | Media | Exam. | **Los 6 escenarios oficiales nunca aparecen como tales.** Se fusionan en 4 contextos ficticios; los escenarios 4 (productividad) y 5 (CI) no tienen práctica. | Control: Nexo/Lumen/Orion/Archivo; guía :76-120 |
| C13 | Baja | Uso | **No se usan cursos oficiales gratuitos y breves que cubren D1 y D3.** Son Introduction to subagents (45 min), Introduction to agent skills (1 h) y Claude Code 101. Tampoco se avisa de que los laboratorios de los cursos piden una clave de API con saldo. | academy.claude.com/courses (2026-11-05) |

**Puntos menores (opcionales).**

- Las soluciones tienen líneas de más de 140 caracteres y casi ningún comentario. Es el punto O2 de Astra y sigue sin aplicarse.
- `tsc` nunca se ejecuta (Node solo elimina tipos): en `practicas/03-bucle-agente/solucion.ts:40` hay un `input:'one'` donde la API espera un objeto.
- La taxonomía de «proveedor caído» se contradice: es `transient` en la 02 e `internal` en la 03.
- Faltan valores nuevos de `stop_reason`, el ámbito MCP `local` y la diferencia `fork_session`/`forkSession`.
- Los archivos `verificacion-*.json` están en `seguimiento/` y se pueden confundir con progreso del alumno.
- El README pide Node 24, pero funciona con 22.23.3.

## 4. Recomendaciones priorizadas

Las horas que se indican son de **autoría**, no del alumno.

### Imprescindible (unas 6-8 h de autoría)
1. **Ensayar el formato real.** Programar las 12 muestras oficiales en inglés, cronometradas y con análisis de distractores. Reutilizar el diagnóstico archivado (10 ítems de opción múltiple en inglés, originales) como minicontrol intermedio. Pasar el control final a inglés; la corrección puede seguir en español. Coste mínimo: reorganizar la agenda. Resuelve C3.
2. **Dar al control una señal independiente.** Como mínimo viable (unas 2 h):
   - Corregir el texto que lo llama «independiente».
   - Usar los 20 reforzados, las muestras y el diagnóstico como señal principal, y tratar los 40 básicos como repaso.
   - Equilibrar la longitud de las opciones en los ítems con pista.

   Para que sea completo, escribir 20-30 ítems nuevos en inglés, no derivados del banco, que entren en el control y sirvan de reserva real para repetir. Resuelve C1, C2 y C8.
3. **Tabla «mecanismo → ruta/ámbito → cuándo usarlo» en `conceptos/04`.** Incluir CLAUDE.md por nivel, `@import`, `/memory` y `/context all`, `.claude/rules` con paths, commands y skills de proyecto frente a personales, plan mode, Explore, PreToolUse/PostToolUse y `-p`/`--output-format`. Quitar la frase que resta importancia a las rutas. Añadir en conceptos/02 y conceptos/05 las viñetas de C4 que faltan. Llevar los términos al glosario y escribir 3-4 ítems. Unas 2 h. Resuelve C4.
4. **Regla de examen en `VERSIONES.md`.** Una columna «qué responder en el examen (guía v1.0)» con allowed-tools, Task, `/memory` y `tool_choice` forzado (añadiendo este desfase), y la misma regla en una línea de `conceptos/04` y `conceptos/01`. Unos 30 min. Resuelve C5.

### Recomendable
5. **Un caso corto por dominio en los cierres en inglés**, con rúbrica 0-2 por criterio: entiende la pregunta, decide con los requisitos y defiende el compromiso. Añadir criterios mínimos de acierto a las preguntas abiertas. Resuelve C6.
6. **Archivos de partida para las prácticas 01-03** (`intento.ts` con TODO y las mismas comprobaciones), sin rehacer el runner, y endurecer las comprobaciones triviales. En D3, el alumno redacta su propio CLAUDE.md, una regla con paths y una skill para Abeduls, en papel o en una carpeta temporal. Observar su carga real con Claude Code es opcional: necesita turnos del modelo, así que solo si el alumno lo acepta. Resuelve C7.
7. **Completar los D+2/D+7 que faltan** en los primeros 10 min de cada sesión, y añadir a `progreso.csv` las columnas `aciertos`, `horas_reales`, `ayuda_en` y `resultado_control`. Resuelve C8 y C9.
8. **Simplificar «Empieza aquí»** a tres pasos: guía de hoy (bitácora), sesión actual y seguimiento. La biblioteca, como consulta. Resuelve C9.
9. **Corregir `cobertura-blueprint.csv` y eliminar la regla del grafo** de conceptos/02, de E10 y de la clave de T10 (unos 30 min). Resuelve C10 y C11.
10. **Etiquetar cada ítem del control con su escenario oficial** y sustituir lectura genérica por los cursos gratuitos de subagentes y skills (vídeos, sin laboratorios de pago). Resuelve C12 y C13.

### Opcional
11. Partir en líneas y comentar las soluciones 01-05. Ejecutar `tsc --noEmit` solo si ya está disponible; no instalarlo.
12. Añadir a `VERSIONES.md` los valores nuevos de `stop_reason`, el ámbito MCP `local` y `fork_session`, como «vigente, no evaluado».
13. Mover `verificacion-*.json` fuera de `seguimiento/` y actualizar la versión de Node del README.

## 5. Ajustes al roadmap (se mantienen 60 h)

**Semanas 1-3.** Las horas por dominio no cambian; solo cambia el contenido de bloques que ya existen.

| Sesión | Cambio |
|---|---|
| Todas | Los primeros 10 min, del hueco de cierre/repaso, se dedican a los repasos vencidos. |
| S1 | 10 min de la lectura: estructura de la guía, 6 escenarios, idioma y formato. |
| S4, S8, S11, S14, S16 | Cierre en inglés con caso distinto y rúbrica (30 min; 10 se toman de la lectura). |
| S7 | En la lectura: 2.3, 2.4 y 2.5 (número de herramientas, descubrimiento simultáneo, descripción MCP frente a Grep, Read+Write). |
| S9 | En la práctica: petición con varios asuntos y objeto de error/handoff estructurado (1.4, 5.3). |
| S10 | **Minicontrol 1**: el diagnóstico archivado en inglés (25 min) y su corrección (20 min), en lugar de las preguntas y parte de la práctica. |
| S12-S13 | Tabla de mecanismos de D3, redacción de CLAUDE.md, regla y skill propios, y los cursos gratuitos de subagentes y skills en el bloque de lectura. |
| S15 | `/compact`, «lost in the middle», sentimiento y confianza autodeclarada como señales poco fiables. |

**Semana 4 (reorganizada).**

| Sesión | Contenido | h |
|---|---|---|
| S16 | D5: calibración y procedencia, y cierre en inglés (sin cambios) | 3 |
| S17 | 12 muestras oficiales en inglés cronometradas y análisis de distractores (0,75 h). Proyecto: arquitectura, 4 contratos y 10 casos reutilizando las prácticas 02-04 (2,25 h) | 3 |
| S18 | Control en inglés cronometrado (2 h) y corrección por tarea con confianza (1 h) | 3 |
| S19 | Refuerzo dirigido a las tareas o dominios por debajo del umbral, con variantes nuevas (1,5 h). Proyecto: verificación de casos (1,5 h) | 3 |
| S20 | Caso nuevo (1 h), defensa en inglés con requisito cambiado (1 h) y reintento D+2 de los errores del control (1 h) | 3 |

Nuevos totales: M0 2 · D4 9,25 · D2 8,25 · D1 12,5 · D3 9,25 · D5 6,75 · muestras oficiales 0,75 · proyecto 3,75 · evaluación final 4 · revisión y refuerzo 3,5 = **60 h** (15 h por semana).

Lo que se sacrifica: el proyecto integrador baja de 6 a 3,75 h y queda en diagrama, contratos, casos con resultado esperado y defensa. El examen no mide implementarlo. Si los criterios no se cumplen, el refuerzo adicional que ya prevé `roadmap.md:81` usa los ítems nuevos de la recomendación 2.

## 6. Evidencias para dar por completada la preparación

Que el material esté completo no basta. Hacen falta, registradas por el alumno y con fecha:

1. **Por dominio:** una explicación propia en español en la bitácora, y una decisión defendida en inglés ante un caso distinto, con la puntuación de la rúbrica y la ayuda usada.
2. **Por práctica:** un intento propio, en código o en papel, *antes* de abrir la solución, con al menos un caso de fallo justificado.
3. **Banco:** primer intento con aciertos/total por dominio. Cada error, en `errores.csv` con su tarea y tipo, y reintentado a D+2 y D+7 con variantes no vistas (`resultado_reintento` relleno).
4. **D3:** la tabla de mecanismos y ámbitos resuelta sin consultar, y el CLAUDE.md, la regla y la skill propios.
5. **Formato real:** el minicontrol (diagnóstico) y las 12 muestras oficiales en inglés, cronometrados, con tiempo por ítem y la justificación de al menos 3 distractores descartados.
6. **Control en inglés:** resultado global, por dominio y en los ítems no derivados del banco, con confianza por ítem. Los umbrales internos (85 % global, 75 % por dominio, ningún fallo en controles críticos) son una señal, no una equivalencia de la escala oficial de 720.
7. **Proyecto y caso nuevo:** diagrama con la alternativa descartada, contratos con formato de error, casos con resultado esperado frente al obtenido, y una lista explícita de lo que la simulación no demuestra.
8. **Cierre:** una nota de estado por dominio, con lagunas pendientes, horas reales por semana y `estado_alumno` actualizado en `cobertura-blueprint.csv`. Sin pronóstico de aprobado.

**Qué no pueden demostrar las simulaciones:**

- No determinismo y calidad real de los prompts.
- Selección de herramientas con descripciones ambiguas.
- Latencia, tokens y coste.
- Prompt caching y rate limits.
- Transporte y negociación de versión de MCP.
- Permisos, matchers y carga de reglas reales en Claude Code.
- Aislamiento y paralelismo reales de los subagentes.
- Compaction y ciclo de vida real de Batches.

El examen es de opción múltiple y no exige demostrar nada de esto, pero el alumno debe saber razonarlo.

## 7. Contraste con la revisión de Astra

- **Lo que Astra dio por incorporado existe y funciona según su propio criterio de cierre** (R1-R5, O1, O3): permutación de claves A14/B14/C13/D13, separación del banco sin campos `exam_*`, 20 ítems reforzados con 58 razones de distractor, ejemplos E01-E10, normalización de errores de la práctica 03.
- **Cierres más amplios de lo demostrado.** R1 se cerró sin volver a medir la pista de longitud que Astra detectó (37/54 entonces, 28/54 hoy). R3 y R5 se cerraron contra la lista propia de Astra, no contra el temario ni contra la validez del control. La advertencia de `disallowed-tools` está en `practicas/05-claude-code/ejemplos/LEEME.md:3`, no en el `.example.md` que se pide leer.
- **Puntos de Astra que siguen vigentes y que esta auditoría no había cubierto:** O2 (legibilidad de las soluciones), 5.3 (contexto de error estructurado, solo en papel), 5.1 («lost in the middle», ahora incluido en C4) y el campo `agent` de las skills con `context: fork`, que es una recomendación profesional.
- **Matices a favor de Astra.** «Reserva» designa en el proyecto el control retenido fuera del banco (`LEEME.md:13`). Por eso el problema no es el nombre, sino que no exista un segundo instrumento (C1, C8). `/memory` sí se menciona una vez (`ejemplos-resueltos.md:101`); lo que falta es el procedimiento y el equivalente actual.

## 8. Limitaciones

- La auditoría es de solo lectura. No se ejecutaron Claude Code, el Agent SDK, la API ni `tsc`. Los comportamientos en tiempo de ejecución se contrastaron solo con la documentación.
- Las páginas web se leyeron sin iniciar sesión, así que vídeos y quizzes no se vieron. Algunas se obtuvieron con WebFetch, que resume; las afirmaciones clave se contrastaron por hash o con la copia local.
- Los ítems reales del examen no son públicos. Las severidades son un juicio sobre la probabilidad de perder puntos, no una medida.
- No se ha evaluado al alumno: no hay respuestas suyas. Las estimaciones de tiempo usan ritmos supuestos (150-200 palabras por minuto de lectura técnica en inglés; 5-8 min por pregunta abierta).
- Revisión parcial: `preguntas/respuestas-cierre-ingles.md` (exactitud), los 31 términos del glosario y el contraste de Q1-Q3 y Q6-Q12 oficiales con lo que enseña el material. Las ausencias se comprobaron por búsqueda literal: «no encontrado con esos términos» no es una prueba absoluta.
- El harness marcó en cuatro salidas de agentes texto con forma de configuración (fragmentos de settings y hooks citados como evidencia). Se trató como dato.
- La inscripción, la elegibilidad y el precio del examen quedan fuera de alcance, como se pidió.
