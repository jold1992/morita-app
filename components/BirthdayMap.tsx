'use client'

import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Corrige el problema de los íconos de Leaflet en Next.js
//delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/mark.png',
  iconUrl: '/leaflet/mark.png',
  shadowUrl: '/leaflet/mark-shadow.png',
})

type Message = {
  id: string
  content: string
  type: 'video' | 'text'
  location: [number, number]
  sender: string
}

const BirthdayMap = () => {
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    // Aquí normalmente harías una llamada a tu API para obtener los mensajes
    // Por ahora, usaremos datos de ejemplo
    setMessages([
      { id: '1', content: 'Feliz cumpleaños desde Estados Unidos!', type: 'text', location: [40.7128, -74.0060], sender: 'Juan' },
      { id: '2', content: 'video-url', type: 'video', location: [48.8566, 2.3522], sender: 'María' },
      // Agrega más mensajes aquí
    ])

  }, [])

  return (
    <div className="w-full h-96 mb-8 relative z-0">
      <MapContainer key="map" center={[-2, -78]} zoom={6} style={{ height: '400px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {messages.map((message) => (
          <Marker key={message.id} position={message.location}>
            <Popup>
              <strong>{message.sender}</strong>
              <br />
              {message.type === 'text' ? message.content : 'Video mensaje'}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default BirthdayMap