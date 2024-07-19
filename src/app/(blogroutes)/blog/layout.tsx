import AsideLeft from "@/components/AsideLeft";
import StoriesSection from "@/components/StoriesSection";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="sm:container">
            <div className="flex px-3 flex-col-reverse md:flex-row relative md:gap-3">
                <AsideLeft />

                <main className="w-full xl:w-3/5 md:w-3/5 lg:w-3/4 pt-4">{children}</main>
            </div>
            
            <StoriesSection />
        </div>
    );
}
