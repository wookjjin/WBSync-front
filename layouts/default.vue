<script setup lang="ts">
const checkAccessToken = async () => {
  const token = localStorage.getItem('token')
  const refreshToken = localStorage.getItem('refreshToken')

  if (token) {
    return
  }

  if (!refreshToken) {
    bakeToast.error('로그인이 필요해요.')
    return navigateTo('/auth/sign-in')
  }

  try {
    const result = await request.post('/auth/refresh-token', {
      refreshToken
    })
    localStorage.setItem('token', result.data.accessToken)
    bakeToast.success('세션이 갱신되었어요.')
  } catch (error) {
    console.error('refresh-token 실패', error)
    localStorage.removeItem('token')
    localStorage.removeItem('refresh-token')
    bakeToast.error('세션이 만료되었어요. 다시 로그인해주세요.')
    return navigateTo('/auth/sign-in')
  }
}

onMounted(() => {
  checkAccessToken()
})
</script>

<template>
  <div>
    <slot />
  </div>
</template>

<style scoped></style>
