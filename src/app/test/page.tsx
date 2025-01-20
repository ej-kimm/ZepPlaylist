// 'use client'
// import { fetchPlaylistsWithCovers } from '@/api/playlist/actions'
// import { userStore } from '@/store/userSlice'
// import type { PlaylistRow } from '@/types/playlist'
// import Image from 'next/image'
// import { useEffect, useState } from 'react'
// function Test() {
//   const { user } = userStore((state) => state)
//   const [playlists, setPlaylists] = useState<PlaylistRow[]>([])
//   console.log('playlists', playlists)
//   useEffect(() => {
//     const getPlayList = async () => {
//       try {
//         const data = await fetchPlaylistsWithCovers()
//         setPlaylists(data)
//       } catch (error) {
//         console.error('Error fetching playlists:', error)
//       }
//     }
//     getPlayList()
//   }, [])
//   return (
//     <div>
//       {!user && playlists.length > 0 ? (
//         <p className="text-center text-gray-500">로딩 중...</p>
//       ) : (
//         <ul className="mt-4 space-y-2">
//           {playlists.map((playlist) => (
//             <li key={playlist.id}>
//               <div className="relative flex items-center space-x-4">
//                 <div className="relative h-16 w-16 overflow-hidden rounded">
//                   {playlist.latest_song_cover ? (
//                     <Image
//                       src={playlist.latest_song_cover}
//                       alt="앨범 커버"
//                       layout="fill"
//                       objectFit="cover"
//                     />
//                   ) : (
//                     <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-400">
//                       No Cover
//                     </div>
//                   )}
//                 </div>
//                 <div>
//                   <p className="text-lg font-semibold">{playlist.name}</p>
//                   <p className="text-sm text-gray-500">
//                     {playlist.description}
//                   </p>
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   )
// }
// export default Test
