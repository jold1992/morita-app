'use client'

import React, { useRef, useEffect, useState } from 'react';
import {
    GoogleMap,
    LoadScript,
    StandaloneSearchBox,
    Marker,
} from '@react-google-maps/api';

const mapContainerStyle = {
    width: '100%',
    height: '400px',
};

interface MapComponentProps {
    onLocationSelect: (coords: { lat: number; lng: number }) => void;
}

const initialCenter = { lat: 40, lng: 0 };

const MapComponent: React.FC<MapComponentProps> = ({ onLocationSelect }) => {
    const mapRef = useRef<google.maps.Map | null>(null);
    const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);
    const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral>(initialCenter);
    const [markerPosition, setMarkerPosition] = useState<google.maps.LatLngLiteral>(initialCenter);
    const [apiKey, setApiKey] = useState('')

    useEffect(() => {
        setApiKey('')
    }, [])



    const handlePlacesChanged = () => {
        if (searchBoxRef.current) {
            const places = searchBoxRef.current.getPlaces();
            if (places && places.length > 0) {
                const place = places[0];
                const location = place.geometry?.location;
                if (location) {
                    onLocationSelect({ lat: location.lat(), lng: location.lng() });
                    const newPosition = { lat: location.lat(), lng: location.lng() };
                    setMapCenter(newPosition);
                    setMarkerPosition(newPosition);
                }
            }
        }
    };

    return (
        <LoadScript googleMapsApiKey={apiKey} libraries={['places']}>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={mapCenter}
                zoom={5}
                onLoad={(map) => (mapRef.current = map)}
            >
                <StandaloneSearchBox
                    onLoad={(ref) => (searchBoxRef.current = ref)}
                    onPlacesChanged={handlePlacesChanged}
                >
                    <input
                        type="text"
                        placeholder="Search for places"
                        style={{
                            boxSizing: 'border-box',
                            border: '1px solid transparent',
                            width: '240px',
                            height: '32px',
                            marginTop: '10px',
                            padding: '0 12px',
                            borderRadius: '3px',
                            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                            fontSize: '14px',
                            outline: 'none',
                            textOverflow: 'ellipses',
                            position: 'absolute',
                            left: '50%',
                            marginLeft: '-120px',
                        }}
                    />
                </StandaloneSearchBox>

                <Marker position={markerPosition} />
            </GoogleMap>
        </LoadScript>
    );
};

export default MapComponent;