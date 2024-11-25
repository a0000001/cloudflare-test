import { D1Database } from '@cloudflare/workers-types';

let db: D1Database | null = null;

export function getDb() {
  if (!db) {
    throw new Error('Database not initialized');
  }
  return db;
}

export function setDb(database: D1Database) {
  db = database;
}

// 基本的數據庫操作
export async function testDbConnection() {
  const db = getDb();
  try {
    // 創建測試表
    await db.prepare(`
      CREATE TABLE IF NOT EXISTS test_table (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `).run();
    
    return { success: true, message: 'Database connection test successful' };
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : 'Unknown error' };
  }
}
