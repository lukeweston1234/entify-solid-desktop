import { createSignal } from "solid-js";
import logo from "./assets/logo.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

function App() {
  return (
    <main class="container">
      <h2 class="text-red-500">Test!</h2>
    </main>
  );
}

export default App;
