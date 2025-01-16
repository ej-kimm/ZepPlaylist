import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from './utils/supabase/middleware'
import { createClient } from './utils/supabase/server'

export async function middleware(request: NextRequest) {
  const supabase = createClient()
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()

  if (!session?.user) {
    const loginUrl = new URL('http://localhost:3000/login', request.url)
    return NextResponse.redirect(loginUrl)
  }
  return await updateSession(request)
}

export const config = {
  matcher: ['/my-page'],
}
