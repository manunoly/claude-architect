# Fundamentos para razonar sobre Claude

[Glosario español-inglés](glosario-es-en.md) · [Ejemplos resueltos antes de preguntar](ejemplos-resueltos.md) · [Sesiones concretas](../sesiones-detalladas.md).

Dominio: M0. Presupuesto: 2 horas. Dependencias: ninguna.

**Orden de la sesión:** explicación en español -> ejemplo resuelto -> práctica guiada -> preguntas de aplicación -> cierre en inglés.

## Qué debes entender
Un modelo de lenguaje recibe una solicitud con instrucciones y contexto y genera una respuesta. En una aplicación, el modelo forma parte de un sistema mayor: identidad del usuario, acceso a datos, código de negocio, herramientas, almacenamiento y evaluación. Diseñar la arquitectura exige decidir qué trabajo corresponde a cada componente y cómo se observa el resultado.

Un token es una unidad que el modelo procesa; no equivale de forma fija a una palabra. La ventana de contexto limita lo que puede considerar en una solicitud. Las instrucciones, mensajes, definiciones de herramientas y resultados consumen espacio. Para este temario importa seleccionar información útil y conservar los hechos críticos, no estudiar algoritmos de tokenización.

El modelo puede producir resultados distintos ante solicitudes parecidas. Por eso una demostración convincente no reemplaza una evaluación con casos, resultados esperados y fallos. Tampoco una respuesta segura de sí misma prueba que sea correcta.

En TypeScript, una interfaz o type describe lo que el compilador espera, pero desaparece al ejecutar. JSON.parse convierte texto a un valor; no comprueba por sí solo que ese valor cumpla tu contrato. Si el dato viene de un modelo, herramienta o archivo, hay que validarlo en ejecución. Los cursos pueden usar Python y Pydantic; trasladaremos el propósito de la validación a TypeScript sin confundir ambas bibliotecas.

## Solicitud y resultado
El historial distingue mensajes de usuario y asistente; las instrucciones de sistema tienen una función distinta del material que se analiza. El texto de un recuerdo o una página recuperada debe conservar su condición de dato. Una frase incrustada en ese contenido no obtiene autoridad para cambiar el objetivo ni los permisos.

Una respuesta de API puede contener varios bloques: texto y solicitudes de herramienta, entre otros. Su estado de terminación importa. Que aparezca texto no significa que el trabajo haya terminado. Una salida recortada por el límite de generación requiere tratamiento como incompleta.

## Ejemplo resuelto de Abeduls
Supuesto de práctica: un usuario selecciona tres recuerdos ficticios y pide un borrador. El servicio comprueba que puede leer esos registros. El modelo recibe únicamente los textos autorizados e identificadores de fuente y propone la redacción. El sistema valida el contrato y muestra el borrador. La autorización y la comprobación de fechas pertenecen al servicio, y la redacción al modelo.

El resultado se verifica por fidelidad a los recuerdos, ausencia de información inventada, respeto a permisos y utilidad del borrador. Una prueba puede usar una respuesta de modelo grabada: así aprendemos las fronteras del sistema sin gastar en API. La simulación no demuestra el comportamiento de un modelo real ni una integración completa con el SDK.

## Antes de practicar
Poder explicar contexto, instrucción, herramienta, dato externo, validación en ejecución y resultado observable. Dibujar qué entra y sale de cada componente. Todavía no necesitas memorizar nombres de modelos, precios ni parámetros ajenos al temario.

## Práctica y cierre
Leer la solicitud ficticia de practica 01, identificar qué datos no son confiables y escribir el contrato esperado. Después usar las preguntas M0 de cierre en inglés. El tutor debe explicar y demostrar primero, no empezar interrogando.

## Fuentes locales de contraste

- [GUIA](../biblioteca/examen/foundations-exam-guide.pdf) - [original](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F6nizmqk8tpzpfjvt6qmmav7rh%2Fpublic%2F1783542750%2FClaude+Certified+Architect+%E2%80%93+Foundations+Exam+Guide.pdf)
- [API](../biblioteca/api/intro.md) - [original](https://platform.claude.com/docs/en/intro.md)
- [SDK](../biblioteca/typescript/anthropic-sdk-readme.md) - [original](https://raw.githubusercontent.com/anthropics/anthropic-sdk-typescript/main/README.md)

## Evidencia para cerrar el tema

- Explicar la decisión con tus palabras y aplicarla a un caso distinto.
- Resolver la práctica y justificar un fallo o alternativa.
- Realizar las preguntas de cierre y la defensa en inglés.
- Registrar errores y repaso D+2/D+7. El tutor no marcará dominio por mera lectura.
