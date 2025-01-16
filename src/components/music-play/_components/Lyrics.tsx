const Lyrics = ({ lyrics }: { lyrics: string }) => {
  return (
    <p
      className="h-[60px] overflow-y-scroll bg-green-100 text-center"
      dangerouslySetInnerHTML={{ __html: lyrics }}
    ></p>
  )
}

export default Lyrics
