import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  target: 'es2022',
  // The JSX runtime and React itself come from the consumer's copy.
  external: ['react', 'react-dom', 'react/jsx-runtime'],
});
