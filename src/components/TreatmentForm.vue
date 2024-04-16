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

    <label>Disease Treated:</label>
        <select v-model="disease">
        <option value="Varroa">Varroa.</option>   
        <option value="Nosema">Nosema.</option>
        <option value="Afb">Afb.</option>
        <option value="Efb">Efb.</option>
        <option value="Chalkbrood">Chalkbrood.</option>
    </select>

    <label>Product type/Brand:</label>
    <input type="product">
    
    <label>Dosage information</label>
    <input type="dosage">

    <label>Notes:</label>
    <input type="notes">



    <div class="submit">
        <button class="btn">Save</button>
    </div>
    </form> 
</template>

<script>
export default {
    data() {
        return{
            date: '',
            location: '',
            hive: '',
            disease: '',
            product: '',
            dosage: '',
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