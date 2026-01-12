import { Inter, Orbitron, Exo_2 } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AuthProvider } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });
const exo2 = Exo_2({ subsets: ["latin"], variable: "--font-exo" });

export const metadata = {
  title: "AI Security Lab",
  description: "Educational platform for prompt injection defense.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable, orbitron.variable, exo2.variable)}>
        <AuthProvider>
          <Navbar />
          <main className="relative overflow-hidden min-h-screen">
            {/* Background effects */}
            <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none"></div>
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
