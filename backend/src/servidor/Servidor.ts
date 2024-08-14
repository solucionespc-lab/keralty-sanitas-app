import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloArmor } from '@escape.tech/graphql-armor';
import { makeExecutableSchema } from '@graphql-tools/schema';
import cors from 'cors';
import express from 'express';
import { DecodedIdToken } from 'firebase-admin/auth';
import { logger } from 'firebase-functions';
import { applyMiddleware } from 'graphql-middleware';

import { ArmorConfigurations } from '../seguridad/ArmorConfig';
import permisos from '../seguridad/Permisos';
import { urlSevices } from '../seguridad/Secrets';

import { contextValidation } from './Context';
import { resolvers, schemas } from './Implementaciones';

const armor = new ApolloArmor(ArmorConfigurations);

const schema = makeExecutableSchema({ typeDefs: schemas, resolvers });
const app = express();

const startServer = async () => {
  const server = new ApolloServer<Partial<DecodedIdToken>>({
    schema: applyMiddleware(schema, permisos),
    ...armor.protect(),
    introspection: process.env.NODE_ENV !== 'production',
    persistedQueries: false,
    csrfPrevention: process.env.NODE_ENV === 'production',
  });

  try {
    await server.start();
  } catch (err) {
    logger.error(err);
  }

  app.use(
    '/',
    cors<cors.CorsRequest>({
      origin: urlSevices(),
    }),
    express.json(),
    expressMiddleware(server, {
      context: contextValidation,
    })
  );

  app.listen(() => {
    console.info('🚀 Servidor corriendo');
  });
};

export { app, startServer };
