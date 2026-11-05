# Prácticas TypeScript sin consumo de API

Cada práctica tiene enunciado, una solución comentada y comprobaciones de comportamiento. Primero leer conceptos y el enunciado; intentar una propuesta propia antes de abrir la solución. Las soluciones ya están disponibles porque pediste material con respuestas.

## Ejecutar las comprobaciones
Desde la carpeta del proyecto: `node scripts/ejecutar-practicas.mjs`. El script ejecuta solo código local escrito para estas prácticas, no código de la documentación descargada. No instala paquetes, no usa claves y no hace peticiones de red. Se verificó con Node 24.22.1; se necesita un Node que soporte `--experimental-strip-types`.

- [01: extracción y validación](01-extraccion/enunciado.md)
- [02: herramientas y errores](02-herramientas/enunciado.md)
- [03: bucle de agente](03-bucle-agente/enunciado.md)
- [04: contexto y evaluación](04-contexto/enunciado.md)
- [05: configuración Claude Code](05-claude-code/enunciado.md)
- [06: microprácticas de normalización y lotes](06-ejemplos-aplicados/enunciado.md), incluidas en los bloques de los ejemplos resueltos.

Son simulaciones de fronteras y contratos. No implementan el transporte MCP ni se conectan al Agent SDK o al modelo. Pasarlas demuestra el comportamiento de este código local, no la fiabilidad de Claude ni el dominio del alumno. Leer las fuentes y explicar decisiones sigue siendo parte de la preparación.
