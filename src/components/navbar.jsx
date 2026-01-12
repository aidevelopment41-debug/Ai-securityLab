"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ArrowRight, Menu, X, ShieldCheck, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/useAuth"

const NAV_LINKS = [
  { 
    label: "Research & Projects", 
    href: "/research",
    hasDropdown: true,
    badge: "New" 
  },
  { label: "Services & Solutions", href: "/services" },
  { label: "Insights", href: "/insights" },
  { label: "Resources", href: "/resources" },
  { label: "About Us", href: "/about" },
]

const ANNOUNCEMENTS = [
  { text: "New Research: Prompt Injection in RAG Systems - 2026 Report", href: "/research/rag-security" },
  { text: "Webinar: Securing Agentic Workflows - Register Now", href: "/webinar" },
  { text: "Platform Update: Enhanced Context Filtering Live", href: "/updates" },
]

export function Navbar() {
  const [index, setIndex] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const handleLogout = () => {
    logout()
    setShowUserMenu(false)
  }

  return (
    <header className="fixed top-0 w-full z-50">
      <div className="bg-zinc-950 border-b border-white/5 text-primary-foreground text-[10px] md:text-xs py-2 px-4 text-center font-medium relative z-50 overflow-hidden h-9 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: "circOut" }}
            className="flex items-center gap-2 absolute w-full justify-center"
          >
            <span className="text-orange-500 font-bold uppercase tracking-widest text-[9px] lg:inline hidden">
              Security Alert:
            </span>
            <span className="text-zinc-300 truncate max-w-[200px] md:max-w-none">
              {ANNOUNCEMENTS[index].text}
            </span>
            <Link 
              href={ANNOUNCEMENTS[index].href} 
              className="text-white underline underline-offset-4 hover:text-orange-400 transition-colors flex items-center ml-2 shrink-0"
            >
              Analyze <ArrowRight className="h-3 w-3 ml-1" />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      <nav 
        className={cn(
          "relative w-full z-40 transition-all duration-500 transition-bezier",
          isScrolled 
            ? "bg-zinc-950/80 backdrop-blur-xl border-b border-orange-500/20 py-1 shadow-2xl" 
            : "bg-transparent py-4"
        )}
      >
        <div className="flex h-16  items-center justify-between px-14">
          
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="relative">
              <img src="/logoAIS2.svg" className="h-8 w-8 text-orange-500 transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 bg-orange-500/20 blur-xl rounded-full group-hover:bg-orange-500/40 transition-all" />
            </div>
            <span className="font-bold text-lg md:text-xl tracking-tighter leading-tight text-zinc-100">
              AI SECURITY<span className="text-orange-500">.</span>
              <span className="block text-zinc-500 font-mono text-[9px] tracking-[0.3em] uppercase">Laboratory</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-all flex items-center group relative"
              >
                {link.label}
                {link.hasDropdown && (
                  <ChevronDown className="h-3 w-3 ml-1 opacity-40 group-hover:rotate-180 transition-transform" />
                )}

              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">{user?.username || 'User'}</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-white/10 rounded-lg shadow-xl z-50"
                    >
                      <div className="p-2">
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-white/5 rounded transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <ShieldCheck className="w-4 h-4" />
                          Dashboard
                        </Link>
                        <Link
                          href="/profile"
                          className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-white/5 rounded transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <User className="w-4 h-4" />
                          Profile
                        </Link>
                        <hr className="my-2 border-white/10" />
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-white/5 rounded transition-colors w-full text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="text-xs font-semibold text-zinc-400 hover:text-white hidden sm:flex items-center gap-2 transition-colors"
                >
                  Login
                </Link>
                
                <Link href="/signup">
                  <Button size="sm" className="hidden sm:flex bg-orange-600 hover:bg-orange-500 text-white border-none shadow-lg shadow-orange-900/20">
                   Sign Up
                  </Button>
                </Link>
              </>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              className="lg:hidden p-2 text-zinc-100 hover:bg-white/5 rounded-full transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "100vh" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-zinc-950 border-t border-white/5 overflow-hidden"
            >
              <div className="container px-8 py-12 flex flex-col gap-8">
                {NAV_LINKS.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-3xl font-bold text-zinc-100 hover:text-orange-500 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                
                <div className="pt-8 border-t border-white/5 space-y-4">
                  <Button variant="outline" className="w-full text-zinc-300 border-zinc-800">Client Portal</Button>
                  <Button className="w-full bg-orange-600">Request Audit</Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}