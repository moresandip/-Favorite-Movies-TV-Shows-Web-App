"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Plus, Edit, Trash2, Search, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AddEditModal } from "./components/add-edit-modal"
import { DeleteConfirmModal } from "./components/delete-confirm-modal"
import { useToast } from "@/hooks/use-toast"
import { VideoPlayerModal } from "./components/video-player-modal"

export interface MovieTVShow {
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
}

export default function HomePage() {
  const [entries, setEntries] = useState<MovieTVShow[]>([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<"all" | "Movie" | "TV Show">("all")
  const [filterLanguage, setFilterLanguage] = useState<string>("all")
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editingEntry, setEditingEntry] = useState<MovieTVShow | null>(null)
  const [deletingEntry, setDeleteingEntry] = useState<MovieTVShow | null>(null)
  const observerRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const [playingVideo, setPlayingVideo] = useState<MovieTVShow | null>(null)
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false)

  const fetchEntries = useCallback(
    async (pageNum: number, reset = false) => {
      if (loading) return

      setLoading(true)
      try {
        const params = new URLSearchParams({
          page: pageNum.toString(),
          limit: "10",
          search: searchTerm,
          type: filterType === "all" ? "" : filterType,
          language: filterLanguage === "all" ? "" : filterLanguage,
        })

        const response = await fetch(`/api/entries?${params}`)
        const data = await response.json()

        if (response.ok) {
          if (reset) {
            setEntries(data.entries)
          } else {
            setEntries((prev) => [...prev, ...data.entries])
          }
          setHasMore(data.hasMore)
        } else {
          toast({
            title: "Error",
            description: data.error || "Failed to fetch entries",
            variant: "destructive",
          })
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch entries",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    },
    [loading, searchTerm, filterType, filterLanguage, toast],
  )

  useEffect(() => {
    setPage(1)
    fetchEntries(1, true)
  }, [searchTerm, filterType, filterLanguage])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          const nextPage = page + 1
          setPage(nextPage)
          fetchEntries(nextPage)
        }
      },
      { threshold: 1.0 },
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => observer.disconnect()
  }, [hasMore, loading, page, fetchEntries])

  const handleAddEdit = async (data: Omit<MovieTVShow, "id" | "createdAt" | "updatedAt">) => {
    try {
      const url = editingEntry ? `/api/entries/${editingEntry.id}` : "/api/entries"
      const method = editingEntry ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        toast({
          title: "Success",
          description: `Entry ${editingEntry ? "updated" : "added"} successfully`,
        })
        setIsAddEditModalOpen(false)
        setEditingEntry(null)
        setPage(1)
        fetchEntries(1, true)
      } else {
        toast({
          title: "Error",
          description: result.error || `Failed to ${editingEntry ? "update" : "add"} entry`,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${editingEntry ? "update" : "add"} entry`,
        variant: "destructive",
      })
    }
  }

  const handleDelete = async () => {
    if (!deletingEntry) return

    try {
      const response = await fetch(`/api/entries/${deletingEntry.id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Entry deleted successfully",
        })
        setIsDeleteModalOpen(false)
        setDeleteingEntry(null)
        setPage(1)
        fetchEntries(1, true)
      } else {
        const result = await response.json()
        toast({
          title: "Error",
          description: result.error || "Failed to delete entry",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete entry",
        variant: "destructive",
      })
    }
  }

  const openEditModal = (entry: MovieTVShow) => {
    setEditingEntry(entry)
    setIsAddEditModalOpen(true)
  }

  const openDeleteModal = (entry: MovieTVShow) => {
    setDeleteingEntry(entry)
    setIsDeleteModalOpen(true)
  }

  const openVideoPlayer = (entry: MovieTVShow) => {
    if (!entry.videoUrl || entry.videoUrl.trim() === "") {
      toast({
        title: "No Video Available",
        description: "This entry doesn't have a video URL configured.",
        variant: "destructive",
      })
      return
    }

    // Check if URL looks valid
    const url = entry.videoUrl.trim()
    const isValidUrl = url.startsWith("http://") || url.startsWith("https://")

    if (!isValidUrl) {
      toast({
        title: "Invalid Video URL",
        description: "The video URL appears to be invalid. Please check the URL format.",
        variant: "destructive",
      })
      return
    }

    setPlayingVideo(entry)
    setIsVideoPlayerOpen(true)
  }

  const formatBudget = (budget: string) => {
    if (budget.includes("$")) return budget
    return `$${budget}`
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Favorite Movies & TV Shows</h1>
            <p className="text-muted-foreground">Manage your collection of favorite entertainment</p>
          </div>
          <Button onClick={() => setIsAddEditModalOpen(true)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add New Entry
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Search & Filter
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search by title, director, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <Select value={filterType} onValueChange={(value: "all" | "Movie" | "TV Show") => setFilterType(value)}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Movie">Movies</SelectItem>
                  <SelectItem value="TV Show">TV Shows</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterLanguage} onValueChange={(value: string) => setFilterLanguage(value)}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Languages</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Spanish">Spanish</SelectItem>
                  <SelectItem value="French">French</SelectItem>
                  <SelectItem value="German">German</SelectItem>
                  <SelectItem value="Italian">Italian</SelectItem>
                  <SelectItem value="Japanese">Japanese</SelectItem>
                  <SelectItem value="Korean">Korean</SelectItem>
                  <SelectItem value="Chinese">Chinese</SelectItem>
                  <SelectItem value="Hindi">Hindi</SelectItem>
                  <SelectItem value="Arabic">Arabic</SelectItem>
                  <SelectItem value="Russian">Russian</SelectItem>
                  <SelectItem value="Portuguese">Portuguese</SelectItem>
                  <SelectItem value="Dutch">Dutch</SelectItem>
                  <SelectItem value="Swedish">Swedish</SelectItem>
                  <SelectItem value="Norwegian">Norwegian</SelectItem>
                  <SelectItem value="Danish">Danish</SelectItem>
                  <SelectItem value="Finnish">Finnish</SelectItem>
                  <SelectItem value="Turkish">Turkish</SelectItem>
                  <SelectItem value="Greek">Greek</SelectItem>
                  <SelectItem value="Polish">Polish</SelectItem>
                  <SelectItem value="Czech">Czech</SelectItem>
                  <SelectItem value="Hungarian">Hungarian</SelectItem>
                  <SelectItem value="Romanian">Romanian</SelectItem>
                  <SelectItem value="Bulgarian">Bulgarian</SelectItem>
                  <SelectItem value="Croatian">Croatian</SelectItem>
                  <SelectItem value="Serbian">Serbian</SelectItem>
                  <SelectItem value="Slovak">Slovak</SelectItem>
                  <SelectItem value="Slovenian">Slovenian</SelectItem>
                  <SelectItem value="Estonian">Estonian</SelectItem>
                  <SelectItem value="Latvian">Latvian</SelectItem>
                  <SelectItem value="Lithuanian">Lithuanian</SelectItem>
                  <SelectItem value="Ukrainian">Ukrainian</SelectItem>
                  <SelectItem value="Belarusian">Belarusian</SelectItem>
                  <SelectItem value="Macedonian">Macedonian</SelectItem>
                  <SelectItem value="Albanian">Albanian</SelectItem>
                  <SelectItem value="Bosnian">Bosnian</SelectItem>
                  <SelectItem value="Montenegrin">Montenegrin</SelectItem>
                  <SelectItem value="Maltese">Maltese</SelectItem>
                  <SelectItem value="Irish">Irish</SelectItem>
                  <SelectItem value="Welsh">Welsh</SelectItem>
                  <SelectItem value="Scottish Gaelic">Scottish Gaelic</SelectItem>
                  <SelectItem value="Basque">Basque</SelectItem>
                  <SelectItem value="Catalan">Catalan</SelectItem>
                  <SelectItem value="Galician">Galician</SelectItem>
                  <SelectItem value="Occitan">Occitan</SelectItem>
                  <SelectItem value="Breton">Breton</SelectItem>
                  <SelectItem value="Corsican">Corsican</SelectItem>
                  <SelectItem value="Sardinian">Sardinian</SelectItem>
                  <SelectItem value="Sicilian">Sicilian</SelectItem>
                  <SelectItem value="Neapolitan">Neapolitan</SelectItem>
                  <SelectItem value="Venetian">Venetian</SelectItem>
                  <SelectItem value="Lombard">Lombard</SelectItem>
                  <SelectItem value="Piedmontese">Piedmontese</SelectItem>
                  <SelectItem value="Ligurian">Ligurian</SelectItem>
                  <SelectItem value="Emilian-Romagnol">Emilian-Romagnol</SelectItem>
                  <SelectItem value="Friulian">Friulian</SelectItem>
                  <SelectItem value="Ladin">Ladin</SelectItem>
                  <SelectItem value="Romansh">Romansh</SelectItem>
                  <SelectItem value="Luxembourgish">Luxembourgish</SelectItem>
                  <SelectItem value="Faroese">Faroese</SelectItem>
                  <SelectItem value="Icelandic">Icelandic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="min-w-[150px]">Director</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead className="min-w-[150px]">Location</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Year/Time</TableHead>
                  <TableHead className="min-w-[100px]">Language</TableHead>
                  <TableHead className="min-w-[100px]">Country</TableHead>
                  <TableHead className="min-w-[120px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entries.map((entry) => (
                  <TableRow key={entry.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      <div>
                        <div className="font-semibold">{entry.title}</div>
                        {entry.genre && <div className="text-sm text-muted-foreground">{entry.genre}</div>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={entry.type === "Movie" ? "default" : "secondary"}>{entry.type}</Badge>
                    </TableCell>
                    <TableCell>{entry.director}</TableCell>
                    <TableCell className="font-mono">{formatBudget(entry.budget)}</TableCell>
                    <TableCell>{entry.location}</TableCell>
                    <TableCell>{entry.duration}</TableCell>
                    <TableCell>{entry.yearTime}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {entry.language}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{entry.country}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {entry.videoUrl && entry.videoUrl.trim() !== "" ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openVideoPlayer(entry)}
                            className="flex items-center gap-1 text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200"
                          >
                            <Play className="w-3 h-3 fill-current" />
                            Watch
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            disabled
                            className="flex items-center gap-1 text-gray-400 bg-gray-50 border-gray-200 cursor-not-allowed"
                            title="No video available for this entry"
                          >
                            <Play className="w-3 h-3" />
                            No Video
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditModal(entry)}
                          className="flex items-center gap-1"
                        >
                          <Edit className="w-3 h-3" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openDeleteModal(entry)}
                          className="flex items-center gap-1 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-3 h-3" />
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {loading && (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}

          {!loading && entries.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No entries found. Add your first movie or TV show!</p>
            </div>
          )}

          <div ref={observerRef} className="h-4" />
        </CardContent>
      </Card>

      <AddEditModal
        isOpen={isAddEditModalOpen}
        onClose={() => {
          setIsAddEditModalOpen(false)
          setEditingEntry(null)
        }}
        onSubmit={handleAddEdit}
        editingEntry={editingEntry}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setDeleteingEntry(null)
        }}
        onConfirm={handleDelete}
        entryTitle={deletingEntry?.title || ""}
      />

      <VideoPlayerModal
        isOpen={isVideoPlayerOpen}
        onClose={() => {
          setIsVideoPlayerOpen(false)
          setPlayingVideo(null)
        }}
        entry={playingVideo}
      />
    </div>
  )
}
