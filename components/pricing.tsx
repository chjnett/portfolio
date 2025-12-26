"use client"

import { useEffect, useRef, useState } from "react"

// Counter component removed as it is no longer used in this specific way
// We will implement the logic directly in the Pricing component for better sequencing control

export function Pricing() {
  const [isVisible, setIsVisible] = useState(false)
  const [step, setStep] = useState(0) // 0: hidden, 1: show 100, 2: strikethrough, 3: show countdown
  const [count, setCount] = useState(100)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isVisible) {
      // Sequence timing
      const timer1 = setTimeout(() => setStep(1), 500) // Show "100만원"
      const timer2 = setTimeout(() => setStep(2), 1500) // Strikethrough
      const timer3 = setTimeout(() => {
        setStep(3) // Show countdown box
        setCount(7)
      }, 2500)

      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
        clearTimeout(timer3)
      }
    }
  }, [isVisible])

  return (
    <section ref={sectionRef} id="pricing" className="py-20 bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div
          className={`p-8 rounded-xl border-2 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          <div className="mb-10">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-primary to-cyan-400 text-transparent bg-clip-text pb-4">
              리뷰 이벤트 진행중!
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              지금 신청하시면 특별 할인가로 웹사이트를 제작해 드립니다.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center min-h-[200px] relative">
            {/* Step 1 & 2: Original Price */}
            <div className={`transition-all duration-300 transform absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${step === 1 ? 'opacity-100' : ''} ${step === 2 ? 'animate-smoke-puff' : ''} ${step >= 3 ? 'opacity-0' : ''}`}>
              <div className="relative inline-block">
                <span className="text-6xl font-bold text-muted-foreground">
                  100만원
                </span>
              </div>
            </div>

            {/* Step 3: Discounted Price Reveal */}
            {step === 3 && (
              <div className="inline-block bg-card p-10 rounded-xl shadow-2xl border border-primary/30 animate-emerge-soft relative z-10">
                <div className="text-8xl font-extrabold text-primary bg-gradient-to-br from-primary via-cyan-400 to-primary bg-clip-text text-transparent">
                  {count}만원
                </div>
                <div className="mt-6 text-2xl font-bold text-green-500">
                  리뷰 작성 시 할인가
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
