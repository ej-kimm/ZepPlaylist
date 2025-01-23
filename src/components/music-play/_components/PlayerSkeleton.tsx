const PlayerSkeleton = () => {
  return (
    <section className="h-player fixed bottom-0 left-0 z-player flex w-full bg-white shadow-drop">
      <div className="flex h-full w-full animate-pulse items-center justify-between px-6">
        <div className="flex flex-grow">
          <div className="flex w-full flex-col items-start justify-start gap-1">
            <div className="h-4 w-3/5 rounded bg-gray-300" />
            <div className="h-3 w-2/5 rounded bg-gray-300" />
          </div>
        </div>

        <div className="flex items-center justify-end gap-2">
          <div className="h-6 w-6 rounded-lg bg-gray-300" />
          <div className="h-6 w-6 rounded-lg bg-gray-300" />
          <div className="h-6 w-6 rounded-lg bg-gray-300" />
          <div className="h-6 w-6 rounded-lg bg-gray-300" />
        </div>
      </div>
    </section>
  )
}

export default PlayerSkeleton
