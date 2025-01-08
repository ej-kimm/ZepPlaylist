const SocialForm = () => {
  return (
    <div className="mx-auto mt-8 max-w-md">
      <h2 className="mb-4 text-lg font-bold">간편로그인</h2>
      <form className="flex space-x-4">
        <button
          className="flex items-center space-x-2 rounded bg-blue-500 px-4 py-2 text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="button"
        >
          {/* 아이콘을 여기에 추가할 수 있습니다 */}
          <span>스포티파이</span>
        </button>
        <button
          className="flex items-center space-x-2 rounded bg-yellow-500 px-4 py-2 text-white transition-all hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          type="button"
        >
          <span>카카오</span>
        </button>
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
