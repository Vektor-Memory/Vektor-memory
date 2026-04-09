# vektor-slipstream

<img width="1918" height="944" alt="Vektor Graph" src="https://github.com/user-attachments/assets/e59d16e0-a1de-4f82-a21c-9a1fed09bafc" />
<img width="1919" height="942" alt="Vektor Health" src="https://github.com/user-attachments/assets/100906f3-828e-4f32-b2e4-ee59fb9cf9db" />
<img width="1919" height="941" alt="Vektor Config" src="https://github.com/user-attachments/assets/474960b8-8d68-4c5e-a500-feb0d7932480" />
<img width="1086" height="707" alt="Vektor Cli" src="https://github.com/user-attachments/assets/401e42f6-4ef0-4b46-adda-7efbdb9c26f0" />
<img width="1084" height="578" alt="Vektor Cli-2" src="https://github.com/user-attachments/assets/e3cea149-82f2-4dee-ac8a-9e29e2a283fd" />

The associative memory layer for AI agents. Local-first. No cloud. One-time payment.

[![npm](https://img.shields.io/npm/v/vektor-slipstream)](https://www.npmjs.com/package/vektor-slipstream)
[![downloads](https://img.shields.io/npm/dw/vektor-slipstream)](https://www.npmjs.com/package/vektor-slipstream)
[![license](https://img.shields.io/badge/license-Commercial-blue)](https://vektormemory.com/product#pricing)

## Install

```bash
npm install vektor-slipstream
npx vektor setup
```

## Overview

VEKTOR Slipstream replaces flat vector storage with a structured, multi-layered memory architecture. Standard RAG systems retrieve the past — VEKTOR reasons about it. Every memory is curated, compressed, and graph-indexed across four associative layers, giving AI agents context that persists, evolves, and improves over time.

> Memory stores what you put in. VEKTOR understands why it matters.

### Architecture

```
Raw Input → AUDN Curation → MAGMA Graph → Indexed Recall
```

---

## MAGMA — Multi-Graph Agentic Memory Architecture

Four associative graph layers persist in local SQLite across all session resets:

| Layer | Type | Function |
|---|---|---|
| Semantic | Similarity | Finds related concepts across full context history |
| Causal | Cause → Effect | Understands why things happened, not just what |
| Temporal | Before → After | Tracks how knowledge evolves and decays over time |
| Entity | Co-occurrence | Connects people, projects, and events automatically |

---

## AUDN — Autonomous Curation Loop

Every memory is evaluated before storage. Four possible outcomes:

- **ADD** — New information stored as a graph node
- **UPDATE** — Existing memory updated with new context
- **DELETE** — Contradictions removed from the graph
- **NO_OP** — Information already known; no duplicate created

Zero contradictions. Zero duplicates. The graph stays consistent without manual management.

---

## REM Dream Cycle

A 7-phase background compression process that runs while your agent is idle. Synthesises up to 50 raw memory fragments into a single core insight per cluster.

```
50 raw fragments → 7-phase REM cycle → 1 core insight (~98% noise reduction)
```

---

## Performance

| Metric | Value |
|---|---|
| Recall latency | ~8ms avg (local SQLite + HNSW index) |
| Embedding cost | $0 — fully local ONNX |
| Embedding latency | ~10ms GPU / ~25ms CPU |
| Bundle size | ~23MB (ONNX bundled) |
| First run | ~2 min (downloads ~25MB model once) |
| Subsequent boots | <100ms |

## Hardware Auto-Detection

Zero config. VEKTOR detects and uses the best available accelerator:

- **NVIDIA CUDA** — GPU acceleration
- **Apple Silicon** — CoreML
- **CPU** — optimised fallback, works everywhere

---

## Quick Start

```js
const { createMemory } = require('vektor-slipstream');

const memory = await createMemory({
  agentId:    'my-agent',
  licenceKey: process.env.VEKTOR_LICENCE_KEY,
});

// Store a memory
await memory.remember('User prefers TypeScript over JavaScript');

// Recall by semantic similarity — avg 8ms, fully local
const results = await memory.recall('coding preferences', 5);
// → [{ id, content, summary, importance, score }]

// Traverse the graph
const graph = await memory.graph('TypeScript', { hops: 2 });

// What changed in 7 days?
const delta = await memory.delta('project decisions', 7);

// Morning briefing
const brief = await memory.briefing();
```

---

## API Reference

### `createMemory(options)`

Initialises the memory engine. Downloads the ONNX embedding model on first run (~25MB, one time only).

```js
const memory = await createMemory({
  agentId:    'my-agent',               // Required — unique agent identifier
  licenceKey: process.env.VEKTOR_LICENCE_KEY,
  provider:   'claude',                 // AI provider for briefing/delta synthesis
  apiKey:     process.env.ANTHROPIC_API_KEY,
  dbPath:     './my-agent.db',          // Optional — custom SQLite path
  namespace:  'project-atlas',          // Optional — scope reads/writes
});
```

---

### `memory.remember(text)`

Runs the AUDN loop: embed → evaluate → ADD / UPDATE / DELETE / NO_OP.

```js
await memory.remember('User is migrating from REST to GraphQL');
```

---

### `memory.recall(query, options?)`

Semantic recall via HNSW cosine similarity across the full associative graph. Returns ranked results.

```js
const results = await memory.recall('API architecture decisions');
// → [{ id, content, summary, importance, score }]
```

---

### `memory.graph(concept, options?)`

Traverses the associative graph from a seed concept. Returns connected nodes across all four layers.

```js
const graph = await memory.graph('GraphQL', { hops: 2 });
```

---

### `memory.delta(topic, days)`

Returns what changed on a topic over a given time window.

```js
const delta = await memory.delta('infrastructure decisions', 30);
```

---

### `memory.briefing(options?)`

Generates an AI-synthesised briefing from recent memory activity. Supports scoped date filtering.

```js
await memory.briefing();
await memory.briefing({ since: '7d' });
await memory.briefing({ since: '12h', minImportance: 0.7 });
await memory.briefing({ since: '2026-01-01', raw: true });
```

---

### `memory.dream()`

Manually triggers the REM compression cycle. Runs automatically in the background; call explicitly for on-demand compression.

```js
await memory.dream();
```

---

### `memory.forget(id)`

Hard-deletes a memory and cascades to all graph edges. Throws if memory is pinned — must unpin first.

```js
await memory.forget('mem_abc123');
// → { deleted: true, edgesRemoved: 4 }
```

---

### `memory.forgetWhere(query, opts?)`

Semantic bulk-delete. Preview with `dryRun: true` before committing.

```js
await memory.forgetWhere('Project Atlas', { dryRun: true });
await memory.forgetWhere('Project Atlas', { minScore: 0.9, limit: 5 });
```

---

### `memory.pin(id)` / `memory.unpin(id)` / `memory.listPinned()`

Mark memories as permanent — the REM cycle will never compress or delete them.

```js
const { id } = await memory.remember('User is allergic to peanuts');
await memory.pin(id);
await memory.listPinned(); // → all pinned memories
```

---

### `memory.inspect()`

Full diagnostic snapshot — no more raw SQLite queries to debug state.

```js
const state = memory.inspect();
state.counts          // → { memories: 247, pinned: 3, edges: 7180 }
state.rem             // → { totalDreams: 11, compressionRatio: '0.06' }
state.graph.topNodes  // → 5 most-connected memories
```

---

### `memory.auditLog(opts?)` / `memory.auditStats()`

Full AUDN decision history. Nothing disappears silently.

```js
memory.auditLog({ action: 'DELETE', since: '7d' });
// → [{ action, memory_id, content, reason, similarity, ran_at }]
```

---

### `memory.export()` / `memory.import(bundle, opts?)`

Full graph serialisation with checksum integrity.

```js
const bundle = memory.export();
fs.writeFileSync('backup.vektor.json', JSON.stringify(bundle));

memory.import(bundle);
// → { imported: 244, skipped: 3, edgesAdded: 7100, edgesSkipped: 2 }

memory.import(bundle, { dryRun: true });    // preview
memory.import(bundle, { mode: 'replace' }); // wipe and restore
```

---

### Namespace Support

Scope all reads/writes to prevent project bleed.

```js
const memory = await createMemory({
  agentId:   'my-agent',
  namespace: 'project-atlas',
});

memory.listNamespaces();
// → [{ namespace: 'project-atlas', memories: 18 }, ...]
```

---

### TypeScript Support

Full `.d.ts` declarations for all public API methods.

```json
// tsconfig.json
{ "types": ["vektor-slipstream"] }
```

---

### Structured Error Codes

```js
import { VektorError, ERR } from 'vektor-slipstream/errors';

try {
  await memory.remember('...');
} catch (e) {
  if (e instanceof VektorError) {
    switch (e.code) {
      case ERR.LICENCE_INVALID: // handle
      case ERR.EMBED_FAILED:    // retry
    }
  }
}
```

---

## CLI Chat — Persistent Memory Terminal

Chat with any LLM with full memory across every session. Zero configuration.

```bash
npx vektor chat                          # start chat (auto-detects Ollama)
npx vektor chat --provider claude        # use Anthropic Claude
npx vektor chat --provider groq --model llama-3.3-70b-versatile
npx vektor chat --provider gemini
npx vektor chat --provider openai
```

### Providers

| Provider | Details |
|---|---|
| `ollama` | Default — free, local, no API key. Auto-detects best installed model. |
| `claude` | Anthropic Claude — set `ANTHROPIC_API_KEY` |
| `openai` | OpenAI GPT — set `OPENAI_API_KEY` |
| `groq` | Groq LLaMA — set `GROQ_API_KEY` (free tier available) |
| `gemini` | Google Gemini — set `GEMINI_API_KEY` (key pooling across up to 9 keys — zero rate-limit downtime) |

Set a permanent default:
```bash
# Windows
$env:VEKTOR_PROVIDER = "claude"

# macOS/Linux
export VEKTOR_PROVIDER=claude
```

### In-chat slash commands

Type `/` to see available commands with autocomplete. Tab to select, arrow keys to navigate.

| Command | Action |
|---|---|
| `/recall <query>` | Search MAGMA memory mid-conversation |
| `/remember <text>` | Store a fact manually |
| `/briefing` | Generate memory briefing inline |
| `/model <n>` | Switch model mid-session |
| `/export` | Save session to Markdown |
| `/new` | New conversation (memory persists) |
| `/stats` | Show memory node count, edges, pinned |
| `/exit` | Exit chat (Ctrl+C also works) |

### One-liner commands

```bash
# Store a fact
npx vektor remember "I prefer TypeScript over JavaScript"
npx vektor remember "deadline is Friday" --importance 5

# Pipe support
cat meeting-notes.txt | npx vektor remember

# One-shot recall + LLM answer
npx vektor ask "what stack am I using?"
npx vektor ask "what did we decide about the database?"

# Autonomous goal executor
npx vektor agent "summarise everything I know about project Alpha"
npx vektor agent "research AI memory tools" --steps 15 --provider groq
```

### Ollama auto-detection

VEKTOR queries `http://localhost:11434/api/tags` and picks the best available model:
`qwen3` → `qwen2` → `llama` → `mistral` → first available.

Override:
```bash
$env:OLLAMA_MODEL = "qwen3.5:4b"
export OLLAMA_MODEL=qwen3.5:4b
```

---

## All CLI Commands

```bash
npx vektor setup      # First-run wizard — licence, hardware, integrations
npx vektor activate   # Activate licence key on this machine
npx vektor test       # Test memory engine with progress bar
npx vektor status     # System health check
npx vektor mcp        # Start Claude Desktop MCP server
npx vektor tui        # Interactive memory browser
npx vektor rem        # Run REM dream cycle
npx vektor briefing   # Generate AI memory summary
npx vektor chat       # Persistent memory chat (all LLMs)
npx vektor remember   # Store a fact
npx vektor ask        # Query memory + LLM answer
npx vektor agent      # Autonomous goal executor
npx vektor watch      # Watch a directory and store file changes to memory
npx vektor sync       # Encrypted P2P memory sync (no cloud)
npx vektor swarm      # Multi-agent coordination
npx vektor help       # All commands
```

---

## Advanced CLI

### `npx vektor watch [path]`

Watches a directory recursively. On each file change, generates a concise LLM summary and stores it in MAGMA.

```bash
npx vektor watch                         # watch cwd
npx vektor watch src/ --ext ts,tsx,css   # watch specific extensions
npx vektor watch --no-llm                # heuristic summaries (faster, no API)
npx vektor watch --provider claude       # use Claude for summaries
```

### `npx vektor agent "goal" --tools`

Autonomous agent with web search, file system, and code execution.

```bash
npx vektor agent "Summarise all .md files in this project"
npx vektor agent "Find and fix the bug in server.js" --tools fs,code
npx vektor agent "Research top 5 Node.js ORMs" --tools web,memory
npx vektor agent "Continue previous task" --continue
npx vektor agent "Big task" --tools --max-steps 30 --provider claude
```

Available tools: `web` (search + fetch), `fs` (read/write/list), `code` (sandboxed execution), `memory` (always included).

Cross-session state is saved to `~/.vektor-agent-state.json`. Use `--continue` to resume.

### `npx vektor sync`

Encrypted P2P memory sync. No cloud, no relay.

```bash
# Machine A:
npx vektor sync --host
# → prints: npx vektor sync --connect 192.168.1.5 --pin 847291

# Machine B:
npx vektor sync --connect 192.168.1.5 --pin 847291
```

Uses ECDH (P-256) key agreement, AES-256-GCM encrypted transport, and PIN-verified HMAC handshake. No data leaves the local network.

### `npx vektor swarm "goal"`

Multi-agent coordination. Orchestrator plans → agents run in parallel → orchestrator synthesises.

```bash
npx vektor swarm "Build a weather CLI app" --agents 3
npx vektor swarm "Research AI trends" --roles researcher,analyst,writer
npx vektor swarm "Audit my codebase" --tools --provider claude
npx vektor swarm "Previous goal" --continue
```

Available roles: `researcher`, `coder`, `reviewer`, `writer`, `analyst`, `generalist`.

---

## Schema Migration

Run after updating from v1.2.x or earlier, or migration runs automatically on startup:

```bash
npx vektor migrate
```

New in v1.3.7+:
- `memories.pinned` — pin protection for REM cycle
- `memories.namespace` — project scoping
- `memories.updated_at` — change tracking
- `audn_log` table — full AUDN decision audit trail
- `rem_log` table — REM cycle run history
- `vektor_meta` table — schema version tracking

---

## Integrations

### Claude Desktop Extension (.dxt)

Install the `.dxt` extension for zero-config memory in every Claude Desktop session.

**Install:** drag `vektor-slipstream.dxt` onto the Claude Desktop Extensions page.

Once installed, Claude automatically:
- Recalls relevant context at session start
- Stores facts and decisions during conversation
- Summarises at session end

All 28 tools are available in Claude Desktop — no configuration needed beyond your licence key.

**User config fields:**

| Field | Purpose |
|---|---|
| `licence_key` | Your Polar licence key (required) |
| `db_path` | Memory DB path (defaults to `~/vektor-slipstream-memory.db`) |
| `project_path` | Default path for `cloak_cortex` project scanning (optional) |

Download: [vektormemory.com/downloads](https://vektormemory.com/downloads)

---

### Claude Code (MCP)

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

All 28 tools are available in Claude Code via this config.

---

### LangChain

Drop-in persistent memory layer. v1 and v2 adapters included.

```js
const { createMemory } = require('vektor-slipstream');
const memory = await createMemory({ agentId: 'langchain-agent', licenceKey });

// Recall relevant context and inject into your chain
const ctx = await memory.recall(userMessage);
// Pass ctx.map(r => r.content) as memory context to your chain
```

---

### OpenAI Agents SDK

Wrap any OpenAI agent loop with persistent memory.

```js
const memory = await createMemory({ agentId: 'openai-agent', licenceKey });
const recalled = await memory.recall(userInput);
const systemPrompt = `Previous context:\n${recalled.map(r => r.content).join('\n')}`;
```

---

### Mistral

`vektor_memoire` HTTP tool — works with Le Chat and Mistral API agents. Local bridge on `localhost:3847`.

```bash
node mistral-setup.js   # Activates the local bridge
```

---

### Gemini / Groq / Ollama

Provider-agnostic. Switch with one config change. Gemini supports key pooling across up to 9 API keys for zero rate-limit downtime.

```js
const memory = await createMemory({
  provider: 'gemini',  // 'openai' | 'groq' | 'ollama' | 'claude'
  apiKey:   process.env.GEMINI_API_KEY,
  agentId:  'my-agent',
  licenceKey,
});
```

---

### Electron / GUI Integration

```js
// Main process:
const { GUIBridge, wireElectron } = require('vektor-gui-bridge.js');
const bridge = new GUIBridge({ provider: 'ollama' });
wireElectron(ipcMain, bridge);

// Renderer (via preload):
window.vektor.dispatch({ cmd: 'chat', payload: { message: 'hello' } });
window.vektor.onOutput(({ cmd, text, type }) => appendToUI(text));
window.vektor.onStream(({ chunk }) => streamToUI(chunk));
window.vektor.onDone(({ cmd }) => setLoadingFalse());
```

Supported commands: `chat`, `remember`, `ask`, `agent`, `watch`, `watch:stop`, `stats`, `briefing`, `recall`, `clear`.

---

## MCP Tools — All 28

### Memory Tools

| Tool | Function |
|---|---|
| `vektor_recall` | Semantic search across MAGMA graph |
| `vektor_store` | Store memory with importance score |
| `vektor_graph` | Traverse associative memory graph |
| `vektor_delta` | See what changed on a topic over time |
| `vektor_briefing` | Generate morning briefing from recent memories |
| `vektor_dream` | Trigger REM compression cycle on demand |

### CLOAK Core

| Tool | Function |
|---|---|
| `cloak_fetch` | Stealth headless browser fetch via Playwright |
| `cloak_fetch_smart` | Checks `llms.txt` first, falls back to stealth browser |
| `cloak_render` | Full CSS/DOM layout sensor |
| `cloak_diff` | Semantic diff of URL since last fetch |
| `cloak_diff_text` | Structural diff between two text blobs |
| `cloak_passport` | AES-256-GCM credential vault (get/set/delete/list) |
| `tokens_saved` | Token efficiency ROI calculator |

### Identity Tools

| Tool | Function |
|---|---|
| `cloak_identity_create` | Create persistent browser fingerprint identity |
| `cloak_identity_use` | Apply saved identity to a fetch call |
| `cloak_identity_list` | List all saved identities with trust summary |

### Behaviour Tools

| Tool | Function |
|---|---|
| `cloak_inject_behaviour` | Human mouse/scroll injection for reCAPTCHA/Cloudflare bypass |
| `cloak_behaviour_stats` | List available patterns and categories |
| `cloak_load_pattern` | Load custom recorded behaviour pattern |
| `cloak_pattern_stats` | Self-improving pattern store tier breakdown |
| `cloak_pattern_list` | List patterns with scores and tier |
| `cloak_pattern_prune` | Remove stale/low-scoring patterns |
| `cloak_pattern_seed` | Seed store with built-in patterns |

### CAPTCHA Tools

| Tool | Function |
|---|---|
| `cloak_detect_captcha` | Detect CAPTCHA type and sitekey |
| `cloak_solve_captcha` | Solve via vision AI (Claude/GPT-4o/2captcha) |

### Compression & Cortex Tools

| Tool | Function |
|---|---|
| `turbo_quant_compress` | PolarQuant vector compression (~75% smaller) |
| `turbo_quant_stats` | Compression ratio and savings stats |
| `cloak_cortex` | Scan project directory into MAGMA entity graph |
| `cloak_cortex_anatomy` | Get cached file anatomy without rescanning |

---

## Cloak — Sovereign Identity Layer

`vektor-slipstream/cloak` provides a bot-resistant headless browser, AES-256-GCM credential vault, layout sensor, and self-improving behaviour pattern system. Available as MCP tools and SDK methods.

```js
const { cloak_passport, cloak_fetch, tokens_saved } = require('vektor-slipstream/cloak');

// Store credentials — machine-bound, AES-256-GCM encrypted
cloak_passport('GITHUB_TOKEN', 'ghp_xxxx');
const token = cloak_passport('GITHUB_TOKEN');

// Stealth headless browser fetch
const { text, tokensSaved } = await cloak_fetch('https://example.com');

// ROI audit per session
const roi = tokens_saved({ raw_tokens: 10000, actual_tokens: 3000 });
// → { reduction_pct: 70, cost_saved_usd: 0.0175, roi_multiple: 2.3 }
```

---

## Products

| Product | Status | Description |
|---|---|---|
| Developer SDK | Available | `npm install vektor-slipstream` — embed persistent memory into any Node.js agent |
| VEKTOR CLI | Available v1.4.6 | Persistent memory terminal — chat, research, autonomous agents |
| Claude Desktop Extension | Available | `.dxt` drag-and-drop install — 28 MCP tools, no config |
| VEKTOR GUI | Q2 2026 | Desktop app — visual memory graph, agent dashboard, swarm control |

All products use the same licence key.

---

## Privacy

VEKTOR operates on a zero-knowledge architecture. Your agent's memory graph — decisions, preferences, strategies — is stored in a local SQLite file on your machine. It never leaves your server. LLM inference queries are processed by your chosen provider per their own privacy policies.

---

## Licence

Commercial licence. One-time payment of $159 USD. Activates on up to 3 machines.
Manage at [polar.sh](https://polar.sh).

Purchase: [vektormemory.com/product#pricing](https://vektormemory.com/product#pricing)  
Docs: [vektormemory.com/docs](https://vektormemory.com/docs)  
Downloads: [vektormemory.com/downloads](https://vektormemory.com/downloads)  
Support: hello@vektormemory.com  
Release announcements: [vektormemory.substack.com](https://vektormemory.substack.com)

Enterprise licences available — contact hello@vektormemory.com

---

## Research

Built on peer-reviewed research:

| Paper | arXiv | Relevance |
|---|---|---|
| [MAGMA: A Multi-Graph-based Agentic Memory Architecture](https://arxiv.org/abs/2601.03236) | 2601.03236 | Four-layer graph type system |
| [EverMemOS: A Self-Organizing Memory OS](https://arxiv.org/abs/2601.02163) | 2601.02163 | REM cycle and memory lifecycle management |
| [HippoRAG](https://arxiv.org/abs/2405.14831) | 2405.14831 | Neurobiologically Inspired Long-Term Memory (NeurIPS 2024) |
| [Mem0: Production-Ready Agent Memory](https://arxiv.org/abs/2504.19413) | 2504.19413 | AUDN curation loop and REM compression |
