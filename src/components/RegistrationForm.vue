<template>
  <div class="container mt-5">
    <form @submit.prevent="handleSubmit" class="form-container mx-auto">
      <div class="mb-3">
        <label for="email" class="form-label">Email:</label>
        <input type="email" class="form-control" id="email" v-model="email" @input="validateEmail" required />
        <div v-if="emailError" class="alert alert-danger">{{ emailError }}</div>
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Password:</label>
        <input type="password" class="form-control" id="password" v-model="password" @input="validatePassword" required />
        <div v-if="passwordRequirements" class="form-text">{{ passwordRequirements }}</div>
      </div>

      <div class="mb-3">
        <label for="confirmPassword" class="form-label">Confirm Password:</label>
        <input type="password" class="form-control" id="confirmPassword" v-model="confirmPassword" required />
      </div>

      <div v-if="passwordError" class="alert alert-danger">{{ passwordError }}</div>
      <div v-if="registrationError" class="alert alert-danger">{{ registrationError }}</div>
      <div v-if="showSuccessMessage" class="alert alert-success">Registration successful! You can now login.</div>

      <div class="d-flex justify-content-between align-items-center">
        <button class="btn btn-primary" :disabled="isLoading || !!emailError || !!passwordError" type="submit">Register</button>
        <div v-if="isLoading" class="spinner-border text-primary" role="status">
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

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const isLoading = ref(false);
const showSuccessMessage = ref(false);
const emailError = ref<string>('');
const passwordError = ref<string>('');
const registrationError = ref<string>('');
const passwordRequirements = ref<string>('Password must be at least 6 characters long and contain at least one uppercase letter.');

const router = useRouter();

const validateEmail = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value)) {
    emailError.value = 'Please enter a valid email address.';
  } else {
    emailError.value = '';
  }
};

const validatePassword = () => {
  const passwordPattern = /^(?=.*[A-Z]).{6,}$/;
  if (!passwordPattern.test(password.value)) {
    passwordError.value = 'Password must be at least 6 characters long and contain at least one uppercase letter.';
  } else {
    passwordError.value = '';
  }
};

const handleSubmit = async () => {
  console.log('Form submitted');

  emailError.value = '';
  passwordError.value = '';
  registrationError.value = '';

  // Validate password match
  if (password.value !== confirmPassword.value) {
    passwordError.value = 'Passwords do not match';
    return;
  }

  isLoading.value = true;

  try {
    const response = await axios.post('http://localhost:5001/auth/registration', {
      username: email.value, // Use email as username
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

.alert {
  margin-top: 1rem;
}

.form-container {
  max-width: 100%;
  padding: 20px;
}

@media (min-width: 768px) {
  .form-container {
    max-width: 50%;
  }
}
</style>
