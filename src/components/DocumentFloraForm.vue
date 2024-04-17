<template>
    <form @submit="handlesubmit">
        <label>Date of record:</label>
        <input type="date" id="dateInput" required>

    <label>Location:</label>
    <input type="location" v-model="location" required>

    <label>What is blooming?</label>
    <input type="bloom">
    
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
            bloom: '',
            notes: ''

        };
    },
    mounted() {
        const dateInput = document.getElementById('dateInput');
        const today = new Date().toISOString().substr(0, 10);
        dateInput.value = today;
        this.date = today;
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
