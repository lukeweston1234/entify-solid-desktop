use tauri::{command};
use tokio_rusqlite::Connection;
use std::sync::Arc;
use std::error::Error;
use super::tree::get_skill_tree_nodes;
use super::node::get_skill_tree_node;
use crate::db::schema::{SkillTree, SkillTreeNode};

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
