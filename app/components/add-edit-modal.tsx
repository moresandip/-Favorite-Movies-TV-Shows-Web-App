"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { MovieTVShow } from "../page"

interface AddEditModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: Omit<MovieTVShow, "id" | "createdAt" | "updatedAt">) => void
  editingEntry: MovieTVShow | null
}

export function AddEditModal({ isOpen, onClose, onSubmit, editingEntry }: AddEditModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    originalTitle: "",
    type: "Movie" as "Movie" | "TV Show",
    director: "",
    budget: "",
    location: "",
    duration: "",
    yearTime: "",
    genre: "",
    rating: "",
    description: "",
    videoUrl: "",
    language: "",
    country: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (editingEntry) {
      setFormData({
        title: editingEntry.title,
        originalTitle: editingEntry.originalTitle || "",
        type: editingEntry.type,
        director: editingEntry.director,
        budget: editingEntry.budget,
        location: editingEntry.location,
        duration: editingEntry.duration,
        yearTime: editingEntry.yearTime,
        genre: editingEntry.genre || "",
        rating: editingEntry.rating?.toString() || "",
        description: editingEntry.description || "",
        videoUrl: editingEntry.videoUrl || "",
        language: editingEntry.language || "",
        country: editingEntry.country || "",
      })
    } else {
      setFormData({
        title: "",
        originalTitle: "",
        type: "Movie",
        director: "",
        budget: "",
        location: "",
        duration: "",
        yearTime: "",
        genre: "",
        rating: "",
        description: "",
        videoUrl: "",
        language: "",
        country: "",
      })
    }
    setErrors({})
  }, [editingEntry, isOpen])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) newErrors.title = "Title is required"
    if (!formData.director.trim()) newErrors.director = "Director is required"
    if (!formData.budget.trim()) newErrors.budget = "Budget is required"
    if (!formData.location.trim()) newErrors.location = "Location is required"
    if (!formData.duration.trim()) newErrors.duration = "Duration is required"
    if (!formData.yearTime.trim()) newErrors.yearTime = "Year/Time is required"
    if (!formData.language.trim()) newErrors.language = "Language is required"
    if (!formData.country.trim()) newErrors.country = "Country is required"

    if (
      formData.rating &&
      (isNaN(Number(formData.rating)) || Number(formData.rating) < 0 || Number(formData.rating) > 10)
    ) {
      newErrors.rating = "Rating must be a number between 0 and 10"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    const submitData = {
      ...formData,
      rating: formData.rating ? Number(formData.rating) : undefined,
    }

    onSubmit(submitData)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editingEntry ? "Edit Entry" : "Add New Entry"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter title"
                className={errors.title ? "border-destructive" : ""}
              />
              {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type *</Label>
              <Select
                value={formData.type}
                onValueChange={(value: "Movie" | "TV Show") => handleInputChange("type", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Movie">Movie</SelectItem>
                  <SelectItem value="TV Show">TV Show</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="director">Director *</Label>
              <Input
                id="director"
                value={formData.director}
                onChange={(e) => handleInputChange("director", e.target.value)}
                placeholder="Enter director name"
                className={errors.director ? "border-destructive" : ""}
              />
              {errors.director && <p className="text-sm text-destructive">{errors.director}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget">Budget *</Label>
              <Input
                id="budget"
                value={formData.budget}
                onChange={(e) => handleInputChange("budget", e.target.value)}
                placeholder="e.g., $160M or $3M/ep"
                className={errors.budget ? "border-destructive" : ""}
              />
              {errors.budget && <p className="text-sm text-destructive">{errors.budget}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="Filming location"
                className={errors.location ? "border-destructive" : ""}
              />
              {errors.location && <p className="text-sm text-destructive">{errors.location}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration *</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => handleInputChange("duration", e.target.value)}
                placeholder="e.g., 148 min or 49 min/ep"
                className={errors.duration ? "border-destructive" : ""}
              />
              {errors.duration && <p className="text-sm text-destructive">{errors.duration}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="yearTime">Year/Time *</Label>
              <Input
                id="yearTime"
                value={formData.yearTime}
                onChange={(e) => handleInputChange("yearTime", e.target.value)}
                placeholder="e.g., 2010 or 2008-2013"
                className={errors.yearTime ? "border-destructive" : ""}
              />
              {errors.yearTime && <p className="text-sm text-destructive">{errors.yearTime}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="genre">Genre</Label>
              <Input
                id="genre"
                value={formData.genre}
                onChange={(e) => handleInputChange("genre", e.target.value)}
                placeholder="e.g., Sci-Fi, Drama, Comedy"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rating">Rating (0-10)</Label>
              <Input
                id="rating"
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={formData.rating}
                onChange={(e) => handleInputChange("rating", e.target.value)}
                placeholder="e.g., 8.5"
                className={errors.rating ? "border-destructive" : ""}
              />
              {errors.rating && <p className="text-sm text-destructive">{errors.rating}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="originalTitle">Original Title</Label>
              <Input
                id="originalTitle"
                value={formData.originalTitle}
                onChange={(e) => handleInputChange("originalTitle", e.target.value)}
                placeholder="Original title (if different)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Language *</Label>
              <Select value={formData.language} onValueChange={(value: string) => handleInputChange("language", value)}>
                <SelectTrigger className={errors.language ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
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
              {errors.language && <p className="text-sm text-destructive">{errors.language}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country *</Label>
              <Input
                id="country"
                value={formData.country}
                onChange={(e) => handleInputChange("country", e.target.value)}
                placeholder="Country of origin"
                className={errors.country ? "border-destructive" : ""}
              />
              {errors.country && <p className="text-sm text-destructive">{errors.country}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Brief description or notes"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="videoUrl">Video URL</Label>
            <Input
              id="videoUrl"
              value={formData.videoUrl}
              onChange={(e) => handleInputChange("videoUrl", e.target.value)}
              placeholder="https://www.youtube.com/watch?v=... or direct video file URL"
            />
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• YouTube: https://www.youtube.com/watch?v=VIDEO_ID</p>
              <p>• YouTube Short: https://youtu.be/VIDEO_ID</p>
              <p>• Direct video: https://example.com/video.mp4</p>
              <p>• Supported formats: .mp4, .webm, .ogg</p>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{editingEntry ? "Update Entry" : "Add Entry"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
