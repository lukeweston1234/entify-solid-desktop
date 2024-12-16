import { Accessor, Component, JSXElement, Setter, Show } from "solid-js";

const Modal: Component<{
  children: JSXElement;
  title: string;
  isOpen: Accessor<boolean>;
  setIsOpen: Setter<boolean>;
  height?: number;
}> = (props) => {
  return (
    <Show when={props.isOpen()}>
      <div class="fixed inset-0 z-30 flex h-screen w-screen items-center justify-center backdrop-blur-sm">
        <div
          style={{
            height: props.height !== undefined ? `${props.height}px` : "400px",
          }}
          class={`
          } w-[400px] flex-shrink-0 rounded-2xl border-2 border-white border-opacity-60 p-3`}
        >
          <div class="flex w-full items-center justify-between">
            <h2 class="text-lg text-white">{props.title}</h2>
            <button onClick={() => props.setIsOpen(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-6 w-6 text-white text-opacity-70 hover:text-opacity-100"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {props.children}
        </div>
      </div>
    </Show>
  );
};

export default Modal;
