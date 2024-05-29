<template>
    <div>
      <form @submit.prevent="handleSubmit">
        <label>Date of record:</label>
        <input type="date" v-model="date" required />
  
        <label>Location:</label>
        <input type="text" v-model="location" required />
  
        <label>Hive:</label>
        <select v-model="hive">
          <option v-for="hiveNumber in 5" :value="`Hive ${hiveNumber}`">{{`Hive ${hiveNumber}`}}</option>
        </select>
  
        <label>Notes:</label>
        <textarea v-model="notes"></textarea>
  
        <div class="submit">
          <button class="btn">Save</button>
        </div>
      </form>
      <div v-for="(item, index) in dataList" :key="index">
        <h2>Data {{ index + 1 }}</h2>
        <p><strong>Date of record:</strong> {{ item.date }}</p>
        <p><strong>Location:</strong> {{ item.location }}</p>
        <p><strong>Notes:</strong> {{ item.notes }}</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };
  
  interface DeadHiveItem {
    date: string;
    location: string;
    hive: string;
    notes: string;
  }
  
  const date = ref(new Date().toISOString().substr(0, 10));
  const location = ref('');
  const hive = ref('1. Hive');
  const notes = ref('');
  const dataList = ref<DeadHiveItem[]>([]);
  
  onMounted(async () => {
    await loadDeadHiveRecords();
  });
  
  async function loadDeadHiveRecords() {
    try {
      const response = await axios.get<DeadHiveItem[]>('http://localhost:5001/auth/deadhives', { headers });
      dataList.value = response.data;
    } catch (error) {
      console.error('Failed to load dead hive records:', error);
    }
  }
  
  async function handleSubmit() {
    try {
      const response = await axios.post<DeadHiveItem>('http://localhost:5001/auth/deadhives', {
        date: date.value,
        location: location.value,
        hive: hive.value,
        notes: notes.value,
      }, { headers });
  
      dataList.value = [response.data, ...dataList.value];
      console.log('Server response:', response.data);
    } catch (error) {
      console.error('Failed to submit dead hive form:', error);
    }
  }
  </script>
  
  <style scoped>

  </style>
  