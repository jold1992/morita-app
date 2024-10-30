'use client'

import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'

type Message = {
  id: string
  content: string
  type: 'video' | 'text'
  sender: string
  views: number
  likes: number
}

const MessageList = () => {
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    // Aquí normalmente harías una llamada a tu API para obtener los mensajes
    // Por ahora, usaremos datos de ejemplo
    setMessages([
      { id: '1', content: 'Feliz cumpleaños desde Nueva York!', type: 'text', sender: 'Juan', views: 3, likes: 2 },
      { id: '2', content: 'video-url', type: 'video', sender: 'María', views: 5, likes: 4 },
      // Agrega más mensajes aquí
    ])
  }, [])

  const handleLike = (id: string) => {
    setMessages(messages.map(msg =>
      msg.id === id ? { ...msg, likes: msg.likes + 1 } : msg
    ))
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Mensajes 💌</h2>
      {messages.map((message) => (
        <div key={message.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
          <p className="font-bold">{message.sender}</p>
          {message.type === 'text' ? (
            <p>{message.content}</p>
          ) : (
            <div className="bg-gray-200 h-32 flex items-center justify-center">
              [Video Placeholder]
            </div>
          )}
          <div className="mt-2 flex justify-between items-center">
            <span>Visto {message.views} veces</span>
            <button onClick={() => handleLike(message.id)} className="flex items-center">
              <Heart className="mr-1" /> {message.likes}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MessageList