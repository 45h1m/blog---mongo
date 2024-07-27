export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="sm:container">
            <main className="pt-4">{children}</main>
        </div>
    );
}
