import Link from 'next/link'
import LoginForm from './_components/LoginForm'

const page = () => {
  return (
    <>
      <div>로그인</div>
      <LoginForm />
      <Link href={'/sign-up'}>회원가입</Link>
    </>
  )
}

export default page
