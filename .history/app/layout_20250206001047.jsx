// Import global CSS styles
import "@/styles/globals.css";

// Import the Link component from the @heroui/link library
import { Link } from "@heroui/link";

// Import the clsx utility for conditional className construction
import clsx from "clsx";

// Import the Providers component, which likely sets up context providers for the application
import { Providers } from "./providers";

// Import site configuration settings
import { siteConfig } from "@/config/site";

// Import a custom font configuration
import { fontSans } from "@/config/fonts";
// Import the Navbar component
import { Navbar } from "@/components/navbar";

// Define metadata for the application, including default and template titles, description, and icons
export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

// Define viewport settings, including theme colors for light and dark modes
export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

// Define the RootLayout component, which serves as the root layout for the application
export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        {/* Wrap the application with Providers to supply necessary context */}
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            {/* Render the Navbar component at the top */}
            <Navbar />
            {/* Main content area with responsive padding and maximum width */}
            <main className="container max-w-7xl px-6 flex-grow">
              {children}
            </main>
            {/* Footer section with centered content */}
            <footer className="w-full flex items-center justify-center py-3">
              {/* External link to the heroui.com homepage */}
              <Link
                isExternal
                className="flex items-center gap-1 text-current"
                href="https://heroui.com?utm_source=next-app-template"
                title="heroui.com homepage"
              >
                &copy; {new Date().getFullYear()} Cargo Express. All rights
                reserved.
              </Link>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
