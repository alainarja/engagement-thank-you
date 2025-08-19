import { NextRequest, NextResponse } from 'next/server'
import { getAllGuests, createGuest, deleteGuest } from '@/lib/storage'

export async function GET() {
  try {
    const guests = await getAllGuests()
    return NextResponse.json(guests)
  } catch (error) {
    console.error('Error fetching guests:', error)
    return NextResponse.json({ error: 'Failed to fetch guests' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, image } = await request.json()
    
    if (!name || !image) {
      return NextResponse.json(
        { error: 'Name and image are required' },
        { status: 400 }
      )
    }
    
    const id = await createGuest(name, image)
    return NextResponse.json({ id, name, image })
  } catch (error) {
    console.error('Error creating guest:', error)
    return NextResponse.json({ error: 'Failed to create guest' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { error: 'Guest ID is required' },
        { status: 400 }
      )
    }
    
    const success = await deleteGuest(id)
    
    if (!success) {
      return NextResponse.json(
        { error: 'Guest not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting guest:', error)
    return NextResponse.json({ error: 'Failed to delete guest' }, { status: 500 })
  }
}