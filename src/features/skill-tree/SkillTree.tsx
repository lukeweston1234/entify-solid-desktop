import { createResource, createSignal, createMemo, Show, For } from "solid-js";
import { useParams } from "@solidjs/router";
import { SkillTree, SkillTreeNode } from "./models/skill-tree.model";
import { Position } from "./models/position.model";
import { getSVGPath } from "./utils/GetSVGPath";
import SkillTreeCard from "./components/SkillTreeCard";
import Spinner from "../../shared/ui/Spinner";

export default function SkillTreeView() {
  const params = useParams();

  const [offset, setOffset] = createSignal<{ x: number; y: number }>({
    x: -5000,
    y: -5000,
  });

  const [containerPosition, setContainerPosition] = createSignal<{
    x: number;
    y: number;
  }>({ x: 5000, y: 5000 });

  const [canDragContainer, setCanDragContainer] = createSignal(false);

  const [skillTree, { refetch }] = createResource<SkillTree>(() => {
    return {
      id: 1,
      name: "Test",
      description: "test",
      skillTreeNodes: [
        {
          id: 1,
          name: "test",
          description: "test",
          content: "test",
          parentNodeId: null,
          depth: 0,
        },
        {
          id: 2,
          name: "test",
          description: "test",
          content: "test",
          parentNodeId: 1,
          depth: 1,
        },
      ],
    };
  });

  const [activeNode, setActiveNode] = createSignal<SkillTreeNode>();
  const [areDetailsOpen, setAreDetailsOpen] = createSignal(false);

  const [nodePositionMap, setNodePositionMap] = createSignal<
    Map<number, Position>
  >(new Map<number, Position>());

  const [containerRef, setContainerRef] = createSignal<any>();

  const [userProgressMap, setUserProgressMap] = createSignal(new Map());

  const initialPositionMap = createMemo(() => {
    const treeRef = skillTree()?.skillTreeNodes;
    if (!treeRef) return new Map();
    const posMap = new Map<number, { x: number; y: number }>();
    for (let i = 0; i < treeRef.length; i++) {
      const node = treeRef[i];
      if (!node.id) return;
      posMap.set(node.id, {
        x: (node.breadth ?? 0) * 300 + 5000,
        y: (node.depth ?? 0) * 200 + 5000,
      });
    }
    return posMap;
  });

  return (
    <div class="flex h-full w-full max-w-full flex-col">
      <Show when={skillTree.latest} fallback={<Spinner />}>
        <div class="flex w-full items-center justify-between">
          <h2 class="font-appLight text-2xl text-white xl:text-[32px]">
            {skillTree()?.name}
          </h2>
          <button class="btn-primary ml-auto">
            Create a new skill tree node
          </button>
        </div>

        <div class="flex-grow overflow-hidden pb-6 pt-6">
          <div
            onMouseDown={(e) => {
              let offsetRef = offset();
              setContainerPosition({
                x: e.pageX - offsetRef.x,
                y: e.pageY - offsetRef.y,
              });
              setCanDragContainer(true);
            }}
            onMouseMove={(e) => {
              if (!canDragContainer()) return;
              let containerPos = containerPosition();
              setOffset({
                x: e.pageX - containerPos.x,
                y: e.pageY - containerPos.y,
              });
            }}
            onMouseUp={() => {
              setCanDragContainer(false);
            }}
            ref={(el) => setContainerRef(el)}
            class="relative h-[10000px] w-[10000px] cursor-move"
            style={{
              transform: `translate(${offset().x}px, ${offset().y}px`,
            }}
          >
            <Show when={initialPositionMap !== undefined}>
              <For each={skillTree()?.skillTreeNodes}>
                {(node) => (
                  <>
                    <SkillTreeCard
                      refetch={refetch}
                      skillTreeId={params.id}
                      initialPositionMap={initialPositionMap as any}
                      setActiveNode={setActiveNode}
                      setAreDetailsOpen={setAreDetailsOpen}
                      setNodePositionMap={setNodePositionMap}
                      containerRef={containerRef}
                      skillTreeNode={node}
                      userProgressMap={userProgressMap}
                      isOwner={true}
                      isLocked={false}
                    />

                    <svg class="pointer-events-none absolute h-full w-full overflow-visible opacity-30">
                      <path
                        class="absolute"
                        d={getSVGPath(node, nodePositionMap())}
                        stroke="#ffffff"
                        stroke-width="2"
                        fill="none"
                      />
                    </svg>
                  </>
                )}
              </For>
            </Show>
          </div>
        </div>
      </Show>
    </div>
  );
}
