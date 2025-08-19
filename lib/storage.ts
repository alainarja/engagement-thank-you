import { getGuestsCollection, Guest } from './mongodb'
import { put, del } from '@vercel/blob'

export interface GuestData {
  id: string
  name: string
  imageUrl: string
  created_at: string
}

export async function getAllGuests(): Promise<GuestData[]> {
  try {
    const collection = await getGuestsCollection()
    const guests = await collection.find({}).sort({ created_at: -1 }).toArray()
    return guests.map(g => ({
      id: g.id,
      name: g.name,
      imageUrl: g.imageUrl,
      created_at: g.created_at.toISOString()
    }))
  } catch (error) {
    console.error('Error fetching guests:', error)
    return []
  }
}

export async function getGuest(id: string): Promise<GuestData | undefined> {
  try {
    const collection = await getGuestsCollection()
    const guest = await collection.findOne({ id })
    if (!guest) return undefined
    
    return {
      id: guest.id,
      name: guest.name,
      imageUrl: guest.imageUrl,
      created_at: guest.created_at.toISOString()
    }
  } catch (error) {
    console.error('Error fetching guest:', error)
    return undefined
  }
}

export async function createGuest(name: string, imageBase64: string): Promise<string> {
  try {
    // Generate unique ID
    const id = Date.now().toString(36) + Math.random().toString(36).substr(2)
    
    // Upload image to Vercel Blob
    const imageBuffer = Buffer.from(imageBase64.split(',')[1], 'base64')
    const filename = `guest-${id}.jpg`
    
    const blob = await put(filename, imageBuffer, {
      access: 'public',
      contentType: 'image/jpeg',
      token: process.env.BLOB_READ_WRITE_TOKEN
    })
    
    // Save to MongoDB
    const collection = await getGuestsCollection()
    const newGuest: Guest = {
      id,
      name,
      imageUrl: blob.url,
      created_at: new Date()
    }
    
    await collection.insertOne(newGuest)
    return id
  } catch (error) {
    console.error('Error creating guest:', error)
    throw error
  }
}

export async function deleteGuest(id: string): Promise<boolean> {
  try {
    const collection = await getGuestsCollection()
    
    // Get guest to find image URL
    const guest = await collection.findOne({ id })
    if (!guest) return false
    
    // Delete image from Vercel Blob
    if (guest.imageUrl) {
      try {
        await del(guest.imageUrl)
      } catch (error) {
        console.error('Error deleting image from blob:', error)
      }
    }
    
    // Delete from MongoDB
    const result = await collection.deleteOne({ id })
    return result.deletedCount > 0
  } catch (error) {
    console.error('Error deleting guest:', error)
    return false
  }
}