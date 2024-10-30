'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

type Message = {
  id: number
  content: string
  type: 'text' | 'video'
  sender: string
  distance: number
}

export function SurpriseButtonComponent() {
  const [surpriseMessage, setSurpriseMessage] = useState<Message | null>(null)

  const handleSurprise = async () => {
    // Fetch a random message from the API
    const response = await fetch('/api/surprise')
    const message = await response.json()
    setSurpriseMessage(message)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={handleSurprise} className="w-full mb-4">
          ¡Sorpréndeme!
        </Button>
      </DialogTrigger>
      {surpriseMessage && (
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Mensaje sorpresa de {surpriseMessage.sender}</DialogTitle>
            <DialogDescription>
              Este mensaje está a {surpriseMessage.distance.toFixed(2)} km de distancia.
            </DialogDescription>
          </DialogHeader>
          <Card>
            <CardContent className="pt-6">
              {surpriseMessage.type === 'text' ? (
                <p>{surpriseMessage.content}</p>
              ) : (
                <video src={surpriseMessage.content} controls className="w-full" />
              )}
            </CardContent>
          </Card>
        </DialogContent>
      )}
    </Dialog>
  )
}