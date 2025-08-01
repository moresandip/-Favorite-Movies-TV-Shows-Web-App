"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function VideoTest() {
  const [testUrl, setTestUrl] = useState("")
  const [isYouTube, setIsYouTube] = useState(false)

  const testUrls = [
    {
      name: "YouTube - Inception Trailer",
      url: "https://www.youtube.com/watch?v=YoHD9XEInc0",
      type: "YouTube",
    },
    {
      name: "YouTube Short URL",
      url: "https://youtu.be/YoHD9XEInc0",
      type: "YouTube",
    },
    {
      name: "Direct MP4 - Big Buck Bunny",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      type: "Direct",
    },
    {
      name: "Direct MP4 - Elephant Dream",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      type: "Direct",
    },
  ]

  const getYouTubeEmbedUrl = (url: string) => {
    let videoId = null

    if (url.includes("youtube.com/watch?v=")) {
      videoId = url.split("v=")[1]?.split("&")[0]
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0]
    } else if (url.includes("youtube.com/embed/")) {
      videoId = url.split("embed/")[1]?.split("?")[0]
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1&rel=0` : url
  }

  const handleUrlTest = (url: string) => {
    setTestUrl(url)
    const isYT = url.includes("youtube.com") || url.includes("youtu.be")
    setIsYouTube(isYT)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Video Player Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {testUrls.map((test, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => handleUrlTest(test.url)}
              className="text-left justify-start"
            >
              <div>
                <div className="font-medium">{test.name}</div>
                <div className="text-xs text-muted-foreground">{test.type}</div>
              </div>
            </Button>
          ))}
        </div>

        <div className="space-y-2">
          <Input
            placeholder="Or paste your own video URL here..."
            value={testUrl}
            onChange={(e) => handleUrlTest(e.target.value)}
          />
        </div>

        {testUrl && (
          <div className="aspect-video bg-black rounded-lg overflow-hidden">
            {isYouTube ? (
              <iframe
                src={getYouTubeEmbedUrl(testUrl)}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video src={testUrl} className="w-full h-full object-contain" controls preload="metadata" />
            )}
          </div>
        )}

        <div className="text-sm text-muted-foreground">
          <p>
            <strong>Current URL:</strong> {testUrl || "None"}
          </p>
          <p>
            <strong>Type:</strong> {isYouTube ? "YouTube" : "Direct Video"}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
