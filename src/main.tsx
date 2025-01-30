import { createRoot } from 'react-dom/client'
import { App } from "./app"
import "./shared/utils/array"

createRoot(document.getElementById('root')!).render(
  <App />
)
