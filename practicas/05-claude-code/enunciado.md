# 05 - Configuración y control de una herramienta dedicada

Leer conceptos/04-claude-code.md. Separar convención compartida, regla por rutas, procedimiento invocable y control ejecutable. Los archivos de ejemplos no están activos en el proyecto.

La [política de solución](solucion.ts) representa una herramienta dedicada de despliegue. Una aprobación válida viene de un registro confiable con releaseId y digest exactos; un argumento approved del modelo no la sustituye. Se asume que todas las llamadas de despliegue de este fixture pasan por esa herramienta. No afirmar que la prueba cubre todas las vías de una infraestructura real.

Proponer casos permitidos, no aprobados, cambios de digest e identidad de herramienta desconocida. Después ejecutar la solución y revisar los [ejemplos](ejemplos/LEEME.md). Para CI, explicar cómo evitar interacción y duplicados de hallazgos con las interfaces de la versión real.
