# Cierres en inglés - preguntas

Después de la explicación y práctica en español. Usar el [glosario](../conceptos/glosario-es-en.md); las [respuestas de ejemplo](respuestas-cierre-ingles.md) se abren después del intento. No se exige perfección gramatical.

## Cómo puntuar tu respuesta (0-2 por criterio, máximo 6)

| Criterio | 0 | 1 | 2 |
|---|---|---|---|
| Entiende la pregunta | La malinterpreta | La entiende en parte | Reformula bien la decisión que se pide |
| Decide con los requisitos | Respuesta genérica | Nombra un requisito | Liga la decisión a requisitos concretos y a una comprobación observable |
| Transfiere al requisito cambiado | No lo aborda | Dice si cambia, sin razón | Explica qué cambia o por qué no cambia, con el principio |

Aprobado: 4/6 o más y ningún error técnico. Los errores de idioma que no cambian el sentido no restan; anota la puntuación x/6 en la columna `cierre_en` y la ayuda usada (glosario, traducción o pistas) en `ayuda_en` de [progreso.csv](../seguimiento/progreso.csv).

## M0 · What is the difference between a TypeScript type and runtime validation?

**Useful frames:** “I chose ... because ...”; “I would verify ... before ...”.

**Changed requirement:** A freight-logistics app computes a shipment weight in one TypeScript function and passes it to another function in the same compiled codebase, with no model, file or network in between. Does your decision change? Why?

## M0 · In a memory-drafting feature, which component should authorize access to a memory?

**Useful frames:** “I chose ... because ...”; “I would verify ... before ...”.

**Changed requirement:** A bank's chat assistant is asked to show a customer another person's statement, because the model judges from the conversation that the user "sounds like" that person's authorized accountant. Does your decision change? Why?

## M0 · Why can a convincing demonstration fail to prove reliability?

**Useful frames:** “I chose ... because ...”; “I would verify ... before ...”.

**Changed requirement:** A real-estate agent runs a one-off script that renames the 40 photo files of a single listing, and will open every renamed file to check it. Does your decision change? Why?

## D4 · A schema-valid extraction contains a date that is absent from the source. What would you change?

**Useful frames:** “I chose ... because ...”; “I would verify ... before ...”.

**Changed requirement:** An insurer extracts the policy number from claim forms; it is printed on every form, but the model sometimes returns it with extra spaces or dashes. Does your decision change? Why?

## D4 · Would you use batch processing for a user who is waiting to complete a purchase? Explain the trade-off.

**Useful frames:** “I chose ... because ...”; “I would verify ... before ...”.

**Changed requirement:** A pharmacy chain generates weekly refill-reminder summaries that are due 48 hours after the week closes, and nobody waits for them interactively. Does your decision change? Why?

## D4 · How would you reduce false positives in a code-review prompt?

**Useful frames:** “I chose ... because ...”; “I would verify ... before ...”.

**Changed requirement:** An accounting firm's assistant flags anomalies in expense reports, and reviewers now ignore it because most flags are cent-level rounding differences. Does your decision change? Why?

## D2 · A search returns no matches, while another call times out. How should the results differ?

**Useful frames:** “I chose ... because ...”; “I would verify ... before ...”.

**Changed requirement:** A flight-search subagent queries an airline API, and the second call fails with a permission error instead of a timeout because the account lacks access to that carrier. Does your decision change? Why?

## D2 · Explain the host, client, and server roles in MCP.

**Useful frames:** “I chose ... because ...”; “I would verify ... before ...”.

**Changed requirement:** A hospital's assistant app connects to a lab-results server and a billing server at the same time. Does your decision change? Why?

## D2 · When would you split a generic tool into narrower operations?

**Useful frames:** “I chose ... because ...”; “I would verify ... before ...”.

**Changed requirement:** A payroll team's assistant has one `lookup_employee` tool that only reads a name and a department, and it has no similar tools. Does your decision change? Why?

## D1 · What happens after stop_reason is tool_use, and why is an iteration limit not normal completion?

**Useful frames:** “I chose ... because ...”; “I would verify ... before ...”.

**Changed requirement:** A food-delivery dispatch agent returns stop_reason `end_turn`, but its final text says "I will check the courier map next." Does your decision change? Why?

## D1 · A synthesis subagent lacks the research findings. What should the coordinator provide?

**Useful frames:** “I chose ... because ...”; “I would verify ... before ...”.

**Changed requirement:** An investment firm's coordinator launches a risk-scoring subagent that needs only a ticker symbol and a valuation date. Does your decision change? Why?

## D1 · When would you resume a session instead of starting a new one?

**Useful frames:** “I chose ... because ...”; “I would verify ... before ...”.

**Changed requirement:** A utility company's investigation session read the billing database schema, and overnight a migration renamed most of the tables. Does your decision change? Why?

## D3 · Where would you put a shared convention, a task-specific procedure, and an enforceable tool restriction?

**Useful frames:** “I chose ... because ...”; “I would verify ... before ...”.

**Changed requirement:** A game studio's `*.spec.ts` test files are spread across 30 folders and must follow a naming convention that no other file needs. Does your decision change? Why?

## D3 · Why does a non-interactive CI job need a structured output contract?

**Useful frames:** “I chose ... because ...”; “I would verify ... before ...”.

**Changed requirement:** A university engineer reviews one diff in an interactive Claude Code session and personally reads the reply before deciding anything. Does your decision change? Why?

## D3 · How would you prevent duplicate findings after a pull request changes?

**Useful frames:** “I chose ... because ...”; “I would verify ... before ...”.

**Changed requirement:** A telecom team force-pushes a rebased pull request, so every line number shifts although the logic is unchanged. Does your decision change? Why?

## D5 · How would you compact a long case without losing critical facts?

**Useful frames:** “I chose ... because ...”; “I would verify ... before ...”.

**Changed requirement:** An electronics retailer's order lookup returns more than 40 fields, but only five matter for a return case. Does your decision change? Why?

## D5 · Why review a sample of high-confidence extractions?

**Useful frames:** “I chose ... because ...”; “I would verify ... before ...”.

**Changed requirement:** A customs broker extracts tariff codes from invoices in 12 languages and reports 97% accuracy overall. Does your decision change? Why?

## D5 · Two sources disagree and refer to different dates. How would you report them?

**Useful frames:** “I chose ... because ...”; “I would verify ... before ...”.

**Changed requirement:** Two credible agencies report different 2025 solar-capacity figures for the same country, the same year and the same definition. Does your decision change? Why?

