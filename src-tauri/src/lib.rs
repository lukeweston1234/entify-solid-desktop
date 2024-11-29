use tokio_rusqlite::Connection;
use tokio::runtime::Runtime;
use db::init::initialize_database;

use std::sync::Arc;
use std::env::current_dir;

mod db;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

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
        .manage(shared_conn.clone())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
