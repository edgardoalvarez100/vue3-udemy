<script setup>
import { useCounterStore } from "@/store/counter"
import { storeToRefs } from "pinia";

const useCounter = useCounterStore()

const  {increment} = useCounter;
const {count, double } = storeToRefs(useCounter)

</script>

<template>
  <main>
   <h1>Home counter: {{ count }}</h1>
   <h2>Home Double: {{ double }}</h2>
   <button @click="increment">Increment</button>
  </main>
</template>
