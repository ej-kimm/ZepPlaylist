export type Comment = {
  id: string
  created_at: string
  user_id: string
  content: string
  users: {
    profile_image: string | null
    nickname: string
  }
}
