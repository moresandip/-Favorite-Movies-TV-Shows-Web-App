"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, ExternalLink, CheckCircle, XCircle, Clock } from "lucide-react"

interface VideoEntry {
  id: number
  title: string
  videoUrl?: string
  language: string
  type: "Movie" | "TV Show"
}

export function VideoDebug() {
  const [testResults, setTestResults] = useState<Record<number, "loading" | "success" | "error">>({})
  const [selectedVideo, setSelectedVideo] = useState<VideoEntry | null>(null)

  // Sample entries for testing
  const testEntries: VideoEntry[] = [
    {
      id: 1,
      title: "Inception",
      videoUrl: "https://www.youtube.com/watch?v=YoHD9XEInc0",
      language: "English",
      type: "Movie",
    },
    {
      id: 2,
      title: "3 Idiots",
      videoUrl: "https://www.youtube.com/watch?v=K0eDlFX9GMc",
      language: "Hindi",
      type: "Movie",
    },
    {
      id: 3,
      title: "Money Heist",
      videoUrl: "https://www.youtube.com/watch?v=_InqQJRqGW4",
      language: "Spanish",
      type: "TV Show",
    },
    {
      id: 4,
      title: "Sample Direct Video",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      language: "English",
      type: "Movie",
    },
  ]

  const testVideo = async (entry: VideoEntry) => {
    if (!entry.videoUrl) return

    setTestResults((prev) => ({ ...prev, [entry.id]: "loading" }))

    try {
      const isYouTube = entry.videoUrl.includes("youtube.com") || entry.videoUrl.includes("youtu.be")

      if (isYouTube) {
        // Test YouTube video by checking if embed URL loads
        const videoId = entry.videoUrl.includes("watch?v=")
          ? entry.videoUrl.split("v=")[1]?.split("&")[0]
          : entry.videoUrl.split("youtu.be/")[1]?.split("?")[0]

        if (videoId) {
          const embedUrl = `https://www.youtube.com/embed/${videoId}`
          const response = await fetch(embedUrl, { method: "HEAD", mode: "no-cors" })
          setTestResults((prev) => ({ ...prev, [entry.id]: "success" }))
        } else {
          setTestResults((prev) => ({ ...prev, [entry.id]: "error" }))
        }
      } else {
        // Test direct video URL
        const response = await fetch(entry.videoUrl, { method: "HEAD", mode: "no-cors" })
        setTestResults((prev) => ({ ...prev, [entry.id]: "success" }))
      }
    } catch (error) {
      setTestResults((prev) => ({ ...prev, [entry.id]: "error" }))
    }
  }

  const getYouTubeEmbedUrl = (url: string) => {
    let videoId = null

    if (url.includes("youtube.com/watch?v=")) {
      videoId = url.split("v=")[1]?.split("&")[0]
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0]
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1&rel=0` : url
  }

  const getStatusIcon = (status: "loading" | "success" | "error" | undefined) => {
    switch (status) {
      case "loading":
        return <Clock className="w-4 h-4 text-yellow-500 animate-spin" />
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "error":
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Video Playback Testing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {testEntries.map((entry) => (
              <div key={entry.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(testResults[entry.id])}
                  <div>
                    <h3 className="font-medium">{entry.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Badge variant="outline" className="text-xs">
                        {entry.language}
                      </Badge>
                      <Badge variant={entry.type === "Movie" ? "default" : "secondary"} className="text-xs">
                        {entry.type}
                      </Badge>
                      <span className="text-xs">
                        {entry.videoUrl?.includes("youtube") ? "YouTube" : "Direct Video"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => testVideo(entry)}
                    disabled={testResults[entry.id] === "loading"}
                  >
                    Test
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setSelectedVideo(entry)}>
                    <Play className="w-3 h-3 mr-1" />
                    Play
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => window.open(entry.videoUrl, "_blank")}>
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex gap-2">
            <Button onClick={() => testEntries.forEach(testVideo)}>Test All Videos</Button>
            <Button variant="outline" onClick={() => setTestResults({})}>
              Clear Results
            </Button>
          </div>
        </CardContent>
      </Card>

      {selectedVideo && (
        <Card>
          <CardHeader>
            <CardTitle>Now Playing: {selectedVideo.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              {selectedVideo.videoUrl?.includes("youtube") ? (
                <iframe
                  src={getYouTubeEmbedUrl(selectedVideo.videoUrl)}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={selectedVideo.videoUrl}
                  className="w-full h-full object-contain"
                  controls
                  preload="metadata"
                />
              )}
            </div>
            <Button variant="outline" className="mt-4 bg-transparent" onClick={() => setSelectedVideo(null)}>
              Close Player
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
