"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Zap, Shield, Cpu, Rocket, Globe, BarChart } from "lucide-react"

export default function ITCompanyPage() {
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const services = [
    {
      icon: Cpu,
      title: "AI 솔루션",
      description: "최첨단 인공지능 기술로 비즈니스를 혁신합니다",
    },
    {
      icon: Shield,
      title: "보안 시스템",
      description: "기업 데이터를 안전하게 보호하는 통합 보안 솔루션",
    },
    {
      icon: Globe,
      title: "클라우드 서비스",
      description: "확장 가능한 클라우드 인프라로 비즈니스 성장을 지원",
    },
    {
      icon: BarChart,
      title: "데이터 분석",
      description: "실시간 데이터 분석으로 인사이트를 제공합니다",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Parallax */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-cyan-500/10">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, hsl(var(--primary)) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
              transform: `translateY(${scrollY * 0.3}px)`,
            }}
          />
        </div>

        {/* Floating Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "4s" }}
          />
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "6s", animationDelay: "1s" }}
          />
        </div>

        {/* Content */}
        <div
          className={`relative z-10 max-w-6xl mx-auto px-4 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Badge className="mb-6 bg-primary/20 backdrop-blur border-primary/30 text-primary text-sm px-4 py-2">
            <Zap className="w-4 h-4 mr-2 inline" />
            미래를 선도하는 기술
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-cyan-400 to-primary bg-clip-text text-transparent animate-gradient">
            혁신적인 IT 솔루션
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            최첨단 기술로 비즈니스의 디지털 전환을 이끌어갑니다
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="group bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-400 text-lg px-8"
            >
              무료 상담 신청
              <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary/30 hover:bg-primary/10 text-lg px-8 bg-transparent"
            >
              서비스 둘러보기
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto">
            {[
              { label: "프로젝트", value: "500+" },
              { label: "고객사", value: "200+" },
              { label: "만족도", value: "99%" },
            ].map((stat, index) => (
              <div key={index} className="transition-all duration-500" style={{ transitionDelay: `${index * 100}ms` }}>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center p-2">
            <div className="w-1 h-3 bg-primary/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/20 backdrop-blur border-primary/30">
              <Rocket className="w-4 h-4 mr-2 inline" />
              핵심 서비스
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
              기술로 미래를 만듭니다
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              최신 기술과 전문성으로 고객의 성공을 지원합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group p-8 bg-card/50 backdrop-blur border-primary/20 hover:border-primary/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-cyan-500/20 group-hover:from-primary/30 group-hover:to-cyan-500/30 transition-all duration-300">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-cyan-500/10 to-primary/10" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
            프로젝트를 시작할 준비가 되셨나요?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">전문가와 상담하고 최적의 솔루션을 찾아보세요</p>
          <Button
            size="lg"
            className="group bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-400 text-lg px-12"
          >
            지금 문의하기
            <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </section>
    </div>
  )
}
