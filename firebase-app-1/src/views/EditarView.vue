<template>
    <div>
        <h1>Editar Url</h1>
        <div v-if="databaseStore.loadingDoc">
            Loading....
        </div>


        <a-form name="addform" layout="vertical" :model="formState" @finish="onFinish" v-if="!databaseStore.loadingDoc">
            <a-form-item label="Ingrese una URL" name="url"
                :rules="[{ required: true, whitespace: true, pattern: /^https?:\/\/[\w\-]+(\.[\w\-]+)+[\/#?]?.*$/, message: 'Ingrese una URL válida' }]">
                <a-input v-model:value="formState.url" />
            </a-form-item>

            <a-form-item>
                <a-space>
                    <a-button type="primary" html-type="submit" :loading="datatabaseStore.loading">
                        Editar URL
                    </a-button>
                    <a-button @click="volver">
                        Volver
                    </a-button>
                </a-space>
            </a-form-item>


        </a-form>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useDatabaseStore } from "../stores/database";
import { message } from 'ant-design-vue'
import { useRoute } from "vue-router";
import { onMounted } from 'vue';
import router from '../router'

const datatabaseStore = useDatabaseStore();

const formState = reactive({
    url: ''
})
const route = useRoute()
const databaseStore = useDatabaseStore()


const onFinish = async (value) => {
    try {
        await databaseStore.updateUrl(route.params.id, formState.url)
        message.success("URL Editada")
        formState.url = ''
    } catch (error) {
        message.error(error.message)
    }

}

const volver = () => {
    router.push("/");
}

onMounted(async () => {
    formState.url = await databaseStore.leerUrl(route.params.id)
})

</script>
