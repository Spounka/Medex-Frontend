import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    // @ts-ignore
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
