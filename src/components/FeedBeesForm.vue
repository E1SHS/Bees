<template>
    <form @submit="handlesubmit">
        <label>Date of record:</label>
        <input type="date" id="dateInput" required>

    <label>Location:</label>
    <input type="location" required>
    
    <div>
    <label>Hive:</label>
    <select v-model="hive">
      <option v-for="option in hiveOptions" :value="option.value">{{ option.label }}</option>
    </select>
    <button type="button" @click="addNewHive">Add Hive</button>
    <button type="button" @click="deleteHive">Delete Hive</button>
  </div>

    <label>What did you feed?</label>
    <input type="food">

    <label>How much? (g)</label>
    <input type="grams" pattern="[0-9]*" title="Please enter only digits" required>

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
            hiveOptions: [
        { value: '1. Hive', label: '1.' },
        { value: '2. Hive', label: '2.' },
        { value: '3. Hive', label: '3.' },
        { value: '4. Hive', label: '4.' },
        { value: '5. Hive', label: '5.' }
      ],
            food: '',
            grams: '',
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
    addNewHive() {
      const newHiveNumber = this.hiveOptions.length + 1;
      const newHiveValue = `${newHiveNumber}. Hive`;
      const newHiveLabel = `${newHiveNumber}.`;
      this.hiveOptions.push({ value: newHiveValue, label: newHiveLabel });
      this.hive = newHiveValue; 
    },
    deleteHive() {
      if (this.hiveOptions.length > 1) {
        this.hiveOptions.pop(); 
        this.hive = this.hiveOptions[this.hiveOptions.length - 1].value;
      }
    }
}
};
</script>

<style>

</style>