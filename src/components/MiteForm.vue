<template>
  <div class="container mt-5">
    <form @submit.prevent="handleSubmit" class="form-container mx-auto p-4 shadow-sm rounded bg-light">
      <h2 class="mb-4 text-center">Mite Assessment Form</h2>

      <div class="mb-3">
        <label for="dateInput" class="form-label">Date of record:</label>
        <input type="date" class="form-control" id="dateInput" v-model="date" required />
      </div>

      <div class="mb-3">
        <label for="location" class="form-label">Location:</label>
        <input type="text" class="form-control" id="location" v-model="location" placeholder="Enter location" required />
      </div>

      <div class="mb-3">
        <label for="hive" class="form-label">Hive:</label>
        <select class="form-select" id="hive" v-model="hive">
          <option value="1. Hive">1.</option>
          <option value="2. Hive">2.</option>
          <option value="3. Hive">3.</option>
          <option value="4. Hive">4.</option>
          <option value="5. Hive">5.</option>
        </select>
      </div>

      <div class="mb-3">
        <label for="method" class="form-label">Method:</label>
        <select class="form-select" id="method" v-model="method">
          <option value="Sugar shake">Sugar Shake</option>
          <option value="Alcohol wash">Alcohol wash</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div class="mb-3" v-if="method === 'Other'">
        <label for="description" class="form-label">Other description:</label>
        <input type="text" class="form-control" id="description" v-model="description" placeholder="Describe other method" />
      </div>

      <div class="mb-3">
        <label for="mites" class="form-label">How many mites per 100:</label>
        <input type="number" class="form-control" id="mites" v-model="mites" required />
      </div>

      <div class="mb-3">
        <label for="notes" class="form-label">Notes:</label>
        <textarea class="form-control" id="notes" v-model="notes" rows="3" placeholder="Additional notes"></textarea>
      </div>

      <div class="d-flex justify-content-between align-items-center">
        <button class="btn btn-primary" :disabled="isLoading">Save</button>
        <div v-if="isLoading" class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </form>

    <div class="accordion mt-5" id="miteAccordion">
      <div v-for="(item, index) in dataList" :key="index" class="accordion-item">
        <h2 class="accordion-header" :id="'heading' + index">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse' + index" aria-expanded="false" :aria-controls="'collapse' + index">
            Data {{ index + 1 }}
          </button>
        </h2>
        <div :id="'collapse' + index" class="accordion-collapse collapse" :aria-labelledby="'heading' + index" data-bs-parent="#miteAccordion">
          <div class="accordion-body">
            <p><strong>Date of record:</strong> {{ item.date }}</p>
            <p><strong>Location:</strong> {{ item.location }}</p>
            <p><strong>Hive:</strong> {{ item.hive }}</p>
            <p><strong>Method:</strong> {{ item.method }}</p>
            <p><strong>Other description:</strong> {{ item.description }}</p>
            <p><strong>Mites per 100:</strong> {{ item.mites }}</p>
            <p><strong>Notes:</strong> {{ item.notes }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted } from 'vue';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

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
const isLoading = ref(false);

onMounted(async () => {
  await loadMiteRecords();
});

async function loadMiteRecords() {
  try {
    const response = await axios.get<Item[]>('http://localhost:5001/auth/mites', { headers });
    dataList.value = response.data;
  } catch (error) {
    console.error('Failed to load mite records:', error);
  } finally {
    isLoading.value = false;
  }
}

async function handleSubmit() {
  try {
    isLoading.value = true;
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
  } finally {
    isLoading.value = false;
  }
}
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

.form-container {
  max-width: 100%;
  padding: 20px;
}

@media (min-width: 768px) {
  .form-container {
    max-width: 50%;
  }
}

.mt-5 {
  margin-top: 3rem;
}
</style>
