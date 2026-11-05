# Contexto, evidencia y fiabilidad

[Glosario español-inglés](glosario-es-en.md) · [Ejemplos resueltos antes de preguntar](ejemplos-resueltos.md) · [Sesiones concretas](../sesiones-detalladas.md).

Dominio: D5. Presupuesto: 6.75 horas. Dependencias: 00-fundamentos, 02-herramientas-mcp, 03-agentes-orquestacion.

**Orden de la sesión:** explicación en español -> ejemplo resuelto -> práctica guiada -> preguntas de aplicación -> cierre en inglés.

## Contexto como recurso limitado
La ventana admite una cantidad limitada de información y más texto no garantiza mejor atención. Conservar un bloque de hechos críticos: identificadores, fechas, cantidades, estados y restricciones. Los detalles verbosos de herramientas pueden reducirse a los campos necesarios. La compresión debe conservar incertidumbres, fallos y referencias, no convertir intentos en éxitos.

Un resumen al principio orienta al lector y al modelo; las secciones y referencias permiten profundizar. Un dato que podrá ser necesario no tiene que copiarse completo siempre: un identificador estable permite recuperarlo cuando haga falta. Una caché reduce trabajo repetido bajo condiciones concretas, pero no añade memoria ilimitada ni verifica que los datos sigan vigentes.

## Ambigüedad y escalado
Si aparecen dos personas con el mismo nombre, pedir un identificador adicional es más fiable que elegir por intuición. Si una política no cubre la petición, señalar la laguna y escalar resulta distinto de inventar una extensión. Los criterios de escalado deben ser explícitos y demostrarse con casos.

El resultado «sin coincidencias» no se obtiene cuando un proveedor falló. Elevar errores no resueltos con categoría, intentos, datos parciales y alternativas. En la síntesis, marcar qué áreas se cubrieron y cuáles carecen de evidencia.

## Persistencia y recuperación
Un scratchpad conserva hallazgos y referencias; un manifiesto puede registrar objetivos, trabajo completado, pendientes, archivos y estado de herramientas. Al reanudar hay que contrastarlo con la situación actual. Ni un archivo que diga running ni la intención de continuar demuestran que un proceso siga vivo.

En exploración de código, dividir preguntas concretas entre especialistas y resumir cada fase evita volver a cargar todo el repositorio. El coordinador conserva el mapa y comunica cambios relevantes. La persistencia ayuda a recuperar el trabajo, pero no comparte automáticamente toda la memoria entre agentes.

## Confianza calibrada y revisión humana
Un 0.95 dicho por el modelo no equivale a 95% de precisión medida. Usar un conjunto etiquetado para contrastar confianza y error. Separar resultados por tipo de documento y campo: una media puede ocultar fallos sistemáticos. Muestrear también resultados de alta confianza, con estratos relevantes, ayuda a detectar problemas que el enrutamiento automático no muestra.

## Procedencia y evaluación
Cada afirmación importante debe conservar una fuente, una ubicación y una fecha relevante. Si dos documentos discrepan, registrar ambos valores y la naturaleza del desacuerdo. La fecha de publicación puede diferir de la del hecho o medición; no concluir actualidad solo por el orden en que se recuperaron.

Una evaluación usa tareas representativas, resultados esperados y criterios de fallo. Conviene revisar tanto el resultado final como efectos y trazas necesarios para entender errores. El temario se centra en fiabilidad y criterio aplicado; implementar benchmarks de modelos, embeddings o infraestructura de búsqueda queda como ampliación, fuera del núcleo de cuatro semanas.

## Ejemplo y práctica
Práctica 04: construir un estado recuperable que conserva fuentes y fallos parciales, y evaluar una salida que parece correcta pero usa una fuente no autorizada. Diseñar una muestra estratificada en papel y justificar qué mandas a revisión. Objetivos: 5.1-5.6; caso de transferencia y cierre en inglés.

## Fuentes locales de contraste

- [CONTEXT](../biblioteca/engineering/effective-context-engineering.html) - [original](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [WINDOW](../biblioteca/api/build-with-claude/context-windows.md) - [original](https://platform.claude.com/docs/en/build-with-claude/context-windows.md)
- [EVALS](../biblioteca/engineering/demystifying-evals.html) - [original](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)
- [GUIA](../biblioteca/examen/foundations-exam-guide.pdf) - [original](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F6nizmqk8tpzpfjvt6qmmav7rh%2Fpublic%2F1783542750%2FClaude+Certified+Architect+%E2%80%93+Foundations+Exam+Guide.pdf)

## Evidencia para cerrar el tema

- Explicar la decisión con tus palabras y aplicarla a un caso distinto.
- Resolver la práctica y justificar un fallo o alternativa.
- Realizar las preguntas de cierre y la defensa en inglés.
- Registrar errores y repaso D+2/D+7. El tutor no marcará dominio por mera lectura.
