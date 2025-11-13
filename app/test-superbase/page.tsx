'use client'; // 👈 클라이언트 컴포넌트로 선언

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient'; // 또는 '../lib/supabaseClient'

// (옵션) 데이터 타입 정의
interface TestData {
  id: number;
  name: string;
}

export default function TestSupabasePage() {
  const [data, setData] = useState<TestData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // ❗️ 'your_table_name'을 본인의 실제 테이블 이름으로 변경하세요.
      const { data: fetchedData, error: dbError } = await supabase
        .from('test_table') // 👈 여기에 본인의 테이블 이름을 입력하세요.
        .select('*'); 

      if (dbError) {
        setError(dbError.message);
      } else {
        setData(fetchedData as TestData[]);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: '40px' }}>
      <h1>Supabase 연동 테스트 페이지</h1>
      
      {loading && <p>데이터를 불러오는 중입니다...</p>}
      
      {error && <p style={{ color: 'red' }}><b>오류 발생:</b> {error}</p>}
      
      {data && (
        <>
          <h2>✅ 데이터 조회 성공!</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </>
      )}

      {data && data.length === 0 && (
         <p>✅ 연동은 성공했으나, 테이블에 데이터가 없습니다.</p>
      )}
    </div>
  );
}