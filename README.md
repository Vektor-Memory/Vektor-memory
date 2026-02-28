# VEKTOR - Persistent History for AI Agents

## The Problem: Goldfish Memory in AI
Most AI agents today suffer from a goldfish memory effect. Despite having massive context windows, their memory is ephemeral. When a session resets or the context window reaches its limit, the agent starts from zero. 

Standard Retrieval-Augmented Generation (RAG) attempts to solve this with flat vector databases. However, flat RAG treats memory as a disconnected list of text snippets. It can find a specific fact through keyword similarity, but it lacks the ability to understand:

- Temporal Sequence: What happened first, and what followed?
- Causality: Why did a specific action lead to a certain outcome?
- Entity Relationships: How do people, projects, and concepts interconnect over months of interaction?

Without a structured history, an agent cannot develop a persona, learn user preferences, or execute long-term reasoning. It is forced to re-learn its world in every new session.

## The Solution: A Cognitive Memory OS
VEKTOR replaces flat vector storage with a structured, multi-layered memory architecture. Instead of just storing data, VEKTOR builds a persistent history for your agent that survives session restarts and grows more intelligent over time.

By synthesizing published research into a local-first SQLite implementation, VEKTOR provides your agents with a cognitive architecture that maps relationships, not just keywords.

### Video Overview and Demo
[![VEKTOR Memory Technical Overview](https://img.youtube.com/vi/SshM_6U4uX4/maxresdefault.jpg)](https://www.youtube.com/watch?v=SshM_6U4uX4)
---

## Installation

```bash
npm install vektor-memory better-sqlite3 sqlite-vec @xenova/transformers
```

## Quick Start

```javascript
const VektorMemory = require('vektor-memory');

const memory = new VektorMemory({
  dbPath: './my-agent.db',
  llm: 'groq',
  apiKey: process.env.GROQ_API_KEY,
});

await memory.write('agent-1', 'BTC dropped 8% today. I accumulated.');
const ctx = await memory.recall('agent-1', 'what should I do about BTC?');

// Inject ctx.systemPrompt into your LLM call
```

## Core Architecture

VEKTOR manages four concurrent memory graphs to solve the limitations of flat RAG:

- Semantic graph: Locates context through conceptual meaning rather than exact word matches.
- Temporal graph: Maintains a chronological timeline of events to understand sequences.
- Causal graph: Maps cause-and-effect chains, allowing agents to learn from past outcomes.
- Entity graph: A persistent index of people, assets, and concepts across all interactions.

### Memory Lifecycle
VEKTOR implements a three-tier lifecycle to manage information density:
1. Raw Input: The verbatim log of interactions.
2. MemScenes: Automated consolidation of related events into structured episodes.
3. Core Blocks: Fixed identity and persona data that is always present in the context.

---

## Why VEKTOR?
VEKTOR is designed for developers who require high-performance memory without the overhead of cloud services or subscription costs.

- Local-First: Runs entirely on your hardware via SQLite. No data leaves your server.
- Model Agnostic: Compatible with Groq, OpenAI, Anthropic, and fully local Ollama setups.
- Zero API Cost for Embeddings: Uses local transformers to generate vectors at 0ms latency and $0 cost.
- Self-Editing: Agents can manage and update their own memory blocks dynamically.

---

## Research Foundations
The VEKTOR engine is an original implementation of concepts established in peer-reviewed research:

- MAGMA (arxiv:2601.03236): Multi-level Attributed Graph Memory.
- EverMemOS (arxiv:2601.02163): Persistent memory lifecycle management.
- Mem0 (arxiv:2504.19413): Memory curation and deduplication logic.

***
For a deep dive into the philosophy of agentic memory, read our full thesis on Substack: https://vektormemory.substack.com/p/why-your-ai-agents-have-goldfish
