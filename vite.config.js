/// <reference types="vitest" />
import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { getEnvar } from "js_utils";

const conf = {};
const HOST = getEnvar("HOST", true, "production");
const MODE = getEnvar("MODE", true, "production");

if (/dev/.test(HOST)) {
  conf.plugins = [react(), svgr()];
} else {
  conf.plugins = [svgr()];
}

// https:vitejs.dev/config/
export default defineConfig({
  ...conf,
  build: {
    outDir: "dist",
    target: "esnext",
    sourcemap: true,
    emptyOutDir: true,
    copyPublicDir: false,
    lib: {
      entry: {
        index: "./src/index.js",
        comboboxes: "./src/components/comboboxes/index.js",
        flashMessages: "./src/components/flash_messages/index.js",
        svgs: "./src/components/svgs/index.js",
        dialogs: "./src/components/dialogs/index.js",
        buttons: "./src/components/buttons/index.js",
        inputs: "./src/components/inputs/index.js",
        tooltips: "./src/components/tooltips/index.js",
        hooks: "./src/hooks/index.js",
      },
      name: "react_utils",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          ["react-dom"]: "ReactDOM",
        },
      },
    },
    ...conf.build,
  },
  test: {
    // ...
    include: [
      ...configDefaults.include,
      "tests.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
    ],
  },
});
