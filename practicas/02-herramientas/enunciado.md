# 02 - Herramientas, permisos y errores distinguibles

Revisar conceptos/02-herramientas-mcp.md. Diseña `buscar_recuerdos` y `leer_recuerdo`. La identidad proviene de la aplicación, no de argumentos del modelo. Solo se puede leer contenido propio y abierto según la fecha del fixture.

Distingue consulta sin coincidencias, acceso denegado, cápsula sellada y fallo transitorio del proveedor. Define qué errores permiten reintento y qué debe saber el coordinador. Explica la diferencia entre el resultado MCP y el bloque de resultado de Claude API.

Escribe tu contrato antes de abrir intento.ts: sus comentarios y comprobaciones fijan las decisiones esperadas. Después impleméntalo en [intento.ts](intento.ts) (esqueleto con TODO) y ejecútalo con `node --experimental-strip-types practicas/02-herramientas/intento.ts` hasta que pasen las comprobaciones; después compara con [solucion.ts](solucion.ts). Cambiar un requisito: permitir colaboración explícita sin permitir leer antes de la fecha de apertura. Diseñar las pruebas antes de modificar la solución.

Esta práctica modela el contrato interno y dos representaciones de error. No es un servidor MCP ni implementa su transporte o autenticación.
