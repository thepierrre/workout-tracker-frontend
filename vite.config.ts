// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     watch: {
//       usePolling: true, // This can help with some file system issues
//     },
//   },
//   optimizeDeps: {
//     exclude: ["js-big-decimal"],
//   },
// });
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // 👋 add the line below to add jsdom to vite
    include: ["**/*.test.tsx"],
    globals: true,
    environment: "jsdom",
    setupFiles: ["./setupTests.ts"],
  },
});
