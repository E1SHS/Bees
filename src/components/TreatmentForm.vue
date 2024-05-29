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
  
        <label>Disease Treated:</label>
        <select v-model="disease">
          <option value="Varroa">Varroa.</option>
          <option value="Nosema">Nosema.</option>
          <option value="Afb">Afb.</option>
          <option value="Efb">Efb.</option>
          <option value="Chalkbrood">Chalkbrood.</option>
        </select>
  
        <label>Product type/Brand:</label>
        <input v-model="product" />
  
        <label>Dosage information</label>
        <input v-model="dosage" />
  
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
        <p><strong>Disease Treated:</strong> {{ item.disease }}</p>
        <p><strong>Product type/Brand:</strong> {{ item.product }}</p>
        <p><strong>Dosage information:</strong> {{ item.dosage }}</p>
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
    disease: string;
    product: string;
    dosage: string;
    notes: string;
  };
  
  const date = ref(new Date().toISOString().substr(0, 10));
  const location = ref('');
  const hive = ref('');
  const disease = ref('');
  const product = ref('');
  const dosage = ref('');
  const notes = ref('');
  const dataList = ref<Item[]>([]);
  
  onMounted(async () => {
    await loadTreatmentRecords();
  });
  
  async function loadTreatmentRecords() {
    try {
      const response = await axios.get<Item[]>('http://localhost:5001/auth/treatment', { headers });
      dataList.value = response.data;
    } catch (error) {
      console.error('Failed to load treatment records:', error);
    }
  }
  
  async function handleSubmit() {
    try {
      const response = await axios.post<Item>('http://localhost:5001/auth/treatment', {
        date: date.value,
        location: location.value,
        hive: hive.value,
        disease: disease.value,
        product: product.value,
        dosage: dosage.value,
        notes: notes.value,
      }, { headers });
  
      dataList.value = [response.data, ...dataList.value];
      console.log('Server response:', response.data);
    } catch (error) {
      console.error('Failed to submit treatment form:', error);
    }
  }
  </script>
  
  <style>
  </style>
  