<template>
    <div>

        <a-row>
            <a-col :xs="{ span: 24 }" :sm="{ span: 12, offset: 6 }">
                <h1>Perfil</h1>
                <a-form name="basicPerfil" layout="vertical" :model="userStore.userData" @finish="onFinish">

                    <a-form-item name="email" label="Tu Email"
                        :rules="[{ required: true, whitespace: true, type: 'email', message: 'Ingresa un correo valido' },]">
                        <a-input v-model:value="userStore.userData.email" disabled />
                    </a-form-item>
                    <a-form-item name="displayName" label="Ingrese su nickname"
                        :rules="[{ required: true, whitespace: true, message: 'Ingresa un nick válido' },]">
                        <a-input v-model:value="userStore.userData.displayName" />
                    </a-form-item>


                    <a-form-item>
                        <a-button type="primary" :loading="userStore.loadingUser"
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

const userStore = useUserStore();

const onFinish = async () => {
    try {
        await userStore.updateUser(userStore.userData.displayName);
        message.success("Usuario Actualizado correctamente!")
    } catch (error) {
        message.error(error.message)
    }
}
</script>

<style scoped></style>