import { createSignal, onMount } from "solid-js";
import logo from "./assets/logo.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

function App() {
  onMount(async () => {
    const resOne = await invoke('get_node', {id: 13})
    const resTwo = await invoke('get_skill_tree', {id: 4});
    console.log(resOne)
    console.log(resTwo)

  })
  return (
    <main class="container">
      <h2 class="text-red-500">Test!</h2>
    </main>
  );
}

export default App;
