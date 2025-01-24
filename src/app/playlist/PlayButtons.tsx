'use client'

type PlaylistHeaderProps = {
  title: string
  coverImage: string
  description?: string
}

export default function PlaylistHeader({
  title,
  coverImage,
  description,
}: PlaylistHeaderProps) {
  return (
    <section className="mt-6 flex flex-col items-center">
      <div
        className="bg-lightgray h-[248px] w-[248px] rounded-lg bg-cover bg-center"
        style={{ backgroundImage: `url(${coverImage})` }}
      ></div>
      <h2 className="mt-4 font-pretendard text-xl">{title}</h2>
      {description && <p className="mt-1 text-gray-500">{description}</p>}
    </section>
  )
}
