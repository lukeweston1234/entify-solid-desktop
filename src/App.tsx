import "./App.css";
import Toolbar from "./shared/ui/Toolbar";
import { lazy } from "solid-js";

import { Router } from "@solidjs/router";
import Lighting from "./shared/ui/Lighting";
import Sidebar from "./shared/ui/Sidebar";

const routes = {
  path: "/",
  component: lazy(() => import("./features/home/Home")),
};

function App() {
  return (
    <main class="w-screen h-screen relative">
      <div class="w-screen h-screen ">
        <div class="fixed inset-0 z-0">
          <div class="w-full h-full relative">
            <div class="z-0 absolute inset-0 bg-app-background opacity-60 touch-none pointer-events-none" />
          </div>
        </div>

        <div class="fixed inset-0 z-50 p-8 pt-12 pb-12 pl-0 overflow-clip flex flex-col gap-6">
          <div
            data-tauri-drag-region
            class="w-full absolute left-0 top-0 z-[100]"
          >
            <Toolbar />
          </div>
          <Lighting />
          <div class="w-full h-full flex">
            <div class="px-6 grid grid-rows-3 border-r-2 border-app-secondary">
              <div class="flex flex-col justify-start items-center">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_204_611)">
                    <path
                      d="M17.7953 33.3318V20.7991M17.7953 20.7991V14.5327M17.7953 20.7991L24.0603 17.6659M25.6265 9.83296C25.6265 7.7555 24.8014 5.76319 23.3329 4.29422C21.8642 2.82526 19.8723 2 17.7953 2C15.7183 2 13.7264 2.82526 12.2578 4.29422C10.7892 5.76319 9.96406 7.7555 9.96406 9.83296M13.0966 9.83296H10.7472C8.4625 9.83296 6.27141 10.7407 4.65591 12.3566C3.0404 13.9724 2.13281 16.164 2.13281 18.4492C2.13281 20.7344 3.0404 22.926 4.65591 24.5418C6.27141 26.1577 8.4625 27.0655 10.7472 27.0655H17.7953H24.8434C27.0626 27.0689 29.1974 26.2157 30.8032 24.6835C32.4088 23.1514 33.3614 21.0586 33.4624 18.8413C33.5634 16.6239 32.8049 14.4531 31.3452 12.7814C29.8853 11.1096 27.8368 10.0658 25.6265 9.86742"
                      stroke="white"
                      stroke-opacity="0.7"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_204_611">
                      <rect width="36" height="36" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>

              <Sidebar />

              <div></div>
            </div>
            <div class="px-6 flex-1">
              <Router>{routes}</Router>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
