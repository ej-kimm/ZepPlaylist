import KaKaoButton from './KaKaoButton'

const SocialForm = async () => {
  return (
    <div className="mx-auto mt-8 max-w-md">
      <h2 className="mb-4 text-lg font-bold">간편로그인</h2>
      <form className="flex space-x-4">
        <button
          className="flex items-center space-x-2 rounded bg-blue-500 px-4 py-2 text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="button"
        >
          <span>스포티파이</span>
        </button>
        <KaKaoButton />
        <button
          className="flex items-center space-x-2 rounded bg-red-500 px-4 py-2 text-white transition-all hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          type="button"
        >
          <span>구글</span>
        </button>
      </form>
    </div>
  )
}
export default SocialForm
