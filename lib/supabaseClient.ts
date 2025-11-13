// lib/supabaseClient.ts

import { createClient } from '@supabase/supabase-js';

// .env.local 파일에서 환경 변수를 가져옵니다.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// URL이나 키가 없는 경우 에러를 발생시킵니다.
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL 또는 Anon Key가 .env.local 파일에 설정되지 않았습니다.");
}

// Supabase 클라이언트를 생성하여 export 합니다.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);