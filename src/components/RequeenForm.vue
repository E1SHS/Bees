<template>
    <form @submit="handlesubmit">
        <label>Date of record:</label>
        <input type="date" id="dateInput" required>

    <label>Location:</label>
    <input type="location" required>
    
    <label>Hive:</label>
    <select>
        <select v-model="hive"></select>
        <option value="1. Hive">1.</option>
        <option value="2. Hive">2.</option>
        <option value="3. Hive">3.</option>
        <option value="4. Hive">4.</option>
        <option value="5. Hive">5.</option>
    </select>
    <p></p>
<h1>Notes</h1>
    <label>What breed?</label>
    <select>
        <select v-model="breed"></select>
        <option value="Local">Local</option>
        <option value="Italian">Italian</option>
        <option value="Russian">Russian</option>
        <option value="Carniolan">Carniolan</option>
        <option value="Caucasian">Caucasian</option>
        <option value="Buckfast">Buckfast</option>
        <option value="Carpathian">Carpathian</option>
        <option value="Other">Other</option>
    </select>

    <label>Other Description</label>
    <input type="description">


    <label>Bee source</label>
    <select>
        <select v-model="source"></select>
        <option value="Reared">Reared</option>
        <option value="From queen breeder">From queen breeder</option>
        <option value="Other">Other</option>
    </select>

    <label>Supplier name</label>
    <input type="supplier">

    <label>Queen ID</label>
    <input type="qID">

    <label>Marketing color</label>
    <select>
        <select v-model="color"></select>
        <option value="White">White</option>
        <option value="Yellow">Yellow</option>
        <option value="Red">Red</option>
        <option value="Green">Green</option>
        <option value="Blue">Blue</option>
        <option value="Unmarked">Unmarked</option>
        <option value="Other">Other</option>
    </select>

    <label>Notes</label>
    <input type="notes">



    <div class="submit">
        <button class="btn">Save</button>
    </div>
    </form> 
</template>

<script lang="ts">
export default {
    data() {
        return{
            date: '',
            location: '',
            hive: '',
            breed: '',
            source: '',
            supplier: '',
            qID: '',
            color: '',
            notes: ''
        };
    },
    mounted() {
        const dateInput = document.getElementById('dateInput') as HTMLInputElement;
    if (dateInput) {
        const today = new Date().toISOString().substr(0, 10);
        dateInput.value = today;
        this.date = today;
    }
  },
    methods: {
        handlesubmit() {
            console.log('Form submitted');
            
        }
    }
}

</script>

<style>

</style>