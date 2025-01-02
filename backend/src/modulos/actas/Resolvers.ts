const ActasResolver = {
  Query: {
    getActas: () => console.log('getActas'),
    getActa: () => console.log('getActas'),
  },
  Mutation: {
    saveActa: () => console.log('saveActas'),
    updateActa: () => console.log('saveActas'),
  },
};

export default ActasResolver;
