import { createSignal, onMount } from "solid-js";
import logo from "./assets/logo.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

function App() {
  onMount(async () => {
    const res = await invoke('get_node', {id: 13})
    console.log(res)
  })
  return (
    <main class="container">
      <h2 class="text-red-500">Test!</h2>
    </main>
  );
}

export default App;
