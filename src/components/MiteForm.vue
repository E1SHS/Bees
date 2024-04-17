<template>
    <form @submit="handlesubmit">
        <label>Date of record:</label>
        <input type="date" id="dateInput" required>

    <label>Location:</label>
    <input type="location" v-model="location" required>

    <label>Hive:</label>
        <select v-model="hive">
        <option value="1. Hive">1.</option>
        <option value="2. Hive">2.</option>
        <option value="3. Hive">3.</option>
        <option value="4. Hive">4.</option>
        <option value="5. Hive">5.</option>
    </select>

    <label>Method:</label>
        <select v-model="method">
        <option value="Sugar shake">Sugar Shake.</option>   
        <option value="Alcohol wash">Alcohol wash.</option>
        <option value="Other">Other.</option>
    </select>

    <label>Other description:</label>
    <input type="description">
    
    <label>How many mites per 100:</label>
    <input type="mites">

    <label>Notes:</label>
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
            method: '',
            description: '',
            mites: '',
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