import { fetchAlbums } from '@/api/home/actions'
import LatestAlbumDetail from '../components/LatestAlbumDetail'

const LatestAlbum = async ({ params }: { params: { id: string } }) => {
  const albumData = await fetchAlbums(params.id)

  return (
    <>
      <LatestAlbumDetail albumData={albumData} />
    </>
  )
}

export default LatestAlbum
