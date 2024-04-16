<template>
    <div>
        <h1>Editar Url</h1>
        <div v-if="databaseStore.loadingDoc">
            Loading....
        </div>
        <form @submit.prevent="handleSubmit" :disable="databaseStore.loadingDoc">
            <input type="text" placeholder="Ingrese Url" v-model='url'>
            <button type="submit">Editar</button>
        </form>
    </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { onMounted, ref } from 'vue';
import { useDatabaseStore } from "../stores/database.js";

const route = useRoute()
const databaseStore = useDatabaseStore()
const url = ref('')

const handleSubmit = () => {
    // console.log("editar")
    databaseStore.updateUrl(route.params.id, url.value)
}

onMounted(async () => {
    url.value = await databaseStore.leerUrl(route.params.id)
})

</script>
