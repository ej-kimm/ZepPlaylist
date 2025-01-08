// ex) types 정의 폴더
export type User = {
  user: { email: string } | null
  setUser: (user: { email: string } | null) => void
}
