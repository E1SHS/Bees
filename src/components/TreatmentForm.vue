<template>
  <div class="container mt-5">
    <form @submit.prevent="handleSubmit" class="form-container mx-auto p-4 shadow-sm rounded bg-light">
      <h2 class="mb-4 text-center">Treatment Form</h2>

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
        <label for="disease" class="form-label">Disease Treated:</label>
        <select class="form-select" id="disease" v-model="disease">
          <option value="Varroa">Varroa</option>
          <option value="Nosema">Nosema</option>
          <option value="Afb">Afb</option>
          <option value="Efb">Efb</option>
          <option value="Chalkbrood">Chalkbrood</option>
        </select>
      </div>

      <div class="mb-3">
        <label for="product" class="form-label">Product type/Brand:</label>
        <input type="text" class="form-control" id="product" v-model="product" placeholder="Enter product type/brand" />
      </div>

      <div class="mb-3">
        <label for="dosage" class="form-label">Dosage information:</label>
        <input type="text" class="form-control" id="dosage" v-model="dosage" placeholder="Enter dosage information" />
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

    <div class="accordion mt-5" id="treatmentAccordion">
      <div v-for="(item, index) in dataList" :key="index" class="accordion-item">
        <h2 class="accordion-header" :id="'heading' + index">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse' + index" aria-expanded="false" :aria-controls="'collapse' + index">
            Data {{ index + 1 }}
          </button>
        </h2>
        <div :id="'collapse' + index" class="accordion-collapse collapse" :aria-labelledby="'heading' + index" data-bs-parent="#treatmentAccordion">
          <div class="accordion-body">
            <p><strong>Date of record:</strong> {{ item.date }}</p>
            <p><strong>Location:</strong> {{ item.location }}</p>
            <p><strong>Disease Treated:</strong> {{ item.disease }}</p>
            <p><strong>Product type/Brand:</strong> {{ item.product }}</p>
            <p><strong>Dosage information:</strong> {{ item.dosage }}</p>
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
const isLoading = ref(false);

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
    isLoading.value = true;
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
