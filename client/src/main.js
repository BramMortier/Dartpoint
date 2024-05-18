// =============================================================================
// Imports
// =============================================================================
import "@/assets/styles/index.scss"

import { createApp } from "vue"
import { createPinia } from "pinia"
import { BaseComponents } from "@/components/base/index"

import App from "./App.vue"
import router from "./router"

// =============================================================================
// Initialize the vue app and plugins
// =============================================================================
const app = createApp(App)

app.use(createPinia())
app.use(router)

// =============================================================================
// Register all base components globally
// =============================================================================
for (const [key, value] of Object.entries(BaseComponents)) {
    app.component(key, value)
}

// =============================================================================
// Mount the app
// =============================================================================
app.mount("#app")
