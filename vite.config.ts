import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  build: {
    lib: {
      entry: "./src/index.js",
      name: "vue-nix-manual",
    },
  },
  plugins: [vue(), cssInjectedByJsPlugin()],
});
