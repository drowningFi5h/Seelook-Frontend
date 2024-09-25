// src/utils/typesenseClient.ts
import Typesense from 'typesense';

const client = new Typesense.Client({
  nodes: [
    {
      host: 'gazpxuq5k0y1dvjnp-1.a1.typesense.net',
      port: 443, // or 8108
      protocol: 'https', // or 'http'
    },
  ],
  apiKey: 'VsQYd5CLQHdRL9mPo1oBw8wYGu9aGewE', // Use the search-only key here
  connectionTimeoutSeconds: 2,
});

export default client;
