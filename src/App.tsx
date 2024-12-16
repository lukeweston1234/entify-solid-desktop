import "./App.css";
import Toolbar from "./shared/ui/Toolbar";
import { lazy } from "solid-js";

import { Router } from "@solidjs/router";
import Lighting from "./shared/ui/Lighting";
import Sidebar from "./shared/ui/Sidebar";
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
