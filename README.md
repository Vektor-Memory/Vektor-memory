# vektor-slipstream

Hardware-accelerated persistent memory for AI agents. Local-first. No cloud. One-time payment.

[![npm](https://img.shields.io/npm/v/vektor-slipstream)](https://www.npmjs.com/package/vektor-slipstream)
[![downloads](https://img.shields.io/npm/dw/vektor-slipstream)](https://www.npmjs.com/package/vektor-slipstream)
[![license](https://img.shields.io/badge/license-Commercial-blue)](https://vektormemory.com/product#pricing)

**66.9% on LoCoMo benchmark (adjusted). Under 1ms retrieval. Zero cloud dependency.**

---

## Install

```bash
npm install vektor-slipstream
npx vektor setup
```

## Quick Start

```js
const { createMemory } = require('vektor-slipstream');

const memory = await createMemory({
  agentId:    'my-agent',
  licenceKey: process.env.VEKTOR_LICENCE_KEY,
});

// Store a memory
await memory.remember('User prefers TypeScript over JavaScript');

// Recall by semantic similarity — sub-1ms, fully local
const results = await memory.recall('coding preferences', 5);
// → [{ content, score, id }]

// Traverse the MAGMA graph
const graph = await memory.graph('TypeScript', { hops: 2 });

// What changed in 7 days?
const delta = await memory.delta('project decisions', 7);

// Morning briefing
const brief = await memory.briefing();

// Graph stats
const stats = memory.graphStats();
// → { nodes, edges, entities }
```

---

## What's New in v1.5.0

**Retrieval pipeline rebuilt from scratch.**

- bge-small-en-v1.5 bi-encoder + ms-marco cross-encoder reranker (spec-decode architecture)
- BM25 + Porter-stemmed BM25 + named entity injection, fused via RRF
- MAGMA graph layer — co-occurrence and temporal edges between entities in SQLite
- Persistent entity index (`vektor_entities`) for guaranteed named-entity recall
- Foresight extraction — future-tense statements stored for temporal queries
- Question type classifier — routes single-hop vs multi-hop to optimal retrieval path
- ADD-only contradiction detection — conflicting facts survive with timestamps (no silent deletes)
- Agentic sufficiency check — reformulates query if key entities missing from top results

**LoCoMo benchmark results (conv 0, 154 valid questions):**

| Category | Judge Accuracy |
|---|---|
| Multi-hop | 79.1% |
| Adversarial | 70.4% |
| Temporal | 46.2% |
| Single-hop | 51.6% |
| **Adjusted total** | **66.9%** |

#Under 1ms retrieval latency with zero cloud API calls at query time.

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
| `gemini` | Google Gemini — set `GEMINI_API_KEY` |

Set a permanent default:
```bash
# Windows
$env:VEKTOR_PROVIDER = "claude"

# macOS/Linux
export VEKTOR_PROVIDER=claude
```

### In-chat commands

Type `/` to see available commands with autocomplete. Tab to select, arrow keys to navigate.

| Command | Action |
|---|---|
| `/recall <query>` | Search MAGMA memory mid-conversation |
| `/stats` | Show memory node count, edges, pinned |
| `/briefing` | Generate memory briefing inline |
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
npx vektor rem        # Run REM dream cycle
npx vektor chat       # Persistent memory chat (all LLMs)
npx vektor remember   # Store a fact
npx vektor ask        # Query memory + LLM answer
npx vektor agent      # Autonomous goal executor
npx vektor help       # All commands
```

---

## Claude Desktop Extension (DXT)

Install the `.dxt` extension for zero-config memory in every Claude Desktop session.

**Install:** drag `vektor-slipstream.dxt` onto the Claude Desktop Extensions page.

Once installed, Claude automatically:
- Recalls relevant context at session start
- Stores facts and decisions during conversation
- Summarises at session end

All 44 tools are available in Claude Desktop — no configuration needed beyond your licence key.

**User config fields:**

| Field | Purpose |
|---|---|
| `licence_key` | Your Polar licence key (required) |
| `db_path` | Memory DB path (defaults to `~/vektor-slipstream-memory.db`) |
| `project_path` | Default path for `cloak_cortex` project scanning (optional) |

Download the latest `.dxt` from [vektormemory.com/docs/dxt](https://vektormemory.com/docs/dxt).

---

## MCP Tools — All 44

### Memory Tools

| Tool | Function |
|---|---|
| `vektor_recall` | Semantic + BM25 + graph search across MAGMA memory |
| `vektor_recall_rrf` | BM25+RRF dual-channel recall with cross-encoder rerank |
| `vektor_store` | Store memory with importance score |
| `vektor_ingest` | Batch ingest conversation turns with session date |
| `vektor_graph` | Traverse associative memory graph |
| `vektor_delta` | See what changed on a topic over time |
| `vektor_briefing` | Generate morning briefing from recent memories |
| `vektor_stats` | Memory DB stats — node count, edges, entities |
| `vektor_graph_stats` | MAGMA graph node/edge/entity counts |
| `vektor_timeline` | Query memories by date range |

### CLOAK Core

| Tool | Function |
|---|---|
| `cloak_fetch` | Stealth headless browser fetch via Playwright |
| `cloak_fetch_smart` | Checks `llms.txt` first, falls back to stealth browser |
| `cloak_render` | Full CSS/DOM layout sensor |
| `cloak_diff` | Semantic diff of URL since last fetch |
| `cloak_diff_text` | Structural diff between two text blobs |
| `cloak_passport` | AES-256-GCM credential vault (get/set/delete/list) |
| `cloak_ssh_exec` | Execute commands on remote server via SSH |
| `cloak_ssh_upload` | Upload file to remote server via SFTP |
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

### Compression and Cortex Tools

| Tool | Function |
|---|---|
| `turbo_quant_compress` | PolarQuant vector compression (~75% smaller) |
| `turbo_quant_stats` | Compression ratio and savings stats |
| `cloak_cortex` | Scan project directory into MAGMA entity graph |
| `cloak_cortex_anatomy` | Get cached file anatomy without rescanning |

### Multimodal Tools

| Tool | Function |
|---|---|
| `vektor_text` | Text generation across providers (OpenAI/Claude/Groq/Gemini/NVIDIA NIM) |
| `vektor_image` | Image generation (DALL-E, Stability, NVIDIA) |
| `vektor_vision` | Image understanding and analysis |
| `vektor_speech` | Text-to-speech and transcription |
| `vektor_search` | Web search with memory integration |
| `vektor_providers` | List available multimodal providers and status |

### Agent Tools

| Tool | Function |
|---|---|
| `vektor_agent_run` | Run autonomous goal executor with memory |
| `vektor_swarm` | Launch multi-agent swarm task |
| `vektor_watch` | File system watcher — auto-ingest on change |

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

All 44 tools are available in Claude Code via this config.

---

## What's Included

### Memory Core (MAGMA)

- 4-layer associative graph — semantic, causal, temporal, entity
- MAGMA graph bridge — co-occurrence and temporal edges in SQLite (`vektor-magma-bridge.js`)
- bge-small-en-v1.5 bi-encoder + ms-marco cross-encoder reranker (`vektor-embedder.js`)
- BM25 + stemmed BM25 + RRF fusion — keyword + semantic dual-channel recall
- Persistent entity index — guaranteed named-entity retrieval
- Foresight extraction — future-tense statements stored with temporal metadata
- ADD-only contradiction detection — full history preserved, no silent overwrites
- AUDN curation loop — zero contradictions, zero duplicates
- REM dream cycle — up to 50:1 compression
- Sub-1ms recall — local SQLite, no network required
- Local ONNX embeddings — $0 embedding cost, no API key required

### Integrations

- **Claude Desktop** — DXT extension, 44 tools, auto-memory system prompt
- **Claude Code** — MCP server, all 44 tools
- **CLI** — `chat`, `remember`, `ask`, `agent` commands
- **LangChain** — v1 + v2 adapter included
- **OpenAI Agents SDK** — drop-in integration
- **Gemini · Groq · Ollama · NVIDIA NIM** — provider agnostic

---

## Performance

| Metric | Value |
|---|---|
| Recall latency | sub-1ms (local SQLite + ONNX) |
| Embedding cost | $0 — fully local ONNX |
| Embedding latency | ~10ms GPU / ~25ms CPU |
| LoCoMo benchmark | 66.9% adjusted judge accuracy |
| vs Mem0 | beats Mem0 old algorithm (62.47%) |
| First run | ~2 min (downloads ~25MB model once) |
| Subsequent boots | <100ms |

## Hardware Auto-Detection

Zero config. VEKTOR detects and uses the best available accelerator:

- **NVIDIA CUDA** — GPU acceleration
- **Apple Silicon** — CoreML
- **CPU** — optimised fallback, works everywhere

---

## Environment Variables

| Variable | Default | Purpose |
|---|---|---|
| `VEKTOR_SUMMARIZE` | `false` | Enable LLM session summarization on ingest |
| `VEKTOR_TRIPLES` | `true` | Enable batch triple extraction on ingest |
| `VEKTOR_FORESIGHT` | `true` | Extract future-tense foresight signals |
| `VEKTOR_TEMPORAL` | `true` | Enable temporal index and date boosting |
| `VEKTOR_CONTRADICT` | `true` | Enable ADD-only contradiction detection |
| `VEKTOR_DEBUG` | — | Enable verbose retrieval debug output |
| `VEKTOR_MODEL` | `Xenova/bge-small-en-v1.5` | Swap embedding model (e.g. bge-large for higher accuracy) |
| `VEKTOR_RERANK` | `true` | Enable cross-encoder reranking |

---

## Licence

Commercial licence granted. 
Monthly fee - all updates included

Solo $9/mo → 3 licences
Team $35/mo →  5 licences
Studio $59/mo →  10 licences
Enterprise $99/mo →  25 licences

Purchase: [vektormemory.com/product#pricing](https://vektormemory.com/product#pricing)
Docs: [vektormemory.com/docs](https://vektormemory.com/docs)
Support: hello@vektormemory.com

---

## Research

Built on peer-reviewed research:

- [MAGMA (arxiv:2601.03236)](https://arxiv.org/abs/2601.03236) — Multi-Graph Agentic Memory Architecture
- [EverMemOS (arxiv:2601.02163)](https://arxiv.org/abs/2601.02163) — Self-Organizing Memory OS
- [HippoRAG (arxiv:2405.14831)](https://arxiv.org/abs/2405.14831) — Neurobiologically Inspired Long-Term Memory (NeurIPS 2024)
- [Mem0 (arxiv:2504.19413)](https://arxiv.org/abs/2504.19413) — Production-Ready Agent Memory
- [LoCoMo Benchmark](https://arxiv.org/abs/2402.17753) — Long-Context Conversational Memory evaluation
