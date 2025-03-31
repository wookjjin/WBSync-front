<!-- eslint-disable sort-imports -->
<script setup lang='ts'>
import GridBody from '~/components/ui/grid/GridBody.vue'
import GridHeader from '~/components/ui/grid/GridHeader.vue'
import Pagination from '~/components/ui/pagination/Pagination.vue'
import { maskPhoneNumber } from '~/utils'

import type { Column } from '~/components/ui/grid/GridBody.vue'
import type { TotalCount } from '~/components/ui/grid/GridHeader.vue'
import type { LimitOption } from '~/components/ui/pagination/Pagination.vue'
import type { PageLimit, PageParams } from '~/types'

const pageLimitOptions = ref<LimitOption<PageLimit>[]>([
  {
    label: '10개씩 보기',
    value: 10
  },
  {
    label: '30개씩 보기',
    value: 30
  },
  {
    label: '50개씩 보기',
    value: 50
  }
])

const pageVisibleCount = ref<number>(10)
const pageParams = ref<PageParams>({
  currentPage: 1,
  currentPageLimit: 10
})

const totalCount = ref<TotalCount>(0)
const selectedRows = ref<any[]>([])

const columns = ref<Column[]>([
  {
    key: 'id',
    label: '아이디',
    align: 'center'
  },
  {
    key: 'name',
    label: '이름',
    align: 'center'
  },
  {
    key: 'email',
    label: '이메일',
    align: 'center'
  },
  {
    key: 'rank',
    label: '직급',
    align: 'center'
  },
  {
    key: 'rankCode',
    label: '직급 코드',
    align: 'center',
    visible: false
  },
  {
    key: 'dept',
    label: '부서',
    align: 'center'
  },
  {
    key: 'deptCode',
    label: '부서 코드',
    align: 'center',
    visible: false
  },
  {
    key: 'phoneNumber',
    label: '비상 연락망',
    align: 'center'
  }
])

const userList = ref<any[]>([])

const columnClickEvent = (column: Column) => {
  console.log('column result >>>', column)
}

const sortChangeEvent = (targetColumn: string, sortDirection: string) => {
  console.log(`target-column ::${targetColumn} , sortDirection :: ${sortDirection}`)
}

const rowClickEvent = (row: any[]) => {
  console.log('row result >>>', row)
}

const getSelectedRows = (selectedRows: any[]) => {
  console.log('selected row result >>', selectedRows)
}

const pageChangeEvent = (page: number) => {
  console.log('current page >>>', page)
}

const limitChangeEvent = (limit: string | number) => {
  console.log('current limit >>>', limit)
}

const getUserList = async () => {
  try {
    const result = await request.get('/management/users')
    userList.value = result.data.dataList
    totalCount.value = result.data.totalCount
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  getUserList()
})
</script>

<template>
  <div class="grid-container">
    <div class="grid-wrapper">
      <GridHeader :total-count="totalCount" total-label="Total" />
      <GridBody v-model:selected-rows="selectedRows" :columns="columns" :rows="userList"
        @update:selected-rows="getSelectedRows(selectedRows)" @column-click-event="columnClickEvent"
        @sort-change-event="sortChangeEvent" @row-click-event="rowClickEvent">
        <template #phoneNumber="{ row }">
          <span>
            {{ maskPhoneNumber(row.phoneNumber) }}
          </span>
        </template>
      </GridBody>
      <Pagination :use-limit-list="true" :total-count="totalCount" :page-visible-count="pageVisibleCount"
        :limit-options="pageLimitOptions" :current-page="pageParams.currentPage"
        :current-page-limit="pageParams.currentPageLimit" @page-change-event="pageChangeEvent"
        @limit-change-event="limitChangeEvent" />
    </div>
  </div>
</template>

<style scoped>
.grid-container {
  display: block;
  text-align: center;
  margin: 0 auto;
  width: 1000px;
}

.grid-wrapper {
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 10px;
}
</style>
