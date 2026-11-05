# 04 - Estado recuperable, procedencia y calibración

Leer conceptos/05-contexto-fiabilidad.md. Construir un contexto que conserve hechos críticos, afirmaciones con fuentes, conflictos, fallos y tareas pendientes. Los permisos se revalidan frente a estado actual; una autorización antigua no basta.

1. Diseñar un manifiesto que no convierta trabajo intentado en terminado.
2. Conservar un desacuerdo entre fuentes con fechas distintas.
3. Calcular error por documento/campo para un conjunto etiquetado.
4. Explicar qué muestra de alta confianza revisarías y por qué.

Después contrastar [solucion.ts](solucion.ts). Los límites de longitud del ejemplo son de caracteres, no un contador de tokens de Claude. Los datos etiquetados son sintéticos; la demostración no calibra un modelo real.

Alcance del fixture: solo claims lleva fuente; facts contiene exclusivamente un caseId confiable y pending/errors no contienen datos privados. Filtrar claims no sanea un estado arbitrario. Si esas capas guardan hechos derivados, necesitan procedencia y revalidación propias. Valores diferentes agrupados por campo son candidatos a conflicto y pueden referirse a periodos distintos.
