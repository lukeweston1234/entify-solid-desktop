import { invoke } from "@tauri-apps/api/core";
import { SkillTree, SkillTreeNode } from "../tree.model";

export async function getTree(id: number){
    const res = await invoke('get_skill_tree', {id: id});
    return res as [SkillTree, SkillTreeNode[]];
}

export async function getTrees(){
    const res = await invoke('get_all_tree_items');
    return res as SkillTree[]
}

export async function createTree(title: string, desc: string){
    const res = await invoke('create_skill_tree_item', {
        title: title,
        description: desc
    })
    return res;
}

export async function updateTree(tree: SkillTree){
    await invoke('update_skill_tree_item', {skill_tree:tree});
}

export async function deleteTree(id: number){
    await invoke('delete_skill_tree_item', {id: id})
}

