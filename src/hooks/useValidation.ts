export const useValidation = () => {
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) return '이메일을 입력해주세요.'
    if (!emailRegex.test(email)) return '올바른 이메일 형식을 입력하세요.'
    return ''
  }
  const validatePassword = (password: string) => {
    if (!password) return '비밀번호를 입력하세요.'
    if (password.length < 6) return '비밀번호는 최소 6자 이상이여야합니다.'
  }
  const validatePasswordCheck = (password: string, passwordCheck: string) => {
    if (password !== passwordCheck) return '비밀번호가 일치하지 않습니다.'
    return ''
  }
  const validateNickname = (nickname: string) => {
    if (!nickname) return '닉네임을 입력해주세요.'
    if (nickname.length < 3) return '닉네임은 최소 3글자 이상이여야합니다.'
    return
  }
  return {
    validateEmail,
    validatePassword,
    validatePasswordCheck,
    validateNickname,
  }
}
