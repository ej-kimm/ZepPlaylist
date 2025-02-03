import clsx from 'clsx'
import SignupForm from './_components/SignupForm'

const page = () => {
  return (
    <div className={clsx('text-left', 'desktop:mx-auto desktop:w-[532px]')}>
      <h1 className="title-1 mt-[94px] text-left">회원가입</h1>
      <SignupForm />
    </div>
  )
}

export default page
