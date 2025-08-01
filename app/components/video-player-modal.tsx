"use client"

import { useState, useRef, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Volume2, VolumeX, Maximize, X, ExternalLink } from "lucide-react"
import { Slider } from "@/components/ui/slider"

interface VideoPlayerModalProps {
  isOpen: boolean
  onClose: () => void
  entry: {
    id: number
    title: string
    originalTitle?: string
    type: "Movie" | "TV Show"
    director: string
    budget: string
    location: string
    duration: string
    yearTime: string
    genre?: string
    rating?: number
    description?: string
    videoUrl?: string
    language: string
    country: string
    createdAt: string
    updatedAt: string
  } | null
}

export function VideoPlayerModal({ isOpen, onClose, entry }: VideoPlayerModalProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isYouTube, setIsYouTube] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const [videoLoading, setVideoLoading] = useState(true)

  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (entry?.videoUrl) {
      const url = entry.videoUrl.toLowerCase()
      const isYouTubeUrl = url.includes("youtube.com") || url.includes("youtu.be") || url.includes("embed")
      setIsYouTube(isYouTubeUrl)

      // Reset player state when entry changes
      setIsPlaying(false)
      setCurrentTime(0)
      setDuration(0)
      setVideoError(false)
      setVideoLoading(true)
    }
  }, [entry])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateTime = () => setCurrentTime(video.currentTime)
    const updateDuration = () => setDuration(video.duration)

    video.addEventListener("timeupdate", updateTime)
    video.addEventListener("loadedmetadata", updateDuration)
    video.addEventListener("ended", () => setIsPlaying(false))

    return () => {
      video.removeEventListener("timeupdate", updateTime)
      video.removeEventListener("loadedmetadata", updateDuration)
      video.removeEventListener("ended", () => setIsPlaying(false))
    }
  }, [])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (value: number[]) => {
    const video = videoRef.current
    if (!video) return

    const newTime = (value[0] / 100) * duration
    video.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current
    if (!video) return

    const newVolume = value[0] / 100
    video.volume = newVolume
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    if (isMuted) {
      video.volume = volume
      setIsMuted(false)
    } else {
      video.volume = 0
      setIsMuted(true)
    }
  }

  const toggleFullscreen = () => {
    const container = containerRef.current
    if (!container) return

    if (!isFullscreen) {
      container.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const handleMouseMove = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false)
    }, 3000)
  }

  const getYouTubeEmbedUrl = (url: string) => {
    // Handle different YouTube URL formats
    let videoId = null

    // Standard youtube.com/watch?v= format
    if (url.includes("youtube.com/watch?v=")) {
      videoId = url.split("v=")[1]?.split("&")[0]
    }
    // Short youtu.be format
    else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0]
    }
    // Embed format
    else if (url.includes("youtube.com/embed/")) {
      videoId = url.split("embed/")[1]?.split("?")[0]
    }

    return videoId
      ? `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0&modestbranding=1&enablejsapi=1`
      : url
  }

  const openInNewTab = () => {
    if (entry?.videoUrl) {
      window.open(entry.videoUrl, "_blank")
    }
  }

  if (!entry) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] p-0">
        <div
          ref={containerRef}
          className="relative bg-black rounded-lg overflow-hidden"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => isPlaying && setShowControls(false)}
        >
          {/* Header */}
          <div
            className={`absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 to-transparent p-4 transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"}`}
          >
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div>
                  <h3 className="text-lg font-semibold">{entry.title}</h3>
                  {entry.originalTitle && <p className="text-sm text-white/70">({entry.originalTitle})</p>}
                </div>
                <Badge variant={entry.type === "Movie" ? "default" : "secondary"}>{entry.type}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={openInNewTab} className="text-white hover:bg-white/20">
                  <ExternalLink className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Video Player */}
          <div className="aspect-video bg-black">
            {isYouTube ? (
              <div className="relative w-full h-full">
                {videoLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                    <div className="text-white text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                      <p>Loading video...</p>
                    </div>
                  </div>
                )}
                <iframe
                  key={entry?.id} // Force re-render when entry changes
                  src={getYouTubeEmbedUrl(entry.videoUrl!)}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  onLoad={() => {
                    setVideoLoading(false)
                    setVideoError(false)
                  }}
                  onError={() => {
                    setVideoError(true)
                    setVideoLoading(false)
                  }}
                  style={{ border: "none" }}
                />
              </div>
            ) : (
              <video
                key={entry?.id} // Force re-render when entry changes
                ref={videoRef}
                src={entry.videoUrl}
                className="w-full h-full object-contain"
                poster={`/placeholder.svg?height=400&width=600&text=${encodeURIComponent(entry.title)}`}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onLoadStart={() => setVideoLoading(true)}
                onLoadedData={() => {
                  setVideoLoading(false)
                  setVideoError(false)
                }}
                onError={() => {
                  setVideoError(true)
                  setVideoLoading(false)
                }}
                preload="metadata"
                controls
                crossOrigin="anonymous"
              />
            )}
          </div>

          {/* Controls - Only show for direct video files, not YouTube */}
          {!isYouTube && (
            <div
              className={`absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"}`}
            >
              {/* Progress Bar */}
              <div className="mb-4">
                <Slider
                  value={[duration ? (currentTime / duration) * 100 : 0]}
                  onValueChange={handleSeek}
                  className="w-full"
                  step={0.1}
                />
                <div className="flex justify-between text-xs text-white/70 mt-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" onClick={togglePlay} className="text-white hover:bg-white/20">
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </Button>

                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={toggleMute} className="text-white hover:bg-white/20">
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </Button>
                    <div className="w-20">
                      <Slider
                        value={[isMuted ? 0 : volume * 100]}
                        onValueChange={handleVolumeChange}
                        className="w-full"
                        step={1}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-white text-sm">
                    <span className="text-white/70">Director:</span> {entry.director}
                  </div>
                  <Button variant="ghost" size="sm" onClick={toggleFullscreen} className="text-white hover:bg-white/20">
                    <Maximize className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Loading/Error State */}
          {!entry.videoUrl ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="text-white text-center">
                <p className="text-lg mb-2">No video available</p>
                <p className="text-sm text-white/70">Add a video URL to watch this {entry.type.toLowerCase()}</p>
              </div>
            </div>
          ) : videoError ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="text-white text-center">
                <p className="text-lg mb-2">Video failed to load</p>
                <p className="text-sm text-white/70 mb-4">
                  {isYouTube
                    ? "YouTube video may be restricted or unavailable"
                    : "Video file may be corrupted or inaccessible"}
                </p>
                <div className="flex gap-2 justify-center">
                  <Button
                    variant="outline"
                    className="text-white border-white hover:bg-white hover:text-black bg-transparent"
                    onClick={() => {
                      setVideoError(false)
                      setVideoLoading(true)
                      // Force iframe/video reload
                      const iframe = document.querySelector("iframe")
                      const video = videoRef.current
                      if (iframe && isYouTube) {
                        iframe.src = iframe.src
                      } else if (video && !isYouTube) {
                        video.load()
                      }
                    }}
                  >
                    Retry
                  </Button>
                  <Button
                    variant="outline"
                    className="text-white border-white hover:bg-white hover:text-black bg-transparent"
                    onClick={openInNewTab}
                  >
                    Open Original
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            videoLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="text-white text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                  <p>Loading video...</p>
                </div>
              </div>
            )
          )}
        </div>

        {/* Movie/Show Info */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Year:</span>
              <p className="font-medium">{entry.yearTime}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Duration:</span>
              <p className="font-medium">{entry.duration}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Language:</span>
              <p className="font-medium">{entry.language}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Country:</span>
              <p className="font-medium">{entry.country}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Budget:</span>
              <p className="font-medium">{entry.budget}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Location:</span>
              <p className="font-medium">{entry.location}</p>
            </div>
          </div>

          {entry.genre && (
            <div>
              <span className="text-muted-foreground text-sm">Genre:</span>
              <p className="font-medium">{entry.genre}</p>
            </div>
          )}

          {entry.rating && (
            <div>
              <span className="text-muted-foreground text-sm">Rating:</span>
              <p className="font-medium">{entry.rating}/10</p>
            </div>
          )}

          {entry.description && (
            <div>
              <span className="text-muted-foreground text-sm">Description:</span>
              <p className="text-sm leading-relaxed mt-1">{entry.description}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
