export default defineNuxtRouteMiddleware(async (_to, _from) => {
  // 서버 사이드에서는 localStorage 접근 불가하므로, 클라이언트에서만 실행
  if (!import.meta.client) return

  const token = localStorage.getItem('token')
  const refreshToken = localStorage.getItem('refresh-token')

  // ✅ 이미 로그인 페이지일 경우, 검사하지 않고 통과
  if (_to.path === '/auth/sign-in') return

  // ✅ 토큰 없지만 리프레시 토큰 있는 경우 → 토큰 재발급 시도
  if (!token && refreshToken) {
    try {
      const result = await request.post('/auth/refresh-token', {
        refreshToken
      })

      localStorage.setItem('token', result.data.accessToken)
      return // 🔥 중요: 리디렉션 없이 통과
    } catch (error) {
      console.error('Refresh 실패:', error)
      localStorage.removeItem('token')
      localStorage.removeItem('refresh-token')
      return navigateTo('/auth/sign-in')
    }
  }

  // ✅ 둘 다 없으면 로그인 페이지로 이동
  if (!token && !refreshToken) {
    return navigateTo('/auth/sign-in')
  }

  // ✅ 토큰 있고 정상 → 통과
})
