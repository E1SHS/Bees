<template>
    <div>
      <form @submit.prevent="handleSubmit">
        <label>Date of record:</label>
        <input type="date" id="dateInput" v-model="date" required />
  
        <label>Location:</label>
        <input type="location" v-model="location" required />
  
        <label>Hive:</label>
        <select v-model="hive">
          <option value="1. Hive">1.</option>
          <option value="2. Hive">2.</option>
          <option value="3. Hive">3.</option>
          <option value="4. Hive">4.</option>
          <option value="5. Hive">5.</option>
        </select>
  
        <label>Method:</label>
        <select v-model="method">
          <option value="Sugar shake">Sugar Shake.</option>
          <option value="Alcohol wash">Alcohol wash.</option>
          <option value="Other">Other.</option>
        </select>
  
        <label>Other description:</label>
        <input v-model="description" />
  
        <label>How many mites per 100:</label>
        <input type="number" v-model="mites" required />
  
        <label>Notes:</label>
        <input v-model="notes" />
  
        <div class="submit">
          <button class="btn">Save</button>
        </div>
      </form>
      <div v-for="(item, index) in dataList" :key="index">
        <h2>Data {{ index + 1 }}</h2>
        <p><strong>Date of record:</strong> {{ item.date }}</p>
        <p><strong>Location:</strong> {{ item.location }}</p>
        <p><strong>Method:</strong> {{ item.method }}</p>
        <p><strong>Other description:</strong> {{ item.description }}</p>
        <p><strong>Mites per 100:</strong> {{ item.mites }}</p>
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
    method: string;
    description: string;
    mites: number;
    notes: string;
  };
  
  const date = ref(new Date().toISOString().substr(0, 10));
  const location = ref('');
  const hive = ref('');
  const method = ref('');
  const description = ref('');
  const mites = ref<number>(0);
  const notes = ref('');
  const dataList = ref<Item[]>([]);
  
  onMounted(async () => {
    await loadMiteRecords();
  });
  
  async function loadMiteRecords() {
    try {
      const response = await axios.get<Item[]>('http://localhost:5001/auth/mites', { headers });
      dataList.value = response.data;
    } catch (error) {
      console.error('Failed to load mite records:', error);
    }
  }
  
  async function handleSubmit() {
    try {
      const response = await axios.post<Item>('http://localhost:5001/auth/mites', {
        date: date.value,
        location: location.value,
        hive: hive.value,
        method: method.value,
        description: description.value,
        mites: mites.value,
        notes: notes.value,
      }, { headers });
  
      dataList.value = [response.data, ...dataList.value];
      console.log('Server response:', response.data);
    } catch (error) {
      console.error('Failed to submit mite form:', error);
    }
  }
  </script>
  
  <style>
  </style>
  