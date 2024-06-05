<template>
  <div class="container mt-5">
    <form @submit.prevent="handleSubmit" class="form-container mx-auto p-4 shadow-sm rounded bg-light">
      <h2 class="mb-4 text-center">Requeen Form</h2>

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
          <option v-for="hiveNumber in 5" :value="`Hive ${hiveNumber}`" :key="hiveNumber">{{`Hive ${hiveNumber}`}}</option>
        </select>
      </div>

      <div class="mb-3">
        <label for="breed" class="form-label">Breed:</label>
        <select class="form-select" id="breed" v-model="breed">
          <option value="Local">Local</option>
          <option value="Italian">Italian</option>
          <option value="Russian">Russian</option>
          <option value="Carniolan">Carniolan</option>
          <option value="Caucasian">Caucasian</option>
          <option value="Buckfast">Buckfast</option>
          <option value="Carpathian">Carpathian</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div class="mb-3" v-if="breed === 'Other'">
        <label for="otherDescription" class="form-label">Other Description:</label>
        <input type="text" class="form-control" id="otherDescription" v-model="otherDescription" placeholder="Describe other breed" />
      </div>

      <div class="mb-3">
        <label for="source" class="form-label">Bee source:</label>
        <select class="form-select" id="source" v-model="source">
          <option value="Reared">Reared</option>
          <option value="From queen breeder">From queen breeder</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div class="mb-3">
        <label for="supplier" class="form-label">Supplier name:</label>
        <input type="text" class="form-control" id="supplier" v-model="supplier" placeholder="Enter supplier name" />
      </div>

      <div class="mb-3">
        <label for="queenID" class="form-label">Queen ID:</label>
        <input type="text" class="form-control" id="queenID" v-model="queenID" placeholder="Enter queen ID" />
      </div>

      <div class="mb-3">
        <label for="color" class="form-label">Marketing color:</label>
        <select class="form-select" id="color" v-model="color">
          <option value="White">White</option>
          <option value="Yellow">Yellow</option>
          <option value="Red">Red</option>
          <option value="Green">Green</option>
          <option value="Blue">Blue</option>
          <option value="Unmarked">Unmarked</option>
          <option value="Other">Other</option>
        </select>
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

    <div class="accordion mt-5" id="requuenAccordion">
      <div v-for="(item, index) in dataList" :key="index" class="accordion-item">
        <h2 class="accordion-header" :id="'heading' + index">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse' + index" aria-expanded="false" :aria-controls="'collapse' + index">
            Data {{ index + 1 }}
          </button>
        </h2>
        <div :id="'collapse' + index" class="accordion-collapse collapse" :aria-labelledby="'heading' + index" data-bs-parent="#requuenAccordion">
          <div class="accordion-body">
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
const hive = ref('Hive 1');
const breed = ref('');
const otherDescription = ref('');
const source = ref('');
const supplier = ref('');
const queenID = ref('');
const color = ref('');
const notes = ref('');
const dataList = ref<Item[]>([]);
const isLoading = ref(false);

onMounted(async () => {
  await loadRequeenRecords();
});

async function loadRequeenRecords() {
  try {
    const response = await axios.get<Item[]>('http://localhost:5001/auth/requeen', { headers });
    dataList.value = response.data;
  } catch (error) {
    console.error('Failed to load requeen records:', error);
  } finally {
    isLoading.value = false;
  }
}

async function handleSubmit() {
  try {
    isLoading.value = true;
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
