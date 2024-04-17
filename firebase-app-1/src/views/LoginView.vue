<template>

    <a-row>
        <a-col :xs="{ span: 24 }" :sm="{ span: 12, offset: 6 }">
            <h1>
                login
            </h1>
            <a-form @submit.prevent="handleSubmit" name="login">
                <input type="email" v-model.trim="email" placeholder="Ingrese Email">
                <input type="password" v-model.trim="password" placeholder="Ingrese contreña">
                <a-button type="primary" :disabled="userStore.loadingUser" html-type="submit">Login</a-button>
            </a-form>
        </a-col>
    </a-row>

</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from "../stores/user";

const userStore = useUserStore();
const email = ref('')
const password = ref('')

const handleSubmit = async () => {
    if (!email.value || password.value.length < 6) {
        return alert("Llena los campos")
    }
    await userStore.loginUser(email.value, password.value);
}
</script>
