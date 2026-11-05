# Cierres en inglés - respuestas de ejemplo

Son modelos para comparar, no guiones que deban memorizarse. El tutor cambia un requisito para comprobar transferencia.

## M0 · What is the difference between a TypeScript type and runtime validation?

A TypeScript type is checked before execution and is erased. Runtime validation checks an actual external value. A model response still needs runtime checks even when the code declares an interface.

## M0 · In a memory-drafting feature, which component should authorize access to a memory?

The application or data service must authorize access using trusted identity and resource state. The language model can draft text from authorized data, but its decision is not an authorization control.

## M0 · Why can a convincing demonstration fail to prove reliability?

A small demonstration may miss important inputs and failure modes. Reliability needs representative tasks, expected outcomes, and observed results, including failures.

## D4 · A schema-valid extraction contains a date that is absent from the source. What would you change?

Allow an explicit unknown value where appropriate, preserve source references, and validate evidence and business rules. Schema compliance alone does not prove that a value is supported.

## D4 · Would you use batch processing for a user who is waiting to complete a purchase? Explain the trade-off.

I would use a path that meets the interactive latency requirement. Asynchronous batches fit work that tolerates their processing window; an occasional fast batch is not a latency guarantee.

## D4 · How would you reduce false positives in a code-review prompt?

Define reportable defects and severity with contrasting examples, including acceptable patterns. Evaluate new cases and refine noisy categories using evidence rather than confidence wording alone.

## D2 · A search returns no matches, while another call times out. How should the results differ?

No matches can be a successful query. A timeout is unavailable evidence and should preserve its failure category and retry information. The coordinator must not interpret both as proof of absence.

## D2 · Explain the host, client, and server roles in MCP.

The host manages the AI application and its connections. A client communicates with a server. The server exposes capabilities and context. These roles do not automatically grant business authorization.

## D2 · When would you split a generic tool into narrower operations?

When distinct purposes, arguments, effects, or permissions make selection ambiguous. I would check that the new contracts improve clarity without creating many redundant alternatives.

## D1 · What happens after stop_reason is tool_use, and why is an iteration limit not normal completion?

The controller executes allowed tool calls, returns their identified results, and continues. A limit is a guardrail; reaching it means bounded interruption or handoff, not proof that the user goal was achieved.

## D1 · A synthesis subagent lacks the research findings. What should the coordinator provide?

It should explicitly pass the necessary findings, sources, dates, constraints, and output contract. A subagent should not be assumed to inherit the coordinator history automatically.

## D1 · When would you resume a session instead of starting a new one?

I would resume when its prior context remains mostly valid and communicate relevant changes. If observations are broadly stale, a new session with an updated structured summary can be more reliable.

## D3 · Where would you put a shared convention, a task-specific procedure, and an enforceable tool restriction?

A shared convention belongs in project instructions or scoped rules. A task-specific procedure fits a skill. An enforceable restriction needs permissions or a programmatic pre-execution control.

## D3 · Why does a non-interactive CI job need a structured output contract?

Automation must interpret findings and failures consistently. The job should use the documented non-interactive mode and validate structured findings rather than publish arbitrary conversational text.

## D3 · How would you prevent duplicate findings after a pull request changes?

Provide prior findings, their resolution state, and the new changes. Ask for new or still-unresolved issues and verify them against current evidence, rather than filtering only identical wording.

## D5 · How would you compact a long case without losing critical facts?

Keep the objective, constraints, stable identifiers, important amounts and dates, verified state, and unresolved work. Preserve references for retrieval and do not turn an attempted action into a completed one.

## D5 · Why review a sample of high-confidence extractions?

High confidence may still hide systematic errors. Stratified random sampling and labeled outcomes reveal errors by document type and field, allowing empirical calibration.

## D5 · Two sources disagree and refer to different dates. How would you report them?

Keep each claim linked to its source and relevant period, explain comparability, and preserve the disagreement. Retrieval order alone is not a rule for choosing which value is correct.

