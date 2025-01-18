'use client'
import { fetchMusicId } from '@/api/music-play/actions'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'

export default function Test() {
  const { isPlayerOpen, setTrackIds, play, setPlayerOpen } =
    useMusicPlayerStore()

  return (
    <p
      onClick={async () => {
        // 2. 여러곡 재생할 경우
        const trackId = await fetchMusicId()

        // 첫 번째 곡 재생 시 플레이어를 열고
        if (!isPlayerOpen) setPlayerOpen()

        setTrackIds(trackId) // 재생할 곡 아이디 넘기기
        // play()
      }}
      className="cursor-pointer"
    >
      곡 테스트 컴포넌트 클릭
    </p>
  )
}

// 'use client'
// import { fetchMusicId } from '@/api/music-play/actions'
// import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
// import { useState } from 'react'

// export default function Test() {
//   const { isPlayerOpen, setTrackIds, setPlayerOpen } = useMusicPlayerStore()
//   const [isLoading, setIsLoading] = useState(false) // 중복 실행 방지용 상태 추가

//   return (
//     <p
//       onClick={async () => {
//         if (isLoading) return // 이미 실행 중인 경우 무시
//         setIsLoading(true) // 실행 중 상태 설정

//         try {
//           const trackId = await fetchMusicId()

//           if (!isPlayerOpen) {
//             setPlayerOpen() // 플레이어 열기
//           }
//           setTrackIds(trackId) // 재생할 곡 ID 설정
//         } catch (error) {
//           console.error('Error fetching track ID:', error)
//         } finally {
//           setIsLoading(false) // 실행 종료 상태 설정
//         }
//       }}
//       className="cursor-pointer"
//     >
//       곡 테스트 컴포넌트 클릭
//     </p>
//   )
// }
