<template>
    <form @submit.prevent="handlesubmit">
    <label>Email:</label>
    <input type="email" required v-model="email">

    <label>Password:</label>
    <input type="password" required v-model="password">
    <div v-if="passwordError" class="error"> {{ passwordError }}</div>
    <div class="submit">
        <button class="btn" type="submit">Login</button>
    </div>
    </form> 
</template>

<script lang="ts">
export default {
    data() {
        return{
            email: '',
            password: '',
            passwordError: ''
        };
    },
    methods: {
        handlesubmit() {
            console.log('Form submitted');
            this.passwordError = this.password.length > 5 ? 
                '' : 'Password length must be at least 6 characters long';

                if (!this.passwordError) {
                console.log('Navigating to main route');
                this.$router.push({ name: 'menu' });    
            }
        }
    }
}

</script>

<style>

</style>