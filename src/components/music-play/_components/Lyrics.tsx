type LyricsProps = {
  lyrics: string
}

const Lyrics = ({ lyrics }: LyricsProps) => {
  return (
    <p
      className="lyrics caption-1 text-center leading-5"
      dangerouslySetInnerHTML={{ __html: lyrics }}
    ></p>
  )
}

export default Lyrics
