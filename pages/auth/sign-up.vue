<script setup lang='ts'>
import axios from 'axios'

import type { IUser } from '~/types/auth'

definePageMeta({
  layout: 'auth-layout'
})

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
  <div>
    <div class="auth-header">
      <h1 class="auth-header__title">WBSync</h1>
    </div>
    <div class="auth-body">
      <div class="">
        <h2 class="auth-body__section">계정 정보</h2>
        <div class="auth-body__row">
          <BaseInput v-model="signUp.id" type="text" label="아이디" placeholder="아이디를 입력해주세요." />
        </div>
        <div class="auth-body__row">
          <BaseInput v-model="signUp.password" type="password" label="비밀번호" placeholder="특수문자 포함 8~16자로 설정해주세요." />
        </div>
        <div class="auth-body__row">
          <BaseInput v-model="signUp.recheckPassword" type="password" label="비밀번호 재확인" placeholder="비밀번호를 재확인 해주세요." />
        </div>
      </div>
      <div>
        <h2 class="auth-body__section">개인정보</h2>
        <div class="auth-body__row">
          <BaseInput v-model="signUp.name" type="text" label="이름" placeholder="이름을 입력해주세요." />
        </div>
        <div class="auth-body__row">
          <BaseInput v-model="signUp.email" type="text" label="이메일 주소" placeholder="이메일을 입력해주세요." />
        </div>
        <div class="auth-body__row">
          <BaseInput v-model="signUp.phoneNumber" type="text" label="비상연락망" placeholder="비상연락망을 입력해주세요. (-) 제외" />
        </div>
      </div>
    </div>
    <div class="auth-footer">
      <div class="auth-footer__actions">
        <BaseButton class="auth-button" variant="primary" @click="createUser">
          제출하기
        </BaseButton>
        <BaseButton class="auth-button" variant="secondary" @click="goSignIn">
          <div class="auth-button__content">
            <svg
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-6">
              <path
                stroke-linecap="round" stroke-linejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
            </svg>
            <span class="auth-button__text">로그인 페이지로</span>
          </div>
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
