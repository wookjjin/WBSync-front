<script setup lang="ts">
import { useLoadingStore } from '~/store/progress'

const loadingStore = useLoadingStore()
</script>

<template>
  <Toast />
  <Progress v-if="loadingStore.isLoading" />
  <ConfirmOverlay />
  <NuxtPage />
</template>
