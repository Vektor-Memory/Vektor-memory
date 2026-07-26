

# VEKTOR MEMORY - Slipstream

### Vector memory for agentic AI. Local-first. Privacy Enhanced Technology. Data Sovereignty.
[![Longmemeeval benchmark](https://img.shields.io/badge/longmemeval-81%25-854F0B?style=flat-square)](https://arxiv.org/abs/2605.12493)
[![LoCoMo benchmark](https://img.shields.io/badge/LoCoMo-66.9%25-854F0B?style=flat-square)](https://arxiv.org/abs/2402.17753)
[![recall latency](https://img.shields.io/badge/recall-sub--28ms-0F6E56?style=flat-square)](#performance)
[![license](https://img.shields.io/badge/license-Commercial-533AB7?style=flat-square)](https://vektormemory.com/product#pricing)
[![MCP tools](https://img.shields.io/badge/MCP_tools-50+-185FA5?style=flat-square)](#mcp-tools)

**[Documentation](https://vektormemory.com/docs) · [Install](#install) · [Quick Start](#quick-start) · [MCP Tools](#mcp-tools) · [Pricing](https://vektormemory.com/product#pricing)**

</div>

---

<img width="2048" height="1152" alt="vektor banner-large" src="https://github.com/user-attachments/assets/98916fff-c322-4423-b7ce-0dc141c3ed25" />
<div align="center">


## VEKTOR fixes the architecture. Not the prompt.

The problems are architectural, not instructional. You cannot prompt your way out of a stateless architecture.

```
Session starts        ──►  Reconstruct context from logs   ──►  10,000–30,000 tokens burned
                                                                 before a single line of work runs

Cron job fires        ──►  Agent has no memory of last run  ──►  Repeats completed work
                                                                 Loops. Bills stack up.

Add more guardrails   ──►  Longer prompts                   ──►  More tokens
                      ──►  More complexity                  ──►  More failure surface
                      ──►  More maintenance                 ──►  Less time saved
```

> **The control paradox:** the more control you try to add through prompts, the more expensive and fragile the system becomes. You end up spending more time fixing the automation than the automation saves.


---

## The Solution Stack

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   DXT       drag-and-drop install · 50+ tools registered    │
│             automatically · no JSON editing                 |  
│                                                             │
│   MCP       stateless on-demand tool invocation             │
│             no persistent process between runs              │
│             agent wakes, works, terminates cleanly          │
│                                                             │
│   Skill     ~150 tokens of scoped context injected          │
│   Files     only when relevant · unloaded when done         │
│             90% less context overhead per session           │
│                                                             │
│   VEKTOR ◄─ persistent memory graph · BM25 + vector RRF     │
│             recall · self-organising intelligence layer     │
│             state that actually survives between sessions   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

| Layer | Solves | Token impact |
|---|---|---|
| DXT | Setup friction, misconfigured tools | Surfaces only relevant tools per task |
| MCP | Persistent process requirement, cold starts | Stateless invocation on demand |
| Skill Files | Monster prompts, competing instructions | 150 tokens vs 8,000–20,000 |
| **VEKTOR** | **Session amnesia, broken cron jobs, control paradox** | **250–4,000 tokens regardless of DB size** |

---

## Install

```bash
npm install -g vektor-slipstream
vektor setup
```

Or drag `vektor-slipstream.dxt` directly into Claude Desktop. All 50+ tools register automatically. No JSON editing. No path configuration.

---

## Quick Start

```js
const { createMemory } = require('vektor-slipstream');

const memory = await createMemory({
  agentId: 'my-agent',
  licenceKey: process.env.VEKTOR_LICENCE_KEY,
});

// Store a memory
await memory.remember('User prefers TypeScript. Deployed to prod on Friday.');

// Recall by semantic similarity -- sub-28ms, fully local
const results = await memory.recall('deployment preferences', 5);
// → [{ content, score, id, timestamp }]

// Traverse the associative memory graph
const graph = await memory.graph('TypeScript', { hops: 2 });

// What changed in the last 7 days?
const delta = await memory.delta('project decisions', 7);

// Morning briefing from recent memories
const brief = await memory.briefing();
```

---

## Before vs After

| | Without VEKTOR | With VEKTOR |
|---|---|---|
| **Context cost per session** | 15,000–50,000 tokens reconstructing history | 250–4,000 tokens for full semantic recall |
| **Cron jobs** | Agent repeats completed work -- no memory of last run | Recalls previous run outcome in one call |
| **Configuration memory** | Forgotten every session | Graph surfaces what worked last time automatically |
| **Autonomy vs control** | Either full autonomy (dangerous) or manual gates (slow) | Agent learns from outcome history when to proceed vs escalate |
| **Between-session state** | Persistent process required or state is lost | SQLite persists -- stateless invocation, stateful recall |
| **Embedding cost** | Cloud API call on every store and recall | $0 -- fully local ONNX, no API key required |

---

## Session Flow

```
Task triggered (cron / webhook / user action)
        │
        ▼
Skill File injected based on task context          ~150 tokens
        │
        ▼
vektor_recall_rrf called                           ~800 tokens
Top-10 semantically relevant memories returned
        │
        ▼
Agent classifies situation from memory history
        │
   ┌────┴─────────────────────┐
   ▼                          ▼
familiar pattern          novel / previously failed
proceed autonomously       surface for human review
   │                          │
   └────────────┬─────────────┘
                ▼
Execute task via MCP tools
        │
        ▼
Result stored via vektor_store
Memory graph updated with outcome
        │
        ▼
Session ends · SQLite persists everything
        │
        ▼
Next invocation: same startup cost · full outcome history available
```

**Total context overhead for a routine task: under 2,000 tokens.**
The same task with a monolithic system prompt and history reconstruction: 15,000–50,000 tokens, with no retention of outcome.

---

## Performance

| Metric | Value |
|---|---|
| Recall latency | sub-28ms (local SQLite + ONNX) |
| Embedding cost | $0 -- fully local ONNX |
| Embedding latency | ~10ms GPU / ~25ms CPU |
| Longmemeval benchmark | 81% accuracy |
| LoCoMo benchmark | 66.9% adjusted judge accuracy |
| Min tokens for full recall | 250 |
| Max tokens regardless of DB size | 4,000 |
| First run | ~2 min (downloads ~25MB model once) |
| Subsequent boots | <100ms |

**LoCoMo benchmark results

| Category | Accuracy |
|---|---|
| Abstention | 100% |
| Single-session assistant | 93.3% |
| Multi-session | 80.0% |
| Single-session user| 80.0%|
| Single-session preference| 80.0%|
| Knowledge updates| 73.3%|
| Temporal reasoning| 66.7%|
| **Adjusted total** | **81%** |

---

## CLI Chat -- Persistent Memory Across Every Session

```bash
npx vektor chat                                        # auto-detects Ollama
npx vektor chat --provider claude                      # Anthropic Claude
npx vektor chat --provider groq --model llama-3.3-70b-versatile
npx vektor chat --provider openai
npx vektor chat --provider gemini
```

| Provider | Details |
|---|---|
| `ollama` | Default -- free, local, no API key. Auto-detects best model. |
| `claude` | Anthropic Claude -- set `ANTHROPIC_API_KEY` |
| `openai` | OpenAI GPT -- set `OPENAI_API_KEY` |
| `groq` | Groq LLaMA -- set `GROQ_API_KEY` (free tier available) |
| `gemini` | Google Gemini -- set `GEMINI_API_KEY` |

**In-chat commands:**

| Command | Action |
|---|---|
| `/recall <query>` | Search memory mid-conversation |
| `/stats` | Node count, edges, pinned memories |
| `/briefing` | Generate memory briefing inline |
| `/exit` | Exit (Ctrl+C also works) |

**One-liner commands:**

```bash
# Store facts
npx vektor remember "I prefer TypeScript over JavaScript"
npx vektor remember "deadline is Friday" --importance 5
cat meeting-notes.txt | npx vektor remember

# Query
npx vektor ask "what stack am I using?"
npx vektor ask "what did we decide about the database?"

# Autonomous agent
npx vektor agent "summarise everything I know about project Alpha"
npx vektor agent "research AI memory tools" --steps 15 --provider groq
```

---

## Claude Desktop Extension (DXT)

Install the `.dxt` extension for zero-config persistent memory in every Claude Desktop session.

**Install:** drag `vektor-slipstream.dxt` onto the Claude Desktop Extensions page.

Once installed, Claude automatically:
- Recalls relevant context at session start
- Stores facts and decisions during conversation
- Summarises and consolidates at session end

All 50+ tools available. No configuration beyond your licence key.

Download: [vektormemory.com/docs/dxt](https://vektormemory.com/docs/dxt)

---

## MCP Tools -- 50+ 

### Memory

| Tool | Function |
|---|---|
| `vektor_recall` | Semantic + BM25 + graph search across memory |
| `vektor_recall_rrf` | BM25+RRF dual-channel recall with cross-encoder rerank |
| `vektor_store` | Store memory with importance score |
| `vektor_ingest` | Batch ingest conversation turns with session date |
| `vektor_graph` | Traverse associative memory graph |
| `vektor_delta` | See what changed on a topic over time |
| `vektor_briefing` | Generate briefing from recent memories |
| `vektor_stats` | Memory DB stats -- node count, edges, entities |
| `vektor_timeline` | Query memories by date range |

### Cloak -- Stealth Browser, SSH, Fetch

| Tool | Function |
|---|---|
| `cloak_fetch` | Stealth headless browser fetch via Playwright |
| `cloak_fetch_smart` | Checks llms.txt first, falls back to stealth browser |
| `cloak_render` | Full CSS/DOM layout sensor |
| `cloak_diff` | Semantic diff of URL since last fetch |
| `cloak_diff_text` | Structural diff between two text blobs |
| `cloak_passport` | AES-256-GCM credential vault (get/set/delete/list) |
| `cloak_ssh_exec` | Execute commands on remote server via SSH |
| `cloak_ssh_upload` | Upload file to remote server via SFTP |
| `cloak_cortex` | Scan project directory into memory graph |
| `cloak_cortex_anatomy` | Get cached file anatomy without rescanning |
| `tokens_saved` | Token efficiency ROI calculator |

### Identity + Behaviour (Anti-Bot Bypass)

| Tool | Function |
|---|---|
| `cloak_identity_create` | Create persistent browser fingerprint identity |
| `cloak_identity_use` | Apply saved identity to a fetch call |
| `cloak_identity_list` | List saved identities with trust summary |
| `cloak_inject_behaviour` | Human mouse/scroll injection for reCAPTCHA/Cloudflare |
| `cloak_behaviour_stats` | List available patterns and categories |
| `cloak_load_pattern` | Load custom recorded behaviour pattern |
| `cloak_pattern_stats` | Self-improving pattern store tier breakdown |
| `cloak_pattern_list` | List patterns with scores and tier |
| `cloak_pattern_prune` | Remove stale/low-scoring patterns |
| `cloak_pattern_seed` | Seed store with built-in patterns |

### CAPTCHA

| Tool | Function |
|---|---|
| `cloak_detect_captcha` | Detect CAPTCHA type and sitekey |
| `cloak_solve_captcha` | Solve via vision AI (Claude/GPT-4o/2captcha) |

### Compression

| Tool | Function |
|---|---|
| `turbo_quant_compress` | PolarQuant vector compression (~75% smaller) |
| `turbo_quant_stats` | Compression ratio and savings stats |

### Multimodal

| Tool | Function |
|---|---|
| `vektor_text` | Text generation (OpenAI/Claude/Groq/Gemini/NVIDIA NIM) |
| `vektor_image` | Image generation (DALL-E, Stability, NVIDIA) |
| `vektor_vision` | Image understanding and analysis |
| `vektor_speech` | Text-to-speech and transcription |
| `vektor_search` | Web search with memory integration |
| `vektor_providers` | List available providers and status |

### Agent

| Tool | Function |
|---|---|
| `vektor_agent_run` | Autonomous goal executor with memory |
| `vektor_swarm` | Multi-agent swarm task |
| `vektor_watch` | File system watcher -- auto-ingest on change |

---

## All CLI Commands

```bash
npx vektor setup       # First-run wizard -- licence, hardware, integrations
npx vektor activate    # Activate licence key on this machine
npx vektor test        # Test memory engine with progress bar
npx vektor status      # System health check
npx vektor mcp         # Start Claude Desktop MCP server
npx vektor rem         # Run REM dream cycle (memory consolidation)
npx vektor chat        # Persistent memory chat (all LLMs)
npx vektor remember    # Store a fact
npx vektor ask         # Query memory + LLM answer
npx vektor agent       # Autonomous goal executor
npx vektor help        # All commands
```

---

## Claude Code Setup

Add to `.claude/settings.json` in your project:

```json
{
  "mcpServers": {
    "vektor": {
      "command": "node",
      "args": ["/path/to/node_modules/vektor-slipstream/index.js"],
      "env": {
        "VEKTOR_LICENCE_KEY": "your-licence-key",
        "CLOAK_PROJECT_PATH": "/path/to/your/project"
      }
    }
  }
}
```

---

## What's Included

### Memory Core (MAGMA)

- 4-layer associative graph -- semantic, causal, temporal, entity edges
- bge-small-en-v1.5 bi-encoder + ms-marco cross-encoder reranker
- BM25 + stemmed BM25 + RRF fusion -- keyword + semantic dual-channel recall
- Persistent entity index -- guaranteed named-entity retrieval
- Foresight extraction -- future-tense statements stored with temporal metadata
- ADD-only contradiction detection -- full history preserved, no silent overwrites
- REM dream cycle -- up to 50:1 memory compression
- Sub-28ms recall -- local SQLite, no network required
- Local ONNX embeddings -- $0 embedding cost, no API key required

### Intelligence Layer (runs automatically, no config)

| Module | Function |
|---|---|
| `recall-tune` | Adjusts retrieval weights based on which memories produced correct outcomes |
| `confidence` | Scores memories by reliability across corroborating sources |
| `dedup` | Removes semantic duplicates, keeps the graph clean |
| `selforg` | Reorganises memory clusters as new information accumulates |
| `rl-memory` | Reinforcement signals surface higher-quality memories preferentially |
| `briefing-scheduler` | Periodic summaries of memory activity |

### Integrations

- **Claude Desktop** -- DXT extension, 50+ tools, auto-memory on every session
- **Claude Code** -- MCP server, all 50+ tools
- **CLI** -- `chat`, `remember`, `ask`, `agent` commands
- **LangChain** -- v1 + v2 adapter included
- **OpenAI Agents SDK** -- drop-in integration
- **Groq · Gemini · Ollama · NVIDIA NIM** -- provider agnostic

---

## Hardware Auto-Detection

Zero config. VEKTOR detects and uses the best available accelerator:

- **NVIDIA CUDA** -- GPU acceleration
- **Apple Silicon** -- CoreML
- **CPU** -- optimised fallback, works everywhere

---

## Environment Variables

| Variable | Default | Purpose |
|---|---|---|
| `VEKTOR_SUMMARIZE` | `false` | Enable LLM session summarisation on ingest |
| `VEKTOR_TRIPLES` | `true` | Enable batch triple extraction on ingest |
| `VEKTOR_FORESIGHT` | `true` | Extract future-tense foresight signals |
| `VEKTOR_TEMPORAL` | `true` | Enable temporal index and date boosting |
| `VEKTOR_CONTRADICT` | `true` | Enable ADD-only contradiction detection |
| `VEKTOR_DEBUG` | -- | Enable verbose retrieval debug output |
| `VEKTOR_MODEL` | `Xenova/bge-small-en-v1.5` | Swap embedding model |
| `VEKTOR_RERANK` | `true` | Enable cross-encoder reranking |

---

## Research Foundation

Built on peer-reviewed research:

- [MAGMA (arxiv:2601.03236)](https://arxiv.org/abs/2601.03236) -- Multi-Graph Agentic Memory Architecture
- [EverMemOS (arxiv:2601.02163)](https://arxiv.org/abs/2601.02163) -- Self-Organizing Memory OS
- [HippoRAG (arxiv:2405.14831)](https://arxiv.org/abs/2405.14831) -- Neurobiologically Inspired Long-Term Memory (NeurIPS 2024)
- [Mem0 (arxiv:2504.19413)](https://arxiv.org/abs/2504.19413) -- Production-Ready Agent Memory
- [LoCoMo Benchmark (arxiv:2402.17753)](https://arxiv.org/abs/2402.17753) -- Long-Context Conversational Memory

---

## Pricing

| Plan | Price | Licences |
|---|---|---|
| Solo | $9/mo | 3 |
| Team | $35/mo | 5 |
| Studio | $59/mo | 10 |
| Enterprise | $99/mo | 25 |

[Purchase at vektormemory.com](https://vektormemory.com/product#pricing)

---

## What's New in the Changelog:

v1.7.8
PREVIEW
16 Jul 2026 — Catch-up Brief Deterministic Grounding · Reasoning-Model Tool-Call Fix · Floating Desk Toolbar · Cross-Theme Colour Consistency
Catch-up Brief — Deterministic Memory Grounding
The catch-up brief previously left it up to whichever model was selected to decide whether to search memory before answering — strong tool-callers mostly stayed grounded, but weaker/local models frequently skipped retrieval and padded the answer with plausible-sounding invention. Retrieval now runs server-side first, always, via a fixed set of memory queries covering focus/decisions/open-questions/recent-notes, merged into one context block. The model receives a strict section template plus an explicit instruction to only state what's in that context, writing “Nothing new this week” for empty sections instead of inventing content. Output is now consistent across providers, including smaller local models, and is inherently self-updating since it re-queries live memory on every request.

Bug Fix — Reasoning-Model Tool Calls (Luna, Terra, Sol & o-series)
The new gpt-5.6 family models added in v1.7.7 (Luna, Terra, Sol) plus other o-series/gpt-5-family models failed every DESK tool-calling request with Function tools with reasoning_effort are not supported. Simply omitting reasoning_effort wasn’t enough — these models still apply their own default server-side, which conflicts with function tools on /v1/chat/completions. Fixed by explicitly sending reasoning_effort: 'none' whenever a reasoning-family model is in play, since this code path always sends tools.

Desk Toolbar — Floating Frosted Panel
The bottom input bar (formatting row, model picker, THINK/COLLAB/JOT) is now a floating translucent panel with backdrop blur and rounded corners on all sides, inset from the window edge, instead of a flat opaque bar flush to the bottom.

Cross-Theme Colour Consistency
Fixed the silver theme’s background layering, where the card surface colour was identical to the page background (no visible depth) and the next step jumped straight to a harshly dark hover state. Standardised the quick-action toolbar, send buttons, and sidebar navigation highlighting to draw from the same theme accent variables instead of one-off hardcoded colours, and gave graph “Semantic” nodes a fixed, theme-independent colour so they stay visible against every theme instead of fading to near-white.

PREVIEW — Install: npm install -g ./vektor-slipstream-1.7.8-preview.tgz
Upgrade from v1.7.7 or v1.7.6 at any time. Download →

---

v1.7.7
PREVIEW
12 Jul 2026 — Sentinel Proactive Memory Injection · Faraday Independent Watchdog · Tamper-Evident Audit Log · Supersession Fix · Early Access
Sentinel — Selective Proactive Memory Injection
New module wired into both DESK and JOT chat paths. Adds a proactive push on top of VEKTOR’s existing pull-based recall: on each turn, before the LLM call, checks whether a stored memory is relevant enough to the current message to surface unprompted. A live task-completion aid — does not affect LongMemEval/LoCoMo-style benchmark scores, which are pull-based QA. Three layers: a core gate with per-agent adaptive threshold and cooldown, integrity gating that re-verifies the candidate against the DB right before injection (follows the supersession chain to its active tip, rejects expired rows), and an opt-in self-questioning pass that judges relevance with one extra LLM call. Counterfactual threshold calibration available via CLI (node vektor-sentinel.js calibrate|feedback|stats).

Model Catalog Refresh
Gemini updated to Gemini 3.5 Flash. xAI updated to Grok 4.5. OpenAI additions Luna, Terra, and Sol are now live.

Bug Fixes — Supersession & Data Integrity
Fixed the root cause of supersession never firing in production: three stacked score-scale bugs (Layer 6 reranking, RRF fusion, cross-encoder reranking) each overwrote the recall score with a progressively less-comparable value before the dedup threshold check ever saw it. The true raw cosine similarity is now captured at the point it’s computed and threaded through every later stage. Also fixed a NULL id bug affecting every fresh memory on Windows (an explicit id is now generated before insert, rather than relying on SQLite’s unrelated internal rowid), and fixed supersession silently reporting success even when the LLM-verified conflict-resolution gate had actually declined the write.

Faraday — Independent Integrity Watchdog & Tamper-Evident Audit Log
New standalone watchdog process runs continuously via OS task scheduling, independent of any active Faraday MCP session, watching AI-assistant MCP configuration files across seven clients plus Faraday’s own core enforcement files. Every gate event now also carries a chained hash linking it to the previous event, so altering, deleting, or reordering a historical entry breaks every hash after it, detectably.

Other Fixes
Faraday corpus auto-update now actually extracts the verified archive. Faraday status display no longer shows a corrupted glyph for session state. JOT flashcards copy button and collab-panel CSS fixed. Packaging cleaned up further (missing files added to the npm allowlist), and a long-standing display-glyph corruption pattern was cleared from 16 additional files across the SDK.

PREVIEW — Install: npm install -g ./vektor-slipstream-1.7.7-preview.tgz
Upgrade from v1.7.6 at any time. Download →

---

<div align="center">

**[vektormemory.com](https://vektormemory.com) · [Docs](https://vektormemory.com/docs) · [hello@vektormemory.com](mailto:hello@vektormemory.com)**

*Stop prompting like it's 2024. Build agents that remember.*

</div>
