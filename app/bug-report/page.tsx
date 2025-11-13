"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"
import type { Session } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

export default function BugReportPage() {
  const [session, setSession] = useState<Session | null>(null)
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (!data.session) {
        router.push("/login")
      } else {
        setSession(data.session)
      }
      setLoading(false)
    }
    getSession()
  }, [router])

  const handleBugSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session) return
    const { error } = await supabase
      .from("bug_reports")
      .insert([{ description, user_id: session.user.id, status: "new" }])
    if (error) {
      toast({
        title: "오류",
        description: "오류 보고서를 제출하는 동안 오류가 발생했습니다.",
        variant: "destructive",
      })
    } else {
      toast({
        title: "성공",
        description: "오류 보고서가 성공적으로 제출되었습니다.",
      })
      setDescription("")
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
            <CardTitle>오류 수정 요청</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleBugSubmit}>
              <div className="grid gap-4">
                <Textarea
                  placeholder="발견한 오류에 대해 자세히 설명해주세요..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={6}
                />
                <Button type="submit">제출하기</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
