import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

export const metadata = {
    title: "ExamPlanner Pro - Smart Exam Coach",
    description: "Plan your studies efficiently with AI-powered roadmaps and smart task management",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body suppressHydrationWarning className="overflow-x-hidden">
                <ClientLayout>
                    {children}
                </ClientLayout>
            </body>
        </html>
    );
}
