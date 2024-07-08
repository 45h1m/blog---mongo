import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: {
        default: "Flamer - Tech Blogs & Projects",
        template: "%s | Flamer",
    },
    description: "Explore tech blogs and innovative projects showcasing the latest in technology and development.",
};
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className + " bg-slate-100 dark:bg-slate-950"}>
                <Header />

                {children}

                <hr className="mt-20" />

                <div className="bg-slate-50 dark:bg-slate-900">
                    <Footer />
                </div>

                <Toaster />
            </body>
        </html>
    );
}
