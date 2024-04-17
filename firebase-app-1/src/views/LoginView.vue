<template>

    <a-row>
        <a-col :xs="{ span: 24 }" :sm="{ span: 12, offset: 6 }">
            <h1>
                Login
            </h1>
            <a-form name="login" layout="vertical" :model="formState" @finish="onFinish" @finishFailed="onFinishFailed">

                <a-form-item name="email" label="Ingrese Email"
                    :rules="[{ required: true, whitespace: true, type: 'email', message: 'Ingresa un correo valido' },]">
                    <a-input v-model:value="formState.email" />
                </a-form-item>

                <a-form-item name="password" label="Ingrese Password"
                    :rules="[{ required: true, whitespace: true, message: 'Requerido' }, { min: 6, message: 'Mínimo 6 caracteres' }]">
                    <a-input-password v-model:value="formState.password" />
                </a-form-item>


                <a-form-item>
                    <a-button type="primary" :loading="userStore.loadingUser" html-type="submit">Login</a-button>
                </a-form-item>

            </a-form>
        </a-col>
    </a-row>

</template>

<script setup>
import { reactive } from 'vue'
import { useUserStore } from "../stores/user";
import { message } from 'ant-design-vue'

const userStore = useUserStore();
const formState = reactive({ email: '', password: '' })


const onFinish = async () => {
    try {
        await userStore.loginUser(formState.email, formState.password);
    } catch (error) {
        message.error(error.message)
    }
}

const onFinishFailed = errorInfo => console.log('Failed', errorInfo)


</script>
