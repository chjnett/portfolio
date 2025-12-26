"use client"

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CheckCircle2, Upload, X } from "lucide-react"

export default function BugReportPage() {
  const [session, setSession] = useState<Session | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isSecret, setIsSecret] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  const router = useRouter()
  const { toast } = useToast()

  // Auth Guard
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      
      if (!data.session) {
        router.push("/login")
      } else {
        setSession(data.session)
        setLoading(false)
      }
    }
    getSession()
  }, [router])

  // 이미지 파일 선택 핸들러
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // 파일 크기 체크 (5MB 제한)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "파일 크기 초과",
          description: "이미지 크기는 5MB 이하여야 합니다.",
          variant: "destructive",
        })
        return
      }
      
      // 이미지 타입 체크
      if (!file.type.startsWith("image/")) {
        toast({
          title: "잘못된 파일 형식",
          description: "이미지 파일만 업로드 가능합니다.",
          variant: "destructive",
        })
        return
      }

      setImageFile(file)
      
      // 미리보기 생성
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // 이미지 제거
  const handleRemoveImage = () => {
    setImageFile(null)
    setImagePreview(null)
  }

  // 폼 제출 핸들러
  const handleBugSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!session) return
    
    setSubmitting(true)

    try {
      let imageUrl: string | null = null

      // 1. 이미지가 있으면 Supabase Storage에 업로드
      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
        const filePath = `bug-reports/${fileName}`

        // Supabase Storage 업로드
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("bug-images") // Storage 버킷 이름 (Supabase에서 미리 생성 필요)
          .upload(filePath, imageFile)

        if (uploadError) throw uploadError

        // 업로드된 이미지의 공개 URL 가져오기
        const { data: urlData } = supabase.storage
          .from("bug-images")
          .getPublicUrl(filePath)
        
        imageUrl = urlData.publicUrl
      }

      // 2. bug_reports 테이블에 데이터 삽입
      const { error: insertError } = await supabase.from("bug_reports").insert([
        {
          title: title,
          description: description,
          user_id: session.user.id,
          is_secret: isSecret,
          image_url: imageUrl, // 이미지 URL 저장 (테이블에 image_url 컬럼 추가 필요)
        },
      ])

      if (insertError) throw insertError

      // 3. 성공 처리
      setShowSuccessDialog(true)
      
      // 폼 초기화
      setTitle("")
      setDescription("")
      setIsSecret(false)
      setImageFile(null)
      setImagePreview(null)

    } catch (error: any) {
      toast({
        title: "오류",
        description: "보고서 제출 중 오류가 발생했습니다. (에러: " + error.message + ")",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  // 로딩 중일 때
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
            <div className="grid gap-6">
              
              {/* 제목 */}
              <div>
                <Label htmlFor="title">제목</Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="예: 로그인 버튼이 작동하지 않습니다"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              
              {/* 설명 */}
              <div>
                <Label htmlFor="description">상세 설명</Label>
                <Textarea
                  id="description"
                  placeholder="발견한 오류에 대해 자세히 설명해주세요..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={6}
                />
              </div>
              
              {/* 이미지 업로드 */}
              <div>
                <Label>스크린샷 첨부 (선택사항)</Label>
                
                {!imagePreview ? (
                  <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center mt-2">
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                    <Label htmlFor="image-upload" className="cursor-pointer">
                      <span className="text-primary hover:underline font-medium">
                        파일 선택
                      </span>
                      <span className="text-muted-foreground ml-1">또는 드래그 앤 드롭</span>
                    </Label>
                    <p className="text-xs text-muted-foreground mt-2">PNG, JPG, GIF (최대 5MB)</p>
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div className="relative border rounded-lg p-4 bg-muted/50 mt-2">
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 h-8 w-8"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-64 mx-auto rounded"
                    />
                    <p className="text-sm text-center mt-2 text-muted-foreground">
                      {imageFile?.name}
                    </p>
                  </div>
                )}
              </div>
              
              {/* 비밀글 체크박스 */}
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
              
              {/* 제출 버튼 */}
              <Button 
                onClick={handleBugSubmit}
                disabled={submitting || !title || !description}
              >
                {submitting ? "제출 중..." : "제출하기"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 성공 다이얼로그 */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3">
                <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <DialogTitle className="text-center text-2xl">제출 완료!</DialogTitle>
            <DialogDescription className="text-center text-base pt-2">
              오류 보고서가 성공적으로 접수되었습니다.
              <br />
              빠른 시일 내에 검토 후 답변드리겠습니다.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center gap-3 mt-4">
            <Button
              onClick={() => setShowSuccessDialog(false)}
            >
              확인
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}