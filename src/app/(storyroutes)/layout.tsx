import { ReactNode } from "react";

interface RootLayoutProps {
    children: ReactNode;
}

export default function StoryLayout({ children }:RootLayoutProps) {
    return (
        <html lang="en">
            <body>
                <h1>New layout</h1>
                <main>{children}</main>
            </body>
        </html>
    );
}
