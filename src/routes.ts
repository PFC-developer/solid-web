import { lazy } from "solid-js"

import Home from "./pages/home"
import AboutData from "./pages/about.data"
import { RouteDefinition } from "@solidjs/router"

export const routes: RouteDefinition[] = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/about",
    component: lazy(() => import("./pages/about")),
    data: AboutData
  },
  {
    path: "**",
    component: lazy(() => import("./errors/404"))
  }
]
