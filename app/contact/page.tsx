import ContactForm from "@/components/ContactForm";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact | Integrate AI',
    description: 'Initiate protocol. Book your free AI strategy and automation consultation.',
};

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-[#030405]">
            <ContactForm />
        </main>
    );
}
