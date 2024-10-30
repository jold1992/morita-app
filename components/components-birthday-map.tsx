'use client'

import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

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

L.Marker.prototype.options.icon = DefaultIcon

type Message = {
  id: number
  content: string
  type: 'text' | 'video'
  location: [number, number]
  sender: string
}

export function BirthdayMapComponent() {
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    // Fetch messages from API
    const fetchMessages = async () => {
      // Replace with actual API call
      const response = await fetch('/api/messages')
      const data = await response.json()
      setMessages(data)
    }
    fetchMessages()
  }, [])

  return (
    <div className="w-full h-96 mb-8 relative z-0">
      <MapContainer center={[0, 0]} zoom={2} style={{ height: '100%', width: '100%' }}>
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