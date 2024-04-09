<script setup>
import {RouterLink} from 'vue-router'
import { useGetData } from "@/composables/getData";

import { useCounterStore } from "@/store/counter"

const useCounter = useCounterStore()

const {data, getData, loading, error} = useGetData();

getData('https://pokeapi.co/api/v2/pokemon');
</script>
<template>
    <h1>Pokemons</h1>
    <p v-if="loading">Cargando informacion ...</p>
    <div class="alert alert-danger" v-if="error">{{ error }}</div>
    <div v-if="data">
        <ul class="list-group mb-2">
        <li v-for="pokemon in data.results" class="list-group-item">
            <router-link :to="`/pokemons/${pokemon.name}`">
                {{ pokemon.name }}
            </router-link>
        </li>
    </ul>
    <button class="btn btn-outline-primary me-2" @click="getData(data.previous)" :disabled="!data.previous">Previous</button>
    <button class="btn btn-outline-primary" @click="getData(data.next)" :disabled="!data.next">Next</button>
    </div>
   
</template>