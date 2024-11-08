'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { toast } from '@/components/ui/use-toast'

import LocationPicker from './LocationPicker';
import MapComponent from './Map'

// Definimos el tipo para las coordenadas de ubicación
interface Coordinates {
    lat: number;
    lng: number;
}

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const ACCEPTED_VIDEO_TYPES = ['video/mp4', 'video/quicktime', 'video/x-msvideo'];

const formSchema = z.object({
    sender: z.string().min(2, {
        message: 'El nombre debe tener al menos 2 caracteres.',
    }),
    content: z.string().min(10, {
        message: 'El mensaje debe tener al menos 10 caracteres.',
    }),
    type: z.enum(['text', 'video']),
    location: z.string().min(2, {
        message: 'Por favor, selecciona una ubicación en el mapa.',
    }),
    videoFile: z.instanceof(File).optional().or(z.literal(undefined)),
})

export function GreetingForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [selectedLocation, setSelectedLocation] = useState<string>('')

    const [showModal, setShowModal] = useState<boolean>(false);
    const [forceUnmountMap, setForceUnmountMap] = useState<boolean>(false);
    const [location, setLocation] = useState<Coordinates>({ lat: 0, lng: 0 });

    const handleOpenModal = () => {
        setForceUnmountMap(false); // Asegura que el mapa esté montado al abrir el modal
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setForceUnmountMap(true); // Fuerza el desmontaje del mapa al cerrar el modal
    };

    const handleLocationSelect = (coords: Coordinates) => {
        setLocation(coords); // Actualiza la ubicación seleccionada
        handleCloseModal(); // Cierra el modal
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            sender: '',
            content: '',
            type: 'text',
            location: '',
            videoFile: undefined,
        },
    })

    const watchType = form.watch("type")

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true)
        try {
            const formData = new FormData()
            Object.entries(values).forEach(([key, value]) => {
                if (key === 'videoFile' && value instanceof File) {
                    formData.append(key, value)
                } else if (typeof value === 'string') {
                    formData.append(key, value)
                }
            })

            const response = await fetch('/api/greetings', {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                throw new Error('Error al enviar el saludo')
            }

            toast({
                title: 'Saludo enviado',
                description: 'Tu mensaje ha sido registrado exitosamente.',
            })
            form.reset()
            setSelectedLocation('')
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Hubo un problema al enviar tu saludo. Por favor, intenta de nuevo.',
                variant: 'destructive',
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="sender"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                                <Input placeholder="Tu nombre" {...field} />
                            </FormControl>
                            <FormDescription>
                                El nombre que aparecerá junto a tu mensaje.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tipo de mensaje</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona el tipo de mensaje" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="text">Texto</SelectItem>
                                    <SelectItem value="video">Video</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                Elige si quieres enviar un mensaje de texto o un video.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {watchType === 'text' && (
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mensaje</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Escribe tu mensaje de cumpleaños aquí"
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Tu mensaje de felicitación o buenos deseos.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                {watchType === 'video' && (
                    <FormField
                        control={form.control}
                        name="videoFile"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Video</FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        accept=".mp4,.mov,.avi"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0]
                                            field.onChange(file)
                                        }}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Sube un video de felicitación (máximo 50MB, formatos: .mp4, .mov, .avi)
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Ubicación</FormLabel>
                            <FormControl>
                                <div className="space-y-2">
                                    <Input {...field} placeholder="Haz clic para seleccionar ubicación" value={`Lat: ${location.lat}, Lng: ${location.lng}`} onClick={handleOpenModal} readOnly />
                                    <MapComponent
                                        onLocationSelect={handleLocationSelect}
                                    />
                                </div>
                            </FormControl>
                            <FormDescription>
                                Selecciona tu ubicación en el mapa.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Enviando...' : 'Enviar saludo'}
                </Button>
            </form>
        </Form>
    )
}