import "./App.css";
import { lazy } from "solid-js";

import { Router } from "@solidjs/router";
import Layout from "./shared/ui/Layout";

const routes = [
  {
    path: "/",
    component: lazy(() => import("./features/home/Home")),
  },
  {
    path: "trees",
    component: lazy(() => import("./features/skill-tree/SkillTree")),
  },
  {
    path: "trees/:id",
    component: lazy(() => import("./features/skill-tree/SkillTree")),
  },
];

function App() {
  return <Router root={Layout}>{routes}</Router>;
}

export default App;
