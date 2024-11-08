import { Suspense } from 'react'
import BirthdayMap from '@/components/BirthdayMap'
import MessageList from '@/components/MessageList'
import SurpriseButton from '@/components/SurpriseButton'
import MapComponent from '@/components/Map'

export default function Home() {

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">¡Feliz Cumple Vane! 🎂🥳</h1>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
        <Suspense fallback={<div>Cargando mapa...</div>}>
          <BirthdayMap />
          {/* <MapComponent /> */}
        </Suspense>
        <div>
          {/* <MessageList /> */}
          <SurpriseButton />
        </div>
      </div>
    </div>
  )
}