import Navbar from '@/components/Navbar';
import Features from '@/components/Features';
import Footer from '@/components/Footer';

export default function FeaturesPage() {
    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Navbar />
            <div className="pt-20"> {/* Add padding for fixed navbar */}
                <Features />
            </div>
            <Footer />
        </main>
    );
}
