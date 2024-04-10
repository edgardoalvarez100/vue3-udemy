<template>
    <div>
        Register
    </div>

    <form @submit.prevent="handleSubmit">
        <input type="email" v-model.trim="email" placeholder="Ingrese Email">
        <input type="password" v-model.trim="password" placeholder="Ingrese contreña">
        <button type="submit" :disabled="userStore.loadingUser">Crear Usuario</button>
    </form>
</template>

<script setup>
import {ref} from 'vue'
import { useUserStore } from "../stores/user";

const userStore = useUserStore();
const email = ref('')
const password = ref('')

const handleSubmit = async() => {
    if(!email.value || password.value.length < 6){
       return alert("Llena los campos")
    }
   await userStore.registerUser(email.value,password.value);

}

</script>
