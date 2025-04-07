import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        dts({
            insertTypesEntry: true,
            entryRoot: "lib",
            outDir: "dist",
        }),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, "lib/main.ts"),
            name: "Bok",
            formats: ["es", "umd"],
            fileName: (format) => `bok.${format}.js`,
        },
        rollupOptions: {
            external: [
                "react",
                "react-dom",
                "styled-components",
                "react/jsx-runtime",
            ],
            output: {
                globals: {
                    react: "React",
                    "react-dom": "ReactDOM",
                    "styled-components": "styled",
                },
            },
        },
    },
});
