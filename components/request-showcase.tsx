"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowDown, MessageSquare, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function RequestShowcase() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="showcase" className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/8 to-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,183,235,0.08),transparent_70%)]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-cyan-400 to-primary bg-clip-text text-transparent">
            간단한 요청, 완벽한 결과
          </h2>
          <p className="text-foreground/70 text-lg">복잡한 설명 없이도 원하시는 웹사이트를 완성합니다</p>
        </div>

        <div
          className={`mb-8 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-cyan-500/20 flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-foreground/60 mb-2">클라이언트 요청</p>
              <div className="bg-card backdrop-blur-sm border border-primary/30 rounded-2xl rounded-tl-none p-6 hover:border-primary/50 transition-all duration-300 shadow-xl shadow-primary/10">
                <p className="text-foreground/90 text-lg leading-relaxed">
                  "IT기업의 소개 페이지를 미래지향적이게 만들어 주세요"
                </p>
              </div>
              <p className="text-xs text-foreground/50 mt-2 ml-1">
                * 사진, 글, 데이터는 클라이언트께서 준비를 해주셔야 합니다
              </p>
            </div>
          </div>
        </div>

        <div
          className={`flex justify-center my-8 transition-all duration-700 delay-400 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
        >
          <div className="relative">
            <ArrowDown className="w-8 h-8 text-primary animate-bounce drop-shadow-[0_0_8px_rgba(0,183,235,0.6)]" />
            <Sparkles className="w-4 h-4 text-cyan-400 absolute -right-2 -top-2 animate-pulse" />
          </div>
        </div>

        <div
          className={`transition-all duration-700 delay-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-center text-foreground/60 mb-4 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            완성된 결과물
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </p>

          <div className="group relative rounded-xl overflow-hidden border-2 border-primary/40 hover:border-primary/70 transition-all duration-500 hover:scale-[1.02] shadow-2xl shadow-primary/20 hover:shadow-primary/30">
            <div className="aspect-video bg-gradient-to-br from-card to-primary/5 relative overflow-hidden">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-n0JbRzp2n0N6VL2h5pk8NrJA1xNBfJ.png"
                alt="IT 기업 소개 페이지"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <div className="p-6 bg-card/80 backdrop-blur-sm border-t border-primary/20">
              <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
                IT 기업 소개 페이지
              </h3>
              <p className="text-foreground/70 mb-4">
                미래지향적인 디자인과 인터랙티브한 애니메이션이 적용된 완성도 높은 웹사이트
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-primary/30 text-primary text-sm rounded-full border border-primary/40">
                  반응형 디자인
                </span>
                <span className="px-3 py-1 bg-cyan-500/30 text-cyan-400 text-sm rounded-full border border-cyan-400/40">
                  패럴랙스 효과
                </span>
                <span className="px-3 py-1 bg-primary/30 text-primary text-sm rounded-full border border-primary/40">
                  부드러운 애니메이션
                </span>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-primary to-cyan-600 hover:from-primary/90 hover:to-cyan-500 text-white group/btn shadow-lg shadow-primary/30"
                asChild
              >
                <a
                  href="https://v0-company-introduction-website-b0pi0ym5m.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  실제 페이지 보기
                  <ArrowDown className="ml-2 w-4 h-4 rotate-[-90deg] group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div
          className={`text-center mt-12 transition-all duration-700 delay-800 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-foreground/70 mb-4">단순한 요청만으로도 이런 퀄리티의 웹사이트를 제작해드립니다</p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-cyan-600 hover:from-primary/90 hover:to-cyan-500 text-white shadow-lg shadow-primary/30"
            asChild
          >
            <a href="https://kmong.com/my_gigs" target="_blank" rel="noopener noreferrer">
              지금 바로 프로젝트 문의하기
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
