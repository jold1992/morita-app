'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default marker icon in Leaflet with Next.js
const DefaultIcon = L.icon({
  iconUrl: '/leaflet/marker-icon.png',
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  shadowUrl: '/leaflet/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
})

type Message = {
  id: number
  content: string
  type: 'text' | 'video'
  location: [number, number]
  sender: string
}

interface LeafletMapProps {
  messages: Message[]
}

export default function LeafletMap({ messages }: LeafletMapProps) {
  useEffect(() => {
    // Fix Leaflet icon issue
    L.Marker.prototype.options.icon = DefaultIcon
  }, [])

  return (
    <div className="w-full h-96 mb-8 relative z-0">
      <MapContainer
        center={[0, 0]}
        zoom={2}
        style={{ height: '100%', width: '100%' }}
        key="map"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {messages.map((message) => (
          <Marker key={message.id} position={message.location}>
            <Popup>
              <strong>{message.sender}</strong>
              <p>{message.content.substring(0, 50)}...</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}