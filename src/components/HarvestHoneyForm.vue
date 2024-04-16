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

    <label>Units for how much:</label>
    <select>
        <select v-model="units"></select>
        <option value="Pounds">Pounds</option>
        <option value="Kilograms">Kilograms</option>
        <option value="Small frames">Small frames</option>
        <option value="Medium frames">Medium frames</option>
        <option value="Deep frames">Deep frames</option>
        <option value="Shallow supers">Shallow supers</option>
        <option value="Medium supers">Medium supers</option>
        <option value="Deep supers">Deep supers</option>
    </select>

    <label>How much?</label>
    <input type="howmuch"required>

    <label>What was foraged?</label>
    <input type="foraged">

    <label>Notes</label>
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
            units: '',
            howmuch: '',
            foraged: '',
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
       
    }
}

</script>

<style>

</style>