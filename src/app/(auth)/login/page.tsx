import LoginForm from './_components/LoginForm'
import SocialForm from './_components/SocialForm'

const page = () => {
  return (
    <div className="desktop:mx-auto desktop:w-[532px]">
      <LoginForm />
      <SocialForm />
    </div>
  )
}

export default page
