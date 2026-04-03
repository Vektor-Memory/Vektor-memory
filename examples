const { createMemory } = require('vektor-slipstream');

async function run() {
  const memory = await createMemory({
    agentId:    'trader-01',
    dbPath:     './trading-bot.db',
    licenceKey: process.env.VEKTOR_LICENCE_KEY,
    provider:   'groq',
    apiKey:     process.env.GROQ_API_KEY,
  });

  await memory.remember('User trades BTC with a 2% stop-loss rule');
  await memory.remember('BTC is testing support at 92k');

  const ctx = await memory.recall('Should I sell BTC?', 5);
  console.log('Recalled context:', ctx);
}
run();
