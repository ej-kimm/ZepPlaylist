const ErrorMessage = () => {
  return (
    <div className="fixed bottom-[35px] left-1/2 z-player flex h-[46px] w-11/12 -translate-x-1/2 transform items-center rounded-full bg-[#f8efff] px-6">
      <span className="caption-2 text-secondary">
        요청한 음원은 서비스 이용이 불가합니다
      </span>
    </div>
  )
}

export default ErrorMessage
