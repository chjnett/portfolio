"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

const projects = [
  {
    title: "IT 기업 소개 페이지",
    description: "미래지향적인 디자인과 인터랙티브한 애니메이션이 적용된 완성도 높은 웹사이트",
    image: "/cloudops-intro.png",
    tags: ["반응형 디자인", "패럴랙스 효과", "부드러운 애니메이션"],
    link: "https://devops1-eight.vercel.app/",
  },

  {
    title: "소니 헤드폰 소개 페이지",
    description: "소니의 최신 헤드폰을 소개하는 몰입형 랜딩 페이지. 프리미엄 디자인과 동적인 애니메이션으로 제품의 가치를 효과적으로 전달합니다.",
    image: "/sony_headphone.png",
    tags: ["랜딩페이지", "제품소개", "반응형"],
    link: "https://sony-intro.vercel.app/",
  },
]

export function Projects() {
  const [visibleProjects, setVisibleProjects] = useState<boolean[]>([])
  const projectRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    setVisibleProjects(new Array(projects.length).fill(false))

    const observers = projectRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleProjects((prev) => {
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 15
    const rotateY = (centerX - x) / 15

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)"
  }

  return (
    <section id="projects" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
            프로젝트 포트폴리오
          </h2>
          <p className="text-muted-foreground text-lg">다양한 업종의 클라이언트와 함께한 프로젝트들입니다</p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={(el) => {
                projectRefs.current[index] = el
              }}
              className={`w-full max-w-md transition-all duration-700 ${visibleProjects[index] ? "opacity-100 translate-y-0 rotate-0" : "opacity-0 translate-y-10 rotate-3"
                }`}
              style={{
                transitionDelay: `${index * 100}ms`,
                animation: visibleProjects[index]
                  ? `float ${4 + index * 0.3}s ease-in-out infinite ${index * 0.4}s`
                  : "none",
              }}
            >
              <Card
                className="group overflow-hidden bg-card/50 backdrop-blur border-primary/20 hover:border-primary/50 transition-all duration-300 h-full"
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={handleMouseLeave}
                style={{ transition: "transform 0.1s ease-out" }}
              >
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-2 ${visibleProjects[index] ? "animate-scale-in" : ""}`}
                    style={{ animationDelay: `${index * 100 + 200}ms` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                    <Badge className="bg-primary/90 backdrop-blur">완료</Badge>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="outline"
                        className="border-primary/30 hover:border-primary hover:bg-primary/10 transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button
                    className="w-full group/btn bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-400"
                    asChild
                  >
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      프로젝트 보기
                      <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </a>
                  </Button>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
