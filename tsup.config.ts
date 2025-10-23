import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    clean: true,
    minify: false,
    splitting: false,
    outDir: 'dist',
    target: 'es2022',
    external: ['tailwindcss'],
    treeshake: true,
    banner: {
        js: '// TailwindCSS Debug Screens Plugin v4.0\n// https://github.com/your-username/tailwindcss-plugin-debug-screens-tw4',
    },
});
