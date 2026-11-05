# Prácticas TypeScript sin consumo de API

Cada práctica tiene enunciado, una solución comentada y comprobaciones de comportamiento. Primero leer conceptos y el enunciado; intentar una propuesta propia antes de abrir la solución. Las soluciones ya están disponibles porque pediste material con respuestas.

## Ejecutar las comprobaciones
Desde la carpeta del proyecto: `node scripts/ejecutar-practicas.mjs`. El script ejecuta solo código local escrito para estas prácticas, no código de la documentación descargada. No instala paquetes, no usa claves y no hace peticiones de red. Requiere un Node que admita `--experimental-strip-types` (verificado con 22.23.3 y 24.22.1).

- [01: extracción y validación](01-extraccion/enunciado.md)
- [02: herramientas y errores](02-herramientas/enunciado.md)
- [03: bucle de agente](03-bucle-agente/enunciado.md)
- [04: contexto y evaluación](04-contexto/enunciado.md)
- [05: configuración Claude Code](05-claude-code/enunciado.md)
- [06: microprácticas de normalización y lotes](06-ejemplos-aplicados/enunciado.md), incluidas en los bloques de los ejemplos resueltos.

Son simulaciones de fronteras y contratos. No implementan el transporte MCP ni se conectan al Agent SDK o al modelo. Pasarlas demuestra el comportamiento de este código local, no la fiabilidad de Claude ni el dominio del alumno. Leer las fuentes y explicar decisiones sigue siendo parte de la preparación.

## Escribir tu propia versión (prácticas 01 a 03)
Las prácticas 01, 02 y 03 incluyen un `intento.ts`: un esqueleto con los mismos tipos y datos de prueba, donde las decisiones están sustituidas por `throw new Error('TODO: …')`. Impleméntalas y ejecuta `node --experimental-strip-types practicas/01-extraccion/intento.ts` (cambia la carpeta según la práctica) hasta que pasen las comprobaciones; solo entonces abre `solucion.ts` y compara. El script `ejecutar-practicas.mjs` no ejecuta los `intento.ts`, porque fallan con TODO hasta que los completes.
