export const ArmorConfigurations = {
  blockFieldSuggestion: { enabled: process.env.NODE === 'production' },
  maxDepth: { enabled: true, n: 4 },
  costLimit: {
    enabled: true,
    maxCost: 100,
    objectCost: 2,
    scalarCost: 1,
    depthCostFactor: 1.5,
    ignoreIntrospection: true,
  },
  maxAliases: { enabled: true, n: 2 },
  maxDirectives: { enabled: true, n: 2 },
  maxTokens: { enabled: true, n: 500 },
};
