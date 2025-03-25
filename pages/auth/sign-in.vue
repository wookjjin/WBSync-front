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
  <div class="sign-in-wrapper">
    <div class="sign-in-container">
      <div class="sign-in-header">
        <h1>WBSync</h1>
      </div>
      <div class="sign-in-body">
        <div class="sign-in-row">
          <label for="id">ID</label>
          <input id="id" type="text" placeholder="Enter your ID">
        </div>
        <div class="sign-in-row">
          <label for="password">Password</label>
          <input id="password" type="password" placeholder="Enter your password">
        </div>
      </div>
      <div class="sign-in-footer">
        <button class="primary-button">
          Sign Up
        </button>
        <button class="secondary-button">
          Forgot password
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sign-in-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.sign-in-container {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 320px;
}

.sign-in-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.sign-in-body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.sign-in-row {
  display: flex;
  flex-direction: column;
}

.sign-in-row label {
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.sign-in-row input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  font-size: 1rem;
}

.sign-in-footer {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1.5rem;
  align-items: center;
}

.sign-in-footer button {
  width: 100%;
  padding: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  background-color: #e5e7eb;
}

.sign-in-footer button:hover {
  background-color: #4f46e5;
  color: white;
}
</style>
