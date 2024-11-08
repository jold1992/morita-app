import { GreetingForm } from "@/components/GrettingForm";

export default function Saludos() {
    return (
        <div className="container mx-auto px-4 py-8 md:w-1/2 w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
                <GreetingForm />
            </div>
        </div>
    )
}