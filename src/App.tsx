import "./App.css";
import Toolbar from "./shared/ui/Toolbar";


function App() {

  return (
    <main class="w-screen h-screen relative">
      <div class="w-screen h-screen ">
        <div class="fixed inset-0 z-0">
          <div class="w-full h-full relative">
            <div class="z-0 absolute inset-0 bg-app-background opacity-60 touch-none pointer-events-none" />
          </div>
        </div>

        <div class="fixed inset-0 z-50 p-8 pb-12 overflow-clip flex flex-col gap-6">
          <div
            data-tauri-drag-region
            class="w-full absolute left-0 top-0 z-[100]"
          >
            <Toolbar/>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
