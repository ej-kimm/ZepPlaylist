const SocialForm = () => {
  return (
    <div>
      간편로그인
      <br></br>
      <form className="flex space-x-6">
        <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          스포티파이(아이콘가져올거임)
        </button>
        <button className="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600">
          카카오(아이콘가져올거임)
        </button>
        <button className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600">
          구글(아이콘가져올거임)
        </button>
      </form>
    </div>
  )
}

export default SocialForm
