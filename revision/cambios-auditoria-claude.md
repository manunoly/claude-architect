# Cambios incorporados tras la auditoría de Claude (5-nov-2026)

Se aplicaron las cuatro recomendaciones **imprescindibles** de [auditoria-claude-2026-11-05.md](auditoria-claude-2026-11-05.md). Las horas del alumno siguen siendo 60 (15 por semana).

| Recomendación | Cambio | Archivos |
|---|---|---|
| 1. Ensayar el formato real | El control de 60 pasa a inglés, con «Choose ONE/TWO answers» y la clave explicada en español. Se programan las 12 muestras oficiales en la sesión 17 y un minicontrol en inglés con el diagnóstico archivado en las sesiones 10 y 16, con clave nueva. | evaluacion/control-60.md, evaluacion/reserva-control.json (`stem_en`, `options_en`), evaluacion/clave-diagnostico.md, sesiones-detalladas.md, roadmap.md, archivo/LEEME.md |
| 2. Señal independiente | Se corrige el texto que llamaba «independiente» al control. Nueva reserva de 20 reactivos en inglés no derivados del banco, con clave en español. Señal principal: 20 reforzados + 20 de la reserva (≥ 80 %). Se elimina la pista de longitud: la correcta es la única más larga en 11 de los 54 reactivos de respuesta única del control (antes 28) y en 3 de 16 de la reserva. | evaluacion/reserva-nueva-en.md, evaluacion/soluciones-reserva-nueva.md, evaluacion/clave-reserva-nueva.json, evaluacion/LEEME.md, roadmap.md, LEEME.md |
| 3. Mecanismos nombrados por la guía | Tabla «mecanismo → ruta → ámbito → cuándo» en conceptos/04: plan mode, Explore, commands y skills de proyecto y personales, `/memory` y `/context all`, PreToolUse y PostToolUse, `/compact`, CI. Se quita la frase que restaba importancia a las rutas. Se añaden 18 frente a 4-5 herramientas, herramientas MCP simultáneas, Read + Write, petición con varios asuntos, refinamiento iterativo, 50 % de Batches sin herramientas en varios turnos, `conflict_detected`, «lost in the middle», sentimiento y confianza, degradación y `/compact`. Once términos nuevos en el glosario. | conceptos/01-05, conceptos/glosario-es-en.md, sesiones-detalladas.md (S7, S9, S12, S13, S15) |
| 4. Regla de examen | Columna «Qué responder en el examen (guía v1.0)» y desfase no registrado de `tool_choice` forzado (400 en Opus 5.5, Sonnet 5.5, Fable 5.1 y Mythos 5.1). La regla se repite en conceptos/01, 03 y 04. | biblioteca/VERSIONES.md, conceptos/01, 03 y 04 |

**Semana 4.** S17: muestras oficiales (0,75 h) y proyecto (2,25 h). S18: control en inglés (2 h) y corrección (1 h). S19: reserva nueva y refuerzo (1,5 h) y proyecto (1,5 h). S20: caso, defensa y reintento de errores. El proyecto integrador baja de 6 a 3,75 h, e implementarlo pasa a ser opcional.

## Verificación
- Las claves no cambian: `clave-control.json` sigue igual y cada texto inglés coincide con `options_en[option_order[k]]` (comprobado por programa).
- Un auditor independiente (Fable, xhigh) resolvió sin clave los 60 reactivos del control en inglés (60/60) y los 20 de la reserva nueva (20/20). También verificó las líneas citadas en conceptos y VERSIONES.md.
- Se corrigieron los detalles que señaló: dos distractores del reactivo 03 que parafraseaban la muestra oficial Q8, un distractor del 04 cercano a Q3, las cifras literales de la guía en el 12, el encabezado de la reserva y un rango de líneas.
- `node scripts/ejecutar-practicas.mjs`: las 6 prácticas terminan correctamente. `node scripts/verificar-biblioteca.mjs`: 407 verificadas, 0 fallos.
- La revisión solicitada en AGENTS.md (gpt-6-astra) no estaba disponible en esta sesión. La auditoría la hizo Claude (Fable); esto no sustituye la opinión de Astra si se quiere repetir.

## Segunda ronda: recomendables y opcionales

| Recomendación | Cambio | Archivos |
|---|---|---|
| 5. Cierres en inglés y preguntas abiertas | Cada una de las 18 preguntas trae su propio requisito cambiado, en otro sector, con respuesta modelo. Rúbrica 0-2 en tres criterios (aprobado: 4/6 sin error técnico). Regla 0-2 para corregir las preguntas abiertas del banco. | preguntas/cierre-ingles.md, preguntas/respuestas-cierre-ingles.md, preguntas/banco-preguntas.md |
| 6. Prácticas | `intento.ts` con esqueleto y las mismas comprobaciones en 01-03. Comprobaciones más estrictas: errores exactos en 01; filtro de propietario, categorías, reintentos y no enumeración en 02; presupuesto sin ejecutar, ids duplicados y transitorio estructurado frente a excepción en 03. Soluciones 01-05 legibles, con líneas de 100 caracteres o menos y comentarios del porqué. El tipo `input` pasa a objeto. Configuración D3 propia con sufijo `.alumno.md` y observación real opcional con `/context all`. | practicas/01-05, practicas/LEEME.md |
| 7. Repasos y seguimiento | Calendario D+2/D+7 para los seis módulos. Columnas `aciertos`, `ayuda_en` y `horas_reales` en progreso.csv, y filas para las seis pruebas, sin datos inventados. | sesiones-detalladas.md, seguimiento/progreso.csv |
| 8. Uso | «Empieza aquí» en tres pasos (bitácora, sesión, registro) y lista de referencia aparte. | LEEME.md |
| 9. Exactitud del material | cobertura-blueprint.csv sin «ejercicio en papel» falso, con las referencias corregidas y los reactivos RN01-RN20. Se quita la regla del grafo de conceptos/02, E10, T10, del reactivo 33 y de su explicación. | seguimiento/cobertura-blueprint.csv, conceptos/, preguntas/, evaluacion/ |
| 10. Escenarios y cursos | Cada sección del control nombra sus escenarios oficiales y el reactivo 05 pasa a Nexo. Cursos gratuitos de subagentes y skills como alternativa a la lectura de las sesiones 9 y 12, con aviso de que los laboratorios piden clave de API con saldo. | evaluacion/control-60.md, reserva-control.json, sesiones-detalladas.md, roadmap.md |
| Opcionales | Sección «Vigente, no evaluado» en VERSIONES.md (stop_reason, ámbito MCP `local`, `fork_session` y `forkSession`). Versión de Node verificada en README y prácticas. | biblioteca/VERSIONES.md, README.md, practicas/LEEME.md |

Verificación de la segunda ronda:
- Una auditoría independiente (Opus, xhigh) aprobó con correcciones: tres huecos medios en las comprobaciones de 02-03 y doce detalles bajos. Todos se aplicaron.
- `ejecutar-practicas.mjs` termina correctamente (01: 12 comprobaciones, 02: 19, 03 con 2 nuevas). Cada `intento.ts` falla solo con su TODO, y sus comprobaciones son idénticas a las de `solucion.ts`. Una mutación que elimina el filtro de propietario ya falla.
- progreso.csv y cobertura-blueprint.csv se leen como RFC 4180, las horas siguen siendo 60 y los enlaces relativos resuelven.

## Sin aplicar, con motivo
- **Reescribir los 40 reactivos básicos del control (unas 13 h):** la reserva nueva ya da la señal independiente, y el control queda como ensayo de formato.
- **`tsc`:** no está instalado y no se instalan dependencias. El único error de tipos conocido se corrigió a mano.
- **Mover `seguimiento/verificacion-*.json`:** rompería referencias del histórico de Astra. LEEME.md aclara que comprueban el paquete, no tu progreso.
