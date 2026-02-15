export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-black py-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Privacy Policy</h1>
                <div className="prose dark:prose-invert max-w-none space-y-6 text-gray-700 dark:text-gray-300">
                    <p>Last updated: {new Date().toLocaleDateString()}</p>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Information We Collect</h2>
                        <p>
                            We collect information that you provide directly to us, such as when you create an account, update your profile, or communicate with us. This may include:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li>Name and contact information</li>
                            <li>Educational background and study goals</li>
                            <li>Usage data and preferences</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. How We Use Your Information</h2>
                        <p>
                            We use the information we collect to:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li>Provide, maintain, and improve our services</li>
                            <li>Generate personalized study plans and roadmaps</li>
                            <li>Send you technical notices, updates, and support messages</li>
                            <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Data Security</h2>
                        <p>
                            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, please note that no method of transmission over the Internet or method of electronic storage is 100% secure.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Third-Party Services</h2>
                        <p>
                            Our service may contain links to third-party websites or services that are not owned or controlled by ExamPlanner Pro. We are not responsible for the privacy practices of such third parties.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
