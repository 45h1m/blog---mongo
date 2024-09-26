import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import SessionWrapper from "@/components/SessionWrapper";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: {
        default: "FireBit - Tech Blogs & Projects",
        template: "%s | Firebit",
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
                <Script
                id="gtm"
                strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W34XZK24');`,
                    }}
                ></Script>
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
