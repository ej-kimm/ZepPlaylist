import { type NextRequest } from 'next/server'
import { updateSession } from './utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  // 서버상태라 클라이언트한테 alert이나 뭐 로그인해야한다 알림 띄울방법이없는것같음
  // 한번 물어보기
  return await updateSession(request)
}

export const config = {
  matcher: ['/my-page'],
}
