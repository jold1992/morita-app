import dynamic from 'next/dynamic';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';

// Props para el componente MapWrapper
interface MapWrapperProps {
    onLocationSelect: (coords: { lat: number; lng: number }) => void;
}

// Componente Marker que selecciona la posición al hacer clic
const LocationMarker: React.FC<MapWrapperProps> = ({ onLocationSelect }) => {
    const [position, setPosition] = useState<LatLngExpression | null>(null);

    useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            setPosition([lat, lng]);
            onLocationSelect({ lat, lng });
        },
    });

    return position ? <Marker position={position} /> : null;
};

// Componente principal del mapa
const MapWrapper: React.FC<MapWrapperProps> = ({ onLocationSelect }) => {
    return (
        <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarker onLocationSelect={onLocationSelect} />
        </MapContainer>
    );
};

export default MapWrapper;