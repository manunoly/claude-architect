# Cierres en inglés - respuestas de ejemplo

Son modelos para comparar, no guiones que deban memorizarse. Cada pregunta incluye ahora su propio requisito cambiado, y la rúbrica de puntuación está en [cierre-ingles.md](cierre-ingles.md).

## M0 · What is the difference between a TypeScript type and runtime validation?

A TypeScript type is checked before execution and is erased. Runtime validation checks an actual external value. A model response still needs runtime checks even when the code declares an interface.

**With the changed requirement:** Yes, for that internal handoff the compiler's type check is usually enough, because both sides are your own checked code. I would still validate at the boundary where external data enters, such as a model reply, an HTTP body or a file.

## M0 · In a memory-drafting feature, which component should authorize access to a memory?

The application or data service must authorize access using trusted identity and resource state. The language model can draft text from authorized data, but its decision is not an authorization control.

**With the changed requirement:** No, it does not change. The model's impression is not trusted identity or resource state, so the application or data service must still check the authenticated user's permission for that account before any data reaches the model.

## M0 · Why can a convincing demonstration fail to prove reliability?

A small demonstration may miss important inputs and failure modes. Reliability needs representative tasks, expected outcomes, and observed results, including failures.

**With the changed requirement:** Yes, it can change. Here the check covers the whole input and every outcome is observed, so nothing has to be generalized; the evidence I need grows with input variety and repeated use.

## D4 · A schema-valid extraction contains a date that is absent from the source. What would you change?

Allow an explicit unknown value where appropriate, preserve source references, and validate evidence and business rules. Schema compliance alone does not prove that a value is supported.

**With the changed requirement:** Yes, partly. The information is present, so this is a format error: I would add normalization rules and retry with the specific validation error, which can work. Retrying would not help if the information were absent from the source.

## D4 · Would you use batch processing for a user who is waiting to complete a purchase? Explain the trade-off.

I would use a path that meets the interactive latency requirement. Asynchronous batches fit work that tolerates their processing window; an occasional fast batch is not a latency guarantee.

**With the changed requirement:** Yes, batch now fits: the work is non-blocking and latency-tolerant, and it can lower cost. Because there is no guaranteed latency, only a processing window of up to 24 hours, I would submit early enough to meet the 48-hour deadline.

## D4 · How would you reduce false positives in a code-review prompt?

Define reportable defects and severity with contrasting examples, including acceptable patterns. Evaluate new cases and refine noisy categories using evidence rather than confidence wording alone.

**With the changed requirement:** No, the principle is the same. I would define what to report (for example duplicates or differences above a stated amount) and what to skip, with examples of each, instead of asking it to "be conservative"; I could pause the noisy category while I improve it, to restore reviewer trust.

## D2 · A search returns no matches, while another call times out. How should the results differ?

No matches can be a successful query. A timeout is unavailable evidence and should preserve its failure category and retry information. The coordinator must not interpret both as proof of absence.

**With the changed requirement:** The handling changes, not the principle. A permission error is not transient, so I would return it as non-retryable with what was attempted and any partial results, letting the coordinator reroute or escalate, and never as "no flights found".

## D2 · Explain the host, client, and server roles in MCP.

The host manages the AI application and its connections. A client communicates with a server. The server exposes capabilities and context. These roles do not automatically grant business authorization.

**With the changed requirement:** No, the roles do not change: the host creates one MCP client per server, so two clients, each with its own connection, each server exposes its own capabilities and context, and the agent can use the tools of both at once. Neither connection grants authorization, so each data service must still check who may see lab or billing data.

## D2 · When would you split a generic tool into narrower operations?

When distinct purposes, arguments, effects, or permissions make selection ambiguous. I would check that the new contracts improve clarity without creating many redundant alternatives.

**With the changed requirement:** Yes, I would probably not split it. It has a single purpose and effect and no overlapping alternative, so selection is not ambiguous, and splitting would only add redundant tools. I would revisit it if it gained write operations or different permissions.

## D1 · What happens after stop_reason is tool_use, and why is an iteration limit not normal completion?

The controller executes allowed tool calls, returns their identified results, and continues. A limit is a guardrail; reaching it means bounded interruption or handoff, not proof that the user goal was achieved.

**With the changed requirement:** Yes, the loop stops: end_turn means there is no tool call to run, and I should not continue because the text sounds unfinished. Control flow follows stop_reason rather than parsing text, so I would treat the incomplete answer as a prompt or validation problem to fix.

## D1 · A synthesis subagent lacks the research findings. What should the coordinator provide?

It should explicitly pass the necessary findings, sources, dates, constraints, and output contract. A subagent should not be assumed to inherit the coordinator history automatically.

**With the changed requirement:** The principle stays but the content shrinks. The subagent still does not inherit the coordinator's history, so the prompt must state the ticker, the date and the expected output explicitly, without pasting everything the coordinator knows.

## D1 · When would you resume a session instead of starting a new one?

I would resume when its prior context remains mostly valid and communicate relevant changes. If observations are broadly stale, a new session with an updated structured summary can be more reliable.

**With the changed requirement:** Yes, I would start a new session. The earlier tool results are now mostly stale, so a new session seeded with a structured summary of the confirmed findings is more reliable; if only one or two tables had changed, I would resume and tell the session exactly which ones.

## D3 · Where would you put a shared convention, a task-specific procedure, and an enforceable tool restriction?

A shared convention belongs in project instructions or scoped rules. A task-specific procedure fits a skill. An enforceable restriction needs permissions or a programmatic pre-execution control.

**With the changed requirement:** Yes, the convention's placement changes: a path-scoped rule in `.claude/rules/` with a glob such as `**/*.spec.ts` loads only when matching files are edited, which suits files spread across directories better than a subdirectory CLAUDE.md. The procedure still fits a skill, and the enforceable restriction still needs permissions or a hook.

## D3 · Why does a non-interactive CI job need a structured output contract?

Automation must interpret findings and failures consistently. The job should use the documented non-interactive mode and validate structured findings rather than publish arbitrary conversational text.

**With the changed requirement:** Yes, a strict output contract is not needed there: a person can interpret conversational text and ask follow-up questions. The contract (`-p`, `--output-format json`, `--json-schema`) matters when automation must parse findings, for example to post inline pull-request comments.

## D3 · How would you prevent duplicate findings after a pull request changes?

Provide prior findings, their resolution state, and the new changes. Ask for new or still-unresolved issues and verify them against current evidence, rather than filtering only identical wording.

**With the changed requirement:** No, the approach does not change. I would still provide the prior findings with their resolution state and ask only for new or unresolved issues, verified against the current code, so matching depends on substance rather than line numbers or wording.

## D5 · How would you compact a long case without losing critical facts?

Keep the objective, constraints, stable identifiers, important amounts and dates, verified state, and unresolved work. Preserve references for retrieval and do not turn an attempted action into a completed one.

**With the changed requirement:** I would add a step: trim each tool result to the relevant fields before it accumulates in context, because verbose output consumes tokens out of proportion to its value. Compaction still keeps the case facts, such as order number, amounts, dates and status, in a persistent block outside the summarized history.

## D5 · Why review a sample of high-confidence extractions?

High confidence may still hide systematic errors. Stratified random sampling and labeled outcomes reveal errors by document type and field, allowing empirical calibration.

**With the changed requirement:** No, the principle holds, and it matters more here. An aggregate figure can hide a weak language, document type or field, so I would sample high-confidence extractions at random within each segment, label the outcomes, and analyze accuracy by segment before reducing human review.

## D5 · Two sources disagree and refer to different dates. How would you report them?

Keep each claim linked to its source and relevant period, explain comparability, and preserve the disagreement. Retrieval order alone is not a rule for choosing which value is correct.

**With the changed requirement:** Yes, it changes. With the same period and a comparable method this is a genuine conflict rather than a temporal difference, so I would keep both values with source, date and method, mark the finding as contested, and let the coordinator decide how to reconcile it instead of silently picking one.

