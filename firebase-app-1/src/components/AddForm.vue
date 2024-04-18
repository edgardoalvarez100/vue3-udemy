<template>
    <a-form name="addform" layout="vertical" :model="formState" @finish="onFinish">
        <a-form-item label="Ingrese una URL" name="url"
            :rules="[{ required: true, whitespace: true, pattern: /^https?:\/\/[\w\-]+(\.[\w\-]+)+[\/#?]?.*$/, message: 'Ingrese una URL válida' }]">
            <a-input v-model:value="formState.url" />
        </a-form-item>
        <a-form-item>
            <a-button type="primary" html-type="submit" :loading="datatabaseStore.loading">
                Agregar URL
            </a-button>
        </a-form-item>
    </a-form>
</template>

<script setup>
import { reactive } from 'vue';
import { useDatabaseStore } from "../stores/database";
import { message } from 'ant-design-vue'

const datatabaseStore = useDatabaseStore();

const formState = reactive({
    url: ''
})
const onFinish = async (value) => {
    try {
        await datatabaseStore.addUrl(formState.url);
        message.success("URL Agregada")
        formState.url = ''
    } catch (error) {
        message.error(error.message)
    }

}
</script>
