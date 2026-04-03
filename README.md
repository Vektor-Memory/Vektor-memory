# vektor-slipstream

Hardware-accelerated persistent memory for AI agents. Local-first. No cloud. One-time payment.

[![npm](https://img.shields.io/npm/v/vektor-slipstream)](https://www.npmjs.com/package/vektor-slipstream)
[![license](https://img.shields.io/badge/license-Commercial-blue)](https://vektormemory.com/product#pricing)

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
const results = await memory.recall('coding preferences');
// → [{ content, score, id }]

// Traverse the graph
const graph = await memory.graph('TypeScript', { hops: 2 });

// What changed in 7 days?
const delta = await memory.delta('project decisions', 7);

// Morning briefing
const brief = await memory.briefing();
```

## CLI
```bash
npx vektor setup       # First-run wizard — licence, hardware, integrations
npx vektor activate    # Activate licence key on this machine
npx vektor test        # Test memory engine with progress bar
npx vektor status      # System health check
npx vektor mcp         # Start Claude Desktop MCP server
npx vektor rem         # Run REM dream cycle
npx vektor help        # All commands
```

## What's Included

### Memory Core (MAGMA)
- 4-layer associative graph — semantic, causal, temporal, entity
- AUDN curation loop — zero contradictions, zero duplicates
- REM dream cycle — 7 phases, up to 50:1 compression
- Sub-20ms recall — HNSW index, local SQLite
- Local ONNX embeddings — $0 embedding cost, no API key required

### Integrations
- **Claude MCP** — `vektor_recall`, `vektor_store`, `vektor_graph`, `vektor_delta`
- **LangChain** — v1 + v2 adapter included
- **OpenAI Agents SDK** — drop-in integration
- **Mistral** — `vektor_memoire` HTTP tool, localhost bridge
- **Gemini · Groq · Ollama** — provider agnostic

### Cloak (Sovereign Identity)
- `cloak_fetch` — stealth headless browser fetch
- `cloak_render` — computed CSS · post-JS DOM sensor
- `cloak_passport` — AES-256-GCM credential vault, machine-bound
- `cloak_diff` — semantic diff since last fetch
- `tokens_saved` — ROI audit per session
```js
const { cloak_passport, cloak_fetch, tokens_saved } = require('vektor-slipstream/cloak');

// Store credentials securely
cloak_passport('GITHUB_TOKEN', 'ghp_xxxx');
const token = cloak_passport('GITHUB_TOKEN');

// Stealth browser fetch
const { text, tokensSaved } = await cloak_fetch('https://example.com');

// ROI audit
const roi = tokens_saved({ raw_tokens: 10000, actual_tokens: 3000 });
// → { reduction_pct: 70, cost_saved_usd: 0.0175, roi_multiple: 2.3 }
```

## Performance

| Metric | Value |
|--------|-------|
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

## Licence

Commercial licence. One-time payment of $159.  
Activates on up to 3 machines. Manage at [polar.sh](https://polar.sh).

Purchase: [vektormemory.com/product#pricing](https://vektormemory.com/product#pricing)  
Docs: [vektormemory.com/docs](https://vektormemory.com/docs)  
Support: hello@vektormemory.com

## Research

Built on peer-reviewed research:
- [MAGMA (arxiv:2601.03236)](https://arxiv.org/abs/2601.03236) — Multi-Graph Agentic Memory Architecture
- [EverMemOS (arxiv:2601.02163)](https://arxiv.org/abs/2601.02162) — Self-Organizing Memory OS
- [Mem0 (arxiv:2504.19413)](https://arxiv.org/abs/2504.19413) — Production-Ready Agent Memory
