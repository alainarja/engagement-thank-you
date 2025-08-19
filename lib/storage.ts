export interface Guest {
  id: string
  name: string
  image: string
  created_at: string
}

// In-memory storage for Vercel deployment
let guestsData: Guest[] = []

export async function getAllGuests(): Promise<Guest[]> {
  return guestsData.sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )
}

export async function getGuest(id: string): Promise<Guest | undefined> {
  return guestsData.find(guest => guest.id === id)
}

export async function createGuest(name: string, image: string): Promise<string> {
  const id = Date.now().toString(36) + Math.random().toString(36).substr(2)
  const newGuest: Guest = {
    id,
    name,
    image,
    created_at: new Date().toISOString()
  }
  
  guestsData.push(newGuest)
  return id
}

export async function deleteGuest(id: string): Promise<boolean> {
  const initialLength = guestsData.length
  guestsData = guestsData.filter(guest => guest.id !== id)
  return guestsData.length < initialLength
}