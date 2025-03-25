<script setup lang='ts'>
const getUser = async () => {
  try {
    const result = await request.get('user');
    console.log('result::', result);
    return result;
  }
  catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getUser();
});
</script>

<template>
  <div class="sign-in-container">
    <div class="sign-in-row">
      <span>ID</span>
      <input type="text" placeholder="ID">
    </div>
    <div class="sign-in-row">
      <span>Password</span>
      <input type="text" placeholder="password">
    </div>
  </div>
</template>

<style scoped>
.sign-in-container {
  display: flex;
  flex-direction: column;
  border: solid 1px;
  width: 800px;
  height: auto;
}

.sign-in-row {
  display: flex;
  padding: 20px;
  justify-content: space-between;
}
</style>
