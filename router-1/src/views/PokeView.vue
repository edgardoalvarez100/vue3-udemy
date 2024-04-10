<script setup>
import { useRoute, useRouter } from "vue-router";
import { useGetData } from "@/composables/getData";
import { useFavoritosStore } from '@/store/favoritos'

const {data, getData, loading, error} = useGetData();

const route = useRoute();
const router = useRouter();

const useFavorito = useFavoritosStore();
const {add, findPoke} = useFavorito;

const back = ()=>{
    router.push("/pokemons")
}

getData(`https://pokeapi.co/api/v2/pokemon/${route.params.name}`);
</script>
<template>
     <p v-if="loading">Cargando informacion ...</p>
     <div class="alert alert-danger mt-2" v-if="error">No existe el pokemon</div>
    <div v-if="data">
        <img :src="data.sprites?.front_default" alt="" />
        <h1>Poke Name: {{ $route.params.name }}</h1>
        <button class="btn btn-primary mb-2" @click="add(data)" :disabled="findPoke(data.name)">
            Agregar a Favorito
        </button>
    </div>
  
    <button @click="back" class="btn btn-outline-primary">Volver</button>
</template>