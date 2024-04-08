<script setup>
import axios from 'axios'
import {ref } from 'vue'
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const pokemon = ref({})

const back = ()=>{
    router.push("/pokemons")
}

const getData = async()=>{
    try {
       
       const {data} =  await axios.get(`https://pokeapi.co/api/v2/pokemon/${route.params.name}`)
       pokemon.value = data;
    } catch (error) {
        console.log(error)
        pokemon.value = null;
    }
}

getData();
</script>
<template>
    <div v-if="pokemon">
        <h1>Poke Name: {{ $route.params.name }}</h1>
        <img :src="pokemon.sprites?.front_default" alt="" />
    </div>
   <h1 v-else>No existe el Pokemon</h1>
    <button @click="back">Volver</button>
</template>