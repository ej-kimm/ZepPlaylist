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
        className="mt-6 w-full rounded-lg bg-[#B15EFF] py-3 text-white transition-all hover:bg-[#9F54E5] focus:outline-none focus:ring-2 focus:ring-[#B15EFF]"
        href={'/sign-up'}
      >
        회원가입
      </Link>
    </div>
  )
}

export default page
