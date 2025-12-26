"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"
import type { Session } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
// [수정] Input은 이 폼에서 사용되지 않으므로 제거했습니다.
// import { Input } from "@/components/ui/input" 
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast" // [수정] useToast 훅 임포트

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
  const { toast } = useToast() // [수정] toast 훅 초기화

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (!data.session) {
        router.push("/login")
      } else {
        setSession(data.session)
        fetchQna() // 세션 확인 후 데이터 로드
      }
      setLoading(false)
    }
    getSession()
    // [참고] fetchQna를 의존성 배열에 추가하면
    // re-fetch가 더 명확해질 수 있으나, 현재 구조에서는 getSession 내에서만 호출되므로 router만 둡니다.
  }, [router])

  const fetchQna = async () => {
    const { data, error } = await supabase
      .from("qna")
      .select("*")
      .order("created_at", { ascending: false })
      
    if (error) {
      console.error("Error fetching qna:", error)
      // [수정] 데이터를 불러오는 데 실패했을 때도 알림을 줄 수 있습니다.
      toast({
        title: "오류",
        description: "Q&A 목록을 불러오는 데 실패했습니다: " + error.message,
        variant: "destructive",
      })
    } else {
      setQna(data as Qna[])
    }
  }

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session) return
    
    const { error } = await supabase
      .from("qna")
      // [참고] BugReportPage와 같이 user_id를 RLS에 활용할 수 있습니다.
      .insert([{ question, user_id: session.user.id }]) 
      
    if (error) {
      // [수정] console.error 대신 toast 알림으로 변경
      toast({
        title: "오류",
        description: "질문 제출 중 오류가 발생했습니다: " + error.message,
        variant: "destructive",
      })
    } else {
      // [수정] 성공 시 toast 알림 추가
      toast({
        title: "성공",
        description: "질문이 성공적으로 제출되었습니다.",
      })
      setQuestion("") // 폼 초기화
      fetchQna() // 목록 새로고침
    }
  }

  // 로딩 UI (BugReportPage와 동일한 로직)
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

  // 실제 페이지 UI
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 py-8 pt-20">
        <Card>
          <CardHeader>
            <CardTitle>회원 전용 Q&A</CardTitle>
          </CardHeader>
          <CardContent>
            {/* 질문 제출 폼 */}
            <form onSubmit={handleQuestionSubmit} className="mb-8">
              <div className="grid gap-4">
                <Textarea
                  placeholder="질문을 입력하세요..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  required
                  rows={4} // [수정] 행 수를 조금 줄여도 좋습니다.
                />
                <Button type="submit">질문하기</Button>
              </div>
            </form>
            
            {/* Q&A 목록 */}
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