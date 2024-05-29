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
  
        <label>Things to do:</label>
        <input type="text" v-model="todo" />
  
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
        <p><strong>Things to do:</strong> {{ item.todo }}</p>
        <p><strong>Notes:</strong> {{ item.notes }}</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };
  
  interface WinterizeItem {
    date: string;
    location: string;
    hive: string;
    todo: string;
    notes: string;
  }
  
  const date = ref(new Date().toISOString().substr(0, 10));
  const location = ref('');
  const hive = ref('1. Hive');
  const todo = ref('');
  const notes = ref('');
  const dataList = ref<WinterizeItem[]>([]);
  
  onMounted(async () => {
    await loadWinterizeRecords();
  });
  
  async function loadWinterizeRecords() {
    try {
      const response = await axios.get<WinterizeItem[]>('http://localhost:5001/auth/winterizes', { headers });
      dataList.value = response.data;
    } catch (error) {
      console.error('Failed to load winterize records:', error);
    }
  }
  
  async function handleSubmit() {
    try {
      const response = await axios.post<WinterizeItem>('http://localhost:5001/auth/winterizes', {
        date: date.value,
        location: location.value,
        hive: hive.value,
        todo: todo.value,
        notes: notes.value,
      }, { headers });
  
      dataList.value = [response.data, ...dataList.value];
      console.log('Server response:', response.data);
    } catch (error) {
      console.error('Failed to submit winterize form:', error);
    }
  }
  </script>
  
  <style>
  </style>
  