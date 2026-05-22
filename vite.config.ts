import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tanstackStart({
      server: { entry: "server" },
      routers: {
        client: { entry: "src/router.tsx" },
      },
    }),
    tailwindcss(),
    tsConfigPaths(),
  ],
});
