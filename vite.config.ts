import react from "@vitejs/plugin-react";
import vike from "vike/plugin";
import { UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

const config: UserConfig = {
  plugins: [react(), vue(), vike()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
    },
  },
};

export default config;
