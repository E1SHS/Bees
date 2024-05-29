<template>
  <div class="container mt-5">
    <form @submit.prevent="handleSubmit" class="w-50 mx-auto">
      <div class="mb-3">
        <label for="email" class="form-label">Username:</label>
        <input type="text" class="form-control" id="email" required v-model="email" />
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Password:</label>
        <input :type="showPassword ? 'text' : 'password'" class="form-control" id="password" required v-model="password" />
      </div>
      
      <div class="form-check mb-3">
        <input type="checkbox" class="form-check-input" id="showPassword" v-model="showPassword">
        <label class="form-check-label" for="showPassword">Show password</label>
      </div>
      
      <div v-if="passwordError" class="alert alert-danger">{{ passwordError }}</div>
      
      <div class="d-flex justify-content-between align-items-center">
        <button class="btn btn-primary" :disabled="isLoading" type="submit">Login</button>
        <div v-if="isLoading" class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <button class="btn btn-secondary" type="button" @click="redirectToRegistrationPage" v-if="!isLoading">Register</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const passwordError = ref<string>('');
const isLoading = ref(false);
const showPassword = ref(false);
const router = useRouter();

const handleSubmit = async () => {
  console.log('Form submitted');

  // Validate password length
  passwordError.value = password.value.length >= 6 ? '' : 'Password length must be at least 6 characters long';

  if (!passwordError.value) {
    isLoading.value = true;

    try {
      const response = await axios.post('http://localhost:5001/auth/login', {
        username: email.value,
        password: password.value
      });

      console.log('Server response:', response.data);

      const { token } = response.data;
      localStorage.setItem('token', token);

      router.push({ name: 'menu' });
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 400 && error.response.data.message === 'User not found') {
          passwordError.value = 'User does not exist';
        } else if (error.response.status === 400 && error.response.data.message === 'Incorrect password') {
          passwordError.value = 'Incorrect password';
        } else {
          passwordError.value = 'Login failed';
        }
      } else {
        console.error('Failed to submit login form:', error);
      }
    } finally {
      isLoading.value = false;
    }
  }
};

const redirectToRegistrationPage = () => {
  router.push({ name: 'register' });
};
</script>

<style scoped>
.spinner-border {
  display: inline-block;
  width: 2rem;
  height: 2rem;
  vertical-align: -0.125em;
  border: 0.25em solid;
  border-right: 0.25em solid transparent;
  border-radius: 50%;
  -webkit-animation: spinner-border 0.75s linear infinite;
  animation: spinner-border 0.75s linear infinite;
}

.error {
  color: red;
}
</style>
