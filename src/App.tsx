import { createSignal, For, onMount } from "solid-js";
import { SkillTree } from "./shared/tree.model";
import { getTrees } from "./shared/services/tree.service";

import "./App.css";


function App() {
  const [trees, setTrees] = createSignal<SkillTree[]>()
  onMount(async () => {
    getTrees().then(t => setTrees(t))
  })
  return (
    <main class="w-screen h-screen relative">
      <div class="absolute left-0 top-0 -z-10 h-full w-full touch-none brightness-90">
        <img src="/src/assets/images/appBackground.jpeg" class="h-full w-full grayscale brightness-50 object-cover"/>
      </div>
      <button class="btn-primary">Create</button>
      <div class="flex flex-col gap-3 w-[240px]">
        <For each={
          trees()
        }>
          {
            (t, _) => <div class="card">{t.title}</div>
          }
        </For>
      </div>
    </main>
  );
}

export default App;
