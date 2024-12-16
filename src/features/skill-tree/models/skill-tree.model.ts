export interface ISkillTree {
  name: string;
  description: string;
  skillTreeNodes?: SkillTreeNode[];
}

export interface UserSubscription {
  id: number;
  skillTreeId: number;
  dateCreated: Date | string;
}

export interface SkillTree extends ISkillTree {
  id: number;
}
export interface SkillTreeNode {
  id: number;
  parentNodeId?: number | null;
  name: string;
  content: string;
  description: string;
  depth?: number; //Used for initial rendering
  breadth?: number; //Used for initial rendering
}
