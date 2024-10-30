'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

type Message = {
  id: string
  content: string
  type: 'video' | 'text'
  sender: string
  location: [number, number]
}

const SurpriseButton = () => {
  const [surpriseMessage, setSurpriseMessage] = useState<Message | null>(null)

  const getRandomMessage = () => {
    // Aquí normalmente harías una llamada a tu API para obtener un mensaje aleatorio
    // Por ahora, usaremos un mensaje de ejemplo
    setSurpriseMessage({
      id: '3',
      content: '¡Sorpresa! Feliz cumpleaños desde Tokio!',
      type: 'text',
      sender: 'Akira',
      location: [35.6762, 139.6503]
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={getRandomMessage} className="w-full mb-4">¡Sorpréndeme!</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mensaje Sorpresa</DialogTitle>
          <DialogDescription>
            {surpriseMessage && (
              <div>
                <p><strong>{surpriseMessage.sender}</strong> dice:</p>
                <p>{surpriseMessage.content}</p>
                <p className="mt-2">Distancia: [Cálculo de distancia aquí]</p>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default SurpriseButton