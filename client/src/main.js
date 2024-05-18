// =============================================================================
// Imports
// =============================================================================
import "@/assets/styles/index.scss"

import { createApp } from "vue"
import { createPinia } from "pinia"
import { createHead } from "@unhead/vue"
import { BaseComponents } from "@/components/base/index"

import App from "./App.vue"
import router from "./router"

// =============================================================================
// Initialize the vue app and plugins
// =============================================================================
const app = createApp(App)
const head = createHead()

app.use(createPinia())
app.use(head)
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
