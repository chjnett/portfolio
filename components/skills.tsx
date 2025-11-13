"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Code2, Palette, Rocket, Shield } from "lucide-react"

export function Skills() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>([])
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const services = [
    {
      icon: Palette,
      title: "맞춤형 디자인",
      description: "브랜드 이미지에 맞는 독창적이고 전문적인 디자인을 제공합니다.",
    },
    {
      icon: Code2,
      title: "반응형 웹사이트",
      description: "모바일, 태블릿, PC 모든 기기에서 완벽하게 작동하는 웹사이트를 만듭니다.",
    },
    {
      icon: Rocket,
      title: "빠른 로딩 속도",
      description: "최적화된 코드로 빠른 페이지 로딩과 뛰어난 사용자 경험을 보장합니다.",
    },
    {
      icon: Shield,
      title: "안정적인 운영",
      description: "배포 후에도 안정적으로 작동하며, 필요시 유지보수를 지원합니다.",
    },
  ]

  useEffect(() => {
    setVisibleCards(new Array(services.length).fill(false))

    const observers = cardRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleCards((prev) => {
                const newState = [...prev]
                newState[index] = true
                return newState
              })
            }
          })
        },
        { threshold: 0.1 },
      )

      if (ref) observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 20
    const rotateY = (centerX - x) / 20

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)"
  }

  return (
    <section id="services" className="py-20 px-4 bg-muted/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
            제공 서비스
          </h2>
          <p className="text-muted-foreground text-lg">전문적이고 완성도 높은 웹사이트 제작 서비스를 제공합니다</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el
              }}
              className={`transition-all duration-700 ${
                visibleCards[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Card
                className="p-6 h-full bg-card/50 backdrop-blur border-primary/20 hover:border-primary/50 transition-all duration-300 group cursor-pointer"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ transition: "transform 0.1s ease-out, border-color 0.3s" }}
              >
                <div className="mb-4 inline-block p-3 bg-gradient-to-br from-primary/20 to-cyan-500/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
