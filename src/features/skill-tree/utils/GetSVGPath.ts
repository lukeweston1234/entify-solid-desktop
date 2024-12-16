import { Position } from "../models/position.model";
import { SkillTreeNode } from "../models/skill-tree.model";

export function getSVGPath(
  node: SkillTreeNode,
  nodePositionMap: Map<number, Position>
) {
  if (!node.parentNodeId) return;

  const posChild = nodePositionMap.get(node.id);
  const posParent = nodePositionMap.get(node.parentNodeId);

  if (!(posParent && posChild)) return;

  const maxVerticalDistance = Math.max(
    posChild.y - posParent?.bottom,
    posParent.y - posChild.bottom
  );

  const maxHorizontalDistance = Math.max(
    posChild.left - posParent.right,
    posParent.left - posChild.right
  );

  let d = "";
  if (
    posChild.x < posParent.x + posParent.width &&
    posChild.x + posChild.width > posParent.x &&
    posChild.y < posParent.y + posParent.height &&
    posChild.height + posChild.y > posParent.y
  )
    return;
  if (maxVerticalDistance > maxHorizontalDistance) {
    if (posParent.top < posChild.bottom) {
      // If the child is on the bottom
      d = `M ${posChild.x} ${posChild.top} C ${posChild.x} ${
        (posParent.bottom + posChild.top) / 2
      } ${posParent.x} ${(posParent.bottom + posChild.top) / 2} ${
        posParent.x
      } ${posParent.bottom}`;
    } else {
      d = `M ${posParent.x} ${posParent.top} C ${posParent.x} ${
        (posChild.bottom + posParent.top) / 2
      } ${posChild.x} ${(posChild.bottom + posParent.top) / 2} ${posChild.x} ${
        posChild.bottom
      }`;
    }
  } else {
    if (posChild.right < posParent.left) {
      //If the child is on the left
      d = `M ${posChild.right} ${posChild.y}
                    C ${(posChild.right + posParent.left) / 2} ${posChild.y} 
                    ${(posChild.right + posParent.left) / 2} ${posParent.y}
                    ${posParent.left} ${posParent.y}
                    `;
    } else {
      d = `M ${posParent.right} ${posParent.y}
                    C ${(posParent.right + posChild.left) / 2} ${posParent.y} 
                    ${(posChild.right + posParent.left) / 2} ${posChild.y}
                    ${posChild.left} ${posChild.y}
                    `;
    }
  }

  return d;
}
