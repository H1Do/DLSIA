import { defineConfig } from 'orval';
import { config } from 'dotenv';
config();
console.log(process.env.VITE_API_SCHEMA_URL);
export default defineConfig({
  api: {
    input: process.env.VITE_API_SCHEMA_URL,
    output: {
      target: './src/shared/api/generated.ts',
      client: 'react-query',
      schemas: './src/shared/api/model',
      mode: 'split',
      override: {
        mutator: {
          path: './src/shared/api/custom-instance.ts',
          name: 'customInstance',
        },
      },
    },
  },
});
