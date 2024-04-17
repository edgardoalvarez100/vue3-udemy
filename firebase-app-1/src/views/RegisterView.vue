<template>
    <a-row>
        <a-col :xs="{ span: 24 }" :sm="{ span: 12, offset: 6 }">
            <h1>
                Register
            </h1>
            <a-form name="login" layout="vertical" :model="formState" @finish="onFinish">

                <a-form-item name="email" label="Ingrese Email"
                    :rules="[{ required: true, whitespace: true, type: 'email', message: 'Ingresa un correo valido' },]">
                    <a-input v-model:value="formState.email" />
                </a-form-item>

                <a-form-item name="password" label="Ingrese Password"
                    :rules="[{ required: true, whitespace: true, message: 'Requerido' }, { min: 6, message: 'Mínimo 6 caracteres' }]">
                    <a-input-password v-model:value="formState.password" />
                </a-form-item>
                <a-form-item name="repassword" label="Ingrese Password" :rules="[{ validator: validatePass }]">
                    <a-input-password v-model:value="formState.repassword" />
                </a-form-item>


                <a-form-item>
                    <a-button type="primary" :disabled="userStore.loadingUser" html-type="submit">Login</a-button>
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
const formState = reactive({ email: '', password: '', repassword: '' })


const validatePass = async (_rule, value) => {
    if (value === '') {
        return Promise.reject('Requerido')
    }
    if (value !== formState.password) {
        return Promise.reject("Contraseñas no coinciden")
    } else {
        return Promise.resolve()
    }
}

const onFinish = async () => {
    try {
        await userStore.registerUser(formState.email, formState.password);
    } catch (error) {
        message.error(error.message)
    }
}



</script>
