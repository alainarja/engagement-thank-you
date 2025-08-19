"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Heart, Sparkles, Star } from "lucide-react"
import { Card } from "@/components/ui/card"

interface GuestData {
  name: string
  image: string
  created_at: string
}

export default function ThankYouPage() {
  const params = useParams()
  const [guestData, setGuestData] = useState<GuestData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchGuest = async () => {
      try {
        const id = params.id as string
        const response = await fetch(`/api/guests/${id}`)
        
        if (response.ok) {
          const data = await response.json()
          setGuestData(data)
        }
      } catch (error) {
        console.error('Error fetching guest:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchGuest()
  }, [params.id])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100">
        <div className="animate-pulse">
          <Heart className="w-12 h-12 text-pink-500 animate-bounce" />
        </div>
      </div>
    )
  }

  if (!guestData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 p-4">
        <Card className="max-w-md w-full p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Page Not Found</h1>
          <p className="text-gray-600">This thank you page is no longer available.</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 animate-float">
          <Heart className="w-8 h-8 text-pink-300 opacity-60" fill="currentColor" />
        </div>
        <div className="absolute top-20 right-20 animate-float-delayed">
          <Star className="w-6 h-6 text-yellow-300 opacity-60" fill="currentColor" />
        </div>
        <div className="absolute bottom-20 left-20 animate-float">
          <Sparkles className="w-10 h-10 text-purple-300 opacity-60" />
        </div>
        <div className="absolute bottom-10 right-10 animate-float-delayed">
          <Heart className="w-6 h-6 text-red-300 opacity-60" fill="currentColor" />
        </div>
        <div className="absolute top-1/2 left-10 animate-float">
          <Star className="w-8 h-8 text-blue-300 opacity-60" fill="currentColor" />
        </div>
        <div className="absolute top-1/3 right-1/4 animate-float-delayed">
          <Sparkles className="w-7 h-7 text-pink-300 opacity-60" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl overflow-hidden">
            {/* Guest Image */}
            <div className="relative h-80 md:h-96 overflow-hidden">
              <img
                src={guestData.image}
                alt={guestData.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              
              {/* Decorative Hearts on Image */}
              <div className="absolute top-4 right-4 animate-pulse">
                <Heart className="w-8 h-8 text-white drop-shadow-lg" fill="currentColor" />
              </div>
              <div className="absolute top-4 left-4 animate-pulse delay-300">
                <Heart className="w-6 h-6 text-white drop-shadow-lg" fill="currentColor" />
              </div>
            </div>

            {/* Thank You Message */}
            <div className="p-8 md:p-12 text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full mb-4 animate-bounce">
                <Heart className="w-8 h-8 text-white" fill="currentColor" />
              </div>

              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Thank You!
              </h1>

              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
                  Dear {guestData.name}
                </h2>
                
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-lg mx-auto">
                  Your presence at our engagement celebration filled our hearts with joy. 
                  Thank you for being part of our special day and sharing in our happiness.
                </p>

                <p className="text-lg text-gray-600 italic">
                  Your love and support mean the world to us!
                </p>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <p className="text-2xl font-script text-gray-700" style={{ fontFamily: "Dancing Script, cursive" }}>
                  With love and gratitude,
                </p>
                <p className="text-3xl font-script mt-2 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent" style={{ fontFamily: "Dancing Script, cursive" }}>
                  Imad & Nour
                </p>
              </div>

              {/* Decorative Elements */}
              <div className="flex justify-center items-center gap-4 pt-4">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                <Heart className="w-6 h-6 text-pink-500" fill="currentColor" />
                <Sparkles className="w-5 h-5 text-yellow-500" />
              </div>
            </div>
          </Card>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }
        
        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(-10deg);
          }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite;
          animation-delay: 2s;
        }
        
        .delay-300 {
          animation-delay: 300ms;
        }
      `}</style>
    </div>
  )
}