use api::commands::get_skill_tree;
use tokio_rusqlite::Connection;
use tokio::runtime::Runtime;
use db::init::initialize_database;

use window_vibrancy::{apply_acrylic,apply_vibrancy, NSVisualEffectMaterial};

use std::sync::Arc;
use std::env::current_dir;

use crate::api::commands::*;

use tauri::{Listener, Manager};

mod db;
mod api;



#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    println!("{:?}", current_dir().unwrap());

    let rt = Runtime::new().unwrap();

    let join_handle = rt.spawn(async move {
        // TODO: Create db is it does not exist. This may be built in, but I am on a plane and can't see
        let conn = 
            Connection::open("./db/app.db")
            .await
            .expect("Could not open DB");
        initialize_database(&conn)
            .await
            .expect("Could not initialize database");
        conn
    });

    let conn = rt.block_on(join_handle).unwrap();

    let shared_conn = Arc::new(conn);

    tauri::Builder::default()
        .manage(shared_conn)
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            get_node,
            get_all_tree_items,
            create_node,
            update_node,
            delete_node,
            get_skill_tree,
            create_skill_tree_item,
            update_skill_tree_item,
            delete_skill_tree_item
        ])
        .setup(move |app| {
            let window: tauri::WebviewWindow = app.get_webview_window("main").unwrap();

            #[cfg(target_os = "macos")]
            apply_vibrancy(&window, NSVisualEffectMaterial::HudWindow, None, None).expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");

            #[cfg(target_os = "windows")]
            apply_acrylic(&window, Some((0, 0, 0, 1))).expect("Unsupported platform");

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
