

# vektor-slipstream

Hardware-accelerated persistent memory for AI agents. Local-first. No cloud. One-time payment.

[![npm](https://img.shields.io/npm/v/vektor-slipstream)](https://www.npmjs.com/package/vektor-slipstream)
[![downloads](https://img.shields.io/npm/dw/vektor-slipstream)](https://www.npmjs.com/package/vektor-slipstream)
[![license](https://img.shields.io/badge/license-Commercial-blue)](https://vektormemory.com/product#pricing)
<img width="1864" height="579" alt="banner 1" src="https://github.com/user-attachments/assets/31026638-7d0f-40eb-942b-ad401e69c0cb" />

<img width="1918" height="944" alt="Vektor Graph" src="https://github.com/user-attachments/assets/9b27992d-9d20-4ff3-b2ba-2e228a248f8b" />
<img width="1919" height="942" alt="Vektor Health" src="https://github.com/user-attachments/assets/cf195a81-1f9a-4151-80d1-e7611877d03f" />
<img width="1919" height="941" alt="Vektor Config" src="https://github.com/user-attachments/assets/faa3ccb2-844e-45c2-821e-78ce2177a397" />


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

// Recall by semantic similarity — avg 8ms, fully local
const results = await memory.recall('coding preferences', 5);
// → [{ content, score, id }]

// Traverse the graph
const graph = await memory.graph('TypeScript', { hops: 2 });

// What changed in 7 days?
const delta = await memory.delta('project decisions', 7);

// Morning briefing
const brief = await memory.briefing();
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
<img width="1086" height="707" alt="Vektor Cli" src="https://github.com/user-attachments/assets/03654ee5-4d87-4882-b7e9-8ab788275a45" />

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
<img width="1084" height="578" alt="Vektor Cli-2" src="https://github.com/user-attachments/assets/eac22042-5d57-40b1-aa92-e4f0bcfcc96d" />
---

## Claude Desktop Extension (DXT)

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

Download the latest `.dxt` from [vektormemory.com/docs/dxt](https://vektormemory.com/docs/dxt).

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

All 28 tools are available in Claude Code via this config.

---

## What's Included

### Memory Core (MAGMA)

- 4-layer associative graph — semantic, causal, temporal, entity
- AUDN curation loop — zero contradictions, zero duplicates
- REM dream cycle — up to 50:1 compression
- Sub-20ms recall — HNSW index, local SQLite
- Local ONNX embeddings — $0 embedding cost, no API key required

### Integrations

- **Claude Desktop** — DXT extension, 28 tools, auto-memory system prompt
- **Claude Code** — MCP server, all 28 tools
- **CLI** — `chat`, `remember`, `ask`, `agent` commands
- **LangChain** — v1 + v2 adapter included
- **OpenAI Agents SDK** — drop-in integration
- **Gemini · Groq · Ollama** — provider agnostic

---

## Performance

| Metric | Value |
|---|---|
| Recall latency | ~8ms avg (local SQLite) |
| Embedding cost | $0 — fully local ONNX |
| Embedding latency | ~10ms GPU / ~25ms CPU |
| First run | ~2 min (downloads ~25MB model once) |
| Subsequent boots | <100ms |

## Hardware Auto-Detection

Zero config. VEKTOR detects and uses the best available accelerator:

- **NVIDIA CUDA** — GPU acceleration
- **Apple Silicon** — CoreML
- **CPU** — optimised fallback, works everywhere

---

## Licence

Commercial licence. One-time payment of $159. Activates on up to 3 machines.
Manage at [polar.sh](https://polar.sh).

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
