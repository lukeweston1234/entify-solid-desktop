use tauri::{command};
use tokio_rusqlite::Connection;
use std::sync::Arc;
use std::error::Error;
use super::tree::{get_all_trees, get_tree_and_nodes, create_skill_tree, delete_skill_tree, update_skill_tree};
use super::node::{get_skill_tree_node, create_skill_tree_node, update_skill_tree_node, delete_skill_tree_node};
use crate::db::schema::{SkillTree, SkillTreeNode};

// SKill Trees

#[command]
pub async fn get_all_tree_items(conn: tauri::State<'_, Arc<Connection>>) ->  Result<(Vec<SkillTree>), String> {
    let res = get_all_trees(&conn).await;

    if let Ok(item) = res {
        Ok(item)
    }
    else {
        Err("Something went wrong".to_string())
    }
}

#[command]
pub async fn get_skill_tree(conn: tauri::State<'_, Arc<Connection>>, id: u32) ->  Result<(SkillTree, Vec<SkillTreeNode>), String> {
    let res = get_tree_and_nodes(&conn, id).await;

    if let Ok(item) = res {
        Ok(item)
    }
    else {
        Err("Something went wrong".to_string())
    }
}

#[command]
pub async fn create_skill_tree_item(conn:tauri::State<'_, Arc<Connection>>, title: String, description: String) -> 
Result<i64, String> {
    let res = create_skill_tree(&conn, title, description).await;

    match res {
        Ok(id) => Ok(id),
        Err(_) => Err("Could not create skill tree".to_string())
    }
}

#[command]
pub async fn update_skill_tree_item(conn: tauri::State<'_, Arc<Connection>>, skill_tree: SkillTree) -> Result<(), String> {
    let res = update_skill_tree(&conn, skill_tree).await;

    match res {
        Ok(_) => Ok(()),
        Err(_) => Err("Could not update skill tree".to_string())
    }
}

#[command]
pub async fn delete_skill_tree_item(conn: tauri::State<'_, Arc<Connection>>, id: u32) -> Result<(), String>{
    let res = delete_skill_tree(&conn, id).await;

    match res {
        Ok(_) => Ok(()),
        Err(_) => Err("Could not delete skill tree item".to_string())
    }
}

// Nodes

#[command]
pub async fn get_node(conn: tauri::State<'_, Arc<Connection>>, id: i32) -> Result<SkillTreeNode, String> {
    let res = get_skill_tree_node(&conn, id).await;

    if let Ok(tree) = res {
        if let Some(found) = tree {
            return Ok(found);
        }
        else {
            return Err("No result".into());
        }
    }
    else {
        println!("{:?}", res);
    }
    return Err("No result".into());
}

#[command]
pub async fn create_node(conn: tauri::State<'_, Arc<Connection>>, node: SkillTreeNode) -> Result<u32, String>{
    let res = create_skill_tree_node(&conn, node).await;

    match res {
        Ok(id) => Ok(id),
        Err(_) => Err("Could not create skill tree node".to_string())
    }
}

#[tauri::command]
pub async fn update_node(conn: tauri::State<'_, Arc<Connection>>, node: SkillTreeNode) -> Result<(), String> {
    let res = update_skill_tree_node(&conn, node).await;

    match res {
        Ok(_) => Ok(()),
        Err(_) => Err("Could not update skill tree".to_string())
    }
}

#[tauri::command]
pub async fn delete_node(conn: tauri::State<'_, Arc<Connection>>, id: u32) -> Result<(), String> {
    let res = delete_skill_tree_node(&conn, id).await;

    match res {
        Ok(_) => Ok(()),
        Err(_) => Err("Could not delete skill tree".to_string())
    }
}