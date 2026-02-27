# Vektor-memory# VEKTOR — Agentic Memory OS

**Stop giving your agents data. Give them a history.**

```bash
npm install vektor-memory
```

```javascript
const VektorMemory = require('vektor-memory');

const memory = new VektorMemory({
  dbPath:  './my-agent.db',
  llm:     'groq',
  apiKey:  process.env.GROQ_API_KEY,
});

await memory.write('agent-1', 'BTC dropped 8% today. I accumulated.');
const ctx = await memory.recall('agent-1', 'what should I do about BTC?');

// Inject ctx.systemPrompt into your LLM call — done.
```

---

## What It Does

Most agent memory is a flat JSON list. Your agent remembers *what* happened but not *why* things connect.

VEKTOR gives every agent four simultaneous memory layers:

| Layer | What it does |
|-------|-------------|
| **Semantic graph** | Connects memories by meaning — finds relevant context even without keyword matches |
| **Temporal graph** | Tracks what happened before and after — agents understand sequences |
| **Causal graph** | Maps cause→effect chains — agents learn from outcomes |
| **Entity graph** | Indexes people, assets, and concepts across all memories |

Plus three tiers of memory lifecycle (raw → consolidated scenes → always-in-context core blocks), AUDN deduplication so agents never re-store the same thought twice, and a self-editing API so agents manage their own memory.

All of it runs on **SQLite. Zero cloud. Zero new services. Zero API cost for embeddings.**

---

## Install

```bash
npm install vektor-memory better-sqlite3 sqlite-vec @xenova/transformers
```

The first time you embed, VEKTOR downloads the `all-MiniLM-L6-v2` model (~25MB) locally. After that, every embed is ~50ms on your own hardware.

---

## Quick Start

### Any agent, any LLM

```javascript
const VektorMemory = require('vektor-memory');

// With Groq
const memory = new VektorMemory({
  dbPath: './agent.db',
  llm:    'groq',
  apiKey: process.env.GROQ_API_KEY,
});

// With OpenAI
const memory = new VektorMemory({
  dbPath: './agent.db',
  llm:    'openai',
  apiKey: process.env.OPENAI_API_KEY,
});

// With Ollama (fully local, zero API cost)
const memory = new VektorMemory({
  dbPath: './agent.db',
  llm:    'ollama',
  model:  'llama3',
});

// Without any LLM (write/recall only, no scene consolidation)
const memory = new VektorMemory({ dbPath: './agent.db' });
```

### Write a memory

```javascript
await memory.write('agent-1', 'The user prefers concise answers.');
await memory.write('agent-1', 'User asked about BTC three times this week.', {
  importance: 0.8,
  source: 'heartbeat',
  tags: ['crypto', 'user-preference'],
});
```

### Recall context

```javascript
const ctx = await memory.recall('agent-1', 'What does the user want?');
console.log(ctx.systemPrompt);
// → [CORE:PERSONA] I am agent-1...
// → [SCENE:PREFERENCES] User prefers short responses and focuses on crypto...
// → [SEM:0.94] The user prefers concise answers.
// → [SEM:0.87] User asked about BTC three times this week.
// → [CAUSAL] Short answers led to higher engagement
```

Inject `ctx.systemPrompt` directly into your agent's system prompt.

### Set core memory blocks

```javascript
// Core blocks are always injected into every recall — never forgotten
memory.seedCoreBlocks('agent-1', {
  persona: 'I am a trading assistant. I watch markets and suggest entries.',
  human:   'David trades BTC with a $10 DCA. His stop-loss is 2%.',
  world:   'Current market: BTC dominance rising. Fear index: 45.',
});
```

### Get stats

```javascript
const stats = memory.stats('agent-1');
// {
//   cells: 247,
//   scenes: 12,
//   graphs: { semantic: 891, causal: 203, entities: 44 },
//   audn: [{ decision: 'ADD', n: 241 }, { decision: 'NOOP', n: 6 }]
// }
```

---

## Full API

### `new VektorMemory(options)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `dbPath` | string | `./vektor-memory.db` | SQLite database file path |
| `llm` | string | `'none'` | LLM provider: `'groq'` \| `'openai'` \| `'ollama'` \| `'none'` |
| `apiKey` | string | `null` | API key for your LLM provider |
| `model` | string | provider default | Model name override |
| `embedMode` | string | `'local'` | `'local'` (free, on-device) \| `'api'` (OpenAI embeddings) |
| `audn` | string | `'conservative'` | Dedup aggressiveness: `'conservative'` \| `'balanced'` \| `'aggressive'` |
| `graphs` | string[] | all four | Which MAGMA graphs to activate |
| `verbose` | boolean | `false` | Log debug output |

### `memory.write(agentId, content, [meta])`
Write a memory. AUDN deduplication runs automatically.
- Returns `{ cellId, decision: 'ADD'|'NOOP', similarity }`

### `memory.recall(agentId, [query], [options])`
Recall context enriched with vector search and graph traversal.
- Returns `{ systemPrompt, memoryCount, sceneCount, graphEdges }`

### `memory.setCoreBlock(agentId, blockType, content)`
Set or update a core memory block (always injected into recall).

### `memory.seedCoreBlocks(agentId, { persona, human, world })`
Seed an agent with default core blocks.

### `memory.stats(agentId)`
Returns memory statistics for an agent.

### `memory.init()`
Pre-warm the embedding model. Call this at startup to avoid cold-start delay on first write.

---

## Architecture

VEKTOR synthesises four research concepts into one SQLite-native package:

**From MAGMA** (arxiv:2601.03236) — four orthogonal relationship graphs per memory: semantic, temporal, causal, and entity. Every memory is simultaneously indexed four ways.

**From EverMemOS** (arxiv:2601.02163) — three-tier memory lifecycle. Raw memories → consolidated MemScenes (every 20 entries) → core blocks always in context.

**From Mem0** (arxiv:2504.19413) — the AUDN loop. Every incoming memory is checked against existing memories before storage: Add, Update, Delete, or No-op. Agents never re-store what they already know.

**From Letta/MemGPT** — self-editing memory. Core blocks are persistent identity that agents can update. Agents don't just have memory done *to* them — they manage it.

---

## Examples

See [`/examples`](./examples) for complete working agents:

- [`groq-agent.js`](./examples/groq-agent.js) — Trading agent with market memory
- [`openai-agent.js`](./examples/openai-agent.js) — Customer support agent with user preferences  
- [`ollama-agent.js`](./examples/ollama-agent.js) — Fully local agent, zero API cost

---

## Why not Mem0 / Zep / Letta?

Those are excellent tools. They're also SaaS products with cloud dependencies, API keys, and pricing tiers.

VEKTOR is for developers who:
- Already have an agent stack and want memory that drops in
- Can't send memory data to third-party cloud services
- Want to understand and own their memory implementation
- Are running on a single server or edge device

One file. One DB. No cloud. No surprises.

---

## Licence

# VEKTOR COMMERCIAL LICENCE v1.0

Copyright (c) 2026 Vektor Memory. All rights reserved.

## Grant of Licence

Upon purchase, you ("the Licensee") are granted a **non-exclusive, non-transferable** 
licence to use VEKTOR Memory in accordance with the terms below.

## You MAY:

- Use VEKTOR in unlimited personal and commercial projects
- Modify the source code for your own internal use
- Deploy VEKTOR on any number of servers you own or control
- Use VEKTOR to build and sell products powered by VEKTOR (the output, not the source)

## You MAY NOT:

- Redistribute, resell, sublicense, or transfer VEKTOR to any third party
- Share your GitHub repo access, licence key, or source files with others
- Publish any portion of the VEKTOR source code publicly (GitHub, npm, Gist, etc.)
- Create a competing memory library based on VEKTOR's source code
- Remove or alter licence headers, copyright notices, or this file
- Use VEKTOR in open-source projects where the source would become public

## Licence Key

Your purchase includes a unique licence key tied to your identity.
This key is logged on first use. Detected redistribution voids your licence
and may result in legal action under applicable copyright law.

## Enforcement

Violation of these terms immediately and automatically terminates your licence.
Vektor Memory reserves the right to pursue damages under applicable copyright law,
including the Digital Millennium Copyright Act (DMCA) and equivalent international laws.

Purchases are non-refundable once GitHub access has been granted.

## Warranty Disclaimer

VEKTOR is provided "as is" without warranty of any kind. Vektor Memory is not liable
for any damages arising from use of this software.

## Contact

Licence enquiries: hello@vektormemory.com

---

## Research Credits

VEKTOR implements concepts from published research. The implementation is original.

- MAGMA: [arxiv.org/abs/2601.03236](https://arxiv.org/abs/2601.03236)
- EverMemOS: [arxiv.org/abs/2601.02163](https://arxiv.org/abs/2601.02163)  
- Mem0: [arxiv.org/abs/2504.19413](https://arxiv.org/abs/2504.19413)
