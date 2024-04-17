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

        <div style="background: #ececec; padding: 30px">
            <a-row :gutter="18">
                <a-col :md="{ span: '6' }" :xs="{ span: '24' }" v-for="item of datatabaseStore.documents"
                    :key="item.id">
                    <a-card :title="item.name" :bordered="false" style="width: 300px">

                        Url: {{ item.name }} <br>
                        Short: {{ item.short }} <br><br>
                        <a-space>
                            <a-button type="primary" @click="router.push(`/editar/${item.id}`)">Editar</a-button>
                            <a-button type="primary" danger
                                @click="datatabaseStore.deleteUrl(item.id)">Eliminar</a-button>
                        </a-space>

                    </a-card>
                </a-col>
            </a-row>
        </div>



    </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";
import { useDatabaseStore } from "../stores/database";
import { ref } from 'vue';
import { useRouter } from 'vue-router'

const userStore = useUserStore();
const datatabaseStore = useDatabaseStore();
const { userData } = storeToRefs(userStore)
const router = useRouter()

const url = ref('')

datatabaseStore.getUrls()

const handleSubmit = () => {
    datatabaseStore.addUrl(url.value);
    url.value = ''
}
</script>