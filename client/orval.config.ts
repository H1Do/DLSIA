import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: 'http://localhost:4000/api-json/',
    output: {
      target: './src/api/contract.ts',
      schemas: './src/api/model',
      client: 'axios-functions',
      mode: 'split',
    },
  },
});
