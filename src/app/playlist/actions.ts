'use server'

import { TablesInsert } from '@/types/supabase'
import { supabase } from '@/utils/supabase/client'
import Swal from 'sweetalert2'

// Supabase 'playlists' 테이블의 Insert 타입 정의
type PlaylistInsert = TablesInsert<'playlists'>

/**
 * 서버 액션: 플레이리스트 데이터 가져오기
 */
export async function fetchPlaylists() {
  try {
    const { data, error } = await supabase.from('playlists').select('*')
    if (error) {
      throw error
    }
    return data || []
  } catch (error) {
    console.error('플레이리스트 가져오기 오류:', error)
    Swal.fire(
      '오류',
      '플레이리스트 데이터를 가져오는 중 문제가 발생했습니다.',
      'error',
    )
    return []
  }
}

/**
 * 서버 액션: 새로운 플레이리스트 추가
 */
export async function addPlaylist(playlist: Omit<PlaylistInsert, 'id'>) {
  try {
    console.log('addPlaylist 호출됨', playlist)
    const { error } = await supabase.from('playlists').insert<PlaylistInsert>({
      ...playlist,
    })

    if (error) {
      throw error
    }

    Swal.fire('완료', '플레이리스트가 추가되었습니다!', 'success')
  } catch (error) {
    console.error('플레이리스트 추가 오류:', error)
    Swal.fire('오류', '플레이리스트 추가 중 문제가 발생했습니다.', 'error')
  }
}
