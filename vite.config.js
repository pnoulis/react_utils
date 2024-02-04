import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https:vitejs.dev/config/
export default defineConfig({
  plugins: [svgr()],
  build: {
    outDir: "dist",
    target: "esnext",
    sourcemap: false,
    minify: true,
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
        misc: "./src/components/misc/index.js",
      },
      name: "react_utils",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "styled-components"],
      output: {
        globals: {
          react: "React",
          ["react-dom"]: "ReactDOM",
        },
      },
    },
  },
});
