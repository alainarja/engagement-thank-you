"use client"

import { useState } from "react"
import { Upload, User, Link, Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

export default function AdminUploadPage() {
  const [guestName, setGuestName] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [generatedLink, setGeneratedLink] = useState("")
  const [isCopied, setIsCopied] = useState(false)

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

  const generateThankYouLink = () => {
    if (!guestName || !imagePreview) {
      toast.error("Please provide both name and image")
      return
    }

    // Generate unique ID
    const uniqueId = Date.now().toString(36) + Math.random().toString(36).substr(2)
    
    // Store data in localStorage
    const guestData = {
      name: guestName,
      image: imagePreview,
      createdAt: new Date().toISOString()
    }
    
    localStorage.setItem(`guest_${uniqueId}`, JSON.stringify(guestData))
    
    // Generate link
    const baseUrl = window.location.origin
    const thankYouUrl = `${baseUrl}/thank-you/${uniqueId}`
    setGeneratedLink(thankYouUrl)
    
    toast.success("Thank you link generated successfully!")
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 p-4">
      <div className="max-w-2xl mx-auto pt-12">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
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
      </div>
    </div>
  )
}