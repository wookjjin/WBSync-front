<script setup lang="ts">
import { TabsSymbol } from '~/types'

import type { ITabPanelProps, TabsInjection } from '~/types'

const { id = '' } = defineProps<ITabPanelProps>()
const tabs = inject<TabsInjection>(TabsSymbol)

if (!tabs) {
  throw new Error('TabPanel must be used within TabContainer')
}

const isActive = computed(() => tabs.activeTabId.value === id)
</script>

<template>
  <div v-if="isActive" class="tab-panel">
    <slot />
  </div>
</template>

<style scoped>

</style>
