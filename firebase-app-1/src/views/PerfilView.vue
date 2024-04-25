<template>
    <div>

        <a-row>
            <a-col :xs="{ span: 24 }" :sm="{ span: 12, offset: 6 }">
                <h1>Perfil</h1>
                <p>{{ userStore.userData }}</p>
                <a-form name="basicPerfil" layout="vertical" :model="userStore.userData" @finish="onFinish">

                    <a-form-item name="email" label="Tu Email"
                        :rules="[{ required: true, whitespace: true, type: 'email', message: 'Ingresa un correo valido' },]">
                        <a-input v-model:value="userStore.userData.email" disabled />
                    </a-form-item>
                    <a-form-item name="displayName" label="Ingrese su nickname"
                        :rules="[{ required: true, whitespace: true, message: 'Ingresa un nick válido' },]">
                        <a-input v-model:value="userStore.userData.displayName" />
                    </a-form-item>

                    <a-upload v-model:file-list="fileList" :before-upload="beforeUpload" list-type="picture"
                        :max-count="1" @change="handleChange">
                        <a-button>
                            <upload-outlined></upload-outlined>
                            Subir Foto de Perfil
                        </a-button>
                    </a-upload>
                    <a-button type="primary" :disabled="fileList.length === 0" :loading="uploading"
                        style="margin-top: 16px">
                        {{ uploading ? 'Uploading' : 'Start Upload' }}
                    </a-button>
                    <a-form-item>
                        <a-button style="margin-top: 16px" type="primary" :loading="userStore.loadingUser"
                            html-type="submit">Actualizar</a-button>
                    </a-form-item>

                </a-form>
            </a-col>
        </a-row>
    </div>
</template>

<script setup>
import { message } from 'ant-design-vue';
import { useUserStore } from '../stores/user';
import { ref } from 'vue';
import { UploadOutlined } from '@ant-design/icons-vue';


const userStore = useUserStore();
const fileList = ref([])
const uploading = ref(false)

const beforeUpload = (file) => {
    fileList.value = [...fileList.value, file]
    return false;
}

const handleChange = ({ file, fileList }) => {
    if (file.status !== 'uploading') {

        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

        if (!isJpgOrPng) {
            handleRemove(file)
            message.error('Solo imagenes png o jpg')
            return;
        }

        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            handleRemove(file)
            message.error('Máximo 2MB!')
            return;
        }


    }
};

const onFinish = async () => {
    try {
        await userStore.updateUser(userStore.userData.displayName);
        fileList.value.forEach((file) => {
            console.log(file)
        });
        message.success("Usuario Actualizado correctamente!")
    } catch (error) {
        message.error(error.message)
    }
}
</script>

<style scoped></style>