<script setup lang='ts'>
import axios from 'axios'

const router = useRouter()

const id = ref<string>('')
const password = ref<string>('')

const goSignUp = () => {
  router.push('/auth/sign-up')
}

const getPostData = () => {
  return {
    id: id.value,
    password: password.value
  }
}

const goMainPage = () => {
  router.push('/')
}

const signInAPI = async (data: { id: string, password: string }) => {
  try {
    const result = await request.post('/auth/sign-in', data)
    localStorage.setItem('token', result.data.accessToken)
    bakeToast.success('로그인에 성공했어요!')
    goMainPage()
    return result
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error)
      bakeToast.error(error.response?.data.message)
    }
  }
}

const signInEvent = async () => {
  const data = getPostData()
  await signInAPI(data)
}
</script>

<template>
  <div class="sign-in-wrapper">
    <div class="sign-in-container">
      <div class="sign-in-header">
        <h1>WBSync</h1>
      </div>
      <div class="sign-in-body">
        <div class="sign-in-row">
          <BaseInput v-model="id" type="text" label="아이디" placeholder="아이디를 입력해주세요." @keyup.enter="signInEvent" />
        </div>
        <div class="sign-in-row">
          <BaseInput v-model="password" type="password" label="비밀번호" placeholder="비밀번호를 입력해주세요."
            @keyup.enter="signInEvent" />
        </div>
      </div>
      <div class="sign-in-footer flex flex-col gap-3 mt-4 items-center">
        <BaseButton class="w-full" variant="primary">
          <div class="flex items-center justify-center" @click="signInEvent">
            <span class="mr-2">
              로그인 시도
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
          </div>
        </BaseButton>
        <BaseButton class="w-full" variant="primary" @click="goSignUp">
          <div class="flex items-center justify-center">
            <span class="mr-2">회원가입 할래요</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-5 h-5 mt-[1px]">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
            </svg>
          </div>
        </BaseButton>
        <!-- <BaseButton class="w-full" variant="secondary">
          <div class="flex items-center justify-center">
            <span class="mr-2">비밀번호를 잊어버렸어요</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
            </svg>

          </div>
        </BaseButton>
        <BaseButton class="w-full" variant="secondary">
          비밀번호를 변경할래요
        </BaseButton> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 전체 폰트 */
.sign-in-wrapper {
  font-family: 'Inter', 'Noto Sans KR', sans-serif;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #f0f4f8, #dbeafe);
}

/* 카드 컨테이너 */
.sign-in-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2.5rem;
  background-color: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  width: 360px;
}

/* 타이틀 */
.sign-in-header h1 {
  text-align: center;
  font-size: 1.75rem;
  font-weight: 600;
  color: #4A6D5A;
}

/* 본문 영역 */
.sign-in-body {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.sign-in-row {
  display: flex;
  flex-direction: column;
}

.sign-in-row label {
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #334155;
  font-size: 0.95rem;
}

.sign-in-row input {
  padding: 0.65rem 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: 0.2s;
}

.sign-in-row input:focus {
  border-color: #60a5fa;
  outline: none;
  box-shadow: 0 0 0 2px rgba(96, 165, 250, 0.3);
}

.sign-in-footer {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
  align-items: center;
}
</style>