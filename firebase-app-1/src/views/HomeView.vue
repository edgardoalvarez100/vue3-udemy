<template>
    <div>
        <h1>Home</h1>
        
    </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();
const {userData} = storeToRefs(userStore)

</script>