<template>
    <form @submit.prevent="handlesubmit">
    <div class="submit">
        <button class="btn" @click="navigateToFeedBees">Feed Bees</button>
    </div>

    <div class="submit">
        <button class="btn" @click="navigateToDocumentFlora">Document Flora</button>
    </div>

    <div class="submit">
        <button class="btn" @click="navigateToMiteAssessment">Mite Assessment</button>
    </div>

    <div class="submit">
        <button class="btn" @click="navigateToTreatment">Treatment</button>
    </div>

    <div class="submit">
        <button class="btn" @click="navigateToHarvestHoney">Harvest honey</button>
    </div>

    <div class="submit">
        <button class="btn" @click="navigateToWinterize">Winterize</button>
    </div>

    <div class="submit">
        <button class="btn" @click="navigateToDeadHive">Dead Hive</button>
    </div>

    <div class="submit">
        <button class="btn" @click="navigateToLogSymptoms">Log Symptoms</button>
    </div>

    <div class="submit">
        <button class="btn" @click="navigateToRequeen">Requeen</button>
    </div>

    </form> 
</template>

<script lang="ts">
export default {
    data() {
        return{
            showOtherInput: false
        };
    },
    methods: {
        navigateToFeedBees() {
            console.log('Navigating to mite assessment route');
            this.$router.push({ name: 'feed' });
        
        },
        navigateToMiteAssessment() {
            console.log('Navigating to mite assessment route');
            this.$router.push({ name: 'mite' });
        },
        navigateToTreatment() {
            console.log('Navigating to treatment assessment route');
            this.$router.push({ name: 'treatment' });
        },
        navigateToHarvestHoney() {
            console.log('Navigating to treatment assessment route');
            this.$router.push({ name: 'harvesthoney' });
        },
        navigateToWinterize() {
            console.log('Navigating to treatment assessment route');
            this.$router.push({ name: 'winterize' });
        },
        navigateToDeadHive() {
            console.log('Navigating to treatment assessment route');
            this.$router.push({ name: 'deadhive' });
        },
        navigateToLogSymptoms() {
            console.log('Navigating to treatment assessment route');
            this.$router.push({ name: 'logsymptoms' });
        },
        navigateToRequeen() {
            console.log('Navigating to treatment assessment route');
            this.$router.push({ name: 'requeen' });
        },
        navigateToDocumentFlora() {
            console.log('Navigating to treatment assessment route');
            this.$router.push({ name: 'flora' });
        }
}
}
</script>

<style>

</style>