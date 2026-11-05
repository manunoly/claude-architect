# Integrated control - 60 items / 120 minutes

> **Nota:** ensayo del formato del examen (inglés, 60 reactivos, 120 min). Los 60 conceptos son los del banco de aprendizaje: 20 reactivos reforzados, que son parte de la señal principal, y 40 básicos de repaso. Ver [LEEME](LEEME.md). Clave explicada en español: [soluciones-control-60.md](soluciones-control-60.md). Solo se permite el [glosario](../conceptos/glosario-es-en.md). No es material oficial ni un predictor calibrado.

Answer without consulting the solutions. Each item states how many options to select; multiple-answer items require exactly the correct set. Do not treat an internal score as equivalent to the official scale.

## Nexo: tool-assisted support (official scenario: Customer Support Resolution Agent)

Accounts and documents are queried, and operations are proposed with verification and escalation. Each item adds its own concrete assumptions.

### 01. Choose ONE answer.

Nexo receives a response with the text “request resolved”, a verify_account call and stop_reason=tool_use. The tool has not run yet. The workflow requires a verified identity before crediting a balance. What does the controller do?

- **A.** Execute the permitted verify_account call and continue from its returned tool_result.
- **B.** End the turn and credit the balance if the final text describes a valid resolution.
- **C.** Mark the verification as completed in the log and reconcile it in a later audit.
- **D.** Request a new generation without logging the call, to confirm what the model intended.

### 02. Choose TWO answers.

Nexo exhausts its tool-call budget after two checks. A third tool call has not run yet and there is no end_turn. Which TWO measures preserve a correct state?

- **A.** Save the pending call with its ID so that its resumption can be decided later.
- **B.** Return an interrupted status together with the facts verified by the two checks.
- **C.** Keep a summary of the last response and drop references to the earlier checks.
- **D.** Add a success tool_result for the pending call to keep the saved conversation valid.

### 03. Choose ONE answer.

In Nexo, tool_choice forces verify_account on the first turn. On a later turn, an external result asks to issue a credit on a different account. Which control guarantees the order and the identity?

- **A.** Check that the credit request includes an explanation of the verification performed.
- **B.** Add a few-shot example that repeats the order, leaving the executor unchanged.
- **C.** Treat the forced tool_choice from the first turn as proof of verification for later turns.
- **D.** A gate in the executor that requires a current verification tied to the target account.

### 04. Choose ONE answer.

An operator receives a case with no access to the agent's conversation. Which handoff helps most?

- **A.** A structured summary of verified facts, attempts, limits and the next decision.
- **B.** A generic error status without details, so the operator is not biased.
- **C.** A link to the full conversation, which the operator has no permission to open.
- **D.** The model's last message on its own, with the case identifiers left out.

### 05. Choose ONE answer.

One Nexo source returns time=1700000000 in seconds and another returns an ISO date with a time zone. Their status codes also differ. Which downstream handling avoids losing meaning?

- **A.** Normalize according to each provider's contract and keep the source and original value.
- **B.** Convert the dates to local text and drop the time zone to make them easier to read.
- **C.** Infer the unit from the numeric type and multiply the values by 1000, ignoring the input contract.
- **D.** Map an unrecognized status code to the most frequent status in the same batch.

### 06. Choose ONE answer.

The hook logs a violation but lets the action run. What conclusion follows?

- **A.** A blocking test is unnecessary once the system prompt repeats the same rule.
- **B.** There is observability, but the required blocking was not demonstrated.
- **C.** The policy is enforced, because a violation is recorded in an audit log.
- **D.** The case passes if the model acknowledges the error after the action has run.

### 07. Choose ONE answer.

search_text and get_by_id keep getting confused. Which intervention targets the cause?

- **A.** Add retries for incorrect calls, without telling the model what went wrong.
- **B.** Rename both tools with shorter generic names and leave their descriptions unchanged.
- **C.** Describe when each tool applies and what its inputs and results mean.
- **D.** Raise the output token limit and keep the two descriptions as they are.

### 08. Choose ONE answer.

A server does not respond and the report concludes that there are no documents. What should change?

- **A.** Keep the empty result so that downstream handling stays simple.
- **B.** Propagate the unavailability and mark the coverage gap in the report.
- **C.** Record the timeout as a definitive negative result: no matching documents.
- **D.** Fill the gap in the report with documents that the model recalls.

### 09. Choose ONE answer.

A Nexo MCP tool denies access and returns isError=true with category=permission and retryable=false. An adapter maps it into the Messages API. Which output preserves the meaning?

- **A.** A tool_result with is_error=false, because the HTTP call completed successfully.
- **B.** A tool_result with isError=true, reusing the same field name that MCP uses.
- **C.** A successful empty list, so that the agent searches for alternative matches.
- **D.** A tool_result with is_error=true that keeps the non-retryable permission context.

### 10. Choose TWO answers.

One of a specialist's three sources fails temporarily. Which TWO measures are appropriate?

- **A.** Attempt local recovery within the agreed retry budget before escalating.
- **B.** Keep retrying until the source recovers, while the rest of the system waits.
- **C.** If it persists, return what was obtained, the failure and the attempts made.
- **D.** Report the result as complete, since two of the three sources responded.

### 11. Choose ONE answer.

A reviewer mixes style changes with errors that break the workflow. What should be adjusted first?

- **A.** The maximum number of comments, without clarifying what counts as an issue.
- **B.** The sampling temperature, treating it as the way to control false positives.
- **C.** A confidence threshold that filters out comments the model is unsure about.
- **D.** The inclusion and severity criteria, with contrasting examples of each level.

### 12. Choose ONE answer.

Compression drops the agreed amount and the case identifier. Which design reduces that risk?

- **A.** A rolling summary that retains the most recent turns and trims the earlier ones.
- **B.** A persistent block of critical facts kept apart from the narrative summary.
- **C.** A model that expresses more confidence in its summaries, with the context unchanged.
- **D.** Deleting tool results at the end of each turn to free up context space.

### 13. Choose ONE answer.

Each query adds thousands of irrelevant fields to the case. Which intervention improves the context?

- **A.** Remove the date fields from the records to save space and keep the rest as is.
- **B.** Repeat the complete responses at the start and end of each turn to keep them in view.
- **C.** Normalize the output to the relevant facts, with identifiers and retrievable evidence.
- **D.** Keep a one-line conclusion for the case and discard the link back to the source.

### 14. Choose ONE answer.

The person says “I want to talk to a person now.” What should the workflow prioritize?

- **A.** A full investigation of the issue first, even though the person did not request one.
- **B.** The planned handoff to a human, with enough context for the operator to continue.
- **C.** Closing the case because the request does not describe a technical error.
- **D.** Persuading the person that the automated agent can also help before handing off.

### 15. Choose ONE answer.

Two accounts have the same name and the operation affects their balance. What is the next step?

- **A.** Act on the older account, since it is the more likely match for that name.
- **B.** Apply the operation to both accounts and fix it later if either holder complains.
- **C.** Ask the user for an identifier that tells the accounts apart before acting.
- **D.** Pick the account with the higher balance so the workflow can be completed.

## Lumen: research and productivity (official scenarios: Multi-Agent Research System; Developer Productivity with Claude)

Specialists consult sources and repositories to produce attributable, recoverable reports. Each item adds its own concrete assumptions.

### 16. Choose ONE answer.

Two independent searches finish in the reverse of the requested order. How are they aggregated?

- **A.** By dropping the slower search result so the original request order is preserved.
- **B.** By matching each result by tool_use_id and preserving both calls.
- **C.** By merging the outputs into one text without saying which tool answered.
- **D.** By pairing the results with the calls in the order the responses arrived.

### 17. Choose ONE answer.

A query needs one document to be reviewed and cited. Four specialists are available. What is appropriate?

- **A.** Invoke the specialists the query needs and check whether their coverage is enough.
- **B.** Send the work to whichever specialist is free and accept the first response.
- **C.** Have each specialist draft a plan for the complete workflow before any of them starts.
- **D.** Run the four specialists in sequence to keep the architecture uniform across queries.

### 18. Choose ONE answer.

Three agents cover the same region and miss two others. What is the main correction?

- **A.** Assign explicit, distinct scopes and review coverage against the full question.
- **B.** Raise the maximum length of their reports and keep the task assignments as they are.
- **C.** Ask the three agents to rerun the same searches with more specific queries.
- **D.** Keep the most detailed of the three reports and discard the others.

### 19. Choose ONE answer.

Lumen asks a new synthesizer to combine two reports. The coordinator has findings with source and date, but the synthesizer does not share its history. Which input is sufficient and proportionate?

- **A.** The complete raw logs, with no indication of which source supports each claim.
- **B.** The coordinator's session ID and an instruction to continue from its memory.
- **C.** The relevant findings with sources, dates and gaps, plus the synthesis contract.
- **D.** The proposed final conclusions, so the synthesizer can write them up clearly.

### 20. Choose ONE answer.

A specialist must investigate causes that are still unknown. Which instruction is best?

- **A.** Tell it to investigate whatever it judges useful, without defining a scope or deliverable.
- **B.** Prescribe a fixed list of five files to read, even when they turn out to be unrelated.
- **C.** Define the outcome, limits and evidence, and let the steps adapt to what it finds.
- **D.** Ask for a final answer from prior knowledge first, then consult tools to confirm it.

### 21. Choose TWO answers.

You want to investigate two independent regulations before comparing them. Which TWO decisions are appropriate?

- **A.** Give each researcher the full set of writing tools, in case it needs them.
- **B.** Wait for both sets of evidence to arrive before drafting the final comparison.
- **C.** Launch both investigations in parallel, each with a clear return contract.
- **D.** Start the comparison before the results arrive and present it as final.

### 22. Choose ONE answer.

Lumen resumes an investigation: two files changed and the rest are the same. Which option reuses context without treating old observations as current?

- **A.** Report the changes, re-analyze those dependencies and keep what was revalidated.
- **B.** Discard the prior work and restart from scratch to get a clean baseline.
- **C.** Reuse the earlier results as they are, since the session ID matches the investigation.
- **D.** Fork the session and assume the fork refreshes the tool results it inherited.

### 23. Choose ONE answer.

A Lumen service has read_document(id) and publish_document(id, destination), but a generic tool mixes them with optional parameters and the same credentials. Which redesign should be validated first?

- **A.** Keep the generic interface and require the model to declare mode=read or mode=write.
- **B.** A separate tool for each document field, each granted publishing permissions.
- **C.** Tools with distinct contracts and separate permissions for reading and for publishing.
- **D.** Replace both tools with a general HTTP client so the model chooses the endpoint.

### 24. Choose ONE answer.

The writer needs to confirm simple dates but should not investigate new topics. Which option balances scope and latency?

- **A.** Access to the complete research toolset in addition to the writing tools.
- **B.** A limited date-check tool, with complex cases delegated through the coordinator.
- **C.** Let it supply the most probable date from memory to avoid extra rounds.
- **D.** Rerun the full research workflow whenever a date needs to be confirmed.

### 25. Choose ONE answer.

The agent must know which manuals exist before searching inside them. What can help?

- **A.** Rewrite each manual to include an index header so the agent can discover it.
- **B.** Expose a catalog of the manuals as a resource, with useful metadata for each.
- **C.** Run a separate MCP server for each manual title so each one can be discovered.
- **D.** Announce a search tool and treat its listing as the permission to use the manuals.

### 26. Choose ONE answer.

A migration analysis runs out of context before reaching the decisions. Which change helps?

- **A.** Delegate focused questions and return verifiable summaries with references.
- **B.** Drop the file references from the summaries to make them shorter and cheaper.
- **C.** Increase the narrative detail of each search result and keep the same scope.
- **D.** Stop the investigation where the context window fills up and report what was reached.

### 27. Choose ONE answer.

Two reviewers agree on an alert, but there is no example that reproduces it. What is missing to act on solid grounds?

- **A.** Require that the two messages match word for word before acting on the alert.
- **B.** Verify the defect's evidence and effect with a concrete reproducing case.
- **C.** Treat the agreement between the two reviewers as sufficient proof of severity.
- **D.** Add the two reviewers' confidence scores and compare the total against a threshold.

### 28. Choose ONE answer.

A review found evidence in two repositories and could not query a third. Which report is correct?

- **A.** Verified facts mixed with conjectures about the third repository, in one uniform tone.
- **B.** A conclusion that the third repository holds nothing relevant to the question.
- **C.** A report that leaves out the access problem so readers keep their confidence.
- **D.** Attributed findings plus an explicit limitation for the unqueried repository.

### 29. Choose ONE answer.

A manifest saved yesterday says a task is still active. What must be verified before continuing?

- **A.** That the model can recall which specialist was working on the task yesterday.
- **B.** The current state of files and processes, keeping the checked and pending items.
- **C.** That the manifest file is well formed; its recorded state can then be treated as current.
- **D.** That the saved summary is detailed enough to brief the specialists on resuming.

### 30. Choose ONE answer.

Lumen compares a publication from today with 2020 data and another from yesterday with 2026 measurements. The methods differ. How can a misleading synthesis be avoided?

- **A.** Keep the period, method and source of each figure before deciding comparability.
- **B.** Choose the figure retrieved last in the search, to keep the order reproducible.
- **C.** Compute a single average of the figures and list the references at the end.
- **D.** Choose today's publication as authoritative, since it is the more recent of the two.

## Orion: development and CI (official scenarios: Code Generation with Claude Code; Claude Code for Continuous Integration)

The team maintains conventions, reviews and automated workflows with verifiable results. Each item adds its own concrete assumptions.

### 31. Choose ONE answer.

A document conversion always validates, extracts and presents the same contract. What is a reasonable basis?

- **A.** A coordinator that plans the stages from scratch for each new document.
- **B.** An open-ended exploration that stops when the model judges the output satisfactory.
- **C.** A fixed sequence of stages with an explicit check between each pair of stages.
- **D.** Several agents that each propose a version of the contract and vote on one.

### 32. Choose ONE answer.

Each file looks correct, but a unit change breaks the consumer. What is missing?

- **A.** Renaming and reorganizing the files so related modules are grouped visually.
- **B.** A longer per-file report that includes more detail but no input from other modules.
- **C.** Additional style comments for each file, reviewed independently of the others.
- **D.** A pass that follows the contract and data flow between producer and consumer.

### 33. Choose ONE answer.

Files ending in .spec.ts are being searched for. Which operation fits?

- **A.** Reading the repository's files one at a time to see which of them are tests.
- **B.** Writing a list of candidate file names to a new file and reviewing it later.
- **C.** A content search for the literal text .spec.ts inside the repository's files.
- **D.** A path search using a glob pattern such as **/*.spec.ts to match file names.

### 34. Choose ONE answer.

The anchor text repeats in three functions and the file has changed. What is the next step?

- **A.** Replace the first occurrence without checking which function it belongs to.
- **B.** Rewrite the section from memory of the earlier version and overwrite the current text.
- **C.** Treat the edit as applied, because the intended change was correct in principle.
- **D.** Re-read the current file and choose context that is unique before editing.

### 35. Choose ONE answer.

Only the repository author receives a convention that she saved in her profile. How should it be shared?

- **A.** Save the text in a second personal file with a shorter name and a clearer title.
- **B.** Ask the other developers to paste the convention into each session they start.
- **C.** Increase the context window size and leave the convention's scope unchanged.
- **D.** Move the shared convention from the profile into versioned project instructions.

### 36. Choose ONE answer.

Orion has a rule imported in the project CLAUDE.md and another version in a package. A teammate observes different behavior. Which diagnosis produces useful evidence?

- **A.** Copy everything to the teammate's personal profile and assume the scope is resolved.
- **B.** Inspect the loaded files, their scope and imports, and the paths actually edited.
- **C.** Compare the text of the root CLAUDE.md alone, without reading the package's rules.
- **D.** Ask the model to confirm that it knows the repository's conventions.

### 37. Choose ONE answer.

The team wants to invoke a specific accessibility review without loading its whole procedure into every session. What fits?

- **A.** Paste the complete procedure at the start of each prompt where it might apply.
- **B.** Rewrite the project documents as general instructions loaded at session start.
- **C.** A personal custom command in the author's home directory, not in the repository.
- **D.** A project skill that packages the review instructions and the tools it needs.

### 38. Choose TWO answers.

An Orion skill uses context: fork and allowed-tools: Read, Grep, Glob. According to the documentation archived in November 2026, which TWO statements are correct?

- **A.** allowed-tools removes the tools that are not listed from the skill's available set.
- **B.** Leaving Write out of allowed-tools also blocks indirect ways of modifying files.
- **C.** The fork isolates context; on its own it does not show that writes are impossible.
- **D.** allowed-tools pre-approves tools; removing capabilities requires real restrictions.

### 39. Choose ONE answer.

The same rule must apply to *.test.ts files scattered across several packages. What is appropriate?

- **A.** A global rule loaded for any file, with the test conventions in a dedicated section.
- **B.** Paste the convention text into a header comment inside each test file.
- **C.** A path-scoped rule in .claude/rules whose paths pattern is **/*.test.ts.
- **D.** A personal instruction file that lists the first package's test conventions.

### 40. Choose ONE answer.

A test rule ends up loading when production configuration is edited. What should be reviewed?

- **A.** The transcript of a previous session in which those files were not touched.
- **B.** How often the word “test” appears in the rule, in case it is over-weighted.
- **C.** The paths pattern and its scope, tested with cases that should and should not match.
- **D.** The wording of the rule, softening its severity so it is applied less often.

### 41. Choose ONE answer.

Orion must change six lines of a contract shared by many consumers, with two compatibility strategies. What justifies investigating before executing?

- **A.** The line count: a six-line change is small enough for direct execution.
- **B.** That one of the two strategies needs less code, without reviewing the consumers.
- **C.** The dependencies and the compatibility decision, even if the diff is small.
- **D.** Planning after the change is applied, to document what was done.

### 42. Choose ONE answer.

Orion needs a non-interactive job and findings that another process will interpret. Which combination of decisions matches the studied pattern?

- **A.** Use -p with a structured contract and check the envelope, the errors and the process result.
- **B.** Use interactive mode with a prompt that tells the model to avoid asking questions.
- **C.** Use -p and publish the first text that appears, without validating its result type.
- **D.** Use --output-format json as sufficient proof that there were no failures or refusals.

### 43. Choose ONE answer.

After each commit the same already-fixed problems get published again. What context is missing?

- **A.** More repository code from the organization, without narrowing it to the changes.
- **B.** A longer prompt giving more guidance on the style of the review comments.
- **C.** Previous findings with their status, plus the changes now being re-evaluated.
- **D.** An instruction to suppress findings reported before, even if they remain open.

### 44. Choose ONE answer.

A style rule reports false errors and developers ignore the whole report. Which approach helps?

- **A.** Publish a larger number of comments per review so that some of them are useful.
- **B.** Approve the category on the strength of the model's stated high confidence.
- **C.** Isolate that category, refine it and validate it before turning it back on.
- **D.** Disable the checks for functional errors as well, to cut noise across the report.

### 45. Choose ONE answer.

A second opinion is wanted on generated code. Which input favors an independent review?

- **A.** The generator's own explanation of why its code is correct, as the review basis.
- **B.** The requirements, the change and the relevant tests, without the generator's defense.
- **C.** A list of pre-written conclusions that the reviewer is expected to confirm.
- **D.** A note stating that the change already passed an earlier review by the team.

## Archivo: extraction and maintenance (official scenarios: Structured Data Extraction; Code Generation with Claude Code)

Ambiguous documents and batches are processed, code is maintained and human review is organized. Each item adds its own concrete assumptions.

### 46. Choose ONE answer.

Two branches compare migration strategies from the same analysis. How should the coordinator decide?

- **A.** Prefer the branch that finished first, since its results are the freshest.
- **B.** Contrast their evidence, then select or combine the decisions explicitly.
- **C.** Assume the findings of both branches were merged back into the main session.
- **D.** Treat both proposals as already applied, since they share the same origin.

### 47. Choose ONE answer.

Archivo has two extractors with different schemas. It is not known in advance which document type will arrive, and the model must choose one of them rather than reply with free text. Which configuration is appropriate for that turn?

- **A.** tool_choice=any, with clearly differentiated tool descriptions and schemas.
- **B.** Describe both schemas in prose in the system prompt and drop the tool definitions.
- **C.** tool_choice=auto, trusting the model to call one of the two extractors.
- **D.** tool_choice forcing the letter extractor, even though invoices may also arrive.

### 48. Choose ONE answer.

Archivo shares an HTTP MCP server among developers, each with their own environment token. Which project entry is consistent with the current client?

- **A.** A url with no type and the maintainer's personal token written into the repo.
- **B.** type=sdk in .mcp.json, used instead of an http entry for the remote server.
- **C.** The entry kept in the maintainer's user profile, which the team is told to reuse.
- **D.** type=http, the server url, and a ${TOKEN} reference inside the header value.

### 49. Choose ONE answer.

A migration treats null and the empty string as the same, but the product distinguishes them. What adds the most?

- **A.** Remove the empty-string cases from the tests so that they stop failing.
- **B.** Raise the temperature so the model explores how to resolve the ambiguity.
- **C.** Concrete examples and tests with both values and their expected outputs.
- **D.** Rename the function to say it handles both values, without specifying the behavior.

### 50. Choose ONE answer.

A cache fix repairs stale data but breaks invalidation. What should the next iteration include?

- **A.** Both behaviors, their relationship and tests of the required invariant.
- **B.** A cleaned-up bug report with formatting edits that make it easier to read.
- **C.** A request to make the tests pass, with permission to narrow their coverage.
- **D.** A description of the new invalidation symptom, leaving out the earlier fix.

### 51. Choose ONE answer.

Archivo extracts exact dates. It fails on seasons and contradictory documents, although it gets explicit ISO dates right. Which few-shot set adds the most?

- **A.** Exact-date, approximate-period and conflict cases, each with its output and reason.
- **B.** A list of candidate years, with no guidance on deciding when evidence is missing.
- **C.** The documents that already pass, shown without the expected output to avoid bias.
- **D.** Three ISO dates from different months, each with the same correct output.

### 52. Choose TWO answers.

Extraction works on the two demo documents. Which TWO steps are useful?

- **A.** Evaluate documents of different structure that were not used for tuning.
- **B.** Declare validation complete, since both demo documents extract correctly.
- **C.** Require the same output wording even when the source content changes.
- **D.** Include examples that walk through the relevant ambiguous case and its output.

### 53. Choose ONE answer.

The Archivo consumer requires the exactDate key to be present, but its value may be unknown. Which fragment best expresses that contract?

- **A.** required includes exactDate, and its type allows both string and null.
- **B.** exactDate is removed from the schema, and the prompt asks the model to include it.
- **C.** exactDate is optional with type string; the consumer assumes the key is present.
- **D.** exactDate is required with type string; a default date is used if there is no evidence.

### 54. Choose ONE answer.

An invoice's JSON is valid, but the amount is not in the source. What follows?

- **A.** Accept the amount, since the response parsed and matched the schema without errors.
- **B.** Reject the value or send it to review through evidence and business-rule checks.
- **C.** Rename the field to verified_amount so downstream consumers treat it as checked.
- **D.** Resend the request with the same schema, treating a second valid parse as proof.

### 55. Choose ONE answer.

The validator requires normalizing a date that does appear in the document. Which input helps the next attempt?

- **A.** The source, the previous extraction and a precise explanation of the invalid format.
- **B.** A note that the response was incorrect, without the document or the failed value.
- **C.** The previous output, presented to the model as a correct example to follow.
- **D.** A fabricated document that already satisfies the schema, used in place of the source.

### 56. Choose ONE answer.

The sum of the line items and the printed total differ. Which output serves review?

- **A.** The average of the two amounts, written into the field for the declared total.
- **B.** Both values, a conflict indicator and references to the supporting evidence.
- **C.** The value that the model judges most plausible, with the other one dropped.
- **D.** A null total and no mention of the contradiction found in the document.

### 57. Choose ONE answer.

Archivo receives documents continuously. SLA: 27 h from arrival; 24 h are reserved for the batch window and 0.5 h for collection and validation. Which submission frequency fits that worst-case wait budget?

- **A.** Every 4 h, as long as the observed median wait stays below 24 h.
- **B.** Every 3 h, so the worst-case total reserve would be 27.5 h.
- **C.** Every 5 h, with the wait before submission excluded from the SLA.
- **D.** Every 2 h, so the worst-case total reserve would be 26.5 h.

### 58. Choose ONE answer.

Archivo keeps 93 successes; three failures exceeded the context limit, two were transient and two lack a necessary external source. Which recovery respects the evidence and avoids useless work?

- **A.** Resubmit the seven failed documents as they are, repeating the request until each yields a valid response.
- **B.** Resubmit the entire batch of one hundred documents with a more permissive schema to cut errors.
- **C.** Record null for the two documents lacking a source and close their review without noting the gap.
- **D.** Keep successes, adapt the three oversized inputs, retry transient failures, obtain the missing sources.

### 59. Choose ONE answer.

In Archivo, high confidence is right on 20 of 24 forms and 4 of 8 letters. Which conclusion best guides the review?

- **A.** Treat the stated confidence as a calibrated probability and skip the labeled results.
- **B.** Rely on the overall 24/32 accuracy to reduce review for both segments by the same amount.
- **C.** Drop the letters from the evaluation, so that the remaining formats are homogeneous.
- **D.** Measure and tune by segment; letters need attention even if the average looks acceptable.

### 60. Choose TWO answers.

The human queue contains only low-confidence items. Which TWO improvements would let you measure the automated part?

- **A.** Count the unreviewed items as correct, since no reviewer flagged them.
- **B.** Randomly sample high-confidence items inside the relevant segments.
- **C.** Build the sample from the documents with the cleanest formats.
- **D.** Compare accuracy by document type and by field against labeled results.
