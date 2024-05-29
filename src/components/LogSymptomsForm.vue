<template>
    <div>
      <form @submit.prevent="handleSubmit">
        <label>Date of record:</label>
        <input type="date" id="dateInput" v-model="date" required />
  
        <label>Location:</label>
        <input v-model="location" required />
  
        <label>Hive:</label>
        <select v-model="hive">
          <option v-for="option in hiveOptions" :value="option.value" :key="option.value">{{ option.label }}</option>
        </select>
  
        <label>Notes:</label>
        <textarea v-model="notes"></textarea>
  
        <div class="submit">
          <button class="btn" :disabled="isLoading">Save</button>
          <div v-if="isLoading" class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </form>
      <div v-for="(item, index) in dataList" :key="index">
        <h2>Data {{ index + 1 }}</h2>
        <p><strong>Date of record:</strong> {{ item.date }}</p>
        <p><strong>Location:</strong> {{ item.location }}</p>
        <p><strong>Hive:</strong> {{ item.hive }}</p>
        <p><strong>Notes:</strong> {{ item.notes }}</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };
  
  type Item = {
    date: string;
    location: string;
    hive: string;
    notes: string;
  };
  
  const date = ref(new Date().toISOString().substr(0, 10));
  const location = ref('');
  const hive = ref('');
  const notes = ref('');
  const dataList = ref<Item[]>([]);
  const isLoading = ref(false);
  
  const hiveOptions = ref([
    { value: '1. Hive', label: '1.' },
    { value: '2. Hive', label: '2.' },
    { value: '3. Hive', label: '3.' },
    { value: '4. Hive', label: '4.' },
    { value: '5. Hive', label: '5.' }
  ]);
  
  onMounted(async () => {
    await loadDatabaseEntries();
  });
  
  async function loadDatabaseEntries() {
    try {
      const response = await axios.get<Item[]>('http://localhost:5001/auth/logsymptoms', { headers });
      dataList.value = response.data;
    } catch (error) {
      console.error('Failed to load database entries:', error);
    } finally {
      isLoading.value = false;
    }
  }
  
  async function handleSubmit() {
    try {
      isLoading.value = true;
      const response = await axios.post<Item>('http://localhost:5001/auth/logsymptoms', {
        date: date.value,
        location: location.value,
        hive: hive.value,
        notes: notes.value,
      }, { headers });
      dataList.value = [response.data, ...dataList.value];
      console.log('Server response:', response.data);
    } catch (error) {
      console.error('Failed to submit form:', error);
    } finally {
      isLoading.value = false;
    }
  }
  </script>
  
  <style>
  .spinner-border {
    display: inline-block;
    width: 2rem;
    height: 2rem;
    vertical-align: -.125em;
    border: .25em solid;
    border-right: .25em solid transparent;
    border-radius: 50%;
    -webkit-animation: spinner-border .75s linear infinite;
    animation: spinner-border .75s linear infinite;
  }
  
  .error {
    color: red;
  }
  </style>
  