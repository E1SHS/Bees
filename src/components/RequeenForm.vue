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
  
        <label>Breed:</label>
        <select v-model="breed">
          <option value="Local">Local</option>
          <option value="Italian">Italian</option>
          <option value="Russian">Russian</option>
          <option value="Carniolan">Carniolan</option>
          <option value="Caucasian">Caucasian</option>
          <option value="Buckfast">Buckfast</option>
          <option value="Carpathian">Carpathian</option>
          <option value="Other">Other</option>
        </select>
  
        <label>Other Description:</label>
        <input v-model="otherDescription" />
  
        <label>Bee source:</label>
        <select v-model="source">
          <option value="Reared">Reared</option>
          <option value="From queen breeder">From queen breeder</option>
          <option value="Other">Other</option>
        </select>
  
        <label>Supplier name:</label>
        <input v-model="supplier" />
  
        <label>Queen ID:</label>
        <input v-model="queenID" />
  
        <label>Marketing color:</label>
        <select v-model="color">
          <option value="White">White</option>
          <option value="Yellow">Yellow</option>
          <option value="Red">Red</option>
          <option value="Green">Green</option>
          <option value="Blue">Blue</option>
          <option value="Unmarked">Unmarked</option>
          <option value="Other">Other</option>
        </select>
  
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
        <p><strong>Breed:</strong> {{ item.breed }}</p>
        <p><strong>Other Description:</strong> {{ item.otherDescription }}</p>
        <p><strong>Bee source:</strong> {{ item.source }}</p>
        <p><strong>Supplier name:</strong> {{ item.supplier }}</p>
        <p><strong>Queen ID:</strong> {{ item.queenID }}</p>
        <p><strong>Marketing color:</strong> {{ item.color }}</p>
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
    breed: string;
    otherDescription: string;
    source: string;
    supplier: string;
    queenID: string;
    color: string;
    notes: string;
  };
  
  const date = ref(new Date().toISOString().substr(0, 10));
  const location = ref('');
  const hive = ref('');
  const breed = ref('');
  const otherDescription = ref('');
  const source = ref('');
  const supplier = ref('');
  const queenID = ref('');
  const color = ref('');
  const notes = ref('');
  const dataList = ref<Item[]>([]);
  
  onMounted(async () => {
    await loadRequeenRecords();
  });
  
  async function loadRequeenRecords() {
    try {
      const response = await axios.get<Item[]>('http://localhost:5001/auth/requeen', { headers });
      dataList.value = response.data;
    } catch (error) {
      console.error('Failed to load requeen records:', error);
    }
  }
  
  async function handleSubmit() {
    try {
      const response = await axios.post<Item>('http://localhost:5001/auth/requeen', {
        date: date.value,
        location: location.value,
        hive: hive.value,
        breed: breed.value,
        otherDescription: otherDescription.value,
        source: source.value,
        supplier: supplier.value,
        queenID: queenID.value,
        color: color.value,
        notes: notes.value,
      }, { headers });
  
      dataList.value = [response.data, ...dataList.value];
      console.log('Server response:', response.data);
    } catch (error) {
      console.error('Failed to submit requeen form:', error);
    }
  }
  </script>
  
  <style>
  </style>
  