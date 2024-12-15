import "./App.css";
import Toolbar from "./shared/ui/Toolbar";
import { lazy } from "solid-js";

import { Router } from "@solidjs/router";
import Lighting from "./shared/ui/Lighting";

const routes = {
    path: "/",
    component: lazy(() => import("./features/home/Home")),
}


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
            <Toolbar/>
          </div>
          <Lighting/>
          <div class="w-full h-full flex">
            <div class="px-6 grid grid-rows-3 border-r-2 border-app-secondary">
              <div class="flex flex-col justify-start items-center">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_204_611)">
                    <path d="M17.7953 33.3318V20.7991M17.7953 20.7991V14.5327M17.7953 20.7991L24.0603 17.6659M25.6265 9.83296C25.6265 7.7555 24.8014 5.76319 23.3329 4.29422C21.8642 2.82526 19.8723 2 17.7953 2C15.7183 2 13.7264 2.82526 12.2578 4.29422C10.7892 5.76319 9.96406 7.7555 9.96406 9.83296M13.0966 9.83296H10.7472C8.4625 9.83296 6.27141 10.7407 4.65591 12.3566C3.0404 13.9724 2.13281 16.164 2.13281 18.4492C2.13281 20.7344 3.0404 22.926 4.65591 24.5418C6.27141 26.1577 8.4625 27.0655 10.7472 27.0655H17.7953H24.8434C27.0626 27.0689 29.1974 26.2157 30.8032 24.6835C32.4088 23.1514 33.3614 21.0586 33.4624 18.8413C33.5634 16.6239 32.8049 14.4531 31.3452 12.7814C29.8853 11.1096 27.8368 10.0658 25.6265 9.86742" stroke="white" stroke-opacity="0.7" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_204_611">
                      <rect width="36" height="36" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </div>
              

              <div class="flex flex-col gap-16">
                <button>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-app-secondary hover:text-app-primary transition">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                </button>
                <button>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-app-secondary hover:text-app-primary transition">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                </button>
              </div>

              <div></div>
            </div>
            <div class="px-6">
              <Router>{routes}</Router>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
