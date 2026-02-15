export default function CookiePage() {
    return (
        <div className="min-h-screen bg-white dark:bg-black py-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Cookie Policy</h1>
                <div className="prose dark:prose-invert max-w-none space-y-6 text-gray-700 dark:text-gray-300">
                    <p>Last updated: {new Date().toLocaleDateString()}</p>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. What Are Cookies</h2>
                        <p>
                            Cookies are small text files that are placed on your computer or mobile device by websites that you visit. They are widely used in order to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. How We Use Cookies</h2>
                        <p>
                            We use cookies for the following purposes:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li><strong>Essential Cookies:</strong> These are necessary for the website to function responsibly.</li>
                            <li><strong>Analytics Cookies:</strong> These help us understand how visitors interact with our website.</li>
                            <li><strong>Preference Cookies:</strong> These enable the website to remember information that changes the way the website behaves or looks, like your preferred language.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. How to Control Cookies</h2>
                        <p>
                            You can control and/or delete cookies as you wish - for details, see <a href="https://www.aboutcookies.org" className="text-blue-600 dark:text-blue-400 hover:underline">aboutcookies.org</a>. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. If you do this, however, you may have to manually adjust some preferences every time you visit a site and some services and functionalities may not work.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
