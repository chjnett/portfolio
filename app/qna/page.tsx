"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"
import type { Session } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { useRouter } from "next/navigation"

interface Qna {
  id: number
  created_at: string
  question: string
  answer: string | null
}

export default function QnaPage() {
  const [session, setSession] = useState<Session | null>(null)
  const [qna, setQna] = useState<Qna[]>([])
  const [question, setQuestion] = useState("")
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (!data.session) {
        router.push("/login")
      } else {
        setSession(data.session)
        fetchQna()
      }
      setLoading(false)
    }
    getSession()
  }, [router])

  const fetchQna = async () => {
    const { data, error } = await supabase
      .from("qna")
      .select("*")
      .order("created_at", { ascending: false })
    if (error) {
      console.error("Error fetching qna:", error)
    } else {
      setQna(data as Qna[])
    }
  }

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session) return
    const { error } = await supabase
      .from("qna")
      .insert([{ question, user_id: session.user.id }])
    if (error) {
      console.error("Error submitting question:", error)
    } else {
      setQuestion("")
      fetchQna()
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <div className="flex items-center justify-center pt-20">
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 py-8 pt-20">
        <Card>
          <CardHeader>
            <CardTitle>회원 전용 Q&A</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleQuestionSubmit} className="mb-8">
              <div className="grid gap-4">
                <Textarea
                  placeholder="질문을 입력하세요..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  required
                />
                <Button type="submit">질문하기</Button>
              </div>
            </form>
            <div className="space-y-4">
              {qna.map((item) => (
                <Card key={item.id}>
                  <CardContent className="pt-6">
                    <p className="font-semibold">{item.question}</p>
                    {item.answer ? (
                      <p className="mt-2 text-muted-foreground">{item.answer}</p>
                    ) : (
                      <p className="mt-2 text-sm text-muted-foreground">
                        답변을 기다리고 있습니다.
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
