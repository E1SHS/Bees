<template>
  <div class="container mt-5">
    <form @submit.prevent="handleSubmit" class="form-container mx-auto p-4 shadow-sm rounded bg-light">
      <h2 class="mb-4 text-center">Harvest Honey Form</h2>

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
          <option v-for="h in hives" :key="h" :value="`Hive ${h}`">Hive {{ h }}</option>
        </select>
      </div>

      <div class="mb-3">
        <label for="units" class="form-label">Units for how much:</label>
        <select class="form-select" id="units" v-model="units">
          <option v-for="option in unitOptions" :value="option.value" :key="option.value">{{ option.label }}</option>
        </select>
      </div>

      <div class="mb-3">
        <label for="howmuch" class="form-label">How much?</label>
        <input type="text" class="form-control" id="howmuch" v-model="howmuch" placeholder="Enter quantity" required />
      </div>

      <div class="mb-3">
        <label for="foraged" class="form-label">What was foraged?</label>
        <input type="text" class="form-control" id="foraged" v-model="foraged" placeholder="Enter foraged items" />
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

    <div class="accordion mt-5" id="harvestHoneyAccordion">
      <div v-for="(item, index) in dataList" :key="index" class="accordion-item">
        <h2 class="accordion-header" :id="'heading' + index">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse' + index" aria-expanded="false" :aria-controls="'collapse' + index">
            Data {{ index + 1 }}
          </button>
        </h2>
        <div :id="'collapse' + index" class="accordion-collapse collapse" :aria-labelledby="'heading' + index" data-bs-parent="#harvestHoneyAccordion">
          <div class="accordion-body">
            <p><strong>Date of record:</strong> {{ item.date }}</p>
            <p><strong>Location:</strong> {{ item.location }}</p>
            <p><strong>Hive:</strong> {{ item.hive }}</p>
            <p><strong>Units for how much:</strong> {{ item.units }}</p>
            <p><strong>How much:</strong> {{ item.howmuch }}</p>
            <p><strong>What was foraged:</strong> {{ item.foraged }}</p>
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
import { useHiveStore } from '@/stores/hiveStore';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const token = localStorage.getItem('token');
const headers = { Authorization: `Bearer ${token}` };

type Item = {
  date: string;
  location: string;
  hive: string;
  units: string;
  howmuch: string;
  foraged: string;
  notes: string;
};

const date = ref(new Date().toISOString().substr(0, 10));
const location = ref('');
const hive = ref('');
const units = ref('');
const howmuch = ref('');
const foraged = ref('');
const notes = ref('');
const dataList = ref<Item[]>([]);
const isLoading = ref(false);

const hiveStore = useHiveStore();
const hives = ref<number[]>(hiveStore.hives);

const unitOptions = ref([
  { value: 'Pounds', label: 'Pounds' },
  { value: 'Kilograms', label: 'Kilograms' },
  { value: 'Small frames', label: 'Small frames' },
  { value: 'Medium frames', label: 'Medium frames' },
  { value: 'Deep frames', label: 'Deep frames' },
  { value: 'Shallow supers', label: 'Shallow supers' },
  { value: 'Medium supers', label: 'Medium supers' },
  { value: 'Deep supers', label: 'Deep supers' }
]);

onMounted(async () => {
  await loadDatabaseEntries();
});

async function loadDatabaseEntries() {
  try {
    const response = await axios.get<Item[]>('http://localhost:5001/auth/harvesthoney', { headers });
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
    const response = await axios.post<Item>('http://localhost:5001/auth/harvesthoney', {
      date: date.value,
      location: location.value,
      hive: hive.value,
      units: units.value,
      howmuch: howmuch.value,
      foraged: foraged.value,
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
