import Link from 'next/link'
import LoginForm from './_components/LoginForm'
import SocialForm from './_components/SocialForm'

const page = () => {
  return (
    <div>
      <h1>로그인</h1>
      <LoginForm />
      <SocialForm />
      <Link
        className="mt-6 w-full rounded-lg py-3 text-black transition-all focus:outline-none focus:ring-2"
        href={'/sign-up'}
      >
        회원가입
      </Link>
    </div>
  )
}

export default page
