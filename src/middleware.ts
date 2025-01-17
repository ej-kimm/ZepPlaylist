import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from './utils/supabase/middleware'
import { createClient } from './utils/supabase/server'

export async function middleware(request: NextRequest) {
  const supabase = createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (!user?.id) {
    const loginUrl = new URL('http://localhost:3000/login', request.url)
    if (error) { 
      console.error(error.message)
    }

    return NextResponse.redirect(loginUrl)
  }
  return await updateSession(request)
}

export const config = {
  matcher: ['/my-page'],
}
