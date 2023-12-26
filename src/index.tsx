import { render } from "solid-js/web"
import "./polyfill" // ! register polyfill before any other imports\]
import App from "./app"
import "./index.css"
import { Router } from "@solidjs/router"
render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  document.getElementById("root")
)
