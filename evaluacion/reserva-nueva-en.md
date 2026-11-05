# Reserva nueva en inglés - 20 reactivos / 40 minutos
Propósito: señal independiente que no deriva del banco de aprendizaje; cubre sobre todo mecanismos de la guía que el control de 60 reactivos no evalúa o evalúa de otra forma. Cada reactivo indica cuántas opciones elegir; las múltiples requieren exactamente el conjunto correcto.
Responder sin consultar la clave. No es material oficial ni un predictor calibrado de aprobación; se puede usar el glosario [conceptos/glosario-es-en.md](../conceptos/glosario-es-en.md).

## Customer Support Resolution Agent

### 01. Choose ONE answer.

A customer's single message raises three problems: a duplicate $64.20 charge on order #8841, order #8902 that never arrived, and a request to change the shipping address on file. The agent currently works through them one after another in a single sequential pass, and its final reply often addresses only the first two. Which redesign best fits this request?

- **A.** Ask the customer to open three separate tickets, so that each concern gets its own fresh session and a focused context.
- **B.** Split the message into three items, investigate them in parallel with shared customer context, then write one unified resolution.
- **C.** Resolve the billing dispute first, because it carries the most financial risk, and invite the customer to raise the other two later.
- **D.** Run three parallel investigations in isolated sessions without shared context, and send the customer each result as its own reply.

### 02. Choose ONE answer.

`lookup_order` returns `placed_at` as a Unix timestamp (`1730419200`) and `status` as a numeric code (`3`), while `get_customer` returns `member_since` in ISO 8601 and a text status. In 9% of return requests the agent miscalculates the 30-day window or misreads the order status. What is the most reliable fix?

- **A.** Add a system prompt section that lists the date and status formats used by each tool, with the conversion rules to apply.
- **B.** Add a PreToolUse hook that blocks `process_refund` whenever the agent cannot verify that the order is inside the return window.
- **C.** Give the agent a `convert_timestamp` tool and instruct it to call that tool whenever it sees a numeric date in a result.
- **D.** Add a PostToolUse hook that converts timestamps to ISO 8601 and maps status codes to labels before the model reads them.

### 03. Choose ONE answer.

The support agent's MCP server answers `lookup_order` with `isError: true` and the text "Order lookup failed" in three different situations: the customer has no orders, the order database times out, and the API credential has expired. The agent retries all three up to three times and then escalates, even when the customer simply has no orders. Which change gives the agent what it needs to recover appropriately?

- **A.** Return an empty list as a success when no orders match, and return real failures with a category, a retryable flag and a description.
- **B.** Keep the generic message, and add a system prompt rule limiting the agent to two `lookup_order` retries per conversation.
- **C.** Add `retryable: true` to all three responses, so that the agent keeps retrying until the database and the credential have recovered.
- **D.** Split `lookup_order` into three tools, one per situation, so that the agent can choose the tool that matches the failure it expects.

### 04. Choose TWO answers.

In a review of 300 conversations, a sentiment rule (escalate when negative sentiment exceeds 0.7) sent 41 routine address changes to humans, while 17 polite customers asking for competitor price matching, which the policy does not cover, were handled autonomously and mishandled. For those 17 cases the agent's self-reported confidence averaged 9 out of 10. Which TWO conclusions should guide the redesign?

- **A.** Escalation should depend on explicit criteria, such as a customer asking for a human, a policy gap or exception, or no meaningful progress.
- **B.** Sentiment should remain the main trigger, with the threshold raised to 0.85 so that fewer routine cases reach a human agent.
- **C.** Self-reported confidence should not gate escalation, because it was high on exactly the cases that the agent handled wrongly.
- **D.** Conversation length should replace sentiment as the complexity proxy, so any case above twelve turns goes to a human.

## Code Generation with Claude Code

### 05. Choose ONE answer.

Your team's repository includes `.claude/skills/api-review/SKILL.md`, which prints findings as a bulleted list. You want a personal variant that also checks latency budgets and prints a table, while your teammates keep today's behavior. What should you do?

- **A.** Edit the committed `SKILL.md` in your working copy, taking care not to stage or commit that file.
- **B.** Fork the repository and keep the modified skill in the fork's `.claude/skills/` directory for your own use.
- **C.** Copy the skill to `~/.claude/skills/` under a different name, such as `api-review-latency`, and modify the copy.
- **D.** Add the latency and table instructions to the project's root `CLAUDE.md`, so that the skill picks them up when it runs.

### 06. Choose ONE answer.

Your team must replace the `moment` date library, which appears in 47 files. Two valid replacements exist, `date-fns` and the native Temporal API, and they differ in time-zone handling, bundle size and browser support. How should you proceed?

- **A.** Start in plan mode to explore usages and compare both options, agree on an approach, then switch to direct execution to implement it.
- **B.** Use direct execution and let Claude pick whichever replacement fits best as it converts the files, one directory at a time, until done.
- **C.** Stay in plan mode for the full task, because it can both design the approach and safely apply the 47 file edits.
- **D.** Run direct execution twice on separate branches, once per library, then compare the two finished diffs and keep the better one.

### 07. Choose ONE answer.

You must add audit logging to every payment endpoint in a 600-file monolith. A first discovery pass (route handlers, callers and middleware) prints about 900 lines of search output, and afterwards the main session is 70% full and starts to lose your logging requirements. Which approach protects the main session for the implementation phase?

- **A.** Run `/clear` after discovery and restate the requirements, relying on the files on disk instead of the discovery findings.
- **B.** Switch to plan mode for the discovery phase, so that the exploration is read-only and cannot change any payment code.
- **C.** Narrow the search patterns so that each query returns fewer than 50 lines, accepting that a few endpoints may be missed.
- **D.** Delegate discovery to the Explore subagent, which works in isolation and returns a summary of the endpoints and their callers.

### 08. Choose ONE answer.

Two engineers work from the same commit. In Dana's sessions Claude follows the root `CLAUDE.md` rule "Run `pnpm lint` before proposing a commit"; in Eli's sessions it does not, although Eli confirmed that the line exists in the file in his editor. What is the most direct way to find the cause?

- **A.** Reword the rule in capital letters with an "IMPORTANT" prefix, and ask both engineers to restart their sessions today.
- **B.** Run `/memory` in Eli's session and compare the memory files it lists as loaded with those loaded in Dana's session.
- **C.** Run `/compact` in Eli's session, so that the project instructions are summarized again into the current conversation.
- **D.** Ask Claude in Eli's session to recite the project rules it is following, and compare the answer with Dana's session.

## Multi-Agent Research System

### 09. Choose ONE answer.

A coordinator is configured with `agents: { searcher, analyst, synthesizer }` and `allowedTools: ["Read", "Grep", "WebFetch"]`. Across 40 runs it writes every report from its own knowledge, and the logs show zero subagent invocations, although each `AgentDefinition` has a clear description and system prompt. What is the most likely cause, and what is the fix?

- **A.** The subagent descriptions are too generic; rewrite them with specific trigger phrases so that the coordinator selects them.
- **B.** The coordinator prompt is too permissive; add an instruction telling it to delegate research to a subagent, not to answer itself.
- **C.** The `allowedTools` list does not include `"Task"`, so the coordinator cannot spawn subagents; add it to the list.
- **D.** The coordinator lacks the subagents' tools; add web search and document analysis tools to its `allowedTools` list.

### 10. Choose ONE answer.

A coordinator's plan lists five subtopics, and the requirement is that all five appear in the final report. The first synthesis pass cites sources for four of them, but for "grid-scale storage" it has one 2019 blog post and no data. What should the coordinator do next?

- **A.** Find the gap, send targeted storage queries to the search and analysis subagents, and re-invoke synthesis until coverage is sufficient.
- **B.** Give the synthesis agent web search tools, so that it can fill the storage gap itself without sending another request through the coordinator.
- **C.** Re-run the complete pipeline for all five subtopics with broader queries, and replace the first report with the new result.
- **D.** Deliver the report as it stands, annotating "grid-scale storage" as not covered, to avoid the extra latency of another round.

### 11. Choose ONE answer.

The synthesis agent receives ten subagent results concatenated into one 60,000-token input. In 9 of 20 reports, findings from documents 4 through 7 are missing, while documents 1-3 and 8-10 are cited correctly. What change best addresses this?

- **A.** Add an instruction telling the synthesis agent to read each section carefully and to cite findings from each document in the input.
- **B.** Switch the synthesis agent to a model with a larger context window, so that all ten results fit comfortably in one request.
- **C.** Truncate each subagent result to its first 150 words so that the whole input is short enough to be processed evenly.
- **D.** Open the aggregated input with a key-findings summary, and group the detailed results under explicit section headers.

## Developer Productivity with Claude

### 12. Choose ONE answer.

A codebase-exploration agent has 15 tools: five built-in tools and ten from issue-tracker, documentation and CI MCP servers. It calls a CI tool for roughly one in four documentation questions, although each tool's description is accurate. What change most directly improves tool selection?

- **A.** Keep all 15 tools on one agent, and extend the system prompt with a decision guide describing when each tool applies to a request.
- **B.** Split the work into role-specific subagents, each limited to the small set of tools its role needs, coordinated by the main agent.
- **C.** Set `tool_choice` to `"any"`, so that the agent is forced to call a tool on each turn instead of answering from memory.
- **D.** Rename the ten MCP tools with a consistent verb-noun naming pattern, so that their purposes are easier to tell apart.

### 13. Choose ONE answer.

A code-intelligence MCP server configured in `.mcp.json` exposes `find_references`, which resolves callers semantically; its description reads "Searches code." The agent already uses the issue-tracker server's tools in the same session, yet it keeps using the built-in Grep to find callers and returns noisy text matches. What change is most effective?

- **A.** Remove Grep from the agent's available tools, so that it has no choice but to use `find_references` for callers.
- **B.** Disable the issue-tracker server, so that only the code-intelligence server's tools are available to the agent.
- **C.** Rewrite the `find_references` description to state its inputs, its semantic caller resolution, and when to prefer it over Grep.
- **D.** Add a `CLAUDE.md` line telling the agent to prefer `find_references` over Grep for callers, and leave the MCP description unchanged.

### 14. Choose ONE answer.

`jobs.yaml` lists four entries that are textually identical (`retries: 3`, `timeout: 30`, `notify: ops`), separated only by `---`. You ask the agent to set `retries: 5` on the third entry only. `Edit` fails with "Found 4 matches of the string to replace", and a retry with three extra lines of surrounding context fails in the same way. What should the agent do?

- **A.** Read the whole file, then use Write to save the complete content with only the third entry changed.
- **B.** Run Edit again with `replace_all` enabled to change the four entries, then revert the other three entries one at a time.
- **C.** Run Grep to find the line number of the third match, and pass that line number to Edit as the anchor.
- **D.** Retry Edit with a shorter `old_string`, because a smaller target is more likely to match uniquely.

### 15. Choose ONE answer.

After a long session named `payments-audit`, your agent has mapped a payments service. You want to compare two refactoring approaches, extracting a `PaymentGateway` interface versus introducing an event bus, starting from that same analysis and with neither approach influencing the other. What should you do?

- **A.** Resume `payments-audit`, implement the first approach, then ask the agent to undo it and try the second one in the same session.
- **B.** Start two fresh sessions and have each one re-run the full analysis of the service before trying its approach.
- **C.** Resume `payments-audit` once and ask the agent to design both approaches in the same conversation, one after the other.
- **D.** Fork `payments-audit` into two sessions with `fork_session` and explore one approach in each branch from the shared baseline.

### 16. Choose TWO answers.

Two hours into mapping a 1,200-file legacy ordering system, the agent answers a question about `OrderRouter` with "systems like this typically use a factory pattern" instead of citing the classes it found in the first hour. Context usage is at 85%. Which TWO actions best counteract this degradation?

- **A.** Raise the Grep result limit, so that each search returns more matches and gives the agent more evidence per query.
- **B.** Have the agent keep a scratchpad file of key findings (class names, responsibilities, call paths) and consult it for later questions.
- **C.** Ask the agent to re-read the files it has discovered so far at the start of each answer, so that nothing is forgotten.
- **D.** Run `/compact` with instructions to keep the discovered class names and flows before starting the next exploration phase.

## Claude Code for Continuous Integration

### 17. Choose ONE answer.

Over four weeks, developers dismissed 62% of the review bot's "naming style" comments and 54% of its "unused import" comments, but only 9% of its security comments and 11% of its logic-bug comments. A survey shows that engineers now skim every bot comment, including the accurate security ones. What should you do first?

- **A.** Tighten the prompt with a rule to report findings whose confidence is at least 95%, in each of the four categories.
- **B.** Keep all four categories enabled and add a severity label, so that developers can filter out the noisy ones themselves.
- **C.** Temporarily disable the naming-style and unused-import categories, then write explicit criteria for them before re-enabling.
- **D.** Cap the bot at five comments per pull request, choosing which ones to post by the model's own confidence in each finding.

### 18. Choose TWO answers.

A nightly job generates unit tests for about 400 modules and nobody waits for the output, so the team moves it to the Message Batches API. Today each request runs a loop in which Claude calls a `run_tests` tool and revises the tests from its output. In a first trial, 372 requests succeeded, 21 errored because the module exceeded the context limit, and 7 expired. Which TWO actions fit the batch design?

- **A.** Restructure each request so that Claude generates the tests in one pass, and run test execution and revisions in a later step.
- **B.** Resubmit all 400 requests in a new batch once the oversized modules are fixed, so that the results come from one batch.
- **C.** Move the job back to the synchronous API, because a batch that cannot run its tool loop is unsuitable for a nightly workload.
- **D.** Resubmit only the 28 failed requests, identified by their `custom_id`, splitting the oversized modules into smaller chunks.

## Structured Data Extraction

### 19. Choose ONE answer.

An extraction pipeline defines three tools: `extract_metadata` (document type, language, page count), `extract_invoice_fields` and `extract_contract_clauses`. Metadata must be extracted first, and the enrichment tools run in follow-up turns. With `tool_choice` set to `"auto"`, roughly one run in six skips `extract_metadata`. Which configuration guarantees the order?

- **A.** Set `tool_choice` to `"any"` on the first request, so that the model is required to call one of the three tools.
- **B.** Set `tool_choice` to `{"type": "tool", "name": "extract_metadata"}` on the first request, then run the enrichment steps afterwards.
- **C.** Keep `"auto"` and add a system prompt rule stating that `extract_metadata` must be called before any other tool.
- **D.** Merge the three schemas into a single tool with optional fields, and let the model fill in whichever fields apply to each document.

### 20. Choose TWO answers.

Invoice extraction uses tool use with a strict JSON schema, so every output is schema-valid. In a 500-invoice sample, validation still flags two groups: 21 invoices whose printed total disagrees with the sum of their printed line items, and 33 invoices that do not print `vendor_tax_id`, so the required field comes back empty or invented. The real tax ID lives in a vendor record that the model never receives. Which TWO changes fit?

- **A.** Retry all 54 failing invoices up to three times, appending the specific validation error to the prompt on each attempt.
- **B.** Extract `calculated_total` next to `stated_total` and add a `conflict_detected` flag, so discrepancies are surfaced for review.
- **C.** Make `vendor_tax_id` nullable and stop retrying those invoices, since a retry cannot produce a value absent from the source.
- **D.** Instruct the model to infer `vendor_tax_id` from the vendor's name and address whenever the invoice does not print it.
