import clsx from 'clsx'
import SocialButton from './SocialButton'

const SocialForm = async () => {
  return (
    <div className={clsx('mx-auto mt-8 max-w-md', 'desktop:flex-col')}>
      <h2 className="caption-1 mb[18px] text-center">간편로그인</h2>
      <SocialButton />
    </div>
  )
}
export default SocialForm
