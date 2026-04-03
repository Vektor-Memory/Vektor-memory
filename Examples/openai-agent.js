const { createMemory } = require('vektor-slipstream');

async function run() {
  const memory = await createMemory({
    agentId:    'support-01',
    dbPath:     './support-bot.db',
    licenceKey: process.env.VEKTOR_LICENCE_KEY,
  });

  await memory.remember('User prefers TypeScript over Python');
  await memory.remember('User is building an AI memory product');

  const ctx = await memory.recall('Which language should I recommend?', 5);
  console.log('Context:', ctx);

  // Graph traversal
  const graph = await memory.graph('TypeScript', { hops: 2 });
  console.log('Related memories:', graph.nodes.length);
}
run();
