<template>
    <div>
        <h1>Home</h1>
        {{ userData?.email }}


        <form @submit.prevent="handleSubmit">
            <input type="text" v-model="url" placeholder="Ingrese Url">
            <button type="submit">Agregar</button>
        </form>


        <div v-if="datatabaseStore.loadingDoc">
            Loading doc...
       </div>
       <ul v-else>
        <li v-for="item of datatabaseStore.documents" :key="item.id">
        id: {{ item.id }} <br>
        url: {{ item.name }} <br>
        short: {{ item.short }} <br>
        </li>
       </ul>
       
    </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";
import { useDatabaseStore } from "../stores/database";
import { ref } from 'vue';

const userStore = useUserStore();
const datatabaseStore = useDatabaseStore();
const {userData} = storeToRefs(userStore)

const url = ref('')

datatabaseStore.getUrls()

const handleSubmit = ()=>{
datatabaseStore.addUrl(url.value);
}
</script>