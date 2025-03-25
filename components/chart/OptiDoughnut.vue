<script setup lang="ts">
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { Doughnut } from 'vue-chartjs'

import type { doughnutChartData, doughnutChartOptions } from '~/composables/chart'

defineProps<{
  data: typeof doughnutChartData,
  options: typeof doughnutChartOptions,
}>()

ChartJS.register(ArcElement, Tooltip, Legend)
</script>

<template>
  <Doughnut :data="data" :options="options" />
</template>

<style scoped>

</style>
