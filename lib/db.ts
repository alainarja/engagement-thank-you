import Database from 'better-sqlite3'
import path from 'path'

const dbPath = path.join(process.cwd(), 'guests.db')
const db = new Database(dbPath)

// Create table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS guests (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    image TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)

export interface Guest {
  id: string
  name: string
  image: string
  created_at: string
}

export function getAllGuests(): Guest[] {
  const stmt = db.prepare('SELECT * FROM guests ORDER BY created_at DESC')
  return stmt.all() as Guest[]
}

export function getGuest(id: string): Guest | undefined {
  const stmt = db.prepare('SELECT * FROM guests WHERE id = ?')
  return stmt.get(id) as Guest | undefined
}

export function createGuest(name: string, image: string): string {
  const id = Date.now().toString(36) + Math.random().toString(36).substr(2)
  const stmt = db.prepare('INSERT INTO guests (id, name, image) VALUES (?, ?, ?)')
  stmt.run(id, name, image)
  return id
}

export function deleteGuest(id: string): boolean {
  const stmt = db.prepare('DELETE FROM guests WHERE id = ?')
  const result = stmt.run(id)
  return result.changes > 0
}

export default db