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
    import axios from 'axios';
    export default {
        data() {
            return{
                email: '',  
                password: '',
                passwordError: ''
            };
        },
        methods: {
        async handlesubmit() {
                console.log('Form submitted');
                this.passwordError = this.password.length > 5 ? 
                    '' : 'Password length must be at least 6 characters long';

                    if (!this.passwordError) {
                    try {

                        const response = await axios.post('http://localhost:3000/api/login', {
                            email: this.email,
                            password: this.password
                        });
                        
                        console.log('Server response:', response.data);
                        

                        this.$router.push({ name: 'menu' });
                    } catch (error) {
                        console.error('Failed to submit login form:', error);
                    }
                }
            }   
        }
    }

    </script>

    <style>

    </style>