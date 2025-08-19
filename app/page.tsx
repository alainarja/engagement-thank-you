import Link from "next/link"
import { Heart, Upload, Users, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full mb-6 animate-pulse">
            <Heart className="w-10 h-10 text-white" fill="currentColor" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Imad & Nour
          </h1>
          <p className="text-xl text-gray-600">Engagement Celebration Portal</p>
        </div>

        {/* Cards Grid */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {/* Admin Upload Card */}
          <Card className="hover:shadow-xl transition-shadow duration-300 border-2 hover:border-pink-200">
            <CardHeader>
              <div className="flex items-center justify-center w-12 h-12 bg-pink-100 rounded-lg mb-4">
                <Upload className="w-6 h-6 text-pink-600" />
              </div>
              <CardTitle className="text-2xl">Create Thank You Links</CardTitle>
              <CardDescription className="text-base">
                Upload guest photos and create personalized thank you pages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin">
                <Button className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white" size="lg">
                  <Upload className="w-4 h-4 mr-2" />
                  Go to Admin Panel
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Invitation Card */}
          <Card className="hover:shadow-xl transition-shadow duration-300 border-2 hover:border-purple-200">
            <CardHeader>
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle className="text-2xl">View Invitation</CardTitle>
              <CardDescription className="text-base">
                See the beautiful engagement invitation page
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/invitation">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white" size="lg">
                  <Sparkles className="w-4 h-4 mr-2" />
                  View Invitation
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-500">
          <p className="text-sm">Made with love for your special celebration</p>
        </div>
      </div>
    </div>
  )
}