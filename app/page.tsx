import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Skills } from "@/components/skills"
import { RequestShowcase } from "@/components/request-showcase"
import { Projects } from "@/components/projects"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <RequestShowcase />
      <Projects />
    </div>
  )
}
