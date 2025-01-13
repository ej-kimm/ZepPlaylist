const Lyrics = ({ lyrics }: { lyrics: string }) => {
  return (
    <div>
      <h1>가사</h1>
      {lyrics ? (
        <p dangerouslySetInnerHTML={{ __html: lyrics }}></p>
      ) : (
        <p>😢 제공된 가사가 없습니다</p>
      )}
    </div>
  )
}

export default Lyrics
