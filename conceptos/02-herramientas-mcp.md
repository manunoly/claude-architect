# Herramientas e integración MCP

[Glosario español-inglés](glosario-es-en.md) · [Ejemplos resueltos antes de preguntar](ejemplos-resueltos.md) · [Sesiones concretas](../sesiones-detalladas.md).

Dominio: D2. Presupuesto: 8.25 horas. Dependencias: 00-fundamentos, 01-prompts-estructura.

**Orden de la sesión:** explicación en español -> ejemplo resuelto -> práctica guiada -> preguntas de aplicación -> cierre en inglés.

## La herramienta como contrato
Una herramienta es una operación con nombre, descripción, parámetros y un resultado definido. El modelo necesita entender cuándo usarla, qué exige y qué no resuelve. Descripciones solapadas hacen que funciones distintas parezcan intercambiables. Antes de añadir reintentos, aclarar propósito, entradas, identificadores y límites.

Dividir o agrupar operaciones depende de la ambigüedad y el riesgo. Un comando genérico «gestiona cualquier cosa» puede ocultar efectos distintos. Separar cada detalle también puede crear demasiadas opciones casi iguales. El objetivo es un conjunto pequeño de operaciones distinguibles, con permisos proporcionales a cada rol.

La selección de herramienta y la autorización no son equivalentes. El servicio debe validar identidad, pertenencia del recurso, estado y reglas antes de ejecutar. Un argumento enviado por el modelo que diga approved: true no prueba que un humano haya aprobado nada.

## MCP y sus componentes
MCP estandariza cómo aplicaciones y servicios intercambian capacidades y contexto. El host coordina conexiones; un cliente se comunica con un servidor. Un servidor puede exponer tools para operaciones, resources para contenido direccionable y prompts como plantillas. El protocolo no decide por sí mismo cómo el modelo razona ni otorga permiso de negocio a toda operación descubierta.

Un catálogo de documentos puede ser un resource, evitando llamadas exploratorias repetidas. Una búsqueda parametrizada o una acción con efectos puede exponerse como tool. Elegir por semántica y uso, sin afirmar que todo resource es una herramienta automática o que todas las herramientas escriben.

En Claude Code, el temario distingue configuración compartida de proyecto en .mcp.json de configuración personal. Los secretos se referencian desde variables del entorno; no se guardan tokens en el repositorio ni en el contexto del modelo. No necesitamos configurar infraestructura u OAuth para los ejercicios de Foundations.

## Errores que permiten decidir
No confundir «consulta válida sin coincidencias» con «no se pudo acceder a la fuente». Un resultado vacío puede ser éxito; un permiso denegado no equivale a no haber datos. Clasificar errores transitorios, de validación, de política y de permiso. Indicar si se puede reintentar, qué se intentó y qué resultado parcial existe.

MCP usa isError en su resultado de herramienta; los bloques tool_result de la API de Claude usan is_error. Son interfaces diferentes. Un formato interno normalizado puede incluir category, retryable y message, sin pretender que esos campos sean todos obligatorios del protocolo.

La recuperación transitoria se intenta cerca del fallo, con límites. Los casos que no se pueden resolver se elevan al coordinador con contexto útil. Repetir una llamada prohibida no cambia los permisos y esconder un fallo como lista vacía produce conclusiones falsas.

## Herramientas de desarrollo
Grep busca contenido, Glob encuentra rutas por patrón, Read carga archivos, Edit cambia fragmentos y Write crea o sustituye contenido. La elección depende de la evidencia necesaria. En este proyecto se respetan primero las reglas de descubrimiento por grafo; aprender estas herramientas no autoriza a saltarse AGENTS.md.

## Ejemplo y práctica
Práctica 02: una búsqueda de recuerdos devuelve solo registros autorizados. La lectura de una cápsula sellada produce un error de política no reintentable, aunque el modelo pida abrirla. Después explicar por qué se eligió un tool o resource y resolver D2 del banco. Objetivos: 2.1-2.5; cierre en inglés.

## Fuentes locales de contraste

- [TOOLS](../biblioteca/api/agents-and-tools/tool-use/define-tools.md) - [original](https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools.md)
- [TOOL-RESULTS](../biblioteca/api/agents-and-tools/tool-use/handle-tool-calls.md) - [original](https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls.md)
- [MCP](../biblioteca/mcp/docs/2026-07-28/learn/architecture.md) - [original](https://modelcontextprotocol.io/docs/2026-07-28/learn/architecture.md)
- [MCP-CODE](../biblioteca/code/mcp.md) - [original](https://code.claude.com/docs/en/mcp.md)
- [GUIA](../biblioteca/examen/foundations-exam-guide.pdf) - [original](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F6nizmqk8tpzpfjvt6qmmav7rh%2Fpublic%2F1783542750%2FClaude+Certified+Architect+%E2%80%93+Foundations+Exam+Guide.pdf)

## Evidencia para cerrar el tema

- Explicar la decisión con tus palabras y aplicarla a un caso distinto.
- Resolver la práctica y justificar un fallo o alternativa.
- Realizar las preguntas de cierre y la defensa en inglés.
- Registrar errores y repaso D+2/D+7. El tutor no marcará dominio por mera lectura.
