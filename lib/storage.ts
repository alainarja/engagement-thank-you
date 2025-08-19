import fs from 'fs/promises'
import path from 'path'

export interface Guest {
  id: string
  name: string
  image: string
  created_at: string
}

const DATA_FILE = path.join(process.cwd(), 'data', 'guests.json')

async function ensureDataFile() {
  try {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true })
    try {
      await fs.access(DATA_FILE)
    } catch {
      await fs.writeFile(DATA_FILE, JSON.stringify({ guests: [] }))
    }
  } catch (error) {
    console.error('Error ensuring data file:', error)
  }
}

async function readData(): Promise<{ guests: Guest[] }> {
  try {
    await ensureDataFile()
    const data = await fs.readFile(DATA_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading data:', error)
    return { guests: [] }
  }
}

async function writeData(data: { guests: Guest[] }): Promise<void> {
  try {
    await ensureDataFile()
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error('Error writing data:', error)
  }
}

export async function getAllGuests(): Promise<Guest[]> {
  const data = await readData()
  return data.guests.sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )
}

export async function getGuest(id: string): Promise<Guest | undefined> {
  const data = await readData()
  return data.guests.find(guest => guest.id === id)
}

export async function createGuest(name: string, image: string): Promise<string> {
  const id = Date.now().toString(36) + Math.random().toString(36).substr(2)
  const newGuest: Guest = {
    id,
    name,
    image,
    created_at: new Date().toISOString()
  }
  
  const data = await readData()
  data.guests.push(newGuest)
  await writeData(data)
  
  return id
}

export async function deleteGuest(id: string): Promise<boolean> {
  const data = await readData()
  const initialLength = data.guests.length
  data.guests = data.guests.filter(guest => guest.id !== id)
  
  if (data.guests.length < initialLength) {
    await writeData(data)
    return true
  }
  
  return false
}