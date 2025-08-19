"use client"

import { useState, useEffect } from "react"
import { Upload, User, Link, Check, Copy, Trash2, ExternalLink, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"

interface StoredGuest {
  id: string
  name: string
  image: string
  createdAt: string
}

export default function AdminUploadPage() {
  const [guestName, setGuestName] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [generatedLink, setGeneratedLink] = useState("")
  const [isCopied, setIsCopied] = useState(false)
  const [storedGuests, setStoredGuests] = useState<StoredGuest[]>([])

  useEffect(() => {
    loadStoredGuests()
  }, [])

  const loadStoredGuests = async () => {
    try {
      const response = await fetch('/api/guests')
      if (response.ok) {
        const guests = await response.json()
        setStoredGuests(guests.map((g: any) => ({
          id: g.id,
          name: g.name,
          image: g.image,
          createdAt: g.created_at
        })))
      }
    } catch (error) {
      console.error('Error loading guests:', error)
      toast.error('Failed to load guests')
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const generateThankYouLink = async () => {
    console.log('Generate button clicked', { guestName, hasImage: !!imagePreview })
    
    if (!guestName || !imagePreview) {
      toast.error("Please provide both name and image")
      return
    }

    try {
      const response = await fetch('/api/guests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: guestName,
          image: imagePreview
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create guest')
      }

      const data = await response.json()
      console.log('Guest created:', data)
      
      // Generate link
      const baseUrl = window.location.origin
      const thankYouUrl = `${baseUrl}/thank-you/${data.id}`
      setGeneratedLink(thankYouUrl)
      
      // Reload guest list
      loadStoredGuests()
      
      toast.success("Thank you link generated successfully!")
    } catch (error) {
      console.error('Error creating guest:', error)
      toast.error("Failed to generate thank you link")
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink)
      setIsCopied(true)
      toast.success("Link copied to clipboard!")
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      toast.error("Failed to copy link")
    }
  }

  const resetForm = () => {
    setGuestName("")
    setImageFile(null)
    setImagePreview("")
    setGeneratedLink("")
    setIsCopied(false)
  }

  const deleteGuest = async (id: string) => {
    if (confirm('Are you sure you want to delete this thank you link?')) {
      try {
        const response = await fetch(`/api/guests?id=${id}`, {
          method: 'DELETE',
        })

        if (!response.ok) {
          throw new Error('Failed to delete guest')
        }

        loadStoredGuests()
        toast.success("Thank you link deleted successfully!")
      } catch (error) {
        console.error('Error deleting guest:', error)
        toast.error("Failed to delete thank you link")
      }
    }
  }

  const copyGuestLink = async (id: string) => {
    const baseUrl = window.location.origin
    const link = `${baseUrl}/thank-you/${id}`
    try {
      await navigator.clipboard.writeText(link)
      toast.success("Link copied to clipboard!")
    } catch (err) {
      toast.error("Failed to copy link")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 p-4">
      <div className="max-w-4xl mx-auto pt-12">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          Thank You Link Manager
        </h1>
        
        <Tabs defaultValue="create" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="create">Create New Link</TabsTrigger>
            <TabsTrigger value="manage">Manage Links ({storedGuests.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="create">
            <Card className="shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">
                  Create Thank You Link
                </CardTitle>
                <CardDescription className="text-lg">
                  Upload a photo and enter the guest's name to generate a personalized thank you page
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
            {/* Name Input */}
            <div className="space-y-2">
              <Label htmlFor="guestName" className="text-base flex items-center gap-2">
                <User className="w-4 h-4" />
                Guest Name
              </Label>
              <Input
                id="guestName"
                type="text"
                placeholder="Enter guest's name"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="text-lg"
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label htmlFor="imageUpload" className="text-base flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Guest Photo
              </Label>
              <Input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="cursor-pointer"
              />
            </div>

            {/* Image Preview */}
            {imagePreview && (
              <div className="relative aspect-video w-full overflow-hidden rounded-lg border-2 border-gray-200">
                <img
                  src={imagePreview}
                  alt="Guest preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Generate Button */}
            <Button
              onClick={generateThankYouLink}
              disabled={!guestName || !imagePreview}
              className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white"
              size="lg"
            >
              <Link className="w-4 h-4 mr-2" />
              Generate Thank You Link
            </Button>

            {/* Generated Link */}
            {generatedLink && (
              <div className="space-y-4 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                <div className="flex items-center gap-2 text-green-700">
                  <Check className="w-5 h-5" />
                  <span className="font-semibold">Link Generated Successfully!</span>
                </div>
                
                <div className="flex gap-2">
                  <Input
                    value={generatedLink}
                    readOnly
                    className="bg-white"
                  />
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    className="shrink-0"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => window.open(generatedLink, '_blank')}
                    variant="outline"
                    className="flex-1"
                  >
                    Preview Page
                  </Button>
                  <Button
                    onClick={resetForm}
                    variant="outline"
                    className="flex-1"
                  >
                    Create Another
                  </Button>
                </div>
              </div>
            )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="manage">
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Manage Thank You Links</CardTitle>
                <CardDescription>
                  View, copy, or delete existing thank you links
                </CardDescription>
              </CardHeader>
              <CardContent>
                {storedGuests.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <p className="text-lg">No thank you links created yet</p>
                    <p className="text-sm mt-2">Create your first link in the "Create New Link" tab</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {storedGuests.map((guest) => (
                      <div key={guest.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-200">
                          <img
                            src={guest.image}
                            alt={guest.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-lg">{guest.name}</h3>
                          <p className="text-sm text-gray-500">
                            Created: {new Date(guest.createdAt).toLocaleDateString()} at {new Date(guest.createdAt).toLocaleTimeString()}
                          </p>
                        </div>
                        
                        <div className="flex gap-2 flex-shrink-0">
                          <Button
                            onClick={() => window.open(`/thank-you/${guest.id}`, '_blank')}
                            variant="outline"
                            size="sm"
                            className="hidden sm:flex"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button
                            onClick={() => copyGuestLink(guest.id)}
                            variant="outline"
                            size="sm"
                          >
                            <Copy className="w-4 h-4 sm:mr-1" />
                            <span className="hidden sm:inline">Copy</span>
                          </Button>
                          <Button
                            onClick={() => deleteGuest(guest.id)}
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}