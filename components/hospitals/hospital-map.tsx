"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Clock, Phone, ExternalLink, Loader2, Search, Star, Route } from "lucide-react"
import "leaflet/dist/leaflet.css" // Import Leaflet CSS
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from "react-leaflet"
import L from "leaflet"

// --- Custom Icon Definitions for Leaflet ---
const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: "custom-icon",
    html: `
      <div style="
        width: 30px; 
        height: 30px; 
        background: ${color}; 
        border: 3px solid white; 
        border-radius: 50%; 
        box-shadow: 0 2px 8px rgba(0,0,0,0.3); 
        display: flex; 
        align-items: center; 
        justify-content: center;
      ">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/>
        </svg>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15],
  })
}

const userIcon = L.divIcon({
  className: "user-icon",
  html: `
    <div style="position: relative;">
      <div style="width: 20px; height: 20px; background: #3b82f6; border: 3px solid white; border-radius: 50%; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>
      <div style="position: absolute; top: -4px; left: -4px; width: 28px; height: 28px; background: rgba(59, 130, 246, 0.3); border-radius: 50%; animation: pulse 2s infinite;"></div>
    </div>
  `,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
})

interface Hospital {
  id: string
  name: string
  type: "emergency" | "general" | "clinic"
  distance: string
  time: string
  address: string
  phone: string
  available: boolean
  lat: number
  lng: number
  rating?: number
}

interface HospitalMapProps {
  filter: "all" | "emergency" | "general"
}

// Component to handle map view updates
function MapUpdater({ center, zoom }: { center: [number, number]; zoom?: number }) {
  const map = useMap()
  useEffect(() => {
    map.flyTo(center, zoom || map.getZoom())
  }, [center, zoom, map])
  return null
}

export function HospitalMap({ filter }: HospitalMapProps) {
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [hospitals, setHospitals] = useState<Hospital[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [directionsInfo, setDirectionsInfo] = useState<{ distance: string; duration: string } | null>(null)
  const [routePolyline, setRoutePolyline] = useState<[number, number][]>([])

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        () => {
          // Default to San Francisco if location denied
          setUserLocation({ lat: 37.7749, lng: -122.4194 })
        }
      )
    } else {
      setUserLocation({ lat: 37.7749, lng: -122.4194 })
    }
  }, [])

  // Calculate Distance (Haversine formula replacement for Google Geometry)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371 // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1)
    const dLon = deg2rad(lon2 - lon1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const d = R * c // Distance in km
    return d
  }

  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180)
  }

  // Search for nearby hospitals using Nominatim (OpenStreetMap Search API)
  const searchNearbyHospitals = useCallback(async () => {
    if (!userLocation) return
    setLoading(true)

    try {
      // In a real app, you would fetch from an API. 
      // For this demo, we will use the fallback data logic combined with 
      // the OpenStreetMap Nominatim API if a specific query is entered.
      
      let results: any[] = []

      if (searchQuery) {
        // Simple search using OSM Nominatim
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}&limit=10&viewbox=${userLocation.lng-0.1},${userLocation.lat-0.1},${userLocation.lng+0.1},${userLocation.lat+0.1}`
        )
        results = await response.json()
      }

      // If API returns nothing or no query, use enhanced demo logic
      if (results.length === 0) {
        const demoData = getDemoHospitals(userLocation)
        setHospitals(demoData)
        setLoading(false)
        return
      }

      // Process API results
      const hospitalData: Hospital[] = results.map((place, index) => {
        const lat = parseFloat(place.lat)
        const lng = parseFloat(place.lon)
        
        const distKm = calculateDistance(userLocation.lat, userLocation.lng, lat, lng)
        const timeMin = Math.round(distKm * 2) // Rough estimate: 30km/h avg speed

        let type: "emergency" | "general" | "clinic" = "general"
        const nameLower = place.display_name.toLowerCase()
        if (nameLower.includes("emergency") || nameLower.includes("trauma")) type = "emergency"
        else if (nameLower.includes("clinic") || nameLower.includes("urgent")) type = "clinic"

        return {
          id: place.place_id || `hospital-${index}`,
          name: place.name || place.display_name.split(",")[0],
          type,
          distance: `${distKm.toFixed(1)} km`,
          time: `${timeMin} min`,
          address: place.display_name.split(",").slice(1, 4).join(","),
          phone: "+1 (555) 000-0000",
          available: true,
          lat,
          lng,
          rating: 4.0 + Math.random(),
        }
      })

      setHospitals(hospitalData)
    } catch (error) {
      console.error("Search failed:", error)
      setHospitals(getDemoHospitals(userLocation))
    } finally {
      setLoading(false)
    }
  }, [userLocation, searchQuery])

  // Initial load
  useEffect(() => {
    if (userLocation) {
      searchNearbyHospitals()
    }
  }, [userLocation, searchNearbyHospitals])

  // Demo hospitals fallback
  const getDemoHospitals = (loc: { lat: number; lng: number }): Hospital[] => [
    {
      id: "1",
      name: "City General Hospital",
      type: "emergency",
      distance: "1.2 km",
      time: "5 min",
      address: "123 Medical Center Drive",
      phone: "+1 (555) 234-5678",
      available: true,
      lat: loc.lat + 0.008,
      lng: loc.lng + 0.005,
      rating: 4.5,
    },
    {
      id: "2",
      name: "Metro Emergency Center",
      type: "emergency",
      distance: "2.5 km",
      time: "8 min",
      address: "456 Emergency Avenue",
      phone: "+1 (555) 345-6789",
      available: true,
      lat: loc.lat - 0.006,
      lng: loc.lng + 0.012,
      rating: 4.2,
    },
    {
      id: "3",
      name: "Community Health Clinic",
      type: "clinic",
      distance: "0.8 km",
      time: "3 min",
      address: "789 Health Street",
      phone: "+1 (555) 456-7890",
      available: true,
      lat: loc.lat + 0.003,
      lng: loc.lng - 0.007,
      rating: 4.8,
    },
    {
      id: "4",
      name: "Regional Medical Center",
      type: "general",
      distance: "4.2 km",
      time: "12 min",
      address: "321 Hospital Boulevard",
      phone: "+1 (555) 567-8901",
      available: false,
      lat: loc.lat - 0.015,
      lng: loc.lng - 0.008,
      rating: 4.0,
    },
    {
      id: "5",
      name: "University Hospital",
      type: "general",
      distance: "5.8 km",
      time: "18 min",
      address: "555 University Avenue",
      phone: "+1 (555) 678-9012",
      available: true,
      lat: loc.lat + 0.018,
      lng: loc.lng - 0.003,
      rating: 4.7,
    },
  ]

  // Get directions (Calculated straight line for OSRM simulation)
  const getDirections = (hospital: Hospital) => {
    if (!userLocation) return

    // Draw line
    setRoutePolyline([
      [userLocation.lat, userLocation.lng],
      [hospital.lat, hospital.lng]
    ])

    // Set Info
    setDirectionsInfo({
      distance: hospital.distance,
      duration: hospital.time
    })
  }

  const clearDirections = () => {
    setRoutePolyline([])
    setDirectionsInfo(null)
  }

  // Open in Google Maps (External Link)
  const openExternalMap = (hospital: Hospital) => {
    const url = `https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=${userLocation?.lat},${userLocation?.lng};${hospital.lat},${hospital.lng}`
    window.open(url, "_blank")
  }

  const filteredHospitals = hospitals.filter((h) =>
    filter === "all" ? true : h.type === filter || h.type === "clinic",
  )

  const getTypeConfig = (type: string) => {
    switch (type) {
      case "emergency":
        return { color: "bg-emergency text-emergency-foreground", markerColor: "#ef4444", label: "Emergency" }
      case "general":
        return { color: "bg-primary text-primary-foreground", markerColor: "#3b82f6", label: "General" }
      case "clinic":
        return { color: "bg-success text-success-foreground", markerColor: "#22c55e", label: "Clinic" }
      default:
        return { color: "bg-muted text-muted-foreground", markerColor: "#64748b", label: "Unknown" }
    }
  }

  if (loading || !userLocation) {
    return (
      <div className="flex h-[500px] items-center justify-center rounded-lg border bg-muted/50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-primary" />
          <p className="text-muted-foreground">Finding hospitals near you...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
      
      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search hospitals, clinics, emergency centers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && searchNearbyHospitals()}
            className="pl-10"
          />
        </div>
        <Button onClick={searchNearbyHospitals}>Search</Button>
      </div>

      {/* Directions Info Banner */}
      {directionsInfo && (
        <div className="flex items-center justify-between rounded-lg bg-primary/10 p-3">
          <div className="flex items-center gap-4">
            <Route className="h-5 w-5 text-primary" />
            <div>
              <span className="font-medium">{directionsInfo.distance}</span>
              <span className="mx-2 text-muted-foreground">•</span>
              <span className="text-muted-foreground">{directionsInfo.duration} (Est.)</span>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={clearDirections}>
            Clear Route
          </Button>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Map View */}
        <Card className="lg:col-span-2 border-0 shadow-lg overflow-hidden">
          <CardContent className="p-0">
            <div className="relative h-[500px] w-full z-0">
              <MapContainer 
                center={[userLocation.lat, userLocation.lng]} 
                zoom={14} 
                style={{ height: "100%", width: "100%" }}
                scrollWheelZoom={true}
              >
                {/* Free OpenStreetMap Tiles */}
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {/* Update map center when selection changes */}
                <MapUpdater 
                  center={selectedHospital ? [selectedHospital.lat, selectedHospital.lng] : [userLocation.lat, userLocation.lng]} 
                  zoom={selectedHospital ? 16 : 14}
                />

                {/* User Location Marker */}
                <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
                  <Popup>You are here</Popup>
                </Marker>

                {/* Hospital Markers */}
                {filteredHospitals.map((hospital) => {
                  const config = getTypeConfig(hospital.type)
                  return (
                    <Marker 
                      key={hospital.id} 
                      position={[hospital.lat, hospital.lng]} 
                      icon={createCustomIcon(config.markerColor)}
                      eventHandlers={{
                        click: () => setSelectedHospital(hospital)
                      }}
                    >
                      <Popup>
                        <div className="font-semibold">{hospital.name}</div>
                        <div className="text-xs text-muted-foreground">{hospital.address}</div>
                      </Popup>
                    </Marker>
                  )
                })}

                {/* Route Line */}
                {routePolyline.length > 0 && (
                  <Polyline positions={routePolyline} color="#3b82f6" weight={5} opacity={0.7} />
                )}

              </MapContainer>

              {/* Legend (Overlay on top of MapContainer) */}
              <div className="absolute bottom-4 left-4 z-[400] rounded-lg bg-background/95 p-3 shadow-lg backdrop-blur">
                <p className="text-xs font-medium mb-2">Legend</p>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-emergency" />
                    <span className="text-xs">Emergency</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-primary" />
                    <span className="text-xs">General Hospital</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-success" />
                    <span className="text-xs">Clinic</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-500" />
                    <span className="text-xs">Your Location</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hospital List - (Unchanged logic) */}
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
          <p className="text-sm font-medium text-muted-foreground">{filteredHospitals.length} hospitals found nearby</p>

          {filteredHospitals.map((hospital) => {
            const typeConfig = getTypeConfig(hospital.type)
            const isSelected = selectedHospital?.id === hospital.id

            return (
              <Card
                key={hospital.id}
                className={`cursor-pointer transition-all border-0 shadow-sm hover:shadow-md ${
                  isSelected ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => {
                  setSelectedHospital(hospital)
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-semibold leading-tight">{hospital.name}</h3>
                      <p className="text-sm text-muted-foreground mt-0.5">{hospital.address}</p>
                    </div>
                    <Badge className={typeConfig.color}>{typeConfig.label}</Badge>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {hospital.distance}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {hospital.time}
                    </div>
                    {hospital.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-warning text-warning" />
                        {hospital.rating.toFixed(1)}
                      </div>
                    )}
                    <div
                      className={`flex items-center gap-1 ${
                        hospital.available ? "text-success" : "text-muted-foreground"
                      }`}
                    >
                      <div className={`h-2 w-2 rounded-full ${hospital.available ? "bg-success" : "bg-muted"}`} />
                      {hospital.available ? "Open" : "Closed"}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
                      <a href={`tel:${hospital.phone}`}>
                        <Phone className="mr-1.5 h-3.5 w-3.5" />
                        Call
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                      onClick={(e) => {
                        e.stopPropagation()
                        getDirections(hospital)
                      }}
                    >
                      <Route className="mr-1.5 h-3.5 w-3.5" />
                      Route
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="px-2"
                      onClick={(e) => {
                        e.stopPropagation()
                        openExternalMap(hospital)
                      }}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
