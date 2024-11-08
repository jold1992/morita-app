import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('./Map'), { ssr: false });

interface LocationPickerProps {
    show: boolean;
    onHide: () => void;
    onLocationSelect: (coords: { lat: number; lng: number }) => void;
}

const LocationPicker: React.FC<LocationPickerProps> = ({ show, onHide, onLocationSelect }) => {

    // Evita la carga del componente cuando el modal está cerrado
    if (!show) return null;


    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="relative w-full max-w-3xl p-4 bg-white rounded-lg shadow-lg">
                <div className="flex justify-between items-center border-b pb-2 mb-4">
                    <h2 className="text-lg font-semibold">Selecciona tu ubicación</h2>
                    <button
                        onClick={onHide}
                        className="text-gray-400 hover:text-gray-600 transition duration-200"
                    >
                        ✕
                    </button>
                </div>
                <div className="h-96 w-full">
                    {/* Renderiza MapComponent solo cuando el modal esté abierto */}
                    <MapComponent onLocationSelect={onLocationSelect} />
                </div>
            </div>
        </div>
    );
};

export default LocationPicker;
