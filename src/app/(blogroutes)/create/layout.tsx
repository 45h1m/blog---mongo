export default function CreateLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="sm:container">
            <h1 className="text-3xl pt-10 text-center font-bold p-4 bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">Excited to see what you create </h1>
            <main className="w-full xl:w-3/5 md:w-3/5 lg:w-3/4 pt-4">{children}</main>
        </div>
    );
}
