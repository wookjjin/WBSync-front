<script setup lang='ts'>
import axios from 'axios'
import type { IUser } from '~/types/auth'

const router = useRouter()

const signUp = ref<IUser>({
  id: '',
  email: '',
  password: '',
  recheckPassword: '',
  name: '',
  dept: '',
  deptCode: '',
  rank: '',
  rankCode: '',
  phoneNumber: ''
})

const getPostData = () => {
  return {
    id: signUp.value.id,
    email: signUp.value.email,
    password: signUp.value.password,
    recheckPassword: signUp.value.recheckPassword,
    name: signUp.value.name,
    rank: signUp.value.rank,
    phoneNumber: signUp.value.phoneNumber
  }
}

const goSignIn = () => {
  router.push('/auth/sign-in')
}


const postUserAPI = async (data: IUser) => {
  try {
    const result = await request.post('/auth/sign-up', data)
    bakeToast.success('회원가입에 성공했어요. 로그인 해주세요.')
    goSignIn()
    return result
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error)
      bakeToast.error(error.response?.data.message)
    }
  }
}

const createUser = async () => {
  const data = getPostData()
  await postUserAPI(data)
}

</script>

<template>
  <div class="sign-in-wrapper">
    <div class="sign-in-container">
      <div class="sign-in-header">
        <h1>WBSync</h1>
      </div>
      <div class="sign-in-body">
        <div>
          <h2 class="section-title">계정 정보</h2>
          <div class="sign-in-row">
            <BaseInput v-model="signUp.id" type="text" label="아이디" placeholder="아이디를 입력해주세요." />
          </div>
          <div class="sign-in-row">
            <BaseInput v-model="signUp.password" type="password" label="비밀번호" placeholder="특수문자 포함 8~16자로 설정해주세요." />
          </div>
          <div class="sign-in-row">
            <BaseInput v-model="signUp.recheckPassword" type="password" label="비밀번호 재확인"
              placeholder="비밀번호를 재확인 해주세요." />
          </div>
        </div>
        <div>
          <h2 class="section-title">개인정보</h2>
          <div class="sign-in-row">
            <BaseInput v-model="signUp.name" type="text" label="이름" placeholder="이름을 입력해주세요." />
          </div>
          <div class="sign-in-row">
            <BaseInput v-model="signUp.email" type="text" label="이메일 주소" placeholder="이메일을 입력해주세요." />
          </div>
          <div class="sign-in-row">
            <BaseInput v-model="signUp.phoneNumber" type="text" label="비상연락망" placeholder="비상연락망을 입력해주세요. (-) 제외" />
          </div>
        </div>
      </div>
      <div class="sign-in-footer flex flex-col gap-3 mt-4 items-center">
        <BaseButton class="w-full" variant="primary" @click="createUser">
          제출하기
        </BaseButton>
        <BaseButton class="w-full" variant="secondary" @click="goSignIn">
          <div class="flex">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-6 mr-2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
            </svg>
            <span>
              로그인 페이지로
            </span>
          </div>
        </BaseButton>
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

.section-title {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
  color: #1e293b;
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

/* 푸터 버튼 */
.sign-in-footer {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
  align-items: center;
}
</style>
