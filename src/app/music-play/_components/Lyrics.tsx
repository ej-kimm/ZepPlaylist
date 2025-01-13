const Lyrics = ({ lyrics }: { lyrics: string }) => {
  return (
    <div>
      <h1>가사</h1>
      <p dangerouslySetInnerHTML={{ __html: lyrics }}></p>
    </div>
  )
}

export default Lyrics
