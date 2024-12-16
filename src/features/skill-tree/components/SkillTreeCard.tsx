import {
  Component,
  Setter,
  Accessor,
  createEffect,
  createSignal,
  Switch,
  Match,
  Show,
} from "solid-js";

import { createDraggable } from "@neodrag/solid";
import { Position } from "../models/position.model";
import { SkillTreeNode } from "../models/skill-tree.model";

const SkillTreeCard: Component<{
  refetch: any;
  isOwner: true;
  skillTreeId: number | string;
  skillTreeNode: SkillTreeNode;
  containerRef: any;
  setActiveNode: Setter<SkillTreeNode | undefined>;
  setAreDetailsOpen: Setter<boolean>;
  setNodePositionMap: Setter<Map<number, Position>>;
  userProgressMap: Accessor<Map<number, boolean>>;
  isLocked: boolean;
  initialPositionMap:
    | Accessor<Map<number, { x: number; y: number }>>
    | undefined;
}> = (props) => {
  const { draggable } = createDraggable();

  const [isCreateChildModalOpen, setIsCreateChildModalOpen] =
    createSignal(false);

  let cardRef: any;

  createEffect(() => {
    props.setNodePositionMap((prevState) => {
      if (!(cardRef.getClientRects()[0] && props.containerRef()))
        return prevState;
      const newMap = new Map(prevState);
      const x =
        cardRef.getClientRects()[0].x -
        props.containerRef().getClientRects()[0].x;
      const y =
        cardRef.getClientRects()[0].y -
        props.containerRef().getClientRects()[0].y;
      const width = cardRef.getClientRects()[0].width;
      const height = cardRef.getClientRects()[0].height;
      if (!props.skillTreeNode.id) return prevState;
      newMap.set(props.skillTreeNode.id, {
        x: Math.round(x + width / 2),
        y: Math.round(y + height / 2),
        right: x + width,
        left: x,
        top: y,
        bottom: y + height,
        height: height,
        width: width,
      });
      return newMap;
    });
  });
  return (
    <>
      <div
        onMouseDown={(e) => e.stopPropagation()}
        onMouseMove={(e) => e.stopPropagation()}
        onMouseUp={(e) => e.stopPropagation()}
        ref={cardRef}
        use:draggable={{
          axis: "both",
          defaultPosition: {
            x: props.initialPositionMap!().get(props.skillTreeNode.id)?.x ?? 0,
            y: props.initialPositionMap!().get(props.skillTreeNode.id)?.y ?? 0,
          },
          //Probably a better way, but it may not be faster
          onDrag: (data) =>
            props.setNodePositionMap((prevState) => {
              if (props.skillTreeNode.id === undefined) return prevState;
              const newMap = new Map(prevState);
              const x =
                data.currentNode.getClientRects()[0].x -
                props.containerRef().getClientRects()[0].x;
              const y =
                data.currentNode.getClientRects()[0].y -
                props.containerRef().getClientRects()[0].y;
              const width = cardRef.getClientRects()[0].width;
              const height = cardRef.getClientRects()[0].height;
              newMap.set(props.skillTreeNode.id, {
                x: Math.round(x + width / 2),
                y: Math.round(y + height / 2),
                right: x + width,
                left: x,
                top: y,
                bottom: y + height,
                height: height,
                width: width,
              });
              return newMap;
            }),
        }}
        class={
          "absolute z-20 flex h-[150px] w-[200px] cursor-move flex-col overflow-hidden rounded-2xl border-2 border-white border-opacity-60 p-3"
        }
      >
        <div class="flex flex-col">
          <div class="flex items-center justify-between">
            <h2 class="select-none overflow-clip text-ellipsis whitespace-nowrap font-appRegular text-white">
              {props.skillTreeNode.name}
            </h2>
            <Switch
              fallback={
                <button
                  onClick={() => {
                    props.setActiveNode(props.skillTreeNode);
                    props.setAreDetailsOpen(true);
                  }}
                >
                  <Show
                    when={props.userProgressMap().has(props.skillTreeNode.id)}
                    fallback={
                      <svg
                        id="eye"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="h-4 w-4 text-white text-opacity-75"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="h-4 w-4 text-white text-opacity-75"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </Show>
                </button>
              }
            >
              <Match when={props.isLocked && !props.isOwner}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-4 w-4 flex-shrink-0 text-white text-opacity-75"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
              </Match>
              <Match when={props.isOwner}>
                <button
                  onClick={() => {
                    props.setActiveNode(props.skillTreeNode);
                    props.setAreDetailsOpen(true);
                  }}
                >
                  <svg
                    id="pen"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-4 w-4 text-white text-opacity-75"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                    />
                  </svg>
                </button>
              </Match>
            </Switch>
          </div>
          <p class="select-none text-ellipsis font-appLight text-sm text-white">
            {props.skillTreeNode.description}
          </p>
        </div>
      </div>
    </>
  );
};

export default SkillTreeCard;
