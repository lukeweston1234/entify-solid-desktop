export interface SkillTree {
    id?: number;
    title: string;
    description: string;
}

export interface SkillTreeNode {
    id?: number;
    title: string;
    parent_id?: number;
    skill_tree_id: number;
    markdown: string;
    depth?: number;
}