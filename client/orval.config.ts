import { defineConfig } from 'orval';
import path from 'path';

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

console.log('env:', process.env.VITE_API_SCHEMA_URL);

export default defineConfig({
  api: {
    input: process.env.VITE_API_SCHEMA_URL,
    output: {
      target: './src/shared/api/generated.ts',
      client: 'react-query',
      schemas: './src/shared/api/model',
      override: {
        mutator: {
          path: './src/shared/api/custom-instance.ts',
          name: 'customInstance',
        },
        query: {
          options: {
            error: 'AxiosError<ErrorResponseDto>',
          },
        },
      },
    },
  },
});