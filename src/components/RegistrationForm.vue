<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <label>Username:</label>
      <input type="text" v-model="username" required />

      <label>Password:</label>
      <input type="password" v-model="password" required />

      <label>Confirm Password:</label>
      <input type="password" v-model="confirmPassword" required />

      <div v-if="passwordError" class="error">{{ passwordError }}</div>
      <div v-if="registrationError" class="error">{{ registrationError }}</div>
      <div v-if="showSuccessMessage" class="success-message">Registration successful! You can now login.</div>

      <div class="submit">
        <button class="btn" :disabled="isLoading" type="submit">Register</button>
        <div v-if="isLoading" class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const confirmPassword = ref('');
const isLoading = ref(false);
const showSuccessMessage = ref(false);
const passwordError = ref<string>('');
const registrationError = ref<string>('');

const router = useRouter();

const handleSubmit = async () => {
  console.log('Form submitted');

  passwordError.value = '';
  registrationError.value = '';

  // Validate password length
  if (password.value.length < 4 || password.value.length > 10) {
    passwordError.value = 'Password must be between 4 and 10 characters long';
    return;
  }

  // Validate password match
  if (password.value !== confirmPassword.value) {
    passwordError.value = 'Passwords do not match';
    return;
  }

  isLoading.value = true;

  try {
    const response = await axios.post('http://localhost:5001/auth/registration', {
      username: username.value,
      password: password.value
    });

    console.log('Registration successful:', response.data);
    showSuccessMessage.value = true;

    // Navigate to the login page
    setTimeout(() => {
      router.push({ name: 'login' });
    }, 2000);
  } catch (error: any) {
    if (error.response && error.response.data) {
      registrationError.value = error.response.data.message || 'Registration failed';
    } else {
      registrationError.value = 'Registration failed';
    }
    console.error('Failed to register:', error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style>
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
</style>
