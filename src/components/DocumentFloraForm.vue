<template>
    <div>
    <form @submit.prevent="handlesubmit">
        <label>Date of record:</label>
        <input type="date" id="dateInput" v-model="date" required>

    <label>Location:</label>
    <input v-model="location" required>

    <label>What is blooming?</label>
    <input v-model="bloom">
    
    <label>Notes:</label>
    <textarea cols="30" rows="10" v-model="notes"></textarea>

    <div class="submit">
        <button class="btn" :disabled="isLoading">Save</button>
        <div v-if="isLoading" class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </form> 
    <div v-for="(item, index) in dataList" :key="index">
      <h2>Data {{ index + 1 }}</h2>
      <p><strong>Date of record:</strong> {{ item.date }}</p>
      <p><strong>Location:</strong> {{ item.location }}</p>
      <p><strong>What is blooming:</strong> {{ item.bloom }}</p>
      <p><strong>Notes:</strong> {{ item.notes }}</p>
    </div>
</div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted } from 'vue'

onMounted(async () => {
    await loadDatabaseEntries();
})

async function loadDatabaseEntries() {
    try {
        const response = await axios.get('http://localhost:3000/api/documentflora');
        dataList.value = response.data;
    } catch (error) {
        console.error('Failed to load database entries:', error);
    }
    finally {
    isLoading.value = false;
  }
}

async function handlesubmit() {
    try {
        isLoading.value = true;
        const response = await axios.post('http://localhost:3000/api/documentflora', {
            date: date.value,
            location: location.value,
            bloom: bloom.value,
            notes: notes.value
        });

        dataList.value = [
            response.data.result,
            ...dataList.value
        ]

        console.log('Server response:', response.data);

    } catch (error) {
        console.error('Failed to submit form:', error);
    } finally {
    isLoading.value = false;
  }
    
}

type Item = {
    date: string,
    location: string,
    bloom: string, 
    notes: string 
}

const date = ref(new Date().toISOString().substr(0, 10))
const location = ref('')
const bloom = ref('')
const notes = ref('')
const dataList = ref<Item[]>([])
const isLoading = ref(false)

// export default {
//     data() {    
//   return{
//     date: '' as string,
//     location: '' as string,
//     bloom: '' as string,
//     notes: '' as string,
//     dataList: [] as { date: string, location: string, bloom: string, notes: string }[]
//   };
// },
//     async created() {
//     await this.loadDatabaseEntries();

//     const today = new Date().toISOString().substr(0, 10);
//     date.value = today;
// },
//     methods: { 
//         async loadDatabaseEntries() {
//             try {
//                 const response = await axios.get('http://localhost:3000/api/documentflora');
//                 this.dataList = response.data;
//             } catch (error) {
//                 console.error('Failed to load database entries:', error);
//             }
//         },
//         async handlesubmit() {
//             console.log(date.value, this.location, this.bloom, this.notes);
//             try {
//                 const response = await axios.post('http://localhost:3000/api/documentflora', {
//                     date: date.value,
//                     location: this.location,
//                     bloom: this.bloom,
//                     notes: this.notes
//                 });
//                 console.log('Server response:', response.data);

//             } catch (error) {
//                 console.error('Failed to submit form:', error);
//             }
            
//         }
//     }
// }

</script>

<style>

.spinner-border {
display: inline-block;
width: 2rem;
height: 2rem;
vertical-align: -.125em;
border: .25em solid;
border-right: .25em solid transparent;
border-radius: 50%;
-webkit-animation: spinner-border .75s linear infinite;
animation: spinner-border .75s linear infinite;
}
</style>
