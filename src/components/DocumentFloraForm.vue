<template>
  <div class="container mt-5">
    <form @submit.prevent="handleSubmit" class="form-container mx-auto p-4 shadow-sm rounded bg-light">
      <h2 class="mb-4 text-center">Document Flora Form</h2>

      <div class="mb-3">
        <label for="dateInput" class="form-label">Date of record:</label>
        <input type="date" class="form-control" id="dateInput" v-model="date" required />
      </div>

      <div class="mb-3">
        <label for="location" class="form-label">Location:</label>
        <input type="text" class="form-control" id="location" v-model="location" placeholder="Enter location" required />
      </div>

      <div class="mb-3">
        <label for="bloom" class="form-label">What is blooming?</label>
        <input type="text" class="form-control" id="bloom" v-model="bloom" placeholder="What is blooming?" />
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

    <div class="accordion mt-5" id="floraAccordion">
      <div v-for="(item, index) in dataList" :key="index" class="accordion-item">
        <h2 class="accordion-header" :id="'heading' + index">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse' + index" aria-expanded="false" :aria-controls="'collapse' + index">
            Data {{ index + 1 }}
          </button>
        </h2>
        <div :id="'collapse' + index" class="accordion-collapse collapse" :aria-labelledby="'heading' + index" data-bs-parent="#floraAccordion">
          <div class="accordion-body">
            <p><strong>Date of record:</strong> {{ item.date }}</p>
            <p><strong>Location:</strong> {{ item.location }}</p>
            <p><strong>What is blooming:</strong> {{ item.bloom }}</p>
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
  bloom: string;
  notes: string;
};

const date = ref(new Date().toISOString().substr(0, 10));
const location = ref('');
const bloom = ref('');
const notes = ref('');
const dataList = ref<Item[]>([]);
const isLoading = ref(false);

onMounted(async () => {
  await loadDatabaseEntries();
});

async function loadDatabaseEntries() {
  try {
    const response = await axios.get<Item[]>('http://localhost:5001/auth/documentflora', { headers });
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
    const response = await axios.post<Item>('http://localhost:5001/auth/documentflora', {
      date: date.value,
      location: location.value,
      bloom: bloom.value,
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
