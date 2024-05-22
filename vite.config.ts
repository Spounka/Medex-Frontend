import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
    plugins: [react(), svgr()],
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes("node_modules")) {
                        //@ts-ignore
                        const [packageName] = id.match(/node_modules\/([^/]+)/);
                        return packageName.replace("@", "");
                    }
                },
            },
        },
    },
});
