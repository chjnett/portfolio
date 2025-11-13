"use client"

import { useEffect, useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { CheckCircle2, Clock, Zap, RefreshCcw } from "lucide-react"

export function About() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const features = [
    {
      icon: Clock,
      title: "빠른 개발 프로세스",
      description: "결제 후 2일 내 완료",
      steps: ["기획 및 디자인", "바로 개발 시작", "배포"],
    },
    {
      icon: Zap,
      title: "동적인 웹사이트",
      description: "원하는 기능을 모두 구현",
      steps: ["반응형 디자인", "인터랙티브 UI", "최신 기술 적용"],
    },
    {
      icon: RefreshCcw,
      title: "수정 2회 포함",
      description: "완벽한 결과를 위한 수정",
      steps: ["피드백 반영", "세부 조정", "최종 완성"],
    },
  ]

  return (
    <section id="about" ref={sectionRef} className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            왜 저를 선택해야 할까요?
          </h2>
          <p
            className={`text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-150 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            코딩을 몰라도 괜찮습니다. 복잡한 기술 용어 없이, 여러분의 시간을 절약하고 비즈니스에 집중할 수 있도록
            도와드립니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`p-8 bg-card/50 backdrop-blur border-primary/20 hover:border-primary/50 transition-all duration-500 hover:shadow-lg hover:shadow-primary/20 ${
                isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"
              }`}
              style={{
                transitionDelay: `${index * 150}ms`,
                animation: isVisible ? `float ${3 + index * 0.5}s ease-in-out infinite ${index * 0.3}s` : "none",
              }}
            >
              <div className="mb-6 inline-block p-4 bg-gradient-to-br from-primary/20 to-cyan-500/20 rounded-2xl">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
              <p className="text-primary font-semibold mb-6">{feature.description}</p>
              <div className="space-y-3">
                {feature.steps.map((step, stepIndex) => (
                  <div key={stepIndex} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{step}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
