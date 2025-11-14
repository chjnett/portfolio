"use client" // 클라이언트 컴포넌트 선언 (React 훅 사용)

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"
import type { Session } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

export default function BugReportPage() {
  // --- React 상태(State) 정의 ---
  const [session, setSession] = useState<Session | null>(null) // 현재 로그인 세션 정보
  const [title, setTitle] = useState("") // 폼: 제목
  const [description, setDescription] = useState("") // 폼: 설명
  const [isSecret, setIsSecret] = useState(false) // 폼: 비밀글 여부
  const [loading, setLoading] = useState(true) // 세션 확인 전 로딩 상태

  // --- React 훅(Hook) 초기화 ---
  const router = useRouter() // 페이지 이동 훅
  const { toast } = useToast() // 알림 팝업 훅

  // --- Auth Guard (페이지 접근 제어) ---
  // 컴포넌트가 처음 마운트될 때 실행되어 로그인 상태를 확인합니다.
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      
      // 세션이 없으면(비로그인) 로그인 페이지로 쫓아냅니다.
      if (!data.session) {
        router.push("/login")
      } else {
        // 세션이 있으면 state에 저장하고 로딩을 종료합니다.
        setSession(data.session)
        setLoading(false)
      }
    }
    getSession()
  }, [router])

  // --- 폼 제출 이벤트 핸들러 ---
  const handleBugSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // 폼 기본 동작(새로고침) 방지
    
    // 세션이 없으면 제출을 막습니다.
    if (!session) return

    // Supabase 'bug_reports' 테이블에 데이터 삽입
    const { error } = await supabase.from("bug_reports").insert([
      {
        title: title,
        description: description,
        // user_id는 RLS(행 수준 보안) 정책에서 '작성자'를 판단하기 위해 필수입니다.
        user_id: session.user.id,
        is_secret: isSecret,
        // [수정] 'status' 컬럼을 테이블에 추가하지 않았으므로 400 오류 방지를 위해 제거
        // status: "new", 
      },
    ])

    // 삽입 실패 시 오류 알림
    if (error) {
      toast({
        title: "오류",
        description: "보고서 제출 중 오류가 발생했습니다. (에러: " + error.message + ")",
        variant: "destructive",
      })
    } else {
      // 삽입 성공 시 성공 알림 및 폼 초기화
      toast({
        title: "성공",
        description: "오류 보고서가 성공적으로 제출되었습니다.",
      })
      setTitle("")
      setDescription("")
      setIsSecret(false)
    }
  }

  // --- 렌더링 로직 ---

  // 로딩 중일 때 (세션 확인 중일 때) 표시할 UI
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

  // 로딩 완료 후 실제 페이지 UI
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 py-8 pt-20">
        <Card>
          <CardHeader>
            <CardTitle>오류 수정 요청</CardTitle>
          </CardHeader>
          <CardContent>
            {/* 폼 제출 시 handleBugSubmit 함수를 실행 */}
            <form onSubmit={handleBugSubmit}>
              <div className="grid gap-4">
                
                {/* 제목 Input: value와 onChange로 state와 연결 */}
                <Input
                  type="text"
                  placeholder="제목 (예: 로그인 버튼이 작동하지 않습니다)"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                
                {/* 설명 Textarea: value와 onChange로 state와 연결 */}
                <Textarea
                  placeholder="발견한 오류에 대해 자세히 설명해주세요..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={6}
                />
                
                {/* 비밀글 Checkbox: checked와 onCheckedChange로 state와 연결 */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isSecret"
                    checked={isSecret}
                    onCheckedChange={(checked) => setIsSecret(checked as boolean)}
                                    />
                  <Label htmlFor="isSecret" className="cursor-pointer">
                     비밀글로 제출하기
                  </Label>
                </div>
                
                <Button type="submit">제출하기</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}