import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import SessionWrapper from "@/components/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: {
        default: "FireBit - Tech Blogs & Projects",
        template: "%s | FireBit",
    },
    description: "Explore tech blogs and innovative projects showcasing the latest in technology and development.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <head>
                <meta name="google-site-verification" content="Ge7fomK8okwU6ayD7aETWSjWAnWCxkZrX7vou_soiCE" />
            </head>
            <body className={inter.className + " bg-slate-100 dark:bg-slate-950"}>
                <SessionWrapper>
                    <Header />

                    {children}

                    <hr className="mt-20" />

                    <div className="bg-slate-50 dark:bg-slate-900">
                        <Footer />
                    </div>
                </SessionWrapper>

                <Toaster />
            </body>
        </html>
    );
}
