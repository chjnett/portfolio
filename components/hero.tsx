"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail, Briefcase, ArrowRight } from "lucide-react"

export function Hero() {
  const [text, setText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const fullText = "기획부터 배포까지\n빠르고 완벽한 웹사이트를 만들어드립니다"

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 50)

    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    return () => {
      clearInterval(timer)
      clearInterval(cursorTimer)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,183,235,0.08),transparent_50%)] animate-pulse" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,183,235,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,183,235,0.03)_1px,transparent_1px)] bg-[size:100px_100px] animate-float-slow" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="mb-8 inline-block animate-scale-in">
          <span className="px-4 py-2 bg-primary/20 border border-primary/50 rounded-full text-sm font-medium text-primary shadow-lg shadow-primary/20">
            프리랜서 웹 개발자
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-slide-in-left">
          <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
             비즈니스를 위한
          </span>
          <br />
          <span className="bg-gradient-to-r from-primary via-cyan-400 to-primary bg-clip-text text-transparent">
            완벽한 웹사이트
          </span>
        </h1>

        <div className="mb-12 h-24 flex items-center justify-center animate-slide-in-right">
          <p className="text-xl md:text-2xl text-muted-foreground whitespace-pre-line leading-relaxed">
            {text}
            {showCursor && <span className="inline-block w-0.5 h-6 bg-primary ml-1 animate-pulse" />}
          </p>
        </div>

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-scale-in"
          style={{ animationDelay: "0.3s" }}
        >
          <Button
            size="lg"
            className="group bg-gradient-to-r from-primary to-cyan-600 hover:from-primary/90 hover:to-cyan-500 text-white text-lg px-8 py-6 shadow-lg shadow-primary/30"
            asChild
          >
            <a href="https://kmong.com/my_gigs" target="_blank" rel="noopener noreferrer">
              프로젝트 문의하기
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>

        <div className="flex items-center justify-center gap-6 animate-scale-in" style={{ animationDelay: "0.5s" }}>
          <a
            href="https://kmong.com/my_gigs"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-all hover:scale-110"
          >
            <div className="p-2 rounded-full bg-primary/20 border border-primary/50 shadow-lg shadow-primary/20">
              <Briefcase className="h-5 w-5" />
            </div>
            <span>크몽</span>
          </a>


        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/8 rounded-full blur-3xl animate-float-slow" />
        <div
          className="absolute top-1/2 right-1/3 w-48 h-48 bg-primary/5 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "1.5s" }}
        />
      </div>
    </section>
  )
}
