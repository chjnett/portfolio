"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"
import type { Session } from "@supabase/supabase-js"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)

    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      setSession(data.session)
    }
    getSession()

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      authListener.subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setIsMobileMenuOpen(false)
  }

  const navItems = [
    { name: "소개", href: "#about" },
    { name: "서비스", href: "#services" },
    { name: "작업 예시", href: "#showcase" },
    { name: "프로젝트", href: "#projects" },
  ]

  const loggedInNavItems = [
    { name: "회원 전용 Q&A", href: "/qna" },
    { name: "오류 수정", href: "/bug-report" },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-lg border-b border-primary/20" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            DevLense
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground/80 hover:text-primary transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-cyan-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            {session &&
              loggedInNavItems.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-foreground/80 hover:text-primary transition-colors relative group ${index === 0 ? "animate-slide-in-left" : "animate-slide-in-right"}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-cyan-400 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            {session ? (
              <Button variant="outline" onClick={handleLogout}>
                로그아웃
              </Button>
            ) : (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button asChild>
                      <Link href="/login">로그인</Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>로그인을 하시면 오류수정과 Q&A를 하실 수 있습니다.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-foreground" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-foreground/80 hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            {session &&
              loggedInNavItems.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block text-foreground/80 hover:text-primary transition-colors ${index === 0 ? "animate-slide-in-left" : "animate-slide-in-right"}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.name}
                </Link>
              ))}
            {session ? (
              <Button variant="outline" className="w-full" onClick={handleLogout}>
                로그아웃
              </Button>
            ) : (
              <Button className="w-full" asChild>
                <Link href="/login">로그인</Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
