<template>
    <div>
        <h1>Home</h1>
        {{ userData?.email }}

        <add-form></add-form>

        <div v-if="datatabaseStore.loadingDoc">
            Loading doc...
        </div>

        <a-space direction="vertical" style="width: 100%" v-if="!datatabaseStore.loadingDoc">
            <a-card v-for="item of datatabaseStore.documents" :key="item.id" :title="`${item.short}`">
                <template #extra>
                    <a-space>
                        <a-button type="primary" @click="copiarPortapales(item.id)">Copiar</a-button>
                        <a-button type="primary" @click="router.push(`/editar/${item.id}`)">Editar</a-button>
                        <a-popconfirm title="Estas seguro que quieres eliminar la url?" ok-text="Si" cancel-text="No"
                            @confirm="confirm(item.id)" @cancel="cancel">
                            <a-button type="primary" danger>Eliminar</a-button>
                        </a-popconfirm>

                    </a-space>
                </template>
                <p>
                    {{ item.name }} <br>
                </p>

            </a-card>
        </a-space>
    </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";
import { useDatabaseStore } from "../stores/database";
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'

const userStore = useUserStore();
const datatabaseStore = useDatabaseStore();
const { userData } = storeToRefs(userStore)
const router = useRouter()

const confirm = async (id) => {
    try {
        await datatabaseStore.deleteUrl(id)
        message.success("Se eliminó la URL")
    } catch (error) {
        message.error(error.message)
    }

}
const cancel = () => {
    message.warning("Se canceló la elimación")
}

const copiarPortapales = (id) => {
    if (!navigator.clipboard) {
        return message.error("no se pudo copiar al portapeles")
    }
    const path = `${window.location.origin}/${id}`
    navigator.clipboard.writeText(path).then(() => {
        message.success("Url Copiada al portapapeles")
    })
}

datatabaseStore.getUrls()


</script>